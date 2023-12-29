import { differenceInMinutes, format, isPast } from 'date-fns'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import {
  CompletedTags,
  LastMinutePreparationTags,
  OngoingTags,
  PostExamReflectionPreTags,
  UpcomingTags,
} from '../Tag/Tags'
import { useUjianContext } from '../../context/ujianContext'
import Button from '../UI/Button'
import { id } from 'date-fns/locale'

const UjianList = () => {
  const { ujianData } = useUjianContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortedUjianList, setSortedUjianList] = useState([])

  useEffect(() => {
    const sortUjianList = () => {
      const sortedList = [...ujianData].sort((a, b) => {
        const dateA = new Date(a.attributes.waktu_mulai)
        const dateB = new Date(b.attributes.waktu_mulai)
        return dateB - dateA
      })

      setSortedUjianList(sortedList)
    }

    sortUjianList()
  }, [ujianData])

  return (
    <section className="xl:flex xl:w-full xl:flex-col xl:px-40 xl:py-20">
      <div className="min-w-sm mb-6 w-full xl:mb-14">
        <h1 className=" mb-4 flex text-4xl font-bold text-black xl:text-5xl/[1.3]">Daftar Ujian</h1>

        <p className="mb-6 max-w-screen-md text-sm text-gray-500 xl:text-base">
          Halaman ini berisi daftar semua ujian yang akan dilaksanakan. Anda dapat melihat jadwal ujian, dan informasi
          lainnya.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="relative mb-4 w-full">
          <label htmlFor="search" className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </label>
          <input
            type="text"
            id="search"
            placeholder="Cari ujian..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border-2 p-2 pl-10 shadow-sm focus:outline-none md:max-w-xs"
          />
        </form>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
          {sortedUjianList
            .filter((ujian) => ujian.attributes.nama_ujian.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((ujian) => {
              let tagComponent = null

              const currentTime = new Date()
              const waktuMulai = new Date(ujian.attributes.waktu_mulai)
              const waktuSelesai = new Date(waktuMulai.getTime() + ujian.attributes.durasi_ujian * 60000)
              const selisihMenit = differenceInMinutes(waktuMulai, currentTime)

              if (currentTime >= waktuMulai && currentTime <= waktuSelesai) {
                tagComponent = <OngoingTags />
              } else if (selisihMenit > 3) {
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
                    delay: 0.4,
                  }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <div >
                      {tagComponent}
                      <h1 className="mb-2 mt-4 text-2xl font-semibold text-black">{ujian.attributes.nama_ujian}</h1>

                      <p className={`mb-4 line-clamp-3 text-sm text-gray-500`}>{ujian.attributes.deskripsi}</p>
                    </div>
                    <div className="mb-6">
                      <p className="mb-2 text-sm text-black">
                        Tanggal: {format(new Date(ujian.attributes.waktu_mulai), 'dd MMMM yyyy', { locale: id })}
                      </p>
                      <p className="mb-2 text-sm text-black">
                        Pukul: {format(new Date(ujian.attributes.waktu_mulai), 'HH:mm', { locale: id })} WIB
                      </p>
                      <p className="mb-2 text-sm text-black">
                        Durasi Pengerjaan: {ujian.attributes.durasi_ujian} menit
                      </p>
                    </div>
                    {/* <Button>Detail</Button> */}
                    <Link to={`/exam/${ujian.id}`}>
                     <Button>Lihat Detail</Button>
                    </Link>
                  </Card>
                </motion.div>
              )
            })}
          {sortedUjianList.filter((ujian) =>
            ujian.attributes.nama_ujian.toLowerCase().includes(searchTerm.toLowerCase()),
          ).length === 0 && <div className="mt-4 text-center text-gray-500">Ujian yang kamu cari tidak ada.</div>}
        </div>
      </div>
    </section>
  )
}

UjianList.propTypes = {
  ujianList: PropTypes.array.isRequired,
}

export default UjianList
