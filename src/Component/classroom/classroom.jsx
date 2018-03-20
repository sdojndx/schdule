import style from "../../style/classroom.scss"
import React, { Component } from "react"
import { post, eduValidForm, alert } from "../common/pubfn"
import PageNav from "../common/pagenav"
import HasNoItems from "../common/hasnoitems"
import Buttons from "../common/buttons"
import FormWin from "../win/formwin"
import GroundBox from './groundbox'
import BuildBox from './buildbox'
import AlertBoxSmall from '../win/alertboxsmall'
import Paging from "../common/paging/paging"
import Select from "../common/form/select";

class Classroom extends Component {
	constructor() {
		super()
		let _self = this;
		_self.state = {
			test: 1,
			deleteIndex: '',
			classroomlist: [],
			classroomWinShow: false,
			playgroundWinShow: false,
			isShowDe: false,
			isShowDeGround: false,
			isShowAdd: false,
			isShowEdit: false,
			isShowGroundEdit: false,
			isShowInfoEdit: false,
			showNone: false,
			paging: {
				pageIndex: 1,
				totalCount: 0,
				pageSize: 999,
				totalPage: 0
			},
			searchData: {

			},
			classroomSource: [{
				width: '270px',
				name: 'buildingName',
				lable: '楼宇名称',
				star: true,
				type: 200,
				maxLength: 15,
				vposition: "fixed"
			}],
			playgroundSource: [{
				width: '270px',
				name: 'buildingName',
				lable: '操场名称',
				star: true,
				type: 200,
				maxLength: 10,
				vposition: "fixed"
			}, {
				width: '270px',
				name: 'maxClassNum',
				lable: '同时上课的最大班级数',
				star: true,
				type: 200,
				validateType: 2,
				vposition: "fixed"
			}],
			editBuildSource: [{
				width: 200,
				name: 'buildingName',
				lable: '楼宇名称',
				star: true,
				type: 200,
				maxLength: 15,
				vposition: "fixed"
			},
			],
			editGroundSource: [{
				width: 200,
				name: 'buildingName',
				lable: '操场名称',
				star: true,
				type: 200,
				maxLength: 15,
				vposition: "fixed"
			},
			],
			infoEidtSource: [{
				width: 200,
				name: 'roomName',
				lable: '教室名称',
				star: true,
				type: 200,
				maxLength: 10,
				vposition: "fixed"
			}, {
				width: 200,
				name: 'roomTypeID',
				lable: '教室类型',
				star: true,
				type: 202,
				source: "RoomType",
				effect: ["subjectsList"]
			}, {
				width: 200,
				name: 'capacity',
				lable: '教室最大容量',
				star: true,
				after: '（人）',
				type: 200,
				validateType: 2,
				vposition: "fixed"
			}, {
				width: 200,
				name: 'layer',
				lable: '所在层',
				star: false,
				after: '（非必填）',
				type: 202,
				source: [
					{ value: "1", name: "--" },
					{ value: "2", name: "2" },
					{ value: "3", name: "3" },
					{ value: "4", name: "4" },
					{ value: "5", name: "5" },
					{ value: "6", name: "6" },
					{ value: "7", name: "7" },
					{ value: "8", name: "8" },
					{ value: "9", name: "9" }
				]
			}, {
				width: 200,
				name: 'subjectsList',
				lable: '适用学科',
				star: true,
				type: 208,
				source: "Subject",
				paraname: {
					id: 'roomTypeID'
				}
			}],
			formAddSource: [{
				width: 200,
				name: 'roomName',
				lable: '教室名称',
				star: true,
				type: 200,
				maxLength: 10,
				vposition: "fixed"
			}, {
				width: 200,
				name: 'roomTypeID',
				lable: '教室类型',
				star: true,
				type: 202,
				source: "RoomType",
				effect: ["subjectsList"]
			}, {
				width: 200,
				name: 'capacity',
				lable: '教室最大容量',
				star: true,
				after: '(人)',
				type: 200,
				vposition: "fixed"
			}, {
				width: 200,
				name: 'layer',
				lable: '所在层',
				star: 0,
				after: '(非必填)',
				type: 202,
				source: [
					{ value: "1", name: "--" },
					{ value: "2", name: "2" },
					{ value: "3", name: "3" },
					{ value: "4", name: "4" },
					{ value: "5", name: "5" },
					{ value: "6", name: "6" },
					{ value: "7", name: "7" },
					{ value: "8", name: "8" },
					{ value: "9", name: "9" }
				]
			}, {
				width: 200,
				name: 'subjectsList',
				lable: '适用学科',
				star: true,
				type: 208,
				source: "Subject",
				paraname: {
					id: 'roomTypeID'
				}
			}],
			classroomList: [
			],
			selectSource: [
				{ value: "0", name: "教室" },
				{ value: "1", name: "楼宇" },
				{ value: "2", name: "操场" }
			],
			classroomData: {

			},
			playgroundData: {

			},
			formAddData: {

			},
			editBuildData: {

			},
			editGroundData: {

			},
			infoEidtData: {

			},
			buildingList: [

			],
			deleteItemData: [

			],
			deleteItemIndex: '',
			searchVal: {

			},
			editShowBuildData: [

			],
			editShowGroundData: [

			],
			selectVal: {},
		}
	}
	componentDidMount() {
		var { pageSize, pageIndex } = this.state.paging;
		this.getClassRoomList({ pageSize, pageIndex });
	}
	render() {
		var content = ""
		var boxItem = []
		var itemRooms = []
		var roomLength = 0
		var roomSum = 0
		var len = this.state.buildingList.length;
		if (this.state.buildingList) {
			this.state.buildingList.map((item, index) => {
				if (item.rooms) {
					roomLength = item.rooms.length
				} else {
					roomLength = 0
				}
				if (item.rooms != null) {
					itemRooms = item.rooms
				} else {
					itemRooms = []
				}
				if (item.buildingType == '教学楼') {
					boxItem.push(
						<BuildBox
							key={index}
							index={index}
							item={item}
							buildingName={item.buildingName}
							classroomList={this.state.classroomList}
							isShowOrNotDe={this.isShowOrNotDe.bind(this)}
							isShowOrNotAdd={this.showAddRoomWin.bind(this, item)}
							editShowBuild={this.editShowBuild.bind(this)}
							deleteItem={this.deleteItem.bind(this)}
							setInfoEdit={this.setInfoEdit.bind(this)}
							authority={this.props.authority}
							rooms={item.rooms}
							showRoomsData={this.state.showRoomsData}
							getClassRoomList={this.getClassRoomList.bind(this)}
							paging={this.state.paging}
							islast={index == len - 1}
						/>
					)
				} else if (item.buildingType == "操场") {
					boxItem.push(
						<GroundBox
							key={index}
							index={index}
							item={item}
							buildingName={item.buildingName}
							itemRooms={itemRooms}
							editShowGround={this.editShowGround.bind(this)}
							deleteItemGround={this.deleteItemGround.bind(this)}
							islast={index == len - 1}
						/>
					)
				}
				roomSum += roomLength
			})
		} else {
			this.state.buildingList = []
		}

		if (this.state.classroomlist.totalCount == 0) {
			content = (
				<PageNav firstClassTit="教室管理" hasSelect="2">
					<HasNoItems classroomTittle="根据学校的情况，创建上课的教室哦~">
						<Buttons
							style={{ width: "144px", height: "56", backgroundColor: "#f59524", marginTop: "30px" }}
							btnName="+ 添加楼宇"
							onClick={this.isShowOrNot.bind(this)}
						>
							<div className={style.btn_icon_left}></div>
						</Buttons>
						<Buttons
							style={{ width: "144px", height: "56", backgroundColor: "#3e92ec", marginTop: "30px", marginLeft: "10px" }}
							btnName="+ 添加操场"
							onClick={this.isShowOrNotGround.bind(this)}
						>
							<div className={style.btn_icon_ground}></div>
						</Buttons>

						{/* <Buttons
							style={{ width: "144px", height: "56", backgroundColor: "#e8f6ff", color: "#3e92ec", marginTop: "30px", marginLeft: "10px" }}
							btnName="+ 批量导入"
						>
							<div className={style.btn_icon_up}></div>
						</Buttons> */}
					</HasNoItems>
				</PageNav>
			)
		} else {
			content = (
				<div className={`${style.classroom_container_build} ${style.classroom_container_list}`}>
					<div className={style.classroom_first_title}>教室列表
          				<div className={style.classroom_build_right}>
							<span className={style.classroom_build_span}>
								<span>共<strong>{roomSum}</strong>个教室</span>
							</span>
							<Select
								source={this.state.selectSource}
								marginTop={'0px'}
								width={65}
								height={28}
								lineHeight={'28px'}
								selectHeight={'28px'}
								onChange={this.getSelectVal.bind(this)}
							/>

							<div className={style.search_input}>
								<input
									type="text"
									placeholder='请输入教室名字'
									className={style.classroom_build_input1}
									onBlur={this.setSearchVal.bind(this)}
								//onKeyUp={(e) => this.enterSearch(e)}
								/>
								<div className={style.icon_search}></div>

							</div>
							<input
								type="button"
								value="搜索"
								className={style.classroom_build_input2}
								onClick={this.searchList.bind(this)}
							/>
						</div>
					</div>
					<div className={style.search_null_box} style={{ display: this.state.showNone ? "block" : "none" }}>
						<div className={style.search_null_img}></div>
						<span className={style.search_null_txt}>抱歉，未找到与“{this.state.searchVal.inputVal}”相关的记录。</span>
					</div>
					<div style={{ display: this.state.showNone ? "none" : "block" }}>
						<div style={{ textAlign: 'center', marginBottom: '20px' }}>
							<Buttons
								className="addClass"
								btnName="+添加楼宇"
								style={{
									width: '143px',
									height: '46',
									display: 'inline-block',
									backgroundColor: "#f59524",
									marginRight: '10px',
									marginTop: '20px',
									fontSize: '18px',
								}}
								onClick={this.isShowOrNot.bind(this)}
							>
								<div className={style.list_icon_left}></div>
							</Buttons>
							<Buttons
								className="addClass"
								btnName="+添加操场"
								style={{
									width: '143px',
									height: '46',
									display: 'inline-block',
									backgroundColor: "#3e91eb",
									marginRight: '10px',
									marginTop: '20px',
									fontSize: '18px',
								}}
								onClick={this.isShowOrNotGround.bind(this)}
							>
								<div className={style.list_icon_ground}></div>
							</Buttons>
							{/* <Buttons
								className="addClass"
								btnName="+批量导入"
								style={{
									width: '143px',
									height: '46',
									fontSize: '18px',
									marginTop: '20px',
									display: 'inline-block',
									backgroundColor: '#E8F6FF',
									border: '1px solid #95CEF5',
									color: '#95CEF5',
								}}
							>
								<div className={style.list_icon_up}></div>
							</Buttons> */}
						</div>
						{boxItem}
						<Paging
							style={{ marginBottom: 25, clear: "both" }}
							paging={this.state.paging}
							onPageChange={this.onPageChange.bind(this)}
						/>
					</div>
				</div>
			)
		}

		return (
			<div>
				{content}
				<FormWin
					navTitle="您正在创建楼宇"
					isShow={this.state.classroomWinShow}
					formSource={this.state.classroomSource}
					formData={this.state.classroomData}
					close={this.isShowOrNot.bind(this)}
					submit={this.addBuilding.bind(this)}
					onChange={this.getClassroomVal.bind(this)}
					btnLeftName="返回"
					btnRightName="保存"
					paddingLeft='130px'
				/>
				<FormWin
					navTitle="您正在创建操场"
					isShow={this.state.playgroundWinShow}
					formSource={this.state.playgroundSource}
					formData={this.state.playgroundData}
					close={this.isShowOrNotGround.bind(this)}
					submit={this.addPlayground.bind(this)}
					onChange={this.getPlaygroundVal.bind(this)}
					btnLeftName="返回"
					btnRightName="保存"
					paddingLeft='130px'
				/>
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
					notice=""
					save={this.deleteItemDe.bind(this, this.state.deleteItemData, this.state.deleteItemIndex)}
				>
					<div className={style.delete_bg}>
					</div>
				</AlertBoxSmall>
				<AlertBoxSmall
					width="600px"
					height="250px"
					bgColor="#ffffff"
					contentMargin="90px 0 45px 55px"
					alertText="确认删除吗？"
					btnLeftName="取消"
					btnRightName="确定"
					show={this.isShowOrNotDeGround.bind(this)}
					isShow={this.state.isShowDeGround}
					btnSum="2"
					notice=""
					save={this.deleteItemDeGround.bind(this, this.state.deleteItemData, this.state.deleteItemIndex)}
				>
					<div className={style.delete_bg}>
					</div>
				</AlertBoxSmall>

				<FormWin
					paddingLeft='115px'
					navTitle="添加教室"
					isShow={this.state.isShowAdd}
					formSource={this.state.formAddSource}
					formData={this.state.formAddData}
					onSourceEffect={(source) => this.setState({ infoEidtSource: source })}
					close={this.isShowOrNotAdd.bind(this)}
					btnLeftName="返回"
					btnRightName="确定"
					submit={this.addRoomList.bind(this)}
					onChange={this.getRoomListGroundVal.bind(this)}
				/>
				<FormWin
					paddingLeft='115px'
					navTitle="修改楼宇"
					isShow={this.state.isShowEdit}
					formData={this.state.editBuildData}
					formSource={this.state.editBuildSource}
					close={this.editShowBuild.bind(this)}
					btnLeftName="返回"
					btnRightName="确定"
					submit={this.editBuild.bind(this, this.state.editShowBuildData)}
					onChange={this.getEditBuildVal.bind(this)}
				/>
				<FormWin
					paddingLeft='115px'
					navTitle="修改操场"
					isShow={this.state.isShowGroundEdit}
					formData={this.state.editGroundData}
					formSource={this.state.editGroundSource}
					close={this.editShowGround.bind(this)}
					btnLeftName="返回"
					btnRightName="确定"
					submit={this.editGround.bind(this, this.state.editShowGroundData)}
					onChange={this.getEditGroundVal.bind(this)}
				/>
				<FormWin
					paddingLeft='115px'
					navTitle="修改教室"
					isShow={this.state.isShowInfoEdit}
					formSource={this.state.infoEidtSource}
					onSourceEffect={(source) => this.setState({ infoEidtSource: source })}
					formData={this.state.infoEidtData}
					close={this.isShowOrNotInfoEdit.bind(this)}
					btnLeftName="返回"
					btnRightName="确定"
					submit={this.editRoom.bind(this, this.state.infoEidtData)}
					onChange={this.getEditRoomInfo.bind(this)}
				/>
			</div>
		)
	}
	isShowOrNotInfoEdit() {
		this.setState({ isShowInfoEdit: !this.state.isShowInfoEdit })
	}
	isShowOrNot(show) {
		this.setState({ classroomWinShow: !this.state.classroomWinShow })
	}
	isShowOrNotGround(show) {
		this.setState({ playgroundWinShow: !this.state.playgroundWinShow })
	}
	isShowOrNotDe() {
		this.setState({ isShowDe: !this.state.isShowDe })
	}
	isShowOrNotDeGround() {
		this.setState({ isShowDeGround: !this.state.isShowDeGround })
	}
	isShowOrNotAdd() {
		this.setState({ isShowAdd: !this.state.isShowAdd })
	}
	isShowOrNotEditBuild() {
		this.setState({ isShowEdit: !this.state.isShowEdit })
	}
	isShowOrNotEditGround() {
		this.setState({ isShowGroundEdit: !this.state.isShowGroundEdit })
	}
	getClassroomVal(data, name, value) {
		this.setState({ classroomData: Object.assign(this.state.classroomData, data) })
	}
	getPlaygroundVal(data, name, value) {
		this.setState({ playgroundData: Object.assign(this.state.playgroundData, data) })
	}
	getRoomListGroundVal(data, name, value) {
		this.setState({ formAddData: Object.assign(this.state.formAddData, data) })
	}
	getEditBuildVal(data, name, value) {
		this.setState({ editBuildData: Object.assign(this.state.editBuildData, data) })
	}
	getEditGroundVal(data, name, value) {
		this.setState({ editGroundData: Object.assign(this.state.editGroundData, data) })
	}
	showAddRoomWin(data) {
		var buildingID = data.id;
		var data = {
			buildingID: buildingID,
			acadAreaID: 1
		}
		this.setState({ formAddData: Object.assign(this.state.formAddData, data) })
		this.isShowOrNotAdd();
	}
	onPageChange(pageIndex, pageSize) {
		var dataInfo = {
			"data": {},
			"pageSize": pageSize,
			"pageIndex": pageIndex
		}
		this.getClassRoomList(dataInfo);
	}
	//编辑 教学楼 操场列表
	editRoom(item) {
		var _self = this
		var data = {
			data: this.state.infoEidtData
		}
		var result = eduValidForm(this.state.infoEidtSource, this.state.infoEidtData)
		if (result.ispass) {
			post(this.props.authority.urlEditRoom.sourceCode, data).then((json) => {
				var { pageSize, pageIndex } = _self.state.paging;
				_self.getClassRoomList({ pageSize: pageSize, pageIndex: pageIndex })
				if(json.code==0){
					alert(json.message)
				}
			}).catch()
		}
	}
	getEditRoomInfo(data, name, value) {
		this.setState({ infoEidtData: Object.assign(this.state.infoEidtData, data, { acadAreaID: 1 }) })
	}

