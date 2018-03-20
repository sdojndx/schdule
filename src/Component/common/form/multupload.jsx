import style from '../../../style/form.scss'
import React, { Component } from "react"
import { Link } from 'react-router'
import CeduUploader from "../../../plugin/upload/ceduuploader"
import requestpath from "../../../datesource/requestpath"
import { post } from "../pubfn"

class MultUpload extends Component {
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
					var obj = _self.props.val.slice();

					obj.push({
						attachmentName:file.name,
						attachmentUrl:file.result.url,
						status:2
					})
					_self.props.onChange(obj);
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
		var uploads = [];
		if(this.state.uploading.isloading==1){
			uploads.push(
				<div key={-1} className={style.uploadElem}>
					<span>{this.state.uploading.name}</span>						
					<div 
						className={style.uploadElem_scale} 
						style={{width:this.state.uploading.percent}}
					>
						{this.state.uploading.name}
					</div>
				</div>
			)
		}
		this.props.val&&this.props.val.map(function(item,index){
			if(item.status==2||item.status==0){
				uploads.push(
					<div 
						key={item.index} 
						className={style.uploadElem}
					>	
							{item.attachmentName}
							<div 
								className={style.uploadRemove}
								onClick={()=>_self.removeElem(index)}
							>x</div>
					</div>
				)
			}
		})
		return (
			<div className={style.uploadContent}>
				<div className={style.uploadBoxUp}>选择文件</div>
				<div className={style.upload} ref={(updatebt) => { this.UpdateBt = updatebt }}></div>
				<div className={style.uploadList}>
					{uploads}
				</div>
			</div>
		)
	}
	removeElem(index){
		var list = this.props.val.slice();
		var obj = Object.assign({},list[index]);
		if(obj.status==0){
			obj.status=1;
			list.splice(index,1,obj);
		}else{
			list.splice(index,1);
		}
		this.props.onChange(list);
	}
}
export default MultUpload

export const getSubAttach = (list)=>{
	var sublist = []
	list.map(function(item,index){
		if(item.status!=0){
			sublist.push(item);
		}
	})
}


