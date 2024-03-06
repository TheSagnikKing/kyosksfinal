import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Public = React.lazy(() => import("./components/public/Public"));
const JoinQueue = React.lazy(() => import("./components/JoinQueue/JoinQueue"));
const BarberSignin = React.lazy(() => import("./components/barber/Signin/Signin"));
const Table = React.lazy(() => import("./components/barber/demo/Table"))

const App = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Public />} />
          <Route path="/joinqueue" element={<JoinQueue />} />
          <Route path="/barbersignin" element={<BarberSignin />} />
          <Route path='/table' element={<Table/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
