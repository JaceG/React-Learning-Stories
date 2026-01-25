import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
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
			<LessonHeader
				title='The Component Kingdom'
				subtitle='A story about the fundamental building blocks of React'
				opener='Welcome to the React Kingdom! Aria, a young apprentice, has arrived at the gates of the Component Workshop District. Here she will learn the fundamental art of building components - the magical building blocks that make up every React application.'
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId='components-basics'
				lessonId='component-kingdom'
				totalChapters={3}
			/>
		</div>
	);
}

export default ComponentKingdom;
