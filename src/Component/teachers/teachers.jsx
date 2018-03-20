import style from "../../style/teachers.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import PageNav from '../common/pagenav'
import AlertBoxSmall from '../win/alertboxsmall'
import AlertWin from "../win/alertwin"
import FormWin from "../win/formwin"
import { post, fileimport, exporttemplate,stampToTime,alert,eduValidForm } from "../common/pubfn"
import Form from "../common/form/form"
import Paging from "../common/paging/paging"
import requestpath from "../../datesource/requestpath"
import { SearchAnimate } from "../common/animate"

class Teachers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			isShowInfo: false,
			isShowEdit: false,
			isShowSt: false,
			isShowPasswdWin:false,
			sex:{
				p0:"女",p1:"男"
			},
			Status:{
				p1: "启用", p0: "停用"
			},
			ActivateStatus:{
				p0: "未发布", 
				p1: "已发布"
			},
			searchData: {
				"acadTermID": "383",
				"status": -1,
				"activatedStatus": -1,
				"userClassID":-1,
				"acadClasfID":-1
			},
			searchSource: [{
				width: 190,
				name: 'name',
				lable: '姓名',
				type: 200
			}, {
				width: 190,
				name: 'account',
				lable: '账号',
				type: 200
			}, {
				width: 190,
				name: "acadClasfID",
				lable: '所属年级',
				type: 202,
				source:"AcadClasf",					//无@eu取下拉接口数据作为数据源
				hasall:"全部",
				effect:["userClassID"]
			}, {
				width: 190,
				name: "userClassID",
				lable: '班级名称',
				type: 202,
				source:"UserClass",	
				hasall:"全部",
				paraname:{							//用于校验是否准备好
					id:"acadTermID",
					id1:"acadClasfID"
				}
			}, {
				width: 190,
				name: "status",
				lable: '账号状态',
				type: 202,
				source: "TeacherInfoStatus@eu",     //@eu取枚举数据作为数据源
				hasall:"全部"
			}, {
				width: 190,
				name: "activatedStatus",
				lable: '激活状态',
				type: 202,
				source: [
					{ value:"-1", name:"全部" },
					{ value:"1", name:"已激活" },
					{ value:"0", name:"未激活" }
				]
			}, {
				width: 190,
				name: "createDate",
				lable: '创建时间',
				type: 204
			}],
			teacherList: [],
			formSource: [{
				width: 200,
				name: "path",
				lable: '批量导入文件',
				star: false,
				placeholder: '',
				after: '',
				content: "",
				type: 218
			}],
			editFormSource:[{
				name: "account",
				lable: "账号",
				star: false,
				type: 205
			},{
				width:270,
				name:"name",
				lable:"姓名",
				star: false,
				maxLength:"15",
				vposition:"fixed",
				after:"",//0/15
				type:200
			},{
				name:"sex",
				lable:"性别",
				star: false,
				type:206,
				source:[
					{name:"男",value:"1"},
					{name:"女",value:"0"}
				]
			},{
				name:"phone",
				lable:"电话",
				validateType:"6",
				vposition:"fixed",
				star: false,
				type:200
			}],
			passWdForm:[{
				width:270,
				name:"password",
				lable:"新密码",
				star: false,
				maxLength:"6",
				vposition:"fixed",
				after:"",
				type:200
			}],
			passWdData:{

			},
			formshow: false,
			formData: {

			},
			teacherEditData:{

			},
			teacherInfo:{

			},
			teacherEdit:{

			},
			hideSearchOrNot:true,
			paging:{
				pageIndex:1,
				totalCount:0,
				pageSize:10,
				totalPage:0
			},
			searchShowOrHide:false
		}
	}
	componentDidMount() {
		// var {pageSize,pageIndex} = this.state.paging;
		// this.getList({data:this.state.searchData,pageSize:pageSize,pageIndex:pageIndex});
	}
	render() {
		var createInfoDate=stampToTime(this.state.teacherInfo.createDate);
		var infoSex=this.state.sex["p"+this.state.teacherInfo.sex];
		var infoStatus=this.state.ActivateStatus["p"+this.state.teacherInfo.activatedStatus];
		//[this.state.teacherInfo.sex]
		var {pageSize,pageIndex} = this.state.paging;
		var searchEle=(
			<SearchAnimate>
				<div 
					className={style.searchCondition} 					
					visible={this.state.hideSearchOrNot}
				>
					<Form 
						showType='search' 
						timeWidth='450px'
					padding='0 0 0 85px'
						formData={this.state.searchData} 
						formSource={this.state.searchSource} 
						onChange={this.getSearchVal.bind(this)}
						onSourceEffect={(source)=>this.setState({searchSource:source})}
						onInit={this.getList.bind(this,{data:Object.assign({},this.state.searchData),pageSize:pageSize,pageIndex:pageIndex})}
					/>
					<div 
						onClick={this.getList.bind(this,{data:Object.assign({},this.state.searchData),pageSize:pageSize,pageIndex:pageIndex})} 
						className={style.searchBtn}
					>搜索</div>
					<div className={style.searchUp_down}>
						<span className={style.angle_down} onClick={() => this.searchUp()}>
							<i className={this.state.hideSearchOrNot ? "fa fa-angle-up" : "fa fa-angle-down"}> </i>
						</span>
					</div>
				</div>
			</SearchAnimate>
		)
		return (
			<PageNav 
				firstClassTit="教师管理" 
				hasSelect="1"
				val = {this.state.searchData.acadTermID}
				onChange = {(val)=>this.getSearchVal({acadTermID:val},"acadTermID",val)}
			>
				{searchEle}
				<div className={style.searchUp} style={{display: this.state.searchShowOrHide?"block":"none"}}>
					<span className={style.searchUpText} onClick={() => this.searchUp()}>
						<i className={this.state.hideSearchOrNot ? "fa fa-angle-up" : "fa fa-angle-down"}> </i>
					</span>
				</div>
				<div className={style.listTitle}>
					<span className={style.listTitleName}>教师列表</span>
					<span>共<strong>{this.state.paging.totalCount}</strong>个教师</span>
					<span className={style.teacher_import_title}
						  onClick={this.teacherExportTemplate.bind(this)}
					> 下载导入模板</span>
					<span onClick={this.swFormShow.bind(this)} className={style.exportForm}><i className="fa fa-sign-out"> </i>批量导入</span>
					{/* <span className={style.exportForm}><i className="fa fa-upload"> </i>批量导出</span> */}
				</div>
				<div className={style.list_content}>
					<table>
						<thead>
							<tr>
								<th><span>序号</span></th>
								<th><span>帐号</span></th>
								<th><span>姓名</span></th>
								<th><span>学科</span></th>
								<th><span>性别</span></th>
								<th><span>身份</span></th>
								<th><span>状态</span></th>
								<th><span>激活时间</span></th>
								<th className={style.operation_title}><span>操作</span></th>
							</tr>
						</thead>
						<tbody>
							
							{
								this.state.teacherList.map((item, index) => {
									{
										var creatTime=stampToTime(item.activatedDate);
										var status=this.state.Status["p"+item.status];
										var elem="";
										item.status==0?elem="启用":elem="停用";
									}
									return (<tr key={index} index>
										<td>{index+1}</td>
										<td>{item.account}</td>
										<td>{item.name}</td>
										<td>{item.subjectNames}</td>
										<td>{this.state.sex["p"+item.sex]}</td>
										<td>{item.role}</td>
										<td>{status}</td>
										<td>{creatTime}</td>
										<td className={style.option}>
											<a href="javascript:void(0);"
												onClick={this.isShowOrNotInfo.bind(this,item)}
											>查看 </a>
											<a href="javascript:void(0);"
												onClick={this.editTeacherWin.bind(this,item)}
											>编辑 </a>
											<a href="javascript:void(0);"
											   onClick={() => this.isShowPasswd(item)}
											   className={style.operation}>修改密码</a>
											<a href="javascript:void(0);"
												onClick={this.isShowOrNotStop.bind(this,item)}
											>{elem} </a>
										</td>
									</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				<AlertWin
					width="900px"
					bgcolor="#ffffff"
					navTitle="查看教师详情"
					btnName="返回"
					bgColor="#3e91eb"
					isShow={this.state.isShowInfo}
					close={this.swTeacherWin.bind(this)}
					btnAct={this.swTeacherWin.bind(this)}
				>
					<div className={style.content_box}>
						<div className={style.personal_info}>
							<span className={style.info_name}>个人信息 </span>
							<ul className={style.info_detail}>
								<li>姓名：{this.state.teacherInfo.name} </li>
								<li>性别：{infoSex}</li>
								<li>账号：{this.state.teacherInfo.account}</li>
								<li>密码：{this.state.teacherInfo.password}</li>
								<li>状态：{infoStatus}</li>
								<li>电话：{this.state.teacherInfo.phone==null?"--":this.state.teacherInfo.phone}</li>
								<li>创建时间：{createInfoDate}</li>
							</ul>
						</div>
						{/*<div>
							<span className={style.info_name}>在校记录</span>
							<div className={style.school_record}>
								<table>
									<tbody>
										<tr className={style.list_head}>
											<th><span>序号</span></th>
											<th><span>学年</span></th>
											<th><span>所属年级</span></th>
											<th><span>所属班级</span></th>
											<th><span>教学学科</span></th>
											<th><span>班主任</span></th>
											<th><span>修改日期</span></th>
										</tr>
										<tr>
											<td>1</td>
											<td>2017-2018学年</td>
											<td>初中七年级</td>
											<td>七年级1班</td>
											<td>英语</td>
											<td>呵呵哒</td>
											<td>2017-09-01 12:00</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>*/}
					</div>
				</AlertWin>
				<FormWin
					width="900px"
					bgcolor="#ffffff"
					navTitle="编辑教师信息"
					isShow={this.state.isShowEdit}
					close={this.isShowOrNotEdit.bind(this)}
					formSource={this.state.editFormSource}
					onChange={this.getEditInfoVal.bind(this)}
					submit={this.editSubmit.bind(this)}
					formData={this.state.teacherEditData}
				/>
				<FormWin
					width="700px"
					bgcolor="#ffffff"
					navTitle="修改密码"
					isShow={this.state.isShowPasswdWin}
					close={this.isShowPasswd.bind(this)}
					formSource={this.state.passWdForm}
					onChange={this.getPassVal.bind(this)}
					submit={this.passSubmit.bind(this)}
					formData={this.state.passWdData}
				/>
				<AlertBoxSmall
					width="600px"
					height="250px"
					bgColor="#ffffff"
					contentMargin="90px 0 0 60px"
					alertText="确认重置T81588的密码吗？"
					btnSum="2"
					btnLeftName="关闭"
					btnRightName="确定"
					show={this.isShowOrNot.bind(this)}
					isShow={this.state.isShow}
				>
					<div className={style.reset_bg}>
					</div>
				</AlertBoxSmall>
				<AlertBoxSmall
					width="600px"
					height="250px"
					bgColor="#ffffff"
					contentMargin="80px 0 0 75px"
					alertText="确认停用账号吗？ "
					alertWarning="账号停用后不可以再启用， 如有问题请联系客服！"
					btnSum="2"
					btnLeftName="取消"
					btnRightName="确定"
					show={this.isShowOrNotStop.bind(this)}
					save={this.stopAccount.bind(this)}
					isShow={this.state.isShowSt}
				>
					<div className={style.stop_use_bg}>
					</div>
				</AlertBoxSmall>
				<FormWin
					navTitle="批量导入"
					isShow={this.state.formshow}
					formSource={this.state.formSource}
					formData={this.state.formData}
					close={this.swFormShow.bind(this)}
					submit={this.formSubmit.bind(this)}
					onChange={this.getVal.bind(this)}
					btnLeftName="取消"
					btnRightName="确定"
					paddingLeft='100px'
				/>
				<Paging 
					style={{marginBottom:25}}
					paging = {this.state.paging}
					onPageChange = {this.onPageChange.bind(this)}
				/>
			</PageNav>
		)
	}
	getVal(data,name, value) {
		this.setState({ formData: Object.assign({},this.state.formData, data) })
	}
	getEditInfoVal(data,name, value){
		this.setState({ teacherEditData: Object.assign({},this.state.teacherEditData, data) })
	}
	editSubmit(){
		var _self=this;
		var editInfo=_self.state.teacherEditData;
		var result = eduValidForm(_self.state.editFormSource,_self.state.teacherEditData);
		if (result.ispass){
			//var editId=_self.state.teacherEdit.id
			if (_self.props.authority.editteacher) {
				post(_self.props.authority.editteacher.sourceCode,
					{
						"data":{
							"id":editInfo.id,
							"sex":editInfo.sex,
							"phone":editInfo.phone,
							"name":editInfo.name
						}

					}
				).then(function (json) {
					if(json.code==1){
						alert(json.message);
						var {pageSize,pageIndex} = _self.state.paging;
						_self.getList({data:Object.assign({},_self.state.searchData),pageSize:pageSize,pageIndex:pageIndex});
					}else{
						alert(json.message);
					}
				})
			}
		}
	}
	isShowOrNot() {
		this.setState({ isShow: !this.state.isShow })
	}
	editTeacherWin(edit) {
		var _self=this;
		//_self.setState({ teacherEdit: Object.assign({},_self.state.teacherEdit,edit) })
		_self.setState({ 
			teacherEditData: Object.assign({},_self.state.teacherEditData,edit),
			isShowEdit: !_self.state.isShowEdit 
		})
	}
	swFormShow() {
		this.setState({ formshow: !this.state.formshow })
	}
	isShowOrNotStop(edit) {
		this.setState({ teacherEdit: Object.assign({},this.state.teacherEdit,edit) })
		this.swStopWin();
		//_self.setState({ isShowSt: !_self.state.isShowSt })
	}
	swStopWin(){
		this.setState({ isShowSt: !this.state.isShowSt })
	}
	isShowOrNotInfo(item){
		var _self=this;
		if (_self.props.authority.getinfo) {
			post(_self.props.authority.getinfo.sourceCode,
				{
					data: item.id
				}
			).then(function (json) {
				//_self.setState({teacherInfo:json.data});
				_self.setState({ teacherInfo: Object.assign({},_self.state.teacherInfo, json.data) })
			})
		}
		_self.setState({ isShowInfo: !_self.state.isShowInfo})
	}
	getSearchVal(data,name, id) {
		var _self=this;
		var searchinfo = Object.assign({},this.state.searchData,data);
		this.setState({searchData:searchinfo});
		//var searchSource = _self.state.searchSource.slice();
		if(name=="acadTermID"){
			var searchSource = _self.state.searchSource.slice();
			searchSource.map(function(item,index){
				if(item.name=="userClassID"){
					var para = {};
					if(!item.para){
						para={}
					}else{						
						para = Object.assign({},item.para);
					}
					para.id=id;
					item.para=para;
				}
			})
			_self.setState({searchSource:searchSource});
		}
	}
	formSubmit() {
		var para = {
			path:this.state.formData.path.url,
			pathName:this.state.formData.path.name
		};
		fileimport(this.props.authority.teacherimport.sourceCode, Object.assign({},para,{termId:this.state.searchData.acadTermID})).then(function (json) {
			if(json.code == 1){
				alert("导入成功");
			}
		})
	}
	getList(para) {
		var _self=this;
		if(para.data.createDate!=undefined){
			para.data.searchStartDate=para.data.createDate[0];
			para.data.searchEndDate=para.data.createDate[1];
			delete para.data.createDate;
		}
		if (this.props.authority.getlist) {
			post(this.props.authority.getlist.sourceCode,para).then(function(json){
				_self.setState({
					teacherList:json.items,
					paging:{
						pageIndex:para.pageIndex,
						totalCount:json.totalCount,
						pageSize:para.pageSize
				}});
				_self.setState({teacherList:json.items});
			}).catch(function(){
				
			})  
		}
	}
	swTeacherWin(){
		this.setState({ isShowInfo: !this.state.isShowInfo })
	}
	isShowOrNotEdit(){
		this.setState({ isShowEdit: !this.state.isShowEdit })
	}
	searchUp() {
		this.setState({ hideSearchOrNot: !this.state.hideSearchOrNot,searchShowOrHide:!this.state.searchShowOrHide});
	}
	stopAccount(){
		var _self=this;
		var edit = this.state.teacherEdit;
		var editStatus;
		if(edit.status==0){
			editStatus=1;
		}else if(edit.status==1){
			editStatus=0
		}
		if (_self.props.authority.editteacher) {
			post(_self.props.authority.setstatus.sourceCode,
				{
					"data":{
						"id":edit.id,
						"status":editStatus
					}

				}
			).then(function (json) {
				_self.swStopWin();
				if(json.code==1){
					alert(json.message);				
					var {pageSize,pageIndex} = _self.state.paging;
					_self.getList({data:_self.state.searchData,pageSize:pageSize,pageIndex:pageIndex});
				}else{
					alert(json.message);
				}
			})
		}
	}
	onPageChange(pageIndex,pageSize){
		this.getList({data:this.state.searchData,pageSize:pageSize,pageIndex:pageIndex});
	}
	/*修改密码*/
	isShowPasswd(item){
		var _self=this;
		_self.setState({
			passWdData: Object.assign({},_self.state.passWdData,item),
			isShowPasswdWin: !_self.state.isShowPasswdWin
		});
	}
	getPassVal(data,name, value){
		this.setState({passWdData: Object.assign({},this.state.passWdData, data) })
	}
	passSubmit(){
		var _self=this;
		var passInfo=_self.state.passWdData;
		var result = eduValidForm(_self.state.passWdForm,_self.state.passWdData);
		if (result.ispass){
			if (_self.props.authority.changePassWd) {
				post(_self.props.authority.changePassWd.sourceCode,
					{
						"data":{
							"id":passInfo.id,
							"password":passInfo.password
						}
					}
				).then(function (json) {
					if(json.code==1){
						alert(json.message);
					}else{
						alert(json.message);
					}
				})
			}
		}
	}
	//下载模板
	teacherExportTemplate(){
		var _self = this;
		if(this.props.authority.teachertemplatedownload){
			exporttemplate(this.props.authority.teachertemplatedownload.sourceCode).then(function(json){
				if(json.code==1) {
					alert("模板下载成功");
				}
			})
		}
	}
}

export default Teachers