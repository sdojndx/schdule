import style from "../../style/selectcourseaddtask.scss"
import React,{Component} from "react"
import Form from "../common/form/form"
import Paging from "../common/paging/paging"
import AddtaskItem from "./addtaskitem"

class Addtaskright extends Component{
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div className={style.course_right_content}>
				<div className={style.course_nav}>
					<p>添加课程</p>
				</div>
				<div className={style.course_condition}>
					<Form 
						showType='choice' 
						formData={this.props.searchData} 
						formSource={this.props.searchSource} 
						onChange={this.props.getVal} 
						onInit={this.props.formInit}
					/>
				</div>
				<span className={style.separation_line}> </span>
				<div className={style.course_type}>
					<div className={style.type_title}>
						<span className={style.type_title_left}>共 <strong>{this.props.totalCount}</strong> 个走班制教学课程</span>
						<span onClick={this.swAllCourse.bind(this)} className={style.type_title_right}> 
							<i className={style.select_all}>{this.props.selectAll?"-":"+"}</i> {this.props.selectAll?"反选":"全选"}
						</span>
					</div>
					{this.props.listData.map((data,index)=>{
						return <AddtaskItem
							key={index}
							index={index}
							{...data}
							onSelect = {this.switchSelect.bind(this)}
						/>
					})
					}
				</div>
				<Paging 
					paging = {this.props.paging}
					onPageChange = {this.props.onPageChange}
				/>
			</div>
		)
	}
	switchSelect(data){
		if(data.isSelect){
			this.props.removeSelectCourse([this.getInfo(data)]);
		}else{
			this.props.addSelectCourse([this.getInfo(data)]);
		}
	}
	swAllCourse(){
		var _self=this;
		var items=[];
		if(this.props.selectAll){
			this.props.listData.map(function(item,index){
				if(item.isSelect){
					items.push(_self.getInfo(item))
				}
			})
			this.props.removeSelectCourse(items);
		}else{
			this.props.listData.map(function(item,index){
				if(!item.isSelect){
					items.push(_self.getInfo(item))
				}
			})
			this.props.addSelectCourse(items);
		}
	}
	getInfo(data){
		var Info={
			"acadStageId":data.acadStageId,
			"acadClasfId":data.acadClasfId,
			"acadTermId":data.acadTermId,
			"subJectId":data.subJectId,
			"classId":data.classId,
			"className":data.className,
			"maxPerson":data.maxPerson
		}
		return Info;
	}
	showOrNot(show){
		this.setState({isShow:!this.state.isShow})
	}
}
export default Addtaskright