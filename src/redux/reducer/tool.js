import {ADD_LOAD,DELETE_LOAD,UPLOAD_VALIDATE,UPDATE_ALERT} from "../action/tool"
const initialState = {
	loadStatus:0,
	validateInfo:{},
	swwinInfo:{}
}
export default (state=initialState,action)=>{
	switch (action.type){
		case ADD_LOAD:
			return Object.assign({},state,{loadStatus:state.loadStatus+1})
		case DELETE_LOAD:{
			let status = state.loadStatus;
			if(status>0){
				status--
			}
			return Object.assign({},state,{loadStatus:status});
		}
		case UPLOAD_VALIDATE:
			return  Object.assign({},state,{validateInfo:action.info});
		case UPDATE_ALERT:
			return Object.assign({},state,{swwinInfo:action.info})
		default:
			return state
	}
}