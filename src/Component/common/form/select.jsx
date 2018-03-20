import style from '../../../style/form.scss'
import React, { Component } from "react"

class Select extends Component {
	componentDidMount() {
		this.getAutoVal(this.props.source)
		if (typeof this.props.onInit == "function") {
			this.props.onInit();
		}
	}
	shouldComponentUpdate(nextprops) {
		if (nextprops.source !== this.props.source) {
			this.getAutoVal(nextprops.source);
			return true;
		} else {
			return true;
		}
	}
	render() {
		var options = [];
		var source = this.props.source;
		var type = Object.prototype.toString.call(source);
		if (this.props.hasall) {
			options.push(<option key={-1} value={-1}>{this.props.hasall}</option>)
		}
		if (type == "[object Array]") {
			this.props.source.map((option, index) => {
				options.push(<option key={index} value={option.value}>{option.name}</option>)
			});
		} else if (type == "[object Object]") {
			for (var name in this.props.source) {
				options.push(<option key={name} value={name.replace(/^p/, "")}>{this.props.source[name]}</option>)
			}
		}
		return (
			<div className={style.select_div}
				style={{
					width: this.props.width||'200px',
					height: this.props.height,
					margin: this.props.margin,
					lineHeight: this.props.lineHeight,
					marginTop: this.props.marginTop || '6px'
				}}
			>
				<select
					readOnly={this.props.readonly}
					value={this.props.val}
					onChange={this.setValue.bind(this)}
					style={{
						width: (this.props.width + 40)||"240px",
						height: (this.props.selectHeight)||"",
						backgroundPosition: this.props.width - 24||"176px"
					}}
				>
					{options}
				</select>
			</div>

		)
	}
	getAutoVal(source) {
		//var source = this.props.source;
		var type = Object.prototype.toString.call(source);
		if (type == "[object Array]") {
			var autoval = "";
			if (this.props.hasall) {
				autoval = -1;
			}
			for (var index = 0, l = source.length; index < l; index++) {
				var option = source[index];
				if (index == 0 && autoval == "") {
					autoval = option.value;
				} else if (this.props.val == option.value) {
					autoval = option.value;
					break;
				} else if (option.checked) {
					autoval = option.value;
				}
			}
			if (this.props.onChange) {
				this.props.onChange(autoval);
			}
		}
	}
	setValue(e) {
		var val = e.target.value;
		if (this.props.onChange) {
			this.props.onChange(val);
		}
	}
}

export default Select
