import React from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card/Card'

const Guide = () => {
  return (
    <div className="flex flex-col px-6 md:items-center xl:px-0">
      <section className="xl:flex xl:w-full xl:flex-col xl:px-40 xl:py-20">
        <div className="min-w-sm mb-6 w-full xl:mb-14">
          <h1 className="mb-4 flex text-4xl font-bold text-black xl:text-5xl/[1.3]">Panduan Ujian</h1>
          <p className="mb-6 text-sm text-gray-500 xl:text-base">
            Menghadapi Ujian dengan Keyakinan: Panduan Langkah-demi-Langkah
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-4 md:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className={'flex h-full flex-col items-center justify-center'}>
                  <div className="mb-4">
                    <h1 className="mb-2 mt-4 flex items-center text-xl font-bold text-black xl:text-3xl">
                      Persiapan Sebelum Ujian
                    </h1>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl">
                        {' '}
                        Perangkat yang diperlukan:
                      </p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Pastikan Anda menggunakan perangkat dengan koneksi internet stabil. Gunakan peramban web terbaru
                        seperti <strong>Google Chrome</strong>, <strong>Mozilla Firefox</strong>, atau{' '}
                        <strong>Safari</strong>.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl">Ruangan yang Dipakai:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Pelajari informasi tentang ruangan yang akan digunakan sesuai dengan ketentuan yang diberikan
                        oleh guru. Pastikan untuk mengetahui detail terkait kenyamanan ruangan dan pencahayaan.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl">Koneksi Internet:</p>
                      <p className=" text-sm text-gray-500 xl:text-base">
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
                  delay: 0.4,
                }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className={'flex h-full flex-col items-center justify-center'}>
                  <div className="mb-4">
                    <h1 className="mb-2 mt-4 flex items-center text-xl font-bold text-black xl:text-3xl">
                      Setelah Ujian
                    </h1>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl"> Verifikasi Hasil:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Setelah submit, verifikasi hasil ujian dan pastikan sesuai dengan jawaban yang telah diberikan.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl">Logout:</p>
                      <p className=" text-sm text-gray-500  xl:text-base">
                        Keluar dari akun setelah menyelesaikan ujian dan tutup peramban untuk keamanan akun.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
            <div className="flex flex-col gap-4 md:gap-10 ">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className={'flex h-full flex-col items-center justify-center'}>
                  <div className="mb-4">
                    <h1 className="mb-2 mt-4 flex items-center text-xl font-bold text-black xl:text-3xl">
                      Menjalani Ujian
                    </h1>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl"> Dashboard Ujian:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Setelah login, akses dashboard ujian dan pilih ujian yang akan diikuti.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl">Petunjuk Ujian:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Baca dengan teliti petunjuk ujian sebelum memulai untuk memahami aturan dan tata cara ujian.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl">Waktu Ujian:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Perhatikan waktu yang tersedia untuk setiap bagian ujian dan berikan peringatan saat waktu
                        hampir habis.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl">Navigasi Soal:</p>
                      <p className="mb-5 text-sm text-gray-500 xl:mb-5 xl:text-base">
                        Gunakan navigasi untuk beralih antara soal dan perhatikan pertanyaan yang telah dikerjakan atau
                        belum.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 mt-4 text-base font-semibold text-black xl:text-xl">Submit Jawaban:</p>
                      <p className=" text-sm text-gray-500 xl:text-base">
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
                  delay: 0.4,
                }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className={'flex h-full flex-col items-center justify-center'}>
                  <div className="mb-4 ">
                    <h1 className="mb-2 mt-4 flex items-center text-xl font-bold text-black xl:text-3xl">
                      Bantuan Teknis
                    </h1>
                    <p className=" text-sm text-gray-500 xl:text-base">
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
    </div>
  )
}

export default Guide
