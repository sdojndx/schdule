import style from "../../style/optclass.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import IconSub from '../../images/optclass/icon_subtract.png'
import BigBox from './bigbox'
import { post,stampToDay } from "../common/pubfn"

class OptClass extends Component {
  constructor() {
    super()
    this.state={
      courseselect:{},
      resttime:"30:00",
      endTime:""
    }
  }
  
  componentDidMount() {
    var _self=this;
    this.setState({endTime:new Date().getTime()+1800000})
    this.getInfo();
    this.timeAnimate = setInterval(function(){
      var now = new Date().getTime();
      var left = _self.state.endTime-now;
      if(left>0){
        var minute = Math.floor(left/60000);
        var second = Math.floor(left%60000/1000);
        _self.setState({resttime:`${minute}:${second<10?"0"+second:second}`});
      }else{
        clearTimeout(_self.timeAnimate);
        delete _self.timeAnimate;
      }
    },1000);
  }
  componentWillUnmount(){
      if(this.timeAnimate){
        clearTimeout(this.timeAnimate);
        delete this.timeAnimate;
      }
  }
  render() {
    var _self=this;
    var courseselect = this.state.courseselect;
    var restselect = courseselect.totalmin-courseselect.totalselect;
    if(courseselect.id){
      return (
        <div className={style.optclass_full}>
          <div className={style.optclass_box}>
            {/* 标题 */}
            <div className={style.optclass_title}>
              <span className={style.optclass_title_main}>
                <span>选课</span>
                <span className={style.optclass_title_year}>{`${courseselect.acadYearName}${courseselect.acadTermName}`/*2016~2017学年第二学期*/}</span>
              </span>
              <span className={style.optclass_title_top}>
                <span className={style.optclass_icon_sound}></span>
                选课任务需要在30分钟内完成，逾期未提交所选课程会被自动取消哦~
                <span className={style.optclass_icon_close}></span>
              </span>
            </div>
            {/* 内容 */}
            <div className={style.optclass_container}>
              {/* 文字介绍 */}
              <div className={style.optclass_word}>
                <div className={style.optclass_word_title}>
                  {courseselect.requestTaskName/*六年级下学期选课*/}
                </div>
                <div className={style.optclass_word_clock}>
                  <div className={style.optclass_icon_clock}></div>
                  <span className={style.optclass_text_clock}>倒计时：{this.state.resttime}</span>
                </div>
                <div className={style.optclass_word_text}>
                  <p dangerouslySetInnerHTML={{__html: courseselect.notes}}>
                    {/*各位同学，本次选课任务需要选出6门，请同学们抓紧时间在规定的时间内完成选课。关于本次选课的指导，大家可以下载附件。各位同学，本次选课任务需要选出6门，请同学们抓紧时间在规定的时间内完成选课。关于本次选课的指导，大家可以下载附件。各位同学，本次选课任务需要选出6门，请同学们抓紧时间在规定的时间内完成选课。关于本次选课的指导，大家可以下载附件哦。*/}
                    {/*<a href="javascript:void(0);">附件：六年级下学期选课指导.doc</a>*/}
                  </p>
                </div>
              </div>
              <div className={style.optclass_time_end}>
                选课任务于{/*2018年1月15  17:00*/}{stampToDay(courseselect.endDate)}截止
              </div>
              {/* 需要选课的标题 */}
              <div className={style.optclass_optbox_title}>
                需要选择的课程（重新分班上课）
              </div>

              {/* 教室信息 */}

              {
                courseselect.taskDetail.courseTypeList.map(function(item,index){
                  return <BigBox
                      key={index}
                      index={index}
                      {...item}
                      onSelected={_self.swSelect.bind(_self)}
                  />
                })
              }

              {/* 字 */}
              <div className={`${style.optclass_title_top} ${style.optclass_title_top_fl}`}>
                <span className={`${style.optclass_icon_sound} ${style.optclass_icon_sound_left}`}></span>
                选课任务需要在30分钟内完成，逾期未提交所选课程会被自动取消哦~
              </div>
              <div className={style.optclass_word_clock_bottom}>
                  <div className={style.optclass_icon_clock_bottom}></div>
                  <span className={style.optclass_text_clock_bottom}>倒计时：{this.state.resttime}</span>
              </div>
              {/* 按钮 */}
              <div className={style.btn_bottom}>
                <input type="button" value="提交" onClick={this.submit.bind(this)} className={style.btn_bottom_input} />
                <p className={style.btn_bottom_gray}>
                  <span>
                    共
                    <i>{courseselect.totalnumber}</i>
                    门课，最少选
                    <i>{courseselect.totalmin}</i>
                    门，还差
                    <i>{restselect>0?restselect:0}</i>
                    门需要选择~
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return <div></div>
    }
  }
  getInfo(){
    var _self=this;
    post(this.props.authority.select.sourceCode,{data:this.props.params.taskid}).then(function(json){
        _self.initData(json.data);
    })
  }
  initData(data){
    var totalnumber = 0,totalmin=0,totalselect=0;
    data.taskDetail.courseTypeList.map(function(item){
      item.selectnum=0;
      totalnumber+=item.courseCount;
      totalmin+=item.courseNbrMin;
      item.classCourseList.map(function(item1){
        item1.courseOfferinglist.map(function(item2){
          if(item2.checked){
            item.selectnum++;
            totalselect++;
          }
        })
      })
    })
    data.totalnumber=totalnumber;
    data.totalselect=totalselect;
    data.totalmin=totalmin;
    this.setState({courseselect:data});
  }
  swSelect(first,second,third){
    var _self=this;
    // if(first===false){
    //   alert("选择已达上限！");
    // }else{
    //   var editcourcetype = source.taskDetail.courseTypeList[first]
    //   if(editcourcetype.selectnum>=editcourcetype.courseNbrMin){
    //       var item = this.props.classCourseList[second].courseOfferinglist[third];
    //   if(item.checked){
    //     this.props.onSelected(this.props.index,second,third);
    //   }else{
        
    //     this.props.onSelected(false);
    //   }
    // }else{


    var source = Object.assign({},this.state.courseselect);
    var editcourcetype = Object.assign({},source.taskDetail.courseTypeList[first]);
    var list = editcourcetype.classCourseList[second].courseOfferinglist;
    var item =  Object.assign({},list[third]);
    if(item.checked){
      item.checked=false;
    }else{
      if(item.instrLevelID){
        list.map(function(item){
          if(item.checked){
            item.checked=false;
            editcourcetype.selectnum--;
          }
        })
      }
      item.checked=true;
      editcourcetype.selectnum++;
      // if(editcourcetype.selectnum>editcourcetype.courseNbrMin){
      //   alert("选择已达上限！");
      //   return;
      // }
    }
    post(this.props.authority.add.sourceCode,{data:{
      "courseOfferingId":item.id,
      "courseTypeId":source.taskDetail.courseTypeList[first].courseTypeId,
      "requestTaskId":_self.props.params.taskid,
      "classCourseId":source.taskDetail.courseTypeList[first].classCourseList[second].id
    }}).then(function(json){
      if(json.code==1){
        editcourcetype.classCourseList[second].courseOfferinglist[third]=item;
        source.taskDetail.courseTypeList[first] = editcourcetype;
        _self.initData(source);
      }
    })
    //}
  }
  submit(){
    var _self=this;
    post(this.props.authority.submit.sourceCode,{data:_self.props.params.taskid}).then(function(json){
        if(json.message){
          alert(json.message);
        }
        if(json.code==1){
          _self.props.history.push(`courseselect/resultlist/${_self.props.params.taskid}`);
        }
    }).catch()
  }
}
export default OptClass