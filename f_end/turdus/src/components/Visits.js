import DayVisits from "./DayVisits";
import VisitForm from "./VisitForm";
import { useState } from "react";
function Visits() {


    
    return (
        <div className="container">
            <div className="d-flex flex-row justify-content-between">

                <div className="d-flex flex-column">
                    <DayVisits/>
                </div>
                <div className="d-flex flex-column">
                    <VisitForm />
                </div>
            </div>
        </div>
    )
}
export default Visits;