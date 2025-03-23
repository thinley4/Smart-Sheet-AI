import React from "react";
import { BackgroundLines } from "../../components/ui/background-lines";
import { Text } from "./Text";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function NewHero() {
  return (
    <BackgroundLines className="relative flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        <Text />
      </h2>
      <div className="relative z-10">
        <Link
            href="/generate"
            className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-full bg-blue-500 mt-6 shadow-md transition-transform duration-300 hover:bg-blue-600 hover:scale-105 text-white"
        >
            Try SSAI <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
      <p className="max-w-xl mx-auto pt-6 text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        This AI-powered web application is designed to help teachers create
        high-quality, ready-to-use worksheets for students across various
        subjects and grade levels. By leveraging AI, the platform automates
        worksheet generation, saving teachers time and effort.
      </p>
    </BackgroundLines>
  );
}
