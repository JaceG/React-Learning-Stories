import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './MemoryMonastery.css';

function MemoryMonastery() {
	const [memoryLeaks, setMemoryLeaks] = useState([]);
	const [heapSnapshot, setHeapSnapshot] = useState(null);
	const [gcActivity, setGcActivity] = useState([]);
	const [retainedSize, setRetainedSize] = useState(0);
	const [memoryOptimizations, setMemoryOptimizations] = useState([]);

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
			<LessonHeader
				title='Memory Monastery'
				subtitle='Master the sacred arts of memory management and prevent the dreaded leaks'
				opener={`Having defeated the Lag Monster at the Speed Sanctum, Aria thought her performance journey was complete. But Master Velocity's parting words echoed in her mind: "Speed is only half the battle. Seek Brother Binary at the Memory Monastery - for even the fastest application will fall if it bleeds memory." The floating monastery appeared through the clouds, its ancient walls humming with the whispers of forgotten allocations.`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId='performance-optimization'
				lessonId='memory-monastery'
				totalChapters={3}
			/>
		</div>
	);
}

export default MemoryMonastery;