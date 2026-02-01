import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const {
		heapSnapshot,
		takeSnapshot,
		gcActivity,
		triggerGC,
		retainedSize,
		memoryOptimizations,
		applyOptimization,
	} = useOutletContext();

	const [devToolsOpen, setDevToolsOpen] = useState(false);
	const [selectedTab, setSelectedTab] = useState('memory');
	const [profiling, setProfiling] = useState(false);
	const [memoryTimeline, setMemoryTimeline] = useState([]);
	const intervalRef = useRef(null);

	// Simulate memory profiling
	useEffect(() => {
		if (profiling) {
			intervalRef.current = setInterval(() => {
				setMemoryTimeline((prev) => [
					...prev,
					{
						time: Date.now(),
						heap: retainedSize + Math.random() * 5000,
					},
				]);
			}, 1000);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		}
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [profiling, retainedSize]);

	const devToolsTabs = [
		{ id: 'memory', label: 'Memory', icon: '🧠' },
		{ id: 'performance', label: 'Performance', icon: '⚡' },
		{ id: 'profiler', label: 'Profiler', icon: '📊' },
	];

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title='The Sacred Tools of Memory'
				bridge='Brother Binary led Aria deeper into the monastery to a chamber filled with glowing diagnostic instruments. "To heal the Memory Plague, you must first learn to see it. These are our sacred tools - the Chrome DevTools Memory Profiler."'
			/>

			<StorySection
				paragraphs={[
					<>
						Brother Binary led <strong>Aria</strong> deeper into the
						monastery to a chamber filled with glowing instruments.
						"To heal the Memory Plague, you must master our sacred
						tools - the{' '}
						<strong>Chrome DevTools Memory Profiler</strong>."
					</>,
					<>
						He activated a mystical viewing portal that revealed the
						inner workings of memory. "This is how we see what
						others cannot - the hidden allocations, the retained
						objects, the paths that prevent garbage collection."
					</>,
					<>
						"Three sacred techniques will serve you well," he
						continued. "<strong>Heap Snapshots</strong> to see
						memory at a moment in time,{' '}
						<strong>Allocation Timeline</strong> to track growth
						over time, and{' '}
						<strong>Manual Garbage Collection</strong> to force
						cleanup."
					</>,
				]}
			/>

			<div className='monastery-chamber'>
				<h3>The Memory Observatory</h3>
				<button
					className='demo-button'
					onClick={() => setDevToolsOpen(!devToolsOpen)}>
					{devToolsOpen ? 'Close' : 'Open'} Sacred DevTools
				</button>
			</div>

			{devToolsOpen && (
				<div className='interactive-section'>
					<h3 className='section-title'>
						Chrome DevTools Memory Profiler (Simulated)
					</h3>

					<div
						className='memory-leak-detector'
						style={{ minHeight: '400px' }}>
						<div
							style={{
								display: 'flex',
								borderBottom: '1px solid #374151',
								marginBottom: '20px',
							}}>
							{devToolsTabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setSelectedTab(tab.id)}
									style={{
										background:
											selectedTab === tab.id
												? '#1f2937'
												: 'transparent',
										color:
											selectedTab === tab.id
												? '#10b981'
												: '#9ca3af',
										border: 'none',
										padding: '10px 20px',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										gap: '5px',
									}}>
									<span>{tab.icon}</span>
									{tab.label}
								</button>
							))}
						</div>

						{selectedTab === 'memory' && (
							<div>
								<div style={{ marginBottom: '20px' }}>
									<button
										className='demo-button'
										onClick={takeSnapshot}
										style={{ marginRight: '10px' }}>
										Take Heap Snapshot
									</button>
									<button
										className='demo-button success'
										onClick={triggerGC}>
										Collect Garbage
									</button>
									<button
										className={`demo-button ${profiling ? 'danger' : ''}`}
										onClick={() => setProfiling(!profiling)}
										style={{ marginLeft: '10px' }}>
										{profiling ? 'Stop' : 'Start'} Recording
									</button>
								</div>

								{heapSnapshot && (
									<div className='heap-snapshot'>
										<h4>
											Heap Snapshot #
											{Math.floor(
												heapSnapshot.timestamp / 10000
											)}
										</h4>
										<p>
											Total Size:{' '}
											{(
												heapSnapshot.totalSize / 1000
											).toFixed(1)}
											KB
										</p>
										<div className='heap-objects'>
											{heapSnapshot.objects.map(
												(obj, index) => (
													<div
														key={index}
														className='heap-object'>
														<div className='object-type'>
															{obj.type}
														</div>
														<div className='object-count'>
															Count: {obj.count}
														</div>
														<div className='object-size'>
															{(
																obj.size / 1000
															).toFixed(1)}
															KB
														</div>
													</div>
												)
											)}
										</div>
									</div>
								)}

								{profiling && memoryTimeline.length > 0 && (
									<div style={{ marginTop: '20px' }}>
										<h4 style={{ color: '#10b981' }}>
											Memory Timeline
										</h4>
										<div style={{ color: '#6b7280' }}>
											Recording... {memoryTimeline.length}
											s
										</div>
									</div>
								)}
							</div>
						)}
					</div>

					<div className='gc-monitor'>
						<h4>Garbage Collection Activity</h4>
						<div className='gc-stats'>
							<div className='gc-stat'>
								<div className='gc-stat-label'>Collections</div>
								<div className='gc-stat-value'>
									{gcActivity.length}
								</div>
							</div>
							<div className='gc-stat'>
								<div className='gc-stat-label'>Total Freed</div>
								<div className='gc-stat-value'>
									{gcActivity.reduce(
										(sum, gc) => sum + gc.freed,
										0
									) / 1000}
									KB
								</div>
							</div>
							<div className='gc-stat'>
								<div className='gc-stat-label'>
									Current Heap
								</div>
								<div className='gc-stat-value'>
									{(retainedSize / 1000).toFixed(1)}KB
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<CodeExample
				title='Scroll of Diagnostic Wisdom'
				discoveredBy='Memory Profiling Techniques'
				code={`// Using Chrome DevTools for Memory Analysis

// 1. Taking Heap Snapshots
// In DevTools: Memory tab > Take snapshot
// Compare snapshots to find leaks:
// - Take snapshot 1
// - Perform actions that might leak
// - Take snapshot 2
// - Compare: View "Objects allocated between snapshots"

// 2. Recording Allocation Timeline
// Shows real-time memory allocation
// Look for:
// - Steady growth (indicates leak)
// - Sawtooth pattern (healthy GC)
// - Retained size increases

// 3. Using Performance Monitor
// Shows live memory usage
// Enable with: Cmd+Shift+P > "Show Performance Monitor"

// 4. Forcing Garbage Collection
// In DevTools Console:
// - Click trash icon or
// - Run: gc() (if --js-flags="--expose-gc")

// 5. Finding Retainers
// In heap snapshot:
// - Select object
// - View "Retainers" panel
// - Shows what's keeping object alive

// React-specific debugging
function findReactFiberLeaks() {
  // In heap snapshot, filter by:
  // - "FiberNode" - React's internal nodes
  // - "Component" - Your components
  // - Large arrays or objects
  
  // Common React leak sources:
  // - Unmounted components still in memory
  // - Event handlers on window/document
  // - Subscriptions not cleaned up
  // - Closures capturing component state
}

// Memory leak detection pattern
class MemoryMonitor {
  constructor() {
    this.baseline = performance.memory.usedJSHeapSize;
    this.measurements = [];
  }
  
  measure() {
    const current = performance.memory.usedJSHeapSize;
    const delta = current - this.baseline;
    this.measurements.push({ time: Date.now(), delta });
    
    // Detect potential leak
    if (this.measurements.length > 10) {
      const trend = this.calculateTrend();
      if (trend > 0.8) {
        console.warn('Potential memory leak detected!');
      }
    }
  }
}`}
			/>

			<div className='optimization-grid'>
				<div
					className={`optimization-card ${memoryOptimizations.includes('weakmap') ? 'applied' : ''}`}
					onClick={() => applyOptimization('weakmap')}>
					<div className='optimization-icon'>🗝️</div>
					<div className='optimization-title'>WeakMap Usage</div>
					<p>Prevent reference leaks</p>
				</div>
				<div
					className={`optimization-card ${memoryOptimizations.includes('cleanup') ? 'applied' : ''}`}
					onClick={() => applyOptimization('cleanup')}>
					<div className='optimization-icon'>🧹</div>
					<div className='optimization-title'>Effect Cleanup</div>
					<p>Always return cleanup functions</p>
				</div>
				<div
					className={`optimization-card ${memoryOptimizations.includes('refs') ? 'applied' : ''}`}
					onClick={() => applyOptimization('refs')}>
					<div className='optimization-icon'>📌</div>
					<div className='optimization-title'>Ref Management</div>
					<p>Clear refs on unmount</p>
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: "Brother Binary's Wisdom:",
					content:
						"Chrome DevTools Memory Profiler is your window into the application's memory usage. Heap snapshots capture the state at a moment, allocation timelines show growth over time, and the retainers view reveals why objects can't be garbage collected. Master these tools, and no memory leak can hide from you.",
				}}
				reflectionQuestions={[
					'Brother Binary has revealed the sacred tools of memory profiling. How often do you profile your applications? Do you wait until users complain about performance, or do you proactively hunt for leaks?',
					'Consider making memory profiling part of your regular development workflow, especially before major releases.',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 26 (Afternoon)",
					content:
						"Brother Binary led me to a chamber filled with glowing diagnostic instruments - the Chrome DevTools Memory Profiler! Three sacred techniques: Heap Snapshots to see memory at a moment in time (take two, compare to find leaks), Allocation Timeline to track growth over time (steady growth = leak, sawtooth = healthy GC), and the Retainers view to see WHY objects can't be garbage collected. I also learned to filter by FiberNode and Component to find React-specific leaks. The key is comparing snapshots before and after user actions to catch what's not being released!",
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
