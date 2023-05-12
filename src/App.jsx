import Header from './components/Header'
import Quiz from './components/Quiz'
import Blobs from './components/Blobs'

import { useState } from 'react'

export default function App() {
  const [section, setSection] = useState('hero')

  function changeSection() {
    setSection('quiz')
  }

  return (
    <>
      {section === 'hero' ? <Header changeSection={changeSection} /> : <Quiz />}
      <Blobs />
    </>
  )
}
