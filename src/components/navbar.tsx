import Link from 'next/link'
import React, { useState } from 'react'
import styles from './css/component.module.css'

export const Navbar = () => {
  const [name, setName] = useState(' ')

  return (
    <main>
      <div className={styles.nav}>
        <Link href="/">Accueil</Link>
        <div>
          <input onChange={(e) => setName(e.target.value)} required placeholder="Rechercher"></input>
          <Link href={`/recherche/${name}`} className={styles.search__result}>
            Rechercher
          </Link>
        </div>
      </div>
      <header>
        <style>@import url('https://fonts.googleapis.com/css?family=Pattaya')</style>
        <a className={styles.tittle} href="/">
          My world view
        </a>
      </header>
    </main>
  )
}
