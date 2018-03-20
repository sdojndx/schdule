import React, {Component, PropTypes} from "react";
import { Router, Route, Redirect, IndexRoute, hashHistory } from "react-router";
import {Provider} from 'react-redux'
import store from '../redux/store'
import {changeNav} from '../redux/action/navs'
import Main from "../Component/main/main"
import Source from "./managersource"
//import pageNav from "../Component/main/pagenav"

import SecondNav from "../Component/main/secondnav"

import Index from "../Component/index/index"
// import AcademicYear from "../Component/academicyear/academicyear"
// import TermDetail from "../Component/academicyear/termdetail"

// //上课时间
// import SchoolTime from "../Component/schooltime/schooltime"
// import TimeSetting from "../Component/schooltime/timesetting"

// //课程类别
// import CourseCategory from "../Component/coursecategory/CourseCategory"

// //教学模式
// import Teach from "../Component/teach/teach"

// import SelectCourse from "../Component/coursesetting/selectcourse"
// //选课任务设置第1、2步
// import SelectCourseAddTask from "../Component/coursesetting/selectcourseaddtask"
// import CoursePreferenceSet from "../Component/coursesetting/coursepreferenceset"
// import AddCourse from "../Component/coursesetting/addcourse/addcourse"
// import CourseSetting from "../Component/coursesetting/coursesetting"//"../Component/courseselect/coursesetting/coursesetting"
// import AddCourseTask from "../Component/coursesetting/addcoursetask"//"../Component/courseselect/coursesetting/addcoursetask"
// import StuSelectCourse from "../Component/studentcoursesetting/stuselectcourse"

// //教室列表

// import Classroom from "../Component/classroom/classroom"
// import ClassroomBuild from "../Component/classroom/classroombuild"
// import ClassroomList from "../Component/classroom/classroomlist"
// import ClassroomBuildClose from "../Component/classroom/classroombuildclose"

// //学生管理
// import Students from "../Component/students/students"
// import StudentAccountNull from "../Component/students/studentaccountnull"
// import ResetPasswordSuccess from "../Component/students/resetpasswordsuccess"

// //教师管理 
// import Teachers from "../Component/teachers/teachers"
// import TeacherAccountNull from "../Component/teachers/teacheraccountnull"
// import TeacherInformation from "../Component/teachers/teacherinformation"
// import TeacherEdit from "../Component/teachers/teacheredit"

// //选课管理 学生选课管理
// import StudentCourse from "../Component/studentcourse/studentcourse"
// import NameList from "../Component/studentcourse/namelist"

// //成绩管理
// import Achievement from '../Component/achievement/achievement'

import Loadable from 'react-loadable';
const Loading = () => <div>Loading...</div>;

const R = {};
R.Students = Loadable({
    loader: () => import('../Component/students/students'),
    loading: Loading,
});
for(var name in Source){
    // R[name] = Loadable({
    //     loader: () => import(Source.path),
    //     loading: Loading,
    // });
    // R[name] = (location, cb) => {
    //     require.ensure([], require => {
    //         cb(null, require(Source.path).default)
    //     },R[name])
    // }
}

const enter =(path)=>{
    store.dispatch(changeNav(path.location.pathname));
}
const RouteConfig = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Index} />//首页
                <Route path="index" component={Index} onEnter={enter}/>
                <Route path="academicyear" component={SecondNav} onEnter={enter}>
                    <IndexRoute getComponent={R.AcademicYear} />
                    <Route path="termdetail" getComponent={R.TermDetail} />
                </Route>
                <Route path="teach" component={SecondNav} onEnter={enter}>
                    <IndexRoute getComponent={R.Teach} />
                </Route>                
                <Route path="coursecategory" component={SecondNav} onEnter={enter}>
                    <IndexRoute getComponent={R.CourseCategory} />
                    <Route path="/" getComponent={R.CourseCategory} />
                </Route>
                <Route path="classroom" component={SecondNav} onEnter={enter}>
					<IndexRoute getComponent={R.Classroom} />
					<Route path="/" getComponent={R.Classroom} />
                    {/* <Route path="build" getComponent={R.ClassroomBuild} /> */}
                    <Route path="list" getComponent={R.ClassroomList} />
                    {/* <Route path="buildclose" getComponent={R.ClassroomBuildClose} /> */}
                    <Route path="addclassroom" getComponent={R.ClassroomList} />                    
                </Route>
				<Route path="coursepreferenceset" getComponent={R.CoursePreferenceSet} onEnter={enter}/>

                <Route path="students" component={SecondNav} onEnter={enter}>
                    <IndexRoute getComponent={R.Students} />
                    <Route path="/" getComponent={R.Students} />
                    <Route path="studentaccountnull" getComponent={R.StudentAccountNull} />
                </Route>
                <Route path="teachers" component={SecondNav} onEnter={enter}>
                    <IndexRoute getComponent={R.Teachers} />
                    <Route path="/" getComponent={R.Teachers} />
                    <Route path="teacheraccountnull" getComponent={R.TeacherAccountNull} />
                    <Route path="teacherinformation" getComponent={R.TeacherInformation} />
                    <Route path="teacheredit" getComponent={R.TeacherEdit} />
                </Route>
                <Route path="studentcourse" component={SecondNav} onEnter={enter}>
                    <IndexRoute getComponent={R.StudentCourse} />
                    <Route path="/" getComponent={R.StudentCourse} />              
					<Route path="namelist" getComponent={R.NameList} />
                </Route>
                <Route path="achievement" component={SecondNav} onEnter={enter}>
                    <IndexRoute getComponent={R.Achievement} />
                    <Route path="/" getComponent={R.Achievement} />
                </Route>
                <Route path="addcourse" getComponent={R.AddCourse} onEnter={enter}/>
				<Route path="coursesetting" component={SecondNav} onEnter={enter}>
					<IndexRoute getComponent={R.CourseSetting} />
					<Route path="addcoursetask" getComponent={R.AddCourseTask} />                    
                    <Route path="selectcourse" getComponent={R.SelectCourse}/>
                    <Route path="selectcourseaddtask" getComponent={R.SelectCourseAddTask}/>
				</Route>
                <Route path="stuselectcourse" getComponent={R.StuSelectCourse} onEnter={enter}/>
                <Route path="schooltime" component={SecondNav} onEnter={enter}>
                    <IndexRoute getComponent={R.SchoolTime} />
                    <Route path="/" getComponent={R.SchoolTime} />
                    <Route path="timesetting" getComponent={R.TimeSetting} />
                </Route>

                <Redirect from='*' to='/'  />
            </Route>
        </Router>
    </Provider>
);

export default RouteConfig;