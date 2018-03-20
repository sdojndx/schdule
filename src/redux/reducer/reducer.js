import { combineReducers } from "redux"
import tool from "./tool"
import navs from "./navs"
import authority from "./authority"
import enums from "./enums"
import dropdownlist from "./dropdownlist"
import wsize from "./wsize"

export default combineReducers({
	tool,
	navs,
	authority,
	enums,
	dropdownlist,
	wsize
})