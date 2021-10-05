import React, { Component } from 'react'
import { Button, HelpBlock, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './Login.css'
import sjcl from 'sjcl'
import Cookies from 'js-cookie'
import Helmet from 'react-helmet';

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
            email:"",
            password:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleChange=event=>{
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }

    handleSignIn = e =>{
      //POSTING login request
      let data = this.state;
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: String(data.email), password: String(data.password) })
      };
      fetch('https://theobackend.herokuapp.com/login', requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ postId: data.id })); //not sure what this does
    }

    render() {
        return (
            <div className ="login-wrapper">
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <form className = "login-form">
                    <FieldGroup
                        id="formControlsEmail"
                        type="email"
                        name="email"
                        /* label="Email address" */
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeHolder="Enter email"
                    />
                    <FieldGroup
                        id="formControlsPassword"
                        type="password"
                        name="password"
                        /* label="password" */
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeHolder="Enter Password"
                    />

                    <Button onClick={this.handleSignIn} className="login-button">Log In</Button>

                </form>
            </div>
        )
    }
    }
