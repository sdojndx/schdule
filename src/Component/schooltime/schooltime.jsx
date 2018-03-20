
import style from "../../style/timesetting.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import PageNav from "../common/pagenav"
import Buttons from "../common/buttons"
import Form from "../common/form/form"
import FormWin from "../win/formwin"
import { post , alert} from "../common/pubfn"
import AlertBoxSmall from '../win/alertboxsmall'
import AlertWin from "../win/alertwin"
import TimeTable from "./schooltimetable"

class SchoolTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DateSource:[
				{
					name: "createDate",
					lable: '',
					star: false,
					type: 203
				}
			],
			classList:[],
			isShow:false,
			isSetShow:false,
			isShowSave:false,
			requestShow:false,
			isTimeClick:true,
			formSource:[{
				width: 200,
				name: 'ndMtgs',
				lable: '每周',
				star: true,
				type: 202,
				source: [
					{ value:"5", name:"5天",checked:true },
					{ value:"6", name:"6天" },
					{ value:"7", name:"7天" }
				]
			},{
				width: 200,
				name: 'mlNum',
				lable: '晨会',
				star: true,
				type: 202,
				source: [
					{ value:"0", name:"0节" },
					{ value:"1", name:"1节" ,checked:true},
					{ value:"2", name:"2节" },
					{ value:"3", name:"3节" }
				]
			},{
				width: 200,
				name: 'alNum',
				lable: '上午',
				star: true,
				type: 202,
				source: [
					{ value:"0", name:"0节" },
					{ value:"1", name:"1节" },
					{ value:"2", name:"2节" },
					{ value:"3", name:"3节" },
					{ value:"4", name:"4节" ,checked:true},
					{ value:"5", name:"5节" },
					{ value:"6", name:"6节" },
					{ value:"7", name:"7节" },
				]
			},{
				width: 200,
				name: 'plNum',
				lable: '下午',
				star: true,
				type: 202,
				source: [
					{ value:"0", name:"0节" },
					{ value:"1", name:"1节" },
					{ value:"2", name:"2节" },
					{ value:"3", name:"3节",checked:true },
					{ value:"4", name:"4节" },
					{ value:"5", name:"5节" },
					{ value:"6", name:"6节" },
					{ value:"7", name:"7节" },
				]
			},{
				width: 200,
				name: 'elNum',
				lable: '晚上',
				star: true,
				type: 202,
				source: [
					{ value:"0", name:"0节",checked:true },
					{ value:"1", name:"1节" },
					{ value:"2", name:"2节" },
					{ value:"3", name:"3节" },
					{ value:"4", name:"4节" },
					{ value:"5", name:"5节" },
					{ value:"6", name:"6节" },
					{ value:"7", name:"7节" },
				]
			},{
				width: 200,
				name: 'minsPmt',
				lable: '每节课时长',
				star: true,
				type: 202,
				source: [
					{ value:"40", name:"40分钟" ,checked:true},
					{ value:"45", name:"45分钟" },
					{ value:"60", name:"1小时" }
				]
			},{
				width: 200,
				name: 'breakTime',
				lable: '课间时长',
				star: true,
				type: 202,
				source: [
					{ value:"10", name:"10分钟" },
					{ value:"15", name:"15分钟" },
					{ value:"20", name:"20分钟" },
					{ value:"30", name:"30分钟" }
				]
			},{
				width: 200,
				name: 'acadYearId',
				lable: '适用范围',
				star: true,
				type: 202,
				source: "AcadYear",
				effect:[
					"acadTermId"
				]

			},{
				width: 200,
				name: 'acadTermId',
				lable: '学期',
				star: true,
				type: 202,
				source: "AcadTermByYear",
				paraname:{					
					id:"acadYearId"
				}
			}],
			formData:{},
			searchData:{
				acadTermId: ""
			},
			formResetSource:[{
				width: 200,
				name: 'ndMtgs',
				lable: '每周',
				star: true,
				type: 202,
				source: [
					{ value:"5", name:"5天" },
					{ value:"6", name:"6天" },
					{ value:"7", name:"7天" }
				]
			},{
				width: 200,
				name: 'mlNum',
				lable: '晨会',
				star: true,
				type: 202,
				source: [
					{ value:"0", name:"0节" },
					{ value:"1", name:"1节"},
					{ value:"2", name:"2节" },
					{ value:"3", name:"3节" }
				]
			},{
				width: 200,
				name: 'alNum',
				lable: '上午',
				star: true,
				type: 202,
				source: [
					{ value:"0", name:"0节" },
					{ value:"1", name:"1节" },
					{ value:"2", name:"2节" },
					{ value:"3", name:"3节" },
					{ value:"4", name:"4节" },
					{ value:"5", name:"5节" },
					{ value:"6", name:"6节" },
					{ value:"7", name:"7节" },
				]
			},{
				width: 200,
				name: 'plNum',
				lable: '下午',
				star: true,
				type: 202,
				source: [
					{ value:"0", name:"0节" },
					{ value:"1", name:"1节" },
					{ value:"2", name:"2节" },
					{ value:"3", name:"3节"},
					{ value:"4", name:"4节" },
					{ value:"5", name:"5节" },
					{ value:"6", name:"6节" },
					{ value:"7", name:"7节" },
				]
			},{
				width: 200,
				name: 'elNum',
				lable: '晚上',
				star: true,
				type: 202,
				source: [
					{ value:"0", name:"0节"},
					{ value:"1", name:"1节" },
					{ value:"2", name:"2节" },
					{ value:"3", name:"3节" },
					{ value:"4", name:"4节" },
					{ value:"5", name:"5节" },
					{ value:"6", name:"6节" },
					{ value:"7", name:"7节" },
				]
			},{
				width: 200,
				name: 'minsPmt',
				lable: '每节课时长',
				star: true,
				type: 202,
				source: [
					{ value:"40", name:"40分钟"},
					{ value:"45", name:"45分钟" },
					{ value:"60", name:"1小时" }
				]
			},{
				width: 200,
				name: 'breakTime',
				lable: '课间时长',
				star: true,
				type: 202,
				source: [
					{ value:"10", name:"10分钟" },
					{ value:"15", name:"15分钟" },
					{ value:"20", name:"20分钟" },
					{ value:"30", name:"30分钟" }
				]
			}],
			formSetData:{

			},
		};
	}
	render() {
		var _self=this;
		var elem=(
			<div style={{display:this.state.classList.length>0?"none":"block"}}>
				<div className={style.to_set}>
					<div className={style.set_white}> </div>
					<div className={style.set_text}>
						根据学校的情况，设置节次数及上课时间哦~
					</div>
				</div>
				<FormWin
					showType="edit"
					width="700"
					paddingLeft="30"
					navTitle="设置上课时间"
					isShow={this.state.isSetShow}
					formSource={this.state.formSource}
					formData={this.state.formSetData}
					close={this.isSetShowOrNot.bind(this)}
					submit={this.formAddEdit.bind(this)}
					onChange={this.getVal.bind(this)}
					onSourceEffect={(source)=>this.setState({formSource:source})}
					btnLeftName="取消"
					btnRightName="保存"
				/>
				<div style={{width:"100%",textAlign:"center"}}>
					<Buttons
						style={{ width: "100px", height: "36", backgroundColor: "#f59524", fontSize: "16px",margin:"30px 0 100px"}}
						btnName="去设置"
						onClick={this.showSetWin.bind(this)}
					>
					</Buttons>
					<span 
						className={style.copy_prev_class}
						onClick={this.copyClass.bind(this)}
					>
						复制上学期课表
					</span>
				</div>
			</div>
		)
		return (
			<PageNav
				firstClassTit="上课时间表"
				secondClassTit="2017-2018学年第一学期"
				hasSelect="1"
				val = {this.state.searchData.acadTermId}
				onChange = {(val)=>this.getSearchVal({acadTermId:val},"acadTermId",val)}
				//onInit={this.getList.bind(this,{data:Object.assign({},this.state.searchData)})}
			>
				{elem}
				<div style={{display:this.state.classList.length>0?"block":"none"}}>
					<Buttons
						style={{ width: "144px", height: "36", backgoundColor: "#3e91eb", float: 'right', margin: '20px 25px 12px 0' }}
						btnName="重新设置"
						onClick={this.showQuery.bind(this)}
					>
					</Buttons>
					<FormWin
						showType="edit"
						width="700"
						paddingLeft="30"
						navTitle="重新设置上课时间"
						isShow={this.state.isShow}
						formSource={this.state.formResetSource} 
						formData={this.state.formData}
						close={this.isShowOrNot.bind(this)}
						submit={this.formEdit.bind(this)}
						onChange={this.getDateVal.bind(this)}
						btnLeftName="取消"
						btnRightName="保存"
					/>
					<AlertBoxSmall
						width="600px"
						height="250px"
						bgColor="#ffffff"
						contentMargin="80px 0 0 75px"
						alertText={this.state.searchData.name}
						alertWarning="是否保存修改后的上课时间？"
						btnSum="2"
						btnLeftName="取消"
						btnRightName="确定"
						show={this.saveWinShow.bind(this)}
						isShow={this.state.isShowSave}
						save={this.saveClass.bind(this,this.state.classList)}
						notice="温馨提示：设置的上课时间会影响课表的结构"
					>
						<div className={style.save_bg}>
						</div>
					</AlertBoxSmall>
					<TimeTable 
						classList={this.state.classList}
						updateTime={this.updateTime.bind(this)}
						isTimeClick={this.state.isTimeClick}
					/>
					<div className={style.prompt_msg}>温馨提示：<span className={style.on_class}></span>代表上课，<span className={style.off_class}></span>代表不上课，单击具体节次可切换是否上课！</div>
					<div className={style.btn_group}>
						<Buttons
							style={{ width: "100px", height: "36", backgroundColor: "#3e91eb" }}
							btnName="取消"
							onClick={this.reFresh.bind(this)}
						>
						</Buttons>
						<Buttons
							style={{ width: "100px", height: "36", backgroundColor: "#f59524", marginLeft: "20px" }}
							btnName="保存"
							onClick={this.saveWinShow.bind(this)}
						>
						</Buttons>
					</div>
				</div>

			</PageNav>
		)
	}
	hideReqWin(){
		this.setState({ requestShow: !this.state.requestShow })
	}
	saveWinShow(){
		this.setState({isShowSave:!this.state.isShowSave})
	}
	getSearchVal(data,name, id) {
		var _self=this;
		var searchinfo = Object.assign({},this.state.searchData,data);
		this.setState({searchData:searchinfo});
		_self.getList(searchinfo.acadTermId);
	}
	getList(val){
		var _self = this;
		var url=this.props.authority.getList.sourceCode;
		var data={
			data:{
				acadTermId: val
			}
		}
		post(url, data
		).then(function (json) {
			if(json.code==0){
				alert(json.message)
			}else{
				_self.setState({classList:json.data});
			}
		}).catch(function () {
		})
	}
	reFresh(){
		var _self=this;
		var searchinfo = _self.state.searchData;
		var val=searchinfo.acadTermId;
		_self.getList(val);
	}
	getDateVal(data, name, value) {
		this.setState({ formData: Object.assign(this.state.formData, data) })
	}
	getVal(data, name, value) {
		this.setState({ formSetData: Object.assign(this.state.formSetData, data) })
	}
	isSetShowOrNot(){
		this.setState({isSetShow:!this.state.isSetShow})
	}
	showSetWin(){
		var _self=this;
		var id=this.state.searchData.acadTermId;
		var data={
			data:id
		}
		var url=this.props.authority.termQuery.sourceCode;
		post(url, data
		).then(function (json) {
			if(json.code==0){
				alert(json.message)
			}else{
				var data={acadYearId:json.data}
				var winSource=_self.state.formSource.slice();
				winSource.map(function(item,index){
					if(item.name=="acadTermId"){
						var para = {};
						if(!item.para){
							para={}
						}else{						
							para = Object.assign({},item.para);
						}
						para.id=json.data;
						item.para=para;
					}
				});
				_self.setState({formSource:winSource});
				_self.setState({formSetData: Object.assign({},_self.state.formSetData, data) })
				_self.isSetShowOrNot()
			}
		}).catch(function () {
		})
	}
	showQuery(){
		var _self=this;
		var id=this.state.classList[0].lessonID;
		var data={
			data:id
		}
		var url=this.props.authority.query.sourceCode;
		post(url, data
		).then(function (json) {
			if(json.code==0){
				alert(json.message)
			}else{
				_self.setState({formData: Object.assign({},_self.state.formData, json.data) })
				_self.isShowOrNot()
			}
		}).catch(function () {
		})
		
	}
	isShowOrNot(show){
		this.setState({isShow:!this.state.isShow})
	}
	formEdit(){
		var _self=this;
		var val=this.state.formData;
		var url=this.props.authority.updateCourse.sourceCode;
		var data={
			data:val
		}
		post(url, data
		).then(function (json) {
			if(json.code==0){
				alert(json.message)
			}else{
				var searchinfo = _self.state.searchData;
				var val=searchinfo.acadTermId;
				_self.getList(val);
			}
		}).catch(function () {
		})
	}
	formAddEdit(){
		var _self=this;
		var val=this.state.formSetData;
		var url=this.props.authority.urlAdd.sourceCode;
		var data={
			data:this.state.formSetData
		}
		post(url, data
		).then(function (json) {
			if(json.code==0){
				alert(json.message)
			}else{
				var searchinfo = _self.state.searchData;
				var val=searchinfo.acadTermId;
				_self.getList(val);
			}
		}).catch(function () {
		})
	}
	updateTime(timer,id,lessonId,seqNum,slotsPmt,caTypeStr,ndMtgs){
		var _self=this;
		if(timer.hours==undefined&&timer.minutes==undefined){
			return;
		}
		if(timer.hours==undefined){
			timer.hours="0"
		}else if(timer.minutes==undefined){
			timer.minutes="0"
		}
		var hours=Number(timer.hours)<10?'0'+Number(timer.hours):timer.hours;
		var minutes=Number(timer.minutes)<10?'0'+Number(timer.minutes):timer.minutes;
		var slot=hours+":"+minutes
		var data={
			data:{
				id:id,
				lessonID:lessonId,
				seqNum:seqNum,
				slotsPmt:slotsPmt,
				startSlot:slot,
				caTypeStr:caTypeStr,
				ndMtgs:ndMtgs
			}
		}
		var url=this.props.authority.updateTime.sourceCode;
		post(url, data
		).then(function (json) {
			if(json.code==0){
				alert(json.message)
			}else{
				var searchinfo = _self.state.searchData;
				var val=searchinfo.acadTermId;
				_self.getList(val);
			}
		}).catch(function () {
		})
	}
	saveClass(data){
		var _self=this;
		var url=this.props.authority.urlSaveList.sourceCode;
		var data={
			data:data
		}
		post(url, data
		).then(function (json) {
			if(json.code==0){
				_self.saveWinShow();
				alert(json.message)
			}else{	
				var searchinfo = _self.state.searchData;
				var val=searchinfo.acadTermId;
				_self.getList(val);
				_self.saveWinShow();
			}
		}).catch(function () {
			alert("接口请求失败")
			_self.saveWinShow();
		})
	}
	copyClass(){
		var _self=this;
		var searchinfo = this.state.searchData;
		var acadTermId=searchinfo.acadTermId;
		//var url=this.props.authority.urlCopy.sourceCode;
		var url="schooladmin/basedata/lessonTime/copy"
		var data={
			data:{
				id:acadTermId
			}
		}
		post(url, data
		).then(function (json) {
			if(json.code==0){
				_self.saveWinShow();
				alert(json.message)
			}else{	
				var searchinfo = _self.state.searchData;
				var val=searchinfo.acadTermId;
				_self.getList(val);
			}
		}).catch(function () {
		})
	}
}


export default SchoolTime
