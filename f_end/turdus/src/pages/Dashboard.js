import DashboardNavigation from '../components/DashboardNavigation';
import DashboardSidebar from '../components/DashboardSidebar';
import Home from '../components/Home';
import Orders from '../components/Orders';
import Schedule from '../components/Schedule';
import { Customer, Patient, Visit } from '../components/View';
import Registrations from '../components/Registrations';
import Search from '../components/Search';
import WaitingRoom from '../components/WaitingRoom';

function Dashboard({ comp }) {
  document.body.removeAttribute('data-bs-spy');
  document.body.removeAttribute(' data-bs-target');
  document.getElementById('root').classList.add("d-flex", "flex-column", "vh-100", "overflow-hidden");
  function switchingComponents() {
    switch (comp) {
      case 1:
        return <Home />
      case 2:
        return <Orders />
      case 3:
        return <Schedule />
      case 4:
        return <Visit />
      case 5:
        return <Search />
      case 6:
        return <Patient />
      case 7:
        return <Customer />
      case 8:
        return <Registrations />  
      case 9:
        return <WaitingRoom />  
      default:
        break;
    }
  }


  return (
    <>
      <header id="header-dashboard" className="border-bottom">
        <DashboardNavigation />
      </header>
      <div className="container-fluid flex-grow-1 d-flex flex-column flex-sm-row overflow-auto">
        <div className="row flex-grow-sm-1 flex-grow-0 vw-100">
          <DashboardSidebar />
          <main id="main-dashboard" className="col overflow-auto">
            <div className="rounded-3 p-3">
              {switchingComponents()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
