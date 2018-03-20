import style from '../../../style/form.scss'
import React,{Component} from "react"
import {Link} from 'react-router'

class Text extends Component {
	render(){
		return(
			<span style={{float:'left'}}> { this.props.val } </span>
		)
	}

	setValue(e) {
		var val = e.target.value;
		this.props.onChange(val);
	}
}

export default Text
