import style from '../../../style/form.scss'
import React, { Component } from "react"
import { Link } from 'react-router'
import CeduUploader from "../../../plugin/upload/ceduuploader"
import requestpath from "../../../datesource/requestpath"
import { post } from "../pubfn"

class Upload extends Component {
	constructor(props){
		super(props);
		this.state={
			uploading:{
				isloading:0,
				percent:0,
				name:""
			}
		}
	}
	componentDidMount() {
		var _self = this;
		post(requestpath.urlGetUploadKey,//getConsts,//
			{ data: "" }
		).then(function (json) {
			var config = {
				pick: {
					id: _self.UpdateBt,
					label: "浏览……",
					multiple: false,
					style: { overflow: '' }
				},
				getAuth: function () {
					var auth = { "appId": json.data.appId, "userId": json.data.userId, "timestamp": json.data.timestamp, "sign": json.data.sign };
					return auth;
				},
				complete: function (file) {
					// _self.props.onChange(_self.props.name, file.result.url);
					// _self.props.onChange("fileName", file.name);
					_self.setState({
						"uploading":{
							isloading:0,
							percent:0,
							name:""
						}
					})
					_self.props.onChange({url:file.result.url,name:file.name});
					//_self.props.onChange(_self.props.name + "fileName", file.name);
					//$elem.val(file.name).data({"value":file.result.url,"fileName":file.name,"extName":file.ext}).trigger('uploadchange',file);
				},
				fail: function (error) {
					alert(error.tip);
				},
				//可选参数
				auto: true,
				start: function (file) {
					_self.setState({
						"uploading":{
							isloading:1,
							percent:0,
							name:file.name
						}
					})
				},
				progress: function (file) {
					var obj = Object.assign({},_self.state.uploading);
					obj.percent = (file.percent*100+"%");

					_self.setState({
						"uploading":obj
					})
				},
				debug: false //是否打印日志
			};
			// if(elem.hasOwnProperty("acceptFileTypes")){
			// 	config.acceptFileTypes=elem.acceptFileTypes;
			// }
			// if(elem.hasOwnProperty("maxFileSize")){
			// 	config.maxFileSize=elem.maxFileSize;
			// }			
			CeduUploader(config);
			if(typeof _self.props.onInit=="function"){
				_self.props.onInit();
			}
		})
	}
	render() {
		var _self=this;
		var upload = null;
		if(this.state.uploading.isloading==1){
			upload = (
				<div className={style.uploadElem}>
					<span>{this.state.uploading.name}</span>						
					<div 
						className={style.uploadElem_scale} 
						style={{width:this.state.uploading.percent}}
					>
						{this.state.uploading.name}
					</div>
				</div>
			)
		}else if(this.props.val){
			upload = (
				<div 
					className={style.uploadElem}
				>	
						{this.props.val.name}
						<div 
							className={style.uploadRemove}
							onClick={()=>_self.removeElem(index)}
						>x</div>
				</div>
			)
		}
		return (
			<div className={style.uploadContent}>
				{/*<input ref={(update)=>{this.Update=update}}
					type="text"
					placeholder={this.props.placeholder}
					style={{
						width: (this.props.width ? this.props.width : '200px'),
						height: this.props.height,
						margin: this.props.margin
					}}
					value={this.props.val}
					name={this.props.name}
				/>*/}
				<div className={style.uploadBoxUp}>选择文件</div>
				<div className={style.upload} ref={(updatebt) => { this.UpdateBt = updatebt }}></div>
				<div className={style.uploadList}>
				{upload}
				</div>
			</div>
		)
	}
	removeElem(){
		_self.props.onChange("");
	}
}

export default Upload




