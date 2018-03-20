import React, { Component, PropTypes } from "react";
import { Router, Route, Redirect, IndexRoute, hashHistory } from "react-router";
import store from '../redux/store'
import { changeNav } from '../redux/action/navs'
import Main from "../Component/main/main"
//import pageNav from "../Component/main/pagenav"

import SecondNav from "../Component/main/secondnav"

import Index from "../Component/index/index"
import StudyYear from "../Component/studyyear/studyyear"
import TermDetail from "../Component/studyyear/TermDetail"
import TermEdit from "../Component/studyyear/TermEdit"
import CourseCate from "../Component/coursecate/CourseCate"
import SelectCourse from "../Component/courseselect/selectcourse"
//选课任务设置第1、2步
import SelectCourseAddTask from "../Component/courseselect/selectcourseaddtask"
import CoursePreferenceSet from "../Component/courseselect/coursepreferenceset"
import AddCourse from "../Component/courseselect/addcourse/addcourse"
import CourseSetting from "../Component/courseselect/coursesetting/coursesetting"
import AddCourseTask from "../Component/courseselect/coursesetting/addcoursetask"
import StuSelectCourse from "../Component/studentcoursesetting/stuselectcourse"


//教室列表

import ClassroomManage from "../Component/classroommanage/ClassroomManage"
// import ClassroomBuild from "../Component/classroommanage/ClassroomBuild"
import ClassroomList from "../Component/classroommanage/ClassroomList"
// import ClassroomBuildClose from "../Component/classroommanage/ClassroomBuildClose"

//选课管理 学生选课管理
import ClassManage from "../Component/classmanage/ClassManage"
//选课管理表格中的 名单部分
import NameList from "../Component/classmanage/Namelist"

//学生管理
import StudentManage from "../Component/studentmanage/StudentManage"
import StudentAccountNull from "../Component/studentmanage/StudentAccountNull"
import ResetPasswordSuccess from "../Component/studentmanage/ResetPasswordSuccess"
//教师管理
import TeacherManage from "../Component/teachermanage/TeacherManage"
import TeacherAccountNull from "../Component/teachermanage/TeacherAccountNull"


//课程类别
import CourseCategory from "../Component/coursecategory/CourseCategory"
//上课时间
import SchoolTime from "../Component/schooltime/SchoolTime"
import TimeSetting from "../Component/schooltime/schooltime"
//成绩管理
import Achievement from '../Component/achievement/Achievement'

//选课
import OptClass from "../Component/optclass/OptClass"
// class SecondNav extends Component{
//     constructor() {
//         super();
//     }
//     render(){
//         return (
//             <div>

//                 {this.props.children}
//             </div>
//         )
//     }
// }
const enter = (path) => {
    store.dispatch(changeNav(path.location.pathname));
}
const RouteConfig = (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Index} />//首页
            <Route path="/" component={Index} onEnter={enter} />
            <Route path="index" component={Index} onEnter={enter} />
            <Route path="studyyear" component={SecondNav} onEnter={enter}>
                <IndexRoute component={StudyYear} />
                <Route path="/" component={StudyYear} />
                <Route path="termdetail" component={TermDetail} />
                <Route path="termedit" component={TermEdit} />
            </Route>
            <Route path="classroom" component={SecondNav} onEnter={enter}>
                <IndexRoute component={ClassroomManage} />
                <Route path="/" component={ClassroomManage} />
                <Route path="build" component={ClassroomBuild} />
                <Route path="list" component={ClassroomList} />
                <Route path="buildclose" component={ClassroomBuildClose} />
                <Route path="addclassroom" component={ClassroomList} />

            </Route>
            <Route path="coursecate" component={SecondNav} onEnter={enter}>
                <IndexRoute component={CourseCate} />
                <Route path="/" component={CourseCate} />
            </Route>
            <Route path="selectcourse" component={SelectCourse} onEnter={enter} />
            <Route path="selectcourseaddtask" component={SelectCourseAddTask} onEnter={enter} />
            <Route path="coursepreferenceset" component={CoursePreferenceSet} onEnter={enter} />

            <Route path="studentmanage" component={SecondNav} onEnter={enter}>
                <IndexRoute component={StudentManage} />
                <Route path="/" component={StudentManage} />
                <Route path="studentinformation" component={StudentInformation} />
                <Route path="studentaccountnull" component={StudentAccountNull} />                    <Route path="studentaccountnull" component={StudentAccountNull} />
                <Route path="studentinformationedit" component={StudentInformationEdit} />                    <Route path="resetpasswordsuccess" component={ResetPasswordSuccess} />
                <Route path="resetpasswordsuccess" component={ResetPasswordSuccess} />                </Route>
            <Route path="teachermanage" component={SecondNav} onEnter={enter}>
                <IndexRoute component={TeacherManage} />
                <Route path="/" component={TeacherManage} />
                <Route path="teacheraccountnull" component={TeacherAccountNull} />
                <Route path="teacherinformation" component={TeacherInformation} />
                <Route path="teacherinformationedit" component={TeacherInformationEdit} />
            </Route>
            <Route path="classmanage" component={SecondNav} onEnter={enter}>
                <IndexRoute component={TeacherManage} />
                <Route path="/" component={TeacherManage} />
                <Route path="studentoptmanage" component={ClassManage} />
                <Route path="namelist" component={NameList} />
                <Route path="optclass" component={OptClass} />

            </Route>
            <Route path="achievement" component={SecondNav} onEnter={enter}>
                <IndexRoute component={Achievement} />
                <Route path="/" component={Achievement} />
            </Route>
            <Route path="addcourse" component={AddCourse} onEnter={enter} />
            <Route path="coursesetting" component={SecondNav} onEnter={enter}>
                <IndexRoute component={CourseSetting} />
                <Route path="addcoursetask" component={AddCourseTask} />
            </Route>
            <Route path="stuselectcourse" component={StuSelectCourse} onEnter={enter} />
            <Route path="coursecategory" component={SecondNav} onEnter={enter} >
                <IndexRoute component={CourseCategory} />
                <Route path="/" component={CourseCategory} />
                <Route path="addcategory" component={AddCategory} />
            </Route>
            <Route path="schooltime" component={SecondNav} onEnter={enter} >
                <IndexRoute component={SchoolTime} />
                <Route path="/" component={SchoolTime} />
                <Route path="timesetting" component={TimeSetting} />
            </Route>

            <Redirect from='*' to='/' />
        </Route>
    </Router>
);

export default RouteConfig;