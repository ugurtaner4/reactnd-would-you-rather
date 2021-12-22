import Image from 'react-bootstrap/Image';
import React from 'react';

function Avatar(props) {
	return (
		<Image
			src={props.avatarURL}
			roundedCircle
			fluid
			width="50"
			height="50"
			className={props.className}
			alt="user avatar"
		/>
	);
}

export default Avatar;
