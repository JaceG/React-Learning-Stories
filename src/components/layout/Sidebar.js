import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Layout.css';

function Sidebar({ activePath, onPathChange }) {
	const location = useLocation();
	const currentPath = location.pathname;
	const [selectedPath, setSelectedPath] = useState(null);
	const [showLessons, setShowLessons] = useState(false);
	const sidebarRef = useRef(null);

	// Update selected path when location changes
	useEffect(() => {
		const pathSegments = currentPath.split('/');
		if (pathSegments[1] === 'courses' && pathSegments[2]) {
			setSelectedPath(pathSegments[2]);
			// Check if this path has lessons
			const hasLessons = ['components-basics', 'state-management', 'props-data-flow', 'hooks-in-action'].includes(pathSegments[2]);
			if (hasLessons) {
				setShowLessons(true);
			}
		}
	}, [currentPath]);

	// Handle click outside to close lessons sidebar
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setShowLessons(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const learningPaths = [
		{ id: 'components-basics', title: 'Components Basics' },
		{ id: 'state-management', title: 'State Management' },
		{ id: 'props-data-flow', title: 'Props & Data Flow' },
		{ id: 'hooks-in-action', title: 'Hooks in Action' },
		{ id: 'forms-events', title: 'Forms & Events' },
		{ id: 'routing-navigation', title: 'Routing & Navigation' },
		{ id: 'performance-optimization', title: 'Performance & Optimization' },
		{ id: 'testing-debugging', title: 'Testing & Debugging' },
		{ id: 'advanced-patterns', title: 'Advanced Patterns' },
		{ id: 'react-ecosystem', title: 'React Ecosystem' },
		{ id: 'server-data', title: 'Server & Data' },
		{ id: 'typescript-react', title: 'TypeScript with React' },
		{ id: 'build-deploy', title: 'Build & Deploy' },
		{ id: 'react-native', title: 'React Native' },
		{ id: 'accessibility', title: 'Accessibility (a11y)' },
	];

	const lessonsMap = {
		'components-basics': [
			{ id: 'component-kingdom', title: 'The Component Kingdom' },
			{ id: 'props-messengers', title: 'The Props Messengers' },
			{ id: 'jsx-magic', title: 'The JSX Magic Scrolls' },
			{ id: 'component-lifecycle', title: 'The Lifecycle Chronicles' },
		],
		'state-management': [
			{ id: 'state-sorcerers', title: 'The State Sorcerers' },
			{ id: 'magical-hooks', title: 'The Magical Hooks' },
			{ id: 'grand-context', title: 'The Grand Context' },
			{
				id: 'state-management-adventures',
				title: 'State Management Adventures',
			},
		],
		'props-data-flow': [
			{ id: 'props-caravans', title: 'The Props Caravans' },
			{ id: 'data-rivers', title: 'The Data Rivers' },
			{ id: 'prop-forge', title: 'The Prop Forge' },
			{ id: 'event-echoes', title: 'The Event Echoes' },
		],
		'hooks-in-action': [
			{ id: 'use-state-spells', title: 'The useState Spells' },
			{ id: 'use-effect-enchantments', title: 'The useEffect Enchantments' },
			{ id: 'custom-hook-crafting', title: 'Custom Hook Crafting' },
			{ id: 'hook-pattern-mastery', title: 'Hook Pattern Mastery' },
		],
	};

	const currentLessons = lessonsMap[selectedPath] || [];

	const handlePathClick = (pathId) => {
		const hasLessons = lessonsMap[pathId] && lessonsMap[pathId].length > 0;
		if (hasLessons) {
			setShowLessons(true);
		} else {
			setShowLessons(false);
		}
	};

	return (
		<>
			{showLessons && currentLessons.length > 0 && (
				<div 
					className="sidebar-overlay" 
					onClick={() => setShowLessons(false)}
				/>
			)}
			<div ref={sidebarRef} style={{ display: 'flex' }}>
				<aside className='app-sidebar'>
					<h3 className='sidebar-title'>Learning Paths</h3>
					<nav className='sidebar-nav'>
						{learningPaths.map((path) => (
							<Link
								key={path.id}
								to={`/courses/${path.id}`}
								onClick={() => handlePathClick(path.id)}
								className={`sidebar-nav-item ${
									selectedPath === path.id ? 'active' : ''
								}`}>
								{path.title}
							</Link>
						))}
					</nav>
				</aside>

				{currentLessons.length > 0 && (
					<aside className={`lessons-sidebar ${showLessons ? 'show' : ''}`}>
						<h3 className='sidebar-title'>Lessons</h3>
						<nav className='sidebar-nav lessons-nav'>
							{currentLessons.map((lesson) => (
								<Link
									key={lesson.id}
									to={`/courses/${selectedPath}/${lesson.id}`}
									className={`sidebar-nav-item ${
										currentPath.includes(
											`/courses/${selectedPath}/${lesson.id}`
										)
											? 'active'
											: ''
									}`}>
									{lesson.title}
								</Link>
							))}
						</nav>
					</aside>
				)}
			</div>
		</>
	);
}

export default Sidebar;
