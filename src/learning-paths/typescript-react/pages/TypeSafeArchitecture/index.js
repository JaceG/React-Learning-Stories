import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './TypeSafeArchitecture.css';

function TypeGuardTower() {
	const [guardedTypes, setGuardedTypes] = useState([]);
	const [selectedGuard, setSelectedGuard] = useState(null);
	const [towerLevel, setTowerLevel] = useState('watchman');
	const [guardStrength, setGuardStrength] = useState(0);

	// Create a new guard
	const createGuard = (guard) => {
		setGuardedTypes([...guardedTypes, guard]);
		setGuardStrength(prev => Math.min(100, prev + 15));
	};

	// Select a guard type
	const selectGuard = (guard) => {
		setSelectedGuard(guard);
	};

	// Level up the tower
	const levelUp = (newLevel) => {
		setTowerLevel(newLevel);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`The Type Guard Tower`}
				subtitle={`Bridge runtime and compile-time safety with powerful type guards`}
				opener={`The Type Guard Tower rose above the TypeScript realm, its battlements glowing with type signatures and runtime checks. Commander Guardia, the eternal sentinel, watched for type mismatches from her post atop the highest parapet. "Welcome, Aria," she called down. "Here we bridge the gap between what TypeScript knows at compile-time and what JavaScript discovers at runtime. Trust nothing—verify everything."`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					guardedTypes,
					createGuard,
					selectedGuard,
					selectGuard,
					towerLevel,
					levelUp,
					guardStrength,
					setGuardStrength
				}}
			/>

			<LessonFooter
				courseId='typescript-react'
				lessonId='type-guard-tower'
				totalChapters={3}
			/>
		</div>
	);
}

export default TypeGuardTower;
