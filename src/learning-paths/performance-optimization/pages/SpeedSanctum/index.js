import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './SpeedSanctum.css';

function SpeedSanctum() {
	const [selectedMetric, setSelectedMetric] = useState(null);
	const [profilerActive, setProfilerActive] = useState(false);
	const [optimizationLevel, setOptimizationLevel] = useState(0);
	const [memoizedComponents, setMemoizedComponents] = useState([]);
	const [renderCount, setRenderCount] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Performance metric handlers
	const handleMetricSelect = (metric) => {
		setSelectedMetric(metric);
	};

	// Profiler handlers
	const toggleProfiler = () => {
		setProfilerActive(!profilerActive);
	};

	// Optimization handlers
	const applyOptimization = (type) => {
		if (!memoizedComponents.includes(type)) {
			setMemoizedComponents([...memoizedComponents, type]);
			setOptimizationLevel(optimizationLevel + 1);
		}
	};

	// Render tracking
	const incrementRender = () => {
		setRenderCount(renderCount + 1);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Speed Sanctum</h1>
			<p className='lesson-subtitle'>
				Master the ancient arts of React performance optimization
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
					selectedMetric,
					handleMetricSelect,
					profilerActive,
					toggleProfiler,
					optimizationLevel,
					applyOptimization,
					memoizedComponents,
					renderCount,
					incrementRender,
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
				courseId='performance-optimization'
				lessonId='speed-sanctum'
			/>
		</div>
	);
}

export default SpeedSanctum;