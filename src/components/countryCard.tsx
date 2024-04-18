import { useState } from 'react'
import Link from 'next/link'
import styles from './css/component.module.css'

const CountryCard = (country: { country: any }) => {
  const [Data] = useState(country.country)

  return (
    <>
      <div className={styles.country}>
        {Data && (
          <>
            <Link href={`/details/${Data.ccn3}`}>
              <img className="flags" src={Data.flags.png} alt={Data.flags.alt} />
              <div>{Data.translations.fra.official}</div>
            </Link>
          </>
        )}
      </div>
    </>
  )
}

export default CountryCard
