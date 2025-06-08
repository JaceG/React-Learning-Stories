import React, { useState, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './PortalsRefs.css';

function PortalsRefs() {
	const [portals, setPortals] = useState([]);
	const [refs, setRefs] = useState([]);
	const [portalTarget, setPortalTarget] = useState('modal-root');
	const [focusManagement, setFocusManagement] = useState([]);
	const [imperativeHandles, setImperativeHandles] = useState([]);
	const [bridgeStrength, setBridgeStrength] = useState(0);
	const [masteryLevel, setMasteryLevel] = useState('novice');

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Create a new portal
	const createPortal = (content, target) => {
		const portal = {
			id: Date.now(),
			content,
			target,
			active: true
		};
		setPortals([...portals, portal]);
		setBridgeStrength(bridgeStrength + 15);
	};

	// Create a new ref binding
	const createRef = (type, element) => {
		const ref = {
			id: Date.now(),
			type,
			element,
			bound: true
		};
		setRefs([...refs, ref]);
	};

	// Add focus management event
	const addFocusEvent = (event) => {
		setFocusManagement([...focusManagement, { ...event, id: Date.now() }]);
	};

	// Add imperative handle
	const addImperativeHandle = (handle) => {
		setImperativeHandles([...imperativeHandles, { ...handle, id: Date.now() }]);
		if (imperativeHandles.length > 2) {
			evolve('advanced');
		}
	};

	// Close portal
	const closePortal = (id) => {
		setPortals(portals.filter(p => p.id !== id));
	};

	// Update mastery level
	const evolve = (level) => {
		setMasteryLevel(level);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Portals & Refs</h1>
			<p className='lesson-subtitle'>
				Bridge between React's virtual world and the DOM reality
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Render the current chapter */}
			<Outlet
				context={{
					portals,
					createPortal,
					closePortal,
					refs,
					createRef,
					portalTarget,
					setPortalTarget,
					focusManagement,
					addFocusEvent,
					imperativeHandles,
					addImperativeHandle,
					bridgeStrength,
					masteryLevel,
					evolve
				}}
			/>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='advanced-patterns'
				lessonId='portals-refs'
			/>
		</div>
	);
}

export default PortalsRefs;