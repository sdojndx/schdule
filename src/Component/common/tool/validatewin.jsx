import style from '../../../style/tool.scss'
import React,{Component} from "react"
import {Link} from "react-router"
import Animate from 'rc-animate'

export default class ValidateWin extends Component {
	render(){
		var _self=this;
		if(this.props.validateInfo.result){
			var winStyle = {
				position:this.props.validateInfo.position||"absolute",
				top:this.props.validateInfo.top,
				left:this.props.validateInfo.left
			}
			var items=[];
			for(var name in _self.props.validateInfo.result){
				var item = _self.props.validateInfo.result[name];
				items.push(
					<p 
					key={name}
					className={item.pass?style.validate_pass:style.validate_fail
					}>
						{item.text}
					</p>
				);
			}		
			return (
				<Animate
	          		showProp="visible"
					transitionName = "fade"	
					className={style.validate}
					style={winStyle}
					component="div"
				>
					<div key="arrow" className={style.validate_arrow}/>
					<div key="box" className={style.validate_box}>
						{items}
					</div>	
				</Animate >
			)
		}else{
			return <div style={{display:"none"}}></div>
		}
	}
}