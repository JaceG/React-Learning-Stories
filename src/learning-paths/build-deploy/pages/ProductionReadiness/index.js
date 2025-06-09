import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './ProductionReadiness.css';

function ProductionReadiness() {
	const [battleReadiness, setBattleReadiness] = useState(0);
	const [monitoringSystems, setMonitoringSystems] = useState([]);
	const [commanderRank, setCommanderRank] = useState('Recruit');
	const [productionMetrics, setProductionMetrics] = useState({
		uptime: 95,
		errorRate: 5,
		performance: 70,
		userSatisfaction: 80
	});

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Add monitoring system
	const addMonitoringSystem = (system) => {
		if (!monitoringSystems.find(s => s.id === system.id)) {
			setMonitoringSystems([...monitoringSystems, system]);
			setBattleReadiness(prev => Math.min(100, prev + 20));
		}
	};

	// Improve production metrics
	const improveMetric = (metric, value) => {
		setProductionMetrics(prev => ({
			...prev,
			[metric]: Math.min(100, prev[metric] + value)
		}));
	};

	// Promote rank
	const promoteRank = (newRank) => {
		setCommanderRank(newRank);
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>Production Readiness</h1>
				<p className='lesson-subtitle'>
					Prepare for battle in the Production War Room with monitoring, performance, and reliability
				</p>
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
					battleReadiness,
					setBattleReadiness,
					monitoringSystems,
					addMonitoringSystem,
					commanderRank,
					promoteRank,
					productionMetrics,
					improveMetric
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
				courseId='build-deploy'
				lessonId='production-readiness'
			/>
		</div>
	);
}

export default ProductionReadiness;