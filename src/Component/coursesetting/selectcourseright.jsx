import style from "../../style/selectcourse.scss"
import React,{Component} from "react"
import {Link} from 'react-router'
import PageNav from '../common/pagenav'

class SelectCourseRight extends Component{
	constructor() {
		super();
		
	}
	render(){
		return (
			<div className={style.course_right_content}>
				<PageNav 
					firstClassTit="选课任务设置" 
					hasSelect="1"
					style={{width:"100%",marginTop:0,border:0}}
					val = {this.props.acadTermID}
					onChange = {this.props.onChange}
				>
					<div className={style.list_cont}>
						{this.props.children}
					</div>
				</PageNav>
			</div>
		)
	}
}
export default SelectCourseRight