import React, { useEffect, useState } from 'react'
import { useResultContext } from '../context/scoreContext'
import axios from 'axios'
import { useAuth } from '../context/useAuth'

const Result = () => {
  const { score } = useResultContext()
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
    <div className="">
      <p>Informasi Nilai Untuk User: {userData.username}</p>
      <ul>
        {userData.nilai &&
          userData.nilai.map((nilai) => (
            <li key={nilai.id}>
              <p>Nilai: {nilai.nama_ujian}</p>
              <p>Nilai: {nilai.nilai}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Result
