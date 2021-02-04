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
		return(
			<div className="Cell" onClick={this.handleClick}>
				{this.props.value}
			</div>
		)
	}
}

export default Cell;