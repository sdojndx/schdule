import style from "../../style/stuchecklist.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import PageNav from '../common/pagenav'
import { post, stampToTime } from "../common/pubfn"


class CheckList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			studentLists: [],
			termInfo:""
		};
	}
	componentDidMount() {
		this.getList();
		this.getTermInfo();
	}
	render() {
		var status = {
			"1":"待审核",
			"2":"同意",
			"3":"不同意"
		}
		var info = this.state.termInfo.split("|");
		return (
			<div>
				<div className={style.list_title_container}>
					<p>选课结果</p>
					<p className={style.title_font}>{`${info[1]}${info[2]}`}</p>
				</div>
				<PageNav
					firstClassTit={info[0]}
					hasSelect="2"
				>
					<div className={style.list_title}>
						<p>已有课程列表</p>
						<p className={style.course_num}>共<span className={style.num}>{this.state.studentLists.length}</span>门课程</p>
					</div>
					<div className={style.studentList}>
						<table>
							<tbody>
								<tr className={style.list_outfit}>
									<th><span>序号</span></th>
									<th><span>课程名称</span></th>
									<th><span>所属层次</span></th>
									<th><span>已选/限选人数</span></th>
									<th><span>选课时间</span></th>
									<th><span>选课状态</span></th>
								</tr>
								{
									this.state.studentLists.map((item, index) => {
										return (<tr key={index} index>
											<td>{index + 1}</td>
											<td>{item.courseName}</td>
											<td>{item.instrTypeName}</td>
											<td>{`${item.choosenCount}/${item.requestLimited}`}</td>
											<td>{stampToTime(item.createDate)}</td>
											<td>{status[item.approvedStatus]}</td>
										</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</PageNav>
			</div>
		)
	}
	getList() {
		var _self = this;
		if (_self.props.authority.resultList) {
			post(_self.props.authority.resultList.sourceCode,
				{
					"data": _self.props.params.courseid
				}
			).then(function (json) {
				if (json.code == 1) {
					_self.setState({ "studentLists": json.data })
				} else {
				}

			})
		}
	}
	getTermInfo(){
		var _self = this;
		//if (_self.props.authority.getterm) {
			post("student/selectcourses/courseselection/getterm",//_self.props.authority.getterm.sourceCode,
				{
					"data": _self.props.params.courseid
				}
			).then(function (json) {
				if (json.code == 1) {
					_self.setState({ "termInfo": json.data })
				} else {
				}

			})
		//}
	}
}
export default CheckList