import style from "../../style/selectcourse.scss"
import React,{Component} from "react"
import {Link} from 'react-router'
import HasNoItems from "../common/hasnoitems"
import Buttons from "../common/buttons"

import SelectLeft from '../common/stylepart/selectleft'
import CourseRight from "./selectcourseright"
import CourseItems from "./courseitems"
import {post,getUrlInfo,eduValidForm,alert} from "../common/pubfn"
import AlertWin from "../win/alertwin"
import FormWin from "../win/formwin"
import Paging from "../common/paging/paging"

class CourseSetting extends Component{
	constructor(props) {
		super(props);
		this.state = {
			searchData:{

			},
			formshow:false,
			requestShow:false,
			isShowCourseTime:false,
			formSource:[],
			eidtFormSource:[{
				name: "beginDateTime",
				lable: '选课时间',
				star: false,
				type: 217
			}],
			formData:{},
			EditFormData:{},
			AcademicStage:[],
			listData:[],
			paging:{
				pageIndex:1,
				totalCount:0,
				pageSize:10,
				totalPage:0
			},
		};
	}
	componentDidMount(){
		
	}
	render(){
		var courseList = [];
		var len=this.state.listData.length;	
		if(len==0){
			courseList = (
				<HasNoItems classroomTittle="请根据学校的情况，快来新建任务吧~">
					<Buttons style={{width:200,height:56,backgroundColor:"#3e91eb",fontSize:18,marginTop:30}}
						btnName="+ 新建一个选课任务"
						linkTo="coursesetting/addcoursetask"
					/>
				</HasNoItems>
			)
		}else{
			courseList.push(
				<Link 
					key="add"
					className={style.add_course} 
					to="coursesetting/addcoursetask"
				>
					{"+   新建一个选课任务"}
				</Link>
			)
			this.state.listData.map((data, index) => {
				courseList.push(
					<CourseItems
						key={data.id}
						{...data}
						totalNo="100"
						chosenNo="--"
						noSelectNo="--"
						unfilledNo="--"
						onPublish = {this.openPublish.bind(this)}
						courseList={data.listData&&data.listData.length}
						islast={index==len-1}
						canclePublish={this.canclePublish.bind(this)}
						deleteCourse={this.deleteCourse.bind(this)}
						deleteCourseList={this.deleteCourseList.bind(this)}
						showeditCourseTime={this.getCourseTimeId.bind(this)}
					>
					</CourseItems>
				)
			})
		}
		return (
			<div>
				<div className={style.courseCase}>
					<FormWin
						// showType='search'
						navTitle="发布选课任务弹窗"
						timeWidth = '500px'
						contentPaddingLeft='100px'
						navSecondTitle={this.state.titleGrade}
						isShow={this.state.formshow} 
						formSource={this.state.formSource} 
						formData={this.state.formData}
						close={this.swFormShow.bind(this)}  
						submit={this.formSubmit.bind(this)}
						onChange={this.getVal.bind(this)}            
						btnLeftName="返回"
						btnRightName="保存"
					/>
					<FormWin
						showType='search'
						paddingLeft='180px'
						navTitle="修改选课时间"
						isShow={this.state.isShowCourseTime}
						formSource={this.state.eidtFormSource}
						formData={this.state.EditFormData}
						close={this.showeditCourseTime.bind(this)}
						submit={this.formEdit.bind(this)}
						onChange={this.getEditVal.bind(this)}
						btnLeftName="取消"
						btnRightName="保存"
					/>
					<SelectLeft 
						AcademicStage = {this.state.AcademicStage}
						selected = {this.state.searchData.acadSclasfId}
						onChange={(val)=>this.getSearchVal("acadSclasfId",val)}
					/>
					<CourseRight 
						acadTermID = {this.state.searchData.acadTermID}
						onChange={(val)=>this.getSearchVal("acadTermID",val)}
					>
						{courseList}
						<Paging 
							style={{marginBottom:25,clear:"both"}}
							paging = {this.state.paging}
							onPageChange = {this.onPageChange.bind(this)}
						/>
					</CourseRight>
				</div>
			</div>
		)
	}
	getSearchVal(name,val){
		var _self=this;
		var obj = Object.assign({},this.state.searchData);
		obj[name]=val;
		this.setState({searchData:obj});
		if(name=="acadTermID"){
			post(this.props.authority.getAcademicStage.sourceCode,{data:val}).then(function(json){
				_self.setState({AcademicStage:json.data,searchData:Object.assign({},_self.state.searchData,{acadTermID:val})})
			})
		}
		if(name=="acadSclasfId"){
			var dataInfo={
				"data":	{
					acadTermID:this.state.searchData.acadTermID,
					acadSclasfId:val
				},
				"pageSize":this.state.paging.pageSize,
				"pageIndex":this.state.paging.pageIndex
			}
			this.getTaskList(dataInfo);
		}
	}
	getTaskList(para){
		var _self=this;		
		post(this.props.authority.tasklist.sourceCode,para).then(function(json){		
			_self.setState({
				listData:json.items,
				paging:{
					pageIndex:para.pageIndex,
					totalCount:json.totalCount,
					pageSize:para.pageSize
				}
			});
		})
	}
	successShow(){
		this.setState({isSuccessShow:!this.state.isSuccessShow})
	}
	getCourseTimeId(show){
		this.setState({ isShowCourseTime: !this.state.isShowCourseTime, EditFormData:{id:show.id}});
	}
	showeditCourseTime(show){
		this.setState({ isShowCourseTime: !this.state.isShowCourseTime });
	}
	failShow(){
		this.setState({isFailShow:!this.state.isFailShow})
	}
	openPublish(item){
		var _self=this;
		var data = {
			"acadClasfId":item.acadSclasfId,
			"acadTermId":item.acadTermID,
			"taskId":item.id
		}
		post(this.props.authority.categorylist.sourceCode,{
			data:data
		}).then(function(json){
			if(json.data){
				var list = [{
					name:"times",
					lable: '选课时间',
					star: true,
					type: 217
				}]
				json.data.map(function(item){
					list.push({
						key:item.rankId,
						name:item.rankId,
						lable: item.rankName+"最少选",
						star: true,
						type: 200,
						validateType:2
					})
				})
			}
			_self.setState({formSource:list,formData:{"taskId":item.id}});
			_self.swFormShow();
		})
	}
	swFormShow(){
		this.setState({formshow:!this.state.formshow})
	}
	isSuccessed(){
		var _self=this;
		_self.successShow();
	}
	notSuccessed(){
		var _self=this;
		_self.failShow();
	}
	getVal(data,name,val){
		var data = Object.assign({},this.state.formData,data);
		this.setState({formData:data});
	}
	getEditVal(data,name,val){
		var data = Object.assign({},this.state.EditFormData,data);
		this.setState({EditFormData:data});
	}
	formEdit(){
		var _self = this;
		var data = {};
		if(this.state.EditFormData.beginDateTime!=undefined){
			var start=this.state.EditFormData.beginDateTime[0];
			var end=this.state.EditFormData.beginDateTime[1];
			data.startDate=Date.parse(new Date(start));
			data.endDate=Date.parse(new Date(end));
			data.id=this.state.EditFormData.id;
		}
		if(this.props.authority.updateDate) {
			post(this.props.authority.updateDate.sourceCode, {data:data}).then(function (json) {
				_self.getReloadList();
			})
		}
	}
	formSubmit(){
		var _self=this;
		var info = Object.assign({},this.state.formData);
		var result = eduValidForm(this.state.formSource,this.state.formData);
		if(result.ispass){
			var data = {
				startDate:info.times[0],
				endDate:info.times[1],
				taskId:info.taskId
			};
			delete info.times;
			delete info.taskId;
			data.courseTypeList = []
			for(var name in info){
				data.courseTypeList.push({
					courseNbrMin:info[name],
					courseTypeId:name
				})
			}
			post(this.props.authority.taskpublish.sourceCode,{
				data:data
			}).then(function(json){
				if(json.code==1){
					alert(json.message)
					_self.getReloadList();
				}else{
					alert(json.message)
				}
			})
		}else{
			return false;
		}
	}
	onPageChange(pageIndex,pageSize){
		var dataInfo = {
			"data":	{
				acadTermID:this.state.searchData.acadTermID,
				acadSclasfId:this.state.searchData.acadSclasfId
			},
			"pageSize":pageSize,
			"pageIndex":pageIndex
		}
		this.getTaskList(dataInfo);
	}
	canclePublish(item){
		var _self=this;
		var data = {
			data:item.id
		};
		post(_self.props.authority.canclePublish.sourceCode,data).then(function(json){
			if(json.code==1){
				_self.getReloadList()
			}else{
				alert(json.message)
			}
		})
	}
	deleteCourse(item){
		var _self=this;
		var data = {
			data:item.id
		};
		post(_self.props.authority.taskdelete.sourceCode,data).then(function(json){
			if(json.code==1){
				alert(json.message)
				_self.getReloadList()
			}else{
				alert(json.message)
			}
		})
	}
	
	getReloadList(){
		var dataInfo = {
			"data":	{
				acadTermID:this.state.searchData.acadTermID,
				acadSclasfId:this.state.searchData.acadSclasfId
			},
			"pageSize":this.state.paging.pageSize,
			"pageIndex":this.state.paging.pageIndex
		}
		this.getTaskList(dataInfo);
	}
	hideReqWin(){
		this.setState({ requestShow: !this.state.requestShow })
	}
	deleteCourseList(taskCourseId){
		var _self=this;
		var data = {
			data:taskCourseId
		};
		post(_self.props.authority.coursedelete.sourceCode,data).then(function(json){
			if(json.code==1){
				alert(json.message)
				_self.getReloadList()
			}else{
				alert(json.message)
			}
		})
	}
}

export default CourseSetting