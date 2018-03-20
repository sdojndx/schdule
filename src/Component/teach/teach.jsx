import style from "../../style/teach.scss"
import styles from "../../style/alertboxsmall.scss"
import AlertBoxSmall from '../win/alertboxsmall'
import React, { Component } from "react"
import { Link } from 'react-router'
import PageNav from "../common/pagenav"
import CourseCate from './coursecate'
import { post } from "../common/pubfn"
import FormWin from "../win/formwin"


class Teach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isClass:0行政班，1走班
            // id:0添加教学模式，1行政班教学,2分层教学,3分类教学
            isShow: false,
            isShowEd: false,
            isUse: 0,
            formshow: false,
            formeditshow:false,
            formleveleditshow:false,
            courseList: [],
            formSource: [{
                name:"instrTypeName",
                lable: '名称',
                star: true,
                type: 200
            },{
                name:"isClass",
                lable: '是否走班',
                star: true,
                type: 206,
                source:[
                    { value:"true",name:"是"},
                    { value:"false",name:"否"}
                ]
            },{
                name:"level",
                lable: '层次',
                star: true,
                type: 219
            }],
            formEditSource: [{
                name:"instrTypeName",
                lable: '名称',
                star: true,
                type: 200
            },{
                name:"isClass",
                lable: '是否走班',
                star: true,
                type: 206,
                source:[
                    { value:"true",name:"是"},
                    { value:"false",name:"否"}
                ]
            },{
                name:"level",
                lable: '层次',
                star: true,
                type: 219
            }],

            formLevelEditSource: [{
                name:"instrTypeName",
                lable: '名称',
                readonly:true,
                star: true,
                type: 200
            },{
                name:"isClass",
                lable: '是否走班',
                star: true,
                type: 206,
                readonly:true,
                source:[
                    { value:"true",name:"是"},
                    { value:"false",name:"否"}
                ]
            },{
                name:"levelNum",
                lable: '层次',
                star: true,
                type: 202,
                source:[
                    { value:"2",name:"2层"},
                    { value:"3",name:"3层"},
                    { value:"4",name:"4层"},
                    { value:"5",name:"5层"},
                    { value:"6",name:"6层"},
                    { value:"7",name:"7层"},
                    { value:"8",name:"8层"},
                    { value:"9",name:"9层"}
                ]
            }],
            formData:{

            },
            formEditData:{

            }
        }
    }
    componentWillMount() {
        this.getList()
    }
    render() {
        return (
            <PageNav firstClassTit="教学模式列表" secondClassTit={`共${this.state.courseList.length}个类型`}>
                <div className={style.courseCon}>
                    <div className={style.course_item} onClick={this.swFormShow.bind(this)}>
                        <div className={style.modelState_add} >
                            <div className={style.modelState_add_font} to="">
                                <span className={style.modelState_add_jiahao}>+</span><br />
                                添加教学模式
                            </div>
                        </div>
                    </div>
                    {
                        this.state.courseList.map((elem, index) => (
                            <CourseCate 
                                item={elem} 
                                key={index} 
                                onEdit={this.openEdit.bind(this)}
                                changeStatus={this.changeStatus.bind(this)}
                            ></CourseCate>
                        ))
                    }
                </div>
                <FormWin 
                    navTitle="你正在创建教学模式"
                    isShow={this.state.formshow} 
                    formSource={this.state.formSource} 
                    formData={this.state.formData}
                    close={this.swFormShow.bind(this)}  
                    submit={this.formSubmit.bind(this)}
                    onChange={this.getVal.bind(this)}            
                    btnLeftName="返回"
                    btnRightName="保存"
                />
                <FormWin 
                    navTitle="你正在修改教学模式"
                    isShow={this.state.formeditshow} 
                    formSource={this.state.formEditSource} 
                    formData={this.state.formEditData}
                    close={this.swFormEditShow.bind(this)}  
                    submit={this.formEditSubmit.bind(this)}
                    onChange={this.getEditVal.bind(this)}            
                    btnLeftName="返回"
                    btnRightName="保存"
                />
                <FormWin 
                    navTitle="你正在修改教学模式"
                    isShow={this.state.formleveleditshow}
                    formSource={this.state.formLevelEditSource} 
                    formData={this.state.formEditData}
                    close={this.swFormLevelEditShow.bind(this)}  
                    submit={this.formEditSubmit.bind(this)}
                    onChange={this.getEditVal.bind(this)}            
                    btnLeftName="返回"
                    btnRightName="保存"
                />              
                <AlertBoxSmall
                    width="600px"
                    height="285px"
                    bgColor="#ffffff"
                    contentMargin="80px 0 0 75px"
                    alertText="确认停用吗？"
                    alertWarning=""
                    btnSum="2"
                    btnLeftName="取消"
                    btnRightName="确定"
                    close={this.isShowOrNot.bind(this)}
                    isShow={this.state.isShow}
                    save={this.isStopUse.bind(this)}
                    isStopUse={this.props.isUse}
                >
                    <div className={style.stop_use_bg}>
                        <div className={styles.img_suo}></div>
                    </div>
                    <span className={styles.img_noice}>温馨提示：停用后将不能再被引用！</span>
                </AlertBoxSmall>
            </PageNav>
        );
    }
    isShowOrNot(show) {
        this.setState({ isShow: !this.state.isShow })
    }
    isStopUse() {
        //console.log(1)
    }
    swFormShow(){
        this.setState({ formshow: !this.state.formshow})
    }
    getVal(data,name,value){
        this.setState({ formData: Object.assign(this.state.formData,data)})
    }
    formSubmit(){
        var _self=this;
        post(this.props.authority.addTeachingMode.sourceCode,{data:this.state.formData}).then(function(json){
            _self.getList()
            
        })
    }
    swFormEditShow(){
        this.setState({ formeditshow: !this.state.formeditshow})
    }
    swFormLevelEditShow(){
        this.setState({ formleveleditshow: !this.state.formleveleditshow})
    }
    getEditVal(data,name,value){
        this.setState({ formEditData: Object.assign(this.state.formEditData,data)})
    }
    formEditSubmit(){
        var _self = this;
        var {id,instrTypeName,isClass,level,levelNum}=this.state.formEditData;
        var data={
            data:{
                id:id,
                instrTypeName:instrTypeName,
                isClass:isClass,
                level:level,
                levelNum:levelNum
            }
        }
        post(this.props.authority.updateteachingmode.sourceCode,data).then(function(){
            _self.getList()
        })
    }
    openEdit(item){
        this.setState({formEditData:Object.assign({},item,{isClass:item.isClass+""})});
        if(item.instrTypeName=="分层教学"){
            this.swFormLevelEditShow();
        }else{
            var source = this.state.formEditSource.slice();
            if(item.createBy){
                source[0].readonly=false
                source[1].readonly=false
            }else{
                source[0].readonly=true
                source[1].readonly=true
            }
            this.setState({formEditSource:source});
            this.swFormEditShow();
        }
    }
    getList() {
        var _self = this;
        var dataInfo = {
            data: ""
        };
        post(this.props.authority.getlist.sourceCode, dataInfo).then(function (json) {
            _self.setState({ courseList: json.data });
        }).catch(function () { })
    }
    changeStatus(item){
        var _self = this;
        var dataInfo={
            data:{
                "id":item.id,
                "status":item.status
            }
        }
        post(this.props.authority.changestatus.sourceCode, dataInfo).then(function (json) {
            _self.getList()
        }).catch(function () { })
    }
}

export default Teach

