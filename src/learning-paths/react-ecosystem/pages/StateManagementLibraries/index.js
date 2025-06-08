import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
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

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<h1 className='lesson-title'>State Management Libraries</h1>
			<p className='lesson-subtitle'>
				Explore the allied kingdoms of state management
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
				lessonId='state-management-libraries'
			/>
		</div>
	);
}

export default StateManagementLibraries;