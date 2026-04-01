import { motion } from "framer-motion";
import { ScoredUniversity } from "@/lib/universityMatcher";
import { UniversityCard } from "./UniversityCard";
import { GraduationCap } from "lucide-react";

interface UniversityListProps {
  universities: ScoredUniversity[];
}

export function UniversityList({ universities }: UniversityListProps) {
  if (universities.length === 0) {
    return (
      <div className="text-center py-16">
        <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No universities match your criteria</h3>
        <p className="text-muted-foreground">Try adjusting your filters or preferences above</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {universities.map((item, index) => (
        <motion.div
          key={item.university.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.05, 0.3) }}
        >
          <UniversityCard
            scoredUniversity={item}
            rank={index + 1}
          />
        </motion.div>
      ))}
    </div>
  );
}
