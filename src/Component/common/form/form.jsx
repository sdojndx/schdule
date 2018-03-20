import style from '../../../style/form.scss'
import React, { Component } from "react"
import { Link } from 'react-router'
import Input from './input'
import Checkbox from './checkbox'
import Select from './select'
import DropDownSelect from './dropdownselect'
import Textarea from './textarea'
import Editor from './editor'
import Radio from './radio'
import Text from './text'
import moment from 'moment'
import { DatePicker } from 'antd'
import Upload from './upload'
import MultUpload from './multupload'
import SingleSelection from './singleselection'
import {getElementOffset} from "../pubfn"
import { rule,validate } from '../validate/validateRule'
import store from "../../../redux/store"
import {uploadValidate} from "../../../redux/action/tool"
const { RangePicker } = DatePicker;

class Form extends Component {
	constructor(props) {
		super(props);
		var count = 0;
		this.props.formSource.map(function(item){
			var type = item.type;
			if(type==202||type==206||type==220){
				count++;
			}
		})
		this.state = {
			loadnumb : 0,
			waitcount:count
		}
	}
	/*
	元数据 字段含义
		vposition：定义校验弹出气泡的定位规则（“fixed”|“absolute”）
		validateType 验证类型
		maxLength最大长度
		minLength最小长度
		maxValue最大值
		maxValue最小值
	*/
	render() {
		var _self=this;
		var elemStyle = {
			edit: {
				formBox: "form_box",
				formTextBox: 'form_text_box',
				formStar: 'form_star',
				formName: 'form_name',
				width: 190,
				display: 'inline-block',
			},
			search: {
				formBox: "form_box2",
				formTextBox: 'form_text_box2',
				formStar: 'form_star',
				formName: 'form_name2',
				width: 190,
				height: 36,
				display: 'block',
				border: '1px solid #d2d2d2'
			},
			choice: {
				formBox: "form_box3",
				formTextBox: 'form_text_box3',
				formStar: 'form_star',
				formName: 'form_name3',
			},
		}
		// var detail = elemStyle[this.props.showType || "edit"];
		// detail = elemStyle[this.props.showType="choice"? "choice" :"edit"]
		var detail = ''
		if (this.props.showType == 'search') {
			detail = elemStyle['search']
		} else if (this.props.showType == 'choice') {
			detail = elemStyle['choice']
		} else {
			detail = elemStyle['edit']
		}
		var elem = ''
		return (
			<div
				className={style.classroom_input_box}
				style={{ padding: this.props.padding, margin: this.props.margin }}
			>
				{this.props.formSource.map((item, index) => {
					if (item.type == 200) {
						elem = (
							<Input
								{...item}
								// width={item.width}
								// height={item.height}
								// name={item.name}
								// star={item.star}
								// type={item.type}
								// validateType={item.validateType}
								// readonly={item.readonly}
								val={this.props.formData && this.props.formData[item.name]}
								onChange={(val)=>this.getVal(item.name,val,item.effect)}
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
							/>
						)
					} else if (item.type == 202) {
						if(typeof item.source =="string"){
							elem = (
								<DropDownSelect
									name={item.name}
									width={item.width}
									height={item.height}
									type={item.type}
									star={item.star}
									source={item.source}
									effect={item.effect}
									paraname={item.paraname}
									para={item.para}
									readonly={item.readonly}
									onChange={(val)=>this.getVal(item.name,val,item.effect)}
									hasall={item.hasall}
									val={this.props.formData && this.props.formData[item.name]}
									onInit={this.onInit.bind(this)}									
									onValidate={this.onValidate.bind(this)}
									onEndValidate={this.onEndValidate.bind(this)}
								/>
							)
						}else{
							elem = (
								<Select
									name={item.name}
									width={item.width}
									height={item.height}
									type={item.type}
									star={item.star}
									source={item.source}
									readonly={item.readonly}
									onChange={(val)=>this.getVal(item.name,val,item.effect)}
									hasall={item.hasall}
									val={this.props.formData && this.props.formData[item.name]}
									onInit={this.onInit.bind(this)}								
									onValidate={this.onValidate.bind(this)}
									onEndValidate={this.onEndValidate.bind(this)}
								/>
							)
						}
					} else if (item.type == 203) {
						elem = (
							<DatePicker
								width={item.width}
								className={style.ant_calendar_date}
								style={{ marginTop: "30px", marginLeft: '60px' }}
								readonly={item.readonly}
								val={this.props.formData && this.props.formData[item.name]}								
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
							/>
						)
					} else if (item.type == 204) {
						var defaultvalue = this.props.formData && this.props.formData[item.name];
						if(defaultvalue){
							defaultvalue = defaultvalue.map(function(item){
								return moment(item);
							})
						}else{
							defaultvalue=[];
						}
						elem = (
							<RangePicker
								width={item.width ? item.width : '300px'}
								value={defaultvalue}
								type={item.type}
								star={item.star}
								readonly={item.readonly}
								style={{ width: _self.props.timeWidth ? _self.props.timeWidth : '440px', marginTop:"0", marginLeft: '0' }}
								onChange={(moment, times) => { this.getVal(item.name, times) }}								
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
							/>
						)
					} else if (item.type == 205) {
						elem = (
							<span style={{ lineHeight: "43px", marginLeft: '15px' }}>
								{ this.props.formData[item.name]}
							</span>
						)
					} else if (item.type == 206) {						
						if(typeof item.source =="string"){
							elem = (
								<DropDownSelect
									name={item.name}
									width={item.width}
									star={item.star}
									type={item.type}
									effect={item.effect}
									readonly={item.readonly}
									paraname={item.paraname}
									para={item.para}
									onChange={(val)=>this.getVal(item.name,val,item.effect)}
									source={item.source}
									hasall={item.hasall}
									onInit={this.onInit.bind(this)}
									val={this.props.formData && this.props.formData[item.name]}								
									onValidate={this.onValidate.bind(this)}
									onEndValidate={this.onEndValidate.bind(this)}
								/>
							)
						}else{
							elem = (
								<Radio
									name={item.name}
									width={item.width}
									star={item.star}
									type={item.type}
									readonly={item.readonly}
									onChange={(val)=>this.getVal(item.name,val,item.effect)}
									source={item.source}
									hasall={item.hasall}
									onInit={this.onInit.bind(this)}
									val={this.props.formData && this.props.formData[item.name]}								
									onValidate={this.onValidate.bind(this)}
									onEndValidate={this.onEndValidate.bind(this)}
								/>
							)
						}
					} else if (item.type == 207) {
						elem = (
							<Text	
								name={item.name}
								width={item.width}
								star={item.star}							
								readonly={item.readonly}
								val={this.props.formData && this.props.formData[item.name]}								
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
								onChange={(val)=>this.getVal(item.name,val,item.effect)}
							/>
						)
					}
					else if (item.type == 217) {
						var defaultvalue = this.props.formData && this.props.formData[item.name];
						if(defaultvalue){
							defaultvalue = defaultvalue.map(function(item){
								return moment(item);
							})
						}else{
							defaultvalue=[];
						}
						elem = (
							<RangePicker
								width={item.width ? item.width : '300px'}
								format={"YYYY-MM-DD HH:mm:ss"}
								showTime
								value={defaultvalue}
								type={item.type}
								star={item.star}
								readonly={item.readonly}
								style={{ width: _self.props.timeWidth ? _self.props.timeWidth : '440px', marginTop: "0", marginLeft:'0' }}
								onChange={(moment, times) => { this.getVal(item.name, times) }}								
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
							/>
						)
					}else if (item.type == 218) {
						elem = (
							<Upload
								name={item.name}
								width={item.width}
								star={item.star}
								type={item.type}
								val={this.props.formData && this.props.formData[item.name]}
								onChange={(val)=>{this.getVal(item.name,val)}}								
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
							/>
						)
					} else if (item.type == 219) {
						elem = (
							<Textarea
								name={item.name}
								width={item.width}
								star={item.star}
								type={item.type}
								val={this.props.formData && this.props.formData[item.name]}
								onChange={(val)=>this.getVal(item.name,val,item.effect)}								
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
							/>
						)
					} else if (item.type == 220) {
						if(typeof item.source =="string"){							
							elem = (
								<DropDownSelect
									name={item.name}
									width={item.width}
									star={item.star}
									type={item.type}
									effect={item.effect}
									paraname={item.paraname}
									para={item.para}
									className={style.single_selection}
									val={this.props.formData && this.props.formData[item.name]}
									onChange={(val)=>this.getVal(item.name,val,item.effect)}
									source={item.source}
									hasall={item.hasall}
									onInit={this.onInit.bind(this)}								
									onValidate={this.onValidate.bind(this)}
									onEndValidate={this.onEndValidate.bind(this)}
								/>
							)
						}else{
							elem = (
								<SingleSelection
									name={item.name}
									width={item.width}
									star={item.star}
									type={item.type}
									className={style.single_selection}
									val={this.props.formData && this.props.formData[item.name]}
									onChange={(val)=>this.getVal(item.name,val,item.effect)}
									source={item.source}
									hasall={item.hasall}
									onInit={this.onInit.bind(this)}								
									onValidate={this.onValidate.bind(this)}
									onEndValidate={this.onEndValidate.bind(this)}
								/>
							)
						}
					} else if (item.type == 221) {
						elem = (
							<MultUpload
								name={item.name}
								width={item.width}
								star={item.star}
								type={item.type}
								//construct = {item.}
								val={this.props.formData && this.props.formData[item.name]}
								onChange={(val)=>this.getVal(item.name,val,item.effect)}								
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
							/>
						)
					} else if (item.type == 912) {
						const ueditorId = Math.random().toString(16).substring(2) + 'ueditorId';
						elem = (
							<Editor
								name={item.name}
								width={item.width}
								id={ueditorId}
								content={item.content}
								initialContent=""
								val={this.props.formData && this.props.formData[item.name]}
								type={item.type}
								onChange={(val)=>this.getVal(item.name,val,item.effect)}								
								onValidate={this.onValidate.bind(this)}
								onEndValidate={this.onEndValidate.bind(this)}
							/>
						)
					}else if(item.type == 208){
						if(typeof item.source =="string"){
							elem = (
								<DropDownSelect
									name={item.name}
									width={item.width}
									height={item.height}
									star={item.star}
									type={item.type}
									effect={item.effect}
									readonly={item.readonly}
									paraname={item.paraname}
									para={item.para}
									onChange={(val)=>this.getVal(item.name,val,item.effect)}
									source={item.source}
									hasall={item.hasall}
									onInit={this.onInit.bind(this)}
									val={this.props.formData && this.props.formData[item.name]}								
									onValidate={this.onValidate.bind(this)}
									onEndValidate={this.onEndValidate.bind(this)}
								/>
							)
						}else{
							elem = (
								<Checkbox
									name={item.name}
									width={item.width}
									height={item.height}
									star={item.star}
									type={item.type}
									readonly={item.readonly}
									onChange={(val)=>this.getVal(item.name,val,item.effect)}
									source={item.source}
									hasall={item.hasall}
									onInit={this.onInit.bind(this)}
									val={this.props.formData && this.props.formData[item.name]}								
									onValidate={this.onValidate.bind(this)}
									onEndValidate={this.onEndValidate.bind(this)}
								/>
							)
						}
					}
					return (
						<div
							key={index}
							className={style[detail.formBox]}
							style={{ marginLeft: this.props.marginLeft }}
						>
							<div className={style[detail.formTextBox]}>
								<span className={style[detail.formStar]}>{item.star ? '*' : ''}</span>
								<strong className={style[detail.formName]}>{item.lable}</strong>:
							</div>
							{elem}
							<span className={style.form_after_text}>{item.after ? item.after : ''}</span>
						</div>
					)
				})}
			</div>
		)
	}
	onInit(){
		var _self=this;
		if(this.state.loadnumb<this.state.waitcount&&typeof this.props.onInit=="function"){
			var loadnumb = ++this.state.loadnumb;
			if(loadnumb==this.state.waitcount){
				setTimeout(function(){
					_self.props.onInit();
				},10)
			}
			this.setState({loadnumb:loadnumb});
		}
	}
	getVal(name,val,effect){
		var obj ={};
		obj[name]=val
		var formdata = Object.assign({},this.props.formdata,obj);
		this.setState({formdata:formdata});
		this.props.onChange(formdata,name,val);
		if(typeof this.props.onSourceEffect=="function"&&effect&&effect.length>0){
			var source = this.props.formSource.slice();
			effect.map(function(ename){
				source.map(function(item){
					if(item.name==ename){
						for(var pname in item.paraname){
							if(item.paraname[pname]==name){			//paraname  source内的级联关系
								if(!item.para){
									item.para={}
								}else{
									item.para = Object.assign({},item.para)
								}
								item.para[pname]=val;
								break;
							}
						}
					}
				})
			})
			this.props.onSourceEffect(source);
		}
	}
	/*
		vposition：定义校验弹出气泡的定位规则（“fixed”|“absolute”）
	*/
	onValidate(event,item,val){
		if(item.validateType||item.star||item.maxLength||item.minLength){
			var result = this.eduValid(item,val);
			var target = event.target;
			var offset = getElementOffset(target);
			offset.left+=target.offsetWidth;
			store.dispatch(uploadValidate(Object.assign({result:result},offset,{position:item.vposition})));
		}
	}
	onEndValidate(){
		store.dispatch(uploadValidate({}));
	}
/*
	info 字段含义
	validateType 验证类型
	maxLength最大长度
	minLength最小长度
	maxValue最大值
	maxValue最小值
*/
	eduValid(info,val){
		var _self=this;
		var type = info.validateType;
		if(type==""){
			type=0;
		}
		var notempty = {};
		var extend = {};
		if(info.star){
			notempty.allownull={
				value:false,
				text:"不能为空"
			};
		}else{
			notempty.allownull={
				value:true,
				text:"可以为空"
			};
		}
		var maxl = info.maxLength;
		var minl = info.minLength;
		if(maxl&&minl){
			if(maxl==minl){
				extend.eqlength={
					value:parseInt(maxl),
					text:"长度为{}的字符"
				}
			}else{
				extend.maxlength={
					value:parseInt(minl),
					text:"最长不可少于{}个字符"
				}
				extend.maxlength={
					value:parseInt(maxl),
					text:"最长不可超过{}个字符"
				}
			}
		}else{
			if(minl){
				extend.maxlength={
					value:parseInt(minl),
					text:"最长不可少于{}个字符"
				}
			}
			if(maxl){
				extend.maxlength={
					value:parseInt(maxl),
					text:"最长不可超过{}个字符"
				}
			}
		}
		if(info.maxValue){
			var maxVal;
			if(/^\d+(\.\d{1,})$/.test(info.maxValue)){
				maxVal = parseFloat(info.maxValue).toFixed(1);
			} else {
				maxVal = info.maxValue;
			}
			extend.maxValue={
				value:maxVal,					
				text:"最大不可大于{}"
			}
		}
		if(info.minValue){
			var minVal;
			if(/^\d+(\.\d{1,})$/.test(info.minValue)){
				minVal = parseFloat(info.minValue).toFixed(1);
			} else {
				minVal = info.minValue;
			}
			extend.minValue={
				value:minVal,
				text:"最小不可小于{}"
			}
		}
		var result = validate(val,type,notempty,extend); 
		return result;
	}
}

export default Form