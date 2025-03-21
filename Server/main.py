from fastapi import FastAPI, Response
from pydantic import BaseModel
import uvicorn
from langchain_google_genai import ChatGoogleGenerativeAI
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestData(BaseModel):
    topic: str
    grade_level: int

key = os.getenv("key")

@app.post("/process")
async def process_data(data: RequestData):
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        api_key=key,
    )
    
    prompt = f"""
    You are an AI assistant that generates structured worksheets for students.
    Generate a worksheet with a variety of question types (MCQs, short answers, and fill-in-the-blanks) 
    on the topic '{data.topic}' for Grade {data.grade_level} students.
    Ensure the questions are clear, engaging, and age-appropriate.
    
    Example Worksheet:

    **Topic: Fractions**
    **Grade: 5**

    1. **Multiple Choice Question:** What is 1/2 + 1/4?
       a) 3/4  
       b) 1/2  
       c) 2/4  
       d) 1  

    2. **Short Answer:** Explain the difference between proper and improper fractions.

    3. **Fill in the Blank:** 3/5 + __ = 1

    Now generate a worksheet based on the topic '{data.topic}' for Grade {data.grade_level} students.
    """

    ai_msg = llm.invoke(prompt)

    # Generate PDF
    pdf_buffer = io.BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    c.drawString(100, 750, f"Worksheet on {data.topic} (Grade {data.grade_level})")
    
    y_position = 730
    for line in ai_msg.content.split("\n"):
        if y_position < 50:  # Start a new page if needed
            c.showPage()
            y_position = 750
        c.drawString(100, y_position, line)
        y_position -= 20

    c.save()
    pdf_buffer.seek(0)

    # Return PDF as a downloadable response
    return Response(content=pdf_buffer.getvalue(), media_type="application/pdf", headers={
        "Content-Disposition": f"attachment; filename=worksheet_{data.topic}.pdf"
    })

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8880)