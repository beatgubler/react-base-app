import { Fragment, useRef, useState } from "react";
import { Formik } from 'formik';
import firebase from "firebase/compat/app"

import { auth } from "../../firebase";

import Snackbar from "../Snackbar/Snackbar";
import Card from "../UI/Card";

import './Auth.css';

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [snackbarMode, setSnackbarMode] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const snackbarHandler = () => {
    setSnackbarIsOpen(true);
    const timer = setTimeout(() => {
      setSnackbarIsOpen(false)
    }, 5000);
    return () => clearTimeout(timer);
  };

  const submitHandler = (event) => {
    if (isLogin) {
      signInWithEmailAndPassword()
    } else {
      registerWithEmailAndPassword("New User", emailRef.current.value, passwordRef.current.value)
    }
  }

  //Firebase Login Methods
  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      snackbarHandler();
      setSnackbarMode('error');
      setSnackbarMessage(err.message)
    }
  };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (err) {
      snackbarHandler();
      setSnackbarMode('warning');
      setSnackbarMessage(err.message)
      console.error(err);
    }
  };

  const registerWithEmailAndPassword = async (displayName, email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      snackbarHandler();
      setSnackbarMode('error');
      setSnackbarMessage(err.message)
    }
  };
  
  const sendPasswordResetEmail = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      snackbarHandler();
      setSnackbarMode('success');
      setSnackbarMessage('Password reset link sent!')
    } catch (err) {
      snackbarHandler();
      setSnackbarMode('error');
      setSnackbarMessage(err.message)
    }
  };
  
  const resetHandler = (event) => {
    sendPasswordResetEmail(emailRef.current.value);
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Card>
      <p>
        <button onClick={switchAuthModeHandler} className="btn btn-light btn-sm float-right">{isLogin ? 'Create new account' : 'Login with existing account'}</button>
      </p>
      <Formik
        initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            } else if (values.password.length < 8) {
              errors.password = 'Password needs to be at least 8 characters long';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              submitHandler();
              setSubmitting(false);
            }, 400);
          }}
      >
      {({ values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting,dirty }) => (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' className={errors.email && touched.email ? 'form-control invalid' : 'form-control'} ref={emailRef} onChange={handleChange} onBlur={handleBlur} value={values.email}/>
            {errors.email && touched.email && errors.email}
          </div>
          <div className="form-group">
            <label htmlFor='text'>Password</label>
            <input type='password' id='password' className={errors.password && touched.password ? 'form-control invalid' : 'form-control'} ref={passwordRef} onChange={handleChange} onBlur={handleBlur} value={values.password}/>
            {errors.password && touched.password && errors.password}
          </div>
          <div className="loginButtons">
            <div className="form-group">
              <button type="submit" className="btn btn-success btn-block" disabled={isSubmitting || !dirty || errors.email || errors.password}>{isLogin ? 'Login' : 'Register'}</button>
            </div>
            {isLogin && 
              <div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" type="button" onClick={signInWithGoogle} >Sign in with Google</button>
                </div>
                <div className="form-group">
                <button className="btn btn-white btn-block btn-sm" type="button" onClick={resetHandler} disabled={!dirty || errors.email}>Reset Password</button>
                </div>
              </div>
            }
          </div>
          
        </form>
      )}
      </Formik> 
      </Card>
      {snackbarIsOpen &&
        <Snackbar mode={snackbarMode} message={snackbarMessage} open={true} onConfirm={snackbarHandler}/>
      }
      
    </Fragment>
  )
};

export default AuthForm;