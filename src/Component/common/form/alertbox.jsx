import style from '../../../style/alert.scss'
import React, { Component } from "react"
import { Link } from 'react-router'

class AlertBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.alert_full}>
        <div
          className={style.alert_box}
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.backgroundColor,
          }}
        >
          <div
            className={style.alert_title}
            style={{
              width: this.props.titWidth,
              height: this.props.titHeight,
              lineHeight: this.props.titHeight,
              backgroundColor: this.props.titbgColor,
              fontSize: this.props.titFontSize,
            }}
          >
            <p className={style.alert_title_first}>
              {this.props.titFirst}
              <span className={style.alert_title_second}>
                {this.props.titSecond}
              </span>
              <span 
                className={style.close_icon}
                style={{
                  marginTop: this.props.marginTop
                }}
              >
              </span>
            </p>
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default AlertBox




