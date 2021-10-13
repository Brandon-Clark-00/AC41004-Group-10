import React, { Component } from 'react'
import Helmet from 'react-helmet';
import { Button, Row, Col, Form, Spinner } from 'react-bootstrap';
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
                
                        <Form>
                            <Form.Group>
                                <Form.Label>Full name</Form.Label>
                                <Form.Control type="Text" placeholder="Fullname"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date of birth</Form.Label>
                                <Form.Control type="Text" placeholder="Date of birth"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email@email.email"/>
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="textArea" placeholder="1 road lane"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formAddress2">
                                    <Form.Label>City(Address line 2)</Form.Label>
                                    <Form.Control type="Text" placeholder="City"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="Postcode">
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control type="Text" placeholder="Postcode lottery woo hoo"/>
                                </Form.Group>
                            </Row>
                        </Form>
                        <Form.Group >
                        <Button  /* onClick={} */ variant="success">
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
