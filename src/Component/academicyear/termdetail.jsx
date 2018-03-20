import style from "../../style/academicyear.scss"
import React, { Component } from "react"
import PageNav from "../common/pagenav"
import Button from "../common/buttons"
import { History } from "react-router"
import { post, getUrlInfo, selectDay, stampToDay } from "../common/pubfn"
import TrTotal from './trtotal'
import AlertBoxSmall from "../common/alertboxsmall"


class TermDetail extends Component {
	constructor() {
		super();
		this.state = {
			// isShowInput: false,
			deleteIndex: "",
			isShowDe: false,
			termList: [],
			formEditData: {

			},
			formData: {
				createDate: ["2017-01-02", "2018-02-28"]
			}
		}
	}
	mixins: [History];
	componentDidMount() {
		this.getList()
	}

	render() {
		var navName=getUrlInfo().acadYearName;
		return (
			<PageNav
				firstClassTit="学期列表"
				secondClassTit={navName}
			>
				<div className={style.listDetail}>
					<div className={style.btn_con_top}>
						<Button
							className="addClass"
							btnName="+添加学期"
							style={{ width: '145px', height: '36', float: "right", backgroundColor: "#3e91eb" }}
							onClick={this.addTr.bind(this)}
						/>
					</div>
					{/* 表格 */}
					<div className={style.list_con}>
						<table>
							<tbody>
								<tr className={style.list_outfit}>
									<th><span>序号</span></th>
									<th><span>学期名称</span></th>
									<th><span>天数</span></th>
									<th><span>起止时间</span></th>
									<th><span>学习状态</span></th>
								</tr>
								{this.state.termList.map((item, index) => (
									<TrTotal
										key={index}
										item={item}
										index={index}
										getVal={(name,val,index)=>this.getEditVal(name,val,index)}
										getTimeVal={(moment,times)=>this.getTimeVal(times,index)}
										deleteTr={this.deleteTr.bind(this, index)}
									//showAlert={this.isShowOrNotDe.bind(this)}
									/>
								))}
							</tbody>
						</table>
					</div>
					<span className={style.notice}>
						温馨提示：建议学期的开始时间为真正上课的时间，结束时间为放假时间。
					</span>
					<div className={style.btn_con_bottom}>
						<Button
							className="goBack"
							btnName="返回"
							style={{ width: "100px", height: "36", backgroundColor: "#3e91eb" }}
							onClick={() => this.props.history.goBack()}
						/>
						<Button
							className="save"
							btnName="保存"
							style={{ width: "100px", height: "36", backgroundColor: "#f59524", marginLeft: "20px" }}
							onClick={this.formEdit.bind(this)}
						/>
					</div>
				</div>
				<AlertBoxSmall
					width="600px"
					height="250px"
					bgColor="#ffffff"
					contentMargin="90px 0 45px 55px"
					alertText="确认删除吗？"
					btnLeftName="取消"
					btnRightName="确定"
					show={this.isShowOrNotDe.bind(this)}
					isShow={this.state.isShowDe}
					btnSum="2"
					clickRight={this.deleteTrDe.bind(this)}
				>
					<div className={style.delete_bg}>
					</div>
				</AlertBoxSmall>
			</PageNav>
		)
	}
	//获取列表
	getList() {
		var _self = this;
		var termData = { data: _self.props.params.taskId }
		post(this.props.authority.acadTermShowInfo.sourceCode, termData
		).then(function (json) {
			_self.setState({ termList: json.data })

		}).catch(function () {
		})
	}
	//保存编辑
	formEdit() {
		var _self = this
		var list = [];
		_self.state.termList.map((item, index) => {
			var { id, acadYearID, acadTermName, dayNum, weekNum, beginDateTime, endDateTime } = item
			var data = {}
			data.id = id
			data.acadYearID = acadYearID
			data.acadTermName = item.acadTermName
			data.beginDateTime = item.beginDateTime;
			data.endDateTime = item.endDateTime;
			data.dayNum = parseInt(`${selectDay(item.beginDateTime, item.endDateTime)}`)
			data.weekNum = parseInt(`${Math.floor(selectDay(item.beginDateTime, item.endDateTime) / 7)}`)
			data.operate = 'update'
			list.push(data);
		})
		post(_self.props.authority.updateAcadTerm.sourceCode, {  data:list,sortName:getUrlInfo().acadYearID })
			.then((json) => {
				_self.getList()
			})
			.catch((error) => {
			})

	}
	//修改学期名称
	getEditVal(name, val, index) {
		var list = this.state.termList.slice();
		var item = Object.assign({}, list[index]);
		list[index] = item;
		item.acadTermName = val;
		this.setState({ termList: list });
	}
	//修改时间
	getTimeVal(times, index) {
		var list = this.state.termList.slice();
		var item = Object.assign({}, list[index]);
		list[index] = item;
		if(times[0]!=""){
			item.beginDateTime = new Date(times[0]).getTime();
		}else{
			item.beginDateTime = ""
		}
		if(times[0]!=""){
			item.endDateTime = new Date(times[1]).getTime();
		}else{
			item.endDateTime = ""
		}
		this.setState({ termList: list });
	}

	addTr() {
		var list = this.state.termList.slice();
		list.push({ acadTermName: "", acadYearID: this.props.params.taskId, id: "" });
		this.setState({ termList: list })
	}
	deleteTr(index) {
		this.setState({ deleteIndex: index });
		this.isShowOrNotDe();
		// var list = this.state.termList.slice();
		// var deleteList = list.splice(index, 1);
		// this.setState({ termList: list });
		// this.isShowOrNotDe()
	}
	deleteTrDe() {
		var index = this.state.deleteIndex;
		var list = this.state.termList.slice();
		var deleteList = list.splice(index, 1);
		this.setState({ termList: list });
		this.isShowOrNotDe();
	}
	isShowOrNotDe(show) {
		this.setState({ isShowDe: !this.state.isShowDe })
	}
}
export default TermDetail