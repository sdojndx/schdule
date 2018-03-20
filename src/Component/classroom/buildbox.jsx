import style from "../../style/classroom.scss"
import React, { Component } from "react"
import ClassroomInfo from './classroominfo'
import { post } from "../common/pubfn"
import AlertBoxSmall from '../win/alertboxsmall'
import { SearchAnimate } from "../common/animate"


class BuildBox extends Component {
  constructor() {
    super()
    this.state = {
			isShowInfoDel: false,
			deleteRoomsData: [

			],
      deleteRoomsIndex: '',
			showRoomsData: true,
    }
  }
  componentDidMount() {

  }
  render() {
    var roomInfo = []
    if (this.props.rooms) {
      {this.props.rooms.map((itemInfo, indexInfo) => {
          roomInfo.push(
            <ClassroomInfo
              key={indexInfo}
              itemInfo={itemInfo}
              indexInfo={indexInfo}
              setInfoEdit={this.props.setInfoEdit}
              deleteRooms={this.deleteRooms.bind(this)}
            />
          )
        })
      }
    }
    var length = ''
    if(this.props.rooms){
      length=this.props.rooms.length
    }else{
      length=0
    }
    return (
      <div className={this.props.islast?style.buildbox_outline_white:style.buildbox_outline}>
        <div className={`${style.classroom_build_add} ${style.classroom_list_outline}`}>
          <div className={style.classroom_square_box} >
            <div className={style.classroom_square_in}></div>
          </div>
          <div className={style.classroom_square_boxhidden}></div>
          <div className={style.classroom_build_top}>
            <div className={style.classroom_build_circular}>{this.props.index + 1}
              <div className={style.classroom_list_shuxian}></div>
            </div>
            <span className={style.classroom_build_name}>
              {this.props.buildingName}
              <div
                className={style.edit_pen}
                onClick={() => this.props.editShowBuild(this.props.item)}
              ></div>
              <span className={style.classroom_build_number}>&nbsp;教室数量 : </span>
              <strong>{length}</strong>
            </span>
            <div
              className={this.state.showRoomsData ? style.classroom_build_more : style.classroom_build_more_down}
              onClick={this.clickShowRooms.bind(this)}
            ></div>
            <div
              className={style.classroom_build_close}
              onClick={() => this.props.deleteItem(this.props.item, this.props.index)}
            >
            </div>
          </div>
          <SearchAnimate>
            <div
              visible={this.state.showRoomsData}
              className={`${style.classroom_build_down} ${style.classroom_list_down} ${style.clearfix}`}
              style={{ display: this.state.showRoomsData ? "block" : "none" }}
            >
              <ul className={`${style.classroom_ul_build} ${style.clearfix}`}>
                <li
                  onClick={this.props.isShowOrNotAdd}
                  className={`${style.classroom_list_box} ${style.classroom_list_classroom} ${style.classroom_build_addclassroom} ${style.classroom_list_first}`}>
                  <h2><strong>+添加教室</strong></h2>
                </li>
                {roomInfo}
              </ul>
            </div>
          </SearchAnimate>
          {/* 教室的删除 */}
          <AlertBoxSmall
            width="600px"
            height="250px"
            bgColor="#ffffff"
            contentMargin="90px 0 45px 55px"
            alertText="确认删除吗？"
            btnLeftName="取消"
            btnRightName="确定"
            show={this.isShowOrNotInfoDel.bind(this)}
            isShow={this.state.isShowInfoDel}
            btnSum="2"
            notice=""
            save={this.deleteRoomInfo.bind(this, this.state.deleteRoomsData, this.state.deleteRoomsIndex)}
          >
            <div className={style.delete_bg}>
            </div>
          </AlertBoxSmall>
        </div>
      </div>
    )
  }
  
	clickShowRooms() {
		this.setState({ showRoomsData: !this.state.showRoomsData })
	}
  isShowOrNotInfoDel() {
		this.setState({ isShowInfoDel: !this.state.isShowInfoDel })
	}
  //删除 教室
	deleteRooms(itemInfo,indexInfo) {
		this.setState({ deleteRoomsData: itemInfo })
		this.setState({ deleteRoomsIndex: indexInfo })
		this.isShowOrNotInfoDel()
  }
  deleteRoomInfo(itemInfo) {
    var _self = this
    this.state.roomList = this.props.rooms
		post(this.props.authority.urlDelRoom.sourceCode, {
			data: [itemInfo.id]
		}).then(() => {
      var index = _self.state.deleteRoomsIndex
			var list = _self.state.roomList.slice()
			list.splice(index, 1)
			_self.setState({ roomList: list })
      _self.isShowOrNotInfoDel()
			var {pageSize,pageIndex} = _self.props.paging;
			_self.props.getClassRoomList({pageSize:pageSize,pageIndex:pageIndex})
		})
  }
}

export default BuildBox