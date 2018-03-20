import { UPDATE_DROPDOWN } from "../action/dropdownlist"
const initialState = {
}
export default (state = initialState, action) => {
	switch (action.type) {		
		case UPDATE_DROPDOWN:
			{
				var dropdownlist = Object.assign({}, state,action.typelist);
				return dropdownlist;
			}
		default:
			return state

	}
}