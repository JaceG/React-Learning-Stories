import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
import '../../../CourseStyles.css';
import './ComponentArchives.css';

function ComponentArchives() {
	const [forgedComponents, setForgedComponents] = useState([]);
	const [selectedArmor, setSelectedArmor] = useState(null);
	const [armoryLevel, setArmoryLevel] = useState('apprentice');
	const [typeStrength, setTypeStrength] = useState(0);

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
			<LessonHeader
				title={`Component Armory`}
				subtitle={`Forge type-safe components with the power of TypeScript`}
				opener={`The Component Armory stood at the heart of the TypeScript realm, its blue forge-flames visible from miles away. Master Forger Typhos, the legendary component smith, welcomed Aria at the great entrance. "Here, we transform ordinary components into armored fortresses," he declared, his hammer striking sparks of type definitions. "In JavaScript, components are naked and vulnerable. In TypeScript, they become invincible."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId='typescript-react'
				lessonId='component-archives'
			/>
		</div>
	);
}

export default ComponentArchives;
