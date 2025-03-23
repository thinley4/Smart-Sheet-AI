"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function WorksheetGenerator() {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generateWorksheet = async () => {
    setLoading(true);
    setPdfUrl(null);
    if(topic === "" || grade === "") {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("https://test-fastapi-ssai.onrender.com/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, grade_level: parseInt(grade) }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate worksheet");
      }

      const blob = await response.blob();
      const pdfBlobUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfBlobUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Input Section */}
      <Card className="w-full max-w-2xl p-6 shadow-md bg-white rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4">
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
              className="mt-1"
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
              className="mt-1"
            />
          </div>
          <Button
            onClick={generateWorksheet}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate PDF"}
          </Button>
        </CardContent>
      </Card>

      {/* PDF Preview Section */}
      {pdfUrl && (
        <div className="mt-8 w-full max-w-4xl flex flex-col items-center">
          <iframe
            src={pdfUrl}
            className="w-full h-[80vh] border rounded-lg shadow-lg"
            title="Worksheet Preview"
          ></iframe>
          <Button className="mt-4 w-full max-w-xs">
            <a
              href={pdfUrl}
              download={`worksheet_${topic}.pdf`}
              className="text-white"
            >
              Download Worksheet
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
