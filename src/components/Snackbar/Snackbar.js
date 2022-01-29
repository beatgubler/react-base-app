import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import './Snackbar.css';

const SnackbarOverlay = (props) => {
  const renderSwitch = () => {
        switch(props.mode) {
          case 'error':
            return ["Snackbar", "error", props.open ? "SnackbarOpen" : "SnackbarClosed"];
          case 'warning':
            return ["Snackbar", "warning", props.open ? "SnackbarOpen" : "SnackbarClosed"];
          case 'success':
            return ["Snackbar", "success", props.open ? "SnackbarOpen" : "SnackbarClosed"];
          default:
            return ["Snackbar", props.open ? "SnackbarOpen" : "SnackbarClosed"];;
        }
      };
  
  return (
    <div className={renderSwitch().join(' ')}>
      {props.message}
      {/* <button className='btn btn-primary' onClick={props.onConfirm}>Close</button> */}
    </div>
  )
}

const Snackbar = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<SnackbarOverlay mode={props.mode} message={props.message} open={props.open} onConfirm={props.onConfirm}/>, document.getElementById('overlay-root'))}
    </Fragment>
  );
};

export default Snackbar;

