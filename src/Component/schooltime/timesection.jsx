
import style from "../../style/timesetting.scss"
import React, { Component } from "react"


class TimeSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditShow:false,
			startSlot:this.props.startSlot
		};
		this.checkSwShow = this.checkSwShow.bind(this);
	}
	render() {
		var hours=[];
		var minutes=[];
		for(var i=0,I=23;i<=I;i++){
			var time=i<10?'0'+i:i;
			hours.push(
				<option key={i} value={i}>{time}</option>
			)
		}
		for(var j=0,J=12;j<J;j++){
			var time=j*5<10?"0"+j*5:j*5
			minutes.push(
				<option key={time} value={time}>{time}</option>
			)
		}
		if(this.state.startSlot!=null){
			var startHours=this.state.startSlot.split(":")[0];
			var startMinutes=this.state.startSlot.split(":")[1];

		}else{
			var startHours="0"
			var startMinutes="0"
		}
		var endHours=Number(startHours);
		var endMinutes=Number(startMinutes)+this.props.slotsPmt
		if(endMinutes>=60){
			endMinutes=endMinutes-60;
			endHours=endHours+1;
		}
		endMinutes=endMinutes>=10?endMinutes:"0"+endMinutes;
		endHours=endHours>=10?endHours:"0"+endHours;
		return (
			<div>
				<div
					style={{display: this.props.isTimeClick?"block":"none"}}
					className={style.edit_time}
					onClick={this.isShowTimeClick.bind(this)}
				>
				</div>
				<div  ref="setwin" className={style.time_win_container} style={{display: this.state.isEditShow?"block":"none"}}>
					<div className={style.time_content}>
						<p>上课时间</p>
						<div>
							<select
								value={startHours}
								onChange={this.setValue.bind(this,"hours")}
							>
								{hours}
							</select>
							<span style={{margin:"0 6px"}}>时</span>
							<select
								value={startMinutes}
								onChange={this.setValue.bind(this,"minutes")}
							>
								{minutes}
							</select>
							<span style={{marginLeft:"6px"}}>分</span>
						</div>
					</div>
					<div className={style.time_content} style={{marginTop:"20px",textAlign:"left"}}>
						<p>下课时间</p>
						<div><span>{endHours}</span> : <span>{endMinutes}</span></div>
					</div>
				</div>
			</div>
		)
	}
	isShowTimeClick(e){
		this.swShow();
		this.setState({startSlot:this.props.startSlot});
		document.body.addEventListener("click",this.checkSwShow)
	}
	checkSwShow(e){
		var elem = e.target;
		var type = e.target.tagName.toLowerCase();
		var eles=this.refs.setwin.getElementsByTagName(type)
		var elesArray=Array.prototype.slice.call(eles,0);
		if(elesArray.indexOf(e.target)==-1&&(elem!==this.refs.setwin)){
			this.swShow();
			document.body.removeEventListener("click",this.checkSwShow);
			e.stopPropagation();
			if(this.state.startSlot==null){
				this.state.startSlot="0:0"
			}
			var timer=this.state.startSlot.split(":");
			var id=this.props.idInfo.id;
			var lessonId=this.props.idInfo.lessonID;
			var seqNum=this.props.idInfo.seqNum;
			var slotsPmt=this.props.idInfo.slotsPmt;
			var caTypeStr=this.props.idInfo.caTypeStr;
			var ndMtgs=this.props.idInfo.ndMtgs;
			if(this.props.startSlot==this.state.startSlot){
				return;
			}
			var time={
				hours:timer[0],
				minutes:timer[1]
			}
			this.props.updateTime(time,id,lessonId,seqNum,slotsPmt,caTypeStr,ndMtgs);
		}
	}
	swShow(){		
		this.setState({isEditShow:!this.state.isEditShow})
	}
	setValue(type,e){
		var target=e.target;
		var val=target.value;
		if(this.state.startSlot==null){
			this.state.startSlot="0:0"
		}
		var hours=this.state.startSlot.split(":")[0];
		var minutes=this.state.startSlot.split(":")[1];
		if(type=="hours"){
			hours=val
		}else if(type=="minutes"){
			minutes=val
		}
		if(hours==""){
			hours="0"
		}
		if(minutes==""){
			minutes="0"
		}
		var startSlot=hours+":"+minutes
		this.setState({ startSlot: startSlot})
	}
}
export default TimeSection