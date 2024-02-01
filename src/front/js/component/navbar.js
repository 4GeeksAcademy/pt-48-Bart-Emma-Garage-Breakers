import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	let navigate = useNavigate();
	function logOut() {
		localStorage.setItem("token", "");

	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/main">
					<span className="navbar-brand mb-0 h1">Hellblade Customs</span>
				</Link>
				<div className="ml-auto">

					<button className="btn btn-primary" onClick={() => { logOut, navigate("/") }}>Log out</button>

				</div>
			</div>
		</nav>
	);
};
