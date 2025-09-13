import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function RoutingNavigationOverview() {
	const lessons = [
		{
			id: 'navigation-compass',
			title: 'The Navigation Compass',
			description:
				'Learn navigation fundamentals from Captain Marina at the Central Citadel.',
			icon: '🧭',
		},
		{
			id: 'guardian-gates',
			title: 'Guardian Gates',
			description:
				"Master route protection and security patterns with Marina's guidance.",
			icon: '🚪',
		},
		{
			id: 'waypoint-wizardry',
			title: 'Waypoint Wizardry',
			description:
				'Discover advanced routing techniques and dynamic navigation patterns.',
			icon: '🗺️',
		},
		{
			id: 'portal-passages',
			title: 'Portal Passages',
			description:
				'Complete your routing education and prepare for the next phase of your journey.',
			icon: '🌌',
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>
					← Back to Courses
				</Link>
				<h1 className='course-title'>Routing & Navigation</h1>
				<p className='course-description'>
					Fresh from her Forms & Events victories, Aria arrives at the
					Central Citadel where all paths converge. Captain Marina,
					master navigator of React Kingdom, awaits to teach her the
					final fundamental skill - routing and navigation. Here, Aria
					will learn how to guide users through complex applications,
					applying her accumulated knowledge to understand navigation
					patterns. This is where her foundational education reaches
					completion before she ventures into specialized domains.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>
					Complete Aria's journey to reach this next learning phase:
				</p>
				<ul>
					<li>Components Basics - Foundation of understanding</li>
					<li>State Management - Memory and reactivity mastery</li>
					<li>Props & Data Flow - Communication expertise</li>
					<li>Hooks in Action - Advanced pattern craftsmanship</li>
					<li>Forms & Events - User interaction architecture</li>
				</ul>
				<p className='prerequisite-note'>
					💡 Aria's Journey: This is Part 6 of her adventures.
					Complete{' '}
					<Link
						to='/courses/forms-events'
						className='prerequisite-link'>
						Forms & Events
					</Link>{' '}
					first
				</p>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						to={`/courses/routing-navigation/${lesson.id}`}
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
						🎯 React Router fundamentals and component integration
					</li>
					<li>🎯 Route state management using hook patterns</li>
					<li>
						🎯 Protected routes with authentication and validation
					</li>
					<li>🎯 Dynamic routing and navigation patterns</li>
					<li>
						🎯 Advanced navigation techniques with Marina's guidance
					</li>
					<li>🎯 URL management and browser history</li>
					<li>🎯 Nested routing and layout patterns</li>
					<li>
						🎯 Applying all React knowledge to navigation systems
					</li>
				</ul>
			</div>
		</div>
	);
}

export default RoutingNavigationOverview;
