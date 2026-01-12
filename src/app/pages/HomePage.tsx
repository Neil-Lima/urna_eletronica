 'use client'
 import React, { useState } from 'react'
 import { Button, Modal } from 'react-bootstrap'
 import Urna from '../components/Urna'
 import TabelaCandidatos from '../components/TabelaCandidatos'

export default function HomePage() {
  const [showCandidates, setShowCandidates] = useState(false)

  const handleOpenCandidates = () => setShowCandidates(true)
  const handleCloseCandidates = () => setShowCandidates(false)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button variant="primary" onClick={handleOpenCandidates}>
          Ver lista de candidatos
        </Button>
      </div>

      <Urna/>

      <Modal show={showCandidates} onHide={handleCloseCandidates} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Lista de candidatos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TabelaCandidatos />
        </Modal.Body>
      </Modal>
    </div>
  )
}
