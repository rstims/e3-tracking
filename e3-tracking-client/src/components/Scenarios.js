import React from 'react';
import map from 'lodash/map';


class Scenarios extends React.Component {


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

		const views = map(this.props.views, (val, key) =>
			<tr key={key}>
				<td>{this.mapRoute(val.route)}</td>
				<td>{this.formatDate(val.created_at)}</td>
			</tr>
		);
		return(
			<div className="jumbotron">
				<div className="totals">
					<h2 style={{borderBottom:'1px solid black'}}>Totals</h2>
					<ul style={{listStyleType: 'none'}}>
						<li>Extended: <strong>{this.props.totals.extended}</strong></li>
						<li>Brief: <strong>{this.props.totals.brief}</strong></li>
						<li>Employer: <strong>{this.props.totals.employer}</strong></li>
						<li>Broker: <strong>{this.props.totals.broker}</strong></li>
						<li>Someone Else: <strong>{this.props.totals.someoneElse}</strong></li>
						<li>Very Familiar: <strong>{this.props.totals.very}</strong></li>
						<li>Not Very Familiar: <strong>{this.props.totals.notVery}</strong></li>
						<li>Somewhat Familiar: <strong>{this.props.totals.somewhat}</strong></li>
						<li>Somewhat Familiar: <strong>{this.props.totals.somewhat}</strong></li>
						<li>Definitely creating content: <strong>{this.props.totals.efinitely}</strong></li>
						<li>Don't Know if creating content: <strong>{this.props.totals.dontKnow}</strong></li>
						<li>Not now creating content: <strong>{this.props.totals.notNow}</strong></li>
					</ul>
				</div>

				<div className="table-responsive">
					<h2 style={{borderBottom:'1px solid black'}}>Scenarios</h2>
					<table className="table">
						<thead>
							<tr>
								<th>Scenario</th>
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

export default Scenarios;