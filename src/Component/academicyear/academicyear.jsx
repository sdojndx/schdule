import style from "../../style/academicyear.scss"
import React, { Component } from "react"
import PageNav from "../common/pagenav"
import { post,eduValidForm,alert } from "../common/pubfn"
import StudyList from './studylist'
import FormWin from '../win/formwin'
class AcademicYear extends Component {
	constructor() {
		super();
		this.state = {
			//studyState:0未开始，1当前，2已结束
			isShow: false,
			showData: '',
			formData: {
				"id": "",
				"acadYearName": "",
				"beginDateTime": []
			},
			editList: [],
			yearList: [{
				acadYearName: "2018-2019学年",
				beginDateTime: "2018-02-05",
				endDateTime: "2019-03-05",
				studyState: "0",
				termURL: "/academicyear/termdetail"
			}, {
				studyName: "2017-2018学年",
				beginDate: "2018-02-05",
				endDate: "2019-03-05",
				studyState: "1",
				termURL: "/academicyear/termdetail"
			}, {
				studyName: "2016-2017学年",
				beginDate: "2018-02-05",
				endDate: "2019-03-05",
				studyState: "2",
				termURL: "/academicyear/termdetail"
			}, {
				studyName: "2016-dfsdf",
				beginDate: "2018-02-05",
				endDate: "2019-03-05",
				studyState: "2",
				termURL: "/academicyear/termdetail"
			}, {
				studyName: "2016-2017学年",
				beginDate: "2018-02-05",
				endDate: "2019-03-05",
				studyState: "1",
				termURL: "/academicyear/termdetail"
			}],
			formEditData: {},
			formSource: [{
				width: '200px',
				name: 'acadYearName',
				lable: '学年名称',
				vposition:"fixed",
				star: true,
				type: 200
			}, {
				width: '200px',
				name: 'acadYear',
				lable: '年份',
				type: 205
			}, {
				name: "beginDateTime",
				lable: '创建时间',
				star: false,
				type: 204
			}],
			editStudentData: {
				"id": "3",
				"status": 1
			},
		}
	}
	componentDidMount() {
		this.getStudentList()
	}
	render() {
		var {id,acadYearName,beginDateTime,endDateTime} = this.state.formData;
		return (
			<PageNav firstClassTit="学年列表" secondClassTit="">
				<FormWin
					showType='edit'
					timeWidth='320px'
					paddingLeft='140px'
					navTitle="编辑学校学年信息"
					isShow={this.state.isShow}
					formSource={this.state.formSource}
					formData={this.state.formData}
					close={this.isShowOrNot.bind(this)}
					submit={this.formEdit.bind(this)}
					onChange={this.getVal.bind(this)}
					btnLeftName="取消"
					btnRightName="保存"
				/>
				<div className={style.listDetail}>
					<ul className={style.sub_detail}>
						{this.state.yearList.map((elem, index) => (
							<StudyList
								item={elem}
								key={index}
								onEdit={this.openEdit.bind(this)}
								show={this.isShowOrNot.bind(this)}>
							</StudyList>
						))}
					</ul>
				</div>
			</PageNav>
		)
	}
	isShowOrNot(show) {
		this.setState({ isShow: !this.state.isShow })
	}
	//获取列表
	getStudentList() {
		var _self = this;
		var showData = {
			data: _self.state.showData
		}
		post(this.props.authority.getAcademicYear.sourceCode, showData)
			.then((json) => {
				_self.setState({ yearList: json.data });
			})
			.catch((error) => {
				
			})
	}

	//修改
	openEdit(item) {
		var formItem = Object.assign({}, item)
		formItem.beginDateTime = [formItem.beginDateTime,formItem.endDateTime]
		this.setState({ formData: formItem,isShow: !this.state.isShow});
		//this.isShowOrNot();
	}

	getVal(data, name, value) {
		this.setState({ formData: Object.assign(this.state.formData, data) })
	}
	formEdit() {
		var _self = this;
		var data = {};
		var result = eduValidForm(this.state.formSource,this.state.formData);
		if(result.ispass){
			if(this.state.formData.beginDateTime!=undefined){
				data.beginDateTime=this.state.formData.beginDateTime[0];
				data.endDateTime=this.state.formData.beginDateTime[1];
			}
			data.id=this.state.formData.id;
			data.acadYearName=this.state.formData.acadYearName;
			if(this.props.authority.updateacadyear) {
				post(this.props.authority.updateacadyear.sourceCode, {data:data}).then(function (json) {
					_self.getStudentList()
				})
			}
		}else{			
			return false
		}
	}
}
export default AcademicYear 