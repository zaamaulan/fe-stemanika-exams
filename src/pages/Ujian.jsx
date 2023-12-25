import UjianList from '../components/Ujian/UjianList'
import { useUjianContext } from '../context/ujianContext'

const Ujian = () => {
  const { ujianData } = useUjianContext()

  return (
    <div className="flex flex-col px-6 md:items-center xl:px-0">
      <UjianList ujianList={ujianData} />
    </div>
  )
}

export default Ujian
