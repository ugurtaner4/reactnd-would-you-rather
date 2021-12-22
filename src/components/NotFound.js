import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<Fragment>
			<h1 className="display4 text-center">
				<Link to="/">Page Not Found. Return</Link>
			</h1>
		</Fragment>
	);
}

export default NotFound;
