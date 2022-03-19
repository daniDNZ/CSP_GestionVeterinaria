import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  document.getElementById('root').classList.add("d-flex", "w-100", "h-100", "mx-0", "flex-row", "justify-content-start");

  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100" style={{ "width": "280px" }}>
        <Sidebar />
        {/* <div className="d-flex justify-content-around mx-5 mt-5">

      <h1>HOME</h1>

    </div> */}
      </div>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light flex-fill">
        <Navigation />
        <div>
          <h1>Home</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
