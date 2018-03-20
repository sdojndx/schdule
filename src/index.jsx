import "babel-polyfill"
import "es5-shim/es5-shim"
import "es5-shim/es5-sham"
import "./style/font-awesome"
import "./style/reset"
import React from "react"
import ReactDom from "react-dom"
import route from './router/managerroute'

import { LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';


if(NODE_ENV!=="local"){
	__webpack_public_path__ = cxt.staticWebHost+"/schooladmin/";
}
ReactDom.render(
	<LocaleProvider locale={zh_CN}>{route}</LocaleProvider>,
	document.body.appendChild(document.createElement('div'))
);