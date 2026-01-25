import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './LazyLibrary.css';

function LazyLibrary() {
	const [loadedModules, setLoadedModules] = useState([]);
	const [bundleSize, setBundleSize] = useState(1250); // KB
	const [loadingTimes, setLoadingTimes] = useState({});
	const [splitBundles, setSplitBundles] = useState([]);
	const [routeStrategy, setRouteStrategy] = useState('eager');

	// Module loading simulation
	const loadModule = (moduleName, size) => {
		const startTime = Date.now();
		setTimeout(() => {
			const loadTime = Date.now() - startTime;
			setLoadedModules([...loadedModules, moduleName]);
			setLoadingTimes({ ...loadingTimes, [moduleName]: loadTime });
			setBundleSize(bundleSize - size);
		}, 1000 + Math.random() * 1000); // Simulate network delay
	};

	// Code splitting simulation
	const splitBundle = (bundleName, chunks) => {
		setSplitBundles([...splitBundles, { name: bundleName, chunks }]);
		// Reduce main bundle size
		const reduction = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
		setBundleSize(bundleSize - reduction);
	};

	// Apply lazy loading strategy
	const applyStrategy = (strategy) => {
		setRouteStrategy(strategy);
	};

	// Calculate performance metrics
	const calculateMetrics = () => {
		const totalLoadTime = Object.values(loadingTimes).reduce((sum, time) => sum + time, 0);
		const avgLoadTime = totalLoadTime / Object.keys(loadingTimes).length || 0;
		return {
			totalModules: loadedModules.length,
			avgLoadTime: avgLoadTime.toFixed(0),
			bundleReduction: ((1250 - bundleSize) / 1250 * 100).toFixed(1)
		};
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title='The Lazy Library'
				subtitle='Master the ancient art of code splitting and lazy loading'
				opener={`The Memory Monastery's healing rituals had transformed Aria into a guardian of application health. Brother Binary directed her next journey: "The Lazy Library holds secrets of temporal loading - how to summon code only when needed. Seek Keeper Chronos, for bundle size is the hidden enemy of performance." Aria and Binary descended from the clouds, following ancient pathways to the mystical repository of deferred knowledge.`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					loadedModules,
					loadModule,
					bundleSize,
					loadingTimes,
					splitBundles,
					splitBundle,
					routeStrategy,
					applyStrategy,
					calculateMetrics,
				}}
			/>

			<LessonFooter
				courseId='performance-optimization'
				lessonId='lazy-library'
				totalChapters={3}
			/>
		</div>
	);
}

export default LazyLibrary;