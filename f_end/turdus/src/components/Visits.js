import DayVisits from "./DayVisits";
import { useState } from "react";
function Visits() {
    // Con el useState se rompen los días de DayVisits !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const [visit, setVisit] = useState([]);
    console.log(visit)

    return (
        <div className="container">
            <div className="d-flex flex-row">

                <div className="d-flex flex-column">
                    <DayVisits  setVisit={setVisit}/>
                </div>
                <div className="d-flex flex-column">
                    {/* <h3>{visit[0].patient}</h3> */}
                </div>
            </div>
        </div>
    )
}
export default Visits;