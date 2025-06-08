import React, { useState, Suspense, lazy } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './LazyLibrary.css';

function LazyLibrary() {
	const [loadedModules, setLoadedModules] = useState([]);
	const [bundleSize, setBundleSize] = useState(1250); // KB
	const [loadingTimes, setLoadingTimes] = useState({});
	const [splitBundles, setSplitBundles] = useState([]);
	const [routeStrategy, setRouteStrategy] = useState('eager');

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<h1 className='lesson-title'>The Lazy Library</h1>
			<p className='lesson-subtitle'>
				Master the ancient art of code splitting and lazy loading
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
				lessonId='lazy-library'
			/>
		</div>
	);
}

export default LazyLibrary;