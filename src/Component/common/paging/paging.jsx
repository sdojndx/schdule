import style from "../../../style/common.scss"
import React,{Component} from "react"
import {Link} from "react-router"

class Paging extends Component {
    constructor(){
        super()
    } 
    render(){
        //搜索框内页码  总页码  共多少条记录  每页显示
        var {pageIndex,totalPage,totalCount,pageSize} = this.props.paging;
        totalPage = pageCalculate(totalCount,pageSize);
        pageIndex*=1;
        var pages = [];
        var nearpage = 5;
        var prev = 2;   
        var space = Math.floor(nearpage/2);
        var start = 1;
        var end = 0;
        var isend = false;
        if(pageIndex<=1){
            pages.push(<span className={style.page_num_disable} key="prev"><i className="fa fa-caret-left"> </i></span>);
        }else{
            pages.push(<span className={style.page_num} key="prev" onClick={()=>this.props.onPageChange(pageIndex-1,pageSize)} pagedata={pageIndex-1}><i className="fa fa-caret-left"> </i></span>);
        }
        if(pageIndex>(prev+space+1)){
            for(var i=1;i<=prev;i++){
                pages.push(<span className={style.page_num} onClick={(e)=>this.props.onPageChange(e.target.textContent,pageSize)} key={i}>{i}</span>);
            }
            pages.push(<span key="space">...</span>);
            start = pageIndex-space;
        }           
        if(totalPage<=(pageIndex+space)){
            end = totalPage;
            isend = true;
        }else{
            end = pageIndex+space;
            isend = false;
        }
        for(var i=start;i<=end;i++){
            if(i!=pageIndex){
                pages.push(<span className={style.page_num} onClick={(e)=>this.props.onPageChange(e.target.textContent,pageSize)} key={i}>{i}</span>);
            }else{
                pages.push(<span className={style.current_page} key={i}>{i}</span>);
            }
        }
        if(!isend){
            pages.push(<span key="nextspace">...</span>);
        }
        if(pageIndex>=totalPage){
            pages.push(<span className={style.page_num_disable} key="next"><i className="fa fa-caret-right"> </i></span>);
        }else{
            pages.push(<span className={style.page_num} key="next" onClick={()=>this.props.onPageChange(pageIndex+1,pageSize)} pagedata={pageIndex+1}><i className="fa fa-caret-right"> </i></span>);
        }
        return(
          <div className={style.listBottom} style={this.props.style}>
            <div className={style.listBottomLeft}>
                共有<strong>{totalCount}</strong>条记录，当前每页显示
                <select 
                    className={style.select_pading}
                    value={pageSize} 
                    onChange={(e)=>this.props.onPageChange(pageIndex,e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className={style.listBottomRight}>
                {pages}
                <div className={style.listBottomInput}>
                    到第
                    <input type="text" ref="pageNum" defaultValue={pageIndex} />
                    页
                    <a href="javascript:void(0)" onClick={()=>this.props.onPageChange(this.refs.pageNum.value,pageSize)}>确定</a>
                </div>
            </div>
        </div>
        )
    }
}

export default Paging

export const pageCalculate = (totalCount,pageSize)=>{
    var totalPage = Math.ceil(totalCount/pageSize);
    totalPage = totalPage||1;
    return totalPage;
}
