import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './PortalPassages.css';

function PortalPassages() {
	const [portalState, setPortalState] = useState({
		activePortal: null,
		portalHistory: [],
		transitionEffect: 'fade'
	});
	const [modalPortals, setModalPortals] = useState([]);
	const [scrollPositions, setScrollPositions] = useState({});
	const [routeAnimations, setRouteAnimations] = useState({});

	// Portal functions
	const openPortal = (portalConfig) => {
		setPortalState(prev => ({
			...prev,
			activePortal: portalConfig,
			portalHistory: [...prev.portalHistory, portalConfig]
		}));
	};

	const closePortal = () => {
		setPortalState(prev => ({
			...prev,
			activePortal: null
		}));
	};

	const createModalPortal = (modalConfig) => {
		const newModal = {
			...modalConfig,
			id: Date.now()
		};
		setModalPortals(prev => [...prev, newModal]);
		return newModal.id;
	};

	const closeModalPortal = (modalId) => {
		setModalPortals(prev => prev.filter(m => m.id !== modalId));
	};

	const saveScrollPosition = (route) => {
		setScrollPositions(prev => ({
			...prev,
			[route]: window.scrollY
		}));
	};

	const restoreScrollPosition = (route) => {
		const position = scrollPositions[route];
		if (position !== undefined) {
			window.scrollTo(0, position);
		}
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title='Portal Passages'
				subtitle='Master advanced navigation patterns and route transitions'
				opener='Marina led Aria to the Portal Passages chamber, where the most advanced navigation concepts awaited - modals, overlays, and parallel routes. Here, she would learn how React portals create parallel dimensions for UI elements that need to escape the normal DOM hierarchy.'
				totalChapters={3}
			/>

			{/* Render the current chapter */}
			<Outlet
				context={{
					portalState,
					setPortalState,
					openPortal,
					closePortal,
					modalPortals,
					createModalPortal,
					closeModalPortal,
					scrollPositions,
					saveScrollPosition,
					restoreScrollPosition,
					routeAnimations,
					setRouteAnimations
				}}
			/>

			<LessonFooter
				courseId='routing-navigation'
				lessonId='portal-passages'
				totalChapters={3}
			/>
		</div>
	);
}

export default PortalPassages;