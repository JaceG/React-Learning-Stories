import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import useNarrative from '../../../../hooks/useNarrative';
import '../../../CourseStyles.css';
import './ComponentKingdom.css';

function ComponentKingdom() {
	const { narrative: lessonData } = useNarrative('components-basics', 'ComponentKingdom');
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
				opener={lessonData?.opener || ''}
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
