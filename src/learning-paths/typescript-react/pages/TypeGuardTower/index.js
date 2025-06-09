import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './TypeGuardTower.css';

function TypeGuardTower() {
	const [guardedTypes, setGuardedTypes] = useState([]);
	const [selectedGuard, setSelectedGuard] = useState(null);
	const [towerLevel, setTowerLevel] = useState('watchman');
	const [guardStrength, setGuardStrength] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<div className='lesson-header'>
				<h1>The Type Guard Tower</h1>
				<p className='lesson-subtitle'>
					Bridge runtime and compile-time safety with powerful type guards
				</p>
			</div>

			<div className='tower-status'>
				<h3>🏰 Tower Status</h3>
				<div className='tower-stats'>
					<div className='stat'>
						<span className='stat-label'>Tower Level:</span>
						<span className='stat-value'>{towerLevel}</span>
					</div>
					<div className='stat'>
						<span className='stat-label'>Guards Created:</span>
						<span className='stat-value'>{guardedTypes.length}</span>
					</div>
					<div className='stat'>
						<span className='stat-label'>Defense Strength:</span>
						<div className='defense-bar'>
							<div 
								className='defense-fill'
								style={{ width: `${guardStrength}%` }}>
								{guardStrength}%
							</div>
						</div>
					</div>
				</div>
			</div>

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
				lessonId='type-guard-tower'
			/>
		</div>
	);
}

export default TypeGuardTower;