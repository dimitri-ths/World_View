'use client'

import { useEffect, useState } from 'react'
import { fetchsearchData } from '@/services/Users/UsersService'
import { Navbar } from '@/components/navbar'
import styles from './css/component.module.css'

export default function About({ params }: { params: { name: string } }) {
  const [Data, setData] = useState(null)
  const ref: string = params.name
  useEffect(() => {
    fetchsearchData(ref).then((response) => setData(response[0]))
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
        <div>
          <br></br>
          <div>
            {Data && <>{Data.translations.fra.common}</>}
            {Data && <img className="flags" src={Data.flags.svg} />}
          </div>

          <b>Information basic du pays :</b>
          <br></br>
          <br></br>
          <>
            Noms communs : {Data && <>{Data.name.common}</>}
            {commonName} <br></br> Noms officiels : {Data && <>{Data.name.official}</>} {nativeName}
          </>
          <div>Top-Level Domain (TLD) : {Data.tld}</div>

          <b>Information géographique :</b>
          <p>
            Latitude, longitude : {Data.latlng[0]}, {Data.latlng[1]}
          </p>
          <p>Superficie : {Data.area}</p>
          <p>Pays en bordure : {Data.borders ? Data.borders.join(' - ') : 'Aucun pays frontalier'}</p>
          <p>Région : {Data.region}</p>
          <p>Sous région : {Data.subregion}</p>

          <b>information politique et administrative :</b>
          <p>Capitale du pays : {Data.capital}</p>
          <p>Pays indépendant : {Data.independent ? 'Oui' : 'Non'} </p>
          <p>Pays membre de l'UN : {Data.unMember ? 'Oui' : 'Non'} </p>

          <b>Information économique et démographique :</b>
          <p>Nombre d'habitants : {Data.population}</p>
          <p>
            Devises du pays : {moneyName} {moneySymbol}
          </p>
          <p>Coefficient GINI du pays : {Jeny === null ? 'Aucun coefficient GINI référencé' : Jeny} </p>

          <b>Information culturel : </b>
          <p>Languages du pays : {languages}</p>
          <p>
            Gentilés du pays : {Data.demonyms.fra.m} et {Data.demonyms.fra.f}
          </p>
        </div>
      </div>
    </div>
  )
}
