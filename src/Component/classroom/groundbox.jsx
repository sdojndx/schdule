import style from "../../style/classroom.scss"
import React, { Component } from "react"

class GroundBox extends Component {
  render() {
    return (
      <div className={this.props.islast?style.buildbox_outline_white:style.buildbox_outline}>
        <div className={`${style.classroom_build_add} ${style.classroom_list_outline} ${style.classroom_list_blueline}`}>
          <div className={`${style.classroom_square_box} ${style.classroom_square_list}`} >
            <div className={`${style.classroom_square_in}  ${style.classroom_square_list}`}></div>
          </div>
          <div className={`${style.classroom_square_boxhidden} ${style.classroom_square_listhidden}`}></div>
          <div className={`${style.classroom_build_circular} ${style.classroom_list_circular}`}>{this.props.index + 1}
          </div>
          <h3>{this.props.buildingName}
            <div
              className={style.edit_pen}
              onClick={() => this.props.editShowGround(this.props.item)}
            ></div>
          </h3>
          <div
            className={style.classroom_build_close}
            onClick={() => this.props.deleteItemGround(this.props.item, this.props.index)}
          >
          </div>
          <div className={style.classroom_list_text}>
            <span>适用学科：体育</span> <span className={style.classroom_text_left}>同时上课的最大班级数：<span className={style.classroom_text_span}>{this.props.itemRooms.length}</span></span>
          </div>
        </div>
      </div>
    )
  }
}

export default GroundBox