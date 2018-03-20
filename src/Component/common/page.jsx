import style from "../../style/classroom.scss"
import React,{Component} from "react"
import {Link} from "react-router"

class Page extends Component {
  render(){
    return(
      <div className={style.listBottom}>
        <div className={style.listBottomLeft}>
            共有<strong>42</strong>条记录，当前每页显示
            <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">10</option>
            </select>
        </div>
        <div className={style.listBottomRight}>
            <i className="fa fa-caret-left"> </i>
            <span className={style.bottomPage}> 123456</span>
            <i className="fa fa-caret-right"> </i>
            到第
            <input type="text" />
            页
            <a href="javascript:void(0)">确定</a>
        </div>
    </div>
    )
  }
}

export default Page
