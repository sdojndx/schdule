import style from "../../style/students.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import FormWin from "../win/formwin"
import { post, fileimport, exporttemplate,stampToTime,alert,eduValidForm } from "../common/pubfn"
import AlertBoxSmall from '../win/alertboxsmall'
import AlertWin from "../win/alertwin"
import Form from "../common/form/form"
import Paging from "../common/paging/paging"
import PageNav from '../common/pagenav'
import requestpath from "../../datesource/requestpath"
import { SearchAnimate } from "../common/animate"



class Students extends Component {

	constructor(props) {
		super(props);
		this.state = {
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
				p0: "未发布", p1: "已发布"
			},
			searchData: {
				"acadTermId":"383",
				"accountStatus":-1,
				"activateStatus":-1,
				"name":"",
				"classificationID":"-1",
				"classId":"-1",
				"createDate":["2018-01-02","2018-02-28"]
			},
			studentLists: [

			],
			stuInfo: {

			},
			formShow: false,
			searchSource: [{
				width: '190px',
				name: 'name',
				lable: '姓名',
				star: false,
				placeholder: '',
				type: 200
			}, {
				width: '190px',
				name: 'account',
				lable: '账号',
				star: false,
				type: 200
			}, {
				width: 190,
				name: "classificationID",
				lable: '所属年级',
				star: false,
				type: 202,
				source:"AcadClasf",    //无@eu取下拉接口数据作为数据源
				hasall:"全部",
				effect:["classId"]
			}, {
				width: 190,
				name: "classId",
				lable: '班级名称',
				star: false,
				type: 202,
				source:"UserClass",
				hasall:"全部",
				paraname:{					//用于校验是否准备好
					id:"acadTermId",
					id1:"classificationID"
				}
			}, {
				width: 190,
				name: "accountStatus",
				lable: '账号状态',
				star: false,
				type: 202,
				source: "TeacherInfoStatus@eu",
				hasall:"全部"
			}, {
				width: 190,
				name: "activateStatus",
				lable: '激活状态',
				star: false,
				type: 202,
				source: [
					{ value:"-1", name:"全部" },
					{ value:"1", name:"已激活" },
					{ value:"0", name:"未激活" }
				]
			}, {
				name: "createDate",
				lable: '创建时间',
				star: false,
				type: 204
			}],
			formSource: [{
				width: '200px',
				name: "path",
				lable: '批量导入文件',
				star: false,
				placeholder: '',
				after: '',
				content: "",
				type: 218
			}],
			formData: {

			},
			studentFormSource:[{
				name: "account",
				lable: "账号",
				star: false,
				content: "",
				type: 205
			},{
				width:270,
				name:"name",
				lable:"姓名",
				star: false,
				maxLength:"15",
				vposition:"fixed",
				after:"", //0/15
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
				name:"isInSchool",
				lable:"是否在校",
				star: false,
				type:206,
				source:[
					{name:"是",value:true},
					{name:"否",value:false}
				]
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
			editStudentData:{

			},
			studentEdit:{

			},
			passWdData:{

			},
			hideSearchOrNot:true,
			paging:{
				pageIndex:1,
				totalCount:0,
				pageSize:10,
				totalPage:0
			},
			searchShowOrHide:false,
		};
	}

	componentDidMount() {
		//var {pageSize,pageIndex} = this.state.paging;
		//this.getStudentList({data:this.state.searchData,pageSize:pageSize,pageIndex:pageIndex});
	}

	render() {
		var createInfoDate=stampToTime(this.state.stuInfo.createDate);
		var creatTime=stampToTime(this.state.stuInfo.activatedDate);
		var infoSex=this.state.sex["p"+this.state.stuInfo.sex];
		var {pageSize,pageIndex} = this.state.paging;
		var searchEle=(
			<SearchAnimate>	
				<div
					visible={this.state.hideSearchOrNot}
					className={style.searchCondition}
				>
					<Form 
						showType='search' 
						timeWidth='450px'
						padding='0 0 0 85px'
						formData={this.state.searchData} 
						formSource={this.state.searchSource}
						onChange={this.getSearchVal.bind(this)}
						onSourceEffect={(source)=>this.setState({searchSource:source})}
						onInit={this.getStudentList.bind(this,{data:Object.assign({},this.state.searchData),pageSize:pageSize,pageIndex:pageIndex})}
					/>
					<div onClick={this.getStudentList.bind(this,{data:Object.assign({},this.state.searchData),pageSize:pageSize,pageIndex:pageIndex})}
						 className={style.searchBtn}>搜索</div>
					<div className={style.searchUp_down}>
						<span className={style.angle_down} onClick={() => this.searchUp()}>
							<i className="fa fa-angle-up"> </i>
						</span>
					</div>
				</div>
			</SearchAnimate>
			)
		return (
			<PageNav
				firstClassTit="学生管理"
				hasSelect="1"
				val = {this.state.searchData.acadTermId}
				onChange = {(val)=>this.getSearchVal({acadTermId:val},"acadTermId",val)}
			>
				{searchEle}
				<div className={style.searchUp} style={{display: this.state.searchShowOrHide?"block":"none"}}>
					<span className={style.searchUpText} onClick={() => this.searchUp()}>
						<i className="fa fa-angle-down"> </i>
					</span>
				</div>

				<div className={style.listTitle}>
					<span className={style.listTitleName}>学生列表</span>
					<span>共<strong>{this.state.paging.totalCount}</strong>个学生</span>
					<span className={style.student_import_title}
						onClick={this.StudentExportTemplate.bind(this)}
					> 下载导入模板</span>
					<span onClick={this.swFormShow.bind(this)} className={style.exportForm}><i className="fa fa-sign-out"> </i>批量导入</span>
				</div>
				<div className={style.list_content}>
					<table>
						<thead>
							<tr>
								<th><span>序号</span></th>
								<th><span>姓名</span></th>
								<th><span>性别</span></th>
								<th><span>帐号</span></th>
								<th><span>学籍号</span></th>
								{/*<th><span>ID号</span></th>*/}
								<th><span>年级</span></th>
								<th><span>班级名称</span></th>
								<th><span>校区</span></th>
								<th><span>状态</span></th>
								<th className={style.operation_title}><span>操作</span></th>
							</tr>
						</thead>
						<tbody>
						{
							this.state.studentLists.map((item, index) => {
								{
									var status=this.state.Status["p"+item.status]
									var elem="";
									item.status==0?elem="启用":elem="停用";
								}
								return (<tr key={index} index>
										<td>{index + 1}</td>
										<td>{item.name}</td>
										<td>{this.state.sex["p"+item.sex]}</td>
										<td>{item.account}</td>
										<td>{item.studentCode}</td>
										{/*<td>{item.id}</td>*/}
										<td>{item.classificationName}</td>
										<td>{item.className}</td>
										<td>{item.areaName}</td>
										<td>{status}</td>
										<td className={style.option}>
											<a href="javascript:void(0);"
											   onClick={() =>this.isShowOrNotInfo(item)}
											   className={style.operation}>查看</a>
											<a href="javascript:void(0);"
											   onClick={() => this.editStudentWin(item)}
											   className={style.operation}>编辑</a>
											<a href="javascript:void(0);"
											   onClick={() => this.isShowPasswd(item)}
											   className={style.operation}>修改密码</a>
											<a href="javascript:void(0);"
											   className={style.operation}
											   onClick={() => this.isShowOrNotStop(item)}>{elem}</a>
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
					navTitle="查看学生详情"
					btnName="返回"
					bgColor="#3e91eb"
					close={this.swStudentWin.bind(this)}
					btnAct={this.swStudentWin.bind(this)}
					isShow={this.state.isShowInfo}
				>
					<div className={style.content_box}>
						<div className={style.personal_info}>
							<span className={style.info_name}>个人信息 </span>
							<ul className={style.info_detail}>
								<li>姓名：{this.state.stuInfo.name||"--"} </li>
								<li>性别：{infoSex||"--"}</li>
								<li>账号：{this.state.stuInfo.account||"--"}</li>
								<li>密码：{this.state.stuInfo.password||"--"}</li>
								<li>学籍号：{this.state.stuInfo.studentCode||"--"}</li>
								<li>校区：{this.state.stuInfo.areaName||"--"}</li>
								<li>创建时间：{createInfoDate||"--"}</li>
								<li>激活时间：{creatTime||"--"}</li>
							</ul>
						</div>
					</div>
				</AlertWin>
				<FormWin
					width="900px"
					bgcolor="#ffffff"
					navTitle="编辑学生信息"
					isShow={this.state.isShowEdit}
					close={this.isShowOrNotEdit.bind(this)}
					formSource={this.state.studentFormSource}
					onChange={this.getEditVal.bind(this)}
					submit={this.editSubmit.bind(this)}
					formData={this.state.editStudentData}
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
					contentMargin="80px 0 0 75px"
					alertText={this.state.searchData.name}
					alertWarning="账号停用后不可以再启用， 如有问题请联系客服！"
					btnSum="2"
					btnLeftName="取消"
					btnRightName="确定"
					show={this.isShowOrNotStop.bind(this)}
					isShow={this.state.isShowSt}
					save={this.stopAccount.bind(this,this.state.studentEdit)}
				>
					<div className={style.stop_use_bg}>
					</div>
				</AlertBoxSmall>
				<FormWin
					navTitle="批量导入"
					isShow={this.state.formShow}
					formSource={this.state.formSource}
					formData={this.state.formData}
					close={this.swFormShow.bind(this)}
					submit={this.formSubmit.bind(this)}
					onChange={this.getVal.bind(this)}
					btnLeftName="取消"
					btnRightName="确定"
					paddingLeft='100px'
				>
				</FormWin>
				<Paging
					style={{marginBottom:25}}
					paging = {this.state.paging}
					onPageChange = {this.onPageChange.bind(this)}
				/>
			</PageNav>
		)
	}

	getEditVal(data,name, value) {
		if(name=="isInSchool"){
			data.isInSchool = data.isInSchool=="true";
		}
		this.setState({editStudentData: Object.assign({},this.state.editStudentData, data) })
	}
	swFormShow() {
		this.setState({formShow: !this.state.formShow })
	}
	formSubmit() {
		var para = {
			path:this.state.formData.path.url,
			pathName:this.state.formData.path.name
		};
		fileimport(this.props.authority.studentImport.sourceCode, Object.assign({},para,{termId:this.state.searchData.acadTermId})).then(function (json) {
			if(json.code == 1){
				alert("导入成功");
			}
		})
	}
	getSearchVal(data,name,id) {
		var _self=this;
		var searchinfo = Object.assign({},this.state.searchData,data);
		this.setState({searchData:searchinfo});
		var searchSource = _self.state.searchSource.slice();
		//学年学期和所属年级影响班级选项,级联特殊处理
		if(name=="acadTermId"){
			searchSource.map(function(item,index){
				if(item.name=="classId"){
					var para = {};
					if(!item.para){
						para={}
					}else{						
						para = Object.assign({},item.para);
					}
					para.id=id;
					item.para=para;
				}
			});
			_self.setState({searchSource:searchSource});
		}
	}
	getVal(data,name, value) {
		this.setState({ formData: Object.assign({},this.state.formData, data) })
	}
	//学生列表
	getStudentList(para) {
		var _self = this;
		if(para.data.createDate!=undefined){
			para.data.beginDate=para.data.createDate[0];
			para.data.endDate=para.data.createDate[1];
			delete para.data.createDate;
		}
		if (this.props.authority.getlist) {
			post(this.props.authority.getlist.sourceCode,para).then(function(json){
				_self.setState({
					studentLists:json.items,
					paging:{
						pageIndex:para.pageIndex,
						totalCount:json.totalCount,
						pageSize:para.pageSize
				}});
				_self.setState({studentLists:json.items});
			}).catch(function(){

			});
		}
	}
	//查看学生详情
	isShowOrNotInfo(item) {
		var _self=this;
		var id = _self.state.searchData.acadTermId;
		if (_self.props.authority.getinfo) {
			post(_self.props.authority.getinfo.sourceCode,
				{
					"data":{
						"acadTermID":id,
						"studentID":item.id
					}
				}
			).then(function (json) {
				_self.setState({stuInfo: Object.assign({},_self.state.stuInfo, json.data) });
			})
		}
		_self.setState({ isShowInfo: !_self.state.isShowInfo})
	}
	swStudentWin(){
		this.setState({ isShowInfo: !this.state.isShowInfo })
	}
	//编辑学生
	isShowOrNotEdit() {
		var _self=this;
		_self.setState({ isShowEdit: !_self.state.isShowEdit});
	}
	editStudentWin(edit){
		var _self=this;
		_self.setState({
			editStudentData: Object.assign({},_self.state.editStudentData,edit),
			isShowEdit: !_self.state.isShowEdit
		});
	}
	editSubmit(){
		var _self=this;
		var editInfo=_self.state.editStudentData;
		//eduValidForm
		var result = eduValidForm(_self.state.studentFormSource,_self.state.editStudentData);
		if (result.ispass){
			if (_self.props.authority.editstudent) {
				post(_self.props.authority.editstudent.sourceCode,
					{
						"data":{
							"id":editInfo.id,
							"name":editInfo.name,
							"sex":editInfo.sex,
							"isInSchool":editInfo.isInSchool
						}
					}
				).then(function (json) {
					if(json.code==1){
						alert(json.message);
						var {pageSize,pageIndex} = _self.state.paging;
						_self.getStudentList({data:Object.assign({},_self.state.searchData),pageSize:pageSize,pageIndex:pageIndex});
					}else{
						alert(json.message);
					}
				})
			}
		}
	}

	//停用学生
	isShowOrNotStop(edit) {
		this.setState({ studentEdit: Object.assign({},this.state.studentEdit,edit)});
		this.swStopWin()
	}
	swStopWin(){
		this.setState({ isShowSt: !this.state.isShowSt });
	}
	stopAccount(edit){
		var _self=this;
		var editStatus;
		if(edit.status==0){
			editStatus=1;
		}else if(edit.status==1){
			editStatus=0
		}
		if (_self.props.authority.setstatus) {
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
					alert(json.message)
					var {pageSize,pageIndex} = _self.state.paging;
					_self.getStudentList({data:_self.state.searchData,pageSize:pageSize,pageIndex:pageIndex});
				}else{
					alert(json.message)
				}
			})
		}

	}
	//展开关闭搜索
	searchUp() {
		this.setState({ hideSearchOrNot: !this.state.hideSearchOrNot,searchShowOrHide:!this.state.searchShowOrHide});
	}
	onPageChange(pageIndex,pageSize){
		this.getStudentList({data:this.state.searchData,pageSize:pageSize,pageIndex:pageIndex});
	}
	/*重置密码*/
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
	StudentExportTemplate(){
		var _self = this;
		if(this.props.authority.studenttemplatedownload){
			exporttemplate(this.props.authority.studenttemplatedownload.sourceCode).then(function(json){
				if(json.code==1) {
					alert("模板下载成功！");
				}
			})
		}
	}
}

export default Students