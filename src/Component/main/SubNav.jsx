import style from "../../style/index.scss"
import React,{Component} from "react"
import {Link} from "react-router"

class SubNav extends Component{
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
			/*<ul className={style.sub-nav" data-mnav="30">                                    
				<li className={style.sub-nav-item">
					<a className={style.snav-link" href="/StudyYear1">
						<span className={style.snav-title" title="学年管理">学年管理</span>
					</a>
				</li>
			
				<li className={style.sub-nav-item">
					<a className={style.snav-link" href="/SchoolTime1">
						<span className={style.snav-title" title="上课时间">上课时间</span>
					</a>
				</li>
							
			</ul>*/
		)
	}
}

export default SubNav