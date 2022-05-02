import Clock from "./Clock";
import WaitingRoom from "./WaitingRoom";
import jwt_decode from "jwt-decode";
import { getCurUser } from "./api/ApiUser";
import { useContext, useEffect, useState } from "react";
import Cards from "./Cards";
import FastAccessBtns from "./FastAccessBtns";
import { UserContext } from "../context/context";

function Home() {

    const {user} = useContext(UserContext);
    const handleUser = () => {
        document.querySelector('#say-hi').textContent = `Hola, ${user.name}!`;
    }

    useEffect(() => {
        if(user.roles.includes('ROLE_STAFF')){
            handleUser()
        }

    }, [user])


    return (
        <>
            <div className="d-flex flex-row flex-wrap flex-md-nowrap h-100 overflow-hidden">
                <div className="d-flex flex-column flex-wrap pe-sm-4 mb-4 flex-fill">
                    <div className="d-flex flex-row justify-content-between mx-2">
                        <h3 id="say-hi"></h3>
                        <Clock />
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-start">
                        <div className="col-auto mx-auto">
                            <Cards/>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-row flex-wrap justify-content-center">
                                <FastAccessBtns />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col d-flex flex-column flex-wrap bg-secondary rounded-3 mw-75">
                    <div className="p-4 text-black-50" style={{minWidth: '20em'}}>
                        <WaitingRoom />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;