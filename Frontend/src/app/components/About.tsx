"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import aboutImg from "../../../public/about.jpeg";

export function About() {
  return (
    <motion.section
      id="about"
      className="px-6 py-10 bg-gray-100 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.17, 0.55, 0.55, 1] }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-gray-600 mt-2">
          Discover more about who we are and what we do.
        </p>
      </div>
      <div className="md:flex md:items-center md:gap-6">
        <div className="relative w-full md:w-1/3 h-60 md:h-72 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={aboutImg}
            alt="About Us Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="md:w-2/3 mt-6 md:mt-0 text-gray-700 text-lg leading-relaxed">
          <p>
            At Smart Sheet AI, we empower teachers with AI-driven tools to
            effortlessly generate ready-to-use worksheets for students. Our
            platform streamlines lesson planning by providing customized,
            high-quality educational materials in just a few clicks. Designed to
            save time and enhance learning, we help educators focus on what
            matters most—teaching. 🚀
          </p>
        </div>
      </div>
    </motion.section>
  );
}
