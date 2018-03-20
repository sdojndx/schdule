import style from "../../style/selectcourseaddtask.scss"
import React,{Component} from "react"
import {post,getUrlInfo,alert} from "../common/pubfn"
import Addtaskleft from "./addtaskleft"
import Addtaskright from "./addtaskright"
import AlertWin from "../win/alertwin"

class SelectCourseAddTask extends Component {
	constructor(props) {
		super(props);
		var urlInfo = getUrlInfo();
		this.state = {
			formInit:false,
			//isSuccessShow:false,
		 	isShowDetail:false,
		 	searchSource:[{
                name: "acadClasfId",
                lable: '年级',
                type: 220,
                source: "AcadClasf",
				hasall:"全部"
            },{
                name: "subJectId",
                lable: '学科名称',
                type: 220,
                source: "Subject",
				hasall:"全部"
            },{
                name: "modelId",
                lable: '教学模式',
                type: 220,
                source:"InstrTypeName",
				hasall:"全部"
            }],
			searchData:{
				acadClasfId:urlInfo.acadClasfId,
				subJectId:"-1",
				modelId:""
			},
			paging:{
				pageIndex:1,
				totalCount:0,
				pageSize:10,
				totalPage:0
			},
			listData:[],
			selectCourseArr:[],
			selectAll:false
		};
	}
	componentDidMount(){
		this.getCourseByTask();
	}
	render(){
		return(
			<div className={style.courseCase}>
				<Addtaskleft 
					selectCourseArr={this.state.selectCourseArr}
					saveCourseLeft={this.saveCourseLeft.bind(this)}
					removeSelectCourse={this.removeSelectCourse.bind(this)} 
				/>
				<Addtaskright 
					listData={this.state.listData} 
					totalCount = {this.state.totalCount}
					searchData={this.state.searchData} 
					removeSelectCourse={this.removeSelectCourse.bind(this)} 
					addSelectCourse={this.addSelectCourse.bind(this)} 
					getVal={this.getSearchVal.bind(this)} 
					searchSource={this.state.searchSource}
					selectAll={this.state.selectAll}
					paging={this.state.paging}
					onPageChange={this.onPageChange.bind(this)}
					formInit={this.formInit.bind(this)}
				/>
			</div>
		)
	}
	formInit(){
		this.getListByState();
		this.setState({formInit:true});
	}
	getListByState(){
		var {pageSize,pageIndex} = this.state.paging;
		this.getList({data:Object.assign({},this.state.searchData),pageSize:pageSize,pageIndex:pageIndex});
	}
	getSearchVal(data,name,id){
		var _self=this;
		var searchinfo = Object.assign({},this.state.searchData,data)
		this.setState({searchData:searchinfo});	
		if(this.state.formInit){
			var {pageSize,pageIndex} = this.state.paging;
			this.setState({searchData:searchinfo});
			this.getList({data:searchinfo,pageSize:pageSize,pageIndex:pageIndex});
		}
	}
	getList(para){
		var _self=this;
		post(this.props.authority.courselist.sourceCode,para).then(function(json){
			_self.checkSelect(json.items,_self.state.selectCourseArr.slice());
			_self.setState({
				paging:{
					pageIndex:para.pageIndex,
					totalCount:json.totalCount,
					pageSize:para.pageSize
			}});
		}).catch(function(){
			
		})  
	}
	getCourseByTask(){
		var _self=this;
		post(this.props.authority.getCoureseByTask.sourceCode,{data:_self.props.params.taskId}).then(function(json){
			var add=[];
			json.map(function(item){
				add.push(_self.getInfo(item));
			})
			_self.addSelectCourse(add);
		})
	}
	addSelectCourse(add){
		var select=this.state.selectCourseArr.slice();
		var listData = this.state.listData.slice();
		add.map(function(item,index){
			select.push(item);
		})
		this.checkSelect(listData,select);
	}
	removeSelectCourse(remove){
		var select=this.state.selectCourseArr.slice();
		var listData = this.state.listData.slice();
		var removelist = [];
		remove.map(function(item,index){
			removelist.push(item.classId);
		})
		var l=select.length;
		for(var i=l-1;i>=0;i--){
			var item = select[i];
			if(removelist.indexOf(item.classId)>-1){
				select.splice(i,1)
			}
		}
		this.checkSelect(listData,select);
	}
	checkSelect(list,selects){	
		var select=[];	
		selects.map(function(item){
			select.push(item.classId);
		})
		var selectAll = true;
		list.map(function(data,index){
			if(select.indexOf(data.classId)>-1){
				data.isSelect=true;
			}else{
				data.isSelect=false;
				selectAll=false
			}
		})
		this.setState({listData:list,selectAll:selectAll,selectCourseArr:selects});	
	}
	saveCourseLeft(){
		var _self=this;
		var list = this.state.selectCourseArr.slice();
		var paralist = []
		list.map(function(item){
			paralist.push(Object.assign({},item,{taskId:_self.props.params.taskId}));
		})
		var dataInfo={
			data:paralist
		}
		post(this.props.authority.addcourse.sourceCode,dataInfo).then(function(json){
			if(json.code==1){
				_self.props.history.push(`coursesetting/coursepreferenceset/${_self.props.params.taskId}`);
			}else{
				alert(json.message)
			}
		}).catch(function(){
			
		})    
	}
	onPageChange(pageIndex,pageSize){
		this.getList({data:this.state.searchData,pageSize:pageSize,pageIndex:pageIndex});
	}	
	getInfo(data){
		var Info={
			"acadStageId":data.acadStageId,
			"acadClasfId":data.acadClasfId,
			"acadTermId":data.acadTermId,
			"subJectId":data.subJectId,
			"classId":data.courseOfferingId,
			"className":data.courseOfferingName,
			"maxPerson":data.RequestLimited
		}
		return Info;
	}
	showDetail(show){
		this.setState({isShowDetail:!this.state.isShowDetail})
	}
}
export default SelectCourseAddTask