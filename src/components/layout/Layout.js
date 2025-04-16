import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout({ children, activePath, onPathChange }) {
	const location = useLocation();
	const navigate = useNavigate();

	// Determine if we're on a course page to show sidebar
	const showSidebar = location.pathname.includes('/courses/');

	// Extract the course ID from the URL if in a course
	const courseId = showSidebar ? location.pathname.split('/')[2] : '';

	// Handle navigation when sidebar item is clicked
	const handlePathChange = (path) => {
		onPathChange(path);
		navigate(`/courses/${path}`);
	};

	return (
		<div className='app-container'>
			<Header />
			<div className='app-content'>
				{showSidebar && (
					<Sidebar
						activePath={courseId || activePath}
						onPathChange={handlePathChange}
					/>
				)}
				<main
					className={`main-content ${
						!showSidebar ? 'full-width' : ''
					}`}>
					{children}
				</main>
			</div>
		</div>
	);
}

export default Layout;
