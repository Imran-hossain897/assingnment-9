import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import logofb from '../travel-guru-master/Icon/fb.png';
import logogoogle from '../travel-guru-master/Icon/google.png';

import { userContext } from '../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './LogIn.css'
import { Button } from 'react-bootstrap';

firebase.initializeApp(firebaseConfig);


const LogIn = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/booking/:bookingName" } };
    const [userLogIn, setUserLogIn] = useContext(userContext)

    const [newUser, setNewuser] = useState(false)
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        photo: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        error: '',
        success: false

    })
    const handleSignOut = ()=>{
        firebase.auth().signOut()
        .then(res=>{
          const singOutUser ={
            isSignIn: false, 
            name:'',
            email:'',
            password:'',
            photo:'',
            susses:false,
            error:''
          }
          setUser(singOutUser)
        })
      }


    const googleprovider = new firebase.auth.GoogleAuthProvider();
    const fbprovider = new firebase.auth.FacebookAuthProvider();

    const handleFbSingin = () => {
        firebase.auth().signInWithPopup(fbprovider)
        .then(res => {
            const {displayName } = res.user;
            const singUser = {
                isSignIn: true,
                name: displayName,
            }
            setUser(singUser)
            setUserLogIn(singUser)
            history.replace(from);


        })
        .catch(error => {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);

        })

    }

    const handleSigninWithGoogle = () => {
        firebase.auth().signInWithPopup(googleprovider)
            .then(res => {
                const { photoURL, email, displayName } = res.user;
                const singUser = {
                    isSignIn: true,
                    name: displayName,
                    Photo: photoURL,
                    email: email
                }
                setUser(singUser)
                setUserLogIn(singUser)
                history.replace(from);


            })
            .catch(error => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);

            })
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUpdate(user.name)
                    setUser(newUserInfo);
                })

                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);

                })
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setUserLogIn(newUserInfo)
                    history.replace(from);


                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    history.replace(from);

                });
        }

        e.preventDefault();
    }
    const handleBlur = (e) => {
        let isFromValid = true;
        if (e.target.name === 'email') {
            isFromValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e.target.value)

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFromValid = isPasswordValid && passwordHasNumber
        }
        if (isFromValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const newUpdate = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
        }).catch(function (error) {
        });
    }
    return (
        <div className='loginForm'>

            <div>
                <h3>{newUser ? 'Create account' : 'Login'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                    {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='First Name' required />}<br />
                    </div>
                    <div className='mb-2'>
                    {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='Last Name' required />}<br />
                    </div>
                    <div className='mb-2'>
                    <input type="text" name="email" onBlur={handleBlur} placeholder='Email Or Username ' required /><br />
                    </div>
                    <div className='mb-2'>
                    <input type="password" name="password" onBlur={handleBlur} placeholder='Password' required /> <br />
                    </div>
                    {/* <input type="password" name="Confrim password" onBlur={handleBlur} placeholder='Confirm Password' required /> <br /> */}
                    <Button className='w-50 mb-3 ml-5' variant='warning' type="submit">{newUser ? 'Create an account' : 'Log in'}</Button>
                </form>
                <h6 className='ml-5'>{newUser ? 'Already have an account?' : "Don't have account?"}<Link name="newUser" onClick={() => setNewuser(!newUser)}>{newUser ? "Login" : 'Create an account'} </Link> </h6>
            </div>
            <p style={{ color: 'red' }}> {user.error}</p>
            {user.success && <p style={{ color: 'green' }}> {newUser ? 'created account' : 'logged in'} successfully</p>}

            <div>
                <p className='paragraph'>or</p>
                <div className='logInImage'  onClick={handleFbSingin}>
                    <img src={logofb} alt="" /> <span className='ml-5'>Continue with Facebook</span>
                </div>
                <div className='logInImage' onClick={handleSigninWithGoogle}>
                    <img src={logogoogle} alt=""/> <span className='ml-5'>Continue with Google</span>
                </div>
            </div>
        </div>
    );
};

export default LogIn;