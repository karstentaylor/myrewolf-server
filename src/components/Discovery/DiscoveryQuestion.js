import React, { Component } from 'react';
import { Input } from '../Utils/Utils';
import DiscoveryContext from '../../contexts/DiscoveryContext';

export default class DiscoveryQuestion extends Component {
	static contextType = DiscoveryContext;
	render() {
		const { question } = this.props;

		return (
			<div className="DiscoveryQuestion__details">
				<div className="DiscoveryQuestion__text">
					<h4 className="DiscoveryQuestion__heading">{question.question}</h4>

					<Input
						required
						name={question.id}
						id={question.id}
						label={`question${question.id}`}
					></Input>
				</div>
			</div>
		);
	}
}
