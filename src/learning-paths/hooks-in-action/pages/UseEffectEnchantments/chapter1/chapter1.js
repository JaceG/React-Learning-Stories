import React, { useState, useEffect } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterOne() {
	// Component lifecycle tracking
	const [componentAge, setComponentAge] = useState(0);
	const [isActive, setIsActive] = useState(true);

	// Different effect examples
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [apiData, setApiData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Track effect execution
	const [effectCounts, setEffectCounts] = useState({
		mount: 0,
		mouse: 0,
		window: 0,
		cleanup: 0,
	});

	// Effect 1: Component mount/unmount (empty deps)
	useEffect(() => {
		setEffectCounts((prev) => ({ ...prev, mount: prev.mount + 1 }));

		const interval = setInterval(() => {
			setComponentAge((prev) => prev + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
			setEffectCounts((prev) => ({ ...prev, cleanup: prev.cleanup + 1 }));
		};
	}, []); // Only runs once on mount

	// Effect 2: Mouse tracking (with cleanup)
	useEffect(() => {
		if (isActive) {
			setEffectCounts((prev) => ({ ...prev, mouse: prev.mouse + 1 }));

			const handleMouseMove = (e) => {
				const rect = e.currentTarget.getBoundingClientRect();
				setMousePosition({
					x: Math.round(e.clientX - rect.left),
					y: Math.round(e.clientY - rect.top),
				});
			};

			const element = document.querySelector('.mouse-tracker');
			if (element) {
				element.addEventListener('mousemove', handleMouseMove);

				return () => {
					element.removeEventListener('mousemove', handleMouseMove);
				};
			}
		}
	}, [isActive]); // Runs when isActive changes

	// Effect 3: Window resize (with debouncing)
	useEffect(() => {
		setEffectCounts((prev) => ({ ...prev, window: prev.window + 1 }));

		let timeoutId;
		const handleResize = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setWindowWidth(window.innerWidth);
			}, 300);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			clearTimeout(timeoutId);
		};
	}, []); // Only runs once

	// Simulate API call
	const fetchMagicalData = async () => {
		setIsLoading(true);
		setApiData(null);

		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setApiData({
			spell: 'Wingardium Leviosa',
			power: Math.floor(Math.random() * 100),
			element: ['Fire', 'Water', 'Earth', 'Air'][
				Math.floor(Math.random() * 4)
			],
		});
		setIsLoading(false);
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title='The Lifecycle Enchantments'
					bridge="Aria climbed the spiraling stairs of the Temporal Tower, each step seeming to take longer than the last. Binary's chronometer went haywire, displaying multiple times simultaneously. At the top, she found a chamber where past, present, and future seemed to coexist."
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						A figure materialized from the temporal flux - robed in
						fabric that shifted between states of existence.
						Hourglasses orbited around them, sand flowing upward in
						some, frozen in others.
					</p>

					<p className='story-paragraph'>
						"Aria of the State Sorcerers," the figure intoned, their
						voice seeming to come from multiple moments in time. "I
						am the <strong>Effect Sage</strong>, keeper of the
						bridge between React's pure realm and the chaotic
						outside world."
					</p>

					<p className='story-paragraph'>
						Binary beeped nervously as its sensors detected temporal
						anomalies throughout the room.
					</p>

					<p className='story-paragraph'>
						"Fear not, small construct," the Sage smiled. "Time
						flows differently here because
						<strong>useEffect</strong> exists outside React's normal
						rendering cycle. It's where we handle side effects - the
						messy, impure operations that connect our components to
						external systems."
					</p>

					<p className='story-paragraph'>
						Aria stepped forward, intrigued. "Professor Hooksworth
						mentioned useEffect was different from other hooks."
					</p>

					<p className='story-paragraph'>
						"Indeed," the Sage waved their hand, creating temporal
						diagrams in the air. "In the ancient times, class
						components had separate lifecycle methods. useEffect
						unified them all into one powerful enchantment. Watch
						and learn!"
					</p>

					<CodeExample
						title='The Basic useEffect Enchantment'
						discoveredBy='Transcribed by Aria'
						code={`// The basic useEffect enchantment
useEffect(() => {
  // This runs after render
  console.log('Effect running!');
  
  // The cleanup spell (optional)
  return () => {
    console.log('Cleaning up!');
  };
}, []); // Dependencies array`}
					/>

					<p className='story-paragraph'>
						"The cleanup function," the Sage explained, temporal
						echoes emphasizing each word, "is your protection
						against temporal contamination. Without it, effects
						linger across time, causing memory leaks and phantom
						behaviors."
					</p>

					<p className='story-paragraph'>
						"I see timers and subscriptions that outlive their
						components," Aria observed, studying the code. "The
						cleanup prevents them from haunting the application!"
					</p>

					<p className='story-paragraph'>
						"Precisely!" The Sage's form solidified with approval.
						"You understand the danger of unmanaged side effects.
						Now, let me show you how different dependency arrays
						control when your effects activate across the timeline."
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>Interactive Exercise: The Lifecycle Laboratory</h3>
					<InstructionBox character='Explore different types of effects and their lifecycles!'>
						Watch how effects run, cleanup, and track mouse movements and window size.
					</InstructionBox>

					<div className='effect-workshop'>
						{/* Component Lifecycle Display */}
						<div className='lifecycle-stage'>
							<h4>🕰️ Component Lifecycle</h4>
							<div className='stage-info'>
								<p>
									Component has been alive for:{' '}
									<strong>{componentAge} seconds</strong>
								</p>
								<div className='effect-counter'>
									Mount effects run:{' '}
									<span className='count-badge'>
										{effectCounts.mount}
									</span>
								</div>
							</div>
						</div>

						{/* Mouse Tracking Effect */}
						<div className='effect-demo'>
							<h4>🖱️ Mouse Tracking Effect</h4>
							<div
								className='mouse-tracker'
								style={{
									height: '150px',
									background: isActive
										? '#e3f2fd'
										: '#f5f5f5',
									border: '2px solid #2196f3',
									borderRadius: '8px',
									position: 'relative',
									overflow: 'hidden',
									transition: 'background 0.3s',
								}}>
								{isActive && (
									<>
										<div
											className='mouse-follower'
											style={{
												position: 'absolute',
												left: mousePosition.x - 10,
												top: mousePosition.y - 10,
												width: '20px',
												height: '20px',
												background: '#2196f3',
												borderRadius: '50%',
												pointerEvents: 'none',
												transition: 'none',
											}}
										/>
										<p
											style={{
												textAlign: 'center',
												marginTop: '60px',
												color: '#666',
											}}>
											Move your mouse here! (
											{mousePosition.x}, {mousePosition.y}
											)
										</p>
									</>
								)}
								{!isActive && (
									<p
										style={{
											textAlign: 'center',
											marginTop: '60px',
											color: '#999',
										}}>
										Effect paused - listener removed
									</p>
								)}
							</div>
							<div
								style={{
									display: 'flex',
									gap: '10px',
									marginTop: '10px',
								}}>
								<button
									className='spell-button'
									onClick={() => setIsActive(!isActive)}>
									{isActive
										? 'Pause Effect'
										: 'Resume Effect'}
								</button>
								<div className='effect-counter'>
									Effect runs:{' '}
									<span className='count-badge'>
										{effectCounts.mouse}
									</span>
								</div>
							</div>
						</div>

						{/* Window Resize Effect */}
						<div className='effect-demo'>
							<h4>🪟 Window Resize Effect</h4>
							<div className='window-info'>
								<p>
									Current window width:{' '}
									<strong>{windowWidth}px</strong>
								</p>
								<p style={{ fontSize: '14px', color: '#666' }}>
									(Resize your browser window to see the
									effect with debouncing)
								</p>
								<div className='effect-counter'>
									Setup runs:{' '}
									<span className='count-badge'>
										{effectCounts.window}
									</span>
								</div>
							</div>
						</div>

						{/* Async Effect Example */}
						<div className='effect-demo'>
							<h4>✨ Async Effect Pattern</h4>
							<button
								className='spell-button'
								onClick={fetchMagicalData}
								disabled={isLoading}>
								{isLoading
									? 'Casting Spell...'
									: 'Fetch Magical Data'}
							</button>

							{apiData && (
								<div
									className='spell-result'
									style={{ marginTop: '15px' }}>
									<p>
										<strong>Spell:</strong> {apiData.spell}
									</p>
									<p>
										<strong>Power:</strong> {apiData.power}%
									</p>
									<p>
										<strong>Element:</strong>{' '}
										{apiData.element}
									</p>
								</div>
							)}
						</div>

						<button
							className='reset-button'
							onClick={() => {
								setComponentAge(0);
								setIsActive(true);
								setApiData(null);
								setEffectCounts({
									mount: 0,
									mouse: 0,
									window: 0,
									cleanup: 0,
								});
							}}
							style={{ marginTop: '20px' }}>
							Reset All Examples
						</button>
					</div>
				</div>

				<div className='effect-patterns'>
					<h4>Common Effect Patterns</h4>
					<div className='pattern-grid'>
						<div className='pattern-card'>
							<h5>🎭 componentDidMount</h5>
							<pre>{`useEffect(() => {
  // Runs once after mount
}, []); // Empty deps`}</pre>
						</div>
						<div className='pattern-card'>
							<h5>🔄 componentDidUpdate</h5>
							<pre>{`useEffect(() => {
  // Runs after every render
}); // No deps array`}</pre>
						</div>
						<div className='pattern-card'>
							<h5>🧹 componentWillUnmount</h5>
							<pre>{`useEffect(() => {
  return () => {
    // Cleanup
  };
}, []);`}</pre>
						</div>
					</div>
				</div>

				<ChapterSummary
					characterIntros={[
						{
							name: 'The Effect Sage',
							description: "A mysterious figure who exists partially outside normal time, the Effect Sage guards the boundary between React's pure functional world and external side effects. Their form shifts between temporal states, and hourglasses orbit around them. They teach the delicate art of useEffect, showing how to safely bridge the gap between React and the chaotic outside world."
						}
					]}
					lessonInsight={{
						title: "The Effect Sage's Temporal Wisdom:",
						content: "Master useEffect as your portal to the outside world. This hook handles all side effects - API calls, timers, subscriptions, DOM manipulation - anything impure that reaches beyond React's boundaries. Control effect timing through dependencies: empty array for mount-only, specific deps for selective re-runs, no array for every render. Always return cleanup functions to prevent temporal contamination. Remember: effects run after render commits, in their own timeline."
					}}
					reflectionQuestions={[
						'How does the "temporal contamination" metaphor help visualize memory leaks?',
						'Why might effects need their own "timeline" separate from rendering?',
						'What real-world chaos might occur without proper cleanup functions?'
					]}
					journalEntry={{
						title: "Aria's Journal - Day 17 (Morning)",
						content: "The Temporal Tower revealed useEffect's true nature - it's a bridge between React's pure rendering world and the messy reality of side effects! The Effect Sage showed me how one hook replaces all the old lifecycle methods. Empty dependencies make it run once (mount), dependencies control re-runs, and cleanup functions prevent temporal contamination (memory leaks). Effects run AFTER render commits, ensuring DOM readiness. The key insight: effects exist in their own time stream, synchronized with but separate from rendering!"
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
