import { ArrowUpRight } from "lucide-react";
import { Text } from "./Text";
import Link from "next/link";

export function Hero() {
    return (
        <section className="flex flex-col justify-center items-center h-screen bg-white text-gray-900 text-center px-6">
            <Text />
            <Link 
                href="/generate"  
                className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-full bg-blue-500 mt-6 shadow-md transition-transform duration-300 hover:bg-blue-600 hover:scale-105 text-white"
            >
                Try SSAI <ArrowUpRight className="w-5 h-5" />
            </Link>
        </section>
    );
}
