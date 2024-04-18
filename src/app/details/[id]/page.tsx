'use client'

import { useEffect, useState } from 'react'
import { fetchUserData } from '@/services/Users/UsersService'
import { Navbar } from '@/components/navbar'
import styles from './css/details.module.css'

export default function About({ params }: { params: { id: string } }) {
  const [Data, setData] = useState(null)
  const ref: string = params.id
  useEffect(() => {
    fetchUserData(ref).then((response) => setData(response[0]))
  }, [])

  if (!Data) {
    return null
  }

  const langs: any = []
  for (const key in Data.languages) {
    langs.push(Data.languages[key])
  }

  let languages = ''
  langs.map((language: string, index: number) => {
    if (index === langs.length - 1) {
      languages += language
    } else {
      languages += language + ' - '
    }
  })

  const base: any = []
  for (const key in Data.name.nativeName) {
    base.push(Data.name.nativeName[key])
  }

  let commonName = ''
  let nativeName = ''
  base.map((names: { common: string; official: string }) => {
    commonName += ' - ' + names.common
    nativeName += ' - ' + names.official
  })

  const money: any = []
  for (const key in Data.currencies) {
    money.push(Data.currencies[key])
  }

  let moneyName = ''
  let moneySymbol = ''
  money.map((names: string) => {
    moneyName += names.name
    moneySymbol += names.symbol
  })

  let Jeny: string = null
  for (const key in Data.gini) {
    Jeny = Data.gini[key] + ' en ' + key
  }

  return (
    <div>
      <Navbar />
      <div className={styles.country}>
        <br></br>
        <div className={styles.car}>{Data && <>{Data.translations.fra.common}</>}</div>
        <br></br>
        <br></br>
        {Data && <img className="flags" src={Data.flags.svg} />}

        <br></br>
        <br></br>

        <b>Information basic du pays :</b>
        <br></br>
        <br></br>
        <>
          Noms communs : {Data && <>{Data.name.common}</>}
          {commonName} <br></br> Noms officiels : {Data && <>{Data.name.official}</>} {nativeName}
        </>
        <div>Top-Level Domain (TLD) : {Data.tld}</div>
        <br></br>
        <br></br>

        <b>Information géographique :</b>

        <br></br>
        <br></br>

        <p>
          Latitude, longitude : {Data.latlng[0]}, {Data.latlng[1]}
        </p>
        <p>Superficie : {Data.area}</p>
        <p>Pays en bordure : {Data.borders ? Data.borders.join(' - ') : 'Aucun pays frontalier'}</p>
        <p>Région : {Data.region}</p>
        <p>Sous région : {Data.subregion}</p>

        <br></br>
        <br></br>

        <b>information politique et administrative :</b>

        <br></br>
        <br></br>
        <p>Capitale du pays : {Data.capital}</p>
        <p>Pays indépendant : {Data.independent ? 'Oui' : 'Non'} </p>
        <p>Pays membre de l'UN : {Data.unMember ? 'Oui' : 'Non'} </p>
        <br></br>
        <br></br>

        <b>Information économique et démographique :</b>

        <br></br>
        <br></br>
        <p>Nombre d'habitants : {Data.population}</p>
        <p>
          Devises du pays : {moneyName} {moneySymbol}
        </p>
        <p>Coefficient GINI du pays : {Jeny === null ? 'Aucun coefficient GINI référencé' : Jeny} </p>

        <br></br>
        <br></br>
        <b>Information culturel : </b>
        <br></br>
        <br></br>
        <p>Languages du pays : {languages}</p>
        <p>
          Gentilés du pays : {Data.demonyms.fra.m} et {Data.demonyms.fra.f}
        </p>
      </div>
    </div>
  )
}
