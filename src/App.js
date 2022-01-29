import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase";

import Auth from './components/Auth/Auth';
import Header from './components/Layout/Header';
import Protected from './components/Protected/Protected';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';

import './App.css';
import { Fragment } from 'react';

function App() {
  
  const [user, loading] = useAuthState(auth);

  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <div className='container p-3'>
          {loading &&
            <div className='loadingSpinnerContainer'>
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          }
          {!loading &&
            <Routes>
              {!user && 
                <Fragment>
                  <Route path="/" element={<Home/>}/>
                  <Route exact path="/auth" element={<Auth/>}/>
                </Fragment>
              }    
              {user && 
                <Fragment>
                  <Route exact path="/" element={<Navigate to='/protected'/>}/>
                  <Route exact path="/auth" element={<Navigate to='/protected'/>}/>
                  <Route exact path="/protected" element={<Protected/>}/>
                </Fragment>
              }
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          }
        </div>
      </BrowserRouter>
      <div className="container-fluid fixed-bottom">
        <div className="row p-0">
          <div className="col text-center">
            react-base-app by <a href="https://github.com/beatgubler" target="_blank" rel="noreferrer" style={{color: 'black'}}>Beat Gubler</a> 
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
