import style from "../../style/index.scss"
import React,{Component} from "react"
import {Link} from "react-router"
import { connect } from "react-redux"
//import codemap from "../../datesource/codemap"

class SecondNav extends Component{
	constructor() {
        super();
        this.state = {

        }
    }
    componentDidMonunt(){

    }
    render(){
    	var navs="",navlist = [];
    	for(var i=0,l=this.props.navs.navlist.length;i<l;i++){
    		if(this.props.navs.navlist[i].name == this.props.navs.enternav[0]){
    			navlist = this.props.navs.navlist[i].child;
    			break;
    		}
    	}
		if(navlist.length>0){
			navs = (
    			<ul 
					className={style.sub_nav +" "+this.props.showClass} 
					count={this.props.count}
				>
					{
						navlist.map((subnav,index)=>{
							return(
								<li 
									className={style.sub_nav_item+(subnav.name==this.props.navs.enternav[1]?" "+style.active:"")} 
									key={index}
								>
									<Link 
										className={style.snav_link} 
										to={subnav.url}
									>
										<span 
											activeClassName={style.navActived} 
											className={style.snav_title} 
											title={subnav.name}
										>
											{subnav.name}
										</span>
									</Link>
								</li>
							)
						})
					}
				</ul>
			)
		}
    	return (    		
    		<div>
    			<div className={style.sub_nav_wrap}>
    				{navs}
				</div>
				{this.props.children}
			</div>
    	)
    }
}
export default connect((state)=>{
	const {navs}=state;
	return {navs}
})(SecondNav)