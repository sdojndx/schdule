import {
	CHANGE_NAV,
	INIT_NAV
} from "../action/navs"
const initialState = {
	enternav: ["首页"],
	navlist: []
	// [{
	// 		code: '10',
	// 		name: '首页',
	// 		target: '',
	// 		title: '首页',
	// 		url: '/index',
	// 		child: []
	// 	}, {
	// 		code: '20',
	// 		name: '基础信息',
	// 		target: '',
	// 		title: '基础信息',
	// 		url: '',
	// 		child: [{
	// 			code: '2010',
	// 			name: '学年管理',
	// 			target: '',
	// 			title: '学年管理',
	// 			url: '/studyyear',
	// 			child: []
	// 		}, {
	// 			code: '2020',
	// 			name: '上课时间',
	// 			target: '',
	// 			title: '上课时间',
	// 			url: '/schooltime',
	// 			child: []
	// 		}, {
	// 			code: '2030',
	// 			name: '教学模式',
	// 			target: '',
	// 			title: '教学模式',
	// 			url: '/coursecate',
	// 			child: [],
	// 		}, {
	// 			code: '2040',
	// 			name: '教室管理',
	// 			target: '',
	// 			title: '教室管理',
	// 			url: '/classroom',
	// 			child: []
	// 		}, {
	// 			code: '2050',
	// 			name: '课程类别',
	// 			target: '',
	// 			title: '课程类别',
	// 			url: '/coursecategory',
	// 			child: []
	// 		}]
	// 	}, {
	// 		code: '30',
	// 		name: '师生管理',
	// 		target: '',
	// 		title: '师生管理',
	// 		url: '',
	// 		child: [{
	// 			code: '2010',
	// 			name: '学生管理',
	// 			target: '',
	// 			title: '学生管理',
	// 			url: '/StudentManage',
	// 			child: []
	// 		}, {
	// 			code: '2020',
	// 			name: '教师管理',
	// 			target: '',
	// 			title: '上课时间',
	// 			url: '/TeacherManage',
	// 			child: []
	// 		}]
	// 	}, {
	// 		code: '40',
	// 		name: '班级管理',
	// 		target: '',
	// 		title: '班级管理',
	// 		url: '',
	// 		child: [{
	// 			code: '2010',
	// 			name: '选课任务设置',
	// 			target: '',
	// 			title: '选课任务设置',
	// 			url: '/coursesetting',
	// 			child: []
	// 		}, {
	// 			code: '2020',
	// 			name: '学生选课设置',
	// 			target: '',
	// 			title: '学生选课设置',
	// 			url: '/stuselectcourse',
	// 			child: []
	// 		}]
	// 	}, {
	// 		code: '50',
	// 		name: '课程管理',
	// 		target: '',
	// 		title: '课程管理',
	// 		url: '',
	// 		child: [{
	// 			code: '2010',
	// 			name: 'ggg',
	// 			target: '',
	// 			title: '学年管理',
	// 			url: '/StudyYear3',
	// 			child: []
	// 		}, {
	// 			code: '2020',
	// 			name: 'hhh',
	// 			target: '',
	// 			title: '上课时间',
	// 			url: '/SchoolTime3',
	// 			child: []
	// 		}]
	// 	}, {
	// 		code: '60',
	// 		name: '选课管理',
	// 		target: '',
	// 		title: '选课管理',
	// 		url: '',
	// 		child: [{
	// 			code: '2010',
	// 			name: '选课任务设置',
	// 			target: '',
	// 			title: '选课任务设置',
	// 			url: '/selectcourse',
	// 			child: []
	// 		}, {
	// 			code: '2020',
	// 			name: '学生选课管理',
	// 			target: '',
	// 			title: '学生选课管理',
	// 			url: '/classmanage/studentoptmanage',
	// 			child: []
	// 		}]
	// 	},
	// 	{
	// 		code: '1011',
	// 		name: '成绩管理',
	// 		target: '',
	// 		title: '成绩管理',
	// 		url: '/achievement',
	// 		child: []
	// 	},
	// 	{
	// 		code: '70',
	// 		name: '智能排课',
	// 		target: '',
	// 		title: '智能排课',
	// 		url: '',
	// 		child: [{
	// 			code: '2010',
	// 			name: '第1步添加课程',
	// 			target: '',
	// 			title: '第1步添加课程',
	// 			url: '/selectcourseaddtask',
	// 			child: []
	// 		}, {
	// 			code: '2030',
	// 			name: '第2步选课偏好',
	// 			target: '',
	// 			title: '第2步选课偏好',
	// 			url: '/coursepreferenceset',
	// 			child: []
	// 		}, {
	// 			code: '2020',
	// 			name: '添加课程',
	// 			target: '',
	// 			title: '添加课程',
	// 			url: '/addcourse',
	// 			child: []
	// 		}]
	// 	}, {
	// 		code: '80',
	// 		name: '课表查询',
	// 		target: '',
	// 		title: '课表查询',
	// 		url: '',
	// 		child: [{
	// 			code: '2010',
	// 			name: 'aaa',
	// 			target: '',
	// 			title: '学年管理',
	// 			url: '/StudyYear6',
	// 			child: []
	// 		}, {
	// 			code: '2020',
	// 			name: 'bbb',
	// 			target: '',
	// 			title: '上课时间',
	// 			url: '/SchoolTime6',
	// 			child: []
	// 		}]
	// 	}
	// ]
}
export default (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_NAV:
			{
				// 	return Object.assign({},state,{loadStatus:state.loadStatus+1})
				// case DELETE_LOAD:{
				var pinfo = action.navs.match(/^\/?(\w+)/g);
				var paths = pinfo?pinfo[0].replace(/^\//,""):""; //.match(/\/\w+/g);
				var navs = Object.assign({}, state);
				if (paths) {
					for (var i = 0, l = navs.navlist.length; i < l; i++) {
						var elem = navs.navlist[i];
						var match = false;
						if (elem.url && elem.url == paths) {
							navs.enternav = [i];
							break;
						}
						for (var j = 0, m = elem.child.length; j < m; j++) {
							var subelem = elem.child[j];
							if (subelem.url && subelem.url == paths) {
								navs.enternav = [i,j];
								match=true;
								break;
							}
						}
						if(match){
							break;
						}
					}
				} else {
					navs.enternav = [0];
				}
				return navs;
			};
		case INIT_NAV:
			{
				var navs = Object.assign({}, state);
				navs.navlist = action.navs;
				return navs;
			}
		default:
			return state

	}
}