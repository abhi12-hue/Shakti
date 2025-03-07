"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { improveWithAI } from '../../../../action/resume';
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Pencil, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch"; 

const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = parse(dateString, "yyyy-MM", new Date());
    return format(date, "MMM yyyy");
  }; 


const EntryForm = ({ type, entries, onChange }) => {
    const [isAdding, setAdding] = useState(false);

    const {
        register,
        handleSubmit: handleVildation,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        resolver: zodResolver(entrySchema),
        defaultValues: {
            title: "",
            organization: "",
            startDate: "",
            endDate: "",
            description: "",
            current: false,
        },
    });
    const current = watch("current");

    const handleAdd = handleVildation((data) => {
        const formattedEntry = {
            ...data,
            startDate: formatDisplayDate(data.startDate),
            endDate: data.current ? "" : formatDisplayDate(data.endDate),
        };

        onChange([...entries, formattedEntry]);

        reset();
        setAdding(false);
    });

    const handleDelete = (index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        onChange(newEntries);
    };
    const {
        loading: isImproving,
        fn: improvedWithAiFn,
        data: improvedContent,
        error: improveError,
    } = useFetch(improveWithAI);


    //add this effect to handle the improvement result
    useEffect(() => {
        if (improvedContent && !isImproving) {
            setValue("description", improvedContent);
            toast.success("Description improved successfully!");
        }
        if (improveError) {
            toast.error(improveError.message || "Failed to improve description");
        }
    }, [improvedContent, improveError, isImproving, setValue]);


    //replace handleImprvementDescription with this 
    const handleImprvementDescription = async () => {
        const description = watch("description");
        if (!description) {
            toast.error("Please enter a description first");
            return;
        }

        await improvedWithAiFn({
            current: description,
            type: type.toLowerCase(),
        });
    }
    return (
        <div className='space-y-4'>
            <div className='space-y-4'>
                {
                    entries.map((items, index) => (
                        <div key={index}>
                            <div className='flex flex-row items-center justify-between space-y-0 pb-2'>

                                <h1 className='text-sm font-medium'>{items.title} @ {items.organization}</h1>
                            </div>
                            <button
                                onClick={() => handleDelete(index)}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                }

                <div>
                    <p className="text-sm text-muted-foreground">
                        {
                            items.current ? `${items.startDate} - 'Present`
                                : `${items.startDate}` - `${itmes.endDate}`
                        }
                    </p>

                    <p className='mt-2 text-sm whitespace-pre-wrap'>{items.description}</p>
                </div>
            </div>

            {
                isAdding && (
                    <div>
                        <div>
                            <h1>Add {type}</h1>
                        </div>

                        <div className="space-y-4">
                            <div className = "grid grid-cols-2 gap-4"> 
                                <div className='space-y-2'>
                                    <input
                                        placeholder='Title/Position'
                                        {...register("title")}
                                        error={errors.title}
                                    />
                                    {
                                        errors.title && (
                                            <p className='text-sm text-red-500'>{errors.title.message}</p>
                                        )
                                    }
                                </div>

                                <div className='space-y-2'>
                                    <input
                                        placeholder='Organization/Company'
                                        {...register("organization")}
                                        error={errors.organization}
                                    />
                                    {
                                        errors.organization && (
                                            <p className='text-sm text-red-500'>{errors.organization.message}</p>
                                        )
                                    }
                                </div>
                            </div>

                            
                        </div>

                        <div className='space-y-2'>
                            <input type="month"
                            {...register("startDate")}
                            disabled={current}
                            error = {errors.startDate}
                            />
                            {
                                errors.startDate && (
                                    <p className='text-sm text-red-500'>{errors.startDate.message}</p>
                                )
                            }
                        </div>

                        <div className='space-y-2'>
                            <input type="month"
                            {...register("endDate")}
                            disabled={current}
                            error = {errors.endDate}
                            />
                            {
                                errors.endDate && (
                                    <p className='text-sm text-red-500'>{errors.endDate.message}</p>
                                )
                            }
                        </div>

                        <div className = "flex items-center space-x-2">
                            <input type="checkbox"
                            id="current"
                            {...register("current")}
                            onChange={(e)=>{
                                setValue("current" , e.target.checked);
                                if(e.target.checked){
                                    setValue("endDate" , "");
                                }
                            }}
                            />
                            <label htmlFor="current">Current {type}</label>
                    
                        </div>


                        

                        <div className = "space-y-2">
                            <textarea
                            placeholder={`Description of your ${type.toLowerCase()}`}
                            className='h-32'
                            {...register("description")}
                            error = {errors.description}
                            />
                            {errors.description && (
                                <p className = "text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <button
                        onClick={handleImprvementDescription}
                        disabled={isImproving || !watch("description")}
                        >
                            {
                                isImproving ? (
                                    <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Improving...
                                    </>
                                ) : (
                                    <>
                                    <Sparkles className = "h-4 w-4 mr-2"/>
                                    Improve with AI
                                    </>
                                )
                            }

                        </button>

                        <div>
                            <div className = "flex justify-end sapce-x-2">
                                <button
                                onClick={()=>{
                                    reset();
                                    setAdding(false);
                                }}
                                >
                                    Cancel
                                </button>

                                <button
                                onClick={handleAdd}
                                >
                                    <PlusCircle className="h-4 w-4 mr-2"/>
                                    Add Entry

                                </button>
                            </div>
                        </div>


                        {!isAdding && (
                            <button 
                            onClick={()=> setAdding(true)}
                            >
                                <PlusCircle className = "h-4 w-4 mr-2"/>
                                Add {type}
                            </button>
                        )}
                    </div>
                )
            }


        </div>


    )
}

export default EntryForm;
