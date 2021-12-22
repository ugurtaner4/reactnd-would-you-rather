import {ADD_ANSWER, ADD_QUESTION, RECEIVE_QUESTIONS} from '../actions/questions';

export default function questions(state = {}, action) {
	switch (action.type) {
		case ADD_ANSWER:
			const { qid, answer, authedUser } = action.answerInfo;

			return {
				...state,
				[qid]: {
					...state[qid],
					[answer]: {
						...state[qid][answer],
						votes: state[qid][answer].votes.concat([authedUser])
					}
				}
			};
		case ADD_QUESTION:
			return {
				...state,
				[action.question.id]: action.question
			};
			case RECEIVE_QUESTIONS:
				return {
					...state,
					...action.questions
				};
		

		default:
			return state;
	}
}
