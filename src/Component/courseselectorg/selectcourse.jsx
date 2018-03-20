import style from "../../style/selectcourse.scss"
import React,{Component} from "react"
import {Link} from 'react-router'
import CourseLeft from "../courseselect/selectcourseleft"
import CourseRight from "../courseselect/selectcourseright"
import CourseItems from "../courseselect/courseitems"
import CourseLesson from "../courseselect/selectcourselesson"


class SelectCourse extends Component{
	constructor(props) {
	super(props);

	this.state = {};
}
	render(){
		return (
			<div className={style.courseCase}>
				<CourseLeft />
				<CourseRight navTitle="选课任务设置" addCourseName="+   新建一个选课任务">
					<CourseItems 
						creatTime="2017-10-12 10:46"
						itemName="下学期七年级选课"
						gradeName="2017-2018学年第一学期"
						selectGrade="初中七年级"
						totalNo="100"
						chosenNo="--"
						noSelectNo="--"
						unfilledNo="--"
					>
						<CourseLesson courseName="语文" navColor="#fa4c4c"/>
						<CourseLesson courseName="语文" navColor="#fa4c4c"/>
					</CourseItems>
					<CourseItems 
						creatTime="2017-10-12 10:46"
						itemName="下学期七年级选课"
						gradeName="2017-2018学年第一学期"
						selectGrade="初中七年级"
						totalNo="100"
						chosenNo="--"
						noSelectNo="--"
						unfilledNo="--"
					>
						<CourseLesson courseName="语文" navColor="#3e91eb"/>
						<CourseLesson courseName="语文" navColor="#fa4c4c"/>
					</CourseItems>
					<CourseItems 
						creatTime="2017-10-12 10:46"
						itemName="下学期七年级选课"
						gradeName="2017-2018学年第一学期"
						selectGrade="初中七年级"
						totalNo="100"
						chosenNo="--"
						noSelectNo="--"
						unfilledNo="--"
					>
						<CourseLesson courseName="语文" navColor="#fa4c4c"/>
						<CourseLesson courseName="语文" navColor="#3e91eb"/>
					</CourseItems>
				</CourseRight>
			</div>
		)
	}
}
export default SelectCourse