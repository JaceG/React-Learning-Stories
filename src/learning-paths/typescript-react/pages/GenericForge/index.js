import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './GenericForge.css';

function GenericForge() {
	const [forgedGenerics, setForgedGenerics] = useState([]);
	const [selectedGeneric, setSelectedGeneric] = useState(null);
	const [forgeLevel, setForgeLevel] = useState('apprentice');
	const [genericMastery, setGenericMastery] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Forge a new generic
	const forgeGeneric = (generic) => {
		setForgedGenerics([...forgedGenerics, generic]);
		setGenericMastery(prev => Math.min(100, prev + 10));
	};

	// Select a generic pattern
	const selectGeneric = (generic) => {
		setSelectedGeneric(generic);
	};

	// Level up the forge
	const levelUp = (newLevel) => {
		setForgeLevel(newLevel);
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>The Generic Forge</h1>
				<p className='lesson-subtitle'>
					Master the art of flexible, reusable types with TypeScript generics
				</p>
			</div>

			<div className='generic-forge-status'>
				<h3>🔥 Forge Status</h3>
				<div className='forge-stats'>
					<div className='stat'>
						<span className='stat-label'>Forge Level:</span>
						<span className='stat-value'>{forgeLevel}</span>
					</div>
					<div className='stat'>
						<span className='stat-label'>Generics Forged:</span>
						<span className='stat-value'>{forgedGenerics.length}</span>
					</div>
					<div className='stat'>
						<span className='stat-label'>Mastery:</span>
						<div className='mastery-bar'>
							<div 
								className='mastery-fill'
								style={{ width: `${genericMastery}%` }}>
								{genericMastery}%
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
					forgedGenerics,
					forgeGeneric,
					selectedGeneric,
					selectGeneric,
					forgeLevel,
					levelUp,
					genericMastery,
					setGenericMastery
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
				lessonId='generic-forge'
			/>
		</div>
	);
}

export default GenericForge;