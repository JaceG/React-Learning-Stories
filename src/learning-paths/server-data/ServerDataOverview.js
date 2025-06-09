import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function ServerDataOverview() {
	const lessons = [
		{
			id: 'api-integration',
			title: 'API Integration',
			description:
				'Journey to the Cloud Citadel and master server communication, from basic fetch to advanced patterns.',
			icon: '☁️',
		},
		{
			id: 'realtime-connections',
			title: 'Real-time Connections',
			description:
				'Explore the Living Streams where WebSockets and real-time data flow continuously.',
			icon: '🌊',
		},
		{
			id: 'caching-castle',
			title: 'Caching Castle',
			description:
				'Enter the Memory Palace to master caching strategies and performance optimization.',
			icon: '🏰',
		},
		{
			id: 'graphql-gateway',
			title: 'GraphQL Gateway',
			description:
				'Discover the Query Gardens where GraphQL blooms with precise data fetching.',
			icon: '🌸',
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>
					← Back to Courses
				</Link>
				<h1 className='course-title'>Server & Data</h1>
				<p className='course-description'>
					Ascend to the Cloud Citadel where server communication
					bridges earth and sky. From basic API calls to real-time
					streams, from caching strategies to GraphQL mastery, learn
					to connect your React applications with the vast world of
					external data.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>This advanced course requires understanding of:</p>
				<ul>
					<li>Async JavaScript and Promises</li>
					<li>REST APIs and HTTP concepts</li>
					<li>React hooks and state management</li>
					<li>Basic server concepts</li>
				</ul>
				<p className='prerequisite-note'>
					💡 Recommended: Familiarity with Node.js and Express is
					helpful
				</p>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						to={`/courses/server-data/${lesson.id}`}
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
					<li>🎯 Master the Fetch API and async/await patterns</li>
					<li>🎯 Build robust error handling and retry strategies</li>
					<li>
						🎯 Implement authentication and request interceptors
					</li>
					<li>🎯 Create real-time connections with WebSockets</li>
					<li>🎯 Design efficient caching strategies</li>
					<li>🎯 Optimize performance with request deduplication</li>
					<li>🎯 Query precise data with GraphQL</li>
					<li>🎯 Manage loading states and optimistic updates</li>
				</ul>
			</div>
		</div>
	);
}

export default ServerDataOverview;
