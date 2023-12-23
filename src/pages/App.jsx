import { differenceInMinutes, format, isPast } from 'date-fns'
import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card/Card'
import {
  CompletedTags,
  LastMinutePreparationTags,
  OngoingTags,
  PostExamReflectionPreTags,
  UpcomingTags,
} from '../components/Tag/Tags'
import ButtonPrimary from '../components/UI/Button'

export const App = () => {
  const [daftarUjian, setDaftarUjian] = useState(null)

  useEffect(() => {
    const fetchDaftarUjian = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/ujians')
        const json = await response.json()

        // Ambil seluruh data ujian dari response
        const allUjian = json.data

        // Acak urutan array
        const shuffledUjian = allUjian.sort(() => Math.random() - 0.5)

        // Ambil 3 ujian pertama setelah diacak
        const limitedData = shuffledUjian.slice(0, 3)

        setDaftarUjian(limitedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDaftarUjian()
  }, [])

  const cardContent = [
    {
      title: 'Persiapan Sebelum Ujian',
      points: [
        'Perangkat yang diperlukan: Pastikan perangkat dan koneksi internet stabil.',
        'Ruangan yang Dipakai: Pelajari ketentuan ruangan dan pencahayaan.',
        'Koneksi Internet: Pastikan koneksi internet stabil.',
      ],
    },
    {
      title: 'Setelah Ujian',
      points: [
        'Verifikasi Hasil: Periksa hasil ujian setelah submit.',
        'Logout: Keluar dari akun dan tutup peramban.',
        'Koneksi Internet: Pastikan koneksi internet stabil.',
      ],
    },
    {
      title: 'Menjalani Ujian',
      points: [
        'Dashboard Ujian: Akses dashboard dan pilih ujian.',
        'Petunjuk Ujian: Baca petunjuk sebelum memulai ujian.',
        'Waktu Ujian: Perhatikan waktu setiap bagian ujian.',
        'Navigasi Soal: Gunakan navigasi untuk beralih antara soal.',
        'Submit Jawaban: Simpan jawaban dan klik "Submit".',
      ],
    },
    {
      title: 'Bantuan Teknis',
      points: ['Jika mengalami masalah teknis, hubungi guru pengawas atau tim dukungan teknis.'],
    },
  ]

  return (
    <main className="flex flex-col px-8 md:items-center xl:px-0">
      <div className="w-full py-32  xl:py-52">
        <div className="min-w-sm mx-auto md:text-center xl:max-w-screen-lg ">
          <h1 className="mb-4 text-4xl font-bold text-black xl:text-5xl/[1.3]">
            <span className="hidden md:inline-block">Selamat Datang di </span> Stemanika Exam Portal Ujian Sekolah{' '}
            <span className="hidden md:inline-block">SMKN 1 Majalengka!</span>
          </h1>
          <p className="mb-6 text-sm text-gray-500 xl:mb-14 xl:text-lg">
            Platform ujian sekolah khusus untuk siswa SMKN 1 Majalengka. Nikmati kemudahan mengikuti ujian online secara
            efisien dan praktis.
          </p>
          <Link to="/ujian">
            <ButtonPrimary>Lihat Ujian</ButtonPrimary>
          </Link>
        </div>
      </div>
      <section className="py-10 xl:px-40 xl:py-20 ">
        <div className="min-w-sm w-full">
          <h1 className="mb-2 text-3xl font-bold text-black xl:text-center xl:text-4xl">Mengapa Stemanika Exam?</h1>
          <p className="mb-6 text-sm text-gray-500 xl:mb-14 xl:text-center xl:text-base">
            Menjamin Integritas Ujian dan Kenyamanan Pengguna
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="mb-4 xl:text-center">
                  <h1 className="mb-2 mt-4 text-2xl font-bold text-black xl:text-3xl">Fleksibilitas</h1>

                  <p className="mb-6 text-sm text-gray-500 xl:mb-14 xl:text-center xl:text-base">
                    Stemanika Exam memberikan fleksibilitas dalam penjadwalan ujian. Peserta dapat mengakses platform
                    sesuai dengan jadwal ujian yang telah ditentukan
                  </p>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="mb-4 xl:text-center">
                  <h1 className="mb-2 mt-4 text-2xl font-bold text-black xl:text-3xl">Pembaruan Hasil Ujian</h1>

                  <p className="mb-6 text-sm text-gray-500 xl:mb-14 xl:text-center xl:text-base">
                    Kami menyajikan hasil ujian dengan cepat dan akurat. Peserta dapat segera melihat hasil dan analisis
                    kinerja mereka 4 hari setelah menyelesaikan ujian.
                  </p>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="mb-4 xl:text-center">
                  <h1 className="mb-2 mt-4 text-2xl font-bold text-black xl:text-3xl">Kemudahan Pengguna</h1>

                  <p className="mb-6 text-sm text-gray-500 xl:mb-14 xl:text-center xl:text-base">
                    Stemanika Exam dirancang agar mudah digunakan tanpa memerlukan proses yang rumit. Peserta dapat
                    dengan cepat mengakses ujian mereka dengan beberapa klik saja.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {daftarUjian && (
        <section className="py-10 xl:flex  xl:flex-col xl:items-center xl:px-40 xl:py-20">
          <div className="min-w-sm mb-6 w-full xl:mb-14">
            <h1 className="mb-2 text-3xl font-bold text-black xl:text-3xl">Daftar Ujian</h1>
            <p className="mb-6  text-sm text-gray-500 xl:text-base">Mari Bersiap, Pekan Ini Penuh Keajaiban Belajar!</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
              {daftarUjian.map((ujian) => {
                let tagComponent = null

                const currentTime = new Date()
                const waktuMulai = new Date(ujian.attributes.waktu_mulai)
                const waktuSelesai = new Date(waktuMulai.getTime() + ujian.attributes.durasi_ujian * 60000)
                const selisihMenit = differenceInMinutes(waktuMulai, currentTime)

                if (currentTime >= waktuMulai && currentTime <= waktuSelesai) {
                  tagComponent = <OngoingTags />
                } else if (selisihMenit > 30) {
                  tagComponent = <UpcomingTags />
                } else if (selisihMenit <= 3 && selisihMenit >= 0) {
                  tagComponent = <LastMinutePreparationTags />
                } else if (isPast(waktuSelesai) && differenceInMinutes(currentTime, waktuSelesai) < 3) {
                  tagComponent = <PostExamReflectionPreTags />
                } else if (isPast(waktuSelesai) && differenceInMinutes(currentTime, waktuSelesai) >= 3) {
                  tagComponent = <CompletedTags />
                }

                return (
                  <motion.div
                    key={ujian.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                    }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <div className="mb-10">
                        {tagComponent}
                        <h1 className="mb-2 mt-4 text-2xl font-semibold text-black">{ujian.attributes.nama_ujian}</h1>

                        <p className={`mb-6 line-clamp-3 text-sm text-gray-500`}>{ujian.attributes.deskripsi}</p>
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-medium text-black">
                          Tanggal: {format(new Date(ujian.attributes.waktu_mulai), 'dd MMMM yyyy', { locale: id })}
                        </p>
                        <p className="mb-2 text-sm font-medium text-black">
                          Pukul: {format(new Date(ujian.attributes.waktu_mulai), 'HH:mm', { locale: id })} WIB
                        </p>
                        <p className="mb-2 text-sm font-medium text-black">
                          Durasi Pengerjaan: {ujian.attributes.durasi_ujian} menit
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
          <Link to={'/ujian'}>
            <ButtonPrimary> Lihat Semua Ujian</ButtonPrimary>
          </Link>
        </section>
      )}
      <section className="py-10 xl:flex  xl:flex-col xl:items-center xl:px-40 xl:py-20">
        <div className="min-w-sm mb-6 w-full xl:mb-14">
          <h1 className="mb-2 text-3xl font-bold text-black xl:text-4xl">Panduan Ujian</h1>
          <p className="mb-6 text-sm text-gray-500 xl:text-base">
            Menghadapi Ujian dengan Keyakinan: Panduan Langkah-demi-Langkah
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
              >
                <Card className={'flex flex-col items-center justify-center'}>
                  <div className="mb-4">
                    <h1 className="mb-2 mt-4 flex items-center text-2xl font-bold text-black xl:text-3xl">
                      Persiapan Sebelum Ujian
                    </h1>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl"> Perangkat yang diperlukan:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Pastikan Anda menggunakan perangkat dengan koneksi internet stabil. Gunakan peramban web terbaru
                        seperti <strong>Google Chrome</strong>, <strong>Mozilla Firefox</strong>, atau{' '}
                        <strong>Safari</strong>.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl">Ruangan yang Dipakai:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Pelajari informasi tentang ruangan yang akan digunakan sesuai dengan ketentuan yang diberikan
                        oleh guru. Pastikan untuk mengetahui detail terkait kenyamanan ruangan dan pencahayaan.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl">Koneksi Internet:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Pastikan memiliki akses ke koneksi internet yang stabil untuk menjalani ujian dengan lancar.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
              >
                <Card className={'flex flex-col items-center justify-center'}>
                  <div className="mb-4">
                    <h1 className="mb-2 mt-4 flex items-center text-2xl font-bold text-black xl:text-3xl">
                      Setelah Ujian
                    </h1>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl"> Verifikasi Hasil:</p>
                      <p className="mb-6 text-sm text-gray-500 xl:mb-6 xl:text-base">
                        Setelah submit, verifikasi hasil ujian dan pastikan sesuai dengan jawaban yang telah diberikan.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl">Logout:</p>
                      <p className="mb-6 text-sm text-gray-500 xl:mb-6 xl:text-base">
                        Keluar dari akun setelah menyelesaikan ujian dan tutup peramban untuk keamanan akun.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl">Koneksi Internet:</p>
                      <p className="mb-6 text-sm text-gray-500 xl:mb-6 xl:text-base">
                        Pastikan memiliki akses ke koneksi internet yang stabil untuk menjalani ujian dengan lancar.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
            <div className="flex flex-col gap-10 ">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
              >
                <Card className={'flex flex-col items-center justify-center'}>
                  <div className="mb-4">
                    <h1 className="mb-2 mt-4 flex items-center text-2xl font-bold text-black xl:text-3xl">
                      Menjalani Ujian
                    </h1>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl"> Dashboard Ujian:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Setelah login, akses dashboard ujian dan pilih ujian yang akan diikuti.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl">Petunjuk Ujian:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Baca dengan teliti petunjuk ujian sebelum memulai untuk memahami aturan dan tata cara ujian.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl">Waktu Ujian:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Perhatikan waktu yang tersedia untuk setiap bagian ujian dan berikan peringatan saat waktu
                        hampir habis.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl">Navigasi Soal:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Gunakan navigasi untuk beralih antara soal dan perhatikan pertanyaan yang telah dikerjakan atau
                        belum.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-lg font-medium text-black xl:text-xl">Submit Jawaban:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Simpan jawaban secara berkala dan setelah menyelesaikan semua soal, klik &quot;Submit&quot;
                        untuk mengirim jawaban.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                className="grow"
              >
                <Card className={'flex h-full flex-col items-center justify-center'}>
                  <div className="mb-4 ">
                    <h1 className="mb-2 mt-4 flex items-center text-2xl font-bold text-black xl:text-3xl">
                      Bantuan Teknis
                    </h1>
                    <p className="mb-6 text-sm text-gray-500 xl:mb-6 xl:text-base">
                      Jika Anda mengalami masalah teknis selama ujian, harap segera hubungi guru pengawas di ruangan
                      atau hubungi tim dukungan teknis kami melalui
                      <strong className="underline">
                        {' '}
                        <a href="mailto:support@stemanikaexam.com">support@stemanikaexam.com</a>{' '}
                      </strong>{' '}
                      .
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
