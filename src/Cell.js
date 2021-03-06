import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	} 


	handleClick(event) {
		this.props.showValue()
	}

	render() {
		console.log("Cell props: "+this.props.value)
		return(
			<div className="Cell" onClick={this.handleClick}>
				{this.props.value === '-' ? null : this.props.value}
			</div>
		)
	}
}

export default Cell;