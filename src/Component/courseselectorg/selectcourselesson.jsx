import style from "../../style/selectcourse.scss"
import React,{Component} from "react"

class CourseLesson extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	courseList:[{
				studyName:"abck"
			},{
				studyName:"dadsdsf"
			},{
				studyName:"dsjjk"
			},{
				studyName:"ifekabnfd"
			},{
				studyName:"dsfsdfesdds"
			}
		]
	  };
	}
	render(){
		return (
			<div className={style.select_course_item}>
				<div className={style.course_item_nav} style={{backgroundColor: this.props.navColor}}>
					<span>{this.props.courseName}</span>
					<span className={style.course_icon}></span>
					<span className={style.course_delete}></span>
				</div>
				<div>
					<ul className={style.course_list_content}>
						{
							this.state.courseList.map((elem,index) => (
								<li key={index} className={style.course_list}>{elem.studyName}</li>
							))
						}
					</ul>
				</div>
			</div>
		)
	}
}
export default CourseLesson