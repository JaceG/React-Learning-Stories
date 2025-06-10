import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './NavigationTrails.css';

function NavigationTrails() {
	const [navigationStack, setNavigationStack] = useState(['Home']);
	const [activeNavigator, setActiveNavigator] = useState('stack');
	const [trailMastery, setTrailMastery] = useState('Pathfinder');
	const [routesDiscovered, setRoutesDiscovered] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Navigation actions
	const pushScreen = (screenName) => {
		setNavigationStack([...navigationStack, screenName]);
		setRoutesDiscovered(prev => prev + 1);
	};

	const popScreen = () => {
		if (navigationStack.length > 1) {
			setNavigationStack(navigationStack.slice(0, -1));
		}
	};

	const resetStack = () => {
		setNavigationStack(['Home']);
	};

	// Switch navigation type
	const switchNavigator = (navigatorType) => {
		setActiveNavigator(navigatorType);
		setRoutesDiscovered(prev => prev + 1);
	};

	// Advance trail mastery
	const advanceTrailMastery = (newLevel) => {
		setTrailMastery(newLevel);
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>Navigation Trails</h1>
				<p className='lesson-subtitle'>
					Master mobile navigation patterns at the Navigation Outpost with Trail Guide Navigator
				</p>
			</div>

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

			<Outlet
				context={{
					navigationStack,
					pushScreen,
					popScreen,
					resetStack,
					activeNavigator,
					switchNavigator,
					trailMastery,
					advanceTrailMastery,
					routesDiscovered,
					setRoutesDiscovered
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
				courseId='react-native'
				lessonId='navigation-trails'
			/>
		</div>
	);
}

export default NavigationTrails;