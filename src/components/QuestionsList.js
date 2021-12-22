import React, { Fragment } from 'react';

import Question from './Question';

function QuestionsList(props) {
	const { ids, Note } = props;

	return (
		<Fragment>
			<h2>
				<small>Would You Rather?</small>
			</h2>
			{ids.length ? (
				ids.map((id) => <Question key={id} id={id} />)
			) : (
				<p>{Note}</p>
			)}
		</Fragment>
	);
}

export default QuestionsList;
