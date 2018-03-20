import style from "../../style/indexbanner.scss"
import React,{Component} from "react"
import { History } from "react-router"

class Index extends Component{
	constructor() {
        super();
    }
    componentWillMount(){        
        // if(window.cxt.accountType=="3"){
        //     this.props.history.push("courseselect");
        // }
    }
    render(){
    	return (
        <div className={style.index_banner}>
           <a href="/schooladmin/#/academicyear">立即体验</a>
           <div className={style.title_first}>智能选排课系统</div>
           <div className={style.title_second}>创新教学管理 提升教师素质<br/> 尊重学生个性</div> 
        </div>
        )
    }

}
export default Index