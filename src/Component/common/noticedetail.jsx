import style from "../../style/tool.scss"
import React, { Component } from "react"

class NoticeDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow:false,
		};
	}

	componentDidMount() {
	}
	render() {
		var notes="";
		var isExceed;
		if(this.props.note.length>5){
			notes=this.props.note.substring(0,5)+"...";
			isExceed=true;
			
		}else{
			notes=this.props.note;
			isExceed=false;
			//this.setState({isExceed:false})
		}
		return (
			<td 
				className={style.notice_container}
			>
				<span 
					onMouseOver={this.show.bind(this)}
					onMouseOut={this.show.bind(this)}
				>
					{notes}
				</span>
				<span 
					className={style.notice_win}
					style={{display: this.state.isShow&&isExceed?"block":"none"}}
				>
					{this.props.note}
				</span>
			</td>
		)
	}
	show(e){
		this.setState({isShow:!this.state.isShow})
	}
}

export default NoticeDetail