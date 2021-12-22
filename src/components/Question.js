import {
	Header,
	Segment
} from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';

import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';

class Question extends Component {
	render() {
		const { question, author } = this.props;
		const { optionOne, timestamp, id } = question;
		const { name, avatarURL } = author;

		return (
					<Fragment>
						<Header>
							<Avatar avatarURL={avatarURL} className="mr-2" />
							{name} wonder about:
						</Header>
						<Segment>
							<ul>
								<li>
									<p>{"Question: "+optionOne.text.slice(0, 50)}...?</p>
								</li>
								<li>
									<Link to={`/questions/${id}`}>
										<Button variant="outline-dark">Show</Button>
									</Link>
								</li>	
								<li>
								<small>{formatDate(timestamp)}</small>
								</li>
							</ul>
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

export default connect(mapStateToProps)(Question);
