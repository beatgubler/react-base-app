import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase";

import Snackbar from "../Snackbar/Snackbar";

import './Header.css';

const Header = () => {

  const [user, loading] = useAuthState(auth);
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [snackbarMode, setSnackbarMode] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    auth.signOut().then((response) => {
      navigate("/auth", { replace: true });
      setSnackbarIsOpen(!snackbarIsOpen);
      setSnackbarMode('success');
      setSnackbarMessage('Successfully logged out!')
      const timer = setTimeout(() => {
        setSnackbarIsOpen(false)
      }, 5000);
      return () => clearTimeout(timer);
    });
  };

  const snackbarHandler = () => {
    setSnackbarIsOpen(!snackbarIsOpen);
  };


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setEmail(user.email);
      }
    })
  });

  return (

    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" >
      <NavLink to="/" className="navbar-brand">react-base-app</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        {user && (
          <li>
            <NavLink to="/protected" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Protected Site</NavLink>
          </li>
        )} 
        </ul>
        <ul className="navbar-nav ml-auto">
          {user && (
            <li className="nav-link">
              {email}
            </li>
          )}
          {!user && !loading && (
            <li>
              <NavLink className="nav-link" to="/auth" >Login</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink className="nav-link" to="#" onClick={logout}>Logout</NavLink>
            </li>
          )}
        </ul>
      </div>
      {snackbarIsOpen &&
        <Snackbar mode={snackbarMode} message={snackbarMessage} open={true} onConfirm={snackbarHandler}/>
      }
    </nav>
  )
};

export default Header;