import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './MemoryMonastery.css';

function MemoryMonastery() {
	const [memoryLeaks, setMemoryLeaks] = useState([]);
	const [heapSnapshot, setHeapSnapshot] = useState(null);
	const [gcActivity, setGcActivity] = useState([]);
	const [retainedSize, setRetainedSize] = useState(0);
	const [memoryOptimizations, setMemoryOptimizations] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Memory leak detection
	const detectMemoryLeak = (component, size) => {
		setMemoryLeaks([...memoryLeaks, { component, size, timestamp: Date.now() }]);
		setRetainedSize(retainedSize + size);
	};

	// Clean up memory leak
	const cleanupLeak = (component) => {
		const leak = memoryLeaks.find(l => l.component === component);
		if (leak) {
			setRetainedSize(retainedSize - leak.size);
			setMemoryLeaks(memoryLeaks.filter(l => l.component !== component));
		}
	};

	// Heap snapshot simulation
	const takeSnapshot = () => {
		setHeapSnapshot({
			timestamp: Date.now(),
			totalSize: retainedSize + 45000, // Base memory + retained
			objects: [
				{ type: 'Component', count: 42, size: 12000 },
				{ type: 'Closure', count: 156, size: 8000 },
				{ type: 'EventListener', count: 89, size: 5000 },
				{ type: 'DOMNode', count: 234, size: retainedSize }
			]
		});
	};

	// GC activity tracking
	const triggerGC = () => {
		const freedMemory = Math.floor(retainedSize * 0.3);
		setGcActivity([...gcActivity, {
			timestamp: Date.now(),
			freed: freedMemory,
			before: retainedSize,
			after: retainedSize - freedMemory
		}]);
		setRetainedSize(retainedSize - freedMemory);
	};

	// Apply memory optimization
	const applyOptimization = (technique) => {
		if (!memoryOptimizations.includes(technique)) {
			setMemoryOptimizations([...memoryOptimizations, technique]);
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Memory Monastery</h1>
			<p className='lesson-subtitle'>
				Master the sacred arts of memory management and prevent the dreaded leaks
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
					memoryLeaks,
					detectMemoryLeak,
					cleanupLeak,
					heapSnapshot,
					takeSnapshot,
					gcActivity,
					triggerGC,
					retainedSize,
					memoryOptimizations,
					applyOptimization,
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
				lessonId='memory-monastery'
			/>
		</div>
	);
}

export default MemoryMonastery;