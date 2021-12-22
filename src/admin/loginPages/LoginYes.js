import React, { Component } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../loginYesDashboard/dashboard/Dashboard';



export default class LoginYes extends Component {
    cikis = () => {
        signOut(auth)
            .then(() => {
                console.log('logged out');
                useNavigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <h1>giris yappildi</h1>
                <button onClick={() => this.cikis()}>cik</button>
                <div>
                   <Dashboard/> 
                   
                </div>
            </div>
        )
    }
}
