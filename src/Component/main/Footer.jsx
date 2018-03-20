import style from "../../style/index.scss"
import React,{Component} from "react"

class Footer extends Component{
	constructor(){
		super()
	}
	render(){
		return (
			<div 
				className={style.footer}
			>
				<p>北京高拓电子科技有限责任公司 北京壹灵壹教育科技股份有限公司</p>
				<p>Copyright 2015-2016 chinaedu.com, All Rights Reserved 京ICP证010506号</p>
				<p>全国客服电话：400-6869-101 传真：010-84640631</p>
			</div>
		)
	}
}
export default Footer