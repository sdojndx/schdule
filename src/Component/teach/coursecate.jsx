import style from "../../style/teach.scss"
import React, { Component } from "react"
import { Link } from 'react-router'

class CourseCate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var elem = "";
        var courseBtn = "";
        var type = "";
        if (this.props.item.createBy) {
            courseBtn = (
                <div className={style.courseEdit_btns}>
                    <a href='javascript:;'
                        className={style.courseEdit_left + " " + style.courseEdit}
                        onClick={() => this.props.changeStatus(this.props.item)}
                    >{this.props.item.status == 1 ? "停用" : "启用"}</a>
                    <a href='javascript:;'
                        className={style.courseEdit_right + " " + style.courseEdit}
                        onClick={() => this.props.onEdit(this.props.item)}
                    >修改</a>
                </div>);
        } else {
            if (this.props.item.isClass == 0) {
                courseBtn = (
                    <div className={style.courseEdit_btns}>
                        <a href='javascript:;'
                            className={style.courseEdit_left + " " + style.courseEdit}
                            onClick={() => this.props.changeStatus(this.props.item)}
                        >{this.props.item.status == 1 ? "停用" : "启用"}</a>
                        <a href='javascript:;'
                            className={style.courseEdit + " " + style.disabled_btn}
                        >修改</a>
                    </div>);
            } else {
                courseBtn = (
                    <div className={style.courseEdit_btns}>
                        <a href='javascript:;'
                            className={style.courseEdit_left + " " + style.courseEdit}
                            onClick={() => this.props.changeStatus(this.props.item)}
                        >{this.props.item.status == 1 ? "停用" : "启用"}</a>
                        <a href='javascript:;'
                            className={style.courseEdit_right + " " + style.courseEdit}
                            onClick={() => this.props.onEdit(this.props.item)}
                        >修改</a>
                    </div>);
            }
        }
        if (this.props.item.isClass) {
            elem = (<span className={style.courseCateState_zb}>走班</span>)
        } else {
            elem = (<span className={style.courseCateState_xzb}>行政班</span>)
        }

        var word = ''
        var word_xzb = ''
        if (this.props.item.instrTypeName == "行政班教学") {
            type = "modelState_xzb";
            word_xzb = '行政班教学'
        } else if (this.props.item.instrTypeName == "分层教学") {
            type = "modelState_layering";
            word = '层教学'
        } else if (this.props.item.instrTypeName == "分类教学") {
            type = "modelState_classify";
            word = '类教学'
        } else {
            type = "modelState_zdy";
            word = '类教学'
        }

        return (
            <div className={style.course_item}>
                <div className={style[type]} >
                    <p className={style.courseCateName_font}>{this.props.item.instrTypeName}</p>
                    <div className={style.courseModel_font}>
                        {this.props.item.levelNum ? this.props.item.levelNum + word : word_xzb}
                        <br />
                        {this.props.item.level ? '(' + this.props.item.level + ')' : ''}
                    </div>
                    <p className={style.beginTime_font}>{this.props.item.createDate}</p>
                </div>
                {elem}
                {courseBtn}
            </div>
        )
    }
}

export default CourseCate