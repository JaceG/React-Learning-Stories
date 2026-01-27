import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [isComponentBorn, setIsComponentBorn] = useState(false);
	const [componentAge, setComponentAge] = useState(0);
	const [isComponentRetired, setIsComponentRetired] = useState(false);
	const [lifecycleMessages, setLifecycleMessages] = useState([]);

	const addLifecycleMessage = (message) => {
		setLifecycleMessages((prev) => [
			...prev,
			{ id: Date.now() + Math.random(), text: message },
		]);
	};

	const birthComponent = () => {
		if (!isComponentBorn && !isComponentRetired) {
			setIsComponentBorn(true);
			addLifecycleMessage(
				'constructor() is called: initializing component state.'
			);
			addLifecycleMessage(
				'render() is called: component describes its UI.'
			);
			addLifecycleMessage(
				'componentDidMount() is called: ResourceComponent is now in the DOM.'
			);
			addLifecycleMessage('ResourceComponent starts timer interval.');
			addLifecycleMessage(
				'ResourceComponent adds window resize listener.'
			);
			addLifecycleMessage('ResourceComponent subscribes to data stream.');
			addLifecycleMessage(
				'ResourceComponent initiates network requests.'
			);
		}
	};

	const updateComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			setComponentAge((prevAge) => {
				const newAge = prevAge + 1;
				addLifecycleMessage(
					'shouldComponentUpdate() is called: checking if update is needed.'
				);
				addLifecycleMessage(
					'render() is called during update: component re-renders.'
				);
				addLifecycleMessage(
					`componentDidUpdate() is called: resources active for ${newAge} seconds.`
				);
				if (newAge % 3 === 0) {
					addLifecycleMessage(
						'Timer interval fires, updating component state.'
					);
				}
				if (newAge % 4 === 0) {
					addLifecycleMessage(
						'Data subscription receives new data packet.'
					);
				}
				if (newAge % 5 === 0) {
					addLifecycleMessage(
						'New network request initiated to refresh data.'
					);
				}
				return newAge;
			});
		}
	};

	const retireComponent = (withoutCleanup = false) => {
		if (isComponentBorn && !isComponentRetired) {
			if (withoutCleanup) {
				addLifecycleMessage(
					'Component has been removed from the DOM without cleanup.'
				);
				setIsComponentRetired(true);
			} else {
				addLifecycleMessage(
					'componentWillUnmount() is called: preparing for cleanup...'
				);
				addLifecycleMessage(
					'Canceling timer interval with clearInterval()'
				);
				addLifecycleMessage(
					'Removing window event listeners with removeEventListener()'
				);
				addLifecycleMessage(
					'Unsubscribing from data sources with unsubscribe()'
				);
				addLifecycleMessage(
					'Aborting network requests with abortController.abort()'
				);
				addLifecycleMessage('All resources properly cleaned up.');
				addLifecycleMessage('Component has been removed from the DOM.');
				setIsComponentRetired(true);
			}
		}
	};

	const resetDemo = () => {
		setIsComponentBorn(false);
		setComponentAge(0);
		setIsComponentRetired(false);
		setLifecycleMessages([]);
	};

	// Define cleanup tasks that will be visualized in the interactive exercise
	const cleanupTasks = [
		{
			id: 1,
			name: 'Cancel Timers',
			code: 'clearInterval(this.intervalId);',
			description: 'Stop all running timers to prevent memory leaks',
			icon: '⏱️',
		},
		{
			id: 2,
			name: 'Remove Event Listeners',
			code: 'window.removeEventListener("resize", this.handleResize);',
			description: 'Detach event listeners to prevent orphaned callbacks',
			icon: '👂',
		},
		{
			id: 3,
			name: 'Unsubscribe from Data Sources',
			code: 'this.subscription.unsubscribe();',
			description: 'Close open data streams and subscriptions',
			icon: '📡',
		},
		{
			id: 4,
			name: 'Cancel Network Requests',
			code: 'this.abortController.abort();',
			description:
				'Abort pending HTTP requests to prevent state updates after unmount',
			icon: '🌐',
		},
	];

	// Helper to determine cleanup status based on the last relevant message
	const lastCleanupStatus = (() => {
		const reversed = [...lifecycleMessages].reverse();
		return reversed.find(
			(msg) =>
				msg.text.includes('All resources properly cleaned up.') ||
				msg.text.includes('without cleanup')
		);
	})();
	const cleanupStatus = lastCleanupStatus
		? lastCleanupStatus.text.includes('All resources properly cleaned up.')
			? 'cleaned'
			: lastCleanupStatus.text.includes('without cleanup')
			? 'not_cleaned'
			: null
		: null;

	return (
		<div className='chapter'>
		<ChapterIntro
			chapterNumber={3}
			title='The Farewell Ceremony'
			bridge='As twilight fell over the Lifecycle Sanctum, Chronos led Aria to a quieter chamber where components came to complete their final ritual - the graceful art of saying goodbye.'
		/>

		<StorySection
			paragraphs={[
				<>"Not all components live forever," Chronos said solemnly. "When their purpose is fulfilled or they're no longer needed, they must depart through the <strong>Unmounting</strong> phase. But a component's true character is revealed in how it says farewell."</>,
				`Binary's usual bouncing slowed to a gentle float. "This is the important part, Aria. Components that don't clean up after themselves leave behind ghost timers, phantom listeners, and memory leaks that haunt the kingdom!"`,
				`Aria shuddered. "Ghost timers? That sounds terrible!"`,
				<>"Indeed," Chronos nodded gravely. "That's why we have <strong>componentWillUnmount</strong> - a component's last chance to clean up its affairs, cancel subscriptions, clear timers, and remove event listeners before departing."</>
			]}
		/>

		<CodeExample
					title="The Farewell Protocol"
					discoveredBy="A cautionary tale from Chronos"
					code={`// Aria learns the importance of cleanup
class TimerComponent extends React.Component {
constructor(props) {
super(props);
this.state = { seconds: 0 };
}

componentDidMount() {
// Start a timer when the component mounts
this.intervalId = setInterval(() => {
this.setState(prevState => ({
seconds: prevState.seconds + 1
}));
}, 1000);

console.log("Timer started!");
}

componentWillUnmount() {
// Clean up the timer when the component unmounts
clearInterval(this.intervalId);
console.log("Timer cleaned up!");
}

render() {
return <div>Timer: {this.state.seconds} seconds</div>;
}
}`}
			/>

		<StorySection
			paragraphs={[
				`"See how the TimerComponent remembers to clear its interval?" Chronos pointed to the code. "Without this cleanup, the timer would continue ticking forever, even after the component is gone - a ghost in the machine!"`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Cleanup Crystal
				</h3>
				<InstructionBox character="Chronos presents a special crystal that glows with active resources.">
					"This crystal will show you what happens when components leave 
					responsibly versus carelessly. Watch the difference between proper 
					cleanup and... the alternative."
				</InstructionBox>

				<div className='lifecycle-demo'>
					<div
						className='component-visualization'
						style={{ height: '200px' }}>
						{!isComponentBorn && !isComponentRetired ? (
							<div className='component-unborn'>
								<p>
									ResourceComponent waiting to be created...
								</p>
							</div>
						) : isComponentBorn && !isComponentRetired ? (
							<div className='component-active'>
								<div className='component-header'>
									<h4>ResourceComponent</h4>
								</div>
								<div
									className='component-body'
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}>
									<div style={{ marginBottom: '10px' }}>
										<span style={{ fontWeight: 'bold' }}>
											Active Resources:
										</span>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-around',
											width: '100%',
											flexWrap: 'wrap',
											gap: '8px',
										}}>
										{cleanupTasks.map((task) => (
											<div
												key={task.id}
												style={{
													padding: '8px',
													borderRadius: '4px',
													background: '#f0f9ff',
													border: '1px solid #3498db',
													display: 'flex',
													alignItems: 'center',
													gap: '5px',
													fontSize: '0.9em',
													animation:
														'pulse 2s infinite',
												}}>
												<span
													role='img'
													aria-label={task.name}>
													{task.icon}
												</span>
												{task.name.split(' ')[0]}
											</div>
										))}
									</div>
									<p
										style={{
											fontSize: '0.8em',
											marginTop: '10px',
											fontStyle: 'italic',
										}}>
										Resources active for {componentAge}{' '}
										{componentAge === 1
											? 'second'
											: 'seconds'}
									</p>
								</div>
							</div>
						) : (
							<div
								className={`component-retired${
									cleanupStatus === 'cleaned'
										? ' cleaned'
										: ''
								}`}>
								<p>ResourceComponent has been unmounted.</p>
								<p
									style={{
										fontSize: '0.9em',
										marginTop: '10px',
									}}>
									{cleanupStatus === 'not_cleaned'
										? '⚠️ Warning: Resources were not properly cleaned up!'
										: cleanupStatus === 'cleaned'
										? '✅ All resources were properly cleaned up.'
										: ''}
								</p>
							</div>
						)}
					</div>

					<div
						style={{
							marginTop: '30px',
							backgroundColor: '#fff',
							border: '1px solid #e0e0e0',
							borderRadius: '8px',
							padding: '15px',
							marginBottom: '20px',
						}}>
						<h4 style={{ margin: '0 0 15px 0' }}>
							Resource Cleanup Visualization
						</h4>
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: '15px',
							}}>
							{cleanupTasks.map((task) => (
								<div
									key={task.id}
									style={{
										flex: '1 1 45%',
										minWidth: '250px',
										position: 'relative',
										padding: '12px',
										borderRadius: '6px',
										border: '1px solid #e0e0e0',
										backgroundColor:
											isComponentBorn &&
											!isComponentRetired
												? '#e6f7ff'
												: cleanupStatus === 'cleaned'
												? '#e6ffe6'
												: cleanupStatus ===
												  'not_cleaned'
												? '#ffe6e6'
												: '#f9f9f9',
										transition: 'all 0.3s ease',
									}}>
									<div
										style={{
											display: 'flex',
											justifyContent: 'flex-start',
											alignItems: 'center',
											gap: '10px',
											marginBottom: '8px',
										}}>
										<span
											style={{
												fontSize: '1.5em',
												opacity: isComponentBorn
													? 1
													: 0.5,
											}}>
											{task.icon}
										</span>
										<div>
											<h5 style={{ margin: '0 0 5px 0' }}>
												{task.name}
											</h5>
											<div
												style={{
													fontSize: '0.8em',
													color: '#666',
													fontFamily: 'monospace',
													backgroundColor: '#f0f0f0',
													padding: '4px 8px',
													borderRadius: '4px',
													marginBottom: '5px',
												}}>
												{task.code}
											</div>
										</div>
									</div>
									<div
										style={{
											width: '100%',
											height: '6px',
											backgroundColor: '#f0f0f0',
											borderRadius: '3px',
											overflow: 'hidden',
										}}>
										<div
											style={{
												width:
													isComponentBorn &&
													!isComponentRetired
														? '100%'
														: cleanupStatus ===
														  'cleaned'
														? '0%'
														: cleanupStatus ===
														  'not_cleaned'
														? '100%'
														: '100%',
												height: '100%',
												backgroundColor:
													isComponentBorn &&
													!isComponentRetired
														? '#3498db'
														: cleanupStatus ===
														  'cleaned'
														? 'transparent'
														: cleanupStatus ===
														  'not_cleaned'
														? '#e74c3c'
														: '#e74c3c',
												transition: 'width 1s ease',
											}}
										/>
									</div>
									<div
										style={{
											fontSize: '0.75em',
											color:
												cleanupStatus === 'not_cleaned'
													? '#e74c3c'
													: '#666',
											marginTop: '5px',
										}}>
										{!isComponentBorn
											? 'Inactive'
											: isComponentBorn &&
											  !isComponentRetired
											? 'Active and consuming resources'
											: cleanupStatus === 'cleaned'
											? 'Properly cleaned up'
											: cleanupStatus === 'not_cleaned'
											? 'Still running in background! Memory leak!'
											: ''}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='lifecycle-controls'>
						<button
							onClick={birthComponent}
							disabled={isComponentBorn}
							className='lifecycle-button mount-button'>
							Create ResourceComponent
						</button>
						<button
							onClick={updateComponent}
							disabled={!isComponentBorn || isComponentRetired}
							className='lifecycle-button update-button'>
							Simulate Resource Activity
						</button>
						<button
							onClick={() => retireComponent()}
							disabled={!isComponentBorn || isComponentRetired}
							className='lifecycle-button unmount-button'>
							Unmount Component
						</button>
						<button
							onClick={() => {
								if (isComponentBorn && !isComponentRetired) {
									retireComponent(true);
								}
							}}
							disabled={!isComponentBorn || isComponentRetired}
							className='lifecycle-button unmount-button'
							style={{ backgroundColor: '#f39c12' }}>
							Unmount Without Cleanup
						</button>
						<button
							onClick={resetDemo}
							className='lifecycle-button reset-button'>
							Reset Demo
						</button>
					</div>

					<div className='lifecycle-log'>
						<h4>Component Lifecycle Log:</h4>
						<div className='log-entries'>
							{lifecycleMessages.length === 0 ? (
								<p className='empty-log'>
									No lifecycle events yet. Start by creating
									the component.
								</p>
							) : (
								lifecycleMessages.map((message) => (
									<div
										key={message.id}
										className='log-entry'
										style={{
											color:
												message.text.includes(
													'memory leak'
												) ||
												message.text.includes(
													'without cleanup'
												)
													? '#e74c3c'
													: 'inherit',
										}}>
										{message.text}
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Common Cleanup Tasks in componentWillUnmount
				</h3>
				<InstructionBox character="Chronos reveals the essential cleanup patterns.">
					These are the most common resources that need to be cleaned up when a component unmounts.
				</InstructionBox>

				<div className='cleanup-tasks-grid'>
					<div className='cleanup-card'>
						<h4>Cancel Timers</h4>
						<pre>{`componentWillUnmount() {
clearTimeout(this.timeoutId);
clearInterval(this.intervalId);
}`}</pre>
						<p>
							Cancel any setTimeout or setInterval calls to
							prevent them from running after the component is
							gone.
						</p>
					</div>

					<div className='cleanup-card'>
						<h4>Remove Event Listeners</h4>
						<pre>{`componentWillUnmount() {
window.removeEventListener(
'resize', 
this.handleResize
);
}`}</pre>
						<p>
							Remove any event listeners added to the window,
							document, or other elements outside the component.
						</p>
					</div>

					<div className='cleanup-card'>
						<h4>Unsubscribe from External Sources</h4>
						<pre>{`componentWillUnmount() {
this.subscription.unsubscribe();
}`}</pre>
						<p>
							End subscriptions to data services, WebSockets, or
							observables to prevent memory leaks.
						</p>
					</div>

					<div className='cleanup-card'>
						<h4>Cancel Network Requests</h4>
						<pre>{`componentWillUnmount() {
this.abortController.abort();
}`}</pre>
						<p>
							Abort any pending fetch or axios requests to prevent
							state updates after unmounting.
						</p>
					</div>
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: 'The Unmounting Lesson:',
					content:
						'The unmounting phase gives components a chance to clean up before they\'re removed from the DOM. The componentWillUnmount method is called just before a component is destroyed, making it the perfect place to remove event listeners, clear timers, and cancel subscriptions. Proper cleanup prevents memory leaks and ensures your app runs smoothly even as components come and go. As Chronos warns: "A component that doesn\'t clean up after itself is like a guest who never leaves the party!"',
				}}
				reflectionQuestions={[
					'How does the "ghost timer" metaphor help you remember the importance of cleanup?',
					'What types of resources might a component need to clean up in a real application?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 7 (Evening)",
					content:
						"Today's final lesson was sobering but crucial. Components must be responsible citizens of the React Kingdom! When they leave, they must clean up after themselves - cancel timers, remove listeners, abort requests. Chronos showed me what happens when components don't clean up... it wasn't pretty. Ghost timers everywhere!",
				}}
				chapterEnding={[
					'As the stars appeared above the Lifecycle Sanctum, Chronos placed a gentle hand on Aria\'s shoulder. "You\'ve learned well today, young apprentice. You now understand the sacred rhythm of component life - from birth through growth to graceful departure."',
					'Binary spun in a happy circle. "You did it, Aria! You\'ve completed your training in the fundamental arts of React!"',
					'"But this is just the beginning," Chronos smiled mysteriously. "Tomorrow, you\'ll journey to the Eastern Quarter to meet the State Sorcerers. They\'ll teach you how to give your components memory and the power to change over time."',
					'Aria clutched her journal tightly, excited for the adventures ahead. She had mastered components, props, JSX, and lifecycles. She was ready for the next chapter of her journey!',
				]}
			/>
		</div>
	);
};

export default ChapterThree;
