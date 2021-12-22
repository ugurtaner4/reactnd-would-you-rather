import React, { Component, Fragment } from 'react';

import AnsweredQuestion from './AnsweredQuestion';
import UnansweredQuestion from './UnansweredQuestion';
import { connect } from 'react-redux';

class QuestionPage extends Component {
	render() {
		const { autherUserAnsweres, match } = this.props;
		const id = match.params.id;
		const totalAnswered = autherUserAnsweres.hasOwnProperty(id) ? true : false;

		return (
			<Fragment>
				{totalAnswered ? <AnsweredQuestion id={id} /> : <UnansweredQuestion id={id} />}
			</Fragment>
		);
	}
}

function mapStateToProps({ authedUser, users }) {
	const autherUserAnsweres = users[authedUser].answers;

	return {
		autherUserAnsweres
	};
}

export default connect(mapStateToProps)(QuestionPage);
