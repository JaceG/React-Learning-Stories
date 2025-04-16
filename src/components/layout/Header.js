import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

function Header() {
	return (
		<header className='app-header'>
			<Link to='/' className='header-logo'>
				React Learning Stories
			</Link>
			<nav className='header-nav'>
				<button className='nav-button'>Progress</button>
				<button className='nav-button'>Profile</button>
			</nav>
		</header>
	);
}

export default Header;
