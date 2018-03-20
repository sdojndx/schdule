import style from "../../../style/common.scss"
import React,{Component} from "react"

class SelectCourseLeft extends Component{
	constructor() {
		super();		
	}
	shouldComponentUpdate(nextprops){
		var _self=this;
		if(nextprops.AcademicStage!==this.props.AcademicStage){
			//this.getAutoVal(nextprops.AcademicStage);
			var autoval = nextprops.AcademicStage[0].acadClasf[0].id;
			nextprops.AcademicStage.map(function(item){
				if(item.id==_self.props.selected){
					autoval=_self.props.selected;
				}
				item.acadClasf.map(function(item2){
					if(item2.id==_self.props.selected){
						autoval=_self.props.selected;
					}
				})
			})
			this.props.onChange(autoval);
			return true;
		}else{
			return true;
		}
	}
	render(){
		var _self=this;
		return (
			<div className={style.course_left_grade}>
				{
				this.props.AcademicStage.map(function(item){
					return (
						<div key={item.id} className={style.grade_border_bott}>
							<span 
								className={`${style.grade_title} ${_self.props.selected==item.id?style.active:""}`}
								onClick={()=>this.props.onChange(item.id)}
							>{item.acadStageName}</span>
							<ul>
							{
								item.acadClasf.map(function(item2){
									return (
										<li 
											className={`${_self.props.selected==item2.id?style.active:""}`}  
											key={item2.id}
											onClick={()=>_self.props.onChange(item2.id)}
										>{item2.acadClasfName}</li>)
								})
							}
							</ul>
						</div>
					)
				})
				}
			</div>
		)
	}
	// getAutoVal(){
	// 	var autoval = "";
	// 	var l = this.props.AcademicStage.length;
	// 	for(var i=0;i<l;i++){
	// 		var elem = this.props.AcademicStage[i];
	// 		if(i=0){
	// 			autoval = elem.id;
	// 		}
	// 		for(var j=0,m=elem.acadClasf.length;j<m;j++){
	// 			if(j=0){
	// 				autoval=elem.acadClasf[j].id;
	// 				break;
	// 			}
	// 		}
	// 		break;
	// 	}
	// 	this.props.AcademicStage
	// }
}
export default SelectCourseLeft