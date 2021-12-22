import React, { Component, Fragment } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
		toHome: false
	};

	handleInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;

		e.preventDefault();

		this.setState(
			{
				optionOne: '',
				optionTwo: '',
				toHome: true
			},
			() => dispatch(handleAddQuestion(optionOne, optionTwo))
		);
	};

	render() {
		const { optionOne, optionTwo, toHome } = this.state;

		if (toHome === true) return <Redirect to="/" />;

		return (
			<Fragment>
				<h2 className="text-center my-3">
					<small>Define A Question/Would You Rather..</small>
				</h2>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="optionOne">
										<Form.Label>Option One</Form.Label>
										<Form.Control
											type="text"
											name="optionOne"
											value={optionOne}
											onChange={this.handleInputChange}
										/>
									</Form.Group>
									<h3>
										<small>OR</small>
									</h3>
									<Form.Group controlId="optionTwo">
										<Form.Label>Option Two</Form.Label>
										<Form.Control
											type="text"
											name="optionTwo"
											value={optionTwo}
											onChange={this.handleInputChange}
										/>
									</Form.Group>
									<Button
										type="submit"
										disabled={optionOne === '' || optionTwo === ''}
									>
										Submit
									</Button>
								</Form>
			</Fragment>
		);
	}
}

export default connect()(NewQuestion);
