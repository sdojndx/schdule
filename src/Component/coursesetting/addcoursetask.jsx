import style from "../../style/selectcourse.scss"
import React,{Component} from "react"
import {Link} from 'react-router'
import PageNav from "../common/pagenav"
import HasNoItems from "../common/hasnoitems"
import Buttons from "../common/buttons"
import Form from "../common/form/form"
import {post,eduValidForm,alert} from "../common/pubfn"
import AlertWin from "../win/alertwin"

class AddCourseTask extends Component{
	constructor(props) {
		super(props);

		 this.state = {
		 	formData:{
		 		requestTaskName:"",
		 		acadTermID:"383",
		 		acadSclasfId:"",
		 		notes:"",
		 		attachmentsList:[]
		 	},
		 	urlData:{

		 	},
		 	code:"",
		 	isSuccessShow:false,
		 	isFailShow:false,
		 	requestShow:false,
			formSource: [{
				name: 'requestTaskName',
				lable:'任务名称',
				star: true,
				placeholder: '',
				after: '0/20',
				maxLength:20,
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
	render(){
		return (
			<PageNav firstClassTit="新建选课任务" hasSelect="2">
				<Form 
					formData={this.state.formData} 
					formSource={this.state.formSource} 
					marginLeft="60px" padding="30px 0 20px 0" 
					onChange={this.getVal.bind(this)}
				/>
				<div className={style.btn_case}>
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
		var result = eduValidForm(this.state.formSource,this.state.formData);
		if(result.ispass){
			var dataInfo={
				data:_self.state.formData
			};
			post(this.props.authority.taskAdd.sourceCode,dataInfo).then(function(json){
				if(json.code==1){
					_self.setState({code:1 })
					_self.props.history.push("coursesetting");
				}else{
					alert(json.message);
					_self.setState({code:0  })
				}
			}).catch(function(){
				
			})
		}
	}

}
export default AddCourseTask