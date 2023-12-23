import React, { useState } from "react";

const FormUjianExample = () => {
    const [ujianData, setUjianData] = useState({
        nama_ujian: "",
        deskripsi: "",
        pengawas: "",
        waktu_mulai: "",
        soal: [
            {
                teks_pertanyaan: "",
                pilihan_jawaban: ["", "", "", "", ""],
                jawaban_benar: "",
                poin_nilai: 0,
            },
        ],
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAddQuestion = () => {
        if (ujianData.soal.length < 25) {
            setUjianData((prevData) => ({
                ...prevData,
                soal: [
                    ...prevData.soal,
                    {
                        teks_pertanyaan: "",
                        pilihan_jawaban: ["", "", "", "", ""],
                        jawaban_benar: "",
                        poin_nilai: 0,
                    },
                ],
            }));
            setCurrentIndex(ujianData.soal.length);
        }
    };

    const handlePrevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < ujianData.soal.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleQuestionChange = (field, value) => {
        setUjianData((prevData) => ({
            ...prevData,
            [field]: value,
            soal: prevData.soal.map((question, index) =>
                index === currentIndex
                    ? { ...question, [field]: value }
                    : question
            ),
        }));
    };

    const handleChoiceChange = (choiceIndex, value) => {
        setUjianData((prevData) => ({
            ...prevData,
            soal: prevData.soal.map((question, index) =>
                index === currentIndex
                    ? {
                          ...question,
                          pilihan_jawaban: question.pilihan_jawaban.map(
                              (choice, cIndex) =>
                                  cIndex === choiceIndex ? value : choice
                          ),
                      }
                    : question
            ),
        }));
    };

    const handleSendQuestions = async () => {
        const response = await fetch("http://localhost:1337/api/ujians", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    nama_ujian: ujianData.nama_ujian,
                    deskripsi: ujianData.deskripsi,
                    pengawas: ujianData.pengawas,
                    waktu_mulai: ujianData.waktu_mulai,
                    soal: ujianData.soal,
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Data berhasil dikirim ke API:", data);
        } else {
            console.error(
                "Gagal mengirim data ke API:",
                response.status,
                response.statusText
            );
        }

        // console.log('Mengirim data ujian ke API', ujianData);
        // Reset state jika diperlukan
        setUjianData({
            nama_ujian: "",
            deskripsi: "",
            pengawas: "",
            waktu_mulai: "",
            soal: [
                {
                    teks_pertanyaan: "",
                    pilihan_jawaban: ["", "", "", "", ""],
                    jawaban_benar: "",
                    poin_nilai: 0,
                },
            ],
        });
        setCurrentIndex(0);
    };

    return (
        <div>
            <h5>Form Ujian</h5>
            <div>
                <label>Nama Ujian:</label>
                <input
                    type="text"
                    value={ujianData.nama_ujian}
                    onChange={(e) =>
                        handleQuestionChange("nama_ujian", e.target.value)
                    }
                />
            </div>
            <div>
                <label>Deskripsi:</label>
                <textarea
                    value={ujianData.deskripsi}
                    onChange={(e) =>
                        handleQuestionChange("deskripsi", e.target.value)
                    }
                />
            </div>
            <div>
                <label>Pengawas:</label>
                <input
                    type="text"
                    value={ujianData.pengawas}
                    onChange={(e) =>
                        handleQuestionChange("pengawas", e.target.value)
                    }
                />
            </div>
            <div>
                <label>Waktu Mulai:</label>
                <input
                    type="datetime-local"
                    value={ujianData.waktu_mulai}
                    onChange={(e) =>
                        handleQuestionChange("waktu_mulai", e.target.value)
                    }
                />
            </div>
            {ujianData.soal.map((question, index) => (
                <div
                    key={index}
                    style={{
                        display: index === currentIndex ? "block" : "none",
                    }}>
                    <div>
                        <label>Teks Pertanyaan:</label>
                        <textarea
                            value={question.teks_pertanyaan}
                            onChange={(e) =>
                                handleQuestionChange(
                                    "teks_pertanyaan",
                                    e.target.value
                                )
                            }
                            placeholder={`Pertanyaan ${index + 1}`}
                        />
                    </div>
                    <div>
                        <label>Pilihan Jawaban:</label>
                        {question.pilihan_jawaban.map((choice, choiceIndex) => (
                            <div key={choiceIndex}>
                                <input
                                    type="text"
                                    value={choice}
                                    onChange={(e) =>
                                        handleChoiceChange(
                                            choiceIndex,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Pilihan ${choiceIndex + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <label>Jawaban Benar:</label>
                        <input
                            type="text"
                            value={question.jawaban_benar}
                            onChange={(e) =>
                                handleQuestionChange(
                                    "jawaban_benar",
                                    e.target.value
                                )
                            }
                        />
                    </div>
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
                    disabled={currentIndex === ujianData.soal.length - 1}>
                    Selanjutnya
                </button>
                <button
                    onClick={handleAddQuestion}
                    disabled={ujianData.soal.length >= 25}>
                    Tambah Soal
                </button>
                <button
                    onClick={handleSendQuestions}
                    disabled={ujianData.soal.length < 25}>
                    Kirim ke API
                </button>
            </div>
        </div>
    );
};

export default FormUjianExample;
