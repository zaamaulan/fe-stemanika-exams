import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUjianContext } from '../../context/ujianContext'

const UjianForm = () => {
  const { examId } = useParams()
  const [examData, setExamData] = useState({})
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const { ujianData } = useUjianContext()

  useEffect(() => {
    const existingExamData = ujianData.find((ujian) => ujian.id === parseInt(examId))

    if (existingExamData) {
      const examAttributes = existingExamData.attributes || {}
      const examQuestions = examAttributes.soal || []

      // Initialize array answers with null if there are questions, otherwise, give an empty array
      setAnswers(examQuestions.length > 0 ? Array(examQuestions.length).fill(null) : [])

      setExamData(existingExamData)
    }
  }, [examId, ujianData])

  const handleChange = (index, selectedOption) => {
    const newAnswers = [...answers]
    newAnswers[index] = selectedOption
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (answers.some((answer) => answer === null)) {
      console.log('Harus menjawab semua pertanyaan!')
      return
    }

    const newScore = answers.reduce(
      (acc, answer, index) => (answer === examData.attributes.soal[index].jawaban_benar ? acc + 4 : acc),
      0,
    )

    setScore(newScore)
    console.log('Skor akhir:', newScore)
  }

  const { attributes } = examData

  return (
    <div>
      {attributes && (
        <>
          <h1>{attributes.nama_ujian}</h1>
          <p>{attributes.deskripsi}</p>
          {attributes.soal && attributes.soal.length > 0 ? (
            attributes.soal.map((q, index) => (
              <div key={q.id}>
                <p>{q.teks_pertanyaan}</p>
                <ul>
                  {q.pilihan_jawaban.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() => handleChange(index, option)}
                        />

                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  )
}

export default UjianForm
