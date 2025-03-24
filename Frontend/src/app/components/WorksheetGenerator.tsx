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
  const [worksheetMarkdown, setWorksheetMarkdown] = useState<string | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // ✅ Fixed: Use worksheetMarkdown instead of undefined `markdown`
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
    <div className="flex flex-col items-center justify-center p-6 pt-28">
      {/* Input Section */}
      <Card className="w-full max-w-2xl p-6 shadow-md bg-white rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4">Generate Worksheet</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Topic</label>
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Grade Level</label>
            <Input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter grade level"
              className="mt-1"
            />
          </div>
          <Button onClick={generateWorksheet} className="w-full" disabled={loading}>
            {loading ? "Generating..." : "Generate Worksheet"}
          </Button>
        </CardContent>
      </Card>

      {/* Markdown Display Section */}
      {worksheetMarkdown && (
        <div className="mt-8 w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Generated Worksheet</h3>
          <div ref={pdfRef} className="prose max-w-none">
            <ReactMarkdown>{worksheetMarkdown}</ReactMarkdown>
          </div>
          {/* ✅ Fixed Download Button */}
          <button
            onClick={downloadPDF}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
