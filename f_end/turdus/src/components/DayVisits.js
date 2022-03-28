import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function DayVisits() {
    let { id } = useParams();
    console.log(id)
    // useEffect(() => {
    //     dataFetch(0)
    // }, [])
    const [xVisit, setVisit] = useState();
    let moveDay = 0;
    let arrData;

    const dataFetch = (targetDay) => {

        moveDay += targetDay;
        let day = String(getDay(moveDay))


        const bodyData = {
            username: jwt_decode(localStorage.getItem('token')).username,
            day: day
        }

        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }
        const request = new Request("http://192.168.1.81:8888/api/day_schedule", config);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                arrData = data;
                buildingList(data);
                
            })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
                // window.location = '/turdus/login'
            })

    }
   

    function buildingList(data) {
        let ul = '';
        data.forEach(visit => {
            
            const timeArr = visit.date_time.date.split(' ');
            const li =
                `
                
                <a href="#" id="${visit.id}" class="visit bg-${visit.category.toLowerCase()} list-group-item list-group-item-action w-100">
                    <div className="margin-10px-top font-size14">${timeArr[1].split('.')[0]}</div>

                    <span className="padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">${visit.category}</span>
                    <div className="font-size13 text-light">${visit.patient} ${visit.species}</div>
                </a>
                
            `
            ul += li;
            
        });

        document.getElementById('visits-list').innerHTML = ul;
        // Recogemos el mes del primer día de la semana para ponerlo como título
        let currentDate = new Date(getDay(moveDay));
        document.getElementById('monthName').innerHTML =
            `
                <h3 class="my-0 me-3">${String(currentDate).split(' ')[2]} ${String(currentDate).split(' ')[1]}</h3>
            `
    }
 
    // Obtenemos el día actual
    function getDay(moveDay) {
        let curr = new Date


        let first = 0
        first = curr.getDate() + moveDay
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        moveDay = 0


        return day;
    }

    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <div id="monthName" className="d-flex align-items-center">
                    <h3></h3>
                </div>
                <div className="d-flex flex-row justify-content-end">
                    <button className="btn btn-outline-primary m-1" onClick={() => dataFetch(-1)}>Prev</button>
                    <button className="btn btn-outline-primary m-1" onClick={() => dataFetch(1)}>Next</button>
                </div>
            </div>
            <div id="visits-list" className="list-group">
            
            </div>
            <button onClick={() => console.log(xVisit)}>Mostrar</button>
            {
                dataFetch(0)
            }
        </>
    )
}
export default DayVisits;