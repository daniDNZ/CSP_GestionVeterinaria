import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TableGenerator } from "./TableController";
import { getVisits } from "./ApiFetch";

function Visits() {

    const arr = [
        'visits',
        '#', 
        'Fecha', 
        'Categoría', 
        'Paciente', 
        'Veterinaria/o', 
        'Cliente',
        'Vista'
    ];

    const fetchMethod = getVisits;
    
    // Obtenemos el día actual
    function getDay() {
        let curr = new Date
        let first = 0
        first = curr.getDate()
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)

        return day;
    }

    return (
        <>
            <TableGenerator arr={arr} fetchMethod={fetchMethod}/>
        </>
    )
}
export default Visits;