import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './WaypointWizardry.css';

function WaypointWizardry() {
	const [activeWaypoint, setActiveWaypoint] = useState('home');
	const [waypointHistory, setWaypointHistory] = useState(['home']);
	const [customWaypoints, setCustomWaypoints] = useState([]);
	const [routeTransitions, setRouteTransitions] = useState({});
	const [masterMode, setMasterMode] = useState(false);
	const [ariaPatterns, setAriaPatterns] = useState({
		components: true,
		state: true,
		props: true,
		hooks: true,
		forms: true,
		navigation: true
	});

	// Waypoint functions
	const createWaypoint = (waypoint) => {
		setCustomWaypoints([...customWaypoints, {
			...waypoint,
			id: waypoint.name.toLowerCase().replace(/\s+/g, '-')
		}]);
	};

	const navigateToWaypoint = (waypointId) => {
		setActiveWaypoint(waypointId);
		setWaypointHistory([...waypointHistory, waypointId]);
	};

	const addRouteTransition = (fromRoute, toRoute, transition) => {
		setRouteTransitions({
			...routeTransitions,
			[`${fromRoute}->${toRoute}`]: transition
		});
	};

	return (
		<div className='lesson-container waypoint-wizardry-container'>
			<LessonHeader
				title='Waypoint Wizardry'
				subtitle='Learn advanced routing techniques and dynamic navigation patterns'
				opener='Marina led Aria to the Waypoint Sanctum - a vast chamber where glowing orbs of light traced paths through the air. Here, she would teach Aria the most advanced navigation patterns, showing how routing could become truly intelligent and adaptive.'
				totalChapters={3}
			/>

			{/* Render the current chapter */}
			<Outlet
				context={{
					activeWaypoint,
					waypointHistory,
					createWaypoint,
					navigateToWaypoint,
					customWaypoints,
					routeTransitions,
					addRouteTransition,
					masterMode,
					setMasterMode,
					ariaPatterns
				}}
			/>

			<LessonFooter
				courseId='routing-navigation'
				lessonId='waypoint-wizardry'
				totalChapters={3}
			/>
		</div>
	);
}

export default WaypointWizardry;