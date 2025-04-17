import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Layout.css';

function Sidebar({ activePath, onPathChange }) {
	const location = useLocation();
	const currentPath = location.pathname;

	const learningPaths = [
		{ id: 'components-basics', title: 'Components Basics' },
		{ id: 'state-management', title: 'State Management' },
		{ id: 'props-data-flow', title: 'Props & Data Flow' },
		{ id: 'hooks-in-action', title: 'Hooks in Action' },
		{ id: 'forms-events', title: 'Forms & Events' },
	];

	// If we're in a specific course, add the course lessons submenu
	const isInComponentsBasics = currentPath.includes('components-basics');
	const isInStateManagement = currentPath.includes('state-management');

	const componentBasicsLessons = [
		{ id: 'component-kingdom', title: 'The Component Kingdom' },
		{ id: 'props-messengers', title: 'The Props Messengers' },
		{ id: 'jsx-magic', title: 'The JSX Magic Scrolls' },
		{ id: 'component-lifecycle', title: 'The Lifecycle Chronicles' },
	];

	const stateManagementLessons = [
		{ id: 'state-sorcerers', title: 'The State Sorcerers' },
		{ id: 'magical-hooks', title: 'The Magical Hooks' },
		{ id: 'grand-context', title: 'The Grand Context' },
		{
			id: 'state-management-adventures',
			title: 'State Management Adventures',
		},
	];

	return (
		<aside className='app-sidebar'>
			<h3 className='sidebar-title'>Learning Paths</h3>
			<nav className='sidebar-nav'>
				{learningPaths.map((path) => (
					<Link
						key={path.id}
						to={`/courses/${path.id}`}
						className={`sidebar-nav-item ${
							activePath === path.id ? 'active' : ''
						}`}>
						{path.title}
					</Link>
				))}
			</nav>

			{isInComponentsBasics && (
				<>
					<h3 className='sidebar-title'>Lessons</h3>
					<nav className='sidebar-nav lessons-nav'>
						{componentBasicsLessons.map((lesson) => (
							<Link
								key={lesson.id}
								to={`/courses/components-basics/${lesson.id}`}
								className={`sidebar-nav-item ${
									currentPath.includes(
										`/courses/components-basics/${lesson.id}`
									)
										? 'active'
										: ''
								}`}>
								{lesson.title}
							</Link>
						))}
					</nav>
				</>
			)}

			{isInStateManagement && (
				<>
					<h3 className='sidebar-title'>Lessons</h3>
					<nav className='sidebar-nav lessons-nav'>
						{stateManagementLessons.map((lesson) => (
							<Link
								key={lesson.id}
								to={`/courses/state-management/${lesson.id}`}
								className={`sidebar-nav-item ${
									currentPath.includes(
										`/courses/state-management/${lesson.id}`
									)
										? 'active'
										: ''
								}`}>
								{lesson.title}
							</Link>
						))}
					</nav>
				</>
			)}
		</aside>
	);
}

export default Sidebar;
