import React,{Component} from "react"

class IframePage extends Component{
	constructor() {
        super();
        this.state = {
            height:1000
        }
    }
    componentWillMount(){        
        window.addEventListener('resize', this.getIframeSize)
    }
    render(){
    	return (
            <div style={{
                width:1200,
                margin:"0px auto"
            }}>
                <iframe
                    style={{
                        height:this.state.height,
                        width:"100%",
                        border:"0px",
                        outline:"0px"
                    }}
                    src={this.props.authority.openUrl.sourceCode}
                ></iframe>
            </div>
        )
    }
    getIframeSize(){
        
    }
}
export default IframePage