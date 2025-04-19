import React, { useState } from 'react';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './ComponentKingdom.css';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';

function ComponentKingdom() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [highlightedCard, setHighlightedCard] = useState(null);
	const [selectedProp, setSelectedProp] = useState(null);
	const [customLabel, setCustomLabel] = useState('');
	const [activeComponent, setActiveComponent] = useState(null);
	const [compositePreview, setCompositePreview] = useState([]);

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

	// Hover effects for workshop cards
	const handleWorkshopHover = (index) => {
		setHighlightedCard(index);
	};

	// Props handling for Chapter 2
	const handlePropClick = (name, value) => {
		setSelectedProp({ name, value });
	};

	// Component composition handling for Chapter 3
	const handleComponentClick = (component) => {
		setActiveComponent(component);

		// Add component to the preview if it's not already there
		if (!compositePreview.includes(component)) {
			setCompositePreview([...compositePreview, component]);
		}
	};

	const removeComponent = (component) => {
		setCompositePreview(
			compositePreview.filter((item) => item !== component)
		);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Component Kingdom</h1>
			<p className='lesson-subtitle'>
				A story about the fundamental building blocks of React
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

			{/* Chapter 1: Introduction to Components */}
			{currentChapter === 1 && (
				<ChapterOne
					handleWorkshopHover={handleWorkshopHover}
					highlightedCard={highlightedCard}
				/>
			)}

			{/* Chapter 2: Component Props */}
			{currentChapter === 2 && (
				<ChapterTwo
					selectedProp={selectedProp}
					customLabel={customLabel}
					setCustomLabel={setCustomLabel}
					handlePropClick={handlePropClick}
				/>
			)}

			{/* Chapter 3: Component Composition */}
			{currentChapter === 3 && (
				<ChapterThree
					activeComponent={activeComponent}
					compositePreview={compositePreview}
					handleComponentClick={handleComponentClick}
					removeComponent={removeComponent}
				/>
			)}

			<LessonNavigation
				courseId='components-basics'
				lessonId='component-kingdom'
			/>
		</div>
	);
}

export default ComponentKingdom;
