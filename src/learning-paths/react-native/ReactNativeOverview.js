import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function ReactNativeOverview() {
	const lessons = [
		{
			id: 'mobile-foundations',
			title: 'Mobile Foundations',
			description:
				'Cross the border to the Mobile Frontier and adapt React knowledge to native components and styling.',
			icon: '🏔️',
		},
		{
			id: 'navigation-trails',
			title: 'Navigation Trails',
			description:
				'Master mobile navigation patterns with stacks, tabs, and drawers at the Navigation Outpost.',
			icon: '🧭',
		},
		{
			id: 'native-powers',
			title: 'Native Powers',
			description:
				'Access device capabilities responsibly at the Device Sanctuary with cameras, sensors, and permissions.',
			icon: '⚡',
		},
		{
			id: 'app-distribution',
			title: 'App Distribution',
			description:
				'Navigate the Publishing Port to launch your apps on the App Store and Google Play.',
			icon: '🚀',
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>
					← Back to Courses
				</Link>
				<h1 className='course-title'>
					React Native - The Mobile Frontier
				</h1>
				<p className='course-description'>
					Beyond the Web Kingdom's borders lies the Mobile Frontier -
					a vast territory where applications live not in browsers but
					in the devices people carry. Join Frontier Marshal Native to
					adapt your React knowledge for native iOS and Android
					development.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>Before starting mobile development, ensure you have:</p>
				<ul>
					<li>Strong React fundamentals</li>
					<li>JavaScript ES6+ proficiency</li>
					<li>Basic understanding of mobile app concepts</li>
					<li>
						Development environment setup (Xcode/Android Studio)
					</li>
				</ul>
				<p className='prerequisite-note'>
					💡 Recommended: Complete all React web courses first
				</p>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						to={`/courses/react-native/${lesson.id}`}
						className='lesson-card'>
						<div className='lesson-icon'>{lesson.icon}</div>
						<h3 className='lesson-title'>{lesson.title}</h3>
						<p className='lesson-description'>
							{lesson.description}
						</p>
						<div className='lesson-progress'>
							<span>3 chapters</span>
							<span className='progress-indicator'>
								Start Learning
							</span>
						</div>
					</Link>
				))}
			</div>

			<div className='learning-objectives'>
				<h3>What You'll Learn</h3>
				<ul>
					<li>
						🎯 Core React Native components and their web
						equivalents
					</li>
					<li>🎯 StyleSheet API and Flexbox-everywhere approach</li>
					<li>🎯 Stack, tab, and drawer navigation patterns</li>
					<li>🎯 Platform-specific code for iOS and Android</li>
					<li>
						🎯 Device capabilities: camera, location, and sensors
					</li>
					<li>🎯 Permission handling and user privacy</li>
					<li>🎯 App signing and store submission process</li>
					<li>🎯 Global app distribution strategies</li>
				</ul>
			</div>
		</div>
	);
}

export default ReactNativeOverview;
