"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

export default function WorksheetGenerator() {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [worksheetMarkdown, setWorksheetMarkdown] = useState<string | null>(
    null
  );
  const pdfRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    if (!worksheetMarkdown) return;

    const doc = new jsPDF();
    const marginLeft = 10;
    const marginTop = 10;
    const maxWidth = 180;

    doc.setFont("helvetica", "normal");
    doc.text(worksheetMarkdown, marginLeft, marginTop, { maxWidth });
    doc.save("worksheet.pdf");
  };

  const generateWorksheet = async () => {
    setLoading(true);
    setWorksheetMarkdown(null);

    if (topic === "" || grade === "") {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://test-fastapi-ssai.onrender.com/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, grade_level: parseInt(grade) }),
      });

      if (!response.ok) throw new Error("Failed to generate worksheet");

      const data = await response.json();
      setWorksheetMarkdown(data.worksheet);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      {/* Input Section with Glassmorphism */}
      <Card className="w-full max-w-2xl p-6 shadow-xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/50">
        <CardContent>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Generate Worksheet
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Topic
            </label>
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
              className="mt-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Grade Level
            </label>
            <Input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter grade level"
              className="mt-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <Button
            onClick={generateWorksheet}
            className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "⏳ Generating..." : "🚀 Generate Worksheet"}
          </Button>
        </CardContent>
      </Card>

      {/* Markdown Display Section */}
      {worksheetMarkdown && (
        <div className="mt-8 w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg border border-gray-200 relative">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Generated Worksheet
          </h3>
          <div
            ref={pdfRef}
            className="prose max-w-none leading-7 text-gray-900"
          >
            <ReactMarkdown>{worksheetMarkdown}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Floating Download Button */}
      {worksheetMarkdown && (
        <button
          onClick={downloadPDF}
          className="fixed cursor-pointer bottom-10 right-10 bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          📄 Download PDF
        </button>
      )}

      {/* Loading Animation */}
      {loading && (
        <div className="mt-6 space-y-4">
          <div className="h-6 bg-gray-300 animate-pulse w-3/4 rounded"></div>
          <div className="h-6 bg-gray-300 animate-pulse w-5/6 rounded"></div>
          <div className="h-6 bg-gray-300 animate-pulse w-2/3 rounded"></div>
        </div>
      )}
    </div>
  );
}
