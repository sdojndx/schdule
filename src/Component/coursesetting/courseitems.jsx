import style from "../../style/selectcourse.scss"
import React, { Component } from "react"
import { stampToTime,stampToTimeSeconds } from "../common/pubfn"
import { Link } from 'react-router'
import AlertWin from "../win/alertwin"
import { stampToDay, download } from "../common/pubfn"
import SelectCourseLesson from "./selectcourselesson"
import FormWin from '../win/formwin'
import { SearchAnimate } from "../common/animate"

class CourseItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isShow: false,
			isShowDetail: false,
			//isShowCourseTime:false,
			/*formSource:[{
				name: "beginDateTime",
				lable: '选课时间',
				star: false,
				type: 204
			}],*/
			//formData:{},
		};
	}
	render() {
		var _self = this
		var elem = "";
		var courseTime = "";
		var edit = "";
		var editCourseTime="";
		if (this.props.startDate != null && this.props.endDate != null) {
			var startDate = stampToTimeSeconds(this.props.startDate);
			var endDate = stampToTimeSeconds(this.props.endDate);
			courseTime = (
				<div>
					<p><span className={style.item_info_title}>选课时间：</span>{startDate}  至  {endDate}</p>
				</div>
			)
			editCourseTime = (
				<div>
					<p><span className={style.item_info_title}>选课时间：</span><span style={{color:"#3e91eb",cursor: "pointer"}} onClick={() => this.props.showeditCourseTime(this.props)} >{startDate} 至 {endDate}</span></p>
				</div>
			)
		}
		if (this.props.status == 0 || this.props.status == 1) {
			edit = (
				<Link
					to={`coursesetting/editcoursetask/${this.props.id}`}
					className={style.show_edit}
				>
					<i className="fa fa-pencil-square-o" style={{ color: '#559fee' }}></i>
				</Link>
			)
		}
		var operate = (
			<div>
				<p>{this.props.requestTaskName}</p>
				<span className={style.show_detail} onClick={this.showDetail.bind(this)}><i className="fa fa-file-text-o" style={{ color: '#559fee' }}></i></span>
				{edit}
				<span className={style.show_delete} onClick={() => this.props.deleteCourse(this.props)}><i className="fa fa-trash-o" style={{ color: '#559fee' }}></i></span>
			</div>
		)
		var courseInfoBottom = (
			<div>
				<p className={style.right_40}><span className={style.item_info_title}>总人数：</span>{this.props.studentTotal}</p>
				<p className={style.right_40}><span className={style.item_info_title}>已选：</span>{this.props.selectTotal}</p>
				<p className={style.right_40}><span className={style.item_info_title}>未选：</span>{this.props.notselectedTotal}</p>
			</div>
		)
		var showDetail = (
			<SearchAnimate>
				<div 
					className={style.select_course_case} 
					visible={this.state.isShow}
					style={{ display: this.state.isShow ? "block" : "none" }}
				>
					{this.props.listData&&this.props.listData.map((data,index)=>{
						return <SelectCourseLesson key={index} elem={data} status={_self.props.status} colorIndex={index} deleteCourseList={()=>this.props.deleteCourseList(data.taskCourseId)}/>
					})}
				</div>
			</SearchAnimate>
		)
		if (this.props.status == 0) {
			elem = (<div className={style.course_item}>{/*item主体*/}
				<div className={style.info_case}>{/*信息*/}
					{operate}
					<div>
						<p className={style.right_40}><span className={style.item_info_title}>学年学期：</span>{this.props.acadTermName}</p>
						<p><span className={style.item_info_title}>选课年级：</span>{this.props.acadSclasfName}</p>
						<span className={style.disableBtn}>发布</span>
					</div>
					{courseTime}
					<div>
						<Link to={`coursesetting/selectcourseaddtask/${this.props.id}?acadClasfId=${this.props.acadSclasfId}`} className={style.addSelectCourse}>+ 选择课程({this.props.courseList})</Link>
						{this.state.isShow ? <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.up_icon} onClick={this.showOrNot.bind(this)}></span> : <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.down_icon} onClick={this.showOrNot.bind(this)}></span>}
					</div>
				</div>
				{showDetail}
			</div>)
		} else if (this.props.status == 1) {
			elem = (<div className={style.course_item}>{/*item主体*/}
				<div className={style.info_case}>{/*信息*/}
					{operate}
					<div>
						<p className={style.right_40}><span className={style.item_info_title}>学年学期：</span>{this.props.acadTermName}</p>
						<p><span className={style.item_info_title}>选课年级：</span>{this.props.acadSclasfName}</p>
						<span onClick={() => this.props.onPublish(this.props)} className={style.publish}>发布</span>
					</div>
					{courseInfoBottom}
					{courseTime}
					<div>
						<Link to={`coursesetting/selectcourseaddtask/${this.props.id}?acadClasfId=${this.props.acadSclasfId}`} className={style.addSelectCourse}>+ 选择课程({this.props.courseList})</Link>
						{this.state.isShow ? <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.up_icon} onClick={this.showOrNot.bind(this)}></span> : <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.down_icon} onClick={this.showOrNot.bind(this)}></span>}
					</div>
				</div>
				{showDetail}
			</div>)
		} else if (this.props.status == 2) {
			elem = (<div className={style.course_item}>{/*item主体*/}
				<div className={style.info_case}>{/*信息*/}
					{operate}
					<div>
						<p className={style.right_40}><span className={style.item_info_title}>学年学期：</span>{this.props.acadTermName}</p>
						<p><span className={style.item_info_title}>选课年级：</span>{this.props.acadSclasfName}</p>
						<span onClick={() => this.props.canclePublish(this.props)} className={style.publish_or_not}>取消发布</span>
					</div>
					{courseInfoBottom}
					{editCourseTime}
					<div>
						<Link to={`coursesetting/coursepreferencesetdire/${this.props.id}`} className={style.addSelectCourse}>+ 选择课程({this.props.courseList})</Link>
						{this.state.isShow ? <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.up_icon} onClick={this.showOrNot.bind(this)}></span> : <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.down_icon} onClick={this.showOrNot.bind(this)}></span>}
					</div>
				</div>
				{showDetail}
			</div>)
		} else if (this.props.status == 3) {
			elem = (<div className={style.course_item}>{/*item主体*/}
				<div className={style.info_case}>{/*信息*/}
					{operate}
					<div>
						<p className={style.right_40}><span className={style.item_info_title}>学年学期：</span>{this.props.acadTermName}</p>
						<p><span className={style.item_info_title}>选课年级：</span>{this.props.acadSclasfName}</p>
						<span className={style.select_course_over}>已取消发布</span>
					</div>
					{courseInfoBottom}
					{courseTime}
					<div>
						<Link to={`coursesetting/selectcourseaddtask/${this.props.id}`} className={style.addSelectCourse}>+ 选择课程({this.props.courseList})</Link>
						{this.state.isShow ? <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.up_icon} onClick={this.showOrNot.bind(this)}></span> : <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.down_icon} onClick={this.showOrNot.bind(this)}></span>}
					</div>
				</div>
				{showDetail}
			</div>)
		}else if (this.props.status == 4) {
			elem = (<div className={style.course_item}>{/*item主体*/}
				<div className={style.info_case}>{/*信息*/}
					{operate}
					<div>
						<p className={style.right_40}><span className={style.item_info_title}>学年学期：</span>{this.props.acadTermName}</p>
						<p><span className={style.item_info_title}>选课年级：</span>{this.props.acadSclasfName}</p>
						<span className={style.select_course_over}>已结束</span>
					</div>
					{courseInfoBottom}
					{courseTime}
					<div>
						<Link to={`coursesetting/selectcourseaddtask/${this.props.id}`} className={style.addSelectCourse}>+ 选择课程({this.props.courseList})</Link>
						{this.state.isShow ? <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.up_icon} onClick={this.showOrNot.bind(this)}></span> : <span style={{ display: this.props.courseList > 0 ? "block" : "none" }} className={style.down_icon} onClick={this.showOrNot.bind(this)}></span>}
					</div>
				</div>
				{showDetail}
			</div>)
		}
		var createDate = stampToTime(this.props.createDate)

		var attachmentName = []
		this.props.attachmentsList && this.props.attachmentsList.map(function (item, index) {
			attachmentName.push(
				<div
					key={index}
					className={style.uploadElem}
					onClick={_self.download.bind(_self)}
				>
					{item.attachmentName ? item.attachmentName : ''}
				</div>

			)
		})
		return (
			<div className={`${style.course_item_case} ${style.clearfix}`}>
				<AlertWin
					navTitle="选课任务说明"
					btnName="确定"
					btnAct={this.showDetail.bind(this)}
					close={this.showDetail.bind(this)}
					isShow={this.state.isShowDetail}
				>
					<div className={style.detail_style} dangerouslySetInnerHTML={{ __html: this.props.notes }}>
					</div>
					<div className={style.uploadList}>
						{attachmentName}
					</div>
				</AlertWin>
				<div className={style.course_creat_time}>{createDate}</div>
				<div className={`${style.couse_item_content} ${this.props.islast ? style.couse_item_content_last : ""}`}>{/*左边框*/}
					<span className={style.pos_icon}></span>{/*定位球*/}
					{elem}
				</div>
			</div>
		)
	}
	showOrNot(show) {
		this.setState({ isShow: !this.state.isShow })
	}
	showDetail(show) {
		this.setState({ isShowDetail: !this.state.isShowDetail })
	}
	download() {
		var _self = this;
		this.props.attachmentsList && this.props.attachmentsList.map(function (item, index) {
			if (item.attachmentUrl) {
				var iframe = document.createElement('iframe')
				document.body.appendChild(iframe)
				iframe.src = item.attachmentUrl
				iframe.style.display = "none";
			} else {
			}
		})
	}
}
export default CourseItem