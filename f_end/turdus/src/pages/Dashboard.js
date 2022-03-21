import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import Home from '../components/Home';
import Orders from '../components/Orders';
import Schedule from '../components/Schedule';

function Dashboard({comp}) {
  document.getElementById('root').classList.add("d-flex", "flex-column", "vh-100", "overflow-hidden");
 function switchingComponents() {
    switch (comp) {
      case 1:
        return <Home />
      case 2:
        return <Orders />
      case 3:
        return <Schedule />
      default:
        break;
    }
  }
  

  return (
    <>
      <header id="header-dashboard" className="py-3 border-bottom">
        <Navigation />
      </header>
      <div className="container-fluid flex-grow-1 d-flex flex-column flex-sm-row overflow-auto">
        <div className="row flex-grow-sm-1 flex-grow-0">
          <Sidebar />
          <main id="main-dashboard" className="col overflow-auto">
            <div className=" rounded-3 p-3">
              {switchingComponents()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
