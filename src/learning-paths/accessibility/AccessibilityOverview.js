import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function AccessibilityOverview() {
	const lessons = [
		{
			id: 'inclusive-foundations',
			title: 'Inclusive Foundations',
			description:
				'Enter the Inclusive Empire and learn the core principles of accessibility with Empress Inclusiva.',
			icon: '🏛️',
		},
		{
			id: 'interaction-patterns',
			title: 'Interaction Patterns',
			description:
				'Master keyboard navigation, screen reader support, and universal interaction methods.',
			icon: '⌨️',
		},
		{
			id: 'visual-accessibility',
			title: 'Visual Accessibility',
			description:
				'Explore color, contrast, and motion considerations in the Color Conservatory.',
			icon: '🎨',
		},
		{
			id: 'testing-tools',
			title: 'Testing & Tools',
			description:
				'Learn accessibility testing, compliance standards, and build an inclusive development culture.',
			icon: '🛠️',
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>
					← Back to Courses
				</Link>
				<h1 className='course-title'>Accessibility (a11y)</h1>
				<p className='course-description'>
					At the heart of the digital realm stands the Inclusive
					Empire - not a separate kingdom, but a philosophy that
					touches every corner of the React world. Join Empress
					Inclusiva and the Guardians of Inclusion to learn how true
					mastery means building for everyone.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>This course focuses on inclusive design and requires:</p>
				<ul>
					<li>Solid React component knowledge</li>
					<li>HTML semantic elements understanding</li>
					<li>Basic CSS knowledge</li>
					<li>Empathy and commitment to inclusion</li>
				</ul>
				<p className='prerequisite-note'>
					💡 Recommended: Install a screen reader for testing
				</p>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						to={`/courses/accessibility/${lesson.id}`}
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
					<li>🎯 WCAG guidelines and compliance</li>
					<li>🎯 Semantic HTML in React</li>
					<li>🎯 ARIA best practices</li>
					<li>🎯 Focus management techniques</li>
					<li>🎯 Keyboard navigation patterns</li>
					<li>🎯 Screen reader testing</li>
					<li>🎯 Color contrast and visual design</li>
					<li>🎯 Accessibility testing tools</li>
				</ul>
			</div>
		</div>
	);
}

export default AccessibilityOverview;
