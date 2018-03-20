import style from "../../style/index.scss"
import React,{Component} from "react"
import {Link} from "react-router"

class NavElem extends Component{
	render(){
		var elem = "";
		if(this.props.item.url==""){
			elem = (
				<li 
					className={style.main_nav_item+" "+this.props.showClass}
					onClick={this.props.onLink}
				>
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