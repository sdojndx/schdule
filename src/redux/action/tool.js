export const ADD_LOAD = 'ADD_LOAD'
export const DELETE_LOAD = 'DELETE_LOAD'
export const UPLOAD_VALIDATE = 'UPLOAD_VALIDATE'
export const UPDATE_ALERT = 'UPDATE_ALERT'


export const addLoad = () => {
	return {type:ADD_LOAD}
}

export const delLoad = () => {
	return {type:DELETE_LOAD}
}

export const uploadValidate = (info) => {
	return {type:UPLOAD_VALIDATE,info}
}

export const updateAlert = (info) =>{
	return {type:UPDATE_ALERT,info}
}