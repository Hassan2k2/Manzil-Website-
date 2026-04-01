import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, School, CheckCircle2, AlertCircle } from "lucide-react";

interface SchoolCodeInputProps {
  onJoin: (code: string) => Promise<{ success: boolean; error?: string; schoolName?: string }>;
  variant?: "inline" | "card";
  className?: string;
}

export function SchoolCodeInput({ onJoin, variant = "card", className = "" }: SchoolCodeInputProps) {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!code.trim() || isSubmitting) return;

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const result = await onJoin(code.trim());
      if (result.success) {
        setSuccess(`Joined ${result.schoolName || "school"} successfully!`);
        setCode("");
      } else {
        setError(result.error || "Failed to join school");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "inline") {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label htmlFor="school-code" className="text-sm font-medium">
          School Code <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <div className="relative">
          <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="school-code"
            placeholder="e.g. ICAS26"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError(null);
              setSuccess(null);
            }}
            className={`pl-10 uppercase tracking-wider font-mono ${error ? "border-destructive" : ""}`}
            disabled={isSubmitting}
            maxLength={20}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {success}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-muted/30 border border-border rounded-2xl p-4 sm:p-5 ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
        <div className="flex items-center gap-3 flex-1 w-full">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <School className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1.5">
            <p className="font-semibold text-foreground text-sm">Have a school code?</p>
            <Input
              placeholder="Enter school code (e.g. ICAS26)"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError(null);
                setSuccess(null);
              }}
              className="uppercase tracking-wider font-mono text-sm h-9"
              disabled={isSubmitting}
              maxLength={20}
            />
          </div>
        </div>
        <Button
          type="submit"
          size="sm"
          disabled={!code.trim() || isSubmitting}
          className="whitespace-nowrap shrink-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join School"
          )}
        </Button>
      </form>
      {error && (
        <p className="text-sm text-destructive mt-2 flex items-center gap-1 ml-[52px]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-600 mt-2 flex items-center gap-1 ml-[52px]">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          {success}
        </p>
      )}
    </div>
  );
}
