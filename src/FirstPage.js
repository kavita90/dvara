import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert2';

const axios = require('axios').default;

function FirstPage() {
	const [ state, setState ] = useState({
		name: '',
		phone: ''
	});

	const [ file, setFile ] = useState();

	const handleChange = (e) => {
		if (e.target.name === 'name') {
			setState({
				name: e.target.value,
				phone: state.phone
			});
		} else {
			setState({
				phone: e.target.value,
				name: state.name
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await axios
			.post('http://localhost:8000/userdetails', state)
			.then(function(response) {
				console.log(response.data);
				return response.data;
			})
			.catch(function(error) {
				console.log(error);
			});
		console.log('result......', result);
		if(result.status == 200){
			swal.fire('succesfully sinserted')
		}
	};

	return (
		<div>
			<hr />
			<h1> Add User Details </h1>
			<form onSubmit={handleSubmit}>
				<input placeholder="Enter name" type="text" name="name" value={state.name} onChange={handleChange} />
				<br />

				<input
					placeholder="Enter mobile number"
					type="text"
					name="phone"
					value={state.phone}
					onChange={handleChange}
				/>
				<br />
				<label className="custom-file-upload">
					<input type="file" />
					Upload Picture
				</label>
				<br />
				<br />
				<button className="submit-button"> Submit</button>
			</form>
			<NavLink to="/fetch">Fetch details </NavLink>
		</div>
	);
}

export default FirstPage;
