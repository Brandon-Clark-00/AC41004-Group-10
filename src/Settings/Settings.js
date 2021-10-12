import React, { Component } from 'react'
import Helmet from 'react-helmet';
import './Settings.css';
import { redirectUser } from '../SessionHandling/auth.js';
export default class Settings extends Component{
    constructor(props){
        super(props);
        if(localStorage.getItem('email') == null || localStorage.getItem('email') == undefined){
            redirectUser();
        }
    }
    render() {
        return (
            <div className = "settings-wrapper">
                <Helmet>
                    <title>Theo Health - Settings</title>
                </Helmet>
                <h1>Settings page</h1>

            </div>
        )
    }
}
