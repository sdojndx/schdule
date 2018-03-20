import style from "../../style/optclass.scss"
import React, { Component } from "react"
import LittleBox from './littlebox'

class MiddleBox extends Component {
  constructor() {
    super()
  }
  render() {
    var _self=this;
    return (
      <div className={style.classinfo_message}>
        <div className={style.classinfo_message_circular_box}>
          <div className={style.classinfo_message_circular}>
            <i></i>
          </div>
          <p>{this.props.courseName}</p>
        </div>
        {
          this.props.courseOfferinglist.map(function(item,index){
            return <LittleBox
              key={index}
              index={index}
              onSelected={(thrid)=>_self.props.onSelected(_self.props.index,thrid)}
              {...item}
            />
          })
        }
        {/*<LittleBox
          backgroundColor='#eaf4ff'
        />*/}
        <div style={{ clear: 'both' }}></div>
      </div>
    )
  }
}
export default MiddleBox