import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function TypeScriptReactOverview() {
	const lessons = [
		{
			id: 'type-scriptorium',
			title: 'Type Scriptorium',
			description:
				'Enter the Great Scriptorium where code contracts are inscribed on crystalline tablets.',
			icon: '📜',
		},
		{
			id: 'component-archives',
			title: 'Component Archives',
			description:
				'Catalogue typed component manuscripts in the Archives with Archivist Lexicon.',
			icon: '📚',
		},
		{
			id: 'pattern-alcove',
			title: 'Pattern Alcove',
			description:
				'Learn to create flexible types using generics in the illuminated Pattern Alcove.',
			icon: '🔧',
		},
		{
			id: 'type-safe-architecture',
			title: 'Type-Safe Architecture',
			description:
				'Build robust type-safe architectures with advanced patterns and migration strategies.',
			icon: '🏛️',
		},
	];

	return (
		<div className='course-overview'>
			<div className='course-header'>
				<Link to='/courses' className='back-link'>
					← Back to Courses
				</Link>
				<h1 className='course-title'>TypeScript with React</h1>
				<p className='course-description'>
					Deep beneath the React Kingdom lies the Great Scriptorium,
					where Scribe Runis teaches the ancient art of inscribing
					unbreakable code contracts. Learn to transform your React
					applications with TypeScript's powerful type system, making
					impossibilities impossible and turning hope into guarantees.
				</p>
			</div>

			<div className='course-prerequisites'>
				<h3>Prerequisites</h3>
				<p>
					Before entering the Great Scriptorium, you should have
					completed:
				</p>
				<ul>
					<li>
						Components & Basics - Understanding React components
					</li>
					<li>State Management - Working with state and hooks</li>
					<li>JavaScript ES6+ features</li>
					<li>Basic programming concepts</li>
				</ul>
				<p className='prerequisite-note'>
					💡 Scribe Runis will teach TypeScript from the ground up,
					but React knowledge is essential
				</p>
			</div>

			<div className='lessons-grid'>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						to={`/courses/typescript-react/${lesson.id}`}
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
					<li>🎯 Basic type annotations and interfaces</li>
					<li>🎯Component typing with props and state</li>
					<li>🎯 Union and intersection types</li>
					<li>🎯 Conditional and mapped types</li>
					<li>🎯 Generic components and hooks</li>
					<li>🎯 Type guards and type inference</li>
					<li>🎯 Strict mode and compiler options</li>
					<li>🎯 Migration strategies from JavaScript</li>
				</ul>
			</div>
		</div>
	);
}

export default TypeScriptReactOverview;
