
import OnboardingForm from "./_component/OnboardingForm";
import {industries} from '../../../data/industries'
import { getUserOnboardingStatus } from "action/user";
import { redirect } from "next/navigation";
import React from 'react'

export default async function onboarding(){
    const {isOnboarding} = await getUserOnboardingStatus();
    if(isOnboarding){
        return redirect('/dashboard');
    }
    return(
        <main className="mt-15">
            <OnboardingForm industries={industries} />
        </main>
    )
}