import style from '../../../style/form.scss'
import React, { Component } from "react"
import { Link } from 'react-router'
import { getRandomId } from "../pubfn"

class Checkbox extends Component {
	constructor(props) {
		super(props);
	}
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
		var checkbox = [];
		var type = Object.prototype.toString.call(this.props.source);
		//var name = this.props.name + getRandomId();
		var originalValue=this.props.val||[];
		if (type == "[object Array]") {
			this.props.source.map((option, index) => {
				checkbox.push(
					<lable	
						key={`${index}a`}
						className={originalValue.indexOf(option.value)>-1?style.item_checked:style.item_unchecked}
						onClick={()=>this.setValue(option.value)}
					>
						{option.name}
					</lable>
				)
			});
		} else if (type == "[object Object]") {
			for (var name in this.props.source) {
				checkbox.push(
					<lable
						htmlFor ={name.replace(/^p/, "")}
						key={`${name}a`}
						className={originalValue.indexOf(option.value)>-1?style.item_checked:style.item_unchecked}
						onClick={()=>this.setValue(option.value)}
					>
						{this.props.source[name]}
					</lable>
				)
			}
		}
		return (
			<div 
				style={{ display: 'inline-block',width:"350" }} 
				className={style.form_radio}
			>
				{checkbox}
			</div>
		)
	}
	getAutoVal(source){
		var _self=this;
		var type = Object.prototype.toString.call(source);
		if(type=="[object Array]"&&_self.props.val){
			var autoval = [];
			source.map(function(item){
				if(_self.props.val.indexOf(item.value)>-1){
					autoval.push(item.value);
				}
			})
			if(this.props.onChange){
				this.props.onChange(autoval);
			}
		}
	}
	setValue(val) {
		var vals = this.props.val?this.props.val.slice():[];
		var index = vals.indexOf(val)
		if(index>-1){
			vals.splice(index,1);
		}else{
			vals.push(val);
		}
		if (this.props.onChange) {
			this.props.onChange(vals);
		}
	}

}
export default Checkbox