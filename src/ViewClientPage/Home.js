import React, { Component } from 'react'
import Helmet from 'react-helmet';
import SessionList from '../ListOfSessions/SessionList.js'
import './ViewClientPage.css';
export default class ViewClientPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                  <Helmet>
                    <title>My Home</title>
                  </Helmet>
                <SessionList></SessionList>
            </div>

        )
    } 
}