import style from '../../../style/form.scss'
import React, { Component } from "react"
import { DatePicker } from 'antd';

class DateSpace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			endOpen: false
		}
	} 
	render() {
		var startValue,endValue;
		if(this.props.val&&this.props.val.length==2){
			startValue = this.props.val[0];
			endValue = this.props.val[1];
		}
 		var {endOpen } = this.state;
		return (
		  <div className={style.datespace}>
		    <DatePicker
		      disabledDate={this.disabledStartDate.bind(this)}
		      format="YYYY-MM-DD"
		      value={startValue}
		      placeholder="Start"
		      onChange={this.onStartChange.bind(this)}
		      onOpenChange={this.handleStartOpenChange.bind(this)}
		    />
		    <DatePicker
		      disabledDate={this.disabledEndDate.bind(this)}
		      format="YYYY-MM-DD"
		      value={endValue}
		      placeholder="End"
		      onChange={this.onEndChange.bind(this)}
		      open={endOpen}
		      onOpenChange={this.handleEndOpenChange.bind(this)}
		    />
		  </div>
		);
	}
	disabledStartDate(startValue){
		var endValue;
		if(this.props.val){
			endValue = this.props.val[1];
		}
		//const endValue = this.state.endValue;
		if (!startValue || !endValue) {
		  return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	}

	disabledEndDate(endValue){
		//const startValue = this.state.startValue;
		var startValue;
		if(this.props.val){
			startValue = this.props.val[0];
		}
		if (!endValue || !startValue) {
		  return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	}

	// onChange(field, value){
	// 	this.setState({
	// 	  [field]: value,
	// 	});
	// 	this.props.onChange([]);
	// }

	onStartChange(value){
		var list;
		if(this.props.val){
			list = this.props.val.slice();
		}else{
			list = ["",""];
		}
		if(list[0]!=value){
			list[0] = value;
			this.props.onChange(list);
		}
		//this.onChange('startValue', value);
	}

	onEndChange(value){
		var list;
		if(this.props.val){
			list = this.props.val.slice();
		}else{
			list = ["",""];
		}
		if(list[1]!=value){
			list[1] = value;
			this.props.onChange(list);
		}
		//this.onChange('endValue', value);
	}

	handleStartOpenChange(open){
		if (!open) {
		  this.setState({ endOpen: true });
		}
	}

	handleEndOpenChange(open){
		this.setState({ endOpen: open });
	}
}

export default DateSpace




