import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './RefsAndDOM.css';

function PortalsRefs() {
	const [portals, setPortals] = useState([]);
	const [refs, setRefs] = useState([]);
	const [portalTarget, setPortalTarget] = useState('modal-root');
	const [focusManagement, setFocusManagement] = useState([]);
	const [imperativeHandles, setImperativeHandles] = useState([]);
	const [bridgeStrength, setBridgeStrength] = useState(0);
	const [masteryLevel, setMasteryLevel] = useState('novice');

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
			<LessonHeader
				title={`Portals & Refs`}
				subtitle={`Bridge between React's virtual world and the DOM reality`}
				opener={`The final chamber of the Architect's Academy defied physics - portals opened to different parts of the DOM tree. Portal Keeper Escapius demonstrated: "Sometimes components need to render outside their parent hierarchy." He showed how modals, tooltips, and notifications must escape container constraints while maintaining React's component structure and event propagation.`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`advanced-patterns`}
				lessonId={`portals-refs`}
				totalChapters={3}
			/>
		</div>
	);
}

export default PortalsRefs;