import React from 'react';
import { Link } from 'react-router-dom';
import './CourseStyles.css';

function CourseIndex() {
	const courses = [
		{
			id: 'components-basics',
			title: 'Components Basics',
			description:
				'Learn the fundamentals of React Components through engaging stories and interactive exercises.',
			lessons: 4,
			icon: '🏰', // Castle icon representing the Component Kingdom
			level: 'Beginner',
		},
		{
			id: 'state-management',
			title: 'State Management',
			description:
				'Discover how React components can remember information and change over time using State.',
			lessons: 4,
			icon: '🧙‍♂️', // Wizard icon for State "magic"
			level: 'Beginner',
		},
		{
			id: 'props-data-flow',
			title: 'Props & Data Flow',
			description:
				'Master the flow of data between components using props and callbacks.',
			lessons: 4,
			icon: '📨', // Message icon for Props as messengers
			level: 'Beginner',
		},
		{
			id: 'hooks-in-action',
			title: 'Hooks in Action',
			description:
				'Learn to use React Hooks to add advanced functionality to your components.',
			lessons: 4,
			icon: '🎣', // Fishing hook icon
			level: 'Intermediate',
		},
		{
			id: 'forms-events',
			title: 'Forms & Events',
			description:
				'Build interactive forms and handle user events in your React applications.',
			lessons: 4,
			icon: '📝', // Form icon
			level: 'Intermediate',
		},
		{
			id: 'routing-navigation',
			title: 'Routing & Navigation',
			description:
				'Navigate through React applications with routing, guards, and dynamic paths.',
			lessons: 4,
			icon: '🧭', // Compass icon
			level: 'Intermediate',
		},
		{
			id: 'performance-optimization',
			title: 'Performance & Optimization',
			description:
				'Optimize React applications for speed with memoization, lazy loading, and more.',
			lessons: 4,
			icon: '⚡', // Lightning icon
			level: 'Advanced',
		},
		{
			id: 'testing-debugging',
			title: 'Testing & Debugging',
			description:
				'Master testing strategies and debugging techniques for bulletproof React apps.',
			lessons: 4,
			icon: '🔍', // Magnifying glass icon
			level: 'Advanced',
		},
		{
			id: 'advanced-patterns',
			title: 'Advanced Patterns',
			description:
				'Learn sophisticated React patterns like compound components, render props, and HOCs.',
			lessons: 4,
			icon: '🏗️', // Building icon
			level: 'Advanced',
		},
		{
			id: 'react-ecosystem',
			title: 'React Ecosystem',
			description:
				'Explore popular libraries for state management, styling, forms, and animations.',
			lessons: 4,
			icon: '🌐', // Globe icon
			level: 'Intermediate',
		},
		{
			id: 'server-data',
			title: 'Server & Data',
			description:
				'Master data fetching, server components, and real-time updates in React.',
			lessons: 4,
			icon: '🖥️', // Server icon
			level: 'Advanced',
		},
		{
			id: 'typescript-react',
			title: 'TypeScript with React',
			description:
				'Build type-safe React applications with TypeScript for better developer experience.',
			lessons: 4,
			icon: '📘', // Blue book icon
			level: 'Intermediate',
		},
		{
			id: 'build-deploy',
			title: 'Build & Deploy',
			description:
				'Learn build optimization, environment configuration, and deployment strategies.',
			lessons: 4,
			icon: '🚀', // Rocket icon
			level: 'Intermediate',
		},
		{
			id: 'react-native',
			title: 'React Native Fundamentals',
			description:
				'Build native mobile applications for iOS and Android using React Native.',
			lessons: 4,
			icon: '📱', // Mobile phone icon
			level: 'Advanced',
		},
		{
			id: 'accessibility',
			title: 'Accessibility (a11y)',
			description:
				'Create inclusive React applications that work for users of all abilities.',
			lessons: 4,
			icon: '♿', // Accessibility icon
			level: 'Intermediate',
		},
	];

	return (
		<div className='course-catalog'>
			<h1 className='catalog-title'>React Learning Stories</h1>
			<p className='catalog-intro'>
				Welcome to React Learning Stories! Dive into the world of React
				through engaging narratives and hands-on exercises. Each course
				combines storytelling with kinesthetic learning to help you
				grasp React concepts intuitively and effectively.
			</p>

			<div className='courses-grid'>
				{courses.map((course) => (
					<div key={course.id} className='course-card'>
						<div className='course-icon'>{course.icon}</div>
						<div className='course-info'>
							<h2 className='course-title'>{course.title}</h2>
							<div className='course-meta'>
								<span className='course-level'>
									{course.level}
								</span>
								<span className='course-lessons'>
									{course.lessons} Lessons
								</span>
							</div>
							<p className='course-description'>
								{course.description}
							</p>
							<Link
								to={`/courses/${course.id}`}
								className='course-link'>
								Begin Learning
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default CourseIndex;
