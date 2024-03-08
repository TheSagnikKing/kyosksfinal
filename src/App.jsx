import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Public = React.lazy(() => import("./components/public/Public"));
const JoinQueue = React.lazy(() => import("./components/JoinQueue/JoinQueue"));
const BarberSignin = React.lazy(() => import("./components/barber/Signin/Signin"));
const AdminSignin = React.lazy(() => import("./components/AdminSignin/AdminSignin"))
const Table = React.lazy(() => import("./components/barber/demo/Table"))
const KiyoskDashboard = React.lazy(() => import("./components/Dashboard/Dashboard"))

const App = () => {

  return (<>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/kiyosk" element={<Public />} />
          <Route path="/joinqueue" element={<JoinQueue />} />
          <Route path="/barbersignin" element={<BarberSignin />} />
          <Route path="/kiyoskdashboard" element={<KiyoskDashboard/>}/>
          <Route path='/table' element={<Table />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>
  );
};

export default App;
