import React, { Component, Fragment } from 'react';

import QuestionsList from './QuestionsList';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { connect } from 'react-redux';

class Home extends Component {
	render() {
		const { answeredQuestionIds, unansweredQuestionIds } = this.props;
		const TABS_LIST=[ {key:"answered",title:"Answered Questions",ids:answeredQuestionIds,Note:"All Questions Answered",sortId:2},
						  {key:"unanswered",title:"Unanswered Questions",ids:unansweredQuestionIds,Note:"Create New Questions",sortId:1}]
		
		 const tabs = TABS_LIST.sort((a, b) => a.sortId - b.sortId);
		return (
			<Fragment>
				<Tabs>
					{tabs.map((tab)=>{
						return(
						<Tab eventKey={tab.key} title={tab.title}>
						<QuestionsList
							ids={tab.ids}
							Note={tab.Note}
						/>
						</Tab>
						);
					})}
				</Tabs>
			</Fragment>
		);
	}
}

function mapStateToProps({ authedUser, questions, users }) {
	const answeredQuestionIds = Object.keys(questions)
		.filter((id) => users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	const unansweredQuestionIds = Object.keys(questions)
		.filter((id) => !users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	return {
		answeredQuestionIds,
		unansweredQuestionIds
	};
}

export default connect(mapStateToProps)(Home);
