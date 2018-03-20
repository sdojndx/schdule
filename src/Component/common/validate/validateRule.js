
export const rule = {
	0:{
	},
	1:{
		email:{
			value:true,
			text:"请输入有效的邮箱"
		}
	},
	2:{
		number:{
			value:true,
			text:"只能输入数字"
		}
	},
	3:{
		naturalNumber:{
			value:true,
			text:"只能输入正整数"
		}
	},
	4:{
		wordornumber:{
			value:true,
			text:"只能输入数字字母"
		}
	},
	5:{
		characterornumber:{
			value:true,
			text:"只能输入汉字数字字母"
		}
	},
	6:{
		phone:{
			value:true,
			text:"请输入有效手机号码"
		}
	},
	7:{
		website:{
			value:true,
			text:"请输入有效网址,如 http://www.baidu.com"
		}
	},
	8:{
		telephone:{
			value:true,
			text:"请输入有效电话号码,如 010-84387536"
		}
	},
	9:{
		date:{
			value:true,
			text:"请输入有效日期"
		}
	},
	10:{
		datetime:{
			value:true,
			text:"请输入有效时间"
		}
	},
	11:{
		limitnumber:{
			value:true,
			text:"请输入0.0至100.0间的数字"
		}
	},
	12:{
		twoCharacter:{
			value:true,
			text:"请输入2位数字字母"
		}
	},
	13:{
		normalmoney:{
			value:true,
			text:"请输入有效金额"
		}
	},
	14:{
		twonum:{
			value:true,
			text:"请输入两位数字"
		}
	},
	15:{
		positiveInteger:{
			value:true,
			text:"请输入正整数"
		}
	},
	16:{
		normalcharacter:{
			value:true,
			text:"请输入8-16位数字、字母、符号（#@!~%^&*）组合"
		}
	},
	17:{
		threenumber:{
			value:true,
			text:"请输入三位数字"
		}
	},
	// 18:{
	// 	characterandbrackets:{
	// 		value:true,
	// 		text:"请输入汉字数字字母和符号如 ( ) 空格 + # - 、 _ $ / < > [ ] 《 》"
	// 	}
	// },
	18:{
		characterandbrackets:{
			value:true,
			text:"请输入汉字数字字母和符号如 _( ) （ ）"
		}
	},
	19:{
		decimalinteger:{
			value:true,
			text:'请输入整数或一位小数'//测试人员特约规则，不通用
		}
	},
	20:{
		characterandbracketstwo:{
			value:true,
			text:"请输入汉字数字字母和符号如 ( ) （ ） 空格 + # - 、 _ $ / < > [ ] 《 》"
		}
	},
	21:{
		characterandbracketsthr:{
			value:true,
			text:'请输入汉字数字字母和符号如 ( ) （ ） 空格 + # - 、 _ $ / < > "" [ ] 《 》'
		}
	},
	801:{
		checkidnumber:{
			value:true,
			text:"请输入正确的身份证号码"
		}
	},
	802:{
		money:{
			value:true,
			text:'请输入"-99999.99至999999.99"元间的有效金额'//测试人员特约规则，不通用
		}
	},
	803:{
		decimalinteger:{
			value:true,
			text:'请输入整数或一位小数'//测试人员特约规则，不通用
		}
	},
	804:{
		absoluteWebsite:{
			value:true,
			text:'请输入绝对网址，如“http(s)://xxx.xx”或“ftp://xxx.xx”'
		}
	},
	805:{
		datesection:{
			value:true,
			text:'起始时间需输入完整或者均不输入'
		}
	},
	806:{
		fileextension:{
			value:true,
			text:"请输入有效文件扩展名"
		}
	},
	807:{
		schoolYears: {
			value: true,
			text: "请输入0~10间数字（不包含0），可保留一位小数"
		}
	},
	808:{
		onlytime:{
			value: true,
			text: "请输入有效时间"
		}
	},
	809:{
		naturalNumberZH:{
			value:true,
			text:"只能输入0或小于等于100的正整数"
		}
	},
	810:{
		rangemust:{
			value: true,
			text: "请将范围填写完整"
		}
	},
	811:{
		twodecimal:{
			value: true,
			text: "请输入整数或两位小数"
		}
	},
	812:{
		naturalTwodecimal:{
			value: true,
			text: "请输入0~100的整数或保留1-2位小数"
		}
	},
	813:{
		plusoneortwodecimal:{
			value:true,
			text:"请输入整数或1-2位的小数"
		}
	},
	814:{
		naturalNumberNzero:{
			value:true,
			text:"请输入大于等于0的整数"
		}
	},
	815:{
		passport:{
			value:true,
			text:"请输入正确护照号"
		}
	},
	816:{
		passport:{
			value:true,
			text:"请输入正确港澳台证件号"
		}
	},
	817:{
		certificate:{
			value:true,
			text:"请输入正确军官证/士兵证号"
		}
	},
	818:{
		charSeparator: {
			value: true,
			text: "请输入有效扩展名，必要时以分号(；或;)分隔"
		}
	},
	819:{
		positiveMoney:{
			value:true,
			text:'请输入有效金额'
		}
	},
	820:{
		onlytwodecimal:{
			value:true,
			text:'请输入两位小数'
		}
	},
	821: {
		score: {
			value: true,
			text: '请输入[0, 100]之间的整数或者保留一位小数点的小数'
		}
	},
	822:{
		notzero:{
			value: false,
			text: '不能为0'
		},
		alloneortwodecimal:{
			value: true,
			text: '请输入俩位以内有效数字'
		}
	},
	823:{
		GraduationYears:{
			value: true,
			text: '请输入[0, 100)之间的数字（允许输入一位小数)'
		}
	},
	824:{
		monthValidate:{
			value:true,
			text:"请输入[0, 12]之间的整数"
		}
	},
	9999:{
		keyword:{
			value:true,
			text:'关键词请以逗号分开'
		}
	}
}
var validateFunction = {
	limitlength:function(rule,value){
		var length = rule.value.split("-");
		var minlen = parseInt(length[0]);
		var maxlen = parseInt(length[1]);
		if(minlen>maxlen){
			console.log("长度规则设置有误！ minlength+maxlength");
			return false;
		}else{
			var l = value.length;
			if(l>=minlen&&l<=maxlen){
				return true;
			}else{
				return false;
			}
		}
	},
	number:function(rule,value){
		if(/^\d+$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	keyword:function(rule,value){
		return true;
	},
	naturalNumber:function(rule,value){
		if(/^[1-9]\d*$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	naturalNumberZH:function(rule,value){
		if(/^((\d|[1-9]\d)|100)$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	allownull:function(rule,value){
		if(value==""){
			return rule.value;
		} else{
			return true;
		}
	},
	maxlength:function(rule,value){
		if(value.length>rule.value){
			return false;
		}else{
			return true;
		}
	},
	minlength:function(rule,value){
		if(value.length<rule.value){
			return false;
		}else{
			return true;
		}
	},
	eqlength:function(rule,value){
		if(value.length!==rule.value){
			return false;
		}else{
			return true;
		}
	},
	email:function(rule,value){
		if(/^([a-zA-Z0-9][_\.\-]*)+\@([A-Za-z0-9])+((\.|-|_)[A-Za-z0-9]+)*((\.[A-Za-z0-9]{2,15}){1,2})/g.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	phone:function(rule,value){
		if(/^(0|86|17951)?1[34578]\d{9}$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	telephone:function(rule,value){
		if(/^(0[0-9]{2,3}-?)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	normalmoney:function(rule,value){
		if(/^[-|+]?\d*(\.\d{1,2})?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	positiveMoney:function(rule,value){
		if(/^\d*(\.\d{1,2})?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	money:function(rule,value){
		if(/^[-|+]?\d*(\.[\d]{1,2})?$/.test(value)==rule.value){
			if(value >= -99999.99 && value <= 999999.99){
				return true;
			} 
		}
		return false;
	},
	twonum:function(rule,value){
		if(/^\d{2}$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	naturalnumber:function(rule,value){
		if(/^[1-9]\d*$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	positiveInteger:function(rule,value){
		if(/^\+?[0-9][0-9]*$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	wordornumber:function(rule,value){
		if(/^[0-9a-zA-Z]+$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	characterornumber:function(rule,value){
		if(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	website:function(rule,value){
		//if(/^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)*$/.test(value)==rule.value){
		if(/^(https?|ftp|file|rtsp|mms):\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	absoluteWebsite:function(rule,value){
		//if(/^((https|http|ftp):\/\/)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)*$/.test(value)==rule.value){
		if(/^(https?|ftp|file):\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(value)==rule.value){
			return true;
		} else {
			return false;
		}
	},
	date:function(rule,value){
		if(/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	dataspace:function(rule,value){
		if(/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))_((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	datetime:function(rule,value){
		if(/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))\s(([01]?\d)|(2[0-3])):([0-5]?\d)(:[0-5]?\d)?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	onlytime:function(rule,value){
		if(/^(([01]?\d)|(2[0-3])):([0-5]?\d)(:[0-5]?\d)?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	datetimespace:function(rule,value){
		if(/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))\s(([01]?\d)|(2[0-3])):([0-5]?\d)(:[0-5]?\d)?_((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))\s(([01]?\d)|(2[0-3])):([0-5]?\d)(:[0-5]?\d)?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	normalcharacter: function(rule,value){
		if(/^(?![0-9]+$)(?![a-zA-Z]+$)(?![#@!~%^&*]+$)[0-9A-Za-z#@!~%^&*]{8,16}$/.test(value)){
			return true;
		} else {
			return false;
		}
	},
	threenumber:function(rule,value){
		if(/^\d{3}$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	characterandbrackets:function(rule,value){
		if(/^[\u4e00-\u9fa5_a-zA-Z0-9()（）]+$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	characterandbracketstwo:function(rule,value){
		if(/^[\u4e00-\u9fa5_a-zA-Z0-9()（）\s+#-、_\$\/<>《》\[\]]+$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	characterandbracketsthr:function(rule,value){
		if(/^[\u4e00-\u9fa5_a-zA-Z0-9()（）\s+"-&(-、_\$\/<>《》\[\]]+$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	maxValue:function(rule,value){
		if(parseFloat(parseFloat(value).toFixed(1))<=parseFloat(rule.value)){
			return true;
		}else{
			return false;
		}
	},
	minValue:function(rule,value){
		if(parseFloat(parseFloat(value).toFixed(1))>=parseFloat(rule.value)){
			return true;
		}else{
			return false;
		}
	},
	twoCharacter:function(rule,value){
		if(value.length == 2 && /^\w+$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	fileextension:function(rule,value){								//文件格式，各项之间请用；分隔
		if(/^[a-zA-Z]+(;[a-zA-Z]+)*$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	checkidnumber:function(rule,value){
		value = value.toUpperCase();           //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
		if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value))) {
			//alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
			return false;
		} //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
		//下面分别分析出生日期和校验位
		var len, re; len = value.length;
		if (len == 15) {
			re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
			var arrSplit = value.match(re);  //检查生日日期是否正确
			var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
			var bGoodDay; 
			bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
			if (!bGoodDay) {
				//alert('输入的身份证号里出生日期不对！');
				return false;
			} else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
				var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
				var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
				var nTemp = 0, i;
				value = value.substr(0, 6) + '19' + value.substr(6, value.length - 6);
				for(i = 0; i < 17; i ++) {
					nTemp += value.substr(i, 1) * arrInt[i];
				}
				value += arrCh[nTemp % 11];
				return true;
			}
		}
		if (len == 18) {
			re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
			var arrSplit = value.match(re);  //检查生日日期是否正确
			var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
			var bGoodDay; 
			bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
			if (!bGoodDay) {
				//alert(dtmBirth.getYear());
				//alert(arrSplit[2]);
				//alert('输入的身份证号里出生日期不对！');
				return false;
			}
			else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
				var valnum;
				var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
				var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
				var nTemp = 0, i;
				for(i = 0; i < 17; i ++) {
					nTemp += value.substr(i, 1) * arrInt[i];
				}
				valnum = arrCh[nTemp % 11];
				if (valnum != value.substr(17, 1)) {
					//alert('18位身份证的校验码不正确！应该为：' + valnum);
					return false;
				}
				return true;
			}
		}
	},
	decimalinteger:function(rule,value){
		if(/^\d+(\.\d{1,1})?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	limitnumber:function(rule,value){
		if(/^\d+(\.\d{1,1})?$/.test(value)==rule.value){
			if(value > 0 && value <= 100){
				return true;
			} 
		}else{
			return false;
		}
	},
	datesection:function(rule,value){
		if(value !='' && !/_/.test(value)){//单日期时不进行时间段验证
			return true;
		} else {
			var dateArr = value.split('_');
			if((dateArr[0] && dateArr[1]) || (!dateArr[0] && !dateArr[1])){
				return true;
			} else {
				return false;
			}
		}
	},
	rangemust:function(rule, value){
		var valArr = value.split('_');
		if(valArr[0] && valArr[1]) {
			return true;
		} else {
			return false;
		}
	},
	schoolYears:function(rule,value){
		if(/^\d+(\.\d{1,1})?$/.test(value)==rule.value){
			if(value > 0 && value <= 10){
				return true;
			} else {
				return false;
			}
		}else{
			return false;
		}
	},
	twodecimal:function(rule,value){
		if(/^[0-9]+(\.[0-9]{2})?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	onlytwodecimal:function(rule,value){
		if(/^[0-9]+(\.[0-9]{2})$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	naturalTwodecimal:function(rule,value){
		if(/^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	monthValidate:function(rule,value){
		if(/^(?:[1-9]|1[0-9]|12)$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	score: function(rule, value) {
		if (/^(((\d|[1-9]\d)(\.\d{1})?)|100|100.0)$/.test(value) == rule.value) {
			return true;
		} else {
			return false;
		}
	},
	GraduationYears: function(rule, value){
		if (/^(((\d|[1-9]\d)(\.\d{1})?))$/.test(value) == rule.value) {
			return true;
		} else {
			return false;
		}
	},
	plusoneortwodecimal:function(rule,value){
		if(/^\d+(\.\d{1,2})?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	alloneortwodecimal:function(rule,value){
		if(/^\-?\d+(\.\d{1,2})?$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	notzero:function(rule,value){
		return (value==0)==rule.value;
	},
	naturalNumberNzero:function(rule,value){
		if(/^\d+$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	passport:function(rule,value){
		if(/^[A-Za-z]\d{8}$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	certificate:function(rule,value){
		if(/^南字第\d{8}号$/.test(value)==rule.value||/^\d{7}$/.test(value)==rule.value){
			return true;
		}else{
			return false;
		}
	},
	charSeparator:function(rule,value){
		if(/^([a-zA-Z]+[;；]?)+$/.test(value) == rule.value) {
			return true;
		} else {
			return false;
		}
	}
}

export const validate = (value,type,notempty,extend)=>{
	var result = {value:true};
	if(value==undefined){
		value="";
	}
	var validates = Object.assign({},notempty,rule[type],extend);
	for(var valid in validates){
		result[valid] = {};
		result[valid].pass = validateFunction[valid](validates[valid],value);
		result[valid].text = validates[valid].text.replace("{}",validates[valid].value);
		if(!result[valid].pass){
			result.value=false;
		}
	}
	if(value==""&&validates.allownull&&validates.allownull.value){
		result.value=true;
	}
	return result;
}
/*
	info 字段含义
	validateType 验证类型
	maxLength最大长度
	minLength最小长度
	maxValue最大值
	maxValue最小值
*/
export const eduValid=(info,val)=>{
	var _self=this;
	var type = info.validateType;
	if(type==""){
		type=0;
	}
	var notempty = {};
	var extend = {};
	if(info.star){
		notempty.allownull={
			value:false,
			text:"不能为空"
		};
	}else{
		notempty.allownull={
			value:true,
			text:"可以为空"
		};
	}
	var maxl = info.maxLength;
	var minl = info.minLength;
	if(maxl&&minl){
		if(maxl==minl){
			extend.eqlength={
				value:parseInt(maxl),
				text:"长度为{}的字符"
			}
		}else{
			extend.maxlength={
				value:parseInt(minl),
				text:"最长不可少于{}个字符"
			}
			extend.maxlength={
				value:parseInt(maxl),
				text:"最长不可超过{}个字符"
			}
		}
	}else{
		if(minl){
			extend.maxlength={
				value:parseInt(minl),
				text:"最长不可少于{}个字符"
			}
		}
		if(maxl){
			extend.maxlength={
				value:parseInt(maxl),
				text:"最长不可超过{}个字符"
			}
		}
	}
	if(info.maxValue){
		var maxVal;
		if(/^\d+(\.\d{1,})$/.test(info.maxValue)){
			maxVal = parseFloat(info.maxValue).toFixed(1);
		} else {
			maxVal = info.maxValue;
		}
		extend.maxValue={
			value:maxVal,					
			text:"最大不可大于{}"
		}
	}
	if(info.minValue){
		var minVal;
		if(/^\d+(\.\d{1,})$/.test(info.minValue)){
			minVal = parseFloat(info.minValue).toFixed(1);
		} else {
			minVal = info.minValue;
		}
		extend.minValue={
			value:minVal,
			text:"最小不可小于{}"
		}
	}
	var result = validate(val,type,notempty,extend); 
	return result;
}

