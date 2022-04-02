import DashboardNavigation from '../components/DashboardNavigation';
import DashboardSidebar from '../components/DashboardSidebar';
import Home from '../components/Home';
import Orders from '../components/Orders';
import Schedule from '../components/Schedule';
import VisitsList from '../components/VisitsList';
import Visit from '../components/Visit';
import PatientsList from '../components/PatientsList';
import Patient from '../components/Patient';
import NewPatient from '../components/NewPatient';
import CustomersList from '../components/CustomersList';
import Customer from '../components/Customer';


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
        return <VisitsList />
      case 5:
        return <Visit />
      case 6:
        return <PatientsList />
      case 7:
        return <Patient />
      case 8:
        return <NewPatient />
      case 9:
        return <CustomersList />
      case 10:
        return <Customer />
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
