import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
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

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<h1 className='lesson-title'>Portal Passages</h1>
			<p className='lesson-subtitle'>
				Master advanced navigation patterns and route transitions
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
				courseId='routing-navigation'
				lessonId='portal-passages'
			/>
		</div>
	);
}

export default PortalPassages;