	getSelectVal(val) {
		this.setState({ selectVal: val })
	}
	getClassRoomList(para) {
		var _self = this
		var data = {
			data: "",
			pageSize: para.pageSize,
			pageIndex: para.pageIndex
		}
		post(this.props.authority.urlListBuilding.sourceCode, data).then(function (json) {
			_self.setState({
				buildingList: json.items,
				roomsNumber: json.totalCount - 1,
				paging: {
					pageIndex: para.pageIndex,
					totalCount: json.totalCount,
					pageSize: para.pageSize,
				}
			})
		}).catch()
	}
	//修改教室
	setInfoEdit(item, buildingID, id) {
		var buildingID = buildingID
		var id = id
		var data = {
			buildingID: buildingID,
			id: id
		}
		this.setState({ infoEidtData: Object.assign(this.state.infoEidtData, item) })
		this.isShowOrNotInfoEdit();
	}
	addBuilding() {
		var _self = this
		var result = eduValidForm(this.state.classroomSource, this.state.classroomData)
		if (result.ispass) {
			post(this.props.authority.urlAddBuilding.sourceCode, {
				data: {
					buildingName: this.state.classroomData.buildingName,
					acadAreaID: 1,
					buildingTypeID: '140000000000000001'
				},
			}).then((json) => {
				if(json.code==0){
					alert(json.message)
				}
				var { pageSize, pageIndex } = _self.state.paging;
				_self.getClassRoomList({ pageSize: pageSize, pageIndex: pageIndex })
			})
		}
	}
	addPlayground() {
		var _self = this
		var result = eduValidForm(this.state.playgroundSource, this.state.playgroundData)
		if (result.ispass) {
			post(this.props.authority.urlAddPlayground.sourceCode, {
				data: {
					buildingName: this.state.playgroundData.buildingName,
					maxClassNum: this.state.playgroundData.maxClassNum,
					acadAreaID: 1,
					buildingTypeID: '140000000000000002'
				}
			}).then((json) => {
				if(json.code==0){
					alert(json.message)
				}
				var { pageSize, pageIndex } = _self.state.paging
				_self.getClassRoomList({ pageSize: pageSize, pageIndex: pageIndex })
			})
		}
	}
	addRoomList() {
		var _self = this
		var data = {
			data: this.state.formAddData
		}
		var result = eduValidForm(this.state.formAddSource, this.state.formAddData)
		if (result.ispass) {
			post(this.props.authority.urlAddRoom.sourceCode, data).then((json) => {
				if(json.code==0){
					alert(json.message)
				}
				var { pageSize, pageIndex } = _self.state.paging;
				_self.getClassRoomList({ pageSize: pageSize, pageIndex: pageIndex })
			}).catch()
		}

	}
	//编辑 教学楼
	editShowBuild(item) {
		this.setState({
			editShowBuildData: item,
			editBuildData: Object.assign(this.state.editBuildData, item)
		})
		this.isShowOrNotEditBuild()
	}
	editBuild(item) {
		var _self = this
		var result = eduValidForm(this.state.editBuildSource, this.state.editBuildData)
		if (result.ispass) {
			post(this.props.authority.urlEditBuilding.sourceCode, {
				data: {
					buildingName: this.state.editBuildData.buildingName,
					acadAreaID: 1,
					buildingTypeID: '140000000000000001',
					id: item.id,
					isDelete: 0
				}
			}).then((json) => {
				if (json.code == 1) {
					var { pageSize, pageIndex } = _self.state.paging;
					_self.getClassRoomList({ pageSize: pageSize, pageIndex: pageIndex })
				}else if(json.code==0){
					alert(json.message)
				}
			}).catch()
		}
	}
	//编辑 操场
	editShowGround(item) {
		this.setState({
			editShowGroundData: item,
			editGroundData: Object.assign(this.state.editGroundData, item)
		})
		this.isShowOrNotEditGround()
	}
	editGround(item) {
		var _self = this
		var result = eduValidForm(this.state.editGroundSource, this.state.editGroundData)
		if (result.ispass) {
			post(this.props.authority.urlEditPlayground.sourceCode, {
				data: {
					buildingName: this.state.editGroundData.buildingName,
					acadAreaID: 1,
					buildingTypeID: '140000000000000002',
					id: item.id,
					isDelete: 0
				}
			}).then((json) => {
				if (json.code == 1) {
					var { pageSize, pageIndex } = _self.state.paging;
					_self.getClassRoomList({ pageSize: pageSize, pageIndex: pageIndex })
				}else if(json.code==0){
					alert(json.message)
				}
			}).catch()
		}
	}
	//删除 教学楼
	deleteItem(item, index) {
		this.setState({ deleteItemData: item })
		this.setState({ deleteItemIndex: index })
		this.isShowOrNotDe();
	}
	deleteItemDe(item) {
		var _self = this
		post(this.props.authority.urlDelBuilding.sourceCode, {
			data: [item.id]
		}).then(() => {
			var index = _self.state.deleteItemIndex;
			var list = _self.state.buildingList.slice();
			list.splice(index, 1);
			_self.setState({ buildingList: list });
			_self.isShowOrNotDe();
		})
	}
	//删除 操场
	deleteItemGround(item, index) {
		this.setState({ deleteItemData: item })
		this.setState({ deleteItemIndex: index })
		this.isShowOrNotDeGround();
	}
	deleteItemDeGround(item) {
		var _self = this
		post(this.props.authority.urlDelPlayground.sourceCode, {
			data: [item.id]
		}).then(() => {
			var index = _self.state.deleteItemIndex;
			var list = _self.state.buildingList.slice();
			list.splice(index, 1);
			_self.setState({ buildingList: list });
			_self.isShowOrNotDeGround();
		})
	}

	setSearchVal(e) {
		var val = e.target.value;
		var data = {
			inputVal: val
		}
		this.setState({ searchVal: data });
	}
	searchList() {
		var _self = this
		var data = {
			data: {
				name: this.state.searchVal.inputVal,
				searchType: this.state.selectVal
			}
		}
		post(this.props.authority.urlListRoom.sourceCode, data).then(function (json) {
			if (json.code == 1) {
				if (json.data.length > 0) {
					_self.setState({ buildingList: json.data })
				} else {
					_self.setState({ showNone: !_self.state.showNone })
				}
			} else {
				alert(json.message)
			}
		}).catch()
	}
	/*enterSearch(e){
		var _self=this;
		var val = e.target.value;
		this.setState({ searchVal: val });
		var keyCode=e.keyCode;
		if(keyCode==13){
			_self.searchList();
		}else{
			return false;
		}
	}*/
}
export default Classroom