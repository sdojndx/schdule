import React,{Component} from "react"
import { connect } from "react-redux"
import Loading from "./tool/loading"
import ValidateWin from "./tool/validatewin"
import SwWin from "./tool/swwin"


class Tool extends Component {	
	render(){
		return (
			<div>
				<Loading loadStatus={this.props.tool.loadStatus}/>
				<ValidateWin validateInfo={this.props.tool.validateInfo}/>
				<SwWin {...this.props.tool.swwinInfo}/>
			</div>
		)
	}
	
}
export default connect((state)=>{
	return state
})(Tool)