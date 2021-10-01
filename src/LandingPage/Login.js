import React, { Component } from 'react'
import { Button, HelpBlock, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './Login.css'
import sjcl from 'sjcl'
import Cookies from 'js-cookie'

function FieldGroup({ id, label, help, ...props}) {
    return(
        <FormGroup controlId={id}>
            <FormLabel>{label}</FormLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:"",
            password:""
        }
    }

        render() {
            return (
                <div className ="login-wrapper">
                    <form className = "login-form">
                        <FieldGroup 
                            id="formControlsEmail"
                            type="email"
                            name="email"
                            /* label="Email address" */
                            value={this.state.username}
                            onChange={this.handleChange}
                            placeHolder="Enter email"
                        />
                        <FieldGroup 
                            id="formControlsPassword"
                            type="password"
                            name="password"
                            /* label="password" */
                            value={this.state.username}
                            onChange={this.handleChange}
                            placeHolder="Enter Password"
                        />

                        <Button onClick={this.handleSignIn} className="login-button">Log In</Button>

                    </form>
                </div>
            )
        }
    }
    