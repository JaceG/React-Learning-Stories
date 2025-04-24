import React, { useState } from 'react';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './PropsMessengers.css';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';

function PropsMessengers() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [messageBoard, setMessageBoard] = useState('');
	const [selectedComponent, setSelectedComponent] = useState(null);
	const [activeProp, setActiveProp] = useState(null);
	const [currentPropValues, setCurrentPropValues] = useState({
		buttonColor: 'blue',
		buttonText: 'Click Me',
		cardTitle: 'Welcome',
		cardContent: 'This is a card component',
	});

	// State for Chapter 3 PropTypes exercise
	const [propTypeComponent, setPropTypeComponent] = useState('button');
	const [propTypeErrors, setPropTypeErrors] = useState([]);
	const [showPropTypeErrors, setShowPropTypeErrors] = useState(false);
	const [propInputs, setPropInputs] = useState({
		color: 'blue',
		text: 'Click Me',
		onClick: '() => alert("Clicked!")',
		size: 'medium',
		isActive: true,
	});

	// State for drag and drop props exercise
	const [draggedProp, setDraggedProp] = useState(null);
	const [craftsmen, setCraftsmen] = useState([
		{
			id: 1,
			name: 'Button Craftsman',
			connected: false,
			accepts: ['color', 'text', 'action'],
		},
		{
			id: 2,
			name: 'Card Craftsman',
			connected: false,
			accepts: ['title', 'content', 'image'],
		},
		{
			id: 3,
			name: 'Navbar Craftsman',
			connected: false,
			accepts: ['menuItems', 'logo', 'theme'],
		},
	]);

	const [propBags, setPropBags] = useState([
		{ id: 1, type: 'color', content: 'red', assigned: false },
		{ id: 2, type: 'text', content: 'Click Me', assigned: false },
		{ id: 3, type: 'action', content: 'show alert', assigned: false },
		{ id: 4, type: 'title', content: 'Welcome', assigned: false },
		{ id: 5, type: 'content', content: 'This is a card', assigned: false },
		{ id: 6, type: 'image', content: 'picture.jpg', assigned: false },
		{
			id: 7,
			type: 'menuItems',
			content: ['Home', 'About'],
			assigned: false,
		},
		{ id: 8, type: 'logo', content: 'logo.png', assigned: false },
		{ id: 9, type: 'theme', content: 'dark', assigned: false },
	]);

	const handlePropDragStart = (e, propId) => {
		setDraggedProp(propId);
	};

	const handleCraftsmanDrop = (e, craftsmanId) => {
		e.preventDefault();

		if (draggedProp !== null) {
			// Find the prop and craftsman
			const prop = propBags.find((p) => p.id === draggedProp);
			const craftsman = craftsmen.find((c) => c.id === craftsmanId);

			// Check if craftsman accepts this prop type
			if (craftsman.accepts.includes(prop.type)) {
				// Mark the prop as assigned
				const updatedProps = propBags.map((p) =>
					p.id === draggedProp ? { ...p, assigned: true } : p
				);
				setPropBags(updatedProps);

				// Mark the craftsman as connected if all required props are assigned
				const requiredProps = propBags.filter((p) =>
					craftsman.accepts.includes(p.type)
				);

				const assignedCount = requiredProps.filter(
					(p) => p.assigned || p.id === draggedProp
				).length;

				if (assignedCount === craftsman.accepts.length) {
					const updatedCraftsmen = craftsmen.map((c) =>
						c.id === craftsmanId ? { ...c, connected: true } : c
					);
					setCraftsmen(updatedCraftsmen);

					// Show message
					setMessageBoard(
						`${craftsman.name} received all needed props!`
					);

					// Check if all craftsmen are connected
					if (updatedCraftsmen.every((c) => c.connected)) {
						setTimeout(() => {
							setMessageBoard(
								'All craftsmen have received their props! The Component Kingdom is thriving!'
							);
						}, 1000);
					}
				} else {
					setMessageBoard(
						`${craftsman.name} received a ${prop.type} prop!`
					);
				}
			} else {
				setMessageBoard(
					`${craftsman.name} doesn't need ${prop.type} props!`
				);
			}
		}

		setDraggedProp(null);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const resetCraftsmenAndProps = () => {
		setCraftsmen(craftsmen.map((c) => ({ ...c, connected: false })));
		setPropBags(propBags.map((p) => ({ ...p, assigned: false })));
		setMessageBoard('');
	};

	// Handle component selection in Chapter 1
	const handleComponentSelect = (component) => {
		setSelectedComponent(component);
		setActiveProp(null); // Reset active prop when selecting a new component
	};

	// Handle prop selection in Chapter 1
	const handlePropSelect = (prop) => {
		setActiveProp(prop);
	};

	// Handle prop value change in Chapter 1
	const handlePropValueChange = (propName, value) => {
		setCurrentPropValues({
			...currentPropValues,
			[propName]: value,
		});
	};

	// Chapter 3 PropTypes handlers
	const handlePropTypeComponentChange = (component) => {
		setPropTypeComponent(component);
		setShowPropTypeErrors(false);
		setPropTypeErrors([]);
	};

	const handlePropInputChange = (propName, value) => {
		setPropInputs({
			...propInputs,
			[propName]: value,
		});
	};

	const validateProps = () => {
		const newErrors = [];

		if (propTypeComponent === 'button') {
			// Validate color
			if (typeof propInputs.color !== 'string') {
				newErrors.push({
					prop: 'color',
					expected: 'string',
					received: typeof propInputs.color,
				});
			}

			// Validate text
			if (typeof propInputs.text !== 'string') {
				newErrors.push({
					prop: 'text',
					expected: 'string',
					received: typeof propInputs.text,
				});
			}

			// Validate onClick (simplified for demo)
			if (!propInputs.onClick.includes('()')) {
				newErrors.push({
					prop: 'onClick',
					expected: 'function',
					received: 'not a function',
				});
			}

			// Check for missing required props
			if (!propInputs.color) {
				newErrors.push({
					prop: 'color',
					error: 'Required prop missing',
				});
			}
			if (!propInputs.text) {
				newErrors.push({
					prop: 'text',
					error: 'Required prop missing',
				});
			}
		} else if (propTypeComponent === 'card') {
			// Validate title
			if (typeof propInputs.title !== 'string') {
				newErrors.push({
					prop: 'title',
					expected: 'string',
					received: typeof propInputs.title,
				});
			}

			// Validate content
			if (typeof propInputs.content !== 'string') {
				newErrors.push({
					prop: 'content',
					expected: 'string',
					received: typeof propInputs.content,
				});
			}
		}

		setPropTypeErrors(newErrors);
		setShowPropTypeErrors(true);
	};

	// Navigation functions
	const nextChapter = () => {
		if (currentChapter < 3) {
			setCurrentChapter(currentChapter + 1);
			setMessageBoard('');
		}
	};

	const prevChapter = () => {
		if (currentChapter > 1) {
			setCurrentChapter(currentChapter - 1);
			setMessageBoard('');
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Props Messengers</h1>
			<p className='lesson-subtitle'>
				A tale of communication between components
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

			{/* Chapter 1: Introduction to Props */}
			{currentChapter === 1 && (
				<ChapterOne
					selectedComponent={selectedComponent}
					handleComponentSelect={handleComponentSelect}
					handlePropSelect={handlePropSelect}
					activeProp={activeProp}
					handlePropValueChange={handlePropValueChange}
					currentPropValues={currentPropValues}
				/>
			)}

			{/* Chapter 2: The One-Way Road */}
			{currentChapter === 2 && (
				<ChapterTwo
					messageBoard={messageBoard}
					handlePropDragStart={handlePropDragStart}
					handleCraftsmanDrop={handleCraftsmanDrop}
					handleDragOver={handleDragOver}
					resetCraftsmenAndProps={resetCraftsmenAndProps}
					craftsmen={craftsmen}
					propBags={propBags}
				/>
			)}

			{/* Chapter 3: The Props Types Guardians */}
			{currentChapter === 3 && (
				<ChapterThree
					propTypeComponent={propTypeComponent}
					handlePropTypeComponentChange={
						handlePropTypeComponentChange
					}
					propInputs={propInputs}
					handlePropInputChange={handlePropInputChange}
					validateProps={validateProps}
					propTypeErrors={propTypeErrors}
					showPropTypeErrors={showPropTypeErrors}
				/>
			)}

			{/* Add chapter-navigation at the bottom, just above LessonNavigation */}
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
				courseId='components-basics'
				lessonId='props-messengers'
			/>
		</div>
	);
}

export default PropsMessengers;
