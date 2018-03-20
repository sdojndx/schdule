import style from "../../style/classmanage.scss"
import styles from "../../style/selectcourse.scss"
import React, { Component } from "react"
import { Link } from "react-router"
import Page from '../common/page'
import AlertWin from '../win/alertwin'
import Input from '../common/form/input'
import SelectLeft from '../common/stylepart/selectleft'
import requestpath from "../../datesource/requestpath"
import Form from '../common/form/form'
import PageNav from '../common/pagenav'
import { post } from "../common/pubfn"
import Paging from "../common/paging/paging"

class StudentCourse extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isShow: false,
			AcademicStage: [],
			classList: [],

			// =====
			searchSource: [{
				name: "requestTaskId",
				lable: '任务名称',
				type: 220,
				source: "RequestTask",
				paraname: {
					id: "acadTermId",
					id1: "acadSclasfId"
				}
			}, {
				name: "courseTypeID",
				lable: '课程类别',
				hasall: "全部",
				type: 220,
				source: "CourseType"
			}],
			searchData: {
				acadTermId: "",
				acadSclasfId: "",
				requestTaskId: "",
				courseTypeID: "",
			},
			paging: {
				pageIndex: 1,
				totalCount: 0,
				pageSize: 10,
				totalPage: 0
			}
		}
	}
	render() {
		return (
			<div className={styles.courseCase}>
				<SelectLeft
					AcademicStage={this.state.AcademicStage}
					selected={this.state.searchData.acadSclasfId}
					onChange={(val) => this.getSearchVal({ "acadSclasfId": val }, "acadSclasfId", val)}
				/>
				<PageNav
					style={{
						float: "right",
						width: 980,
						marginTop: 0,
						backgroundColor: "#fff",
						border: 0
					}}
					firstClassTit="学生选课明细"
					hasSelect="1"
					val={this.state.searchData.acadTermId}
					onChange={(val) => this.getSearchVal({ acadTermId: val }, "acadTermId", val)}
				>

					<div className={style.class_box_big_top}>
						<Form
							showType='choice'
							formData={this.state.searchData}
							formSource={this.state.searchSource}
							onChange={this.getSearchVal.bind(this)}
						/>
						<span className={style.line_student}></span>
						<div className={style.class_box_btn}>
							<h3>选课课程列表</h3>
							{/* <span className={`${style.exportForm} ${style.exportForm_orange}`}>批量分班</span>
			  <span className={`${style.exportForm} ${style.exportForm_green}`}>批量审核选课</span>
			  <span className={style.exportForm}><i className="fa fa-sign-out"> </i>批量导出</span> 
			  <span className={style.class_choose_list}>课程总计：<i ></i>门</span>*/}
						</div>
					</div>
					{/* ===============表格=================== */}
					<div className={style.studentList}>
						<table>
							<tbody>
								<tr className={style.list_outfit}>
									{/* <th><span className={style.list_first_th}><input type="checkbox"/>全选</span></th> */}
									<th className={style.first_th_stumanage}><input type="checkbox" className={style.checkbox_stumanage} /><span>全选</span></th>
									<th className={style.second_th_stumanage}><span>序号</span></th>
									<th className={style.three_th_stumanage}><span>课程名称</span></th>
									<th className={style.four_th_stumanage}><span>所属层级</span></th>
									<th className={style.six_th_stumanage}><span>限选</span></th>
									<th className={style.seven_th_stumanage}><span>已选</span></th>
									<th className={style.eight_th_stumanage}><span>已审核</span></th>
									<th className={style.nine_th_stumanage}><span>分班情况</span></th>
									<th className={style.ten_th_stumanage}><span>操作</span></th>
								</tr>
								{
									this.state.classList.map((item, index) => {
										return (
											<tr key={item.id}>
												<td><input type="checkbox" className={style.checkbox_student} /></td>
												<td>{index + 1}</td>
												<td>{item.classCourseName}</td>
												<td>{item.instrTypeName}</td>
												<td>{item.requestLimited}</td>
												<td>{item.selectedStudent}</td>
												<td>{item.approvedStudent}</td>
												<td>{item.courseClassCount}</td>
												<td>
													<Link 
														className={style.operation} 
														to={`studentcourse/namelist/${item.id}`}
													>
														{`(${item.selectedStudent})名单`}
													</Link>
												</td>
											</tr>
										)
									})
								}</tbody>
						</table>
					</div>
					<Paging
						style={{ marginBottom: 25 }}
						paging={this.state.paging}
						onPageChange={this.onPageChange.bind(this)}
					/>
					{/*<AlertWin
			width="900"
			height='400'
			navTitle="自动分班"
			navSecondTitle='（初中七年级 数学A层）'
			bgcolor='#f9f9f9'
			top="150px"
			btnLeftName="取消"
			btnRightName="保存"
			show={this.isShowOrNot.bind(this)}
			isShow={this.state.isShow}
			btnCounts="2"
		  >
			<div className={style.alert_auto_division}>
			  <span className={style.alert_auto_info}>课程数目：1门</span>
			  <span className={style.alert_auto_info}>选课人数：119人</span>
			  <span className={style.alert_auto_info}>班额：3个班</span>
			</div>
			<div className={`${style.form_box} ${style.alert_auto_add}`}>
			  <div className={style.form_text_box}>
				<span className={style.form_star}>*</span>
				<span className={style.form_name}>操场名称</span>:
			</div>
			  <Input
				width='80px'
				height='30px'
				margin='5px 10px 0 0'
			  />
			  <span>剩余<i className={style.form_star}>3</i>人</span>
			</div>
			<div className={style.alert_auto_checkbox}>
			  <div className={style.alert_checkbox_box}>
				<input type="checkbox" value="余数平均分到各班" />余数平均分到各班
			</div>
			  <div className={style.alert_checkbox_box}>
				<input type="checkbox" value="余数集中进到第一个班" />余数集中进到第一个班
			</div>
			  <div className={style.alert_checkbox_box}>
				<input type="checkbox" value="余数独立成班" />余数独立成班
			</div>
			</div>
		  </AlertWin>*/}
				</PageNav>
			</div>
		)
	}
	isShowOrNot(show) {
		this.setState({ isShow: !this.state.isShow })
	}
	getSearchVal(data, name, val) {
		var _self = this;
		var obj = Object.assign({}, this.state.searchData, data);
		this.setState({ searchData: obj });
		if (name == "acadTermId") {
			post(this.props.authority.getAcademicStage.sourceCode, { data: val }).then(function (json) {
				_self.setState({ AcademicStage: json.data, searchData: Object.assign({}, _self.state.searchData, { acadTermId: val }) })
			}).catch()
		}
		if (name == "acadSclasfId") {
			var searchSource = _self.state.searchSource.slice();
			searchSource.map(function (item, index) {
				if (item.name == "requestTaskId") {
					var para = {};
					if (!item.para) {
						para = {}
					} else {
						para = Object.assign({}, item.para);
					}
					para.id = _self.state.searchData.acadTermId;
					para.id1 = val;
					item.para = para;
				}
			})
			_self.setState({ searchSource: searchSource });
		}
		if (name == "requestTaskId" || name == "courseTypeID") {
			var { acadTermId, requestTaskId, courseTypeID } = this.state.searchData;
			if (name == "requestTaskId") {
				requestTaskId = val;
			} else {
				courseTypeID = val;
			}
			if (requestTaskId && courseTypeID) {
				var dataInfo = {
					"data": {
						acadTermId: acadTermId,
						requestTaskId: requestTaskId,
						courseTypeID: courseTypeID
					},
					"pageSize": this.state.paging.pageSize,
					"pageIndex": this.state.paging.pageIndex
				}
				this.getCourseList(dataInfo);
			}
		}
	}
	getCourseList(para) {
		var _self = this;
		post(this.props.authority.taskcourselist.sourceCode, para).then(function (json) {
			_self.setState({
				classList: json.items,
				paging: {
					pageIndex:para.pageIndex,
					totalCount:json.totalCount,
					pageSize:para.pageSize
				}
			});
		}).catch()
	}
	onPageChange(pageIndex, pageSize) {
		var { acadTermId, requestTaskId, courseTypeID } = this.state.searchData
		var dataInfo = {
			"data": {
				acadTermId: acadTermId,
				requestTaskId: requestTaskId,
				courseTypeID: courseTypeID
			},
			"pageSize": pageSize,
			"pageIndex": pageIndex
		}
		this.getCourseList(dataInfo);
	}
}
export default StudentCourse