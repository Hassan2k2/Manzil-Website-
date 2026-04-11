import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { API_URL, fetchWithAuth } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2, School } from "lucide-react";
import manzilLogo from "@/assets/manzil-logo.jpg";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountType, setAccountType] = useState<"student" | "admin">("student");
  const [schoolName, setSchoolName] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; schoolName?: string }>({});
  
  const { signIn, signUp, signInWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const result = authSchema.safeParse({ email, password });
    let isValid = true;
    const fieldErrors: { email?: string; password?: string; schoolName?: string } = {};

    if (!result.success) {
      isValid = false;
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
    }

    if (!isLogin && accountType === "admin" && !schoolName.trim()) {
      isValid = false;
      fieldErrors.schoolName = "School name is required";
    }

    setErrors(fieldErrors);
    return isValid;
  };

  const handleJoinSchool = async (code: string) => {
    if (!code.trim()) return;
    try {
      const response = await fetch(`${API_URL}/profile/join-school`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify({ school_code: code.trim() })
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Joined school!",
          description: `You've been linked to ${result.school_name}.`,
        });
      } else {
        toast({
          title: "School code error",
          description: result.error || "Failed finding school.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("School join failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          let message = error.message;
          if (message.includes("Invalid login credentials")) {
            message = "Invalid email or password. Please try again.";
          }
          toast({
            title: "Login failed",
            description: message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate("/", { replace: true });
        }
      } else {
        const extraData = accountType === "admin" ? { role: "SCHOOL_ADMIN", schoolName: schoolName.trim() } : undefined;
        const { error } = await signUp(email, password, extraData);
        if (error) {
          let message = error.message;
          if (message.includes("User already registered")) {
            message = "This email is already registered. Please log in instead.";
          }
          toast({
            title: "Signup failed",
            description: message,
            variant: "destructive",
          });
        } else {
          if (accountType === "admin") {
            toast({
              title: "School Created!",
              description: "Welcome to your School Dashboard.",
            });
            setTimeout(() => {
              navigate("/school", { replace: true });
              window.location.reload();
            }, 100);
          } else {
            // After signup, try to join school if code provided
            if (schoolCode.trim()) {
              setTimeout(() => handleJoinSchool(schoolCode), 1000);
            }
            toast({
              title: "Account created!",
              description: schoolCode.trim() 
                ? "Welcome to Manzil. Linking your school..." 
                : "Welcome to Manzil. You are now logged in.",
            });
            navigate("/", { replace: true });
          }
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      setIsSubmitting(true);
      const { error } = await signInWithGoogle(credentialResponse.credential);
      setIsSubmitting(false);
      
      if (error) {
        toast({
          title: "Google Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        if (!isLogin && schoolCode.trim()) {
          setTimeout(() => handleJoinSchool(schoolCode), 1000);
        }
        toast({
          title: "Welcome!",
          description: "Successfully logged in with Google.",
        });
        navigate("/", { replace: true });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/10">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/30 to-primary/10">
      {/* Header */}
      <header className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elevated border-2">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-primary/20">
              <img src={manzilLogo} alt="Manzil" className="w-full h-full object-cover" />
            </div>
            <div>
              <CardTitle className="text-2xl font-display">
                {isLogin ? "Welcome back" : "Welcome"}
              </CardTitle>
              <CardDescription className="mt-2">
                {isLogin
                  ? "Sign in to continue your journey"
                  : "Join Manzil to discover your path"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {/* Google Authentication */}
            <div className="mb-4 flex flex-col items-center">
              <GoogleLogin 
                onSuccess={handleGoogleAuth}
                onError={() => {
                  toast({
                    title: "Google Login Failed",
                    description: "The popup was closed or an error occurred.",
                    variant: "destructive",
                  });
                }}
                text={isLogin ? "signin_with" : "signup_with"}
                width="100%"
              />
            </div>
            
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {!isLogin && (
              <div className="flex bg-muted p-1 rounded-lg mb-6">
                <button
                  type="button"
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    accountType === "student" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setAccountType("student")}
                >
                  Student
                </button>
                <button
                  type="button"
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    accountType === "admin" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setAccountType("admin")}
                >
                  Administrator
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* School Code - Only on signup for students */}
              {!isLogin && accountType === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="school-code">
                    School Code <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                  </Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="school-code"
                      type="text"
                      placeholder="e.g. ICAS26"
                      value={schoolCode}
                      onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                      className="pl-10 uppercase tracking-wider font-mono"
                      disabled={isSubmitting}
                      maxLength={20}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Got a code from your school? Enter it to link your account.
                  </p>
                </div>
              )}

              {/* School Name - Only on signup for admins */}
              {!isLogin && accountType === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="school-name">
                    School Name
                  </Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="school-name"
                      type="text"
                      placeholder="e.g. Springfield High"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className={`pl-10 ${errors.schoolName ? "border-destructive" : ""}`}
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                  </div>
                  {errors.schoolName && (
                    <p className="text-sm text-destructive">{errors.schoolName}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Register your school to start tracking student progress.
                  </p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                variant="hero"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  isLogin ? "Sign in" : "Create account"
                )}
              </Button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setSchoolCode("");
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
