'use client'

import React, { useEffect, useState } from 'react'
import { fetchUsersData } from '@/services/Users/UsersService'
import CountryCard from '../components/countryCard'
import styles from './css/home.module.css'
import { Navbar } from '@/components/navbar'

export default function Home() {
  const [Data, setData] = useState(null)
  useEffect(() => {
    fetchUsersData().then((response) => {
      const sortedData = response.sort((a, b) => a.name.common.localeCompare(b.name.common))
      setData(sortedData)
    })
  }, [])

  return (
    <div>
      {' '}
      <Navbar />
      <div className={styles.responsive}>
        <>
          {Data &&
            Data.map((country, index) => {
              return (
                <div key={index}>
                  <CountryCard country={country} />
                </div>
              )
            })}
        </>
      </div>
    </div>
  )
}
