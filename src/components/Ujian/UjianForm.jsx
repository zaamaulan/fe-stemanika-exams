import { addSeconds, differenceInSeconds, format } from 'date-fns' // Import format and addSeconds functions
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUjianContext } from '../../context/ujianContext'
import Card from '../Card/Card'
import Button from '../UI/Button'
import { useResultContext } from '../../context/scoreContext'

const UjianForm = () => {
  const navigate = useNavigate()
  const { examId } = useParams()
  const [isFilled, setIsFilled] = useState(false)
  const [examData, setExamData] = useState({})
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const { ujianData } = useUjianContext()
  const { updateScore } = useResultContext()

  const [currentPage, setCurrentPage] = useState(0)

  const [duration] = useState(60 * 60 * 1000)
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTimeLeft = sessionStorage.getItem(`timeLeft_${examId}`)
    return storedTimeLeft ? parseInt(storedTimeLeft, 10) : duration
  })

  useEffect(() => {
    const storedStartTime = localStorage.getItem(`startTime_${examId}`)
    const storedEndTime = localStorage.getItem(`endTime_${examId}`)

    let startTime
    if (storedStartTime) {
      startTime = parseInt(storedStartTime, 10)
    } else {
      startTime = new Date().getTime()
      localStorage.setItem(`startTime_${examId}`, startTime.toString())
    }

    let endTime
    if (storedEndTime) {
      endTime = parseInt(storedEndTime, 10)
    } else {
      endTime = startTime + duration
      localStorage.setItem(`endTime_${examId}`, endTime.toString())
    }

    const timerInterval = setInterval(() => {
      const now = new Date().getTime()
      const elapsedTime = now - startTime

      // Hitung sisa waktu
      const remainingTime = Math.max(0, endTime - now)
      setTimeLeft(remainingTime)
      sessionStorage.setItem(`timeLeft_${examId}`, remainingTime.toString())

      // Jika waktu ujian habis, hentikan interval, navigate, dan hapus waktu dari localStorage
      if (remainingTime === 0) {
        clearInterval(timerInterval)
        navigate(`/exam/${examId}`)
        localStorage.removeItem(`startTime_${examId}`)
        localStorage.removeItem(`endTime_${examId}`)
        sessionStorage.removeItem(`timeLeft_${examId}`)
      }
    }, 1000)

    // Membersihkan interval saat komponen dibongkar
    return () => {
      clearInterval(timerInterval)
      sessionStorage.removeItem(`timeLeft_${examId}`)
    }
  }, [duration, examId, navigate])

  // Konversi waktu milidetik menjadi format waktu (jam:menit:detik)
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const handleNextPage = () => {
    if (currentPage < examData.attributes.soal.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    const existingExamData = ujianData.find((ujian) => ujian.id === parseInt(examId))

    if (existingExamData) {
      const examAttributes = existingExamData.attributes || {}
      const examQuestions = examAttributes.soal || []

      setAnswers(examQuestions.length > 0 ? Array(examQuestions.length).fill(null) : [])
      setExamData(existingExamData)
    }
  }, [examId, ujianData])

  const handleChange = (selectedOption) => {
    const newAnswers = [...answers]
    newAnswers[currentPage] = selectedOption
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (answers.some((answer) => answer === null)) {
      setIsFilled(true)
      return
    } else {
      const { soal } = examData.attributes

      const result = answers.reduce(
        (acc, answer, index) => {
          const isCorrect = answer === soal[index].jawaban_benar
          return {
            correctCount: isCorrect ? acc.correctCount + 1 : acc.correctCount,
            wrongCount: isCorrect ? acc.wrongCount : acc.wrongCount + 1,
          }
        },
        { correctCount: 0, wrongCount: 0 },
      )

      const newScore = result.correctCount * 4

      setScore(newScore)
      updateScore(newScore)
      console.log('Skor akhir:', newScore)
      console.log('Soal yang benar:', result.correctCount)
      console.log('Soal yang salah:', result.wrongCount)

      navigate('/result')

      localStorage.removeItem(`startTime_${examId}`)
      localStorage.removeItem(`endTime_${examId}`)
    }
  }

  const { attributes } = examData

  return (
    <div className="px-6 xl:flex xl:w-full xl:flex-col xl:px-[20rem] xl:py-2">
      {attributes && (
        <div className="flex min-h-[86dvh] flex-col justify-between">
          <div>
            <h1 className="mb-2 flex text-4xl font-bold text-black xl:text-5xl/[1.3]">{attributes.nama_ujian}</h1>
            <p className="mb-6 max-w-screen-md text-sm text-gray-600 xl:text-base">{attributes.deskripsi}</p>
            <p className=" mb-2 flex bg-white  py-4 text-sm font-medium  text-black xl:text-xl">
              Waktu tersisa: {formatTime(timeLeft)}
            </p>
            {isFilled && <div className="pb-4 font-semibold text-red-500">Semua soal harus diisi!</div>}

            {/* {isFilled && (
              <div className="relative z-20 flex justify-center">
                {' '}
                <Modal
                  title={'upps!'}
                  content={
                    'Tebak jawaban yang kamu tidak tahu. Jika kamu benar-benar tidak tahu jawabannya, tebak saja. Lebih baik menebak daripada tidak sama sekali.'
                  }
                />
              </div>
            )} */}
            <div className="grid grid-cols-1 gap-6 transition-all">
              {attributes.soal && attributes.soal.length > 0 ? (
                <div key={attributes.soal[currentPage].id}>
                  <Card>
                    <p className="mb-4 text-lg font-bold">Pertanyaan {currentPage + 1}</p>
                    <p className="mb-6 text-black xl:text-lg">{attributes.soal[currentPage].teks_pertanyaan}</p>
                    <ul className="flex flex-col gap-y-2">
                      {attributes.soal[currentPage].pilihan_jawaban.map((option, optionIndex) => (
                        <li key={optionIndex}>
                          <label
                            className={`flex cursor-pointer items-center gap-x-3 transition-all duration-300 ${
                              answers[currentPage] === option && 'rounded-md bg-black px-3 py-2 text-white'
                            }`}
                            onClick={() => handleChange(option)}
                          >
                            <div
                              className={`flex h-4 w-4 items-center justify-center md:h-5 md:w-5
                              ${answers[currentPage] === option ? 'text-white' : 'rounded-full border border-gray-400'}
                              flex-shrink-0`}
                            >
                              {answers[currentPage] === option && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="white"
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
              ) : (
                <p>No questions available.</p>
              )}
            </div>
          </div>

          <div className="my-6 flex gap-2 xl:gap-6">
            {currentPage > 0 && (
              <Button onClick={handlePrevPage} className={'bg-black text-white xl:w-full'}>
                Previous
              </Button>
            )}
            {currentPage < attributes.soal.length - 1 ? (
              <Button onClick={handleNextPage} className={'bg-black text-white xl:w-full'}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className={'bg-black text-white xl:w-full'}>
                Submit
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UjianForm
