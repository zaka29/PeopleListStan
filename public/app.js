import React, { Component } from 'react';
import axios from 'axios';
import ajaxPromises from 'ajax-promises';
import * as requests from './requests.js';
import PeopleRow from './components/PeopleTableRow.js';

export default class App extends Component {
    
    constructor(props) {
    	
    	super(props);

    	this.state = {
            people: [],
            skills: [],
            interests: [],
            richestPerson: '',
            isLoaded: false,
        };
    }

    renderTableRow () {

    	const { people } = this.state;

    	return (
    		
    		<table>

    			{ people.map( person => {
    				
    				return (
    					<PeopleRow key={person.id} person={person} {...this.state}  />
					)

    			})}

    		</table>
    	)
    }

    componentDidMount() {
   	
    	axios.all([requests.getAllPeople(), requests.getPeopleSkills(), requests.getInterests(), requests.getRichest()])
    		.then(axios.spread((people, skills, interests, richest) => {
    			
				this.setState({
    				people: people.data,
    				skills: skills.data,
    				interests: interests.data,
    				richestPerson: richest.data.richestPerson,
    				isLoaded: true,
    			});
    			
    			console.log("New State", this.state);
    			
    		}));
    }

    render() {

    	const {isLoaded} = this.state;
   	
        if (!isLoaded) {
        	return (
        		<h4>Loading...</h4>
    		)
        }

        return ( 
        	<div>

        		<h1>There we go..</h1>
        		
        		{ this.renderTableRow() }

        	</div>
        	
        )
    }
}