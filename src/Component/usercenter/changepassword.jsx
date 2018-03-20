import style from "../../style/changepassword.scss"
import React,{Component} from "react"
import PageNav from "../common/pagenav"
import Buttons from "../common/buttons"
import {post,alert} from "../common/pubfn"
import AlertWin from "../win/alertwin"
import requestpath from "../../datesource/requestpath"

class ChangePW extends Component{
	constructor(props){
		super(props);
		this.state={
			vals:{
				prevPW:"",
				newPW:"",
				confirmPW:""
			},
			requestShow:false,
		}
	}
	render(){
		return(
			<PageNav
				firstClassTit="修改密码"
				hasSelect="0"
				style={{paddingBottom: '1px'}}
			>
				<div className={style.PW_container}>
					<div className={style.item_container}>
						<div className={style.left_container}>
							<span>*</span>
							<p>原密码</p>
						</div>
						<input type="text" placeholder="请输入原密码" name="prevPW" onBlur={this.setValue.bind(this)}/>
					</div>
					<div className={style.item_container}>
						<div className={style.left_container}>
							<span>*</span>
							<p>新密码</p>
						</div>
						<input type="password" placeholder="请输入新密码" name="newPW" onBlur={this.setValue.bind(this)}/>
					</div>
					<div className={style.item_container}>
						<div className={style.left_container}>
							<span>*</span>
							<p>确认密码</p>
						</div>
						<input type="password" placeholder="请确认新密码" name="confirmPW" onBlur={this.setValue.bind(this)}/>
					</div>
				</div>
				<div style={{textAlign:"center",marginTop:"30px"}}>
					<Buttons
						style={{ width: "100px", height: "36", backgroundColor: "#3e91eb" }}
						btnName="取消"
						onClick={() => this.props.history.goBack()}
					>
					</Buttons>
					<Buttons
						style={{ width: "100px", height: "36", backgroundColor: "#f59524", marginLeft: "20px" }}
						btnName="保存"
						onClick={this.changePW.bind(this)}
					>
					</Buttons>
				</div>
			</PageNav>
		)
	}
	setValue(e){
		var val = e.target.value;
		var name=e.target.name;
		var obj = Object.assign({},this.state.vals);
		obj[name]=val;
		this.setState({vals:obj})
	}
	changePW(e){
		var _self=this;
		var vals = Object.assign({},this.state.vals);
		if(vals.prevPW==""||vals.newPW==""||vals.confirmPW==""){
			alert("输入框不得为空！")
			return;
		}else if(vals.prevPW==vals.newPW){
			alert("原密码不可与新密码一致！")
			return;
		}else if(vals.newPW!=vals.confirmPW){
			alert("确认密码与新密码不一致！")
			return;
		} 
		var url=requestpath.changePW;
		var data={
			data:{
				password:vals.prevPW,
				newPassword:vals.newPW
			}
		}
		post(url, data
		).then(function (json) {
			if(json.code==1){
				alert(json.message)
			}else{
				alert(json.message)
			}

		}).catch(function () {
		})
	}
	hideReqWin(){
		this.setState({ requestShow: !this.state.requestShow })
	}
}

export default ChangePW