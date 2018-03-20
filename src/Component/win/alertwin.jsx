import style from "../../style/alertwin.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import Button from "../common/buttons"
import {WinAnimate} from "../common/animate"

export default class AlertWin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			init:false,
			top: this.props.top || "150",
			//left: this.props.left || "50%",
			relativeX: null,
			relativeY: null,
			isDragging: false,
			hasposition:false
		}
		this.handleMouseUp=this.handleMouseUp.bind(this);
		this.handleMouseMove=this.handleMouseMove.bind(this);
	}
	componentDidMount(){
		if(this.props.isShow){
			this.fixoption();
		}
	}
	componentDidUpdate(prevProps, prevState){
		if(!this.state.hasposition&&prevProps.isShow!==this.props.isShow){
			this.fixoption();
		}
	}
	render() {
		var bts = "";
		if (this.props.btnLeftName && this.props.btnRightName) {
			bts = (<div>
				<Button
					style={{
						backgroundColor: "#3e91eb",
						width: 100,
						height: 36
					}}
					btnName={this.props.btnLeftName}
					onClick={this.props.close}
				/>
				<Button
					style={{
						backgroundColor: "#f59524",
						width: 100,
						height: 36,
						marginLeft: 20
					}}
					btnName={this.props.btnRightName}
					onClick={this.submit.bind(this)}
				/>
			</div>)
		} else if (this.props.btnName) {
			bts = (<div>
				<Button
					style={{
						backgroundColor: "#3e91eb",
						width: 100,
						height: 36
					}}
					btnName={this.props.btnName}
					onClick={this.props.btnAct}
				/>
			</div>)
		} else {
			bts = this.props.bts;
		}
		return (
			<WinAnimate>
				<div 
					className={style.win_c} 
					visible={this.props.isShow}
					style={{ display: this.props.isShow ? "block" : "none" }}
				>
					<div className={style.win_mask}></div>
					<div
						ref="content"
						className={style.win_case}
						style={{
							width: this.props.width || 900,
							height: this.props.height || "auto",
							backgroundColor: this.props.bgcolor || '#fff',
							top:this.state.top,
							left: this.state.left,
						}}
					>
						<div 
							className={style.win_nav}
							onMouseDown={this.handleMouseDown.bind(this)}
							//onMouseMove={this.handleMouseMove.bind(this)}
							//onMouseUp={this.handleMouseUp.bind(this)}
						>
							<span className={style.close_btn} onClick={this.props.close} onMouseDown={this.stopPropagation}></span>
							<span onMouseDown={this.stopPropagation}>{this.props.navTitle}</span>
							{this.props.navSecondTitle ? <span className={style.navSecondTitle}>{this.props.navSecondTitle}</span> : ""}
						</div>
						<div
							className={style.win_content}
							style={{
								paddingLeft: this.props.contentPaddingLeft,
								padding: this.props.contentPadding
							}}
						>
							{this.props.children}
						</div>
						<div className={style.win_btn_case}>
							{bts}
						</div>
						{this.props.msg ?
							<div className={style.win_msg}>
								<span className={style.notice_icon}></span>
								{this.props.msg}
							</div> : ""
						}
					</div>
				</div>
			</WinAnimate>
		)
	}
	submit() {
		//this.props.close();
		if(this.props.submit()!==false){
			this.props.close();
		}
	}
	handleMouseDown(e) {
		var targetLeft=e.target.parentElement.offsetLeft;
		var targetTop=e.target.parentElement.offsetTop;
		var clientX=e.clientX-targetLeft;
		var clientY=e.clientY-targetTop;
		this.setState({
			relativeX:clientX,
			relativeY:clientY,
			isDragging:true,
		})
		document.addEventListener("mouseup", this.handleMouseUp,false)
		document.addEventListener("mousemove", this.handleMouseMove,false)
	}
	handleMouseMove(e){
		//if(this.state.isDragging){
			var content=this.refs.content;
			var moveX = e.clientX - this.state.relativeX;
			var moveY = e.clientY - this.state.relativeY;			
			var ch = content.clientHeight;
			var cw = content.clientWidth;
			var wh = window.innerHeight;
			var ww = window.innerWidth;
			if(moveX>ww-cw){
				moveX = ww-cw;
			}
			if(moveX<0){
				moveX=0;
			}
			if(moveY>wh-ch){
				moveY = wh-ch;
			}
			if(moveY<0){
				moveY=0;
			}
			this.setState({
				left:moveX,
				top:moveY
			})
		//}
	}
	handleMouseUp(e){
		//e.preventDefault();
		this.setState({
			isDragging:false,
			relativeX:null,
			relativeY:null,
		});
		document.removeEventListener("mouseup", this.handleMouseUp,false)
		document.removeEventListener("mousemove", this.handleMouseMove,false)
	}
	fixoption(){
		var content=this.refs.content;
		var ch = content.clientHeight;
		var cw = content.clientWidth;
		var wh = window.innerHeight;
		var ww = window.innerWidth;
		var top = (wh-ch)/2;
		var left = (ww-cw)/2;
		top=top>0?top:0;
		this.setState({
			left:left,
			top:top,
			hasposition:true
		})
	}
	stopPropagation(e){
		e.stopPropagation();
	}
}