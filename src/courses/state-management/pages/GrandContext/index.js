import React, { useState, useMemo } from 'react';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './GrandContext.css';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';

function GrandContext() {
	const [currentChapter, setCurrentChapter] = useState(1);

	// State for theme context demo in Chapter 1
	const [theme, setTheme] = useState('light');

	// State for user context demo in Chapter 2
	const [user, setUser] = useState(null);

	// State for optimization demos in Chapter 3
	const [consumerCount, setConsumerCount] = useState(0);
	const [optimizationEnabled, setOptimizationEnabled] = useState(false);

	// Toggle theme for Chapter 1 demo
	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	// Login/logout functions for Chapter 2 demo
	const login = (username, role) => {
		setUser({ username, role });
	};

	const logout = () => {
		setUser(null);
	};

	// Toggle consumers for Chapter 3 demo
	const toggleConsumer = () => {
		setConsumerCount((count) => (count === 0 ? 3 : 0));
	};

	// Toggle optimization for Chapter 3 demo
	const toggleOptimization = () => {
		setOptimizationEnabled(!optimizationEnabled);
	};

	// Navigation functions
	const nextChapter = () => {
		if (currentChapter < 3) {
			setCurrentChapter(currentChapter + 1);
		}
	};

	const prevChapter = () => {
		if (currentChapter > 1) {
			setCurrentChapter(currentChapter - 1);
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Grand Context</h1>
			<p className='lesson-subtitle'>
				Learn the art of sharing state across the component kingdom
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Chapter 1: Introduction to Context */}
			{currentChapter === 1 && (
				<ChapterOne theme={theme} toggleTheme={toggleTheme} />
			)}

			{/* Chapter 2: Custom Context Providers */}
			{currentChapter === 2 && (
				<ChapterTwo user={user} login={login} logout={logout} />
			)}

			{/* Chapter 3: Context Optimization */}
			{currentChapter === 3 && (
				<ChapterThree
					consumerCount={consumerCount}
					toggleConsumer={toggleConsumer}
					optimizationEnabled={optimizationEnabled}
					toggleOptimization={toggleOptimization}
				/>
			)}

			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='state-management'
				lessonId='grand-context'
			/>
		</div>
	);
}

export default GrandContext;
