import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
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
			<LessonHeader
				title={`Interaction Patterns`}
				subtitle={`Master keyboard navigation, screen reader support, and universal interaction methods`}
				opener={`Beyond the visual layers of the Accessibility Realm lay the Keyboard Kingdom, where Guardian Keyboard maintained order for all who navigated without mice. "Many users can't or won't use pointing devices," Guardian Keyboard explained as Aria arrived at the towering gates. "Your applications must open their doors to every form of input - keyboard, voice, switch, and touch alike."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`accessibility`}
				lessonId={`interaction-patterns`}
				totalChapters={3}
			/>
		</div>
	);
}

export default InteractionPatterns;
