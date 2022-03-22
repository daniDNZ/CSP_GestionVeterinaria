import jwt_decode from "jwt-decode";
import { useEffect } from "react";
function Schedule() {
    useEffect(() => {
        const bodyData = {
            user: jwt_decode(localStorage.getItem('token')).id
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
        const request = new Request("http://192.168.1.81:8888/api/week_schedule", config);
        fetch(request)
            .then(response => response.json())
            .then(
                data => { buildingSchedule(data) }
            )
            .catch(e => console.log('Error: ', e))


        function buildingSchedule(data) {
            let rows = '';
            let timer = '';
            for (let h = 10; h <= 20; h++) {

                if (h == 15 || h == 16) {

                } else {
                    if (h == 14 || h == 20) {
                        timer = `${h}:00`;
                        rows += makingRow(timer);
                    } else {
                        for (let m = 0; m <= 45; m += 15) {
                            // SE puede cambiar por el padStart de más abajo
                            m == 0 ? timer = `${h}:00` : timer = `${h}:${m}`;

                            rows += makingRow(timer);
                        }
                    }

                }


            }
            document.getElementsByTagName('tbody')[0].innerHTML = rows;
// FALTA FILTRAR POR SEMANAS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            data.forEach(visit => {
                let curr = visit.date_time.date;
                let newDate = curr.split('.');
                newDate.push(newDate[0].split(' '))
                let date = new Date(newDate[2][0] + 'T' + newDate[2][1]);

                const timer = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

                let col ='';
                let html = '';
                for (let d = 0; d < 7; d++) {
                    if (d != date.getDay()-1) {
                        html =``
                        
                    } else {
                        html =
                            `
                            
                                <span className="padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">${visit.category}</span>
                                <div className="font-size13 text-light">${visit.patient}</div>
                                <div className="margin-10px-top font-size14">${timer}</div>
                           
                            `
                    }
                    col += html
                }

                
                console.log(timer)
                document.getElementById(`day${date.getDay()-1}${timer}`).setAttribute('rowSpan', `${visit.duration}`);
                //Cambiar color según categoría
                document.getElementById(`day${date.getDay()-1}${timer}`).classList.add('bg-yellow');

                document.getElementById(`day${date.getDay()-1}${timer}`).innerHTML = 
                `
                ${col}
                `
                ;

            });

        }

        function makingRow(timer) {
            const html =
                `
                <tr id=${timer}>
                    <td className="align-middle">${timer}</td> 
                    <td id="day0${timer}"></td>
                    <td id="day1${timer}"></td>
                    <td id="day2${timer}"></td>
                    <td id="day3${timer}"></td>
                    <td id="day4${timer}"></td>
                    <td id="day5${timer}"></td>
                </tr>
            `
            return html;
        }


    }, [])
    // Obtenemos los días de la semana actual
    function getWeek() {
        let curr = new Date
        let week = []

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i
            let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
            week.push(day)
        }
        return week;
    }
    const week = getWeek();
    return (
        <div className="container">
            <div className="table-responsive d-flex flex-column">
                <table className="table table-borderless text-center">
                    <thead>
                        <tr className="bg-light-gray">
                            <th className="text-uppercase">Time
                            </th>
                            <th className="text-uppercase">Monday {week[0].split('-')[2]}</th>
                            <th className="text-uppercase">Tuesday {week[1].split('-')[2]}</th>
                            <th className="text-uppercase">Wednesday {week[2].split('-')[2]}</th>
                            <th className="text-uppercase">Thursday {week[3].split('-')[2]}</th>
                            <th className="text-uppercase">Friday {week[4].split('-')[2]}</th>
                            <th className="text-uppercase">Saturday {week[5].split('-')[2]}</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Schedule;