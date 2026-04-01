import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSchoolDashboard } from "@/hooks/useSchoolDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  Clock, 
  ArrowLeft,
  Copy,
  CheckCircle2,
  TrendingUp,
  LogOut,
  Building2,
  Download,
  Eye,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import manzilLogo from "@/assets/manzil-logo.jpg";

export default function SchoolDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { school, stats, students, isLoading, error, isSchoolAdmin, getStudentDetails } = useSchoolDashboard();
  const { toast } = useToast();
  const [codeCopied, setCodeCopied] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentDetailsLoading, setStudentDetailsLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState<any>(null);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const copySchoolCode = () => {
    if (school?.code) {
      navigator.clipboard.writeText(school.code);
      setCodeCopied(true);
      toast({
        title: "Code copied!",
        description: "Share this code with your students to join.",
      });
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const handleViewStudent = async (student: any) => {
    setSelectedStudent(student);
    setStudentDetailsLoading(true);
    setStudentDetails(null);

    const details = await getStudentDetails(student.user_id);
    setStudentDetails(details);
    setStudentDetailsLoading(false);
  };

  const exportCSV = () => {
    if (!students.length) return;

    const headers = ["Email", "Name", "Joined", "Assessments Completed", "In Progress", "University Matches", "Last Activity"];
    const rows = students.map(s => [
      s.email || "N/A",
      s.full_name || "N/A",
      new Date(s.joined_at).toLocaleDateString(),
      s.assessments_completed,
      s.assessments_in_progress,
      s.university_matches_count,
      new Date(s.last_activity).toLocaleDateString(),
    ]);

    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${school?.name || "school"}-students-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden animate-pulse">
            <img src={manzilLogo} alt="Manzil" className="w-full h-full object-cover" />
          </div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to access the school dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/auth")} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not authorized
  if (!isSchoolAdmin || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              {error || "You don't have permission to access the school dashboard."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/20">
              <img src={manzilLogo} alt="Manzil" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">{school?.name || "School"} Dashboard</h1>
              <p className="text-sm text-muted-foreground">Track your students' career journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* School Code Card */}
        <Card className="bg-gradient-to-r from-teal/10 to-coral/10 border-teal/20">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Your School Invite Code</p>
                <p className="text-3xl font-mono font-bold tracking-wider text-foreground">
                  {school?.code || "------"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Share this code with students so they can join your school
                </p>
              </div>
              <Button 
                onClick={copySchoolCode} 
                variant="outline" 
                className="shrink-0"
              >
                {codeCopied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Total Students"
            value={stats?.totalStudents || 0}
            color="teal"
          />
          <StatCard
            icon={<ClipboardCheck className="w-5 h-5" />}
            label="Completed Assessments"
            value={stats?.completedAssessments || 0}
            color="coral"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="In Progress"
            value={stats?.inProgressAssessments || 0}
            color="amber"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Completion Rate"
            value={
              stats && stats.totalStudents > 0
                ? `${Math.round((stats.completedAssessments / stats.totalStudents) * 100)}%`
                : "0%"
            }
            color="primary"
          />
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Students
              </CardTitle>
              <CardDescription>
                {students.length} student{students.length !== 1 ? "s" : ""} linked to your school
              </CardDescription>
            </div>
            {students.length > 0 && (
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {students.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="text-center">Assessments</TableHead>
                      <TableHead className="text-center">University Matches</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.user_id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">
                              {student.full_name || student.email || "Unknown"}
                            </p>
                            {student.full_name && student.email && (
                              <p className="text-xs text-muted-foreground">{student.email}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Joined {new Date(student.joined_at).toLocaleDateString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {student.assessments_completed} done
                            </Badge>
                            {student.assessments_in_progress > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {student.assessments_in_progress} in progress
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="text-xs">
                            {student.university_matches_count}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {new Date(student.last_activity).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewStudent(student)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">
                No students have joined yet. Share your school code to get started.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Majors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-coral" />
                Top Major Interests
              </CardTitle>
              <CardDescription>Most popular majors among your students</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.topMajors && stats.topMajors.length > 0 ? (
                <div className="space-y-3">
                  {stats.topMajors.map((item, index) => (
                    <div key={item.major} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-coral/10 text-coral text-sm flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{item.major}</span>
                      </div>
                      <Badge variant="secondary">{item.count} students</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm py-8 text-center">
                  No assessment data yet. Data will appear once students complete their assessments.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Top Universities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Top University Matches
              </CardTitle>
              <CardDescription>Universities most matched to your students</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.topUniversities && stats.topUniversities.length > 0 ? (
                <div className="space-y-3">
                  {stats.topUniversities.map((item, index) => (
                    <div key={item.university} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <div>
                          <span className="font-medium">{item.university}</span>
                          <span className="text-xs text-muted-foreground ml-2">({item.country})</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{item.count} students</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm py-8 text-center">
                  No university data yet. Data will appear when students explore Global Pathways.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest student assessment activity</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentActivity.slice(0, 10).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium text-sm">{activity.studentEmail}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm py-8 text-center">
                  No activity yet. Activity will appear once students start taking assessments.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Student Details Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedStudent?.full_name || selectedStudent?.email || "Student Details"}
            </DialogTitle>
          </DialogHeader>

          {studentDetailsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : studentDetails ? (
            <div className="space-y-6">
              {/* Profile */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Profile</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    <span className="font-medium">{studentDetails.profile?.email || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Joined:</span>{" "}
                    <span className="font-medium">
                      {studentDetails.profile?.joined_at
                        ? new Date(studentDetails.profile.joined_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Assessment Results */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Assessments</h4>
                {studentDetails.sessions?.length > 0 ? (
                  <div className="space-y-3">
                    {studentDetails.sessions.map((session: any, i: number) => (
                      <Card key={i} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={session.completed_at ? "default" : "outline"}>
                            {session.completed_at ? "Completed" : `In Progress (${session.current_step})`}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(session.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {session.major_results && Array.isArray(session.major_results) && session.major_results.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Top Majors:</p>
                            <div className="flex flex-wrap gap-1">
                              {session.major_results.slice(0, 5).map((m: any, j: number) => (
                                <Badge key={j} variant="secondary" className="text-xs">
                                  {m.major || m.name || `Major ${j + 1}`}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {session.top_riasec_codes && session.top_riasec_codes.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-muted-foreground mb-1">RIASEC Codes:</p>
                            <div className="flex gap-1">
                              {session.top_riasec_codes.map((code: string, j: number) => (
                                <Badge key={j} variant="outline" className="text-xs font-mono">
                                  {code}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No assessments yet.</p>
                )}
              </div>

              {/* Major Predictions */}
              {studentDetails.activity?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Major Predictions</h4>
                  <div className="space-y-2">
                    {studentDetails.activity.map((a: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-sm py-1">
                        <span className="font-medium">{a.prediction || "No prediction"}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(a.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* University Matches */}
              {studentDetails.university_matches?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">University Matches</h4>
                  <div className="space-y-2">
                    {studentDetails.university_matches.map((m: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-border last:border-0">
                        <div>
                          <span className="font-medium">{m.university_name}</span>
                          <span className="text-xs text-muted-foreground ml-2">({m.university_country})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{m.tier}</Badge>
                          <span className="text-xs font-mono text-muted-foreground">{m.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">
              Failed to load student details.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number | string;
  color: "teal" | "coral" | "amber" | "primary";
}) {
  const colorClasses = {
    teal: "bg-teal/10 text-teal",
    coral: "bg-coral/10 text-coral",
    amber: "bg-amber/10 text-amber",
    primary: "bg-primary/10 text-primary",
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
