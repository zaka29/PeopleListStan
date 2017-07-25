import axios from 'axios';

export const getAllPeople = () => {
	return axios('/people')
}

export const getPeopleSkills = () => {
	return axios('/skills?personIds=1,2,3')
}

export const getInterests = () => {
	return axios('/interests?personIds=1,2')
}

export const getRichest = () => {
	return axios('/richest')
}