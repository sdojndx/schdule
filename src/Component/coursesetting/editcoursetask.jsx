import style from "../../style/selectcourse.scss"
import React,{Component} from "react"
import {Link} from 'react-router'
import PageNav from "../common/pagenav"
import HasNoItems from "../common/hasnoitems"
import Buttons from "../common/buttons"
import Form from "../common/form/form"
import {post,alert} from "../common/pubfn"
import AlertWin from "../win/alertwin"
import { History } from "react-router"

class AddCourseTask extends Component{
	constructor(props) {
		super(props);

		 this.state = {
		 	formData:{

		 	},
		 	urlData:{

		 	},
		 	editInfo:{

		 	},
		 	isSuccessShow:false,
		 	isFailShow:false,
		 	requestShow:false,
			inputData: [{
				name: 'requestTaskName',
				lable:'任务名称',
				star: true,
				placeholder: '',
				after: '0/20',
				type: 200
			},{
				name: 'acadTermID',
				lable:'所属学年学期',
				star: true,
				placeholder: '',
				after: '',
				type: 202,
				source:"AcadYearTerm"
			},{
				name:"acadSclasfId",
				lable: '选课年级',
				star: true,
				placeholder: '',
				after: '',
				type: 202,
				source:"AcadClasf"
			},{
				width: '700px',
				name:"notes",
				lable: '选课说明',
				star: false,
				placeholder: '',
				after: '',
				content:"",
				type: 912
			},{
				name:"attachmentsList",
				lable: '附件',
				star: false,
				content:"",
				type: 221
			}]
		}
	}
	mixins: [History];
	componentDidMount(){
		this.getEditInfo();
	}
	render(){
		return (
			<PageNav firstClassTit="修改选课任务" hasSelect="2">
				<Form 
					formData={this.state.formData} 
					formSource={this.state.inputData} 
					marginLeft="200px" padding="30px 0 20px 0" 
					onChange={this.getVal.bind(this)}
				/>
				<div className={style.btn_case}>
					<Buttons 
						style={{
							width:100,
							height:36,
							backgroundColor:"#3e91eb",
							fontSize:16,
							marginBottom: '30px',
							marginRight:"30px"
						}} 
						btnName="返回"
						onClick={() => this.props.history.goBack()}
					/>
					<Buttons 
						style={{
							width:100,
							height:36,
							backgroundColor:"#f59524",
							fontSize:16,
							marginBottom: '30px'
						}} 
						btnName="保存"
						onClick={this.setInfo.bind(this)}
					/>
				</div>
			</PageNav>
		)
	}
	getVal(data,name,val){
		this.setState({formData:Object.assign({},this.state.formData,data)});
	}
	setInfo(){
		var _self=this;
		var {requestTaskName,acadTermID,acadSclasfId,notes,attachmentsList} = _self.state.formData;
		var dataInfo={
			data:{
				id:this.props.params.taskId,
				requestTaskName:requestTaskName,
				acadTermID:acadTermID,
				acadSclasfId:acadSclasfId,
				notes:notes,
				attachmentsList:attachmentsList
			}
		}
		post(this.props.authority.taskedit.sourceCode,dataInfo).then(function(json){
			if(json.code==1){
				alert(json.message)
			}else{
				alert(json.message)
			}
		}).catch(function(){
			
		})
	}
	getEditInfo(){
		var _self=this;
		var data={
			data:this.props.params.taskId
		}
		post(this.props.authority.taskinfo.sourceCode,data).then(function(json){
			if(json.code==1){
				_self.setState({formData:Object.assign({},_self.state.formData,json.data)});
			}else{
				alert(json.message);
			}
		})
	}
	hideReqWin(){
		this.setState({ requestShow: !this.state.requestShow })
	}
}
export default AddCourseTask