import style from "../../style/students.scss"
import React,{Component} from "react"
import {Link} from 'react-router'
import PageNav from '../common/pagenav'

class StudentAccountNull extends Component{
    constructor(props) {
        super(props);
    }

     render(){
         return(
             <PageNav
                 firstClassTit="学生管理"
                 hasSelect="1"
             >
                 <div className={style.content_null}>
                     <div className={style.content_null_bg}></div>
                     <span>学生账号尚未创建，请购买产品并创建学生账号。</span>
                 </div>
             </PageNav>
         )
     }
}

export default StudentAccountNull
