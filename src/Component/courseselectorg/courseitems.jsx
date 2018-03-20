import style from "../../style/selectcourse.scss"
import React,{Component} from "react"

class CourseItem extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isShow:true
	  };
	}
	render(){
		return (
			<div className={style.course_item_case}>
				<div className={style.course_creat_time}>{this.props.creatTime}</div>
				<div className={style.couse_item_content}>{/*左边框*/}
					<span className={style.pos_icon}></span>{/*定位球*/}
					<div className={style.course_item}>{/*item主体*/}
						<div className={style.info_case}>{/*信息*/}
							<div>
								<p>{this.props.itemName}</p>
							</div>
							<div>
								<p className={style.right_40}><span className={style.item_info_title}>学年学期：</span>{this.props.gradeName}</p>
								<p><span className={style.item_info_title}>选课年级：</span>{this.props.selectGrade}</p>
								<span className={style.publish_or_not}>发布</span>
							</div>
							<div>
								<p className={style.right_40}><span className={style.item_info_title}>总人数：</span>{this.props.totalNo}</p>
								<p className={style.right_40}><span className={style.item_info_title}>已选满：</span>{this.props.chosenNo}</p>
								<p className={style.right_40}><span className={style.item_info_title}>未选满：</span>{this.props.unfilledNo}</p>
								<p><span className={style.item_info_title}>未选：</span>{this.props.noSelectNo}</p>
							</div>
							<div>
								<span>选择课程</span>
								{this.state.isShow?<span className={style.up_icon} onClick={this.showOrNot.bind(this)}></span>:<span className={style.down_icon} onClick={this.showOrNot.bind(this)}></span>}
							</div>
						</div>
						{this.state.isShow?<div className={style.select_course_case}>
							{this.props.children}
						</div>:""}
						
					</div>
				</div>
			</div>
		)
	}
	showOrNot(show){
		this.setState({isShow:!this.state.isShow})
	}
}
export default CourseItem