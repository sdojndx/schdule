import style from "../../style/academicyear.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import PageNav from "../common/pagenav"
import AlertWin from "../win/alertwin"
import Form from "../common/form/form"
import { post, stampToDay } from "../common/pubfn"

class StudyList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    var elem = "";
    var studyBtn = (
      <div className={style.studyEdit_btns}>
        <Link 
          to={`academicyear/termdetail/${this.props.item.id}?acadYearName=${encodeURI(this.props.item.acadYearName)}&acadYearID=${this.props.item.acadYearID}`}
          className={style.studyEdit_left + " " + style.studyEdit}
        >
          学期
        </Link>
        <span
          className={style.studyEdit_right + " " + style.studyEdit}
          onClick={()=>this.props.onEdit(this.props.item)}
        >
          修改
				</span>
      </div>);
    if (this.props.item.status == '未开始') {
      elem = (<span className={style.studyState_notBegin}>未开始</span>)
    } else if (this.props.item.status == '当前') {
      elem = (<span className={style.studyState_now}>当前</span>)
    } else if (this.props.item.status == '已结束') {
      elem = (<span className={style.studyState_over}>已结束</span>);
      studyBtn = (<div className={style.studyEdit_btns}>
        <span className={style.studyEdit_left_unclick}>学期</span>
        <span className={style.studyEdit_right_unclick}>修改</span>
      </div>)
    }
    return (
      <li className={style.main_item}>
        {elem}
        <p className={style.studyName_font}>{this.props.item.acadYearName}</p>
        <p className={style.studyTime_font}>{stampToDay(this.props.item.beginDateTime)} 至 {stampToDay(this.props.item.endDateTime)}</p>
        {studyBtn}
      </li>
    )
  }
}

export default StudyList