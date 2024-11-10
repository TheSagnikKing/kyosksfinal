import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { Grid } from 'react-loader-spinner';
import Loader from './components/Loader/Loader';
import { ErrorBoundary } from "react-error-boundary";
import { ExclamationIcon } from './icons';
import "./App.css"


const Public = React.lazy(() => import("./components/public/Public"));
const JoinQueue = React.lazy(() => import("./components/JoinQueue/JoinQueue"));
const QueueList = React.lazy(() => import("./components/QueueList/QueueList"))
const BarberSignin = React.lazy(() => import("./components/barber/Signin/Signin"));
const AdminSignin = React.lazy(() => import("./components/AdminSignin/AdminSignin"))
const KiyoskDashboard = React.lazy(() => import("./components/Dashboard/Dashboard2"))
const SalonSelection = React.lazy(() => import("./components/SalonSelection/SalonSelection"))

const ProtectedAuthRoute = React.lazy(() => import('./components/Protected/Admin/ProtectedAuthRoute'))
const ProtectedRoute = React.lazy(() => import('./components/Protected/Admin/ProtectedRoute'))
const SalonProtectRoute = React.lazy(() => import('./components/SalonSelection/SalonProtectRoute'))
const AllRoutesProtect = React.lazy(() => import('./components/public/AllRoutesProtect'))

const BarberServeLogin = React.lazy(() => import('./components/QueueList/BarberServeLogin/BarberServeLogin'))
const CancelServeLogin = React.lazy(() => import("./components/QueueList/CancelServeLogin/CancelServeLogin"))

const SalonSettings = React.lazy(() => import('./components/SalonSettings/SalonSettings'))

const SalonSignin = React.lazy(() => import('./components/SalonSettings/SalonSignin/SalonSignin'))

const SalonProtected = React.lazy(() => import("./components/SalonSettings/SalonProtected"))

// import BarberKiyoskDashboardProtect from './components/Protected/Barber/BarberKiyoskDashboardProtect';
const BarberKiyoskDashboardProtect = React.lazy(() => import("./components/Protected/Barber/BarberKiyoskDashboardProtect"))


const ErrorFallback = ({ error }) => {

  const navigate = useNavigate()

  const errorLogoutHandler = () => {
    localStorage.setItem('adminkiyoskloggin', 'false')
    localStorage.setItem('adminkiyosktoken', '')
    localStorage.setItem("salonSelect", "false")
    navigate('/')
  }
  return (
    <main className="error_boundary_container">
      <div>
        <div><ExclamationIcon /></div>
        <p>Oops ! Something went wrong</p>
        <button onClick={errorLogoutHandler}>Logout</button>
      </div>
    </main>
  );
};

const App = () => {

  return (<>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={
        <div className='page_loader'>
          <div>
            <Loader />
          </div>
        </div>
      }>
        <Routes>

          <Route element={<ProtectedAuthRoute />}>
            <Route path="/" element={<AdminSignin />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<SalonProtectRoute />}>
              <Route path="/selectsalon" element={<SalonSelection />} />
            </Route>

            <Route element={<AllRoutesProtect />}>
              <Route path="/kiyosk" element={<ErrorBoundary FallbackComponent={ErrorFallback}><Public /></ErrorBoundary>} />
              <Route path="/salonsignin" element={<SalonSignin />} />

              <Route element={<SalonProtected />}>
                <Route path="/salonsettings" element={<SalonSettings />} />
              </Route>

              <Route path="/joinqueue" element={<JoinQueue />} />
              <Route path="/queuelist" element={<QueueList />} />
              <Route path="/barberservelogn" element={<BarberServeLogin />} />
              <Route path="/cancelservelogn" element={<CancelServeLogin />} />
              <Route path="/barbersignin" element={<BarberSignin />} />
              <Route element={<BarberKiyoskDashboardProtect />}>
                <Route path="/kiyoskdashboard" element={<KiyoskDashboard />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>
  );
};

export default App;
