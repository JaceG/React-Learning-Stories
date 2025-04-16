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
		},
		{
			id: 'props-messengers',
			title: 'The Props Messengers',
			description:
				'Discover how props work as messengers carrying information between components.',
		},
		{
			id: 'jsx-magic',
			title: 'The JSX Magic Scrolls',
			description:
				'Uncover the magic of JSX and how it allows components to describe their appearance.',
		},
		{
			id: 'component-lifecycle',
			title: 'The Lifecycle Chronicles',
			description:
				"Follow the journey of a component from birth to retirement and learn about React's component lifecycle.",
		},
	];

	return (
		<div className='course-overview'>
			<h1 className='course-title'>Components Basics</h1>
			<p className='course-description'>
				Welcome to the Component Kingdom! In this course, you'll learn
				the fundamentals of React Components through engaging stories
				and hands-on exercises. Each lesson combines storytelling with
				interactive activities to help you understand and retain React
				concepts in a way that's both fun and effective.
			</p>

			<div className='lesson-grid'>
				{lessons.map((lesson) => (
					<div key={lesson.id} className='lesson-card'>
						<h3 className='lesson-title'>{lesson.title}</h3>
						<p className='lesson-description'>
							{lesson.description}
						</p>
						<Link
							to={`/courses/components-basics/${lesson.id}`}
							className='lesson-link'>
							Begin Lesson
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default ComponentsBasicsOverview;
