import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuth } from '../context/useAuth';


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
    <div className="grid h-[50vh] place-items-center">
      <h1>{userData.username}</h1>
      <p>Email: {userData.email}</p>
      <p>Provider: {userData.provider}</p>
      <p>Confirmed: {userData.confirmed ? 'Yes' : 'No'}</p>
      <p>Blocked: {userData.blocked ? 'Yes' : 'No'}</p>
      <p>Created At: {userData.createdAt}</p>
      <p>Updated At: {userData.updatedAt}</p>
      <p>Kelas: {userData.kelas?.kelas}</p>
      <p>Nilai:</p>
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

export default Profile;