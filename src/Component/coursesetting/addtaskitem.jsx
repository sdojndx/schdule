import style from "../../style/selectcourseaddtask.scss"
import React,{Component} from "react"
import Form from "../common/form/form"
import Paging from "../common/paging/paging"
import Logo from "./courselogomap"

class AddtaskItem extends Component{
	constructor(props) {
		super(props);
		this.state = {
			isShow:false
		};
	}
	render(){		
		var data = this.props;
		var logoLocation=Logo[data.className];
		return (
			<div className={style.lesson_detail}>
				<span className={style.lesson_logo} style={{backgroundPosition:logoLocation+" 0"}}> </span>
				<div className={style.lesson_content}>
					<p className={style.lesson_name}>{data.className}</p>
					<ul>
						<li>课程类别：{data.rankName||"--"}</li>
						<li>所属学科：{data.subJectName||"--"}</li>
						<li>层级：{data.levelName||"--"} </li>
					</ul>
					<br/> <br/>
					<ul>
						<li>教学模式：{data.modelName||"--"}</li>
						<li>最大人数：{data.maxPerson||"--"}人</li>
						<li>周课时：{data.minPerWk||"--"}小时</li>
						<li>学期课时：{data.semesterHour||"--"}</li>
					</ul>
					{this.state.isShow?<span className={style.up_icon} onClick={this.showOrNot.bind(this)}></span>:<span className={style.down_icon} onClick={this.showOrNot.bind(this)}></span>}
				</div>
				<div className={style.lesson_des} style={{ display: this.state.isShow ? 'block' : 'none'}}>
					<span> </span>
					<p>
						{data.scheduleBookNote||"--"}
					</p>
				</div>
				<div className={style.lesson_point}>
					{
						<p 
							className={style.lesson_all} 
							onClick={()=>this.props.onSelect(data)}									
						>
							{data.isSelect?"-":"+"}
						</p>
					}
				</div>
			</div>
		)
	}
	showOrNot(){
		this.setState({isShow:!this.state.isShow});
	}
}
export default AddtaskItem