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
    	var navs,contents,navlist=[];
    	var navinfo=this.props.navs.navlist[this.props.navs.enternav[0]];
    	if(navinfo){
    		navlist = this.props.navs.navlist[this.props.navs.enternav[0]].child;
    	}
    	// for(var i=0,l=this.props.navs.navlist.length;i<l;i++){
    	// 	if(this.props.navs.navlist[i].name == this.props.navs.enternav[0]){
    	// 		navlist = this.props.navs.navlist[i].child;
    	// 		break;
    	// 	}
    	// }
		if(navlist.length>0){
			navs = (
    			<ul 
					className={style.sub_nav} 
					count={this.props.count}
					style={{
						height:this.props.wsize.height-72
					}}
				>
					{
						navlist.map((subnav,index)=>{
							return(
								<li 
									className={style.sub_nav_item+(index==this.props.navs.enternav[1]?" "+style.active:"")+(index==0?" "+style.first_nav:"")} 
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
			contents = (
				<div 
    				className={style.sub_main}
    				style={{
    					width:this.props.wsize.width-200
    				}}
    			>
					{this.props.children}
				</div>
			)
		}else{
			contents = this.props.children
		}
    	return (    		
    		<div 
    			className={style.second_nav}
    			style={{
					width:this.props.wsize.width
				}}
    		>
    			{navs}
    			{contents}
			</div>
    	)
    }
}
export default connect((state)=>{
	const {navs,wsize}=state;
	return {navs,wsize}
})(SecondNav)