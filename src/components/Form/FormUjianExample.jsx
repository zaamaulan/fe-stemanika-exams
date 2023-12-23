import React, { useState } from "react";

const FormUjianExample = () => {
    const [questions, setQuestions] = useState([]);
  

    const handleAddQuestion = () => {
        if (questions.length < 20) {
            setQuestions([...questions, { text: "" }]);
            setCurrentIndex(questions.length);
        }
    };

    const handlePrevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleQuestionChange = (index, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = text;
        setQuestions(updatedQuestions);
    };

    const handleSendQuestions = () => {
        // Kirim data ke API
        console.log("Mengirim soal ke API", questions);
        // Reset state jika diperlukan
        setQuestions([]);
        setCurrentIndex(0);
    };

    return (
        <div>
            <h2>Form Soal Ujian</h2>
            {questions.map((question, index) => (
                <div
                    key={index}
                    style={{
                        display: index === currentIndex ? "block" : "none",
                    }}>
                    <textarea
                        value={question.text}
                        onChange={(e) =>
                            handleQuestionChange(index, e.target.value)
                        }
                        placeholder={`Soal ${index + 1}`}
                    />
                </div>
            ))}
            <div>
                <button
                    onClick={handlePrevQuestion}
                    disabled={currentIndex === 0}>
                    Sebelumnya
                </button>
                <button
                    onClick={handleNextQuestion}
                    disabled={currentIndex === questions.length - 1}>
                    Selanjutnya
                </button>
                <button
                    onClick={handleAddQuestion}
                    disabled={questions.length >= 20}>
                    Tambah Soal
                </button>
                <button
                    onClick={handleSendQuestions}
                    disabled={questions.length < 20}>
                    Kirim ke API
                </button>
            </div>
        </div>
    );
};

export default FormUjianExample;
