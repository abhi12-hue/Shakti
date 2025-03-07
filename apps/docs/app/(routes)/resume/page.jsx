import { getResume } from "../../../action/resume"
import ResumeBuilder from "../resume/_component/ResumeBuilder"

const ResumePage = async()=>{
    const resume = await getResume();
    return(
        <div className="mx-auto py-6">
            <ResumeBuilder initialContent={resume?.content}/>
        </div>
    )
}

export default ResumePage;