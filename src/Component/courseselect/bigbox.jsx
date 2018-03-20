import style from "../../style/optclass.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import MiddleBox from './middlebox'

class BigBox extends Component {
  constructor() {
    super()
  }
  render() {
    var _self=this,selected = [],selectnum=this.props.selectnum;
    for(var i=1;i<=this.props.courseCount;i++){
      if(i>selectnum){
        selected.push(<strong key={i} className={style.classinfo_number_gray}>{i}</strong>)
      }else{
        if(i>this.props.courseNbrMin){
          selected.push(<strong key={i} className={style.classinfo_number_blue}>{i}</strong>)
        }else{
          selected.push(<strong key={i} className={style.classinfo_number_orange}>{i}</strong>)
        }
      }
    }
    return (
      <div>
        <div className={style.classinfo_box}
          style={{ height: this.props.height }}
        >
          <div className={style.classinfo_title}>
            <h3 className={style.classinfo_title_blue}>
              {this.props.courseTypeName}
            </h3>
            <span className={style.classinfo_title_gray}>
              共
            <i>{this.props.courseCount}</i>
              门课，最少选
            <i>{this.props.courseNbrMin}</i>
              门
          </span>
            {selected}
            {/*<strong className={style.classinfo_number_orange}>1</strong>
            <strong className={style.classinfo_number_orange}>2</strong>
            <strong className={style.classinfo_number_gray}>3</strong>
            <strong className={style.classinfo_number_gray}>4</strong>*/}
          </div> 
          {
            this.props.classCourseList.map(function(item,index){
              return <MiddleBox
                key={index}
                index={index}
                onSelected={(second,third)=>_self.props.onSelected(_self.props.index,second,third)}
                {...item}
              />
            })
          }         
          {/*<MiddleBox
            classname='语文'
          />*/}
          <div style={{ clear: 'both' }}></div>
        </div>
      </div>
    )
  }
}
export default BigBox