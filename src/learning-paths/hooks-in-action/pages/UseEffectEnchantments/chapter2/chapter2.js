import React, { useState, useEffect, useRef } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterTwo() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('');
	const [seconds, setSeconds] = useState(0);

	// Use refs to track effect executions without causing re-renders
	const effectCountsRef = useRef({
		noDepsTrigger: 0,
		emptyDepsTrigger: 0,
		countDepsTrigger: 0,
		nameDepsTrigger: 0,
		multiDepsTrigger: 0,
	});

	const [effectTriggers, setEffectTriggers] = useState({
		...effectCountsRef.current,
	});

	// Track render count
	const [displayRenderCount, setDisplayRenderCount] = useState(0);

	// Only count renders when actual state changes occur
	useEffect(() => {
		setDisplayRenderCount((prev) => prev + 1);
	}, [count, name, seconds]);

	// Update displayed counts when dependencies change
	const updateDisplayedCounts = () => {
		setEffectTriggers({ ...effectCountsRef.current });
	};

	// Effect with empty dependency array - runs ONCE on mount
	useEffect(() => {
		effectCountsRef.current.emptyDepsTrigger += 1;
		updateDisplayedCounts();
	}, []);

	// Effect watching count - runs when count changes
	useEffect(() => {
		effectCountsRef.current.countDepsTrigger += 1;
		effectCountsRef.current.noDepsTrigger += 1; // Simulate no-deps behavior
		updateDisplayedCounts();
	}, [count]);

	// Effect watching name - runs when name changes
	useEffect(() => {
		if (name) {
			effectCountsRef.current.nameDepsTrigger += 1;
		}
		effectCountsRef.current.noDepsTrigger += 1; // Simulate no-deps behavior
		updateDisplayedCounts();
	}, [name]);

	// Effect watching multiple dependencies
	useEffect(() => {
		if (count > 0 || name) {
			effectCountsRef.current.multiDepsTrigger += 1;
		}
		updateDisplayedCounts();
	}, [count, name]);

	// Timer that increments every second
	useEffect(() => {
		const timer = setInterval(() => {
			setSeconds((s) => {
				// Update no-deps counter each second to simulate constant re-renders
				effectCountsRef.current.noDepsTrigger += 1;
				return s + 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title='Dependencies and Watchers'
					bridge='The next level of the Temporal Tower contained a vast observatory filled with floating crystal spheres. Each sphere monitored different aspects of time - some spinning rapidly, others frozen, a few pulsing rhythmically. The Effect Sage awaited Aria at the center.'
				/>

				<StorySection
					paragraphs={[
						`"Welcome to the Dependency Observatory," the Sage announced, gesturing to the swirling orbs. "Here we study the most delicate aspect of useEffect - the dependency array, which controls when effects activate across time."`,
						`Binary scanned the spheres, its display showing different activation patterns for each one.`,
						`"The dependency array," the Sage explained, touching a sphere that immediately synchronized with their movement, "is your contract with time itself. It declares: 'Only activate this effect when these specific values change their temporal state.'"`,
						`Aria watched three primary spheres float forward, each glowing with distinct patterns. "These represent the three fundamental dependency patterns?"`,
						`"Indeed!" The Sage waved their hand, and the patterns became visible:`
					]}
				/>

				<CodeExample
					title='Dependency Array Patterns'
					discoveredBy='Transcribed by Aria'
					code={`// Pattern 1: No dependency array - runs after EVERY render
useEffect(() => {
  console.log('I run after every render!');
});

// Pattern 2: Empty array - runs ONCE on mount
useEffect(() => {
  console.log('I run only once when component mounts!');
}, []);

// Pattern 3: With dependencies - runs when deps change
useEffect(() => {
  console.log('I run when count or name changes!');
}, [count, name]);`}
				/>

				<StorySection
					paragraphs={[
						`"But beware the temporal paradoxes!" the Sage warned, their form flickering with urgency. "Missing dependencies create stale closures - values frozen in past time. Unnecessary dependencies cause temporal loops, triggering effects repeatedly."`,
						`"How do we avoid these paradoxes?" Aria asked, noting Binary's concerned beeping.`,
						`"The ancient ESLint spell 'exhaustive-deps' serves as your temporal guardian," the Sage replied. "It warns when your dependency array lies about what values your effect truly observes. Trust its wisdom - it prevents countless temporal anomalies!"`
					]}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: The Dependency Observatory
					</h3>
					<InstructionBox character='Watch how different dependency arrays affect when effects run!'>
						Change the count, name, or wait for the timer to see which effects trigger.
					</InstructionBox>

					<div className='dependency-lab'>
						<div className='control-panel'>
							<div className='control-item'>
								<label>Count:</label>
								<button
									className='spell-button'
									onClick={() => setCount((c) => c + 1)}>
									Increment ({count})
								</button>
							</div>

							<div className='control-item'>
								<label>Name:</label>
								<input
									type='text'
									placeholder='Enter a name...'
									value={name}
									onChange={(e) => setName(e.target.value)}
									style={{
										padding: '8px',
										borderRadius: '4px',
										border: '2px solid #6c5ce7',
										marginLeft: '10px',
									}}
								/>
							</div>

							<div className='control-item'>
								<label>Timer:</label>
								<span className='timer-display'>
									{seconds}s
								</span>
							</div>
						</div>

						<div className='effect-monitors'>
							<h4>Effect Trigger Counts</h4>
							<div
								style={{
									marginBottom: '15px',
									textAlign: 'center',
								}}>
								<span
									style={{ color: '#666', fontSize: '14px' }}>
									State changes have triggered{' '}
									<strong>{displayRenderCount}</strong>{' '}
									renders
								</span>
							</div>

							<div className='monitor-grid'>
								<div className='monitor-card'>
									<h5>No Dependencies</h5>
									<div className='trigger-count'>
										{effectTriggers.noDepsTrigger}
									</div>
									<small>Runs on every render</small>
								</div>

								<div className='monitor-card'>
									<h5>Empty Array []</h5>
									<div className='trigger-count'>
										{effectTriggers.emptyDepsTrigger}
									</div>
									<small>Runs once on mount</small>
								</div>

								<div className='monitor-card'>
									<h5>[count]</h5>
									<div className='trigger-count'>
										{effectTriggers.countDepsTrigger}
									</div>
									<small>Runs when count changes</small>
								</div>

								<div className='monitor-card'>
									<h5>[name]</h5>
									<div className='trigger-count'>
										{effectTriggers.nameDepsTrigger}
									</div>
									<small>Runs when name changes</small>
								</div>

								<div className='monitor-card'>
									<h5>[count, name]</h5>
									<div className='trigger-count'>
										{effectTriggers.multiDepsTrigger}
									</div>
									<small>Runs when either changes</small>
								</div>
							</div>
						</div>

						<div style={{ textAlign: 'center', marginTop: '20px' }}>
							<button
								className='reset-button'
								onClick={() => {
									setCount(0);
									setName('');
									setSeconds(0);
									setDisplayRenderCount(0);
									effectCountsRef.current = {
										noDepsTrigger: 0,
										emptyDepsTrigger: 0,
										countDepsTrigger: 0,
										nameDepsTrigger: 0,
										multiDepsTrigger: 0,
									};
									setEffectTriggers({
										...effectCountsRef.current,
									});
								}}>
								Reset All Counters
							</button>
						</div>
					</div>
				</div>

				<div className='pattern-showcase'>
					<span className='pattern-badge'>Common Pitfall</span>
					<h4>Avoiding Dependency Array Mistakes</h4>
					<CodeExample
						title='Stale Closure Prevention'
						code={`// ❌ Missing dependency - causes stale closure
const [count, setCount] = useState(0);
useEffect(() => {
  const timer = setTimeout(() => {
    console.log(count); // Always logs initial value!
  }, 3000);
  return () => clearTimeout(timer);
}, []); // Missing 'count' dependency

// ✅ Correct - includes all dependencies
useEffect(() => {
  const timer = setTimeout(() => {
    console.log(count); // Logs current value
  }, 3000);
  return () => clearTimeout(timer);
}, [count]); // Includes 'count' dependency`}
					/>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: 'Dependency Array Mastery:',
						content: "Master the dependency array as your temporal contract with React. Empty arrays create mount-only effects, no array means every-render execution, and specific dependencies provide surgical precision. Include ALL values from component scope that your effect uses - missing dependencies create stale closures frozen in time. Trust the exhaustive-deps ESLint rule as your guardian against temporal paradoxes. Remember: dependencies aren't just about performance, they're about correctness."
					}}
					reflectionQuestions={[
						'How does the "temporal paradox" metaphor help understand stale closures?',
						'Why is the dependency array called a "contract with time"?',
						'What real bugs have you encountered from incorrect dependencies?'
					]}
					journalEntry={{
						title: "Aria's Journal - Day 17 (Afternoon)",
						content: "The Dependency Observatory revealed the true power of dependency arrays! They're temporal contracts that control when effects activate. No array = every render (chaos!), empty array = mount only (perfect for initialization), filled array = specific changes (precision control). The Sage warned of temporal paradoxes: stale closures from missing dependencies freeze values in past time, while unnecessary dependencies create infinite loops. The exhaustive-deps ESLint rule is our guardian against these anomalies. Dependencies aren't just optimization - they're correctness!"
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
