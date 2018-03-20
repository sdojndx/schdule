import React,{Component} from 'react';
import Animate from 'rc-animate'; 
import velocity from 'velocity-animate';

export const searchanim = {
	enter:(node,done)=>{
		let ok = false;

	    function complete() {
	      if (!ok) {
	        ok = 1;
	        done();
	      }
	    }

	    velocity(node, 'slideDown', {
	      duration: 500,
	      complete,
	    });
	    return {
	      stop() {
	        velocity(node, 'finish');
	        // velocity complete is async
	        complete();
	      },
	    };
	},
	leave:(node, done)=>{
		let ok = false;

	    function complete() {
	      if (!ok) {
	        ok = 1;
	        done();
	      }
	    }

	    node.style.display = 'block';

	    velocity(node, 'slideUp', {
	      duration: 500,
	      complete,
	    });
	    return {
	      stop() {
	        velocity(node, 'finish');
	        // velocity complete is async
	        complete();
	      },
	    };
	}
}

export const winanimate = {
	enter:(node,done)=>{
		let ok = false;

	    function complete() {
	      if (!ok) {
	        ok = 1;
	        done();
	      }
	    }

	    velocity(node, 'fadeIn', {
	      duration: 200,
	      complete,
	    });
	    return {
	      stop() {
	        velocity(node, 'finish');
	        // velocity complete is async
	        complete();
	      },
	    };
	},
	leave:(node,done)=>{
		let ok = false;

	    function complete() {
	      if (!ok) {
	        ok = 1;
	        done();
	      }
	    }

	    node.style.display = 'block';
	    velocity(node, 'fadeOut', {
	      duration: 200,
	      complete,
	    });
	    return {
	      stop() {
	        velocity(node, 'finish');
	        // velocity complete is async
	        complete();
	      },
	    };
	}
}

export class SearchAnimate extends Component{
	render(){
		return (
			<Animate
				component=""
				showProp="visible"
				exclusive={false}
				animation={searchanim}
			>
				{this.props.children}
			</Animate>
		)
	}
}
export class WinAnimate extends Component{
	render(){
		return (
			<Animate
				component=""
				showProp="visible"
				exclusive={false}
				animation={winanimate}
			>
				{this.props.children}
			</Animate>
		)
	}
}