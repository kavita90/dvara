import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function FetchDetails() {
	const [ ph, setPh ] = useState('');
	const [ data, setData ] = useState([]);
	const [ total, setTotal ] = useState(0);

	const handleChange = (e) => {
		setPh(e.target.value);
	};
	const dt = data[0] ? data[0] : {};
	const displayData = [ 'NAME', 'MOBILE NUMBER', 'DATE OF REGISTERATION', 'PHOTO' ];

	let arr = [];
	arr[0] = dt.name;
	arr[1] = dt.phone_number;
	arr[2] = new Date(dt.created_at).toLocaleDateString();
	arr[3] = dt.image;

	useEffect(async () => {
		const response = await axios
			.get('http://localhost:8000/users')
			.then((res) => {
				setTotal(res.data.total);
				return res.data.total;
			})
			.catch((err) => {
				return err;
			});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios
			.post('http://localhost:8000/userid', { phone_number: ph })
			.then((res) => {
				setData(res.data.output);
				return res.data;
			})
			.catch((err) => {
				return err;
			});
	};

	return (
		<div>
			<div>
				<hr />
				<h4> Total users {total} </h4>
				<h1>FIND USERS DETAILS</h1>
				<form onSubmit={handleSubmit}>
					<br />
					<input
						placeholder="Enter mobile number"
						type="text"
						name="phone"
						value={ph}
						onChange={handleChange}
					/>
					<br />
					<br />
					<br />

					<button className="submit-button"> Submit</button>
				</form>
				<br />
				<br />
			</div>
			<div className="fetch-div">
				<table>
					{displayData.map((item, i) => {
						return (
							<tr>
								<td>{item}</td>
								<td>{arr[i]}</td>
							</tr>
						);
					})}
				</table>
      </div>
      <button className="submit-button" onClick={()=>{window.location.href = 'http://localhost:3000/user'}}> 
      Add user details
      </button>
     		</div>
	);
}

export default FetchDetails;
