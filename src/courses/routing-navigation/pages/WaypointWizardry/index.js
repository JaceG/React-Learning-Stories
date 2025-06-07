import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './WaypointWizardry.css';

function WaypointWizardry() {
	const [activeWaypoint, setActiveWaypoint] = useState('home');
	const [waypointHistory, setWaypointHistory] = useState(['home']);
	const [customWaypoints, setCustomWaypoints] = useState([]);
	const [routeTransitions, setRouteTransitions] = useState({});

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
		<div className='lesson-container'>
			<h1 className='lesson-title'>Waypoint Wizardry</h1>
			<p className='lesson-subtitle'>
				Craft magical navigation waypoints and dynamic route configurations
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Render the current chapter */}
			<Outlet
				context={{
					activeWaypoint,
					waypointHistory,
					createWaypoint,
					navigateToWaypoint,
					customWaypoints,
					routeTransitions,
					addRouteTransition
				}}
			/>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='routing-navigation'
				lessonId='waypoint-wizardry'
			/>
		</div>
	);
}

export default WaypointWizardry;