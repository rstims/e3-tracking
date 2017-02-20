import React from 'react';
import axios from 'axios';
import map from 'lodash/map';

class Tracking extends React.Component {



	constructor(props){
		super(props);
		this.state = {
			views: []
		}

	}

	componentDidMount(){

		this.getViews();
		
	}

	getViews(){
		axios.get('/api/views').then(views => {
			// console.log(views);
			this.setState({
				views: views.data.views
			});
		});
	}

	formatDate(date) {
	  var monthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  ];
	  date = new Date(date);
	  var day = date.getDate();
	  var monthIndex = date.getMonth();
	  var year = date.getFullYear();

	  return monthNames[monthIndex] + ' ' + day + ', ' + year;
	}

	mapRoute(route){
		
		let rt = [];
		const _r = JSON.parse(route || null);

		for(let i = 0;i < _r.route.length;i++){
			
			rt.push(_r.route[i].toUpperCase())
		}
		return rt.join(' - ');
	}

	render() {

		const views = map(this.state.views, (val, key) =>
			<tr>
				<td>{this.mapRoute(val.route)}</td>
				<td>{this.formatDate(val.created_at)}</td>
			</tr>
		);
		return(
			<div className="jumbotron">
				<div className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th>Route</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{views}
						</tbody>
						
					</table>
			    </div>
			</div>
		);
	}
}

export default Tracking;