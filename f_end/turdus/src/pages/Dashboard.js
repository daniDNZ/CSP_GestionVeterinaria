import {Route, Routes} from 'react-router-dom';

import DashboardNavigation from '../components/DashboardNavigation';
import DashboardSidebar from '../components/DashboardSidebar';
import Home from '../components/Home';
import Orders from '../components/Orders';
import Schedule from '../components/Schedule';
import { Customer, Patient, Visit } from '../components/View';
import Registrations from '../components/Registrations';
import Search from '../components/Search';
import WaitingRoom from '../components/WaitingRoom';
import Bill from '../components/Bill.js';
import PayDebt from '../components/PayDebt';
import UserProfile from '../components/user/UserProfile';
import AdminSettings from '../components/user/AdminSettings';

function Dashboard() {
  document.body.removeAttribute('data-bs-spy');
  document.body.removeAttribute(' data-bs-target');
  document.getElementById('root').classList.add("d-flex", "flex-column", "vh-100", "overflow-hidden");

  return (
    <>
      <header id="header-dashboard" className="border-bottom">
        <DashboardNavigation/>
      </header>
      <div className="container-fluid flex-grow-1 d-flex flex-column flex-sm-row overflow-auto">
        <div className="row flex-grow-sm-1 flex-grow-0 vw-100">
          <DashboardSidebar/>
          <main id="main-dashboard" className="col overflow-auto">
            <div className="rounded-3 p-3 h-100">
              <Routes>
                <Route path="dashboard" element={ <Home/> } />
                <Route path="orders" element={<Orders />} />
                <Route path="schedule" element={ <Schedule />} />
                <Route path="visits/:id" element={ <Visit />} />
                <Route path="search" element={ <Search />} />
                <Route path="patients/:id" element={ <Patient />} />
                <Route path="customers/:id" element={ <Customer />} />
                <Route path="registrations" element={ <Registrations />} />
                <Route path="registrations/:name" element={ <Registrations />} />
                <Route path="waiting_room" element={ <WaitingRoom />} />
                <Route path="visits/:id/bill" element={ <Bill /> } />
                <Route path="customers/:id/pay_debt" element={ <PayDebt />} />
                <Route path="settings" element={ <AdminSettings />} />
                <Route path="user/profile" element={ <UserProfile /> } />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
