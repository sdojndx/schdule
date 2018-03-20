import style from "../../../style/selectcourse.scss"
import React,{Component} from "react"
import Button from "../../common/buttons"

class AddCourseLeft extends Component{
	constructor(props) {
		super(props);

		this.state = {
			addCourseList:[{
				courseName:"语文"
			},{
				courseName:"数学"
			},{
				courseName:"英语"
			},{
				courseName:"体育"
			},{
				courseName:"历史"
			}]
		};
	}
	render(){
		return (
			<div className={style.addcourse_left_case}>
				<div className={style.addcourse_left_nav}>已添加（{this.props.courseCount}个）</div>
				<ul>
					{
						this.state.addCourseList.map((elem,index) => (
							<li key={index} className={style.add_course_list}>{elem.courseName}</li>
						))
					}
				</ul>
				<div className={style.left_btns_case}>
					<div className={style.cancle_btn}>取消</div>
					<div className={style.save_btn}>保存</div>
				</div>
			</div>
		)
	}
}
export default AddCourseLeft