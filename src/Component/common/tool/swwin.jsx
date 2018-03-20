import React,{Component} from "react"
import AlertWin from "../../win/alertwin"

export default class SwWin extends Component{
	render(){
		var win = null;
		if(this.props.type=="alert"){
			win = <AlertWin
				width={500}
				bgcolor="#ffffff"
				navTitle="提示"
				btnName="确定"
				bgColor="#3e91eb"
				isShow={this.props.isShow}
				close={this.props.callback}
				btnAct={this.props.callback}
			>
				<p style={{
					width: "100%",
				    textAlign: "center",
				    fontSize: "20px",
				    color: "#3f93eb"
				}}>
					{this.props.text}！
				</p>
			</AlertWin>
		}
		return (
			<div>
				{win}
			</div>
		)
	}
}