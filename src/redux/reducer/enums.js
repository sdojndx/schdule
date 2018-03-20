import { INIT_ENUMS } from "../action/enums"
import Enums from "../../datesource/enums"
const initialState = Enums
export default (state = initialState, action) => {
	switch (action.type) {		
		case INIT_ENUMS:
			{
				var enums = Object.assign({}, state);
				enums = action.enums;
				return enums;
			}
		default:
			return state

	}
}