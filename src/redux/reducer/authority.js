import {UPDATE_AUTHORITY} from "../action/authority"
const initialState = {
}
export default (state=initialState,action)=>{
	switch (action.type){
		case UPDATE_AUTHORITY:
			return Object.assign({},state,action.auth)		
		default:
			return state;
	}
}