import style from "../../style/optclass.scss"
import React, { Component } from "react"

class LittleBox extends Component {
  constructor() {
    super()
  }
  render() {
    var detail = ''
    var backgroundColor = ''
    var color = ''
    var background = ''
    if (this.props.checked) {
      detail = "icon_checked"
      backgroundColor = '#eaf4ff'
      color='#529aec'
      background='#529aec'
    } else {
      detail = 'icon_checked_false'
      backgroundColor = '#ffffff'
      color='#666666'
      background='#c6c6c6'
    }
    var level = "";
    if(this.props.instrLevelName){
      level=<span className={style.classinfo_class_leveltext} style={{background: background}}>{this.props.instrLevelName}</span>
    }
    return (
      <div
        className={style.classinfo_box}
        style={{ backgroundColor: backgroundColor,color: color }}
      >
        <div className={style.clearfix}>
          {level}
          <span className={style.classinfo_class_text}>
            周课时：
                  <strong>{this.props.minPerWk}节</strong>
          </span>
          <span className={style.classinfo_class_text}>
            限制：
                  <strong> {this.props.requestLimited}人</strong>
          </span>
          <span className={style.classinfo_class_text}>
            已选：
                  <strong> {this.props.choosenNum}人</strong>
          </span>
          <span className={style.classinfo_class_text}>
            剩余：
                  <strong> {this.props.requestLimited-this.props.choosenNum}人</strong>
          </span>
          <i
            className={style[detail]}
            onClick={()=>this.props.onSelected(this.props.index)}
          ></i>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    )
  }
}
export default LittleBox