import Clock from "./Clock";
import WaitingRoom from "./WaitingRoom";
import jwt_decode from "jwt-decode";
import { getCurUser } from "./ApiFetch";
import { useEffect } from "react";
import Cards from "./Cards";

function Home() {
    const username = jwt_decode(localStorage.getItem('token')).username;

    const handleUser = (u) => {
        document.querySelector('#say-hi').textContent = `Hola, ${u.name}!`;
    }

    useEffect(() => {
        getCurUser(handleUser, username);


    }, [])


    return (
        <>
            <div className="d-flex flex-row flex-wrap">
                <div className="d-flex flex-column flex-wrap pe-sm-4 mb-4">
                    <div className="d-flex flex-row justify-content-between">
                        <h3 id="say-hi"></h3>
                        <Clock />
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                        <Cards />
                    </div>
                </div>
                <div className="">
                    <div className="">
                    <WaitingRoom />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;