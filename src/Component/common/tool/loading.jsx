import style from '../../../style/tool.scss'
import React,{Component} from "react"
import {Link} from "react-router"
import Animate from 'rc-animate'
import {WinAnimate} from "../animate"

export default class Loading extends Component {
	render(){
		return (
			<WinAnimate>
				<div					
					className={style.loading}
					visible={this.props.loadStatus>0}
				>
					<div className={style.loading_bg}/>
					<div className={style.loading_image}/>	
				</div>	
			</WinAnimate >
		)
	}
}