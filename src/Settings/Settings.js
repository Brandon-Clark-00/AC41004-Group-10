import React, { Component } from 'react'
import Helmet from 'react-helmet';
import './Settings.css';

export default class Settings extends Component{

    render() {
        return (
            <div className = "settings-wrapper">
                <Helmet>
                    <title>User Settings</title>
                </Helmet>
                <h1>Settings page</h1> 

            </div>
        )
    }
}