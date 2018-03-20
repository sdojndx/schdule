import {CHANGE_SIZE} from "../action/wsize"
const initialState = {
	
}
export default (state=initialState,action)=>{
	switch (action.type){
		case CHANGE_SIZE:
			return action.info
		default:
			return state
	}
}