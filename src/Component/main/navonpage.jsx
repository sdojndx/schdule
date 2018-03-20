import style from "../../style/index.scss"
import React,{Component} from "react"
import {Link} from "react-router"
import { connect } from "react-redux"

class NavOnPage extends Component{
	render(){
		return(
			<ul 
				className={style.sub_nav +" "+this.props.showClass} 
				count={this.props.count}
			>
				{
					this.props.item.child.map((subnav,index)=>{
						return(
							<li 
								className={style.sub_nav_item} 
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
}

export default NavOnPage