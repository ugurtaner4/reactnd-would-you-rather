import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard';
import LoginForm from './components/LoginForm';
import NavigationBar from './components/NavigationBar';
import NewQuestion from './components/NewQuestion';
import NotFound from './components/NotFound';
import QuestionPage from './components/QuestionPage';
import { BrowserRouter as Router } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		const { authedUser, loadingBar } = this.props;

		if (loadingBar.default === undefined || loadingBar.default === 1) {
			//loading
			return (
				<div className="d-flex justify-content-center">
					<Spinner
						animation="border"
						role="status"
						variant="secondary"
						className="my-5"
					>
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			);
		} else {
			return <Fragment>{!authedUser ? <LoginForm /> : 
			<Router>
				<Container>
					<NavigationBar />
					<main>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/questions/:id" component={QuestionPage} />
							<Route path="/add" component={NewQuestion} />
							<Route path="/leaderboard" component={LeaderBoard} />
							<Route component={NotFound} />
						</Switch>
					</main>
				</Container>
			</Router>}</Fragment>;
		}
	}
}

function mapStateToProps({ authedUser, loadingBar }) {
	return {
		authedUser,
		loadingBar
	};
}

export default connect(mapStateToProps)(App);
