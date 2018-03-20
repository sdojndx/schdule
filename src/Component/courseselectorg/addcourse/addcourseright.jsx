import style from "../../../style/selectcourse.scss"
import React,{Component} from "react"
import PageNav from "../../common/pagenav"
import Search from "../../common/search"

class AddCourseRight extends Component{
	constructor(props) {
		super(props);

		this.state = {
			
		};
	}
	render(){
		return (
			<div className={style.addcourse_right_case}>
				<div className={style.addcourse_right_nav}>
					添加课程
				</div>
				<Search />
			</div>
		)
	}
}
export default AddCourseRight