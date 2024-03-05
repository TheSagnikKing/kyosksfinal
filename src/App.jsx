import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Public = React.lazy(() => import("./components/public/Public"))
const JoinQueue = React.lazy(() => import("./components/JoinQueue/JoinQueue"))

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/joinqueue" element={<JoinQueue />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App