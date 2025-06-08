import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const {
		activeDebugTool,
		activateTool,
		bugTrail,
		debugDepth,
		descendDeeper,
		captureBug
	} = useOutletContext();

	const [dungeonBugs, setDungeonBugs] = useState([]);
	const [loggedErrors, setLoggedErrors] = useState([]);
	const [selectedBug, setSelectedBug] = useState(null);

	// Generate dungeon bugs
	useEffect(() => {
		const bugs = [
			{ id: 1, type: 'race-condition', icon: '🏃', speed: 'fast', behavior: 'flickering' },
			{ id: 2, type: 'memory-leak', icon: '💧', speed: 'slow', behavior: 'growing' },
			{ id: 3, type: 'null-reference', icon: '👻', speed: 'medium', behavior: 'vanishing' }
		];
		setDungeonBugs(bugs);

		// Simulate console errors
		const errors = [
			{ type: 'error', message: 'Cannot read property "state" of undefined', timestamp: '14:23:45' },
			{ type: 'warn', message: 'Component is changing an uncontrolled input to be controlled', timestamp: '14:23:47' },
			{ type: 'error', message: 'Maximum update depth exceeded', timestamp: '14:23:52' }
		];
		setLoggedErrors(errors);
	}, []);

	const huntBug = (bug) => {
		setSelectedBug(bug);
		captureBug({
			...bug,
			component: 'UserDashboard',
			file: 'Dashboard.js',
			line: Math.floor(Math.random() * 200) + 1
		});
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: Descent into Darkness
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Below the Testing Tower lay the Debug Dungeon, where the most elusive bugs 
					hid. These weren't ordinary bugs - they were production bugs, shape-shifters 
					that behaved differently than in development.
				</p>

				<p className='story-paragraph'>
					<strong>Dungeon Keeper Logsworth</strong> met them at the entrance, his beard 
					grey from years of debugging. "Even with tests, some bugs slip through. Here, 
					we hunt them in production."
				</p>

				<p className='story-paragraph'>
					The dungeon was a maze of error logs, stack traces, and mysterious behaviors. 
					<strong>Debuggora's</strong> eyes glowed brighter in the darkness. "I sense a 
					race condition bug - the most elusive kind! It appears and disappears based 
					on timing."
				</p>

				<div className='character-intro-card'>
					<h4>Dungeon Keeper Logsworth</h4>
					<p>Master of production debugging and keeper of the error logs. His philosophy: 
					"In production, bugs reveal their true nature. Here we learn to read the signs 
					they leave behind - stack traces are maps, logs are clues, and timing is everything."</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Dungeon Entrance</h3>
				
				<div className='dungeon-entrance'>
					<h4>Production Bug Hunt</h4>
					<p>The deeper you go, the stranger the bugs become. Use your debugging tools 
					to track and capture them!</p>
					
					<div className='dungeon-levels'>
						<div className={`dungeon-level ${debugDepth === 0 ? 'active' : ''}`}>
							<span className='level-indicator'>Level {debugDepth}</span>
							<p>Current depth: {debugDepth === 0 ? 'Surface Level' : 
								debugDepth === 1 ? 'Component Layer' : 
								debugDepth === 2 ? 'State Management' : 'Deep Production'}</p>
							
							<div className='race-condition-bug'>
								{dungeonBugs.map((bug, index) => (
									<div
										key={bug.id}
										className={`racing-bug ${selectedBug?.id === bug.id ? 'caught' : ''}`}
										style={{ 
											animationDelay: `${index * 0.5}s`,
											animationDuration: bug.speed === 'fast' ? '3s' : 
												bug.speed === 'slow' ? '7s' : '5s'
										}}
										onClick={() => huntBug(bug)}>
										{bug.icon}
									</div>
								))}
							</div>
							
							<button 
								className='test-button'
								onClick={descendDeeper}>
								Descend Deeper
							</button>
						</div>
					</div>
				</div>

				<div className='debug-tools'>
					<div 
						className={`debug-tool ${activeDebugTool === 'devtools' ? 'active' : ''}`}
						onClick={() => activateTool('devtools')}>
						<span className='tool-icon'>🔧</span>
						<div className='tool-name'>React DevTools</div>
						<div className='tool-description'>Inspect component tree and state</div>
					</div>
					<div 
						className={`debug-tool ${activeDebugTool === 'console' ? 'active' : ''}`}
						onClick={() => activateTool('console')}>
						<span className='tool-icon'>📝</span>
						<div className='tool-name'>Console Debugging</div>
						<div className='tool-description'>Track errors and log statements</div>
					</div>
					<div 
						className={`debug-tool ${activeDebugTool === 'network' ? 'active' : ''}`}
						onClick={() => activateTool('network')}>
						<span className='tool-icon'>🌐</span>
						<div className='tool-name'>Network Inspector</div>
						<div className='tool-description'>Monitor API calls and responses</div>
					</div>
				</div>

				{activeDebugTool === 'console' && (
					<div className='console-output'>
						<h4>Console Output</h4>
						{loggedErrors.map((log, index) => (
							<div key={index} className={`console-${log.type}`}>
								[{log.timestamp}] {log.message}
							</div>
						))}
					</div>
				)}

				{bugTrail.length > 0 && (
					<div className='bug-trail'>
						<h4>Debug Trail</h4>
						{bugTrail.map((entry, index) => (
							<div key={index} className='trail-entry'>
								&gt; {entry}
							</div>
						))}
					</div>
				)}

				<div className='debuggora-insights'>
					<h4>Debuggora's Wisdom</h4>
					<div className='insight-message'>
						"See how the race condition bug moves unpredictably? In development it 
						might work perfectly, but under production load, timing changes everything. 
						This is why we need different debugging strategies here."
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Deep Debugging Techniques</span>
					<div className='code-actions'>
						<button onClick={() => activateTool('console')}>Activate Debug Mode</button>
					</div>
				</div>
				<div className='code-example'>
					<pre>{`// React DevTools Exploration
// 1. Open React DevTools in production
// 2. Navigate to problematic component
// 3. Check these common issues:

// Race Condition Detection
function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let cancelled = false;
    
    // BUG: Multiple rapid calls create race condition
    fetchDashboardData().then(result => {
      // This might execute after component unmounts!
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });
    
    return () => { cancelled = true; };
  }, []);
}

// Console Debugging Strategy
console.group('🔍 Debug Session: Dashboard Mount');
console.log('Component mounted at:', new Date().toISOString());
console.log('Initial state:', { data, loading });
console.trace('Mount stack trace'); // Shows call hierarchy
console.groupEnd();

// Advanced Error Tracking
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', {
    reason: event.reason,
    promise: event.promise,
    stack: event.reason?.stack
  });
  
  // Send to error tracking service
  trackError({
    type: 'unhandled_promise',
    error: event.reason,
    context: getCurrentUserContext()
  });
});

// Performance Profiling
const ProfiledComponent = () => {
  useEffect(() => {
    performance.mark('component-start');
    
    return () => {
      performance.mark('component-end');
      performance.measure(
        'component-lifecycle',
        'component-start',
        'component-end'
      );
      
      const measure = performance.getEntriesByName('component-lifecycle')[0];
      if (measure.duration > 16) { // Longer than one frame
        console.warn('Slow component:', measure.duration + 'ms');
      }
    };
  }, []);
};`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Logsworth's Tip:</strong> "Production debugging requires different tools. 
					DevTools shows you the present, console logs show you the past, and performance 
					profiling shows you the bottlenecks. Master all three to catch any bug."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Deep Debugging Lesson:</h3>
				<p>
					Debugging in production is like archaeology - you're reconstructing what 
					happened from the artifacts left behind. Unlike development debugging where 
					you can pause and inspect, production debugging requires you to be a 
					detective, following clues through logs, metrics, and user reports.
				</p>
				<p>
					The key insight: Production bugs often involve timing, load, or environment 
					differences. A race condition that never appears in development might happen 
					constantly under real user load. This is why defensive programming and 
					comprehensive logging are essential.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Production Debugging</h3>
				<p>
					<strong>Why do bugs behave differently in production?</strong> Consider how 
					factors like network latency, concurrent users, different data sets, and 
					various device capabilities create conditions you can't fully replicate in 
					development.
				</p>
				<p>
					<strong>How is debugging like solving a mystery?</strong> Think about the 
					process of gathering clues (logs), forming hypotheses (potential causes), 
					testing theories (reproduction attempts), and eliminating possibilities 
					until you find the truth.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As Aria captured her first production bug, Logsworth nodded approvingly. 
					"You're learning to see in the dark. But these surface bugs are just the 
					beginning. Tomorrow, we'll navigate the Stack Trace Labyrinth, where the 
					real mysteries hide..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;