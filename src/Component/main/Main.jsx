import style from "../../style/index.scss"
import React,{Component} from "react"
import Navs from "./Navs"
import Footer from "./Footer"
import Tool from "../common/tool.jsx"
import store from "../../redux/store"
import { initEnums } from "../../redux/action/enums"
import { changeSize } from "../../redux/action/wsize"
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
		window.addEventListener('resize', function(){
			try{
				clearTimeout(_self.withReseze);
			}catch(e){
				
			}
			_self.withReseze = setTimeout(function(){
				_self.bgResize();
			},100);			
		});
		_self.bgResize();
	}
    render(){
    	if(this.state.getEnums&&this.state.hasLoadRight){
	    	return (
	    		<div>
		    		<Navs 
		    			location={this.props.location}
		    			history={this.props.history}
		    		/>
					<div className={style.main_content}>
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
    bgResize(){
    	var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		width=width<1260?1260:width;
		store.dispatch(changeSize({width:width,height:height}));
    }
}
export default Main
// connect((state)=>{
// 	return state.wsize
// })(Main)