import React,{Component} from "react"
import { connect } from "react-redux"
import managercodemap from "../../datesource/managercodemap"
import requestpath from "../../datesource/requestpath"
import {post} from "../common/pubfn"
import store from "../../redux/store"
import { updateAuthority } from "../../redux/action/authority"
import { History } from "react-router"
export default (WrappedComponent)=>{
	class Authority extends Component{
		constructor(props){
			super(props)
			this.state = {
				getauthority:false
			}
		}
		mixins:[History]
		componentDidMount(){
			this.getAuthority();
		}
		render(){
			if(this.state.getauthority){
				return <WrappedComponent history={this.props.history} params={this.props.params} authority={this.state}/>
			}else{
				return <div></div>
			}
		}
		getAuthority(){			
			var _self=this;
			// var path = "";this.props.route.path;
			// for(var i=0,l=this.props.routes.length;i<l;i++){
			// 	if(this.props.routes[i].path){
			// 		path=this.props.routes[i].path;
			// 	}else{
			// 		break;
			// 	}
			// }
			var path =this.props.routes[1].path;
			if(this.props.authority&&this.props.authority[path]){
				_self.setState(this.props.authority[path]);
			}else{
				post(requestpath.getmatadatecode,{metaDataCode:managercodemap[path]}).then(function(json){
					var auth = {getauthority:true}
					if(json.buttons){
						json.buttons.map(function(elem,index){
							auth[elem.name] = elem;
						})
					}
					_self.setState(auth);
					var source = {};
					source[path]=auth;
					store.dispatch(updateAuthority({authority:source}));
				})
			}
		}
	}
	return connect((state)=>{
		return state.authority
	})(Authority)
}