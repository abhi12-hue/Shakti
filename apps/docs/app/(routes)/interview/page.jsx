import PerformanceChart from "./_component/performace";
import QuizList from "./_component/quize-lint";
import StatsCards from "./_component/start-cards";
import {getAssessments} from "../../../action/interview"
export default async function InterviewPrepPage() {
  const assessments = await getAssessments();
  return (
    <div>
      <div className="flex items-center justify-between mt-20 ">
        <h1 className="text-6xl font-bold text-white">
          Interview Preparation
        </h1>
      </div>
      <div className="mt-8">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} /> 
      </div>
    </div>
  );
}