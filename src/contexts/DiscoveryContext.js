import React, { Component } from 'react';

const DiscoveryContext = React.createContext({
	questions: [],
	answers: [],
	error: null,
	setError: () => {},
	clearError: () => {},
	setList: () => {},
});
export default DiscoveryContext;

export class DiscoveryProvider extends Component {
	state = {
		questions: [],
		error: null,
	};
	setQuestions = (questions) => {
		this.setState({ questions });
	};
	setAnswers = (answers) => {
		this.setState({ answers });
	};

	setError = (error) => {
		console.error(error);
		this.setState({ error });
	};
	removeQuestion = (id) => {
		const newQuestions = this.state.questions.filter((q) => q.id !== id);
		this.setState({ questions: newQuestions });
	};

	clearError = () => {
		this.setState({ error: null });
	};
	render() {
		const value = {
			questions: this.state.questions,
			answers: this.state.answers,
			error: this.state.error,
			setError: this.setError,
			clearError: this.clearError,
			setQuestions: this.setQuestions,
		};
		return (
			<DiscoveryContext.Provider value={value}>
				{this.props.children}
			</DiscoveryContext.Provider>
		);
	}
}
