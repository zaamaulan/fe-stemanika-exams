// UjianDetail.js

import { differenceInMinutes, format, isPast } from 'date-fns'
import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { useUjianContext } from '../../context/ujianContext'
import Button from '../UI/Button'

const UjianDetail = () => {
  const { examId } = useParams()
  const { ujianData } = useUjianContext()

  // Find the specific exam using examId
  const ujian = ujianData.find((ujian) => ujian.id === parseInt(examId))

  if (!ujian) {
    return <div className="-mt-28 flex h-screen items-center justify-center text-xl">Loading</div>
  }

  let status = null

  const currentTime = new Date()
  const waktuMulai = new Date(ujian.attributes.waktu_mulai)
  const waktuSelesai = new Date(waktuMulai.getTime() + ujian.attributes.durasi_ujian * 60000)
  const selisihMenit = differenceInMinutes(waktuMulai, currentTime)

  // upcoming
  if (selisihMenit > 30 || (selisihMenit <= 3 && selisihMenit >= 0)) {
    status = (
      <Button isDisabled={true} className={'bg-gray-400 text-white '}>
        Ujian Belum Tersedia
      </Button>
    )
  } 
  // completed
  else if (
    (isPast(waktuSelesai) && differenceInMinutes(currentTime, waktuSelesai) < 3) ||
    (isPast(waktuSelesai) && differenceInMinutes(currentTime, waktuSelesai) >= 3)
  ) {
    status = (
      <Button isDisabled={true} className={'bg-gray-400 text-white'}>
        Ujian Sudah Berakhir
      </Button>
    )
  }
  // ongoing
  else if (currentTime >= waktuMulai && currentTime <= waktuSelesai) {
    status = (
      <Link to={`/exam/${examId}/form`}>
        <Button className={' bg-black text-white '}>Mulai Kerjakan</Button>
      </Link>
    )
  }
  return (
    <>
      {ujian ? (
        <section className="px-6 md:items-center xl:flex xl:w-full xl:flex-col xl:px-40 xl:py-20">
          <div className="min-w-sm mb-6 w-full xl:mb-14">
            <div className="gap-6 xl:flex">
              <div className="basis-3/4">
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
                </div>

                {status}
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
