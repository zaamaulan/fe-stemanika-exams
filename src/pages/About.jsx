import React from 'react'

const About = () => {
  return (
    <main className="flex flex-col px-6 md:items-center xl:px-0">
      <div className="w-full pb-20 pt-32  xl:py-52">
        <div className="min-w-sm mx-auto md:text-center xl:max-w-screen-lg ">
          <h1 className="mb-4 text-4xl font-bold text-black xl:text-5xl/[1.3]">Tentang Kami</h1>
          <p className="mb-6 text-xs text-gray-500 xl:mb-14 xl:text-lg">
            Selamat datang di Stemanika Exam, platform ujian sekolah yang dirancang untuk mempermudah pelaksanaan ujian
            secara online di SMKN 1 Majalengka. Kami adalah tim yang berdedikasi untuk memberikan pengalaman ujian yang
            efisien, praktis, dan andal bagi siswa.
          </p>
        </div>
      </div>
    </main>
  )
}

export default About
