import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './NavigationCompass.css';

function NavigationCompass() {
	const [activeRoute, setActiveRoute] = useState('/');
	const [compassDirection, setCompassDirection] = useState(0);
	const [navigationHistory, setNavigationHistory] = useState(['/']);
	const [currentView, setCurrentView] = useState('home');
	const [masterStatus, setMasterStatus] = useState({
		components: true,
		state: true,
		props: true,
		hooks: true,
		forms: true,
		navigation: false,
	});

	// Navigation handling
	const handleNavigation = (path) => {
		setActiveRoute(path);
		setNavigationHistory([...navigationHistory, path]);

		// Update compass based on navigation
		const directions = {
			'/': 0,
			'/about': 90,
			'/products': 180,
			'/contact': 270,
		};
		setCompassDirection(directions[path] || 0);
	};

	// View switching for demo
	const switchView = (view) => {
		setCurrentView(view);
		handleNavigation(`/${view === 'home' ? '' : view}`);
	};

	// Mark navigation mastery
	const achieveMastery = () => {
		setMasterStatus({ ...masterStatus, navigation: true });
	};

	return (
		<div className='lesson-container navigation-compass-container'>
			<LessonHeader
				title='The Navigation Compass'
				subtitle='Learn navigation fundamentals from Captain Marina at the Central Citadel'
				opener={`The Central Citadel rose before Aria, its crystalline spires reaching toward the clouds. This architectural marvel served as the nexus where all quarters of the React Kingdom connected. Captain Marina awaited at the Navigation Command Center, ready to teach Aria the final fundamental skill - routing and navigation through React applications.`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					activeRoute,
					handleNavigation,
					compassDirection,
					navigationHistory,
					currentView,
					switchView,
					masterStatus,
					achieveMastery,
				}}
			/>

			<LessonFooter
				courseId='routing-navigation'
				lessonId='navigation-compass'
				totalChapters={3}
			/>
		</div>
	);
}

export default NavigationCompass;
