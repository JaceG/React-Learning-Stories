import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const {
		memoryLeaks,
		detectMemoryLeak,
		cleanupLeak,
		retainedSize
	} = useOutletContext();

	const [eventListeners, setEventListeners] = useState(0);
	const [detachedNodes, setDetachedNodes] = useState(0);
	const [closures, setClosures] = useState(0);
	const [showMonk, setShowMonk] = useState(false);

	// Simulate memory leak creation
	const createEventListenerLeak = () => {
		setEventListeners(eventListeners + 1);
		detectMemoryLeak('EventListener', 1200);
	};

	const createDetachedDOMLeak = () => {
		setDetachedNodes(detachedNodes + 1);
		detectMemoryLeak('DetachedDOM', 3400);
	};

	const createClosureLeak = () => {
		setClosures(closures + 1);
		detectMemoryLeak('Closure', 800);
	};

	useEffect(() => {
		if (memoryLeaks.length >= 3) {
			setShowMonk(true);
		}
	}, [memoryLeaks]);

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Memory Plague
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Aria</strong> arrived at the Memory Monastery, an ancient structure 
					floating in the clouds above the React Kingdom. Applications below were 
					suffering from a mysterious plague - they would start fast but gradually 
					slow to a crawl, eventually crashing entirely.
				</p>

				<p className='story-paragraph'>
					<strong>Brother Binary</strong>, the monastery's eldest monk, greeted her with 
					concern. "The Memory Plague has returned, Aria. Applications are holding onto 
					memories they should release, creating <strong>memory leaks</strong> that grow 
					until nothing can function."
				</p>

				<p className='story-paragraph'>
					He led her to the Observatory, where ethereal representations of memory usage 
					floated like ghosts. "Before we can heal the plague, you must understand its 
					three primary forms: <strong>Event Listener Leaks</strong>, <strong>Detached 
					DOM Nodes</strong>, and <strong>Closure Captures</strong>."
				</p>

				<div className='character-intro-card'>
					<h4>Brother Binary</h4>
					<p>Keeper of the Memory Monastery and guardian against the Memory Plague. 
					His wisdom: "Every byte retained is a burden carried. Release what is not 
					needed, and your applications shall soar."</p>
				</div>

				<div className='monastery-chamber'>
					<h3>The Observatory of Leaks</h3>
					<div className='memory-meter'>
						<div 
							className='memory-used' 
							style={{ width: `${Math.min((retainedSize / 50000) * 100, 100)}%` }}>
						</div>
						<span className='memory-label'>
							{(retainedSize / 1000).toFixed(1)}KB / 50KB
						</span>
					</div>
					
					<p style={{ textAlign: 'center', color: 'white', marginTop: '10px' }}>
						Current Memory Leaks: {memoryLeaks.length}
					</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Creating Memory Leaks
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Create different types of memory leaks to understand how they form. 
							Watch as the monastery's memory meter fills up!
						</strong>
					</p>
				</div>

				<div className='memory-demo'>
					<div className='demo-controls'>
						<button 
							className='demo-button danger' 
							onClick={createEventListenerLeak}>
							Create Event Listener Leak
						</button>
						<button 
							className='demo-button danger' 
							onClick={createDetachedDOMLeak}>
							Create Detached DOM Leak
						</button>
						<button 
							className='demo-button danger' 
							onClick={createClosureLeak}>
							Create Closure Leak
						</button>
					</div>

					<div className='memory-leak-detector'>
						<h4 style={{ color: '#10b981', marginBottom: '15px' }}>
							Memory Leak Detector
						</h4>
						{memoryLeaks.length === 0 ? (
							<p style={{ color: '#6b7280' }}>No leaks detected... yet</p>
						) : (
							memoryLeaks.map((leak, index) => (
								<div key={index} className='leak-item'>
									<span>{leak.component}</span>
									<span className='leak-size'>
										{(leak.size / 1000).toFixed(1)}KB
									</span>
									<button 
										className='demo-button success'
										onClick={() => cleanupLeak(leak.component)}>
										Clean Up
									</button>
								</div>
							))
						)}
					</div>

					{showMonk && (
						<div className='wisdom-card'>
							<h4>Brother Binary's Warning</h4>
							<p>"You see how quickly memory accumulates! In real applications, 
							these leaks compound over time. Users might not notice at first, 
							but eventually, the application becomes unusable."</p>
						</div>
					)}
				</div>
			</div>

			<div className='code-example'>
				<div className='memory-scroll'>
					<div className='scroll-header'>
						<span>Scroll of Memory Leaks</span>
						<span className='discovered-by'>Common Patterns of Plague</span>
					</div>
					<pre>{`// Common Memory Leak Patterns

// 1. Event Listener Leaks
class LeakyComponent extends React.Component {
  componentDidMount() {
    // ❌ Listener added but never removed!
    window.addEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    console.log('Window resized');
  }
  
  // Missing cleanup!
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleResize);
  // }
}

// 2. Detached DOM References
function createLeak() {
  const element = document.createElement('div');
  document.body.appendChild(element);
  
  // ❌ Removed from DOM but reference remains!
  document.body.removeChild(element);
  
  // This closure keeps the element in memory
  return function() {
    console.log(element); // Still referenced!
  };
}

// 3. Closure Memory Leaks
function expensiveOperation() {
  const hugeData = new Array(1000000).fill('data');
  
  // ❌ Closure captures entire hugeData array
  return function getItem(index) {
    return hugeData[index];
  };
}

// 4. React-specific leaks
function Timer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // ❌ Timer continues after unmount!
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // Missing cleanup!
    // return () => clearInterval(interval);
  }, []);
  
  return <div>{count}</div>;
}`}</pre>
				</div>
			</div>

			<div className='optimization-grid'>
				<div className='optimization-card'>
					<div className='optimization-icon'>🎧</div>
					<div className='optimization-title'>Event Listeners</div>
					<p>Count: {eventListeners}</p>
					<small>Each adds 1.2KB</small>
				</div>
				<div className='optimization-card'>
					<div className='optimization-icon'>🔗</div>
					<div className='optimization-title'>Detached Nodes</div>
					<p>Count: {detachedNodes}</p>
					<small>Each adds 3.4KB</small>
				</div>
				<div className='optimization-card'>
					<div className='optimization-icon'>📦</div>
					<div className='optimization-title'>Closures</div>
					<p>Count: {closures}</p>
					<small>Each adds 0.8KB</small>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Memory Lesson:</h3>
				<p>
					Memory leaks are silent killers of application performance. They occur when 
					your application holds references to objects that are no longer needed, 
					preventing the garbage collector from freeing that memory. Common sources include 
					forgotten event listeners, detached DOM nodes, and closures that capture large 
					objects. The key to prevention is disciplined cleanup.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Brother Binary has shown Aria the three forms of the Memory Plague. In your 
					own applications, have you noticed performance degrading over time? Do you 
					always clean up event listeners and timers? 
				</p>
				<p>
					Consider how a small leak, multiplied by thousands of users and hours of usage, 
					can bring even the mightiest application to its knees.
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;