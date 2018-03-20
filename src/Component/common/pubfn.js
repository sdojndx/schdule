import store from "../../redux/store"
import { rule,eduValid } from './validate/validateRule'
import {addLoad,delLoad,uploadValidate,updateAlert} from "../../redux/action/tool"
/*
	调用接口公用方法
*/
export const post = (url,data)=>{
	return new Promise((resolve,reject)=>{			
		if(NODE_ENV!=="local"){		
			store.dispatch(addLoad());
			fetch(url,{
				method:'POST',
				body:JSON.stringify(data),			
				credentials: "include",
				headers:{
					eduToken:cxt.eduToken,
					eduRefUrl:window.location.href,
					"Content-Type":"application/json"
				}
			}).then(function(json){
				store.dispatch(delLoad());
				if(json.status==200){
					json.text().then((data)=>{
						var mes=JSON.parse(data);
						resolve(mes);
					})
				}else if(json.status==404){
					json.text().then((data)=>{
						if(data=="RedirectToLogin"){
							window.location.reload();
						}else{
							alert("没权限访问此功能");
						}
					})
				}
			}).catch(function(){
				store.dispatch(delLoad());
				reject();			
			})
		}
	})
}
export const getUrlInfo = ()=>{	
	return getInfoByUrl(window.location.href);
}
/*
	获取url上的参数
*/
export const getInfoByUrl = (url)=>{
	var urlinfo = {};
	var search = url.split("?");
	if(search.length>1){
		var searchpara = search.pop();
		var paras = searchpara.split("&");
		var urlParas=[];
		for(var i=0,l=paras.length;i<l; i++){
			var item=paras[i].split("=");
			if(item.length>1){
				urlParas.push({
					Key:item[0],
					Value:decodeURI(item[1])
				})
				urlinfo[item[0]]=decodeURI(item[1]);
			}

		}
	}
	return urlinfo;
}

//获取两时间间隔天数
export function selectDay(begintime,endtime) {
	var begin = new Date(begintime).getTime();
	var end = new Date(endtime).getTime();
	var nTime = end - begin;
	var day = Math.floor(nTime / 86400000);
	return day;
}
//时间戳转年月日
export const stampToDay = (date)=>{
	var date = new Date(date);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
	return Y+M+D;
}
export const stampToTime = (date)=>{
	var date = new Date(date);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
	//var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
	return Y+M+D+h+m;
}
export const stampToTimeSeconds = (date)=>{
	var date = new Date(date);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes())+ ':';
	var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
	return Y+M+D+h+m+s;
}
/*
	文件导入信息
*/
export const fileimport = (url,data)=>{
	var info = getInfoByUrl(url);
	var para = Object.assign({},data);
	//var info = _self.getParamsFromUrl(url);
	var obj = {mqCode:info.code?info.code:""};
	if(typeof para.path=="string"){
		obj.path = para.path;
		delete para.path
	}
	if(typeof para.fileName=="string"){
		obj.fileName = para.fileName;
		delete para.fileName
	}
			// if(_.isString(para.extName)){
			// 	obj.extName = para.extName;
			// 	delete para.extName
			// }
	obj.params = para;
	obj.jsonParams = JSON.stringify(para);
	return post(url,obj);
}

/*
	下载模板
*/
export const exporttemplate =(url,data) =>{
	return fileimport(url,data).then(function(json){
		if(json.code==1){
			var iframe = document.createElement("iframe");
			document.body.appendChild(iframe);
			iframe.src = json.data;
			iframe.style.display = "none";
		}
		return json;
	});
}

/*剩余天数*/
export const suplustime = (endDate)=>{
	var _self=this;
	var now=new Date().getTime();
	var suplustime=endDate-now;
	var day="";
	if(suplustime>=0){
		day =Math.floor(suplustime/86400000);
	}
	return day;
}
var randomid=0;
export const getRandomId=()=>{
	return randomid+=(Math.round(Math.random()*100)+1)
}	
/*
	获取元素距离页面左上角的距离
*/
export const getElementOffset=(elem)=>{
	var offset = {
		top:elem.offsetTop,
		left:elem.offsetLeft
	}
	var current = elem.offsetParent;
	while(current!==null){
		offset.top+=current.offsetTop;
		offset.left+=current.offsetLeft;
		current=current.offsetParent;
	}
	return offset;
}
/*
	显示校验结果气泡
	item 数据源
	val 验证的值
*/
export const doValidate=(event,item,val)=>{
	if(item.validateType||item.star||item.MaxLength||item.MinLength){
		var result = eduValid(item,val);
		var target = event.target;
		var offset = getElementOffset(target);
		offset.left+=target.offsetWidth;
		store.dispatch(uploadValidate(Object.assign({result:result},offset,{position:item.vposition})));
	}
}
/*
	取消显示校验结果气泡
*/
export const endValidate=()=>{
	store.dispatch(uploadValidate({}));
}
/*
校验表单合法性
source为表单数据源
val 为表单值
返回 ispass 是否验证通过
     detail 未验证通过的信息
*/
export const eduValidForm=(source,val)=>{
	var result = {
		ispass:true,
		detail:[]
	};
	source.map(function(item){
		var info = eduValid(item,val[item.name]);
		if(!info.value){
			result.ispass=false;
			result.detail.push(Object.assign({lable:item.lable},info));
		}
	})
	if(!result.ispass){
		var info = result.detail[0];
		for(var name in info){
			if(info[name].pass===false){
				alert(info.lable+info[name].text);
			}
		}		
	}
	return result;
}
/*
	info 提示信息
	callback 确定回调
	type 弹出框类型 默认为alert框
	cancelback 取消回调
*/
export const alert = (info,callback,type,cancelback)=>{
	store.dispatch(updateAlert({
		text:info,
		type:"alert",
		callback:()=>{
			if(typeof callback=="function"){
				callback();
			}
			store.dispatch(updateAlert({isShow:false}));
		},
		isShow:true,
		cancelback:()=>{
			if(typeof cancelback=="function"){
				cancelback();
			}
			store.dispatch(updateAlert({isShow:false}));
		}
	}));
}