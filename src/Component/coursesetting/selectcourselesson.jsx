import style from "../../style/selectcourse.scss"
import React,{Component} from "react"
import AlertWin from "../win/alertwin"


class CourseLesson extends Component{
	constructor(props) {
		super(props);
		this.state = {
			isShowDetail:false
		};
	}
	render(){
		var cdelete = null
		if(this.props.status==0||this.props.status==1){
			cdelete = <span className={style.course_delete} onClick={this.props.deleteCourseList}></span>;
		}
		return (
			<div className={style.select_course_item}>
				<AlertWin
					navTitle="选课任务说明"
					btnName="确定"
					close={this.showCourseEditDetail.bind(this)}
					btnAct={this.showCourseEditDetail.bind(this)}
					isShow={this.state.isShowDetail}
				>
					<div className={style.detail_style}>
						{this.props.elem.note||"--"}
					</div>
				</AlertWin>
				<div className={style.course_item_nav} style={{backgroundColor:(this.props.colorIndex)%2==0?"#fa4c4c":"#3e91eb"}}>
					<span>{this.props.elem.classCourseName||"--"}</span>
					<span className={style.course_icon} onClick={this.showCourseEditDetail.bind(this)}></span>
					{cdelete}
				</div>
				<div style={{paddingBottom:"20px"}}>
					<ul className={style.course_list_content}>
						<li className={style.course_list}>{this.props.elem.rankName||"--"}</li>
						<li className={style.course_list}>{this.props.elem.modelName||"--"}</li>
						<li className={style.course_list}>{this.props.elem.levelName||"--"}</li>
					</ul>
					<ul className={style.course_list_content}>
						<li className={style.course_list}>不超过{this.props.elem.maxPerson||"--"}人</li>
						<li className={style.course_list}>{this.props.elem.minPerWk||"--"}课时/周</li>
					</ul>
					
				</div>
			</div>
		)
	}
	showCourseEditDetail(){
		this.setState({isShowDetail:!this.state.isShowDetail})
	}
}
export default CourseLesson