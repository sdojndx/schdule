import style from "../../style/teachers.scss"
import React,{Component} from "react"
import {Link} from 'react-router'
import PageNav from '../common/pagenav'

class TeacherAccountNull extends Component{

    constructor(props) {
        super(props);
     }

    render(){
        return(
            <PageNav
                firstClassTit="教师管理"
                hasSelect="1"
            >
                <div className={style.content_null}>
                    <div className={style.content_null_bg}></div>
                    <span>教师账号尚未创建，请购买产品并创建教师账号。</span>
                </div>
            </PageNav>
        )
    }
}

export default TeacherAccountNull
