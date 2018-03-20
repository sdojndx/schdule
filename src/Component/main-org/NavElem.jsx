import style from "../../style/index.scss"
import React,{Component} from "react"
import {Link} from "react-router"

class NavElem extends Component{
	render(){
		var elem = "";
		if(this.props.item.url==""){
			elem = (
				<li className={style.main_nav_item+" "+this.props.showClass}>
					<a 
						className={style.mnav_link} 
						href="javscript:void(0)"
					>
						<span 
							className={style.mnav_title}
							title={this.props.item.name}
						>
							{this.props.item.name}
						</span>
					</a>
					<div className={style.sub_nav_wrap_pos}>
						<ul className={style.sub_nav_pos +" "+this.props.showClass} count={this.props.count}>
							 {
								this.props.item.child.map((subnav,index)=>{
									return(
										<li key={index}>
											<Link to={subnav.url}>
												<span title={subnav.name}>{subnav.name}</span>
											</Link>
										</li>
									)
								})
							 }
						</ul>
					</div>     
				</li>
			)
		}else{
			elem = (
				<li className={style.main_nav_item+" "+this.props.showClass}>
					<Link 
						className={style.mnav_link} 
						to={this.props.item.url}
					>
						<span 
							className={style.mnav_title} 
							title={this.props.item.name}
						>
							{this.props.item.name}
						</span>
					</Link>    
				</li>
			)
		}
		return elem
	}
}

export default NavElem