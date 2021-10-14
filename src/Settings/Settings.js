import React, { Component } from 'react'
import Helmet from 'react-helmet';
import { Button, Row, Col, Form } from 'react-bootstrap';
import './Settings.css';
import { redirectUser } from '../SessionHandling/auth.js';
export default class Settings extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('email') == null || localStorage.getItem('email') == undefined) {
            redirectUser();
        }
        this.state = {
            currUser: []
        }
    }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text/html' },
            body: JSON.stringify({ userID: String(localStorage.getItem('userID')) })
        };
        fetch('https://theobackend.herokuapp.com/client', requestOptions)
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

    updateClient(name, dob, email, address1, address2, postcode) {
      console.log('updating')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text/html' },
            body: JSON.stringify({ userID: String(localStorage.getItem('userID')), name: "John", dob: "17-08-1998", email: "John@john.com", address1: "Address street 1", address2: "Dundee", postcode: "DD1123"})
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
            <div className="settings-wrapper">
                <Helmet>
                    <title>Theo Health - Settings</title>
                </Helmet>
                <Form>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="Text" placeholder={this.state.currUser[0]} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="Text" placeholder="Date of birth" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email@email.email" />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="textArea" placeholder="1 road lane" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formAddress2">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="Text" placeholder="City" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="Postcode">
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control type="Text" placeholder="Postcode lottery woo hoo" />
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
