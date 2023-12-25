// UjianDetail.js

import { Link, useParams } from 'react-router-dom'
import { useUjianContext } from '../../context/ujianContext'
import Card from '../Card/Card'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const UjianDetail = () => {
  const { examId } = useParams()
  const { ujianData } = useUjianContext()

  // Find the specific exam using examId
  const ujian = ujianData.find((ujian) => ujian.id === parseInt(examId))

  return (
    <section className="px-6 md:items-center xl:flex xl:w-full xl:flex-col xl:px-40 xl:py-20">
      <div className="min-w-sm mb-6 w-full xl:mb-14">
        {ujian ? (
          <Card className={''}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>

            <div className="mb-10">
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
            {/* <ButtonPrimary>Detail</ButtonPrimary> */}
            <Link to={`/exam/${examId}/form`}>Kerjakan</Link>
          </Card>
        ) : (
          <p>Exam not found</p>
        )}
      </div>
    </section>
  )
}

export default UjianDetail
