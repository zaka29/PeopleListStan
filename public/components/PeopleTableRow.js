import React, { Component } from 'react';
import PeopleCell from './PeopleTableCell.js'

export const PeopleRow = ({ person, richestPerson, skills, interests }) => (
  
	<tr className={ person.id == richestPerson ? 'richest' : ''}>

		<PeopleCell> {person.name} </PeopleCell>
        <PeopleCell> {person.org} </PeopleCell> 
        <PeopleCell>
            { skills.map((skill, i) => { 
                if (person.id !== skill.personId) {
                    return null
                }
                return <span key={i}>{ skill.name }</span>
            })}
        </PeopleCell>
        <PeopleCell>
            { interests.map((interest, i) => { 
                if (person.id !== interest.personId) {
                    return null
                }
                return <span key={i}>{ interest.name }</span>
            })}
        </PeopleCell>

	</tr>
)