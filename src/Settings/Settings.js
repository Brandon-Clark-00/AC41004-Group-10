import React, { Component } from 'react'
import Helmet from 'react-helmet';
import { Button, Row, Col, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import './Settings.css';
import { redirectUser } from '../SessionHandling/auth.js';


export default class Settings extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('email') == null || localStorage.getItem('email') == undefined) {
            redirectUser();
        }
        this.state = {
            currUser: [],
            name: "",
            email: "",
            dob: "",
            add1: "",
            add2: "",
            postcode: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateClient = this.updateClient.bind(this);
    }

    handleChange=event=>{
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text/html' },
            body: JSON.stringify({ userID: String(localStorage.getItem('userID')) })
        };
        fetch('http://localhost:5000/client', requestOptions)
        .then((res) => { return res.json().
          then((data) => {
            //turn the object recieved into a big array
            var userArray = []
            data.forEach((sesh) => {
              var objectArray = Object.entries(sesh);
              userArray.push(objectArray);
            });
            this.setState({currUser: userArray});
          });
        });
    }

    updateClient(){
        console.log("updating");
        //POSTING login request
        let data = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text/html' },
            //placeholder values for now
            body: JSON.stringify({ userID: String(localStorage.getItem('userID')), name: String(data.name), dob: String(data.dob), email: String(data.email), address1: String(data.add1), address2: String(data.add2), postcode: String(data.postcode)})
        };
        fetch('http://localhost:5000/updateClient', requestOptions)
        .then((res) => { return res.json().
          then((data) => {
            //turn the object recieved into a big array
            var userArray = []
            data.forEach((sesh) => {
              var objectArray = Object.entries(sesh);
              userArray.push(objectArray);
            });
            this.setState({currUser: userArray});
          });
        });
    }



    render() {
        return (
            <div className="settings-wrapper p-5">
                <Helmet>
                    <title>Theo Health - Settings</title>
                </Helmet>

                <Form>
                   <Form.Group >
                       <Form.Label>Full Name</Form.Label>
                       <Form.Control onChange={this.handleChange} type="Text" placeholder={String(this.state.currUser[0]).split(",")[14]} />
                   </Form.Group>
                   <Form.Group>
                       <Form.Label>Date of Birth</Form.Label>
                       <Form.Control type="Text" onChange={this.handleChange} placeholder={String(this.state.currUser[0]).split(",")[6]} />
                   </Form.Group>
                   <Form.Group>
                       <Form.Label>Email</Form.Label>
                       <Form.Control type="email" onChange={this.handleChange} placeholder={String(this.state.currUser[0]).split(",")[8]} />
                   </Form.Group>
                   <Row className="mb-3">
                       <Form.Group as={Col} controlId="formAddress1">
                           <Form.Label>Address</Form.Label>
                           <Form.Control type="textArea" onChange={this.handleChange} placeholder={String(this.state.currUser[0]).split(",")[1]} />
                       </Form.Group>

                       <Form.Group as={Col} controlId="formAddress2">
                           <Form.Label>City</Form.Label>
                           <Form.Control type="Text" onChange={this.handleChange} placeholder={String(this.state.currUser[0]).split(",")[3]} />
                       </Form.Group>

                       <Form.Group as={Col} controlId="postcode">
                           <Form.Label>Postcode</Form.Label>
                           <Form.Control type="Text" onChange={this.handleChange} placeholder={String(this.state.currUser[0]).split(",")[20]} />
                       </Form.Group>
                   </Row>
               </Form>
                <Form.Group >
                    <Button onClick={() => { this.updateClient() }} variant="success">
                        Update
                    </Button>
                    {/* <Button onClick={handleDeleteUser} variant="danger">
                            Delete
                        </Button> */}
                </Form.Group>

            </div>
        )
    }
}
