import React from 'react';
import axios from 'axios';
import Scenarios from './Scenarios';

class Tracking extends React.Component {



	constructor(props){
		super(props);
		this.state = {
			totals: {
				extended:0,
				brief:0,
				employer:0,
				broker:0,
				someoneElse:0,
				very:0,
				notVery:0,
				somewhat:0,
				definitely:0,
				dontKnow:0,
				notNow:0
			},
			views: []
		}

	}

	componentDidMount(){

		this.getViews();
		
	}


	getViews(){
		axios.get('/api/views').then(views => {
			let state = this.state
			for (let [key, value] of Object.entries(state.totals)) {
				let count = value;
				let k = key;
				for(let i = 0;i < views.data.views.length;i++){
					if(/([a-z])([A-Z])/g.test(key)){
						if(views.data.views[i].route.indexOf(k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()) !== -1){
							count++
						}
					}else{
						if(views.data.views[i].route.indexOf(k) !== -1 && views.data.views[i].route.indexOf('-' + k) === -1 && views.data.views[i].route.indexOf(k + '-') === -1){
							count++
						}
					}
					
				}
				state.totals[key] = count;
			}

			state.views = views.data.views;

			this.setState(state);
		});
	}

	render() {
		return(
			<Scenarios views={this.state.views} totals={this.state.totals} />
		)
	}
}

export default Tracking;