import style from "../../style/selectcourseaddtask.scss"
import React,{Component} from "react"
import Button from "../common/buttons"

class Addtaskleft extends Component{
	constructor() {
		super();
	}
	render(){
		var _self=this;
		var courseCount=this.props.selectCourseArr.length;
		var elem=
			(<div className={style.sidebar_content}>
				<span className={style.course_count}>已添加{courseCount}个</span>
					{
						this.props.selectCourseArr.map((data,index) => {
							
							return(
								<div key={data.classId}>
									{data.className} 
									<i 
										className="fa fa-trash-o" 
										style={{cursor:"pointer"}}
										onClick={()=>this.props.removeSelectCourse([data])}
									> 
									</i> 
								</div>
							)
						})
					}
			</div>)
		return (
			<div className={style.course_sidebar}>
				{elem}
				<div className={style.btnCase}>
					<Button
						style = {{width:"60px",height:"26px",backgroundColor:"#3e91eb",fontSize: "12px",lineHeight:"26px"}}
						btnName="取消"
						linkTo="coursesetting"
					/>
					<Button
						style = {{width:"60px",height:"26px",backgroundColor:"#f59524",fontSize: "12px",lineHeight:"26px",marginLeft:"10px"}}
						btnName="保存"
						onClick={this.props.saveCourseLeft} 
					/>
				</div>
			</div>
		)
	}
}	

export default Addtaskleft