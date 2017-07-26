import React, { Component } from 'react';
import PeopleRow from './PeopleTableRow.js';

const PeopleTable = ({people, skills, interests, richestPerson}) => (
    <table className="table table-bordered">
        <thead>
        <tr>
            <th>Name</th>
            <th>Organisation</th>
            <th>Skills</th>
            <th>Interests</th>
        </tr>
        </thead>
        <tbody>
        {people.map((person, i) => {
            return (
                <PeopleRow key={i} person={person} skills={skills} interests={interests} richestPerson={richestPerson} />
            )
        }) }
        </tbody>
    </table>
);

export default PeopleTable;
