// UjianContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios' // Import axios
import PropTypes from 'prop-types'
import dummyExam from '../data/dummyExam.json'

const UjianContext = createContext()

export const UjianProvider = ({ children }) => {
  const [ujianData, setUjianData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/ujians?populate=*`) // Use the function from your api.js file
        setUjianData(response.data.data)
      } catch (error) {
        setUjianData(dummyExam)
        console.error('Error fetching ujian data:', error)
      }
    }

    fetchData()
  }, [])
  console.log(ujianData);


  return <UjianContext.Provider value={{ ujianData }}>{children}</UjianContext.Provider>
}

export const useUjianContext = () => {
  return useContext(UjianContext)
}

UjianProvider.propTypes = {
  children: PropTypes.node,
}

