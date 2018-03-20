import style from "../../style/classroom.scss"
import React,{Component} from "react"
import {Link} from "react-router"

export default class HasNoItems extends Component {
	render(){
		return (
			<div className={style.classroom_container}>
				<div className={style.classroom_left}></div>
				<div className={style.classroom_right}>
					<p className={style.classroom_second_title}>{this.props.classroomTittle}</p>
					{this.props.children}
				</div>
			</div>
		)
	}
}