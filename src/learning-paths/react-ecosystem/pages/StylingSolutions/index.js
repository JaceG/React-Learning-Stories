import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
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
			<LessonHeader
				title={`Styling Solutions`}
				subtitle={`Navigate the passionate world of React styling`}
				opener={`The Great Style Symposium convened, where representatives from different styling philosophies gathered. Moderator Stylus welcomed Aria: "Ambassador, the styling kingdoms are... passionate about their approaches." Representatives argued loudly about CSS-in-JS, CSS Modules, Utility-First, and Styled Components. Each approach optimizes for different values - developer experience, performance, or maintainability.`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`react-ecosystem`}
				lessonId={`styling-solutions`}
				totalChapters={3}
			/>
		</div>
	);
}

export default StylingSolutions;