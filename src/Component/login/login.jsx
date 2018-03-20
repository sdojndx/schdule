import style from "../../style/login.scss"
import React,{Component} from "react"
import Animate from 'rc-animate'

class Login extends Component{
	constructor() {
		super();
		this.state = {
			codev:Math.round(Math.random()*100)+1,
			info:{
				UserName:"",
				Password:"",
				Code:""
			},
			loginSize:{
				
			}
		}
		//this.bgResize.bind(this);
	}
	componentDidMount(){
		var _self=this;
		_self.bgResize();
		window.addEventListener('resize', function(){
			try{
				clearTimeout(_self.withReseze);
			}catch(e){
				
			}
			_self.withReseze = setTimeout(function(){
				_self.bgResize();
			},100);
			
		});
	}
	render(){
		return (
			<div>	
				<div className={style.nav_case}>
					<div className={style.info_wrap}>
						<div className={style.logo}></div>
						<div className={style.welcome}>
							欢迎光临，请登录
						</div>
					</div>
				</div> 
				<div className={style.login_main}>
					<Animate
						showProp="visible"
						transitionName="fade"
					>
						<img 
							className={style.img} 
							src={require("../../images/login/login_bg_img_2.jpg")} 
							alt="img" 
							style={{
								width:this.state.loginSize.imgWidth,
								height:this.state.loginSize.imgHeight,
								marginTop:this.state.loginSize.marginTop,
								marginLeft:this.state.loginSize.marginLeft
							}}
						/>
					</Animate>
					<div 
						className={style.login_content}
						style={{
							top:this.state.loginSize.contentTop,
							left:this.state.loginSize.contentLeft
						}}
					>
						<div className={style.login_info_main}></div>
						<div className={style.login_info}>
							<h2>欢迎来到101智慧课堂！</h2>
							<div className={style.user_name}>
								<span className="fa fa-user"></span>
								<input 
									type="text" 
									value={this.state.username} 
									name="username" 
									onChange={(e,name) => this.changeVal(e,"UserName")}
									placeholder="请输入用户名"
									onFocus={(e) => this.focus(e)}
									onBlur={(e) => this.blur(e)}
									onKeyUp={(e) => this.enterLogin(e)}
								/>
							</div>
							<div className={style.pass_word}>
								<span className="fa fa-lock"></span>
								<input 
									type="password" 
									value={this.state.password} 
									name="password" 
									onChange={(e,name) => this.changeVal(e,"Password")}
									placeholder="请输入密码"
									onFocus={(e) => this.focus(e)}
									onBlur={(e) => this.blur(e)}
									onKeyUp={(e) => this.enterLogin(e)}
								/>
							</div>
							<div className={style.login_icon}>
								<div className={style.login_text}>
									<span className="fa fa-shield"></span>
									<input 
										type="text" 
										value={this.state.Code} 
										name="code" 
										onChange={(e,name) => this.changeVal(e,"Code")}
										placeholder="请输入验证码"
										onFocus={(e) => this.focus(e)}
										onBlur={(e) => this.blur(e)}
										onKeyUp={(e) => this.enterLogin(e)}
									/>
								</div>
								<img onClick={this.changeCodev.bind(this)} src={`/verifycode?=${this.state.codev}`}/>
							</div>
							{/*<div className={style.remember_username}><span className="fa fa-check-square" style={{color:"#3e91eb"}}></span><p>记住用户名</p></div>*/}
							<input type="button" onClick={this.login.bind(this)} value="登录" className={style.login_submit} />
						</div>
					</div>
				</div>
			</div>
		)
	}
	bgResize(){
		var imgw = 1600;
		var imgh = 490;
		var imgratio = 1600/490;
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight-90;
		height = height<420?420:height;
		width = width<330?330:width;
		var ratio = width/height;
		var imgWidth;
		var imgHeight;
		var marginTop;
		var marginLeft;
		if(imgratio>ratio){
			imgWidth=height*imgratio;
			imgHeight=height;
			marginTop=0;
			marginLeft=(width-imgWidth)/2;
		}else{
			imgWidth=width;
			imgHeight=width/imgratio
			marginTop=(height-imgHeight)/2;
			marginLeft=0;
		}
		var loginSize={
			imgWidth:imgWidth,
			imgHeight:imgHeight,
			contentTop:(height-420)*0.5,
			contentLeft:(width-330)*0.75,
			marginTop:marginTop,
			marginLeft:marginLeft
		}
		this.setState({loginSize:loginSize});
		if(width==330||height==420){
			document.body.setAttribute("style","overflow:auto");
		}else{
			document.body.setAttribute("style","overflow:hidden");
		}
	}
	focus(e){
		var targetEle=e.target;
		targetEle.parentElement.setAttribute("style","border:1px solid #3e91eb;color:#3e91eb");
		targetEle.parentElement.childNodes[0].setAttribute("style","color:#3e91eb");
	}
	blur(e){
		var targetEle=e.target;
		targetEle.parentElement.setAttribute("style","border:1px solid #ccc;color:#999");
		targetEle.parentElement.childNodes[0].setAttribute("style","color:#999");
	}
	enterLogin(e){
		var _self=this;
		var keyCode=e.keyCode;
		if(keyCode==13){
			if(_self.state.info.UserName&&_self.state.info.Password&&_self.state.info.Code){
				_self.login();
			}
		}else{
			return false;
		}
	}
	changeVal(e,name){
		this.state.info[name] = e.target.value;
		this.setState({info:this.state.info});
	}
	changeCodev(){
		this.setState(function(){
			return {codev:this.state.codev+Math.round(Math.random()*100)+1}
		})
	}
	login(){
		var _self=this;
		var pname =window.location.pathname;
		var src = (/\/$/).test(pname)?pname:(pname+"/");
		// var dataInfo = new URLSearchParams();
		// dataInfo.append("UserName",_self.eudcode(_self.state.info.UserName))
		// dataInfo.append("Password",_self.eudcode(_self.state.info.Password))
		// dataInfo.append("Code",_self.state.info.Code)
		var dataInfo = "";
		dataInfo+="UserName="+encodeURIComponent(_self.eudcode(_self.state.info.UserName));
		dataInfo+="&Password="+encodeURIComponent(_self.eudcode(_self.state.info.Password));
		dataInfo+="&Code="+encodeURIComponent(_self.state.info.Code);
		// var dataInfo = {
		// 	UserName:encodeURIComponent(_self.eudcode(_self.state.info.UserName)),
		// 	Password:encodeURIComponent(_self.eudcode(_self.state.info.Password)),
		// 	Code:encodeURIComponent(_self.state.info.Code)
		// };
		fetch(src+"login",{
			method:'POST',
			credentials: "include",
			headers:{
				eduToken:cxt.eduToken,
				eduRefUrl:window.location.href,
				"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
			},
			body:dataInfo,
		}).then((json)=>{
			 if(json.ok){
				json.text().then((data)=>{
					var mes=JSON.parse(data)
					if(mes.code==1){
						if((window.location.origin+window.location.pathname)==mes.data||(window.location.origin+window.location.pathname+"/")==mes.data){
							window.location.reload();
						}else{
							window.location.href=mes.data+window.location.hash;
						}
					}else{
						alert(mes.message);
						_self.changeCodev();
					}
					
				})
			}
		}).catch((json)=>{
			
		});
	}
	eudcode(txt){
		if(typeof txt!=="string"){
			return txt;
		}
		var s ="";
		for (var i=0;i<txt.length;i++){
			if(i!=0){
				s+=',';
			}
			s+=txt.charCodeAt(i);
		}
		return s; 
	}
}
export default Login