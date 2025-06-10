import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './InteractionPatterns.css';

function InteractionPatterns() {
	const [keyboardMode, setKeyboardMode] = useState(false);
	const [focusPath, setFocusPath] = useState([]);
	const [keyboardShortcuts, setKeyboardShortcuts] = useState({
		tab: false,
		enter: false,
		escape: false,
		arrows: false,
		space: false
	});
	const [screenReaderMode, setScreenReaderMode] = useState(false);
	const [announcements, setAnnouncements] = useState([]);
	const [interactionMethods, setInteractionMethods] = useState({
		mouse: true,
		keyboard: false,
		touch: false,
		voice: false,
		switch: false
	});
	const [skipLinks, setSkipLinks] = useState(false);
	const [focusIndicators, setFocusIndicators] = useState(true);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Focus management
	const addToFocusPath = (element) => {
		setFocusPath([...focusPath, element]);
	};

	const clearFocusPath = () => {
		setFocusPath([]);
	};

	// Screen reader announcements
	const addAnnouncement = (text) => {
		setAnnouncements([...announcements, { text, time: new Date() }]);
		// Clear old announcements after 5 seconds
		setTimeout(() => {
			setAnnouncements(prev => prev.filter(a => a.text !== text));
		}, 5000);
	};

	// Keyboard shortcut mastery
	const masterShortcut = (key) => {
		setKeyboardShortcuts(prev => ({
			...prev,
			[key]: true
		}));
	};

	// Interaction method enablement
	const enableInteractionMethod = (method) => {
		setInteractionMethods(prev => ({
			...prev,
			[method]: true
		}));
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>Interaction Patterns</h1>
				<p className='lesson-subtitle'>
					Master keyboard navigation, screen reader support, and universal interaction methods
				</p>
			</div>

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

			<Outlet
				context={{
					keyboardMode,
					setKeyboardMode,
					focusPath,
					addToFocusPath,
					clearFocusPath,
					keyboardShortcuts,
					masterShortcut,
					screenReaderMode,
					setScreenReaderMode,
					announcements,
					addAnnouncement,
					interactionMethods,
					enableInteractionMethod,
					skipLinks,
					setSkipLinks,
					focusIndicators,
					setFocusIndicators
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
				courseId='accessibility'
				lessonId='interaction-patterns'
			/>
		</div>
	);
}

export default InteractionPatterns;