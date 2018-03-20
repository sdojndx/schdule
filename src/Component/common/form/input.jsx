import style from '../../../style/form.scss'
import React, { Component } from "react"
import { Link } from 'react-router'

class Input extends Component {
	render() {
		return (
			<input
				type="text"
				placeholder={this.props.placeholder}
				style={{
					width: this.props.width,
					height: this.props.height,
					margin: this.props.margin,
				}}
				readOnly = {this.props.readonly}
				value={this.props.val}
				onChange={this.setValue.bind(this)}
				name={this.props.name}
				className={style.textInput}
				defaultValue={this.props.defaultValue}
				onFocus={this.onFocus.bind(this)}
				onBlur ={this.props.onEndValidate}
			/>
		)
	}
	setValue(e) {
		var val = e.target.value;
		this.props.onChange(val);
		if(typeof this.props.onValidate=="function"){
			this.props.onValidate(e,this.props,val);
		}
	}
	onFocus(e){
		if(typeof this.props.onValidate=="function"){
			this.props.onValidate(e,this.props,this.props.val)
		}
	}
}

export default Input




