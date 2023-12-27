import { addSeconds, differenceInSeconds, format } from 'date-fns'; // Import format and addSeconds functions
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUjianContext } from '../../context/ujianContext'
import Card from '../Card/Card'
import Button from '../UI/Button'

const UjianForm = () => {
  const navigate = useNavigate()
  const { examId } = useParams()
  const [examData, setExamData] = useState({})
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const { ujianData } = useUjianContext()

  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(null)
  const [remainingTime, setRemainingTime] = useState(0)
  const [formattedRemainingTime, setFormattedRemainingTime] = useState('00:00')
  const [storedExamDuration, setStoredExamDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm:ss'))
  const [timeDifference, setTimeDifference] = useState(0)

  useEffect(() => {
    const existingExamData = ujianData.find((ujian) => ujian.id === parseInt(examId))

    if (existingExamData) {
      const examAttributes = existingExamData.attributes || {}
      const examQuestions = examAttributes.soal || []

      setAnswers(examQuestions.length > 0 ? Array(examQuestions.length).fill(null) : [])
      setExamData(existingExamData)
    }
  }, [examId, ujianData])

  useEffect(() => {
    const storedStartTime = localStorage.getItem('startTime')
    const storedRemainingTime = localStorage.getItem('remainingTime')
    const storedExamDuration = localStorage.getItem('examDuration')
    const storedEndTime = localStorage.getItem('endTime')

    const date1 = new Date(`2000-01-01T${currentTime}Z`)
    const date2 = new Date(`2000-01-01T${storedEndTime}Z`)

    if (storedEndTime) {
      if (date2 < date1) {
        date2.setDate(date2.getDate() + 1)
      }

      const diff = date2 - date1

      const formattedRemainingTime = format(diff, 'mm:ss')
      setFormattedRemainingTime(formattedRemainingTime)
    }

    if (storedStartTime && storedRemainingTime && storedExamDuration) {
      const elapsedSeconds = differenceInSeconds(new Date(), new Date(storedStartTime))
      const remainingSeconds = Math.max(0, parseInt(storedRemainingTime, 10) - elapsedSeconds)

      setStartTime(new Date(storedStartTime))
      setRemainingTime(remainingSeconds)
      setStoredExamDuration(parseInt(storedExamDuration, 10))

      // Restore the end time if available
    } else {
      const now = new Date()

      // Check if startTime is not in localStorage before setting it
      if (!storedStartTime) {
        setStartTime(now)
        localStorage.setItem('startTime', format(now, 'HH:mm:ss'))
      }

      const examDuration = 3600
      const endTime = addSeconds(now, examDuration)
      setRemainingTime(examDuration)
      setStoredExamDuration(examDuration)

      // Check if endTime is not in localStorage before setting it
      if (!storedEndTime) {
        localStorage.setItem('endTime', format(endTime, 'HH:mm:ss'))
        setEndTime(endTime)
      }
    }

    const intervalId = setInterval(() => {
      // Perbarui waktu saat ini
      setCurrentTime(format(new Date(), 'HH:mm:ss'))

      // Perbarui selisih waktu dengan membandingkan endTime dengan waktu sekarang
      if (endTime) {
        const diff = differenceInSeconds(endTime, new Date())
        setTimeDifference(diff)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [currentTime, formattedRemainingTime, endTime, formattedRemainingTime])

  const handleChange = (index, selectedOption) => {
    const newAnswers = [...answers]
    newAnswers[index] = selectedOption
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (answers.some((answer) => answer === null)) {
      console.log('Harus menjawab semua pertanyaan!')
      return
    } else {
      const newScore = answers.reduce(
        (acc, answer, index) => (answer === examData.attributes.soal[index].jawaban_benar ? acc + 4 : acc),
        0,
      )

      setScore(newScore)
      console.log('Skor akhir:', newScore)

      navigate('/result')

      localStorage.removeItem('startTime')
      localStorage.removeItem('endTime')
    }
  }

  const { attributes } = examData

  return (
    <div className="px-6  xl:flex xl:w-full xl:flex-col xl:px-40 xl:py-20">
      {attributes && (
        <>
          <h1 className="mb-2 flex text-4xl font-bold text-black xl:text-5xl/[1.3]">{attributes.nama_ujian}</h1>
          <p className="mb-6 max-w-screen-md text-sm text-gray-600 xl:text-base">{attributes.deskripsi}</p>
          <p className="sticky top-16 mb-2 flex bg-white  py-4 text-sm font-medium  text-black xl:top-20 xl:text-xl">
            Waktu tersisa: {formattedRemainingTime}
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
                                answers[index] === option ? ' text-white' : 'rounded-full border border-gray-400'
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

          <div onClick={handleSubmit} className="my-6">
            <Button>Submit</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default UjianForm
