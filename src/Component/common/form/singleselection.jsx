import style from '../../../style/form.scss'
import React, { Component } from "react"
import { Link } from 'react-router'
import { getRandomId } from "../pubfn"

class SingleSelection extends Component {
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
		var selects = [];
		var type = Object.prototype.toString.call(this.props.source);
		var name = this.props.name + getRandomId();

		if(this.props.hasall){
			selects.push(
				<div className={style.singleselect_opt} key={-1}>
					<div
						className={this.props.val == -1 ? style.singleselect_active : style.singleselect}
						onClick={this.setValue.bind(this)}
						value={-1}
					>
					{this.props.hasall}
					</div>
				</div>
			)

		}
		if (type == "[object Array]") {
			this.props.source.map((option, index) => {
				//radios.push(<input name={name} key={index} onChange={this.setValue.bind(this)} style={{height:"15px",width:"20px"}} type="radio" value={option.value} defaultChecked={this.props.val}/>,<span key={`${index}a`} style={{margin: '5px 15px 0 5px'}}>{option.name}</span>)
				selects.push(
					<div className={style.singleselect_opt} key={index}>
						<div
							className={this.props.val == option.value ? style.singleselect_active : style.singleselect}
							onClick={this.setValue.bind(this)}
							value={option.value}
						>{option.name}
						</div>
					</div>
				)
			});
		} else if (type == "[object Object]") {
			for (var name in this.props.source) {
				//radios.push(<input name={name} key={name} onChange={this.setValue.bind(this)} style={{height:"15px",width:"20px"}} type="radio" value={name.replace(/^p/,"")} defaultChecked={this.props.val}/>,<span key={`${name}a`}  style={{margin: '5px 15px 0 5px'}}>{this.props.source[name]}</span>)
				selects.push(
					<div className={style.singleselect_opt} key={index}>
						<div
							className={this.props.val == (name.replace(/^p/, "")) ? style.singleselect_active : style.singleselect}
							onClick={this.setValue.bind(this)}
							value={name.replace(/^p/, "")}
						>{this.props.source[name]}
						</div>
					</div>
				)
			}
		}
		return (
			<div style={{ display: 'inline-block', width:'865px'}} className={style.form_radio3}>
				{selects}
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
		var val = e.target.getAttribute("value");
		if (this.props.onChange) {
			this.props.onChange(val);
		}
	}
}

export default SingleSelection