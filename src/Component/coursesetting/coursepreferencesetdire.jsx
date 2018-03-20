import style from "../../style/coursepreferenceset.scss"
import React,{Component} from "react"
import PageNav from "../common/pagenav"
import DropDownSelect from "../common/form/dropdownselect"
import Buttons from "../common/buttons"
import {post} from "../common/pubfn"
import AlertWin from "../win/alertwin"
import {Link} from 'react-router'

class CoursePreferenceSet extends Component{
	constructor(props){
		super(props);
		this.state={
			//totalScore:0启用，1停用
			courceList:[],
			alertShow:false,
		}
	}
	componentDidMount(){
		this.showPreference();
	}
	render(){
		return(
			<PageNav firstClassTit="查看选课偏好设置" secondClassTit="">
				<div className={style.courseList}>
					<table>
						<tbody>
						<tr className={style.list_outfit}>
							<th rowSpan="2">序号<i> </i></th>
							<th rowSpan="2">课程名称<i> </i></th>
							<th>课程<i> </i></th>
							<th>所属<i> </i></th>
							<th rowSpan="2">所属年级<i> </i></th>
							<th>限选<i> </i></th>
							<th rowSpan="2">周课时<i> </i></th>
							<th>性别<i> </i></th>
							<th colSpan="2" ><span className={style.th_line}>单科要求</span><i> </i></th>
							<th colSpan="2" ><span className={style.th_line}>总分要求</span><i> </i></th>
							<th rowSpan="2">同时符合人数<i> </i></th>
						</tr>
						<tr className={style.list_outfit}>
							<td>层级</td>
							<td>学科</td>
							<td>人数</td>
							<td>要求</td>
							<td>排名范围</td>
							<td>符合人数</td>
							<td>排名范围</td>
							<td>符合人数</td>
						</tr>
						{
							this.state.courceList.map((item,index) => {
								var sex="";
								if(item.sex=="-1"){
									sex="不限"
								}else if(item.sex=="0"){
									sex="女"
								}else if(item.sex=="1"){
									sex="男"
								}
								return(
								<tr key={index}>
									<td>{index+1}</td>
									<td>{item.className}</td>
									<td>{item.levelName}</td>
									<td>{item.subJectName}</td>
									<td>{item.acadClasfName}</td>
									<td>{item.requestLimited}</td>
									<td>{item.minPerWk}</td>
									<td>{sex}</td>
									<td>
										{item.singleSubjectStart==-1?"":item.singleSubjectStart}
										-
										{item.singleSubjectEnd==-1?"":item.singleSubjectEnd}
									</td>
									<td>{`${item.singleSubjectTotal} ( ${item.singleSubjectPercentage} )`}</td>
									<td>
										{item.allSubjectStart==-1?"":item.allSubjectStart}
										-
										{item.allSubjectEnd==-1?"":item.allSubjectEnd}
									</td>
									<td> 
										<span className={style.total_score}>
											{`${item.allSubjectTotal} ( ${item.allSubjectPercentage} )`}
										</span> 
									</td>
									<td>{item.totalPersons}</td>
								</tr>
								)
							})
						}
						</tbody>
					</table>
				</div>
				<Buttons
					style={{
						width:100,
						height:36,
						fontSize:16,
						marginLeft:495,
						backgroundColor:"#3e91eb",
						float:"left"
					}}
					btnName="返回"
					onClick={()=>this.props.history.goBack()}
				/>
				<span className={style.content_bottom}> </span>                
				<AlertWin
					width="500px"
					bgcolor="#ffffff"
					navTitle="提示"
					btnName="确定"
					bgColor="#3e91eb"
					isShow={this.state.alertShow}
					close={this.closeAlertWin.bind(this)}
					btnAct={this.swAlertWin.bind(this)}
				>
					<p 
						style={{
							width: "100%",
							textAlign: "center",
							fontSize: "20",
							color: "#3f93eb"
						}}
					>
						添加偏好成功!
					</p>
				</AlertWin>
			</PageNav>
		)
	}
	showPreference(){
		var _self=this;
		post(this.props.authority.rulelist.sourceCode,{
			data:{requestTaskId:this.props.params.taskId}
		}).then(function(json){
			_self.setState({courceList:json.data})
		})
	}
	prefEdit(e,name,index){
		var _self=this;
		var list = this.state.courceList.slice();
		var obj = Object.assign({},list[index]);
		if(name=="sex"){
			obj.sex = e;
		}else{
			obj[name] = e.target.value;
		}
		list[index] = obj;
		var data={
			"taskId": list[index].taskId,
			"classId":list[index].classId,
			"acadTermId":list[index].acadTermId,
			"acadClasfId":list[index].acadClasfId,
			"sex":list[index].sex,
			"singleSubjectStart": list[index].singleSubjectStart,
			"singleSubjectEnd": list[index].singleSubjectEnd,
			"allSubjectStart": list[index].allSubjectStart,
			"allSubjectEnd": list[index].allSubjectEnd,
		}
		var url="schooladmin/courseselection/course/getcoursepercentage";
		this.setState({courceList:list});
		if(name=="singleSubjectStart"||name=="singleSubjectEnd"){
			if(list[index].singleSubjectStart!=-1&&list[index].singleSubjectEnd!=-1){
				post(url,{
					data:data
				}).then(function(json){
					var list = _self.state.courceList.slice();
					var percentList=Object.assign({},list[index]);
					percentList.singleSubjectStart=json.data.singleSubjectStart;
					percentList.singleSubjectEnd=json.data.singleSubjectEnd;
					percentList.singleSubjectPercentage=json.data.singleSubjectPercentage;
					percentList.singleSubjectTotal=json.data.singleSubjectTotal
					percentList.totalPersons=json.data.totalPersons
					list[index] =percentList;
					_self.setState({courceList:list});
				})
			}
		}else if(name=="allSubjectStart"||name=="allSubjectEnd"){
			if(list[index].allSubjectStart!=-1&&list[index].allSubjectEnd!=-1){
				post(url,{
					data:data
				}).then(function(json){
					var list = _self.state.courceList.slice();
					var percentList=Object.assign({},list[index]);
					percentList.allSubjectStart=json.data.allSubjectStart;
					percentList.allSubjectEnd=json.data.allSubjectEnd;
					percentList.allSubjectPercentage=json.data.allSubjectPercentage;
					percentList.allSubjectTotal=json.data.allSubjectTotal
					percentList.totalPersons=json.data.totalPersons
					list[index] =percentList;
					_self.setState({courceList:list});
				})
			}
		}
	}
	swAlertWin(){
		this.setState({alertShow:!this.state.alertShow});
	}
	closeAlertWin(){
		var _self=this;
		_self.props.history.push("coursesetting");
	}
}

export default CoursePreferenceSet