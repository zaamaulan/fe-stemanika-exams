import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/useAuth'

const Profile = () => {
  const { userId } = useAuth()

  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/users/${userId}?populate=*`)
        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [userId])

  return (
    // <div className="grid h-[50vh] place-items-center">
    //   <h1>{userData.username}</h1>
    //   <p>Email: {userData.email}</p>
    //   <p>Provider: {userData.provider}</p>
    //   <p>Confirmed: {userData.confirmed ? 'Yes' : 'No'}</p>
    //   <p>Blocked: {userData.blocked ? 'Yes' : 'No'}</p>
    //   <p>Created At: {userData.createdAt}</p>
    //   <p>Updated At: {userData.updatedAt}</p>
    //   <p>Kelas: {userData.kelas?.kelas}</p>
    //   <p>Nilai:</p>
    //   <ul>
    //     {userData.nilai &&
    //       userData.nilai.map((nilai) => (
    //         <li key={nilai.id}>
    //           <p>Nilai: {nilai.nama_ujian}</p>
    //           <p>Nilai: {nilai.nilai}</p>
    //         </li>
    //       ))}
    //   </ul>
    // </div>
    <div className="flex flex-col px-6 md:items-center xl:px-0">
      <section className="xl:flex xl:w-full xl:flex-col xl:px-40 xl:py-20">
        <div className="min-w-sm mb-6 w-full xl:mb-14">
          <div className="mb-6 w-40 rounded-full border-2 border-black p-1 xl:w-72">
            <img src="/profile2.png" alt="" className="rounded-full" />
          </div>
          <div>
            <div>
              <h1 className="mb-2 text-4xl font-bold text-black xl:text-5xl">{userData.username}</h1>
              <p className="mb-6 max-w-screen-md text-sm text-black xl:text-base">{userData.email}</p>
            </div>
            {/* <div>
              <p className="mb-2 max-w-screen-md text-sm font-bold text-black xl:text-base">Bio</p>
              <p className="mb-6 max-w-screen-md text-sm text-black xl:text-base">{userData.bio}</p>
            </div> */}
          </div>
          <div>
            <p className="mb-2 max-w-screen-md text-sm font-bold text-black xl:text-base">Informasi lainnya</p>
            <p className="mb-6 max-w-screen-md text-sm text-black xl:text-base">Kelas: {userData.kelas?.kelas}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
