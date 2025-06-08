import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './StylingSolutions.css';

function StylingSolutions() {
	const [visitedWorkshops, setVisitedWorkshops] = useState([]);
	const [currentApproach, setCurrentApproach] = useState(null);
	const [styleDebate, setStyleDebate] = useState('neutral');
	const [implementedStyles, setImplementedStyles] = useState([]);
	const [performanceMetrics, setPerformanceMetrics] = useState({});
	const [harmonyLevel, setHarmonyLevel] = useState(0);
	const [symposiumStage, setSymposiumStage] = useState('debate');

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Visit a styling workshop
	const visitWorkshop = (workshop) => {
		if (!visitedWorkshops.includes(workshop)) {
			setVisitedWorkshops([...visitedWorkshops, workshop]);
		}
		setCurrentApproach(workshop);
		updateHarmony();
	};

	// Implement a styling solution
	const implementStyle = (approach, example) => {
		const implementation = {
			id: Date.now(),
			approach,
			example,
			timestamp: new Date()
		};
		setImplementedStyles([...implementedStyles, implementation]);
		updatePerformance(approach);
	};

	// Update performance metrics
	const updatePerformance = (approach) => {
		const metrics = {
			...performanceMetrics,
			[approach]: {
				bundleSize: Math.random() * 50 + 10,
				runtime: Math.random() * 10 + 1,
				devExperience: Math.random() * 5 + 3
			}
		};
		setPerformanceMetrics(metrics);
	};

	// Update harmony level
	const updateHarmony = () => {
		const harmony = (visitedWorkshops.length / 5) * 100;
		setHarmonyLevel(harmony);
		if (harmony >= 60) {
			evolve('diplomatic');
		}
		if (harmony === 100) {
			evolve('harmonious');
		}
	};

	// Change debate stance
	const setDebateStance = (stance) => {
		setStyleDebate(stance);
		if (stance !== 'neutral') {
			setSymposiumStage('arguments');
		}
	};

	// Progress symposium
	const evolve = (stage) => {
		setSymposiumStage(stage);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Styling Solutions</h1>
			<p className='lesson-subtitle'>
				Navigate the passionate world of React styling
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
					visitedWorkshops,
					visitWorkshop,
					currentApproach,
					styleDebate,
					setDebateStance,
					implementedStyles,
					implementStyle,
					performanceMetrics,
					harmonyLevel,
					symposiumStage,
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
				lessonId='styling-solutions'
			/>
		</div>
	);
}

export default StylingSolutions;