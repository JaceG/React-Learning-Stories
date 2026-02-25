import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function FullStackReactOverview() {
	const lessons = [
		{
			id: 'framework-foundations',
			title: 'Framework Foundations',
			description:
				'Explore the foundations of full-stack React frameworks like Next.js, Remix, and their core concepts.',
			icon: '🏗️',
		},
		{
			id: 'rendering-strategies',
			title: 'Rendering Strategies',
			description:
				'Master SSR, SSG, ISR, and streaming rendering strategies for optimal performance.',
			icon: '🎨',
		},
		{
			id: 'server-components',
			title: 'Server Components',
			description:
				'Understand React Server Components and the server-client boundary for modern applications.',
			icon: '⚡',
		},
		{
			id: 'full-stack-patterns',
			title: 'Full-Stack Patterns',
			description:
				'Build complete full-stack applications with data fetching, mutations, and API patterns.',
			icon: '🔗',
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>
					← Back to Courses
				</Link>
				<h1 className='course-title'>
					Full-Stack React
				</h1>
				<p className='course-description'>
					Beyond client-side rendering lies the full-stack frontier -
					where React extends from the browser to the server. Master
					modern frameworks, rendering strategies, and server
					components to build complete, production-ready applications.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>Before diving into full-stack React, ensure you have:</p>
				<ul>
					<li>Strong React fundamentals</li>
					<li>JavaScript ES6+ proficiency</li>
					<li>Basic understanding of HTTP and APIs</li>
					<li>Familiarity with Node.js basics</li>
				</ul>
				<p className='prerequisite-note'>
					💡 Recommended: Complete the core React courses first
				</p>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						to={`/courses/full-stack-react/${lesson.id}`}
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
					<li>🎯 Full-stack React framework architecture</li>
					<li>🎯 Server-side rendering and static generation</li>
					<li>🎯 React Server Components and the RSC protocol</li>
					<li>🎯 Streaming and incremental static regeneration</li>
					<li>🎯 Server actions and data mutations</li>
					<li>🎯 API route design and data fetching patterns</li>
					<li>🎯 Caching strategies and revalidation</li>
					<li>🎯 Full-stack deployment and production optimization</li>
				</ul>
			</div>
		</div>
	);
}

export default FullStackReactOverview;
