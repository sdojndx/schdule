import style from "../../style/academicyear.scss"
import React, { Component } from "react"
import { post, getUrlInfo, selectDay, stampToDay } from "../common/pubfn"
import { DatePicker } from 'antd'
import moment from 'moment'
import Input from '../common/form/input'
const { RangePicker } = DatePicker

class TrTotal extends Component {
  constructor() {
    super();
    this.state = {
      showInput: false,
      //showTime: false,
    }
  }

  render() {
    var elem = ''
    var name = "";
    //var time = ''
    var defaultvalue = [moment(this.props.item.beginDateTime),moment(this.props.item.endDateTime)]
    if(this.props.item.acadTermName){
        name=this.props.item.acadTermName;
    }else{
        name=<span style={{opacity:0.7}}>未命名</span>;
    }
    if (!this.state.showInput) {
      elem = (
        <div style={{ display: this.state.showInput ? 'none' : 'block' }}>
        {name}
        </div>
      )
    } else {
      elem = (
        <Input
          width='140px'
          height='30px'
          placeholder="未命名"
          onBlur={this.onBlur.bind(this)}
          style={{ display: this.state.showInput ? 'inline-block' : 'none'}}
          className={style.show_input}
          val={this.props.item.acadTermName}
          onChange={( val) => this.props.getVal(name, val, this.props.index)}
        />
      )
    }
    // if (!this.state.showTime) {
    //   time = (
    //     <span>
    //       {this.props.item.beginDateTime ? stampToDay(this.props.item.beginDateTime)+' 至 ' :''}{this.props.item.endDateTime ? stampToDay(this.props.item.endDateTime) : ''}
    //     </span>
    //   )
    // } else {
    //   time = (
    //     <RangePicker
    //       val={this.props.item.beginDateTime}
    //       style={{ display: 'inline-block', width: '500px', marginTop: "0", marginLeft: '0' }}
    //       onChange={(moment, times, index) => { this.props.getTimeVal(this.props.item.name, times, this.props.index) }}
    //     />
    //   )
    // }
    return (
      <tr className={style.trtotal_tr}>
        <td className={style.tdOne_width}>{this.props.index + 1}</td>
        <td className={style.tdTwo_width}>
          {elem}
          <div
            className={style.edit_pen}
            onClick={this.isShowInputClick.bind(this)}
          >
          </div>
        </td>
        <td className={style.tdThree_width}>
          {this.props.item.beginDateTime ? selectDay(this.props.item.beginDateTime, this.props.item.endDateTime) : ''}  {this.props.item.beginDateTime ? (`(${Math.ceil(selectDay(this.props.item.beginDateTime, this.props.item.endDateTime) / 7) }`+'周)') : ''} 
        </td>
        <td className={style.tdFour_width}>
          <RangePicker
            value={defaultvalue}
            style={{ display: 'inline-block', marginTop: "0", marginLeft: '0' }}
            onChange={this.props.getTimeVal}
          />
          {/*<div
            className={style.edit_time}
            onClick={this.isShowTimeClick.bind(this)}
          >
          </div>*/}
        </td>
        <td className={style.tdFive_width}>
          {this.props.item.status}
          <div
            className={style.edit_delete}
            onClick={()=>this.props.deleteTr(this.props.index)}
          >
          </div>
          
        </td>
      </tr>
    )
  }

  isShowInputClick() {
    this.setState({ showInput: !this.state.showInput })
  }
  isShowTimeClick() {
    this.setState({ showTime: !this.state.showTime })
  }
  onBlur() {
    this.isShowInputClick()
  }

}
export default TrTotal