import style from "../../style/buttons.scss"
import React, { Component } from "react"
import { Link } from 'react-router'

export default class Buttons extends Component {
	render() {
		var elem = "";
		if (this.props.linkTo) {
			elem = (
				<div
					className={style.btnPattern}
					style={Object.assign({}, { lineHeight: this.props.style ? this.props.style.height + "px" || "auto" : "auto" }, this.props.style)}
				>
					<Link to={this.props.linkTo} style={{ color: '#fff' }}>
						{this.props.btnName}
					</Link>
				</div>)
		} else {
			elem = (
				<div
					onClick={this.props.onClick}
					className={style.btnPattern}
					style={Object.assign({}, { lineHeight: this.props.style ? this.props.style.height + "px" || "auto" : "auto" }, this.props.style)}
				>
					{this.props.btnName}
					{this.props.children}
				</div>)
		}
		return (
			elem
		)
	}
}