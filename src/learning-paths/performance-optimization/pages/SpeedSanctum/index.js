import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './SpeedSanctum.css';

function SpeedSanctum() {
	const [selectedMetric, setSelectedMetric] = useState(null);
	const [profilerActive, setProfilerActive] = useState(false);
	const [optimizationLevel, setOptimizationLevel] = useState(0);
	const [memoizedComponents, setMemoizedComponents] = useState([]);
	const [renderCount, setRenderCount] = useState(0);

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
			<LessonHeader
				title='The Speed Sanctum'
				subtitle='Master the ancient arts of React performance optimization'
				opener='With her mastery of forms and events complete, Aria received an urgent summons from the Northern Mountains. Applications throughout the React Kingdom were slowing to a crawl, and only the ancient optimization techniques of the Speed Sanctum could save them. Binary&apos;s sensors detected performance anomalies everywhere as they ascended the mountain path toward the legendary sanctuary.'
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId='performance-optimization'
				lessonId='speed-sanctum'
				totalChapters={3}
			/>
		</div>
	);
}

export default SpeedSanctum;