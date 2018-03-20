
import style from "../../style/timesetting.scss"
import React, { Component } from "react"
import { Link } from 'react-router'
import TimeSection from "./timesection"

class SchoolTime extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		var _self=this;
		var typelength = {};
		var newList = this.props.classList.map(function(item){
			var type = item.ptType;
			if(typelength[type]){
				typelength[type]++
				return item;
			}else{
				typelength[type]=1;
				return  Object.assign({},item,{isFirst:true});
			}
		})
		return (
			<div className={style.time_table}>
				<table>
					<tbody>
						<tr>
							<th> </th>
							<th>节次</th>
							<th>时间</th>
							<th>星期一</th>
							<th>星期二</th>
							<th>星期三</th>
							<th>星期四</th>
							<th>星期五</th>
							<th>星期六</th>
							<th>星期日</th>
						</tr>
						{newList.map(function(el, index) {
							{var ptType="";
								if(el.ptType==0){
									ptType="晨会"
								}else if(el.ptType==1){
									ptType="上午"
								}else if(el.ptType==2){
									ptType="下午"
								}else if(el.ptType==3){
									ptType="晚上"
								}
							}
							var type = null;
							if(el.isFirst){
								type = <td rowSpan={typelength[el.ptType]}>{ptType}</td>
							}
							var timeEle="";
							if(el.startSlot==null||el.endSlot==null){
								timeEle="";
							}else{
								timeEle=(
									<span>{el.startSlot} 至 {el.endSlot}</span>
								)
							}
							return (<tr key={index}>
									{type}
									<td>{el.ptType?el.seqNum:""}</td>
									<td className={style.time_setter}>
										{timeEle}
										<TimeSection
											updateTime={_self.props.updateTime}
											startSlot={el.startSlot}
											endSlot={el.endSlot}
											slotsPmt={el.slotsPmt}
											idInfo={el}
											isTimeClick={_self.props.isTimeClick}
										/>
									</td>
									{
										el.caTypeStr.split(",").map(function(elem, index) {
											return (
												(el.startSlot!=null&&el.endSlot!=null&&el.caType!=0)?
												<td 
													index={index} 
													className={elem==1?style.furlough:style.un_furlough} 
													key={index}
													onClick={_self.changeStatus.bind(_self,el,elem,index)}
												>
												</td>:<td key={index}></td>
											);
										})
									}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
	changeStatus(data,status,index,e){
		var statusList=data.caTypeStr.split(",");
		var newStatus;
		if(status==0){
			newStatus="1";
		}else if(status==1){
			newStatus="0";
		}
		statusList.splice(index,1,newStatus);
		var newList = this.props.classList.map(function(item){
			if(item.id==data.id){
				item.caTypeStr=statusList.join(",");	
			}
			return item
		})	
		this.setState({classList:newList })
	}
}


export default SchoolTime
