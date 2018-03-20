import React,{Component} from "react"
import Navs from "./Navs"
import Footer from "./Footer"
import Tool from "../common/tool.jsx"
import store from "../../redux/store"
import { initEnums } from "../../redux/action/enums"
import { connect } from "react-redux"
import {post} from "../common/pubfn"
import requestpath from "../../datesource/requestpath"

class Main extends Component{
	constructor() {
        super();
        this.state={
        	getEnums:false,
        	hasLoadRight:true
        }
    }
    componentDidMount(){
		var _self=this;
		var data={
			data:""
		}
		post(requestpath.getallconsts,data).then(function(json){
			store.dispatch(initEnums(json))
			_self.setState({getEnums:true});
		})
		post(requestpath.getRight,data).then(function(json){
			if(json.data){
				var iframe = document.createElement("iframe");
				document.body.appendChild(iframe);				
				// iframe.addEventListener("load",function(){
				// 	_self.setState({hasLoadRight:true});
				// })
				iframe.src = json.data;
				iframe.style.display = "none";
			}
		})
	}
    render(){
    	if(this.state.getEnums&&this.state.hasLoadRight){
	    	return (
	    		<div>
		    		<Navs location={this.props.location}/>
					<div>
						{this.props.children}
					</div>
					<Footer/>
					<Tool/>
				</div>
	    	)
	    }else{
	    	return <div></div>
	    }
    }
}
export default connect((state)=>{
	return state.enums
})(Main)