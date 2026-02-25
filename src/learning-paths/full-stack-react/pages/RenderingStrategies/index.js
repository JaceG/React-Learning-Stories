import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
import '../../../CourseStyles.css';
import './RenderingStrategies.css';

function NavigationTrails() {
	const [navigationStack, setNavigationStack] = useState(['Home']);
	const [activeNavigator, setActiveNavigator] = useState('stack');
	const [trailMastery, setTrailMastery] = useState('Pathfinder');
	const [routesDiscovered, setRoutesDiscovered] = useState(0);

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
			<LessonHeader
				title={`Navigation Trails`}
				subtitle={`Master mobile navigation patterns at the Navigation Outpost with Trail Guide Navigator`}
				opener={`The Navigation Outpost stood at the crossroads of the Mobile Frontier, where paths diverged in every direction. Trail Guide Navigator welcomed Aria with a knowing smile. "Forget everything you know about web URLs and browser history," he said, gesturing to a wall of interconnected trail maps. "Mobile navigation is a different beast entirely - stacks, tabs, drawers, and gestures that feel as natural as walking."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`react-native`}
				lessonId={`navigation-trails`}
				totalChapters={3}
			/>
		</div>
	);
}

export default NavigationTrails;