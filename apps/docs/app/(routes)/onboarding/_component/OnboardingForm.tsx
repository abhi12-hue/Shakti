"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboradingSchema } from "app/zod/schema";
import { updateUser } from "action/user";
import useFetch from "hooks/use-fetch";

interface Industry {
  id: string;
  name: string;
  subIndustries: string[];
}

interface OnboardingFormProps {
  industries: Industry[];
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboradingSchema),
  });
  const onSubmit = async (values: any) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;
      await updateUserFn({ ...values, industry: formattedIndustry });
      console.log(updateUserFn);
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    console.log("Update result:", updateResult); // Debugging
    if (updateResult && !updateLoading) {
      router.push("/dashboard");
    }
  }, [updateResult, updateLoading, router]);
  
    

  return (
    <div className="flex items-center justify-center bg-[#09090B] min-h-screen pt-20 p-4">
      <div className="w-full max-w-lg bg-[#09090B] p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Complete Your Profile</h2>
        <p className="text-gray-400 mb-6">Select your industry to get personalized career insights.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Industry Selection */}
          <div>
            <label className="block font-medium text-white">Industry</label>
            <select
              {...register("industry")}
              onChange={(e) => {
                const selected = industries.find((ind) => ind.id === e.target.value) || null;
                setSelectedIndustry(selected);
                setValue("industry", e.target.value);
                setValue("subIndustry", "");
              }}
              className="w-full p-2 bg-[#1E1E1E] text-white border border-gray-600 rounded"
            >
              <option value="">Select an industry</option>
              {industries.map((ind) => (
                <option key={ind.id} value={ind.id}>{ind.name}</option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500 text-sm">{errors.industry.message as string}</p>}
          </div>

          {/* Sub-Industry Selection */}
          {watch("industry") && (
            <div>
              <label className="block font-medium text-white">Specialization</label>
              <select 
                {...register("subIndustry")} 
                className="w-full p-2 bg-[#1E1E1E] text-white border border-gray-600 rounded"
              >
                <option value="">Select your specialization</option>
                {selectedIndustry?.subIndustries.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              {errors.subIndustry && <p className="text-red-500 text-sm">{errors.subIndustry.message as string}</p>}
            </div>
          )}

          {/* Experience */}
          <div>
            <label className="block font-medium text-white">Years of Experience</label>
            <input
              type="number"
              min="0"
              max="50"
              placeholder="Enter years of experience"
              {...register("experience")}
              className="w-full p-2 bg-[#1E1E1E] text-white border border-gray-600 rounded"
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message as string}</p>}
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium text-white">Skills</label>
            <input
              type="text"
              placeholder="e.g., Python, JavaScript"
              {...register("skills")}
              className="w-full p-2 bg-[#1E1E1E] text-white border border-gray-600 rounded"
            />
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message as string}</p>}
          </div>

          {/* Professional Bio */}
          <div>
            <label className="block font-medium text-white">Professional Bio</label>
            <textarea
              placeholder="Tell us about your background..."
              {...register("bio")}
              className="w-full p-2 bg-[#1E1E1E] text-white border border-gray-600 rounded h-24"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message as string}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={updateLoading}
          >
            {updateLoading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
