import {
	Header,
	Segment,
} from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';

import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';
import { handleAddAnswer } from '../actions/questions';

class UnansweredQuestion extends Component {
	state = {
		errorMsg: ''
	};

	handleSubmit = (id, e) => {
		const answer = this.form.answer.value;
		const { dispatch } = this.props;

		e.preventDefault();

		if (answer !== '') {
			dispatch(handleAddAnswer(id, answer));
		} else {
			this.setState({ errorMsg: 'You must make a choice' });
		}
	};

	render() {
		const { question, author } = this.props;

		if (question === null) {
			return <NotFound />;
		}

		const { optionOne, optionTwo, timestamp, id } = question;
		const { name, avatarURL } = author;
		const { errorMessage } = this.state;

		return (
			
					<Fragment>
						<Header as="h3">
							<Avatar avatarURL={avatarURL} className="mr-2" />
							{name} wonder about:
						</Header>

						<Segment>
							<Form class="form-style-1"
								onSubmit={(e) => this.handleSubmit(id, e)}
								ref={(f) => (this.form = f)}
							>
								{errorMessage ? (
									<p className="text-danger">{errorMessage}</p>
								) : null}
								<Form.Check
									custom
									type="radio"
									id="optionOne"
									label={optionOne.text}
									value="optionOne"
									name="answer"
								/>
								<Form.Check
									custom
									type="radio"
									id="optionTwo"
									label={optionTwo.text}
									value="optionTwo"
									name="answer"
								/>
								<Button type="submit">
									Vote
								</Button>
							</Form>
							<small>{formatDate(timestamp)}</small>
						</Segment>
						</Fragment>
		);
	}
}

function mapStateToProps({ questions, users }, { id }) {
	const question = questions[id];

	return {
		question: question ? question : null,
		author: question ? users[question.author] : null
	};
}

export default connect(mapStateToProps)(UnansweredQuestion);
