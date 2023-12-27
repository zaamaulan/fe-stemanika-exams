import Card from '../components/Card/Card'
import Button from '../components/UI/Button'

const About = () => {
  return (
    <main className="flex flex-col px-6 md:items-center xl:px-0">
      <div className="w-full pb-20 xl:px-40 xl:py-20">
        <div className="min-w-sm mx-auto border-b md:mb-10 xl:max-w-screen-lg">
          <h1 className="mb-4 flex text-4xl font-bold text-black xl:text-5xl/[1.3]">
            {' '}
            Tentang Stemanika Exam{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="hidden h-6 w-6 md:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
          </h1>
          <p className="mb-6 text-sm text-gray-500 xl:mb-14 xl:text-lg">
            Selamat datang di Stemanika Exam, platform ujian sekolah yang dirancang untuk mempermudah pelaksanaan ujian
            secara online di SMKN 1 Majalengka. Kami adalah tim yang berdedikasi untuk memberikan pengalaman ujian yang
            efisien, praktis, dan andal bagi siswa.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 md:gap-10 xl:grid-cols-3 ">
          <div className="min-w-sm mx-auto xl:max-w-screen-lg">
            <Card>
              <h1 className="mb-4 text-2xl font-bold text-black xl:text-2xl/[1.3]">Visi</h1>
              <p className="mb-5 text-sm text-gray-500 xl:text-base">
                Menjadi solusi terdepan dalam penyelenggaraan ujian sekolah online, memajukan pendidikan melalui
                teknologi yang inovatif.
              </p>
            </Card>
          </div>
          <div className="min-w-sm mx-auto xl:max-w-screen-lg">
            <Card>
              <h1 className="mb-4 text-2xl font-bold text-black xl:text-2xl/[1.3]">Misi</h1>
              <p className="mb-5 text-sm text-gray-500 xl:text-base">
                Memberikan pengalaman ujian online yang efisien dan praktis bagi siswa, dengan fokus pada kemudahan
                penggunaan dan keamanan data.
              </p>
            </Card>
          </div>
          <div className="min-w-sm mx-auto xl:max-w-screen-lg">
            <Card>
              <h1 className="mb-4 text-2xl font-bold text-black xl:text-2xl/[1.3]">Nilai-Nilai</h1>
              <p className="mb-5 text-sm text-gray-500 xl:text-base">
                Kualitas, Inovasi, Keamanan dan Kemudahan Pengguna.
              </p>
            </Card>
          </div>
        </div>
        <div className="min-w-sm mx-auto border-t md:mt-10 xl:max-w-screen-lg">
          <h1 className="mb-4 mt-6 flex text-4xl font-bold text-black xl:text-4xl/[1.3]">Hubungi Kami</h1>
          <p className="mb-5 text-sm text-gray-500  xl:text-base">
            Jika Anda memiliki pertanyaan atau masukan, jangan ragu untuk menghubungi kami di{' '}
            <strong>info@stemanikaexam.com</strong>.
          </p>
          <div className="md justify-center">
            <Button>Pelajari Selanjutnya</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About

// Inovasi Ujian:
// Mengembangkan teknologi terkini untuk menciptakan pengalaman ujian yang inovatif dan adaptif.

// Pendukung Pendidikan:
// Menyediakan platform yang dapat mendukung proses pendidikan dan evaluasi di SMKN 1 Majalengka.

// Keamanan Utama:
// Menjamin keamanan data dan integritas ujian untuk memberikan kepercayaan kepada pengguna.

// Kolaborasi dengan Sekolah:
// Bermitra dengan sekolah untuk memahami kebutuhan unik mereka dan terus meningkatkan layanan kami.
