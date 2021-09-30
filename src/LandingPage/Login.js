import React, { Component } from 'react'
import './Login.css'
import sjcl from 'sjcl'
import Cookies from 'js-cookie'
export default class Login extends Component {
    // constructor(props) {
    //     super(props);
        // this.history = props.history
        // let params = new URLSearchParams(window.location.search)
        // this.state = { email: '', password: '', user: props.user.user, id: props.user.id, redirect: params.get("redirect") };
        // console.log("redirect?", this.state.redirect);
        // this.userCallback = props.userCallback
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

        render() {
            return (
                <div className ="login-wrapper">
                    <h1>login page</h1>
                </div>
            )
        }
    }
    