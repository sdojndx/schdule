import React, {Component, PropTypes} from "react";
import { Router, Route, Redirect, IndexRoute, hashHistory } from "react-router";
import {Provider} from 'react-redux'
import store from '../redux/store'
import {changeNav} from '../redux/action/navs'
import Main from "../Component/main/main"

import AuthorityPage from "../Component/super/authoritypage"
import SecondNav from "../Component/main/secondnav"

//首页
import Index from "../Component/index/index"
//学年管理-学年列表
import AcademicYear from "../Component/academicyear/academicyear"
//学年管理-学期列表
import TermDetail from "../Component/academicyear/termdetail"

//上课时间
import SchoolTime from "../Component/schooltime/schooltime"

//课程类别
import CourseCategory from "../Component/coursecategory/CourseCategory"
//教学模式
import Teach from "../Component/teach/teach"
//选课任务设置第1、2步
import SelectCourseAddTask from "../Component/coursesetting/selectcourseaddtask"
//编辑选课偏好设置
import CoursePreferenceSet from "../Component/coursesetting/coursepreferenceset"
//修改选课任务
import EditCourseTask from "../Component/coursesetting/editcoursetask"

//查看选课偏好设置
import CoursePreferenceSetDire from "../Component/coursesetting/coursepreferencesetdire"

//选课任务设置
import CourseSetting from "../Component/coursesetting/coursesetting"//"../Component/courseselect/coursesetting/coursesetting"
//新建选课任务
import AddCourseTask from "../Component/coursesetting/addcoursetask"//"../Component/courseselect/coursesetting/addcoursetask"


//教室列表
import Classroom from "../Component/classroom/classroom"
//import BuildBox from "../Component/classroom/buildbox"
// import ClassroomList from "../Component/classroom/classroomlist"

//学生管理
import Students from "../Component/students/students"
//import StudentAccountNull from "../Component/students/studentaccountnull"

//教师管理 
import Teachers from "../Component/teachers/teachers"
//import TeacherAccountNull from "../Component/teachers/teacheraccountnull"

//选课管理 学生选课管理
import StudentCourse from "../Component/studentcourse/studentcourse"
import NameList from "../Component/studentcourse/namelist"

//成绩管理
import Achievement from '../Component/achievement/achievement'

//课程管理
import Course from '../Component/course/course'

//import StudentCourseSelect from "../Component/studentcourseselect/studentcourseselect"

//学生选课
import CourseSelect from '../Component/courseselect/courseselect'
//选课结果
import CheckList from '../Component/courseselect/checklist' 
//选课结果
import ResultList from '../Component/courseselect/resultlist' 
//选课
import OptClass from '../Component/courseselect/optclass'

//消息中心
import Message from '../Component/message/message'
//修改密码
import ChangePW from '../Component/usercenter/changepassword'
//iframe
import IframePage from '../Component/common/iframepage'


class EmptyNav extends Component{
    constructor(){
        super()
    }
    render(){
        return (            
            <div>
                {this.props.children}
            </div>
        )
    }
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
                    <IndexRoute component={AuthorityPage(AcademicYear)} />
                    <Route path="/" component={AuthorityPage(AcademicYear)} />
                    <Route path="termdetail/:taskId" component={AuthorityPage(TermDetail)} />
                </Route>
                <Route path="teach" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={AuthorityPage(Teach)} />
                    <Route path="/" component={AuthorityPage(Teach)} />
                </Route>                
                <Route path="coursecategory" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={AuthorityPage(CourseCategory)} />
                    <Route path="/" component={AuthorityPage(CourseCategory)}  />
                </Route>
                <Route path="classroom" component={SecondNav} onEnter={enter}>
					<IndexRoute component={AuthorityPage(Classroom)} />
					<Route path="/" component={AuthorityPage(Classroom)} />
					{/* <Route path="/" component={AuthorityPage(BuildBox)} /> */}
                </Route>

                <Route path="students" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={AuthorityPage(Students)} />
                    <Route path="/" component={AuthorityPage(Students)} />
                    {/*<Route path="studentaccountnull" component={AuthorityPage(StudentAccountNull)} />*/}
                </Route>
                <Route path="teachers" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={AuthorityPage(Teachers)} />
                    <Route path="/" component={AuthorityPage(Teachers)} />
                    {/*<Route path="teacheraccountnull" component={AuthorityPage(TeacherAccountNull)} />*/}
                </Route>
                <Route path="studentcourse" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={AuthorityPage(StudentCourse)} />            
					<Route path="namelist/:tcId" component={AuthorityPage(NameList)} />
                </Route>
                <Route path="achievement" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={AuthorityPage(Achievement)} />
                    <Route path="/" component={AuthorityPage(Achievement)} />
                </Route>
				<Route path="coursesetting" component={SecondNav} onEnter={enter}>
					<IndexRoute component={AuthorityPage(CourseSetting)} />
					<Route path="addcoursetask" component={AuthorityPage(AddCourseTask)} />   
					<Route path="coursesetting" component={CourseSetting}/>
					<Route path="selectcourseaddtask/:taskId" component={AuthorityPage(SelectCourseAddTask)}/>
					<Route path="coursepreferenceset/:taskId" component={AuthorityPage(CoursePreferenceSet)}/>
                    <Route path="coursepreferencesetdire/:taskId" component={AuthorityPage(CoursePreferenceSetDire)}/>
                    <Route path="editcoursetask/:taskId" component={AuthorityPage(EditCourseTask)}/>
				</Route>
                <Route path="schooltime" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={AuthorityPage(SchoolTime)} />
                    <Route path="/" component={AuthorityPage(SchoolTime)} />
                </Route>
                {/*<Route path="optclass" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={OptClass} />
                    <Route path="/" component={OptClass} />
                </Route>
                <Route path="studentcourseselect" component={StudentCourseSelect} onEnter={enter}/>*/}
                <Route path="course" component={AuthorityPage(Course)} onEnter={enter}/>
                <Route path="courseselect" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={AuthorityPage(CourseSelect)} />
                    <Route path="checklist/:courseid" component={AuthorityPage(CheckList)} />
                    <Route path="resultlist/:courseid" component={AuthorityPage(ResultList)} />
                    <Route path="optclass/:taskid" component={AuthorityPage(OptClass)} />
                </Route>
                <Route path="message" component={EmptyNav} onEnter={enter}>
                    <IndexRoute component={Message} />
                    <Route path=":type" component={Message} />
                </Route>
                <Route path="changepassword" component={EmptyNav} onEnter={enter}>
                    <IndexRoute component={ChangePW} />
                    <Route path="/" component={ChangePW} />
                </Route>
                {/*修改密码*/}
                <Route path="changepassword" component={EmptyNav} onEnter={enter}>
                    <IndexRoute component={ChangePW} />
                    <Route path="/" component={ChangePW} />
                </Route>
            {/*修改密码*/}
                <Route path="coursetableset" component={AuthorityPage(IframePage)} onEnter={enter}/>
                <Route path="automatecourseschedule" component={AuthorityPage(IframePage)} onEnter={enter}/>
                <Redirect from='*' to='/'  />
            </Route>
        </Router>
    </Provider>
);

export default RouteConfig;