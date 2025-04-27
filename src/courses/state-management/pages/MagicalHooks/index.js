import React, { useState, useEffect, useMemo } from 'react';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './MagicalHooks.css';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';

function MagicalHooks() {
	const [currentChapter, setCurrentChapter] = useState(1);

	// State for useState hook demo in Chapter 1
	const [currentState, setCurrentState] = useState(5);

	// State for useEffect hook demo in Chapter 2
	const [effectCount, setEffectCount] = useState(0);
	const [effectDependency, setEffectDependency] = useState(false);

	// State for performance hooks demo in Chapter 3
	const [renderCount, setRenderCount] = useState(0);
	const [baseNumber, setBaseNumber] = useState(42);

	// Simulate a complex calculation with useMemo for Chapter 3 demo
	const memoizedValue = useMemo(() => {
		console.log('Computing expensive value');
		return `Computed: ${baseNumber * 2}`;
	}, [baseNumber]);

	// Toggle dependency for useEffect demo
	const toggleDependency = () => {
		setEffectDependency(!effectDependency);
	};

	// Handler for useState example in Chapter 1
	const handleStateChange = (newValue) => {
		setCurrentState(newValue);
	};

	// Force re-render for Chapter 3 demo
	const toggleRender = () => {
		setRenderCount((prev) => prev + 1);
	};

	// Effect to count renders when dependency changes
	useEffect(() => {
		if (currentChapter === 2) {
			setEffectCount((prev) => prev + 1);
		}
	}, [effectDependency, currentChapter]);

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
			<h1 className='lesson-title'>The Magical Hooks</h1>
			<p className='lesson-subtitle'>
				Master the magical powers of React hooks to enchant your
				components
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

			{/* Chapter 1: The useState Hook */}
			{currentChapter === 1 && (
				<ChapterOne
					currentState={currentState}
					handleStateChange={handleStateChange}
				/>
			)}

			{/* Chapter 2: The useEffect Hook */}
			{currentChapter === 2 && (
				<ChapterTwo
					effectCount={effectCount}
					effectDependency={effectDependency}
					toggleDependency={toggleDependency}
				/>
			)}

			{/* Chapter 3: Advanced Hooks */}
			{currentChapter === 3 && (
				<ChapterThree
					memoizedValue={memoizedValue}
					toggleRender={toggleRender}
					renderCount={renderCount}
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
				lessonId='magical-hooks'
			/>
		</div>
	);
}

export default MagicalHooks;
