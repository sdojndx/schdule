import style from "../../style/stuselectcourse.scss"
import React,{Component} from "react"
import { Link } from 'react-router'
import { post , stampToTime , stampToDay , suplustime} from "../common/pubfn"

class CourseItem extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {

	  };
	}
	render(){
		var elem="";
		var noticeBall="";
		var creatTime=stampToTime(this.props.item.createDate);
		var startDate=stampToDay(this.props.item.startDate);
		var endDate=stampToDay(this.props.item.endDate);
		var now=suplustime(this.props.item.endDate);
		if(this.props.item.taskStatus==0){
			elem="未开始"
		}else if(this.props.item.taskStatus==1){
			elem="进行中";
			noticeBall=(
				<div className={style.noticeBall}>{/*红色圆球*/}
					<span className={style.dayNotice}>剩余
						 <p>{now}天</p>
					</span>
				</div>
			)
		}else if(this.props.item.taskStatus==2){
			elem="已发布"
		}
		//按钮
		var btnEvent="";
		if(this.props.item.taskStatus==0){
			btnEvent=""
		}else if(this.props.item.taskStatus==1){
			if(this.props.item.requestTaskApprovedStatus==0){
				btnEvent=(
					<Link 
						to={`courseselect/optclass/${this.props.item.id}`} 
						className={style.btn_select+" "+style.btn_stucourse}
					>去选课</Link>
					
				)
			}else if(this.props.item.requestTaskApprovedStatus==1){
				btnEvent=(
					<Link 
						to={`courseselect/checklist/${this.props.item.id}`} 
						className={style.btn_check+" "+style.btn_stucourse}
					>去查看</Link>
					
				)
			}
			// }else if(this.props.item.requestTaskApprovedStatus==2){
			// 	btnEvent=(
			// 		<Link 
			// 			to={`courseselect/checklist/?endDate=${this.props.item.endDate}&id=${this.props.item.id}&startDate=${this.props.item.startDate}&taskStatus=${this.props.item.taskStatus}`} 
			// 			className={style.btn_change+" "+style.btn_stucourse}
			// 		>去修改</Link>
					
			// 	)
			// }	
		}else if(this.props.item.taskStatus==2){
			btnEvent=(
				<Link 
					to={`courseselect/resultlist/${this.props.item.id}`} 
					className={style.btn_checkout+" "+style.btn_stucourse}
				>查看结果</Link>				
			)
		}
		return (
			<div className={`${style.course_item_case} ${style.clearfix}`}>
				<div className={style.course_creat_time}>
					<p>{creatTime}</p>
					{noticeBall}
				</div>
				<div className={`${style.couse_item_content} ${this.props.islast?style.couse_item_contentlast:""}`}>{/*左边框*/}
					<span className={style.pos_icon}></span>{/*定位球*/}
					<div className={style.course_item}>{/*item主体*/}
						<div className={style.info_case}>{/*信息*/}
							<div>
								<p className={style.selectItemName}>{this.props.item.requestTaskName}</p>
							</div>
							<div>
								<p className={style.right_50}><span className={style.item_info_title}>选课学期：</span>{this.props.item.acadTermName||"--"}</p>
								<p className={style.right_50}><span className={style.item_info_title}>选课时间：</span>{startDate}至{endDate}</p>
								<p>{elem}</p>
								{btnEvent}
							</div>
							<div>
								{/*<p className={style.right_50}><span className={style.item_info_title}>必选</span>{this.props.mustSelect}门</p>*/}
								<p className={style.right_50}><span className={style.item_info_title}>已选</span>{this.props.item.choosenCount}门</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default CourseItem