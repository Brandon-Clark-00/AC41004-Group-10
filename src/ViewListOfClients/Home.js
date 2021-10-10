import React, { Component } from 'react'
import Helmet from 'react-helmet';
import './ViewClientsList.css';
import { ListGroup } from "react-bootstrap";
import { redirectUser } from '../SessionHandling/auth.js';
export default class ViewClientPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients: []
        };
        if(localStorage.getItem('email') !== null && localStorage.getItem('email') !== undefined){
            if(localStorage.getItem('user_role') !== '1'){
                redirectUser();
            }
        }
        if(localStorage.getItem('email') == null || localStorage.getItem('email') == undefined){
            redirectUser();
        }
    }
      // comonentDidMount part of React lifecycle - runs automatically
        componentDidMount() {
            //POSTING request with userID
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID: String(localStorage.getItem('userID'))})
            };
            fetch('https://theobackend.herokuapp.com/clients', requestOptions)
                    // JSON response is handled by a json() promises
            .then((res) => { return res.json().
            then((data) => {
                this.setState({clients: data});
            });
            });
    }
    render(){
        return(
            <div>
                  <Helmet>
                    <title>My Home</title>
                  </Helmet>
                  <div className = "clientlist-wrapper-home p5">
                    <h1>Your Clients</h1>
                    <ListGroup className="mt-5">
                        <ListGroup.Item action href="#link1">
                            {JSON.stringify(this.state.clients[0])}
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            {JSON.stringify(this.state.clients[0])}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>

        )
    } 
}