import style from '../../../style/form.scss'
import React, { Component } from "react"
import { Link } from 'react-router'
import { getRandomId } from "../pubfn"

class Radio extends Component {
	componentDidMount(){
		this.getAutoVal(this.props.source)
		if(typeof this.props.onInit=="function"){
			this.props.onInit();
		}
	}	
	shouldComponentUpdate(nextprops){
		if(nextprops.source!==this.props.source){
			this.getAutoVal(nextprops.source);
			return true;
		}else{
			return true;
		}
	}
	render() {
		var radios = [];
		var type = Object.prototype.toString.call(this.props.source);
		var name = this.props.name + getRandomId();
		if (type == "[object Array]") {
			this.props.source.map((option, index) => {
				radios.push(
					<input
						name={name}
						key={index}
						type="radio"
						value={option.value}
						disabled = {this.props.readonly}
						onChange={this.setValue.bind(this)}
						style={{ height: "15px", width: "20px" }}
						//defaultChecked={this.props.val}
						checked = {option.value==this.props.val?true:false}
					/>, 
					<span
						key={`${index}a`}
						style={{ margin: '5px 15px 0 5px' }}
					>
						{option.name}
					</span>
				)
			});
		} else if (type == "[object Object]") {
			for (var name in this.props.source) {
				radios.push(
					<input
						name={name}
						key={name}
						type="radio"
						value={name.replace(/^p/, "")}
						disabled = {this.props.readonly}
						onChange={this.setValue.bind(this)}
						style={{ height: "15px", width: "20px" }}
						//defaultChecked={this.props.val}
						checked = {option.value==this.props.val?true:false}
					/>, 
					<span
						key={`${name}a`}
						style={{ margin: '5px 15px 0 5px' }}
					>
						{this.props.source[name]}
					</span>
				)
			}
		}
		return (
			<div 
				style={{ display: 'inline-block' }} 
				className={style.form_radio}
			>
				{radios}
			</div>
		)
	}
	getAutoVal(source){
		//var source = this.props.source;
		var type = Object.prototype.toString.call(source);
		if(type=="[object Array]"){
			var autoval = "";
			if(this.props.hasall){
				autoval=-1;
			}
			for(var index=0,l=source.length;index<l;index++){
				var option = source[index];
				if(index==0&&autoval==""){
					autoval = option.value;
				}else if(this.props.val==option.value) {
					autoval = option.value;
					break;
				}else if(option.checked){
					autoval = option.value;
				}
			}
			if(this.props.onChange){
				this.props.onChange(autoval);
			}
		}
	}
	setValue(e) {
		var val = e.target.value;
		if (this.props.onChange) {
			this.props.onChange(val);
		}
	}
}

export default Radio