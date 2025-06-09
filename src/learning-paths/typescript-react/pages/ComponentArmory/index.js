import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './ComponentArmory.css';

function ComponentArmory() {
	const [forgedComponents, setForgedComponents] = useState([]);
	const [selectedArmor, setSelectedArmor] = useState(null);
	const [armoryLevel, setArmoryLevel] = useState('apprentice');
	const [typeStrength, setTypeStrength] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Forge a new component
	const forgeComponent = (component) => {
		setForgedComponents([...forgedComponents, component]);
		setTypeStrength(prev => Math.min(100, prev + 20));
	};

	// Select armor type
	const selectArmor = (armor) => {
		setSelectedArmor(armor);
	};

	// Level up armory
	const levelUp = (newLevel) => {
		setArmoryLevel(newLevel);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Component Armory</h1>
			<p className='lesson-subtitle'>
				Forge type-safe components with the power of TypeScript
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

			<Outlet
				context={{
					forgedComponents,
					forgeComponent,
					selectedArmor,
					selectArmor,
					armoryLevel,
					levelUp,
					typeStrength,
					setTypeStrength
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
				courseId='typescript-react'
				lessonId='component-armory'
			/>
		</div>
	);
}

export default ComponentArmory;