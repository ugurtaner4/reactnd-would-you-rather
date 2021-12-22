import {
	Header,
	Segment,
} from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';

import Avatar from './Avatar';
import NotFound from './NotFound';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';

class AnsweredQuestion extends Component {
	render() {
		const { question, author, authedUser } = this.props;

		if (question === null) {
			return <NotFound />;
		}

		const { optionOne, optionTwo, timestamp } = question;
		const { name, avatarURL } = author;
		const votes = optionOne.votes.length + optionTwo.votes.length;
		const PercentOne = Math.round((optionOne.votes.length / votes) * 100);
		const PercentTwo = Math.round((optionTwo.votes.length / votes) * 100);

		return (
			
					<Fragment>
						<Header as="h3">
							<Avatar avatarURL={avatarURL} className="mr-2" />
							{name} wonder about:
						</Header>

						<Segment>
							<ol>
								<li>
									{optionOne.text}
									{optionOne.votes.includes(authedUser) ? (
										<span className="text-danger ml-2">
											&lt;- Your Answer
										</span>
									) : null}
								</li>
								<ProgressBar
									now={PercentOne}
									label={`${PercentOne}%`}
									variant="info"
								/>
								<small className="text-muted">
									Answered by {optionOne.votes.length} out of {votes}{' '}
									users
								</small>
								<li>
									{optionTwo.text}
									{optionTwo.votes.includes(authedUser) ? (
										<span className="text-danger ml-2">
											&lt;- Your Answer
										</span>
									) : null}
								</li>
								<ProgressBar
									now={PercentTwo}
									label={`${PercentTwo}%`}
									variant="info"
								/>
								<small className="text-muted">
								Answered by {optionTwo.votes.length} out of {votes}{' '}
									users
								</small>
							</ol>
							<small className="text-muted">{formatDate(timestamp)}</small>
						</Segment>
						</Fragment>	
					
				
		);
	}
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
	const question = questions[id];

	return {
		question: question ? question : null,
		author: question ? users[question.author] : null,
		authedUser
	};
}

export default connect(mapStateToProps)(AnsweredQuestion);
