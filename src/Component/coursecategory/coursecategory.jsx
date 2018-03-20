import style from "../../style/coursecategory.scss"
import React, { Component } from "react"
import { Link } from "react-router"
import { post, stampToTime,alert,eduValidForm } from "../common/pubfn"
import PageNav from "../common/pagenav"
import Buttons from "../common/buttons"
import AlertBoxSmall from "../win/alertboxsmall"
import AlertWin from "../win/alertwin"
import Form from "../common/form/form"
import FormWin from "../win/formwin"
import Paging from "../common/paging/paging"
import SchoolTime from "../schooltime/schooltimetable"

class CourseCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			isShowDe: false,
			isShowAdd: false,
			isShowEdit:false,
			isShowStart:false,
			timeSet:false,
			isTimeClick:false,
			Status:{
				p0: "停用", p1: "启用"
			},
			paging:{
				pageIndex:1,
				totalCount:0,
				pageSize:10,
				totalPage:0
			},
			addCourseFormSource:[{
				name: "courseTypeName",
				lable: "课程类别名称",
				width:"270px",
				content: "",
				star: true,
				after: "",
				type: 200,
				vposition:"fixed"
			},{
				name: "",
				lable:"课时设置",
				width:"",
				content: "",
				star:false,
				after: "",
				type: 207
			}],
			addCourseData:{

			},
			addCourseShowData:{

			},
			addCourse:{

			},
			editCourseFormSource:[

			],
			editCourseData:{

			},
			editDatas:{},
			courseLists:[

			],
			classList:[]
		};
	}
	componentDidMount() {
		var {pageSize,pageIndex} = this.state.paging;
		this.initAddFormSource();
		this.getCourseList({pageSize,pageIndex});
	}

	render() {
		return (
			<PageNav firstClassTit="课程类别">
				<div className={style.course_explain}>
					<span className={style.explain_left}>课程类别列表 </span>
					表中的课时数是指学校规定的每个年级每一类课程的周课时数
					<span className={style.explain_right}>
						共<i>{this.state.paging.totalCount}</i>个课程类别
						<Buttons
							style={{width:"174px",height:"36",backgroundColor:"#1a88ff",marginLeft:"20px"}}
							btnName="+ 添加课程类别"
							onClick={this.isShowOrNotAdd.bind(this)}
						/>
					</span>
				</div>
				<div className={style.list_content}>
					<table>
						<thead>
							<tr>
								<th><span>序号</span></th>
								<th><span>课程类别</span></th>
								<th><span>初中七年级</span></th>
								<th><span>初中八年级</span></th>
								<th><span>初中九年级</span></th>
								<th><span>高中一年级</span></th>
								<th><span>高中二年级</span></th>
								<th><span>高中三年级</span></th>
								<th className={style.operation_title}><span>操作</span></th>
							</tr>
						</thead>
						<tbody>
						{
							this.state.courseLists.map((item, index) => {
								{
									var status=this.state.Status["p"+item.status];
									var StartOrStop = "";
									var IsDelete = "";
									if(status == "启用"){
										StartOrStop = (
											<a href="javascript:void(0);"
											   onClick={() => this.isShowOrNot(item)} className={style.operation}>停用</a>
										);
										IsDelete = (
											<a href="javascript:void(0);"
											   onClick={() => this.isShowOrNotDe(item)} className={style.operation}>删除</a>
										)
									}else{
										StartOrStop = (
											<a href="javascript:void(0);"
											   onClick={() => this.isShowOrNotStart(item)} className={style.operation}>启用</a>
										);
										IsDelete = (
											<a href="javascript:void(0);"
											   className={style.is_delete}>删除</a>
										)
									}
									var elem1= "", elem2="", elem3="",elem4="",elem5="",elem6="";
									var clasfInfo = [];
									if(item.clasfID_Name_Credit == null){
										clasfInfo = []
									}else{
										clasfInfo = item.clasfID_Name_Credit.slice();
										clasfInfo.map(function(item,index){
											if(clasfInfo[index].clasfID=="17"){
												elem4=clasfInfo[index].credit
											}else if(clasfInfo[index].clasfID=="13"){
												elem1=clasfInfo[index].credit
											}else if(clasfInfo[index].clasfID=="14"){
												elem2=clasfInfo[index].credit
											}else if(clasfInfo[index].clasfID=="15"){
												elem3=clasfInfo[index].credit
											}else if(clasfInfo[index].clasfID=="18"){
												elem5=clasfInfo[index].credit
											}else if(clasfInfo[index].clasfID=="19"){
												elem6=clasfInfo[index].credit
											}
										});
									}
								}
								return (<tr key={index} index>
										<td>{index + 1}</td>
										<td>{item.courseTypeName}</td>
										<td onClick={(e)=> this.isShowTime(e)}>{elem1}</td>
										<td onClick={(e)=> this.isShowTime(e)}>{elem2}</td>
										<td onClick={(e)=> this.isShowTime(e)}>{elem3}</td>
										<td onClick={(e)=> this.isShowTime(e)}>{elem4}</td>
										<td onClick={(e)=> this.isShowTime(e)}>{elem5}</td>
										<td onClick={(e)=> this.isShowTime(e)}>{elem6}</td>
										{/*<td> </td>*/}
										<td className={style.option}>
											<a href="javascript:void(0);"
											   onClick={()=> this.editWin(item)}
											>
												修改
											</a>
											{IsDelete}
											{StartOrStop}
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
					navTitle="周课时设置"
					btnLeftName="取消"
					btnRightName="保存"
					submit ={this.updateTime.bind(this,this.state.classList)}
					isShow={this.state.timeSet}
					close={this.timeSetShow.bind(this)}
				>
					<div className={style.to_set}style={{display:this.state.classList.length>0?"none":"block"}}>
						<div className={style.set_white}> </div>
						<div className={style.set_text}>
							根据学校的情况，去上课时间设置节次及时间哦~
						</div>
					</div>
					<div className={style.time_table} style={{display:this.state.classList.length>0?"block":"none"}}>
						<SchoolTime
							classList={this.state.classList}
							isTimeClick={this.state.isTimeClick}
						/>
					</div>
					<div className={style.prompt_msg} style={{display:this.state.classList.length>0?"block":"none"}}>
						温馨提示：<span className={style.on_class}></span>代表上课，<span className={style.off_class}></span>代表不上课，单击具体节次可切换是否上课！
					</div>
				</AlertWin>
				<FormWin
					width="900px"
					bgcolor="#ffffff"
					navTitle="新增课程类别"
					paddingLeft="40px"
					showType="edit"
					isShow={this.state.isShowAdd}
					close={this.isShowOrNotAdd.bind(this)}
					formSource={this.state.addCourseFormSource}
					onChange={this.getAddVal.bind(this)}
					submit={this.addSubmit.bind(this)}
					formData={this.state.addCourseShowData}
				/>
				<FormWin
					width="900px"
					bgcolor="#ffffff"
					navTitle="编辑课程类别"
					paddingLeft="40px"
					showType="edit"
					isShow={this.state.isShowEdit}
					close={this.isShowOrNotEdit.bind(this)}
					formSource={this.state.editCourseFormSource}
					onChange={this.getEditVal.bind(this)}
					submit={this.editSubmit.bind(this)}
					formData={this.state.editCourseData}
				/>
				<AlertBoxSmall
					width="600px"
					height="250px"
					bgColor="#ffffff"
					contentMargin="90px 0 45px 55px"
					alertText="确认删除吗？"
					btnLeftName="取消"
					btnRightName="确定"
					btnSum="2"
					show={this.isShowOrNotDe.bind(this)}
					isShow={this.state.isShowDe}
					save={this.deleteCourse.bind(this,this.state.editCourseData)}
				>
					<div className={style.delete_bg}>
					</div>
				</AlertBoxSmall>
				<AlertBoxSmall
					width="600px"
					height="250px"
					bgColor="#ffffff"
					contentMargin="77px 0 80px 45px"
					alertText="确认停用吗？"
					btnSum="2"
					btnLeftName="取消"
					btnRightName="确定"
					notice="温馨提示：停用后将不能再被引用！"
					show={this.isShowOrNot.bind(this)}
					isShow={this.state.isShow}
					save={this.stopCourse.bind(this,this.state.editCourseData)}
				>
					<div className={style.stop_bg}>
					</div>
				</AlertBoxSmall>
				<AlertBoxSmall
					width="600px"
					height="250px"
					bgColor="#ffffff"
					contentMargin="77px 0 80px 45px"
					alertText="确认启用吗？"
					btnSum="2"
					btnLeftName="取消"
					btnRightName="确定"
					notice=""
					show={this.isShowOrNotStart.bind(this)}
					isShow={this.state.isShowStart}
					save={this.startCourse.bind(this,this.state.editCourseData)}
				>
					<div className={style.start_bg}>
					</div>
				</AlertBoxSmall>

				<Paging
					style={{marginBottom:25}}
					paging = {this.state.paging}
					onPageChange = {this.onPageChange.bind(this)}
				/>
			</PageNav>
		)
	}


	//初始化添加表单
	initAddFormSource(){
		var _self=this;
		if(this.props.authority.urlGet){
			post(this.props.authority.urlGet.sourceCode,{"data": ""})
				.then(function(json){
					if(json.code == 1){
						var dataInfo = json.data;
						var addFormSource = _self.state.addCourseFormSource.slice();
						var len = dataInfo.length;
						for(var i=0;i<len;i++){
							addFormSource.push({
								name: dataInfo[i].clasfID,
								lable: dataInfo[i].clasfName,
								width: "80px",
								content: "",
								star: false,
								validateType:"2",
								vposition:"fixed",
								after: "课时",
								type: 200
							});
						}
					}
					_self.setState({
						addCourseFormSource:addFormSource,
						addCourseData:dataInfo
					});
				})
		}
	}
	//获取列表
	getCourseList(para){
		var _self =this;
		if(this.props.authority.urlList){
			post(this.props.authority.urlList.sourceCode,para)
			.then(function(json){
				_self.setState({
					'courseLists': json.items,
					'paging':{
						pageIndex:para.pageIndex,
						totalCount:json.totalCount,
						pageSize:para.pageSize
				}});
			})
		}
	}
	onPageChange(pageIndex,pageSize){
		this.getCourseList({pageSize:pageSize,pageIndex:pageIndex});  //data
	}
	//添加
	getAddVal(data,name,value,e){
		var adddata = this.state.addCourseData.slice();
		adddata.map(function(item,index){
			if(item.clasfID==name){
				var obj = Object.assign({},item);
				obj.credit=value;
				adddata[index]=obj;
			}
		});
		this.setState({
			addCourseData:adddata,
			addCourseShowData:Object.assign({},this.state.addCourseShowData,data)
		});
	}
	isShowOrNotAdd() {
		this.setState({ isShowAdd: !this.state.isShowAdd });
	}
	addSubmit(){
		var _self=this;
		var addShow=_self.state.addCourseShowData;
		//eduValidForm
		var result = eduValidForm(_self.state.addCourseFormSource,_self.state.addCourseShowData);
		if(result.ispass){
			var addInfo=_self.state.addCourseData.slice();
			var addName=addShow.courseTypeName;
			if(this.props.authority.urlAdd){
				post(this.props.authority.urlAdd.sourceCode,{
					"data":{
						"clasfID_Name_Credit": addInfo,
						"courseTypeName":addName,
						"id":""
					}
				}).then(function (json) {
					if(json.code == 1){
						if(json.message == ""){
							alert("课程类别添加成功");
						}
						var {pageSize,pageIndex} = _self.state.paging;
						_self.getCourseList({pageSize:pageSize,pageIndex:pageIndex});
						_self.setState({addCourseShowData:Object.assign({})})
					}else{
						alert(json.message);
					}
				})
			}
		}
	}
	//编辑
	isShowOrNotEdit(){
		this.setState({ isShowEdit: !this.state.isShowEdit});
	}
	getEditVal(data,name,value){
		this.setState({editCourseData: Object.assign({},this.state.editCourseData,data)});
	}
	editWin(edit){
		var _self=this;
		var data = [];
		if(edit.clasfID_Name_Credit==null){
			data = [];
		}else{
			data = edit.clasfID_Name_Credit.slice();
		}
		var datas =this.state.editDatas;
		data.map(function(item,index){
			datas[item.clasfID]=item.credit;
		});
		_self.setState({
			editCourseData: Object.assign(datas,_self.state.editCourseData,edit),
			isShowEdit: !_self.state.isShowEdit
		});
		this.editCourseFormSource(edit);
	}
	editCourseFormSource(edit){
		var _self = this;
		var editFormSource =[
			{
				name: "courseTypeName",
				lable: "课程类别名称",
				width:"270px",
				content: "",
				star: true,
				after: "",
				type: 200,
				vposition:"fixed"
			},{
				name: "",
				lable:"课时设置",
				width:"",
				content: "",
				star:false,
				after: "",
				type: 207
			}];
		if(edit.clasfID_Name_Credit){
			var len = edit.clasfID_Name_Credit.length;
			for(var i=0;i<len;i++){
				editFormSource.push({
					name: edit.clasfID_Name_Credit[i].clasfID,
					lable: edit.clasfID_Name_Credit[i].clasfName,
					width: "80px",
					content: "",
					star: false,
					validateType:"2",
					vposition:"fixed",
					after: "课时",
					type: 200
				});
			}
		}
		_self.setState({editCourseFormSource:editFormSource});
	}
	editSubmit(){
		var _self = this;
		var editInfo =_self.state.editCourseData;
		var clasfIDCredit = [];
		if(editInfo.clasfID_Name_Credit == null){
			clasfIDCredit = []
		}else{
			clasfIDCredit = editInfo.clasfID_Name_Credit.slice();
		}
		for(var key in editInfo){
			clasfIDCredit.map(function(item,index){
				if(clasfIDCredit[index].clasfID == key){
					clasfIDCredit[index].credit = editInfo[key]
				}
			});
		}
		var result = eduValidForm(_self.state.editCourseFormSource,_self.state.editCourseData);
		if(result.ispass){
			if(this.props.authority.urlEdit){
				post(this.props.authority.urlEdit.sourceCode,{
					"data":{
						"clasfID_Name_Credit":editInfo.clasfID_Name_Credit,
						"courseTypeName":editInfo.courseTypeName,
						"id":editInfo.id
					}
				}).then(function(json){
					if(json.code==0){
						alert(json.message);
						var {pageSize,pageIndex} = _self.state.paging;
						_self.getCourseList({pageSize:pageSize,pageIndex:pageIndex});
					}else if(json.code == 1){
						if(json.message == ""){
							alert("课时修改成功");
						}
						var {pageSize,pageIndex} = _self.state.paging;
						_self.getCourseList({pageSize:pageSize,pageIndex:pageIndex});
					}
				})
			}
			_self.setState({editCourseData:Object.assign({})});
		}
	}
	//停用
	isShowOrNot(edit) {
		this.setState({editCourseData: Object.assign({},this.state.editCourseData,edit)});
		this.StopWin();
	}
	StopWin(){
		this.setState({ isShow: !this.state.isShow });
	}
	stopCourse(edit){
		var _self=this;
		if(this.props.authority.urlStop){
			post(this.props.authority.urlStop.sourceCode,{
				"data":[edit.id]
			}).then(function(json){
				_self.StopWin();
				if(json.code == 0){
					alert(json.message);
				}else if(json.code == 1){
					if(json.message == ""){
						alert("课程类别停用成功");
					}
					var {pageSize,pageIndex} = _self.state.paging;
					_self.getCourseList({pageSize:pageSize,pageIndex:pageIndex});
				}
			})
		}
	}
	//启用
	isShowOrNotStart(edit){
		this.setState({editCourseData: Object.assign({},this.state.editCourseData,edit)});
		this.StartWin();
	}
	StartWin(){
		this.setState({ isShowStart: !this.state.isShowStart });
	}
	startCourse(edit){
		var _self=this;
		if(this.props.authority.urlStart){
			post(this.props.authority.urlStart.sourceCode,{
				"data":[edit.id]
			}).then(function(json){
				_self.StartWin();
				if(json.code == 0){
					alert(json.message);
				}else if(json.code == 1){
					if(json.message == ""){
						alert("课程类别启用成功");
					}
					var {pageSize,pageIndex} = _self.state.paging;
					_self.getCourseList({pageSize:pageSize,pageIndex:pageIndex});
				}
			})
		}
	}
	//删除
	isShowOrNotDe(edit) {
		this.setState({editCourseData: Object.assign({},this.state.editCourseData,edit)});
		this.deleteWin()
	}
	deleteWin(){
		this.setState({ isShowDe: !this.state.isShowDe });
	}
	deleteCourse(edit){
		var _self = this;
		if(this.props.authority.urlDelete){
			post(this.props.authority.urlDelete.sourceCode,{
				"data":[edit.id]
			}).then(function(json){
				_self.deleteWin();
				if(json.code == 0){
					alert(json.message);
					var {pageSize,pageIndex} = _self.state.paging;
					_self.getCourseList({pageSize:pageSize,pageIndex:pageIndex});
				}else if(json.code == 1){
					if(json.message == ""){
						alert("课程类别删除成功");
					}
					var {pageSize,pageIndex} = _self.state.paging;
					_self.getCourseList({pageSize:pageSize,pageIndex:pageIndex});
				}
			})
		}
	}
	//显示时间
	timeSetShow(){
		this.setState({timeSet: !this.state.timeSet});
		this.getTimeList();
	}
	isShowTime(e){
		var elem = e.target;
		var cont = elem.innerText;
		if(cont !== ""){
			this.timeSetShow();
		}
	}
	getTimeList(){
		var _self = this;
		var url=this.props.authority.timeList.sourceCode;
		var data={
			data:{
				acadTermId: "383"
			}
		}; //acadTermId
		post(url, data
		).then(function (json) {
			if(json.code==0){
				alert("课时获取失败");
			}else{
				_self.setState({classList:json.data});
			}
		}).catch(function () {
		})
	}
	//保存修改
	updateTime(data){
		var _self = this;
		var data={
			data:data
		};
		var url=this.props.authority.updateTime.sourceCode;
		post(url, data
		).then(function (json) {
			if(json.code==0){
				alert("修改失败");
			}else{
				alert("课时修改成功");
			}
		}).catch(function () {
		})
	}

}

export default CourseCategory

