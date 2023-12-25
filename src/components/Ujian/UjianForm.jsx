import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format, addSeconds } from 'date-fns' // Import format and addSeconds functions
import { useUjianContext } from '../../context/ujianContext'
import Card from '../Card/Card'
import ButtonPrimary from '../UI/Button'

const UjianForm = () => {
  const navigate = useNavigate()
  const { examId } = useParams()
  const [examData, setExamData] = useState({})
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const { ujianData } = useUjianContext()

  useEffect(() => {
    const existingExamData = ujianData.find((ujian) => ujian.id === parseInt(examId))

    if (existingExamData) {
      const examAttributes = existingExamData.attributes || {}
      const examQuestions = examAttributes.soal || []

      setAnswers(examQuestions.length > 0 ? Array(examQuestions.length).fill(null) : [])
      setExamData(existingExamData)

      const durationInMinutes = examAttributes.duration || 60
      setCountdown(durationInMinutes * 60)
    }
  }, [examId, ujianData])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer)
          console.log('Waktu Habis')
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, navigate])

  const formattedCountdown = format(addSeconds(new Date(0), countdown), 'mm:ss')

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
    <div className="px-6  xl:flex xl:w-full xl:flex-col xl:px-40 xl:py-20">
      {attributes && (
        <>
          <h1 className="mb-2 flex text-4xl font-bold text-black xl:text-5xl/[1.3]">{attributes.nama_ujian}</h1>
          <p className="mb-6 max-w-screen-md text-sm text-gray-600 xl:text-base">{attributes.deskripsi}</p>
          <p className="sticky top-16 mb-2 flex bg-white  py-4 text-sm   text-black xl:top-20 xl:text-xl">
            Waktu Tersisa: {formattedCountdown}
          </p>
          <div className="grid grid-cols-1 gap-6">
            {attributes.soal && attributes.soal.length > 0 ? (
              attributes.soal.map((q, index) => (
                <div key={q.id}>
                  <Card>
                    <p className="mb-4 text-lg font-bold">Pertanyaan {index}</p>
                    <p className="mb-6 text-black xl:text-lg">{q.teks_pertanyaan}</p>
                    <ul className="flex flex-col gap-y-2">
                      {q.pilihan_jawaban.map((option, optionIndex) => (
                        <li key={optionIndex}>
                          <label
                            className="flex cursor-pointer items-center gap-x-3"
                            onClick={() => handleChange(index, option)}
                          >
                            <div
                              className={`flex h-4 w-4 items-center justify-center   md:h-5 md:w-5 ${
                                answers[index] === option ? ' text-white' : 'border-gray-400 rounded-full border'
                              }`}
                            >
                              {answers[index] === option && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="black"
                                  className="h-5 w-5"
                                >
                                  <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
                                </svg>
                              )}
                            </div>
                            <p>{option}</p>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              ))
            ) : (
              <p>No questions available.</p>
            )}{' '}
          </div>

          <div onClick={handleSubmit} className='mt-6'>
            <ButtonPrimary>Submit</ButtonPrimary>
          </div>
        </>
      )}
    </div>
  )
}

export default UjianForm
