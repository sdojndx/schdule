import "babel-polyfill"
import "es5-shim/es5-shim"
import "es5-shim/es5-sham"
import "./style/font-awesome"
import "./style/reset";
import React from "react"
import ReactDom from "react-dom"
import Login from "./Component/login/login"

if(NODE_ENV!=="local"){
	__webpack_public_path__ = cxt.staticWebHost+"/schooladmin/";
}
ReactDom.render(
	<Login/>,
	document.body.appendChild(document.createElement('div'))
);