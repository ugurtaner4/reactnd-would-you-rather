import { Link, NavLink } from 'react-router-dom';
import React, { Fragment } from 'react';

import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { reSetAuthedUser } from '../actions/authedUser';

function NavigationBar(props) {
	const { user, dispatch } = props;

	const handleLogout = () => {
		dispatch(reSetAuthedUser());
	};

	return (
		<Fragment>
			<Navbar expand="lg" bg="dark" variant="dark" className="my-3 border">
				<Navbar.Brand as={Link} to="/">
					<h2>
						<small>Whould You Rather</small>
					</h2>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={NavLink} to="/" exact>
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/add">
							Add Question
						</Nav.Link>
						<Nav.Link as={NavLink} to="/leaderboard">
							LeaderBoard
						</Nav.Link>
					</Nav>
					<Nav className="align-items-start">
						<Navbar.Text>{user.name}</Navbar.Text>
						<Avatar avatarURL={user.avatarURL} className="mx-3" />
						<Button
							variant="outline-dark"
							onClick={handleLogout}
							className="mt-3 mt-lg-0"
						>
							Logout
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);
}

function mapStateToProps({ users, authedUser }) {
	return {
		user: users[authedUser]
	};
}

export default connect(mapStateToProps)(NavigationBar);
