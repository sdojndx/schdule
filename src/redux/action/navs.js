export const CHANGE_NAV = 'CHANGE_NAV'
export const INIT_NAV = 'INIT_NAV'
export const changeNav = (navs) => {
	return {type:CHANGE_NAV,navs}
}
export const initNav = (navs) => {
	return {type:INIT_NAV,navs}
}
