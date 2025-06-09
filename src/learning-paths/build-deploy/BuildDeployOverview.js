import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function BuildDeployOverview() {
	const lessons = [
		{
			id: 'build-systems',
			title: 'Build Systems',
			description:
				'Command the Deployment Armada and transform development code into production-ready vessels.',
			icon: '⚓',
		},
		{
			id: 'ci-cd-pipeline',
			title: 'CI/CD Pipeline',
			description:
				'Navigate the Automation Harbor where code flows through automated gates to production.',
			icon: '🚢',
		},
		{
			id: 'hosting-horizons',
			title: 'Hosting Horizons',
			description:
				'Explore the Platform Archipelago and choose the perfect destination for your applications.',
			icon: '🏝️',
		},
		{
			id: 'production-readiness',
			title: 'Production Readiness',
			description:
				'Prepare for battle in the Production War Room with monitoring, performance, and reliability.',
			icon: '⚔️',
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>
					← Back to Courses
				</Link>
				<h1 className='course-title'>Build & Deploy</h1>
				<p className='course-description'>
					Join Aria at the Deployment Armada Docks where applications
					prepare for their journey across the digital seas. Learn to
					command build systems, automate deployments, and navigate
					the vast Platform Archipelago to deliver your React
					creations to Production Island.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>This course covers DevOps concepts and requires:</p>
				<ul>
					<li>Experience building React applications</li>
					<li>Basic command line knowledge</li>
					<li>Understanding of npm/yarn scripts</li>
					<li>Familiarity with Git and GitHub</li>
				</ul>
				<p className='prerequisite-note'>
					💡 Recommended: Basic knowledge of web servers and hosting
				</p>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						to={`/courses/build-deploy/${lesson.id}`}
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
						🎯 Command webpack and build optimization techniques
					</li>
					<li>
						🎯 Master code splitting, tree shaking, and bundle
						analysis
					</li>
					<li>
						🎯 Build automated CI/CD pipelines with GitHub Actions
					</li>
					<li>
						🎯 Implement testing, building, and deployment
						automation
					</li>
					<li>
						🎯 Deploy to Vercel, Netlify, AWS, and edge platforms
					</li>
					<li>🎯 Configure CDNs, domains, and global distribution</li>
					<li>
						🎯 Monitor production applications with error tracking
					</li>
					<li>🎯 Achieve battle-ready performance and reliability</li>
				</ul>
			</div>
		</div>
	);
}

export default BuildDeployOverview;
