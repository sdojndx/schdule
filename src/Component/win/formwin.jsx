import React, { Component } from "react"
import AlertWin from "./alertwin"
import Form from "../common/form/form"

export default class FormWin extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<AlertWin
				width={this.props.width||"900"}
				bgcolor="#ffffff"
				navTitle={this.props.navTitle}
				btnCounts="2"
				btnLeftName={this.props.btnLeftName || "返回"}
				btnRightName={this.props.btnRightName || "保存"}
				close={this.props.close}
				isShow={this.props.isShow}
				submit={this.props.submit}
				contentPaddingLeft={this.props.paddingLeft}
			>
				<Form
					onChange={this.props.onChange}
					formSource={this.props.formSource}
					formData={this.props.formData}
					showType={this.props.showType}
					timeWidth={this.props.timeWidth}
					onSourceEffect={this.props.onSourceEffect}
				/>
			</AlertWin>
		)
	}
} 