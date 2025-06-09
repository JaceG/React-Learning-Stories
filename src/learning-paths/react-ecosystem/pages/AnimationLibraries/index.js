import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './AnimationLibraries.css';

function AnimationLibraries() {
	const [animationTechniques, setAnimationTechniques] = useState([]);
	const [currentDojo, setCurrentDojo] = useState(null);
	const [masteredAnimations, setMasteredAnimations] = useState([]);
	const [monasteryStage, setMonasteryStage] = useState('arrival');

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Learn technique
	const learnTechnique = (technique) => {
		if (!animationTechniques.find(t => t.id === technique.id)) {
			setAnimationTechniques([...animationTechniques, technique]);
		}
	};

	// Focus on a dojo
	const focusDojo = (dojo) => {
		setCurrentDojo(dojo);
	};

	// Master an animation
	const masterAnimation = (library, pattern) => {
		const mastery = {
			id: Date.now(),
			library,
			pattern,
			timestamp: new Date().toISOString()
		};
		setMasteredAnimations([...masteredAnimations, mastery]);
	};

	// Evolution
	const evolve = (newStage) => {
		setMonasteryStage(newStage);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Animation Libraries</h1>
			<p className='lesson-subtitle'>
				Enter the Motion Monastery and master the art of animation
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
					animationTechniques,
					learnTechnique,
					currentDojo,
					focusDojo,
					masteredAnimations,
					masterAnimation,
					monasteryStage,
					evolve
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
				courseId='react-ecosystem'
				lessonId='animation-libraries'
			/>
		</div>
	);
}

export default AnimationLibraries;