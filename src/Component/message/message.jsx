import { connect } from "react-redux"
import style from "../../style/message.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import PageNav from '../common/pagenav'
import requestpath from "../../datesource/requestpath"
import { post, stampToTime } from "../common/pubfn"
import Paging from "../common/paging/paging"

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageLists: [],
			typeList : [{
				name:"未读信息",
				type:""
			},{
				name:"导入信息",
				type:1
			},{
				name:"导出信息",
				type:2
			},{
				name:"下载信息",
				type:3
			},{
				name:"其他信息",
				type:4
			}],
			paging:{
				pageIndex:1,
				totalCount:0,
				pageSize:10,
				totalPage:0
			},
		};
	}
	componentDidMount() {
		var {pageIndex,pageSize} = this.state.paging;
		this.getList({
			pageIndex:pageIndex,
			pageSize:pageSize,
			data:this.props.params.type||""
		});
	}
	componentDidUpdate(prevprops){
		if(prevprops.params.type!=this.props.params.type){
			var {pageIndex,pageSize} = this.state.paging;
			this.getList({
				pageIndex:pageIndex,
				pageSize:pageSize,
				data:this.props.params.type||""
			});
		}
	}
	render() {
		var _self=this;
		var type =this.props.params.type||"";
		var navlist = [];
		this.state.typeList.map(function(item){
			if(item.type==type){
				navlist.push(<span className={style.sel_nav}>{item.name}</span>);
			}else{
				navlist.push(<Link to={`message/${item.type}`}><span>{item.name}</span></Link>)
			}
		})
		var table = "";
		if(type==""){
			table = (
				<tbody>
					<tr className={style.list_outfit}>
						<th><span>功能名称</span></th>
						<th><span>处理文件名称</span></th>
						<th><span>处理结果</span></th>
						<th><span>进度</span></th>
						<th><span>处理时间</span></th>
						<th><span>查看状态</span></th>
					</tr>
					{
						this.state.messageLists.map((item, index) => {
							return (<tr key={index} index>
								<td>{item.mqName}</td>
								<td>{item.fileName}</td>
								<td>{_self.makeContent(item)}</td>
								<td>{this.props.enums.SysMsgState[`p${item.state}`]}</td>
								<td>{item.createDate}</td>
								<td>{item.isRead==1?"已读":"未读"}</td>
							</tr>
							)
						})
					}
				</tbody>
			)
		}else if(type=="1"){
			table = (
				<tbody>
					<tr className={style.list_outfit}>
						<th><span>功能名称</span></th>
						<th><span>导入文件名称</span></th>
						<th><span>处理结果</span></th>
						<th><span>进度</span></th>
						<th><span>导入时间</span></th>
						<th><span>查看状态</span></th>
					</tr>
					{
						this.state.messageLists.map((item, index) => {
							return (<tr key={index} index>
								<td>{item.mqName}</td>
								<td>{item.fileName}</td>
								<td>{_self.makeContent(item)}</td>
								<td>{this.props.enums.SysMsgState[`p${item.state}`]}</td>
								<td>{item.createDate}</td>
								<td>{item.isRead==1?"已读":"未读"}</td>
							</tr>
							)
						})
					}
				</tbody>
			)
		}else if(type=="2"){
			table = (
				<tbody>
					<tr className={style.list_outfit}>
						<th><span>功能名称</span></th>
						<th><span>导出文件名称</span></th>
						<th><span>进度</span></th>
						<th><span>导出时间</span></th>
						<th><span>查看状态</span></th>
					</tr>
					{
						this.state.messageLists.map((item, index) => {
							return (<tr key={index} index>
								<td>{item.mqName}</td>
								<td>{item.fileName}</td>
								<td>{this.props.enums.SysMsgState[`p${item.state}`]}</td>
								<td>{item.createDate}</td>
								<td>{item.isRead==1?"已读":"未读"}</td>
							</tr>
							)
						})
					}
				</tbody>
			)
		}else if(type=="3"){
			table = (
				<tbody>
					<tr className={style.list_outfit}>
						<th><span>功能名称</span></th>
						<th><span>下载文件名称</span></th>
						<th><span>进度</span></th>
						<th><span>打包时间</span></th>
						<th><span>查看状态</span></th>
					</tr>
					{
						this.state.messageLists.map((item, index) => {
							return (<tr key={index} index>
								<td>{item.mqName}</td>
								<td>{item.fileName}</td>
								<td>{this.props.enums.SysMsgState[`p${item.state}`]}</td>
								<td>{item.createDate}</td>
								<td>{item.isRead==1?"已读":"未读"}</td>
							</tr>
							)
						})
					}
				</tbody>
			)
		}else if(type=="4"){
			table = (
				<tbody>
					<tr className={style.list_outfit}>
						<th><span>功能名称</span></th>
						<th><span>详情</span></th>
						<th><span>进度</span></th>
						<th><span>时间</span></th>
						<th><span>查看状态</span></th>
					</tr>
					{
						this.state.messageLists.map((item, index) => {
							return (<tr key={index} index>
								<td>{item.mqName}</td>
								<td>{_self.makeContent(item)}</td>
								<td>{this.props.enums.SysMsgState[`p${item.state}`]}</td>
								<td>{item.createDate}</td>
								<td>{item.isRead==1?"已读":"未读"}</td>
							</tr>
							)
						})
					}
				</tbody>
			)
		}
		return (
			<PageNav
				firstClassTit="消息中心"
				hasSelect="2"
			>
				<div className={style.messageType}>
					{navlist}
				</div>
				<div className={style.messageList}>
					<table>
						{table}
					</table>
					<Paging
						style={{marginBottom:25}}
						paging = {this.state.paging}
						onPageChange = {this.onPageChange.bind(this)}
					/>
				</div>
			</PageNav>
		)
	}
	getList(para) {
		var _self = this;
		post(requestpath.getMessageList,para).then(function (json) {
			_self.setState({ 
				"messageLists": json.items,
				"paging":{
					pageIndex:para.pageIndex,
					totalCount:json.totalCount,
					pageSize:para.pageSize
				}
			})
			post(requestpath.setMessageRead,{data:para.data}).then(function(){

			}).catch();
		}).catch();
	}
	onPageChange(pageIndex,pageSize){
		this.getList({
			data:this.props.params.type||"",
			pageSize:pageSize,
			pageIndex:pageIndex
		});
	}
	makeContent(model){
		var _self = this;
		var word = '', item = {}, cName = '';
		if(model.fileName) {
			var index = model.fileName.lastIndexOf('.');
			var name = model.fileName.substr(0, index);
			// var ext = model.fileName.substr(index);
			cName = name + '_处理结果';
		}else{
			cName = model.mqName;
		}
		if((typeof model.content=="undefined")||model.content===""||model.content==null){
			word = item.autoText?item.autoText:"";
		}else{
			try {
				item.msgContent = JSON.parse(model.content);
			} catch(err) {
				if( window.console ){
					console.log('请检查返回数据格式');
				}
			}
			if(typeof item.msgContent == "object"){
				if(item.msgContent.target&&item.msgContent.target=="_dialog"){
					if(item.msgContent.url){
						word = <a onClick={()=>this.openIframe(item.msgContent.url)} href="javascript:void(0)">{item.msgContent.msg}</a>;
					}else{
						word = item.msgContent.msg;
					}
				}else{
					if(item.msgContent.type){
						var displayMsg = item.msgContent.msg || '点击查看详情';
						switch(item.msgContent.type) {
						case 1:
							if(item.msgContent.url){
								var ext = item.msgContent.url.split('.')[1].split('?')[0];
								cName = cName + '.' + ext;
								if(/\?name=/.test(item.msgContent.url)){
									word = <span>{`成功${item.msgContent.success}条，失败${item.msgContent.error}条，`}<a  href={`${window.cxt.fshost}/${item.msgContent.url}`}>{displayMsg}</a></span>;
								}else{
									if(model.fileName==null){
										word = <span>{`成功${item.msgContent.success}条，失败${item.msgContent.error}条，`}<a  href={`${window.cxt.fshost}/${item.msgContent.url}`}>{displayMsg}</a></span>;
									}else{
										word = <span>{`成功${item.msgContent.success}条，失败${item.msgContent.error}条，`}<a  href={`${window.cxt.fshost}/${item.msgContent.url}?name=${encodeURI(cName)}`}>{displayMsg}</a></span>;
									}
									
								}
							} else {
								word = <span>{`成功${item.msgContent.success}条，失败${item.msgContent.error}条，`}<a  href={`${window.cxt.fshost}/${item.msgContent.url}`}>{displayMsg}</a></span>;
							}
							break;
						case 2:
							if(item.msgContent.url){
								if(/\?name=/.test(item.msgContent.url)){
									word = <a  href={`${window.cxt.fshost}/${item.msgContent.url}`}>{displayMsg}</a>
								}else{
									if(model.fileName==null){
										word = <a  href={`${window.cxt.fshost}/${item.msgContent.url}`}>{displayMsg}</a>
									}else{
										word = <a  href={`${window.cxt.fshost}/${item.msgContent.url}?name=${encodeURI(model.fileName)}`}>{displayMsg}</a>
									}
									
								}
							} else {
								word = <a  href={`${window.cxt.fshost}/${item.msgContent.url}`}>{displayMsg}</a>
							}
							break;
						case 3:
							word = item.msgContent.msg;
							break;
						case 4:
							if(item.msgContent.url){
								if(/\?name=/.test(item.msgContent.url)){
									word = <a  href={`${window.cxt.fshost}/${item.msgContent.url}`}>{model.fileName}</a>
								}else{
									if(model.fileName==null){
										word = <a  href={`${window.cxt.fshost}/${item.msgContent.url}`}>{model.mqName}</a>
									}else{
										word = <a  href={`${window.cxt.fshost}/${item.msgContent.url}?name=${encodeURI(model.fileName)}`}>{model.fileName}</a>
									}
								}
							} else {
								word = <a class={style.disabled_link} href="javascript:void(0)">{model.fileName}</a>
							}
							break;
						} 
					}
				}
			}
		}
		return word;
	}
	openIframe(url){

	}
}
export default  connect((state)=>{	
	const {enums}=state;
	return {enums}
})(Message)