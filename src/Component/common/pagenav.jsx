import style from "../../style/common.scss"
import React,{Component} from "react"
import DropDownSelect from "../common/form/dropdownselect"

export default class PageNav extends Component {
	render(){
		return (
			<div className={style.listCon} style={this.props.style}>
				<div className={`${style.listTitle} ${style.classroom_first_title}`}>
					{this.props.firstClassTit}
					<span className={style.nav_title}>{this.props.secondClassTit}</span>
					<div className={style.nav_select}>
						{this.props.hasSelect=="1"?(						
							<DropDownSelect 
								val={this.props.val} 
								type={"202"} 
								name={"acadTermID"}  
								onChange={this.props.onChange} 
								source={"AcadYearTerm"} 
								width={190}
								//onInit={this.props.onInit}
							/>
						):""}
					</div>
				</div>
				{this.props.children}
			</div>
		)
	}
}