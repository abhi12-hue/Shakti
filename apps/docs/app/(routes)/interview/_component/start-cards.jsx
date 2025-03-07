import { Brain, Target, Trophy } from "lucide-react";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Average Score */}
      <div className="bg-[#15151a] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-white">Average Score</h3>
          <Trophy className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-white">{getAverageScore()}%</div>
        <p className="text-xs text-gray-400">Across all assessments</p>
      </div>

      {/* Questions Practiced */}
      <div className="bg-[#15151a] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-white">Questions Practiced</h3>
          <Brain className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-white">{getTotalQuestions()}</div>
        <p className="text-xs text-gray-400">Total questions</p>
      </div>

      {/* Latest Score */}
      <div className="bg-[#15151a] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-white">Latest Score</h3>
          <Target className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-white">
          {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
        </div>
        <p className="text-xs text-gray-400">Most recent quiz</p>
      </div>
    </div>
  );
}
