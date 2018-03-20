import style from '../../../style/form.scss'
import React,{Component} from "react"
import {Link} from 'react-router'

class Textarea extends Component {
	render(){
		return(
			<textarea 
				value={this.props.val}
				onChange={this.setValue.bind(this)}
			></textarea>
		)
	}

	setValue(e) {
		var val = e.target.value;
		this.props.onChange(val);
	}
}

export default Textarea
