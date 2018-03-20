import style from "../../style/classroom.scss"
import React, { Component } from "react"
import FormWin from '../win/formwin'
import Button from '../common/buttons'

class ClassroomInfo extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    var word = ''
    var textBgc = ''
    var liBgc=''
    var roomNameBgc=''
    if (this.props.itemInfo.roomTypeID == "130000000000000001") {
      word = '普通'
      textBgc='room_type_general'
      liBgc='li_bgc_general'
      roomNameBgc='room_name_general'
    } else if (this.props.itemInfo.roomTypeID == "130000000000000002") {
      word = '电脑'
      textBgc='room_type_computer'
      liBgc='li_bgc_computer'
      roomNameBgc='room_name_computer'
    } else if (this.props.itemInfo.roomTypeID == "130000000000000003") {
      word = '美术'
      textBgc='room_type_art'
      liBgc='li_bgc_art'
      roomNameBgc='room_name_art'
    } else if (this.props.itemInfo.roomTypeID == "130000000000000004") {
      word = '音乐'
      textBgc='room_type_music'
      liBgc='li_bgc_music'
      roomNameBgc='room_name_music'
    } else if (this.props.itemInfo.roomTypeID == "130000000000000005") {
      word = '实验室'
      textBgc='room_type_lab'
      liBgc='li_bgc_lab'
      roomNameBgc='room_name_lab'
    } else if (this.props.itemInfo.roomTypeID == "130000000000000006") {
      word = '体育'
      textBgc='room_type_pe'
      liBgc='li_bgc_pe'
      roomNameBgc='room_name_pe'
    } else {
      word = '普通'
      textBgc='room_type_general'
      liBgc='li_bgc_general'
      roomNameBgc='room_name_general'
    }
    return (
      <li className={`${style.classroom_list_box} ${style[liBgc]}`}>
        <h3 className={`${style.classroom_list_name} ${style[roomNameBgc]}`}>
          {this.props.itemInfo.roomName ? this.props.itemInfo.roomName : '  '}
        </h3>
        <div className={`${style.classroom_list_normal} ${style[textBgc]}`}>{word}</div>
        <p className={style.classroom_list_font}>
          <span className={style.classroom_subject}>学科：<span className={style.classroom_subject_item}>{this.props.itemInfo.subjectAbbrs ? this.props.itemInfo.subjectAbbrs : '无'}</span></span><em>容量：{this.props.itemInfo.capacity ? this.props.itemInfo.capacity : 0}人</em>
        </p>
        <div className={style.classroom_full_bg}></div>
        <div className={style.classroom_full_btn}>
          <Button
            btnName='修改'
            style={{
              width: '60px',
              height: '27px',
              lineHeight: '27px',
              backgroundColor: '#fc8800',
              broderRadius: '3px',
              color: '#fff',
              fontSize: '14px',
              margin: '20px 10px 0 35px',
            }}
            onClick={(data) => this.props.setInfoEdit(this.props.itemInfo, this.props.itemInfo.buildingID, this.props.itemInfo.id)}
          />
          <Button
            btnName='删除'
            style={{
              width: '60px',
              height: '27px',
              lineHeight: '27px',
              backgroundColor: '#3e91eb',
              broderRadius: '3px',
              color: '#fff',
              fontSize: '14px',
              margin: '20px 0 0 0',
            }}
            onClick={() => this.props.deleteRooms(this.props.itemInfo, this.props.indexInfo)}
          />
        </div>
      </li>
    )
  }
}
export default ClassroomInfo