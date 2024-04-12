import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarberKiyoskDashboardProtect from './components/Protected/Barber/BarberKiyoskDashboardProtect';
import { Grid } from 'react-loader-spinner';
import CancelServeLogin from './components/QueueList/CancelServeLogin/CancelServeLogin';

const Public = React.lazy(() => import("./components/public/Public"));
const JoinQueue = React.lazy(() => import("./components/JoinQueue/JoinQueue"));
const QueueList = React.lazy(() => import("./components/QueueList/QueueList"))
const BarberSignin = React.lazy(() => import("./components/barber/Signin/Signin"));
const AdminSignin = React.lazy(() => import("./components/AdminSignin/AdminSignin"))
const Table = React.lazy(() => import("./components/barber/demo/Table"))
const KiyoskDashboard = React.lazy(() => import("./components/Dashboard/Dashboard2"))
const SalonSelection = React.lazy(() => import("./components/SalonSelection/SalonSelection"))

const ProtectedAuthRoute = React.lazy(() => import('./components/Protected/Admin/ProtectedAuthRoute'))
const ProtectedRoute = React.lazy(() => import('./components/Protected/Admin/ProtectedRoute'))
const SalonProtectRoute = React.lazy(() => import('./components/SalonSelection/SalonProtectRoute'))
const AllRoutesProtect = React.lazy(() => import('./components/public/AllRoutesProtect'))

const BarberServeLogin = React.lazy(() => import('./components/QueueList/BarberServeLogin/BarberServeLogin'))

const AccountSettings = React.lazy(() => import('./components/AccountSettings/AccountSettings'))

const App = () => {

  return (<>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={<div className='page_loader'><div><Grid
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      /></div>
      </div>}>
        <Routes>

          <Route element={<ProtectedAuthRoute />}>
          <Route path="/" element={<AdminSignin />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<SalonProtectRoute />}>
              <Route path="/selectsalon" element={<SalonSelection />} />
            </Route>

            <Route element={<AllRoutesProtect />}>
              <Route path="/kiyosk" element={<Public />} />
              <Route path="/accountsettings" element={<AccountSettings/>}/>
              <Route path="/joinqueue" element={<JoinQueue />} />
              <Route path="/queuelist" element={<QueueList />} />
              <Route path="/barberservelogn" element={<BarberServeLogin/>}/>
              <Route path="/cancelservelogn" element={<CancelServeLogin/>}/>
              <Route path="/barbersignin" element={<BarberSignin />} />
              {/* <Route element={<BarberKiyoskDashboardProtect />}> */}
                <Route path="/kiyoskdashboard" element={<KiyoskDashboard />} />
              {/* </Route> */}
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
