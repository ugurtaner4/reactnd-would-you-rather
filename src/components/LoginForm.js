import {
	Header,
	Segment,
} from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class LoginForm extends Component {
	state = {
		errorMessage: ''
	};

	handleSubmit = (e) => {
		const userID = this.userID.value;
		const { dispatch } = this.props;

		e.preventDefault();

		if (userID !== '') {
			dispatch(setAuthedUser(userID));
		} else {
			this.setState({ errorMessage: 'Pick User Name' });
		}
	};

	render() {
		const { userNames } = this.props;
		const { errorMessage } = this.state;

		return (
					<Fragment>
						<Header>
							<h3>Login</h3>
						</Header>
						<Segment>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="formGridState">
									<Form.Label>Users</Form.Label>
									{errorMessage ? (
										<p className="text-danger">{errorMessage}</p>
									) : null}

									<Form.Control
										as="select"
										ref={(id) => (this.userID = id)}
									>
										<option value="">Pick..</option>
										{userNames.map((item) => (
											<option value={item.value} key={item.value}>
												{item.label}
											</option>
										))}
									</Form.Control>
								</Form.Group>

								<Button type="submit">
									Login
								</Button>
							</Form>
							</Segment>
						</Fragment>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		userNames: Object.keys(users).map((id) => ({
			value: id,
			label: users[id].name
		}))
	};
}

export default connect(mapStateToProps)(LoginForm);
