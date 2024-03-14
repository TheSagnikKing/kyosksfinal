import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarberKiyoskDashboardProtect from './components/Protected/Barber/BarberKiyoskDashboardProtect';

const Public = React.lazy(() => import("./components/public/Public"));
const JoinQueue = React.lazy(() => import("./components/JoinQueue/JoinQueue"));
const QueueList = React.lazy(() => import("./components/QueueList/QueueList"))
const BarberSignin = React.lazy(() => import("./components/barber/Signin/Signin"));
const AdminSignin = React.lazy(() => import("./components/AdminSignin/AdminSignin"))
const Table = React.lazy(() => import("./components/barber/demo/Table"))
const KiyoskDashboard = React.lazy(() => import("./components/Dashboard/Dashboard"))

const ProtectedAuthRoute = React.lazy(() => import('./components/Protected/Admin/ProtectedAuthRoute'))
const ProtectedRoute = React.lazy(() => import('./components/Protected/Admin/ProtectedRoute'))

const App = () => {

  return (<>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route element={<ProtectedAuthRoute />}>
            <Route path="/" element={<AdminSignin />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/kiyosk" element={<Public />} />
            <Route path="/joinqueue" element={<JoinQueue />} />
            <Route path="/queuelist" element={<QueueList/>}/>
            <Route path="/barbersignin" element={<BarberSignin />} />
            <Route element={<BarberKiyoskDashboardProtect />}>
              <Route path="/kiyoskdashboard" element={<KiyoskDashboard />} />
            </Route>
          </Route>


          <Route path='/table' element={<Table />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  </>
  );
};

export default App;
