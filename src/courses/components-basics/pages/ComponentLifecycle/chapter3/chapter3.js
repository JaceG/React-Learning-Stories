const ChapterThree = ({
	birthComponent,
	updateComponent,
	retireComponent,
	resetDemo,
	isComponentBorn,
	isComponentRetired,
	componentAge,
	lifecycleMessages,
	addLifecycleMessage,
}) => {
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

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 3: The Farewell Ceremony</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Not all components lived forever in the Component Kingdom.
					When a component was no longer needed, it would go through
					an Unmounting phase – a graceful farewell ceremony where it
					could clean up after itself before departing.
				</p>

				<p className='story-paragraph'>
					"The mark of a truly noble component," said the Elder, "is
					how it behaves when it's time to leave. A well-crafted
					component cleans up all its connections, cancels any pending
					operations, and says goodbye without leaving a mess behind."
				</p>

				<div className='code-example'>
					<pre>{`class TimerComponent extends React.Component {
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
}`}</pre>
				</div>

				<p className='story-paragraph'>
					In this example, the TimerComponent started an interval when
					it mounted, which would continue to run even if the
					component was removed from the DOM. By implementing
					componentWillUnmount, the component ensured that the timer
					was properly cleaned up, preventing memory leaks and
					unexpected behavior.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Unmounting Cleanup Ceremony
				</h3>
				<p className='instruction'>
					Witness the importance of proper cleanup during the
					unmounting phase. Create a component with active resources,
					then unmount it to see what happens when cleanup is
					performed correctly versus incorrectly.
				</p>

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
							<div className='component-retired'>
								<p>ResourceComponent has been unmounted.</p>
								<p
									style={{
										fontSize: '0.9em',
										marginTop: '10px',
									}}>
									{lifecycleMessages.some((msg) =>
										msg.text.includes('without cleanup')
									)
										? '⚠️ Warning: Resources were not properly cleaned up!'
										: '✅ All resources were properly cleaned up.'}
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
												: isComponentRetired &&
												  lifecycleMessages.some(
														(msg) =>
															msg.text.includes(
																'componentWillUnmount'
															) &&
															!msg.text.includes(
																'without cleanup'
															)
												  )
												? '#e6ffe6'
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
														: isComponentRetired &&
														  lifecycleMessages.some(
																(msg) =>
																	msg.text.includes(
																		'componentWillUnmount'
																	) &&
																	!msg.text.includes(
																		'without cleanup'
																	)
														  )
														? '0%'
														: '100%',
												height: '100%',
												backgroundColor:
													isComponentBorn &&
													!isComponentRetired
														? '#3498db'
														: isComponentRetired &&
														  lifecycleMessages.some(
																(msg) =>
																	msg.text.includes(
																		'componentWillUnmount'
																	) &&
																	!msg.text.includes(
																		'without cleanup'
																	)
														  )
														? 'transparent'
														: '#e74c3c',
												transition: 'width 1s ease',
											}}
										/>
									</div>
									<div
										style={{
											fontSize: '0.75em',
											color:
												isComponentRetired &&
												lifecycleMessages.some(
													(msg) =>
														msg.text.includes(
															'componentWillUnmount'
														) &&
														msg.text.includes(
															'without cleanup'
														)
												)
													? '#e74c3c'
													: '#666',
											marginTop: '5px',
										}}>
										{!isComponentBorn
											? 'Inactive'
											: isComponentBorn &&
											  !isComponentRetired
											? 'Active and consuming resources'
											: isComponentRetired &&
											  lifecycleMessages.some(
													(msg) =>
														msg.text.includes(
															'componentWillUnmount'
														) &&
														!msg.text.includes(
															'without cleanup'
														)
											  )
											? 'Properly cleaned up'
											: 'Still running in background! Memory leak!'}
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
							onClick={retireComponent}
							disabled={!isComponentBorn || isComponentRetired}
							className='lifecycle-button unmount-button'>
							Unmount Component
						</button>
						<button
							onClick={() => {
								if (isComponentBorn && !isComponentRetired) {
									// Add a custom message before retiring the component
									addLifecycleMessage(
										'Component unmounting without cleanup...this will cause memory leaks!'
									);
									retireComponent();
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

			<div className='lesson-insight'>
				<h3>The Unmounting Lesson:</h3>
				<p>
					The unmounting phase gives components a chance to clean up
					before they're removed from the DOM. The
					componentWillUnmount method is called just before a
					component is destroyed, making it the perfect place to
					remove event listeners, clear timers, and cancel
					subscriptions. Proper cleanup prevents memory leaks and
					ensures your app runs smoothly even as components come and
					go.
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;
