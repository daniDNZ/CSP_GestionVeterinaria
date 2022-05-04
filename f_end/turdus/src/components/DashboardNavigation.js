import { NavLink } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import DashboardNavContent from "./DashboardNavContent";
import { createElement, useContext, useEffect } from "react";
import { UserContext } from "../context/context";
import global from "../global";

function DashboardNavigation() {

  const { user } = useContext(UserContext);

  const src = global.apiUri+user.pic;
  const img = <img src={src} alt="user" width="32" height="32" className="rounded-circle me-2"/>;

  let li;

  user.roles.includes('ROLE_ADMIN')
  ? li = 
      <li>
        <a 
          href="/turdus/settings" 
          className="dropdown-item">
            Administrar Usuarios
        </a>
      </li>
  : li = <></>;

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light make-me-sticky py-3">
        <div className="container-fluid">

          <div className="flex-shrink-1">
            <a href="#" className="d-flex align-items-center col-lg-4 mb-0 mb-lg-0 link-dark text-decoration-none">
              <i className="bi bi-bootstrap fs-2 text-dark"></i>
              <span className="d-none d-sm-inline"><h3 className="my-0 mx-1">TuClínica.Turdus</h3></span>
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-md-none">
              <DashboardNavContent />
            </div>
            <div className="flex-shrink-0 dropdown d-none d-md-flex">
              <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                {img}
              </a>
              <ul id="dropdownUserUl" className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownUser1" >
                {li}
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink to="/logout" className="dropdown-item">Sign out</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashboardNavigation;