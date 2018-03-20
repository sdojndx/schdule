import style from '../../style/achievement.scss'
import React, { Component } from "react"
import Button from '../common/buttons'
import { post, fileimport, exporttemplate, alert } from "../common/pubfn"
import PageNav from '../common/pagenav'
import Form from '../common/form/form'
import FormWin from "../win/formwin"
import AlertWin from "../win/alertwin"
import { SearchAnimate } from "../common/animate"
class Achievement extends Component {
	constructor() {
		super();
		this.state = {
			searchSource: [{
				width: 190,
				height: '32px',
				name: "examBatchID",
				lable: '考试名称',
				star: false,
				type: 202,
				source: "ExamBatch",
				paraname:{
					id:"acadTermID",
				}
			}, {
				width: 190,
				height: '32px',
				name: "acadClasfID",
				lable: '年级',
				star: false,
				type: 202,
				source: "AcadClasf",
				effect:[
					"classGroupID"
				]
			}, {
				width: 190,
				height: '32px',
				name: "classGroupID",
				lable: '所属行政班',
				star: false,
				type: 202,
				source: "UserClass",
				hasall:"全部",
				paraname:{
					id:"acadTermID",
					id1:"acadClasfID"
				}
			}, {
				width: 190,
				height: '32px',
				name: 'studentName',
				lable: '学生姓名',
				star: false,
				type: 200
			}],
			formSource: [{
				width: 200,
				name: "examBatchName",
				lable: '考试名称',
				star: false,
				placeholder: '',
				after: '',
				type: 200
			},{
				width: 200,
				name: "acadTermID",
				lable: '学年学期',
				star: false,
				placeholder: '',
				after: '',
				type: 202,
				source: "AcadYearTerm",
			},{
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
			},
			achiList: [

			],
			showSearchOrNot:true,
			searchShowOrHide:false,
		}
	}
	componentDidMount() {
		//this.getList({data:Object.assign({},this.state.searchData)});
	}
	render() {
		var listTitle="";
		if(this.state.achiList.length>0){
			listTitle=this.state.achiList[0].acadClasfName+this.state.achiList[0].acadYearName+this.state.achiList[0].acadTermName+this.state.achiList[0].examBatchName
		}
		return (
			<PageNav 
				firstClassTit="成绩管理" 
				hasSelect="1"
				val = {this.state.searchData.acadTermID}
				onChange = {(val)=>this.getSearchVal({acadTermID:val},"acadTermID",val)}
			>

				<div className={style.achievement_container}>
					<SearchAnimate>
						<div 
							className={style.achievement_top}
							visible={this.state.showSearchOrNot}
							style={{display: this.state.showSearchOrNot?"block":"none"}}
						>
							{/* select部分 */}
							<Form 
								showType='search'
								margin='0 0 0 90px'
								formData={this.state.searchData} 
								formSource={this.state.searchSource}
								onChange={this.getSearchVal.bind(this)}
								onSourceEffect={(source)=>this.setState({searchSource:source})}
								onInit={this.getList.bind(this,{data:Object.assign({},this.state.searchData)})}
							/>
							<div
								className={style.searchBtn}
								onClick={this.getList.bind(this,{data:Object.assign({},this.state.searchData)})} 
							>
								搜索
							</div>
							<div className={style.searchUp_down}>
								<span className={style.angle_down} onClick={() => this.searchUp()}>
									<i className="fa fa-angle-up"> </i>
								</span>
							</div>
						</div>
					</SearchAnimate>

					<div className={style.searchUp} style={{display: this.state.searchShowOrHide?"block":"none"}}>
						<span className={style.searchUpText} onClick={() => this.searchUp()}>
							<i className="fa fa-angle-down"> </i>
						</span>
					</div>
					{/* 选框部分 - 按钮部分-----表头*/}
					<div className={style.list_content_title}>
						<p className={style.achievement_form_title}>
							{listTitle}考试成绩表
						</p>
						<div className={style.achievement_import_box}>
							<span className={style.achievement_import_title}
								onClick={this.exportTemplate.bind(this)}
							>下载导入模板</span>
							<Button
								btnName='+导入成绩表'
								onClick={this.swFormShow.bind(this)}
								style={{ height: '35', width: '115px', backgroundColor: '#e8f6ff', color: '#3e91eb', border: '1px solid #95cef5', boxSizing: 'border-box', fontSize: '16px', margin: '0 0 0 20px', }}
							/>
							{/* <Button
									btnName='导出成绩表' 
									// style={{height: '35px',lineHeight: '35px',width: '115px',backgroundColor: '#e8f6ff',color: '#3e91eb',border: '1px solid #95cef5',boxSizing: 'border-box',fontSize: '16px',margin: '0 0 0 20px'}}
								/> */}
						</div>
					</div>
				</div>
				{/* =======表格部分===== */}
				<div className={style.achievement_studentList}>
					<table>
						<tbody>
							<tr className={style.list_outfit}>
								<th  rowSpan="2"> 序号<i> </i></th>
								<th  rowSpan="2"> 校区<i> </i></th>
								<th  rowSpan="2">学生姓名<i> </i></th>
								<th  rowSpan="2">ID号<i> </i></th>
								<th  rowSpan="2">所属行政班<i> </i></th>
								<th colSpan="2"><span className={style.th_line}>总分<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>语文<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>数学<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>英语<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>物理<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>化学<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>生物<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>历史<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>地理<i> </i></span></th>
								<th colSpan="2"><span className={style.th_line}>政治<i> </i></span></th>
							</tr>
							<tr className={style.list_outfit}>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
								<th>成绩</th>
								<th>排名</th>
							</tr>
							{/* 表数据 */}
							{this.state.achiList.map((item, index) => {
								return (
									<tr key={index} index className={style.table_list}>
										<td>{index + 1}</td>
										<td >{item.areaName}</td>
										<td >{item.studentName}</td>
										<td >{item.account}</td>
										<td >{item.userClassName}</td>
										<td>{item.score}</td>
										<td>{item.scoreRank}</td>
										<td>{item.chinese}</td>
										<td>{item.chineseRank}</td>
										<td>{item.math}</td>
										<td>{item.mathRank}</td>
										<td>{item.english}</td>
										<td>{item.englishRank}</td>
										<td>{item.physics}</td>
										<td>{item.physicsRank}</td>
										<td>{item.chemistry}</td>
										<td>{item.chemistryRank}</td>
										<td>{item.biology}</td>
										<td>{item.biologyRank}</td>
										<td>{item.history}</td>
										<td>{item.historyRank}</td>
										<td>{item.geography}</td>
										<td>{item.geographyRank}</td>
										<td>{item.politics}</td>
										<td>{item.politicsRank}</td>
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
			</PageNav >
		)
	}
	getVal(data,name, val) {
		this.setState({ formData: Object.assign({},this.state.formData, data) })
	}
	getSearchVal(data,name, id) {
		var _self=this;
		var searchinfo = Object.assign({},this.state.searchData,data);
		this.setState({searchData:searchinfo});
		var searchSource = _self.state.searchSource.slice();
		if(name=="acadTermID"){
			searchSource.map(function(item,index){
				if(item.name=="examBatchID"){
					var para = {};
					if(!item.para){
						para={}
					}else{						
						para = Object.assign({},item.para);
					}
					para.id=id;
					item.para=para;
				}
				if(item.name=="classGroupID"){
					var para = {};
					if(!item.para){
						para={}
					}else{						
						para = Object.assign({},item.para);
					}
					para.id=id
					item.para=para;
				}
			})
			_self.setState({searchSource:searchSource});
		}
	}
	searchUp() {
		this.setState({ showSearchOrNot: !this.state.showSearchOrNot,searchShowOrHide:!this.state.searchShowOrHide});
	}
	swFormShow() {
		this.setState({ formShow: !this.state.formShow })
	}
	formSubmit() {
		var para = Object.assign({},this.state.formData);
		para.pathName = this.state.formData.path.name
		para.path = this.state.formData.path.url
		if(this.props.authority.scoreImport){
			fileimport(this.props.authority.scoreImport.sourceCode, para).then(function (json) {
				if(json.code==1){
					alert("导入成功");
				}
			})
		}
	}
	getList(para) {
		var _self=this;
		if (this.props.authority.getlist) {
			post(this.props.authority.getlist.sourceCode,para).then(function(json){
				_self.setState({achiList:json.data});
			}).catch(function(){
				
			})  
		}
	}

	//下载导入模板
	exportTemplate(){
		var _self = this;
		if(this.props.authority.exportTemplate){
			exporttemplate(this.props.authority.exportTemplate.sourceCode).then(function(json){
				if(json.code==1){
					alert("模板下载成功");
				}
			})
		}
	}
}
export default Achievement