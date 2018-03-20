import style from "../../style/index.scss"
import React,{Component} from "react"
import {Link,History} from "react-router"
import NavElem from "./NavElem"
import store from "../../redux/store"
import { initNav,changeNav } from "../../redux/action/navs"
import { connect } from "react-redux"
import {post} from "../common/pubfn"
import requestpath from "../../datesource/requestpath"
// import store from "../../redux/store"
// import {changeShow} from "../../redux/action/navs"
//import SubNav from "./SubNav"

class Navs extends Component{
	constructor(){
		super()
	}
	componentDidMount(){
		var _self=this;
		var data={
			data:"5"
		}
		post(requestpath.getfunction,data).then(function(json){
			store.dispatch(initNav(json))
			store.dispatch(changeNav(_self.props.location.pathname));
		})
		if(window.cxt.loopTime){
			var getmeg = setInterval(function(){
				_self.getMsgList();
			}, window.cxt.loopTime * 1000);
		}
	}
	render(){
		return (
			<div 
				className={style.navs_content}
			>
				<div className={style.info_wrap}>
					<div className={style.logo}></div>	
					<ul className={style.nav_wrap}> 
						{this.props.navlist.map((elem,index)=>
							<NavElem 
								item={elem} 
								showClass={this.props.enternav[0]==index?style.active:""} 
								key={index}
								onLink={()=>this.onLink(index)}
							/>
						)}                
					</ul>
					<ul className={style.user}>
						<li className={style.user_item}></li>
						<li className={style.user_item}>
							<Link to="message/">
								<i className="fa fa-envelope"></i>
							</Link>
						</li>
						<li className={style.user_item}>
							<Link to="changepassword/">
								<i className="fa fa-user"></i>
							</Link>
						</li>
						<li className={style.user_item}>
							<a href="loginout">
								<i className="fa fa-power-off"></i>
							</a>
						</li>
					</ul>
				</div>
				<div className={style.second_nav}>
					
				</div>
			</div>
		)
	}
	getMessage(){
		post(requestpath.getMessage,{data:"",metaDataCode:""}).then(function(json){

		})
	}
	onLink(index){
		var nav = this.props.navlist[index];
		if(nav.child.length>0){
			var snav = nav.child[0];
			if(snav.url){
				this.props.history.push(snav.url)
			}
		}
	}
	//switchSub(index){
		// this.setState({
		// 	showNav:index
		// })
	// 	store.dispatch(changeShow(index));
	// }
}

export default connect((state)=>{
	return state.navs
})(Navs)