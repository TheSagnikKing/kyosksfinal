import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { ErrorBoundary } from "react-error-boundary";
import { ExclamationIcon } from './icons';
import "./App.css"
import ErrorPage from './components/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';

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

const ErrorFallbackAuth = () => {
  return (
    <main className="error_boundary_container_auth">
      <div>
        <div><ExclamationIcon /></div>
        <p>Oops ! Something went wrong</p>
      </div>
    </main>
  )
}

const App = () => {

  return (<>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff"
          }}><Loader /></div>
      }>
        <Routes>

          <Route element={<ErrorBoundary FallbackComponent={ErrorFallbackAuth}><ProtectedAuthRoute /></ErrorBoundary>}>
            <Route path="/" element={<AdminSignin />} />
          </Route>

          <Route element={<ErrorBoundary FallbackComponent={ErrorFallback}><ProtectedRoute /></ErrorBoundary>}>
            <Route element={<SalonProtectRoute />}>
              <Route path="/selectsalon" element={<SalonSelection />} />
            </Route>

            <Route element={<AllRoutesProtect />}>
            <Route element={<Layout />}>
              <Route path="/kiosk" element={<Public />} />
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
          </Route>

          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>
  );
};

export default App;
