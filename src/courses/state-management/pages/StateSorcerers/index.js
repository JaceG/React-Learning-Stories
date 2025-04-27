import React, { useState } from 'react';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './StateSorcerers.css';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';

function StateSorcerers() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [count, setCount] = useState(0);
	const [showCounterCode, setShowCounterCode] = useState(false);

	// State for form example in Chapter 2
	const [formData, setFormData] = useState({
		name: '',
		title: '',
		power: 'transformation',
	});

	// State for the enchanted items in Chapter 3
	const [items, setItems] = useState([
		{ id: 1, name: 'Scroll of Knowledge', collected: false },
		{ id: 2, name: 'Crystal of Memory', collected: false },
		{ id: 3, name: 'Quill of Truth', collected: false },
	]);

	// Handler for Counter component
	const incrementCount = () => {
		setCount(count + 1);
	};

	// Handler for form input
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handler for collecting enchanted items
	const toggleCollectItem = (itemId) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId
					? { ...item, collected: !item.collected }
					: item
			)
		);
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
			<h1 className='lesson-title'>The State Sorcerers</h1>
			<p className='lesson-subtitle'>
				Discover the magic of component memory and state transformations
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

			{/* Chapter 1: Introduction to State Magic */}
			{currentChapter === 1 && (
				<ChapterOne
					count={count}
					incrementCount={incrementCount}
					showCounterCode={showCounterCode}
					setShowCounterCode={setShowCounterCode}
				/>
			)}

			{/* Chapter 2: State Transformation */}
			{currentChapter === 2 && (
				<ChapterTwo
					formData={formData}
					handleInputChange={handleInputChange}
				/>
			)}

			{/* Chapter 3: State and Effects */}
			{currentChapter === 3 && (
				<ChapterThree
					items={items}
					toggleCollectItem={toggleCollectItem}
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
				courseId='state-management'
				lessonId='state-sorcerers'
			/>
		</div>
	);
}

export default StateSorcerers;
