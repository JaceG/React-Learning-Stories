import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './AnimationLibraries.css';

function AnimationLibraries() {
	const [animationTechniques, setAnimationTechniques] = useState([]);
	const [currentDojo, setCurrentDojo] = useState(null);
	const [masteredAnimations, setMasteredAnimations] = useState([]);
	const [monasteryStage, setMonasteryStage] = useState('arrival');

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
			<LessonHeader
				title={`Animation Libraries`}
				subtitle={`Enter the Motion Monastery and master the art of animation`}
				opener={`The Motion Monastery floated serenely above the clouds. Master Kinetic welcomed Aria: "Animation breathes life into static components. Here, you'll learn to make interfaces dance." The monastery held three dojos: CSS Transitions, React Spring, and Framer Motion. Each taught different philosophies of bringing motion to React applications.`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`react-ecosystem`}
				lessonId={`animation-libraries`}
				totalChapters={3}
			/>
		</div>
	);
}

export default AnimationLibraries;