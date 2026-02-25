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
			// Don't automatically show lessons when navigating between chapters
			// Only show when explicitly clicked via handlePathClick
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
		{ id: 'full-stack-react', title: 'Full-Stack React' },
		{ id: 'accessibility', title: 'Accessibility (a11y)' },
	];

	const lessonsMap = {
		'components-basics': [
			{ id: 'component-kingdom', title: 'The Component Kingdom' },
			{ id: 'props-messengers', title: 'The Props Messengers' },
			{ id: 'jsx-magic', title: 'The JSX Magic Scrolls' },
			{ id: 'lifecycle-chronicles', title: 'The Lifecycle Chronicles' },
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
		'forms-events': [
			{ id: 'form-alchemy', title: 'Form Alchemy' },
			{ id: 'event-symphony', title: 'Event Symphony' },
			{ id: 'validation-guardians', title: 'Validation Guardians' },
			{ id: 'submission-portals', title: 'Submission Portals' },
		],
		'routing-navigation': [
			{ id: 'navigation-compass', title: 'The Navigation Compass' },
			{ id: 'guardian-gates', title: 'Guardian Gates' },
			{ id: 'waypoint-wizardry', title: 'Waypoint Wizardry' },
			{ id: 'portal-passages', title: 'Portal Passages' },
		],
		'performance-optimization': [
			{ id: 'speed-sanctum', title: 'The Speed Sanctum' },
			{ id: 'memory-monastery', title: 'Memory Monastery' },
			{ id: 'lazy-library', title: 'The Lazy Library' },
			{ id: 'virtualization-vault', title: 'Virtualization Vault' },
		],
		'testing-debugging': [
			{ id: 'testing-tower', title: 'The Testing Tower' },
			{ id: 'debug-dungeon', title: 'Debug Dungeon' },
			{ id: 'integration-inn', title: 'Integration Inn' },
			{ id: 'error-enchantments', title: 'Error Enchantments' },
		],
		'advanced-patterns': [
			{ id: 'compound-components', title: 'Compound Components' },
			{ id: 'pattern-evolution', title: 'Pattern Evolution' },
			{ id: 'advanced-composition', title: 'Advanced Composition' },
			{ id: 'refs-and-dom', title: 'Refs & DOM' },
		],
		'react-ecosystem': [
			{ id: 'state-management-libraries', title: 'State Management Libraries' },
			{ id: 'styling-solutions', title: 'Styling Solutions' },
			{ id: 'form-libraries', title: 'Form Libraries' },
			{ id: 'animation-libraries', title: 'Animation Libraries' },
		],
		'server-data': [
			{ id: 'api-integration', title: 'API Integration' },
			{ id: 'realtime-connections', title: 'Real-time Connections' },
			{ id: 'caching-castle', title: 'Caching Castle' },
			{ id: 'graphql-gateway', title: 'GraphQL Gateway' },
		],
		'typescript-react': [
			{ id: 'type-forge', title: 'Type Forge' },
			{ id: 'component-armory', title: 'Component Armory' },
			{ id: 'generic-forge', title: 'Generic Forge' },
			{ id: 'type-safe-architecture', title: 'Type-Safe Architecture' },
		],
		'build-deploy': [
			{ id: 'build-systems', title: 'Build Systems' },
			{ id: 'cicd-pipelines', title: 'CI/CD Pipelines' },
			{ id: 'hosting-and-deployment', title: 'Hosting & Deployment' },
			{ id: 'production-readiness', title: 'Production Readiness' },
		],
		'full-stack-react': [
			{ id: 'framework-foundations', title: 'Framework Foundations' },
			{ id: 'rendering-strategies', title: 'Rendering Strategies' },
			{ id: 'server-components', title: 'Server Components' },
			{ id: 'full-stack-patterns', title: 'Full-Stack Patterns' },
		],
		'accessibility': [
			{ id: 'inclusive-foundations', title: 'Inclusive Foundations' },
			{ id: 'interaction-patterns', title: 'Interaction Patterns' },
			{ id: 'visual-accessibility', title: 'Visual Accessibility' },
			{ id: 'testing-tools', title: 'Testing & Tools' },
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
