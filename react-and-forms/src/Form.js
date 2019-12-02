import React from 'react';
import './Form.css';

class Form extends React.Component {
	constructor(){
		super();
		this.state = {
			numArr: [], 
			select: 'Sum',
			answer: 'No operations have been done yet'
		}
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		let numArr = this.state.numArr;
		if(this.state.select === 'Sum'){
			let sum = numArr.reduce((total, currentNum) => {
				return total + currentNum;
			});
			this.setState({
				answer: sum
			});
		}
		else if(this.state.select === 'Average'){
			let avg = numArr.reduce((total, currentNum) => {
				return total + currentNum;
			}) / numArr.length;
			this.setState({
				answer: avg
			});
		}
		else{
			let temp = {};
			for(let i = 0; i < numArr.length; i++){
				if(numArr[i] in temp){
					temp[numArr[i]] ++;
				}
				else{
					temp[numArr[i]] = 1;
				}
			}
			let largestAmtOfTimes = 0;
			let numsSeen = '';
			let arr = Object.entries(temp);
			for(let i = 0; i < arr.length; i++){
				if(arr[i][1] === largestAmtOfTimes){
					numsSeen += ` and ${(arr[i][0])}`;
				}
				else if(arr[i][1] > largestAmtOfTimes){
					numsSeen = [];
					numsSeen += `${(arr[i][0])}`;
					largestAmtOfTimes = arr[i][1];
				}
			}
			this.setState({
				answer: numsSeen
			})
		}
		
	}

	handleNumArrChange = (e) => {
		let superString = e.target.value;
		console.log(superString);
		let arr = superString.split(',');
		arr = arr.map((elem) => {
			return parseInt(elem);
		})
		this.setState({
			numArr: arr
		});
	}

	handleSelectChange = (e) => {
		this.setState({
			select: e.target.value
		})
	}



	render(){
		return(
			<form className='form' onSubmit={this.handleFormSubmit}>
				<h1>Math Form</h1>
				<h3>Enter each number in the array, separated by a ","</h3>
				<input type='text' className = 'numArr' onChange={this.handleNumArrChange}/>
				<select onChange={this.handleSelectChange}>
					<option value='Sum'>Sum</option>
					<option value='Average'>Average</option>
					<option value='Mode'>Mode</option>
				</select>
				<button type='submit'>Calculate</button>
				<div className='results'><h2>{this.state.answer}</h2></div>
			</form>)
	}
}

 export default Form;