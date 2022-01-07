import React, { Component } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../loginYesDashboard/dashboard/Dashboard';
import '../../styles/Admin.css'


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
                <div  className='mainScreen'>
                <div><h1>Admin Page</h1></div>
                <div><button onClick={() => this.cikis()}>Log Out</button></div>
                </div>
                
                
                <div>
                   <Dashboard/> 
                   
                </div>
            </div>
        )
    }
}
