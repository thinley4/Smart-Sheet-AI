"use server";

export const generateWorksheet = async (topic: string, grade: string) => {
    try {
        const response = await fetch('https://test-fastapi-ssai.onrender.com/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, grade_level: parseInt(grade) }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate worksheet');
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob); // Return the PDF Blob URL to the client

    } catch (error) {
        console.error(error);
        return null; // Return null if there's an error
    }
};
