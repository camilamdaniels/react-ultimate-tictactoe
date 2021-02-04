import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css'

class Board extends Component {

	static defaultProps = {
		BOARD_SIZE: 9
	}

	constructor(props) {
		super(props)
	}
	render() {

		let cells = [];

		for (let i = 0; i < this.props.BOARD_SIZE; i++) {
			cells.push(
				<Cell />
			)
		}

		return(
			<div className="Board-grid">{cells}</div>
		)
	}
}

export default Board;