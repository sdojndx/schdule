import React, {Component, PropTypes} from 'react';
import '../../../../ueditor/ueditor.config'
import '../../../../ueditor/ueditor.all'
import '../../../../ueditor/lang/zh-cn/zh-cn'

class AEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	componentDidMount() {
		this.initEditor();
	}
	
	componentDidUpdate(prevprops){
		var val = "";
		if(this.props.val!=prevprops.val){
			try{
				val = this.ueEditor.getContent();
				if(val!=this.props.val){
					//this.setEditorVal(this.props.val);
					//this.ueEditor.setContent(this.props.val)
					if(this.props.val){
						this.ueEditor.setContent(this.props.val);
					}else{
						this.ueEditor.setContent("");
					}
				}
			}catch(e){

			}
		}
	}
	componentWillUnmount() {
		UE.delEditor(this.refs[this.props.id]);
	}
	

	render() {
		return (
			<div 
				ref={this.props.id} 
				name="content" 
				style={{width:this.props.width,display: 'inline-block',margin:"10px 10px 10px 0"}} 
				type="text/plain" 
				className={this.props.className}
			>
			</div>
		)
	}
	
	initEditor() {
		var _self = this;
		//var id = this.props.id;
		this.ueEditor = UE.getEditor(this.refs[this.props.id], {
			initialContent: this.props.val||this.props.content || this.props.initialContent || '',
			autoHeightEnabled: false,
			toolbars: this.props.toolbars,
			wordCount:false, 
			autoClearinitialContent:true,
			elementPathEnabled : false
		})
		this.ueEditor.ready(ueEditor => {
			if (!ueEditor) {
				UE.delEditor(this.refs[this.props.id]);
				_self.initEditor();
			}else{
				if(this.props.val){
					_self.ueEditor.setContent(this.props.val);
				}else{
					_self.ueEditor.setContent("");
				}
			}
		})
		this.ueEditor.addListener("contentChange",function(){
			var val = this.getContent();
			_self.props.onChange(val);
		})
	}
}

AEditor.defaultProps = {
	toolbars: [['fullscreen', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify']]
};

AEditor.propTypes = {
	id: PropTypes.string.isRequired
}

export default AEditor;