
import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { checkUser } from "lib/checkUser";

export default async function Header() {
 const user = checkUser();
  
  return (
    <header className="fixed top-0 w-full backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-white text-bold text-3xl ">Shakti</h1>
        </Link>
           {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-bold">
          <h1 className="hover:text-purple-900 cursor-pointer text-xl text-white">Cover Letter</h1>
          <Link href="/interview" className="hover:text-purple-900 text-2xl text-white">
            Interview Prep
          </Link>
          <Link href="/resume" className="hover:text-purple-900 text-xl text-white">
            Resume
          </Link>
          <h1 className="hover:text-purple-900 cursor-pointer text-xl text-white">About</h1>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <input type="checkbox" id="menu-toggle" className="peer hidden" />
          <label htmlFor="menu-toggle" className="block text-white cursor-pointer">
            <Menu className="w-8 h-8" />
          </label>

          <div className="absolute top-12 right-0 w-48 bg-[#09090B] text-white p-4 rounded-lg hidden peer-checked:block">
            <label htmlFor="menu-toggle" className="absolute top-2 right-2 text-white cursor-pointer">
              <X className="w-6 h-6" />
            </label>
            <div className="flex flex-col space-y-4">
              <h1 className="hover:text-purple-900 cursor-pointer">Cover Letter</h1>
              <Link href="/interview" className="hover:text-purple-900">
                Interview Prep
              </Link>
              <Link href="/resume" className="hover:text-purple-900">
                Resume
              </Link>
              <h1 className="hover:text-purple-900 cursor-pointer">About</h1>
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 text-white  hover:text-purple-900"
              >
                <LayoutDashboard className="h-4 w-4 text-white" />
                Industry Insights
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </Button>
            </Link>

            {/* for coure */}
            <Link href="/course">
              <Button
                className="hidden md:inline-flex items-center gap-2 text-white  hover:text-purple-900"
                variant="outline"
              >
                <GraduationCap className="h-4 w-4 text-white" />
                Courses
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="white">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>

    </header>
  );
}