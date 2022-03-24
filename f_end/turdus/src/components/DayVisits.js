import jwt_decode from "jwt-decode";
import { useEffect } from "react";
function DayVisits({setVisit}) {
    useEffect(() => {
        dataFetch(0)
    }, [])
    let moveDay = 0;
    
    function dataFetch(targetDay) {
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
            .then(data => 
                { 

                    buildingSchedule(data); 
                    
                })
            .catch(e => console.log('Error: ', e))
        
    }
        // Construimos el Horario
        function buildingSchedule(data) {
            
            /*
            *   rows -> Variable donde vamos añadiendo las filas.
            *   timer -> Variable que almacena la hora y los minutos para imprimirlos en las filas y diferenciar con ids las celdas.
            *   line -> Array que almacena lo que devuelve la función makingRow() -> [row, duration, spanDay]
            *   duration -> Variable que almacena la duración de la última visita para construir o no las siguientes celdas.
            *   spanDay -> Variable que almacena el día de la cita para construir o no las celdas de ese día, segun duration.
            */
            let rows = '';
            let timer = '';
            let line = [];
            let duration = 1;
            let spanDay = -1;

            /*
            *   Bucle que recorre las horas y los minutos, 
            *   saltando las horas que no entran en el horario.
            */

            for (let h = 10; h <= 20; h++) {

                if (h == 15 || h == 16) {

                } else {
                    // A las 14 y a las 20 no recorremos los minutos.
                    if (h == 14 || h == 20) {
                        timer = `${h}00`;
                        line = makingRow(timer, data, h, '00', duration, getDay(moveDay));
                        rows += line[0];
                        duration = line[1];
                        spanDay = line[2];

                    } else {
                        // Bucle para recorrer los minutos de la hora (de 15 en 15)
                        for (let m = 0; m <= 45; m += 15) {
                            timer = `${h}${String(m).padStart(2, '0')}`;
                            line = makingRow(timer, data, h, m, duration, getDay(moveDay));
                            rows += line[0];
                            duration = line[1];
                            spanDay = line[2];
                        }
                    }

                }


            }

            // Recogemos el mes del primer día de la semana para ponerlo como título
            let currentDate = new Date(getDay(moveDay));
            document.getElementById('monthName').innerHTML =
                `
                    <h3 class="my-0">${String(currentDate).split(' ')[1]}</h3>
                `

            // Añadimos las cabeceras de las columnas
            document.getElementsByTagName('thead')[0].innerHTML =
                `
            <tr className="bg-light-gray">
                <th className="text-uppercase">Time
                </th>
                <th className="text-uppercase">${String(currentDate).split(' ')[0]} ${getDay(moveDay).split('-')[2]}</th>
            </tr>
            `
            // Añadimos las filas al tbody
            document.getElementsByTagName('tbody')[0].innerHTML = rows;

        }

        /*
        *   Función que genera la fila de la hora objetivo.
        *   Parámetros:
        *       - timer -> para escribir la hora e ids.
        *       - data -> recoge las citas;
        *       - h -> hora actual.
        *       - m -> minuto actual.
        *       - duration -> para comprobar si toca añadir celda o no.
        *       - spanDay -> para guardar el día del span.
        */
        function makingRow(timer, data, h, m, duration, day) {
            // Abrimos la fila y creamos la celda con la hora
            let row =
                `
                <tr id=${timer}>
                    <td className="align-middle">${timer.substr(0, 2) + ':' + timer.substr(2, 2)}</td> 
            `;
            let cell = '';

            if (duration > 1) {
                cell = ''
                duration--
            } else {
                cell =
                    `
                            <td id="day${timer}"></td>
                        `
                // Recorremos las visitas y añadimos la que corresponda con el día y la hora
                data.forEach(visit => {
                    // Adaptamos la hora de la visita a un objeto Date
                    const curr = visit.date_time.date;
                    let newDate = curr.split('.');
                    newDate.push(newDate[0].split(' '))
                    const date = new Date(newDate[2][0] + 'T' + newDate[2][1]);

                    // Recogemos la hora y los minutos en variables para compararlos con los de la fila
                    const hour = date.getHours();
                    const min = String(date.getMinutes()).padStart(2, '0');

                    // Comprobamos día, hora y minutos y, si coinciden, construimos la celda

                    if (date.toISOString().slice(0, 10) == day && hour == h && min == m) {
                        
                        // Asignamos la duración y el día por si hay rowSpan
                        duration = visit.duration;

                        cell =
                            `
                            <td id="day${timer}" rowSpan="${visit.duration}" class="bg-${visit.category.toLowerCase()}">
                                <span className="padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">${visit.category}</span>
                                <div className="font-size13 text-light">${visit.patient} ${visit.species}</div>
                                <div className="margin-10px-top font-size14">${timer.substr(0, 2) + ':' + timer.substr(2, 2)}</div>
                            </td>
                            `
                    }

                });

            }

            // Añadimos la celda a la fila
            row += cell;


            return [row, duration];
        }
    

    // Obtenemos los días de la semana actual para los títulos de las columnas y para mandarlos en el fetch
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
                <div className="table-responsive d-flex flex-column">
                    <table className="table table-borderless text-center">
                        <thead>

                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

        </>
    )
}
export default DayVisits;