import React from 'react'
import Urna from '../components/Urna'
import TabelaCandidatos from '../components/TabelaCandidatos'

export default function HomePage() {
  return (
    <div>
      <TabelaCandidatos/>
      <Urna/>
    </div>
  )
}
