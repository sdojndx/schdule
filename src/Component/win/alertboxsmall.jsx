import style from '../../style/alertboxsmall.scss'
import React, { Component } from "react"
import { Link } from 'react-router'
import Buttons from "../common/buttons"


class AlertBoxSmall extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={style.full_bg}
                style={{ display: this.props.isShow ? "block" : "none" }}
            >
                {/* ===空盒子=== */}
                <div className={style.fullBox}></div>
                {/* ===空盒子=== */}

                <div className={style.alert_box}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: this.props.bgColor
                    }}
                >
                    <div className={style.bg_img}>
                        {this.props.children}
                    </div>

                    <div className={style.alert_content}
                        style={{
                            margin: this.props.contentMargin
                        }}
                    >
                        <div className={style.text_con}>
                            <p>{this.props.alertText}</p>
                            {this.props.alertTextAnother ?
                                <p>{this.props.alertTextAnother}</p> : ""
                            }
                            {this.props.alertWarning ?
                                <p className={style.alert_warn}> {this.props.alertWarning}</p> : ""
                            }
                        </div>

                        <div className={style.btn_group}>
                            {this.props.btnSum == "2" ?
                                <div>
                                    <Buttons
                                        btnName={this.props.btnLeftName}
                                        style = {{width:"100px",height:"36px",backgroundColor:"#3e91eb",lineHeight:"36px"}}
                                        onClick={this.props.show}
                                    />
                                    <Buttons
                                        btnName={this.props.btnRightName}
                                        style = {{width:"100px",height:"36px",backgroundColor:"#f59524",marginLeft:"20px",lineHeight:"36px"}}
                                        onClick={this.props.save}
                                    />
                                </div>
                                :
                                <Buttons
                                    btnName={this.props.btnLeftName}
                                    bgColor="#3e91eb"
                                    width="100px"
                                    height="36px"
                                />
                            }
                        </div>
                        {this.props.notice ?
                            <span className={style.alert_notice}>
                                <i className="fa fa-volume-up"> </i>
                                {this.props.notice}
                            </span> : ""
                        }
                    </div>
                    <span className={style.alert_close} onClick={this.props.show}></span>
                </div>
            </div>
        )
    }
}

export default AlertBoxSmall