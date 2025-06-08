import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function TestingDebuggingOverview() {
	const lessons = [
		{
			id: 'testing-tower',
			title: 'The Testing Tower',
			description:
				'Build a fortress of tests with React Testing Library fundamentals.',
			icon: '🏗️',
		},
		{
			id: 'debug-dungeon',
			title: 'Debug Dungeon',
			description:
				'Navigate the dark passages of bugs with React DevTools and debugging strategies.',
			icon: '🔍',
		},
		{
			id: 'integration-inn',
			title: 'Integration Inn',
			description:
				'Connect component tests together for comprehensive integration testing.',
			icon: '🔗',
		},
		{
			id: 'error-enchantments',
			title: 'Error Enchantments',
			description:
				'Cast protective spells with error boundaries and error handling patterns.',
			icon: '🛡️',
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>
					← Back to Courses
				</Link>
				<h1 className='course-title'>Testing & Debugging</h1>
				<p className='course-description'>
					Descend into the Debugging Depths where bugs hide in shadows
					and tests illuminate the path to perfection. Master the
					tools and techniques that ensure your React applications
					work flawlessly in the face of any challenge.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>
					Before facing the debugging challenges, ensure you
					understand:
				</p>
				<ul>
					<li>React component structure</li>
					<li>Props, state, and hooks</li>
					<li>Basic JavaScript testing concepts</li>
					<li>Async JavaScript operations</li>
				</ul>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						to={`/courses/testing-debugging/${lesson.id}`}
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
					<li>🎯 React Testing Library setup</li>
					<li>🎯 Component unit testing</li>
					<li>🎯 Testing hooks and custom hooks</li>
					<li>🎯 Integration testing strategies</li>
					<li>🎯 React DevTools mastery</li>
					<li>🎯 Console debugging techniques</li>
					<li>🎯 Error boundaries implementation</li>
					<li>🎯 Test-driven development in React</li>
				</ul>
			</div>
		</div>
	);
}

export default TestingDebuggingOverview;
