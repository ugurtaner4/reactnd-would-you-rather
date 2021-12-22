import {
	Header,
	Segment,
} from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';

import Avatar from './Avatar';
import { connect } from 'react-redux';

class Stats extends Component {
	render() {
		const { user } = this.props;
		const { name, avatarURL, answers, questions } = user;

		return (
					<Fragment >
						<Header>
							<Avatar avatarURL={avatarURL} className="mr-2" />
							{name} /Score: {Object.keys(answers).length + questions.length}
						</Header>
						<Segment>
							<p>
								Answered Questions: {Object.keys(answers).length}
								<br />
								Created Questions: {questions.length}
							</p>
						</Segment>
						
					</Fragment>
						
		);
	}
}

function mapStateToProps({ users }, { id }) {
	return {
		user: users[id]
	};
}

export default connect(mapStateToProps)(Stats);
