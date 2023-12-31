// UjianDetail.js

import { differenceInMinutes, format, isPast } from 'date-fns'
import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { useUjianContext } from '../../context/ujianContext'
import Button from '../UI/Button'
import {
  CompletedTags,
  LastMinutePreparationTags,
  OngoingTags,
  PostExamReflectionPreTags,
  UpcomingTags,
} from '../Tag/Tags'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/useAuth'

const UjianDetail = () => {
  const { examId } = useParams()
  const { ujianData } = useUjianContext()
  const { userId } = useAuth()

  // Find the specific exam using examId
  const ujian = ujianData.find((ujian) => ujian.id === parseInt(examId))

  const [hasTakenExam, setHasTakenExam] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/nilais?populate=*`)

        const userScores = response.data.data || []
        const hasTakenExam = userScores.some(
          (score) =>
            score.attributes.user?.data?.id === userId && score.attributes.ujian?.data?.id === parseInt(examId, 10),
        )
        setHasTakenExam(hasTakenExam)
      } catch (error) {
        console.error('Terjadi kesalahan:', error.message)
      }
    }

    fetchData()
  }, [userId, examId])

  if (!ujian) {
    return <div className="-mt-28 flex h-screen items-center justify-center text-xl">Loading</div>
  }

  let status = null
  let tagComponent = null

  const currentTime = new Date()
  const waktuMulai = new Date(ujian.attributes.waktu_mulai)
  const waktuSelesai = new Date(waktuMulai.getTime() + ujian.attributes.durasi_ujian * 60000)
  const selisihMenit = differenceInMinutes(waktuMulai, currentTime)

  if (currentTime >= waktuMulai && currentTime <= waktuSelesai) {
    tagComponent = <OngoingTags />
    status = (
      <Link to={`/exam/${examId}/form`}>
        <Button className={'bg-green-500 text-white'}>Mulai Mengerjakan</Button>
      </Link>
    )
  } else if (selisihMenit > 3) {
    tagComponent = <UpcomingTags />
    status = (
      <Button isDisabled={true} className={'bg-blue-500 text-white'}>
        Ujian Belum Tersedia
      </Button>
    )
  } else if (selisihMenit <= 3 && selisihMenit >= 0) {
    tagComponent = <LastMinutePreparationTags />
    status = (
      <Button isDisabled={true} className={'bg-yellow-500 text-white'}>
        Ujian Ini Tersedia Dalam Beberapa Menit Lagi
      </Button>
    )
  } else if (isPast(waktuSelesai) && differenceInMinutes(currentTime, waktuSelesai) < 3) {
    tagComponent = <PostExamReflectionPreTags />
    status = (
      <Button isDisabled={true} className={'bg-purple-500 text-white'}>
        Ujian Sudah Berakhir Beberapa Menit yang Lalu
      </Button>
    )
  } else if (isPast(waktuSelesai) && differenceInMinutes(currentTime, waktuSelesai) >= 3) {
    tagComponent = <CompletedTags />
    status = (
      <Button isDisabled={true} className={'bg-gray-500 text-white'}>
        Ujian Sudah Berakhir
      </Button>
    )
  }

  return (
    <>
      {ujian ? (
        <section className="px-6 md:items-center xl:flex xl:w-full xl:flex-col xl:px-60 xl:py-20">
          <div className="min-w-sm mb-6 w-full xl:mb-14">
            <div className="gap-6 xl:flex">
              <div className="basis-3/4">
                <div className="mb-4">{tagComponent}</div>
                <div className="mb-4">
                  <h1 className="mb-2 flex text-4xl font-bold text-black xl:text-5xl/[1.3]">
                    {ujian.attributes.nama_ujian}
                  </h1>

                  <p className="mb-6 max-w-screen-md text-sm text-gray-600 xl:text-base">
                    {ujian.attributes.deskripsi}
                  </p>
                </div>
                <div className="mb-6 ">
                  <p className="mb-2 flex text-sm text-black xl:text-base">
                    Guru Pengawas: {ujian.attributes.pengawas}
                  </p>
                  <p className="mb-2 flex text-sm text-black xl:text-base">
                    Tanggal: {format(new Date(ujian.attributes.waktu_mulai), 'dd MMMM yyyy', { locale: id })}
                  </p>
                  <p className="mb-2 flex text-sm text-black xl:text-base">
                    Pukul: {format(new Date(ujian.attributes.waktu_mulai), 'HH:mm', { locale: id })} WIB
                  </p>
                  <p className="mb-2 flex text-sm text-black xl:text-base">
                    Durasi Pengerjaan: {ujian.attributes.durasi_ujian} menit
                  </p>
                  <p className="mb-2 flex text-sm text-black xl:text-base">
                    Jumlah Pertanyaan: {ujian.attributes.jumlah_soal} pertanyaan
                  </p>
                </div>

                {hasTakenExam ? (
                  <Button isDisabled={hasTakenExam} className={`${hasTakenExam ? 'bg-gray-500 text-white' : null}`}>
                    Kamu sudah mengerjakan ujian ini
                  </Button>
                ) : (
                  status
                )}
              </div>
              <motion.div className="pt-20 xl:pt-0">
                <motion.h1
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                  className="mb-4 flex border-b pb-4 text-2xl font-bold text-black xl:text-3xl"
                >
                  Peraturan dan Panduan Mengerjakan Ujian
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                >
                  <div className="space-y-2 text-sm text-gray-600  xl:text-base">
                    <p>1. Peserta ujian harus masuk ke ruang ujian sesuai dengan jadwal yang ditentukan.</p>
                    <p>2. Peserta ujian harus menunjukkan identitas diri kepada pengawas ujian.</p>
                    <p>
                      3. Peserta ujian harus menyalakan kamera dan mikrofon perangkat yang digunakan untuk mengerjakan
                      ujian.
                    </p>
                    <p>4. Peserta ujian harus mengerjakan soal ujian sesuai dengan petunjuk yang diberikan.</p>
                    <p>
                      5. Peserta ujian tidak diperbolehkan menggunakan alat bantu lain selain yang telah ditentukan.
                    </p>
                    <p>
                      6. Peserta ujian tidak diperbolehkan berkomunikasi dengan orang lain selama ujian berlangsung.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      ) : (
        <div className="-mt-28 flex h-screen items-center justify-center text-xl">Loading</div>
      )}
    </>
  )
}

export default UjianDetail
