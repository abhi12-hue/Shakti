"use client"
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import  EntryForm from './EntryForm'
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { saveResume } from "../../../../action/resume";

import useFetch from "hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

const ResumeBuilder = ({initialContent}) => {
  const [activeTab , setActiveTab] = useState("edit");
  const [resumeMode , setresume ] = useState("preview")
  const [previewContent , setPreviewContent] = useState(initialContent);
  const {user} = useUser();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState:{errors},

  }=  useForm({
    resolver:zodResolver(resumeSchema),
    defaultValues:{
      contactInfo:{},
      summary:"",
      skills:"",
      experience:[],
      education:[],
      projects:[]
    },
  });

  const {
    loading:isSaving,
    fn:saveResumeFn,
    data:saveResult,
    error:saveError,
  } = useFetch(saveResume)

  //watch from field for preview updates
  const formValues = watch();

  useEffect(()=>{
    if(initialContent) setActiveTab("preview");
  } , [initialContent]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

   // Update preview content when form values change
   useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);


  const getContactMarkdown  = ()=>{ const { contactInfo } = formValues;
  const parts = [];
  if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
  if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
  if (contactInfo.linkedin)
    parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
  if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

  return parts.length > 0
    ? `## <div align="center">${user.fullName}</div>
      \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
    : "";
}


    const getCombinedContent = () => {
      const { summary, skills, experience, education, projects } = formValues;
      
      return [
        getContactMarkdown(),
        summary && `## Professional Summary\n\n${summary}`,
        skills && `## Skills\n\n${skills}`,
        entriesToMarkdown(experience, "Work Experience"),
        entriesToMarkdown(education, "Education"),
        entriesToMarkdown(projects, "Projects")
      ] // Move `.filter(Boolean)` and `.join("\n\n")` outside the array
        .filter(Boolean)
        .join("\n\n");
  };
  

  const [isGenerating, setIsGenerating] = useState(false);

  
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };


  return (
    <div className='space-y-4'>
      <div className =" flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className='font-bold text-white text-5xl md:text-6xl'>Resume Builder</h1>
      </div>

      <div className = "space-x-2">
        <button
  
        onClick={handleSubmit(onSubmit)}
        disabled={isSaving}
        >
          {isSaving ? (
            <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Saving....
            </>
          ):<>  <Save className="h-4 w-4"/>
          Save
          </>
        }
        </button>

        <button>
          {isGenerating ? (
            <>
            <Loader2 className="h-4 w-4 animate-spin"/>
            Generating Pdf....
            </>
          ): (
            <>
            <Download className="h-4 w-4"/>
            Download PDF
            </>
          )
          }
        </button>
      </div>

      <div value={activeTab} onValueChange={setActiveTab}>
        <div>
          <button>Form</button>
          <button>Markdown</button>

          <div value="edit">
            <form onSubmit={handleSubmit(onSubmit)} className = "space-y-8">
              <div className="space-y-4">
                <h3 className='text-lg font-medium '>Contact Information</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50'>
                  <div className='space-y-2'>
                    <label className="text-sm font-medium">Email</label>
                    <input type="email"
                    {...register("contactInfo.email")}
                    placeholder="your@gmail.com"
                    error = {errors.contactInfo?.email}
                    />
                    {errors.contactInfo?.email && (
                      <p className='text-sm text-red-500'>{errors.contactInfo.email.message}</p>
                    ) }
                  </div>

                  <div className='space-y-2'>
                    <label className="text-sm font-medium">Mobile Number</label>
                    <input type="tel"
                    {...register("contactInfo.mobile")}
                    placeholder="your@gmail.com"
                    error = {errors.contactInfo?.mobile.message}
                    />
                    {errors.contactInfo?.mobile && (
                      <p className='text-sm text-red-500'>{errors.contactInfo.mobile.message}</p>
                    ) }
                  </div>

                  <div className='space-y-2'>
                    <label className="text-sm font-medium">Mobile Number</label>
                    <input type="tel"
                    {...register("contactInfo.mobile")}
                    placeholder="your@gmail.com"
                    error = {errors.contactInfo?.mobile.message}
                    />
                    {errors.contactInfo?.mobile && (
                      <p className='text-sm text-red-500'>{errors.contactInfo.mobile.message}</p>
                    ) }
                  </div>

                  <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Twitter/X Profile
                  </label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    placeholder="https://twitter.com/your-handle"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
                </div>
              </div>

              {/* sumary */}
              <div className = "space-y-4">
                <h3 className = "text-lg font-medium">Professional Summary</h3>
                <Controller
                name = "summary"
                control={control}
                render={({field})=>(
                  <textarea id="message"
                   name="message" rows="5"
                  cols="30"
                  placeholder="Write your Compelling professional Summary">
                    error={errors.summary}
                  </textarea>
                )}
                />
                {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
              </div>

              {/* skills */}
              <div className = "space-y-4">
                <h3 className = "text-lg font-medium">Professional Summary</h3>
                <Controller
                name = "skills"
                control={control}
                render={({field})=>(
                  <textarea id="message"
                   name="message" rows="5"
                  cols="30"
                  placeholder="List your key skills">
                    error={errors.skills}
                  </textarea>
                )}
                />
                 {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
              </div>

              {/* experience */}
              <div className = "space-y-4">
                <h3 className = "text-lg font-medium">Professional Summary</h3>
                <Controller
                name = "skills"
                control={control}
                render={({field})=>(
                 <EntryForm
                 type="experience"
                 entries = {field.value}
                 onChange={field.onChange}
                 />
                )}
                />
                 {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
              </div>

              <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">
                  {errors.education.message}
                </p>
              )}
            </div>

              {/* Projects */}
              <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">
                  {errors.projects.message}
                </p>
              )}
            </div>

            </form>

            <div value="preview">
              <button
              onClick={()=>{
                setresume(resumeMode === "preview" ? "edit" : "preview")
              }}
              className = "mb-2"
              >
              {
                resumeMode === "preview" ? (
                  <>
                <Edit className = "h-4 w-4"/>
                Edit Resume
                  </>
                ) : (
                  <>
                  <Monitor className = "h-4 w-4"/>
                  Show Preview
                  </>
                )
              }
              </button>

              {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}
          <div className="border rounded-lg">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
