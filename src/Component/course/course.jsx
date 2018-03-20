import style from '../../style/course.scss'
import React, { Component } from "react"
import { Link } from 'react-router'
import Button from '../common/buttons'
import { post, fileimport, exporttemplate, alert} from "../common/pubfn"
import PageNav from '../common/pagenav'
import Form from '../common/form/form'
import FormWin from "../win/formwin"
import AlertWin from "../win/alertwin"
import Paging from "../common/paging/paging"
import Note from "../common/noticedetail"
import { SearchAnimate } from "../common/animate"
class Course extends Component {
	constructor() {
		super();
		this.state = {
			termSource: {
				
			},
			searchSource: [{
				width: 190,
				height: '32px',
				name: "courseName",
				lable: '课程名称',
				type: 200
			},{
				width: 190,
				height: '32px',
				name: "clasfID",
				lable: '年级',
				star: false,
				type: 202,
				source: "AcadClasf"
			},{
				width: 190,
				height: '32px',
				name: "subjectID",
				lable: '所属学科',
				star: false,
				type: 202,
				source: "Subject",
				hasall:"全部",
			}, {
				width: 190,
				height: '32px',
				name: 'teacherName',
				lable: '任课教师',
				star: false,
				type: 200
			}],
			formSource: [{
				width: 200,
				name: "path",
				lable: '批量导入文件',
				star: false,
				placeholder: '',
				after: '',
				type: 218
			}],
			formData: {
				
			},
			searchData: {
				"courseName":"",
				"clasfID":"",
				"subjectID":"",
				"teacherName":"",
				"acadTermID":""
			},
			achiList: [

			],
			paging:{
				pageIndex:1,
				totalCount:0,
				pageSize:10,
				totalPage:0
			},
			searchShowOrHide:false,
			hideSearchOrNot:true,
		}
	}
	componentDidMount() {
		//this.getList({data:this.state.searchData});
	}
	render() {
		var {pageSize,pageIndex} = this.state.paging;
		var searchEle=(
			<SearchAnimate>
				<div
					visible={this.state.hideSearchOrNot}
					className={style.searchCondition}
				>
					{/* select部分 */}
					<Form 
						showType='search'
						margin='0 0 0 90px'
						formData={this.state.searchData} 
						formSource={this.state.searchSource}
						onChange={this.getSearchVal.bind(this)}
						onInit={this.getList.bind(this,{data:Object.assign({},this.state.searchData),pageSize:pageSize,pageIndex:pageIndex})}
					/>
					<div onClick={this.getList.bind(this,{data:Object.assign({},this.state.searchData),pageSize:pageSize,pageIndex:pageIndex})}
						className={style.searchBtn}>搜索</div>
					<div className={style.searchUp_down}>
						<span className={style.angle_down} onClick={() => this.searchUp()}>
							<i className="fa fa-angle-up"> </i>
						</span>
					</div>
				</div>
			</SearchAnimate>
			)
		return (
			<PageNav 
				firstClassTit="课程管理" 
				hasSelect="1"
				val = {this.state.searchData.acadTermID}
				onChange = {(val)=>this.getSearchVal({acadTermID:val},"acadTermID",val)}
			>
				<div className={style.achievement_container}>
					{searchEle}
					<div className={style.searchUp} style={{display: this.state.searchShowOrHide?"block":"none"}}>
						<span className={style.searchUpText} onClick={() => this.searchUp()}>
							<i className="fa fa-angle-down"> </i>
						</span>
					</div>
					{/* 选框部分 - 按钮部分-----表头*/}
					<div className={style.listTitle}>
						<p className={style.listTitleName}>
							课程列表
						</p>
						{/*//<span>共<strong>{this.state.paging.totalCount}</strong>门课程</span>*/}
						<Button
							btnName='+导入课程'
							onClick={this.swFormShow.bind(this)}
							style={{ float:"right",height: '35', width: '115px', backgroundColor: '#e8f6ff', color: '#3e91eb', border: '1px solid #95cef5', boxSizing: 'border-box', fontSize: '16px', margin: '0 0 0 20px', }}
						/>
						<span className={style.curse_import_title}
							onClick={this.exportTemplate.bind(this)}
						>下载导入模板</span>
						{/* <span className={style.exportForm}><i className="fa fa-upload"> </i>批量导出</span> */}
					</div>
				</div>
				{/* =======表格部分===== */}
				<div className={style.list_content}>
					<table>
						<thead>
							<tr>
								<th> 序号<i> </i></th>
								<th>课程名称<i> </i></th>
								<th>课程类别<i> </i></th>
								<th>所属科目<i> </i></th>
								<th>是否走班<i> </i></th>
								<th>教学模式<i> </i></th>
								<th> 层级<i> </i></th>
								<th>年级<i> </i></th>
								<th>周课时<i> </i></th>
								<th>开课班级数<i> </i></th>
								<th>限选人数<i> </i></th>
								<th>任课教师<i> </i></th>
								<th>课程说明<i> </i></th>
							</tr>
						</thead>
						<tbody>
							
							{/* 表数据 */}
							{this.state.achiList.map((item, index) => {
								{	var classOrNot="";
									if(item.isClazz==0){
										classOrNot="否"
									}else if(item.isClazz==1){
										classOrNot="是"
									}else{
										classOrNot="--"
									}
								}
								return (
									<tr key={index} index className={style.table_list}>
										<td>{index + 1}</td>
										<td>{item.title||"--"}</td>
										<td>{item.courseTypeName||"--"}</td>
										<td>{item.subjectName||"--"}</td>
										<td>{classOrNot}</td>
										<td>{item.instrTypeName||"--"}</td>
										<td>{item.instrLevelName||"--"}</td>
										<td>{item.acadClasfName||"--"}</td>
										<td>{item.minPerWk||"--"}</td>
										<td>{item.nbrClazz||"--"}</td>
										<td>{item.nbrExpectedStdents||"--"}</td>
										<td>{item.teachers||"--"}</td>
										<Note note={item.note||"--"}/>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
				<FormWin
					navTitle="导入成绩表"
					isShow={this.state.formShow}
					formSource={this.state.formSource}
					formData={this.state.formData}
					close={this.swFormShow.bind(this)}
					submit={this.formSubmit.bind(this,)}
					onChange={this.getVal.bind(this)}
					btnLeftName="取消"
					btnRightName="确定"
					paddingLeft='200px'
				>
				</FormWin>
				<Paging 
					style={{marginBottom:25}}
					paging = {this.state.paging}
					onPageChange = {this.onPageChange.bind(this)}
				/>
			</PageNav >
		)
	}
	onPageChange(pageIndex,pageSize){
		this.getList({data:this.state.searchData,pageSize:pageSize,pageIndex:pageIndex});
	}
	getVal(data,name, val) {
		this.setState({ formData: Object.assign({},this.state.formData, data) })
	}
	getSearchVal(data,name, id) {
		var _self=this;
		var searchinfo = Object.assign({},this.state.searchData,data);
		this.setState({searchData:searchinfo});
	}
	//searchInfo() {
	//	var _self = this;
	//	var dataInfo = {
	//		data: _self.state.formData
	//	};
	//	post(this.props.authority.getList.sourceCode, dataInfo).then(function (json) {
	//		_self.setState({ achiList: json.data });
	//	}).catch(function () { })
	//}
	searchUp() {
		this.setState({ hideSearchOrNot: !this.state.hideSearchOrNot,searchShowOrHide:!this.state.searchShowOrHide});
	}
	swFormShow() {
		this.setState({ formShow: !this.state.formShow })
	}
	formSubmit(para) {
		var _self=this;
		var para = {
			path:this.state.formData.path.url,
			pathName:this.state.formData.path.name
		};
		if(this.props.authority.courseImportTemplate){//aaaadsff
			//var data=newdata.acadTermID=this.state.searchData.acadTermID;
			fileimport(this.props.authority.courseImportTemplate.sourceCode, Object.assign({},para,{acadTermID:this.state.searchData.acadTermID})).then(function (json) {
				if(json.code==1){
					alert("导入成功");
				}
			})
		}
	}
	getList(para) {
		var _self=this;
		if (this.props.authority.getList) {
			post(this.props.authority.getList.sourceCode,para).then(function(json){
				_self.setState({
					achiList:json.items,
					paging:{
						pageIndex:para.pageIndex,
						totalCount:json.totalCount,
						pageSize:para.pageSize
				}});
				_self.setState({achiList:json.items});
			}).catch(function(){
				
			})  
		}
	}
	//下载导入模板
	exportTemplate(){
		var _self = this;
		if(this.props.authority.courseImporttemplatedownload){
			exporttemplate(this.props.authority.courseImporttemplatedownload.sourceCode).then(function(json){
				if(json.code==1){
					alert("模板下载成功");
				}else{
					alert(json.message);
				}
			})
		}
	}
}
export default Course