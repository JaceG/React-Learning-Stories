import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './StateManagementLibraries.css';

function StateManagementLibraries() {
	const [exploredKingdoms, setExploredKingdoms] = useState([]);
	const [currentKingdom, setCurrentKingdom] = useState(null);
	const [comparisonActive, setComparisonActive] = useState(false);
	const [implementedSolutions, setImplementedSolutions] = useState([]);
	const [migrationProgress, setMigrationProgress] = useState(0);
	const [diplomaticRelations, setDiplomaticRelations] = useState({});
	const [wisdomLevel, setWisdomLevel] = useState('novice');

	// Explore a state management kingdom
	const exploreKingdom = (kingdom) => {
		if (!exploredKingdoms.includes(kingdom)) {
			setExploredKingdoms([...exploredKingdoms, kingdom]);
		}
		setCurrentKingdom(kingdom);
		updateDiplomaticRelations(kingdom, 'visited');
	};

	// Implement a solution with a library
	const implementSolution = (library, solution) => {
		const implementation = {
			id: Date.now(),
			library,
			solution,
			timestamp: new Date()
		};
		setImplementedSolutions([...implementedSolutions, implementation]);
		if (implementedSolutions.length >= 3) {
			evolve('experienced');
		}
	};

	// Update diplomatic relations
	const updateDiplomaticRelations = (kingdom, status) => {
		setDiplomaticRelations({
			...diplomaticRelations,
			[kingdom]: status
		});
	};

	// Start comparison mode
	const startComparison = () => {
		setComparisonActive(true);
		if (exploredKingdoms.length >= 2) {
			evolve('diplomatic');
		}
	};

	// Simulate migration between libraries
	const simulateMigration = (from, to, progress) => {
		setMigrationProgress(progress);
		if (progress === 100) {
			updateDiplomaticRelations(to, 'allied');
		}
	};

	// Update wisdom level
	const evolve = (level) => {
		setWisdomLevel(level);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`State Management Libraries`}
				subtitle={`Explore the allied kingdoms of state management`}
				opener={`Master Aurelius summoned Aria to the Great Council Chamber. "Guide Aria, you've mastered React's internal arts. Now, we need you as an ambassador to the Allied Kingdoms - each with their own approach to state management." A magical map unfurled, showing kingdoms beyond React's borders: The Redux Empire, MobX Territory, Zustand Settlements, Recoil Regions, and the Jotai Archipelago.`}
				totalChapters={3}
			/>

			{/* Render the current chapter */}
			<Outlet
				context={{
					exploredKingdoms,
					exploreKingdom,
					currentKingdom,
					comparisonActive,
					startComparison,
					implementedSolutions,
					implementSolution,
					migrationProgress,
					simulateMigration,
					diplomaticRelations,
					updateDiplomaticRelations,
					wisdomLevel,
					evolve
				}}
			/>

			<LessonFooter
				courseId={`react-ecosystem`}
				lessonId={`state-management-libraries`}
				totalChapters={3}
			/>
		</div>
	);
}

export default StateManagementLibraries;