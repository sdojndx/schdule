import style from "../../style/stuselectcourse.scss"
import React,{Component} from "react"
import {Link} from 'react-router'
import CourseItems from "./stucourseitems"
import PageNav from '../common/pagenav'
import { post } from "../common/pubfn"


class CourseSelect extends Component{
	constructor(props) {
		super(props);

		this.state = {
			itemList:[]
		};
	}
	componentDidMount() {
		this.getList();
	}
	render(){
		var len = this.state.itemList.length;
		return (
			<PageNav 
				firstClassTit="我的选课" 
				hasSelect="2"
			>
			<div className={style.content}>
				<div className={style.courseCase}>
					{
						this.state.itemList.map(function(elem, index) {
							return (
								<CourseItems
									key={elem.id}
									islast = {index==len-1}
									item={elem}
								/>
							)
						})
					}
				</div>
			</div>
			</PageNav>
		)
	}
	getList(){
		var _self=this;
		if (_self.props.authority.getList) {
			post(_self.props.authority.getList.sourceCode,
				{
					"data":""

				}
			).then(function (json) {
				_self.setState({"itemList":json.items})
			})
		}
	}
	
}
export default CourseSelect