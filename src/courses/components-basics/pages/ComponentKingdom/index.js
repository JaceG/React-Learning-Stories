import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './ComponentKingdom.css';
// import ChapterOne from './chapter1/chapter1';
// import ChapterTwo from './chapter2/chapter2';
// import ChapterThree from './chapter3/chapter3';

function ComponentKingdom() {
	const [highlightedCard, setHighlightedCard] = useState(null);
	const [selectedProp, setSelectedProp] = useState(null);
	const [customLabel, setCustomLabel] = useState('');
	const [activeComponent, setActiveComponent] = useState(null);
	const [compositePreview, setCompositePreview] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
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
					highlightedCard,
					handleWorkshopHover,
					selectedProp,
					customLabel,
					setCustomLabel,
					handlePropClick,
					activeComponent,
					compositePreview,
					handleComponentClick,
					removeComponent,
				}}
			/>

			<LessonNavigation
				courseId='components-basics'
				lessonId='component-kingdom'
			/>
		</div>
	);
}

export default ComponentKingdom;
