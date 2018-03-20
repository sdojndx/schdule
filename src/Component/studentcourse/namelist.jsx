import style from "../../style/namelist.scss"
import '../../style/common.scss'
import React, { Component } from "react"
import { Link } from "react-router"
import Buttons from '../common/buttons'
import AlertWin from '../win/alertwin'
import {post,getInfoByUrl,alert} from "../common/pubfn"

const Pink = require('../../images/namelist/pink.png')
const Blue = require('../../images/namelist/blue.png')
const Gray = require('../../images/namelist/gray.png')
const Girl = require('../../images/namelist/girl.png')

class NameList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			requestShow:false,
			studentList:[],//学生列表
			courseLevelList:[],//请求后台的弹窗数据
			selectData:{},//点击弹窗内列表将选中信息传入
			selectStudent:{},//点击头像把该条数据存入
			checkList:[],//审核list
		}
	}
	componentDidMount(){
		this.getList();
	}
	render() {
		var _self=this;
		var passlist = [],
				waitList=[],
				passinfo = {
					boy:0,
					girl:0,
					total:0
				},
				waitinfo={
					boy:0,
					girl:0,
					total:0
				};
		var stuClassName="";
		var courseOfferingName="";
		var stuLen=this.state.studentList.length;
		this.state.studentList.map(function(item){
			stuClassName=item.acadClasfName;
			courseOfferingName=item.courseOfferingName;
			if(item.approvedStatus==2){//approvedStatus:1待审核  2审核通过
				passlist.push(item);
				if(item.sex==1){
					passinfo.boy++
				}else{
					passinfo.girl++
				}
				passinfo.total++
			}else if(item.approvedStatus==1){
				waitList.push(item);
				if(item.sex==1){
					waitinfo.boy++
				}else{
					waitinfo.girl++
				}
				waitinfo.total++
			}
		})
		var title=(
			<h3>
				{stuClassName}  {courseOfferingName}  ({stuLen})
			</h3>
		)
		return (
			<div className={style.namelist_container}>
				{/* 标题 */}
				<div className={style.namelist_title}>
					{title}
				</div>
				{/* 已审核通过盒子 */}
				<div className={style.namelist_examine_ok_box}>
					{/* 已审核标题区域 */}
					<div className={style.namelist_examine_ok_title}>
						<div className={style.namelist_examine_ok_left}>
							<h3>已审核通过名单</h3>
							<span className={style.namelist_examine_title_blue}>(点击学生头像可调整选课结果)</span>
						</div>
						<div className={style.namelist_examine_ok_right}>
							<span className={style.namalist_examine_ok_people}>共{passinfo.total}人</span>
							<span className={style.namalist_examine_ok_people}>
								男：<span className={style.namelist_examine_title_blue}>{passinfo.boy}</span>人
							</span>
							<span className={style.namalist_examine_ok_people}>
								女：<span className={style.namelist_examine_title_pink}>{passinfo.girl}</span>人
							</span>
						</div>
					</div>
					{/* 学生信息 */}
					<div className={style.namelist_examine_student_info}>
						<ul className={style.clearfix}>
							{passlist.map((item, index) => {
								return (
									<li key={index}>
										<img
											className={style.namelist_examine_img}
											src={item.sex==1?Blue:Pink}
											alt="img"
											onClick={_self.getCourseLevel.bind(_self,item)}
										/>
										<div className={style.namelist_examine_text}>
											<p>{item.name}<span className={style.namelist_examine_icon_gender}>{item.iconGender}</span></p>
											<p>{item.class}</p>
										</div>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
				{/* 未审核名单盒子 */}
				<div className={style.namelist_examine_ok_box}>
					{/* 未审核标题区域 */}
					<div className={style.namelist_examine_ok_title}>
						<div className={style.namelist_examine_ok_left}>
							<h3>待审核名单</h3>
						</div>
						<div className={style.namelist_examine_ok_right}>
							<span className={style.namalist_examine_ok_people}>共{waitinfo.total}人</span>
							<span className={style.namalist_examine_ok_people}>
								男：<span className={style.namelist_examine_title_blue}>{waitinfo.boy}</span>人
							</span>
							<span className={style.namalist_examine_ok_people}>
								女：<span className={style.namelist_examine_title_pink}>{waitinfo.girl}</span>人
							</span>
						</div>
					</div>
					{/* 学生信息 */}
					<div className={style.namelist_examine_student_info}>
						<ul className={style.clearfix}>
							{waitList.map((item, index) => {
								return (
									<li className={style.namelist_examine_li} key={index}>
										<img alt="img"
											className={style.namelist_examine_img}
											src={item.sex==1?Gray:Girl}
											onClick={_self.getCourseLevel.bind(_self,item)}
										/>
										<div className={`${style.namelist_examine_text} ${style.namelist_examine_text_wait} `}>
											<p>{item.studentName}<i className={item.sex==1?"fa fa-mars":"fa fa-venus"} style={{marginLeft:"15px"}}></i></p>
											<p>{item.classGroupName}</p>
										</div>
										<input type="checkbox" 
											className={style.namelist_examine_checkbox} 
											onChange={this.checkStudentList.bind(this,item)}
										/>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
				{/* 按钮 */}
				<div className={style.namelist_btn_box}>
					<Buttons
						btnName='审核通过'
						onClick={()=>_self.passOrNot(2)}
						style={{ width: "100px", height: "38", backgroundColor: "#f59524", color: "#fff", boxSizing: 'border-box', fontSize: '14px', padding: '0', position: 'absolute', left: '50%', top: '10px' }}
					/>
					<Buttons
						btnName='审核不通过'
						onClick={()=>_self.passOrNot(3)}
						style={{ width: "100px", height: "38", backgroundColor: "#3e91eb", color: "#fff", boxSizing: 'border-box', fontSize: '14px', padding: '0', position: 'absolute', left: '35%', top: '10px' }}
					/>
				</div>
				{/* 弹窗 */}
				<AlertWin
					width="900"
					contentPadding='10px 0 0 10px'
					navTitle="调整选课"
					//navSecondTitle="(刘楠楠)"
					btnLeftName="返回"
					btnRightName="保存"
					close={this.isShowOrNot.bind(this)}
					isShow={this.state.isShow}
					submit={this.selectCouseSubmit.bind(this)}
				>
				{
					this.state.courseLevelList.map(function(elem, index) {
						return (
							<div key={index}>
								<p className={style.alert_box_classname}>{elem.classCourseName}</p>
								{
									elem.courseList.map(function(list, index) {
										var style={};
										var elemFont="";
										if(list.instrTypeName==null){
											elemFont=elem.classCourseName
										}else{
											elemFont=list.instrTypeName
										}
										if(_self.state.selectData.courseOfferingId==list.courseOfferingId){
											style={
												padding:"0 58px", 
												height: "60", 
												backgroundColor: "#3e91eb", 
												color: "#fff", 
												border: '1px solid #95cef5', 
												boxSizing: 'border-box', 
												margin: '0 0 0 20px'
											}
										}else{
											style={
												padding:"0 58px", 
												height: "60", 
												backgroundColor: "#e8f6ff", 
												color: "#3e91eb", 
												border: '1px solid #95cef5', 
												boxSizing: 'border-box', 
												margin: '0 0 0 20px'
											}
										}
										return (
											<Buttons
												key={index}
												style={style}
												btnName={elemFont+"("+list.selectedStudent+")"}
												onClick={_self.selectCourseButton.bind(_self,list)}
											/>
										)
									})
								}
							</div>
						)
					})
				}
				</AlertWin>
			</div>
		)
	}
	getList(){
		var _self=this;
		post(this.props.authority.coursestudent.sourceCode,{
			data:{
				id:this.props.params.tcId
			}
		}).then(function(json){
			_self.setState({studentList:json.data});
		}).catch()
	}
	getCourseLevel(item){
		var _self=this;
		_self.setState({ selectStudent: Object.assign({},item) });
		post(_self.props.authority.courselist.sourceCode,{
			data:{
				"courseOfferingId":item.courseOfferingID,
				"requestTaskId":item.requestTaskID       
			}
		}).then(function(json){
			_self.setState({ courseLevelList: Object.assign([],json.data) });
			_self.isShowOrNot();
		})
	}
	selectCourseButton(item){
		this.setState({ selectData: Object.assign({}, item) });
	}
	selectCouseSubmit(e){
		var _self=this;
		post(_self.props.authority.setcourse.sourceCode,{
			data:{
				"courseDemandID":_self.state.selectStudent.courseDemandID,
				"courseOfferingID":_self.state.selectData.courseOfferingId,
				"sourceCourseOfferingID":_self.state.selectStudent.courseOfferingID   
			}
		}).then(function(json){
			alert(json.message)
		})
	}
	checkStudentList(item,e){
		var checkList=this.state.checkList.slice();
		var index=checkList.indexOf(item.studentId);
		if(index>-1){
			checkList.splice(index, 1)
		}else{
			checkList.push(item.studentId)
		}
		this.setState({ checkList: checkList});
	}
	passOrNot(type){
		var _self=this;
		var courseOfferingID=_self.state.studentList[0].courseOfferingID;
		var requestTaskID=_self.state.studentList[0].requestTaskID;
		var dataInfo={
			data:{
				"courseOfferingID":courseOfferingID,
				"requestTaskID":requestTaskID,
				"approvedStudentIds":_self.state.checkList.join(","),
				"approvedStatus":type
			}
		}
		post(_self.props.authority.approvedselectstudent.sourceCode,dataInfo).then(function(json){
			alert(json.message)
			_self.getList();
		})
	}
	isShowOrNot(item) {
		this.setState({ isShow: !this.state.isShow })
	}
	hideReqWin(){
		this.setState({ requestShow: !this.state.requestShow })
	}
}
export default NameList