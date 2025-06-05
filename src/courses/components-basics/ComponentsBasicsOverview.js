import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function ComponentsBasicsOverview() {
	const lessons = [
		{
			id: 'component-kingdom',
			title: 'The Component Kingdom',
			description:
				'Learn about React components through the story of a magical kingdom where each component is a specialized craftsman.',
			icon: '🏰'
		},
		{
			id: 'props-messengers',
			title: 'The Props Messengers',
			description:
				'Discover how props work as messengers carrying information between components.',
			icon: '📨'
		},
		{
			id: 'jsx-magic',
			title: 'The JSX Magic Scrolls',
			description:
				'Uncover the magic of JSX and how it allows components to describe their appearance.',
			icon: '📜'
		},
		{
			id: 'component-lifecycle',
			title: 'The Lifecycle Chronicles',
			description:
				"Follow the journey of a component from birth to retirement and learn about React's component lifecycle.",
			icon: '🔄'
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>← Back to Courses</Link>
				<h1 className='course-title'>Components Basics</h1>
				<p className='course-description'>
					Welcome to the Component Kingdom! In this course, you'll learn
					the fundamentals of React Components through engaging stories
					and hands-on exercises. Each lesson combines storytelling with
					interactive activities to help you understand and retain React
					concepts in a way that's both fun and effective.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>
					This is a beginner-friendly course! To get the most out of it, you should have:
				</p>
				<ul>
					<li>Basic knowledge of HTML and CSS</li>
					<li>Fundamental understanding of JavaScript</li>
					<li>Familiarity with functions and objects in JavaScript</li>
					<li>A curious mind ready to explore React!</li>
				</ul>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link 
						key={lesson.id} 
						to={`/courses/components-basics/${lesson.id}`} 
						className='lesson-card'
					>
						<div className='lesson-icon'>{lesson.icon}</div>
						<h3 className='lesson-title'>{lesson.title}</h3>
						<p className='lesson-description'>{lesson.description}</p>
						<div className='lesson-progress'>
							<span>3 chapters</span>
							<span className='progress-indicator'>Start Learning</span>
						</div>
					</Link>
				))}
			</div>

			<div className='learning-objectives'>
				<h3>What You'll Learn</h3>
				<ul>
					<li>🎯 What React components are and why they're powerful</li>
					<li>🎯 How to create functional components</li>
					<li>🎯 Understanding props and how to pass data</li>
					<li>🎯 Writing JSX and understanding its syntax</li>
					<li>🎯 Component composition and reusability</li>
					<li>🎯 React component lifecycle basics</li>
					<li>🎯 Best practices for component structure</li>
					<li>🎯 Debugging components effectively</li>
				</ul>
			</div>
		</div>
	);
}

export default ComponentsBasicsOverview;
