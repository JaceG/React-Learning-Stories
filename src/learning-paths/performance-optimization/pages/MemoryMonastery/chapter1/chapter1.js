import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const { memoryLeaks, detectMemoryLeak, cleanupLeak, retainedSize } =
		useOutletContext();

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
			<ChapterIntro chapterNumber={1} title='The Memory Plague' />

			<StorySection
				paragraphs={[
					<><strong>Aria</strong> arrived at the Memory Monastery, an ancient structure floating in the clouds above the React Kingdom. Applications below were suffering from a mysterious plague - they would start fast but gradually slow to a crawl, eventually crashing entirely.</>,
					<><strong>Brother Binary</strong>, the monastery's eldest monk, greeted her with concern. "The Memory Plague has returned, Aria. Applications are holding onto memories they should release, creating <strong>memory leaks</strong> that grow until nothing can function."</>,
					<>He led her to the Observatory, where ethereal representations of memory usage floated like ghosts. "Before we can heal the plague, you must understand its three primary forms: <strong>Event Listener Leaks</strong>,{' '}<strong>Detached DOM Nodes</strong>, and{' '}<strong>Closure Captures</strong>."</>
				]}
			/>

			<div className='monastery-chamber'>
				<h3>The Observatory of Leaks</h3>
				<div className='memory-meter'>
					<div
						className='memory-used'
						style={{
							width: `${Math.min((retainedSize / 50000) * 100, 100)}%`,
						}}></div>
					<span className='memory-label'>
						{(retainedSize / 1000).toFixed(1)}KB / 50KB
					</span>
				</div>

				<p
					style={{
						textAlign: 'center',
						color: 'white',
						marginTop: '10px',
					}}>
					Current Memory Leaks: {memoryLeaks.length}
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Creating Memory Leaks
				</h3>
				<InstructionBox character='Brother Binary leads you to the Observatory.'>
					Create different types of memory leaks to understand how
					they form. Watch as the monastery's memory meter fills up!
				</InstructionBox>

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
							<p style={{ color: '#6b7280' }}>
								No leaks detected... yet
							</p>
						) : (
							memoryLeaks.map((leak, index) => (
								<div key={index} className='leak-item'>
									<span>{leak.component}</span>
									<span className='leak-size'>
										{(leak.size / 1000).toFixed(1)}KB
									</span>
									<button
										className='demo-button success'
										onClick={() =>
											cleanupLeak(leak.component)
										}>
										Clean Up
									</button>
								</div>
							))
						)}
					</div>

					{showMonk && (
						<div className='wisdom-card'>
							<h4>Brother Binary's Warning</h4>
							<p>
								"You see how quickly memory accumulates! In real
								applications, these leaks compound over time.
								Users might not notice at first, but eventually,
								the application becomes unusable."
							</p>
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title='Scroll of Memory Leaks'
				discoveredBy='Common Patterns of Plague'
				code={`// Common Memory Leak Patterns

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
}`}
			/>

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

			<ChapterSummary
				characterIntros={[
					{
						name: 'Brother Binary',
						description: 'Keeper of the Memory Monastery and guardian against the Memory Plague. His wisdom: "Every byte retained is a burden carried. Release what is not needed, and your applications shall soar."'
					}
				]}
				lessonInsight={{
					title: 'The Memory Lesson:',
					content:
						'Memory leaks are silent killers of application performance. They occur when your application holds references to objects that are no longer needed, preventing the garbage collector from freeing that memory. Common sources include forgotten event listeners, detached DOM nodes, and closures that capture large objects. The key to prevention is disciplined cleanup.',
				}}
				reflectionQuestions={[
					'Brother Binary has shown Aria the three forms of the Memory Plague. In your own applications, have you noticed performance degrading over time? Do you always clean up event listeners and timers?',
					'Consider how a small leak, multiplied by thousands of users and hours of usage, can bring even the mightiest application to its knees.',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 26 (Morning)",
					content:
						"I've arrived at the Memory Monastery, floating in the clouds above the kingdom. Applications below suffer from a mysterious plague - they start fast but gradually slow to a crawl, eventually crashing. Brother Binary, the eldest monk, explained the Memory Plague: applications holding onto memories they should release. The three primary forms: Event Listener Leaks (listeners added but never removed), Detached DOM Nodes (removed from DOM but still referenced), and Closure Captures (closures holding large objects). I created each type to understand how they form. The memory meter fills alarmingly fast!",
				}}
			/>
		</div>
	);
};

export default ChapterOne;
