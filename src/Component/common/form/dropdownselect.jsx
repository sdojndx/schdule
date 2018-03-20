import { connect } from "react-redux"
import React, { Component } from "react"
import {updateDropdown} from "../../../redux/action/dropdownlist"
import store from "../../../redux/store"
import {post} from "../pubfn"
import requestpath from "../../../datesource/requestpath"
import Select from './select'
import Radio from './radio'
import Checkbox from './checkbox'
import SingleSelection from './singleselection'

class DropDownSelect extends Component {
	constructor(){
		super();
		this.state = {
			source:""
		}
	}
	componentDidMount() {
		var _self=this;
		if(!/@eu/g.test(this.props.source)){	
			if(!this.props.paraname&&!this.props.dropdownlist[this.props.source]){		
				post(requestpath.getdropdowndata,{
					data:{type:this.props.source}
				}).then(function(json){
					var obj={};
					obj[_self.props.source] = json;
					store.dispatch(updateDropdown(obj));
				})
			}else{

			}
		}
	}
	shouldComponentUpdate(nextProps){
		var _self=this;
		var reload=true;
		if(this.props.paraname&&this.props.para!=nextProps.para){
			for(var name in this.props.paraname){
				if(!nextProps.para[name]){
					reload=false;
					break;
				}
			}
			if(reload){
				post(requestpath.getdropdowndata,{
					data:Object.assign({type:this.props.source},nextProps.para)
				}).then(function(json){
					_self.setState({source:json})
				})
			}
		}
		return reload;
	}
	render() {
		var name = this.props.source;
		var source;
		if(this.state.source){
			source = this.state.source;
		}else if(/@eu/g.test(name)){
			source = this.props.enums[name.replace(/@eu/g,"")];
		}else{
			source = this.props.dropdownlist[name];
		}
		if(!source){
			return <span></span>
		}else{
			var props = Object.assign({},this.props,{source:source});
			if(props.type==202){
				return <Select {...props}/>
			}else if(props.type==206){
				return <Radio {...props}/>
			}else if(props.type==208){
				return <Checkbox {...props}/>
			}else if(props.type==220){
				return <SingleSelection {...props}/>
			}else{
				return <span></span>
			}
		}
	}
}

export default  connect((state)=>{	
	const {dropdownlist,enums}=state;
	return {dropdownlist,enums}
})(DropDownSelect)
