import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [isComponentBorn, setIsComponentBorn] = useState(false);
	const [componentAge, setComponentAge] = useState(0);
	const [isComponentRetired, setIsComponentRetired] = useState(false);
	const [lifecycleMessages, setLifecycleMessages] = useState([]);

	const birthComponent = () => {
		if (!isComponentBorn && !isComponentRetired) {
			setIsComponentBorn(true);
			addLifecycleMessage(
				'constructor() is called: initializing state and binding methods.'
			);
			addLifecycleMessage(
				'render() is called: component describes its UI.'
			);
			addLifecycleMessage(
				'componentDidMount() is called: component is now in the DOM.'
			);
			addLifecycleMessage(
				'Initial API request sent to fetch user data...'
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
					'componentDidUpdate() is called: handling side effects after update.'
				);
				if (prevAge === 0) {
					addLifecycleMessage(
						'User data loaded successfully! Profile now displaying.'
					);
				} else {
					addLifecycleMessage(
						`Profile updated with new user data (update #${
							newAge - 1
						}).`
					);
				}
				return newAge;
			});
		}
	};

	const retireComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			setIsComponentRetired(true);
			addLifecycleMessage(
				'componentWillUnmount() is called: preparing to unmount...'
			);
			addLifecycleMessage(
				'Cleanup tasks performed: canceling network requests, removing event listeners.'
			);
			addLifecycleMessage('Component has been removed from the DOM.');
		}
	};

	const resetDemo = () => {
		setIsComponentBorn(false);
		setComponentAge(0);
		setIsComponentRetired(false);
		setLifecycleMessages([]);
	};

	const addLifecycleMessage = (message) => {
		setLifecycleMessages((prev) => [
			...prev,
			{ id: Date.now() + Math.random(), text: message },
		]);
	};

	// Define the sequence of lifecycle methods
	const mountingMethods = [
		{
			id: 1,
			name: 'constructor',
			phase: 'mounting',
			description: 'Initialize state, bind methods',
		},
		{
			id: 2,
			name: 'render',
			phase: 'mounting',
			description: 'Return JSX to describe UI',
		},
		{
			id: 3,
			name: 'componentDidMount',
			phase: 'mounting',
			description: 'Access DOM, start timers, fetch data',
		},
	];

	const updatingMethods = [
		{
			id: 4,
			name: 'shouldComponentUpdate',
			phase: 'updating',
			description: 'Decide if re-render is needed',
		},
		{
			id: 5,
			name: 'render',
			phase: 'updating',
			description: 'Return updated JSX',
		},
		{
			id: 6,
			name: 'componentDidUpdate',
			phase: 'updating',
			description: 'React to changes, make network requests',
		},
	];

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title='The Mount and Update Chronicles'
				bridge="Chronos led Aria deeper into the Lifecycle Sanctum, where glowing murals depicted the two most active phases of a component's life - the moments of birth and change."
			/>

			<StorySection
				paragraphs={[
					<>"These murals," Chronos explained, gesturing to the luminous walls, "chronicle the <strong>Mounting</strong> and <strong>Updating</strong> phases - the most crucial moments in a component's existence. Watch how they come to life!"</>,
					<>The first mural began to glow, showing a component's birth ritual. "The Mounting phase," Chronos intoned, "follows a sacred sequence. First, the <strong>constructor</strong> awakens, preparing the component's initial state. Then <strong>render</strong> paints its form into existence. Finally, <strong>componentDidMount</strong> brings it fully to life, ready to interact with the world."</>,
					`Binary bounced excitedly. "It's like watching a flower bloom! First the seed (constructor), then the bud (render), then the full bloom (componentDidMount)!"`
				]}
			/>

			<CodeExample
				title="The Mounting Ritual"
				discoveredBy="From Chronos's Sacred Murals"
				code={`class MountingComponent extends React.Component {
constructor(props) {
super(props);
this.state = { isLoading: true };
// This is the first lifecycle method called
console.log("1. Constructor: Component is being initialized");
}

render() {
// This runs second to determine what should be displayed
console.log("2. Render: Component is drawing itself");
return <div>{this.state.isLoading ? "Loading..." : "Data loaded!"}</div>;
}

componentDidMount() {
// This runs after the component is added to the DOM
console.log("3. ComponentDidMount: Component is now in the DOM");
// Perfect place to load data from an API
setTimeout(() => {
this.setState({ isLoading: false });
}, 2000);
}
}`}
			/>

			<StorySection
				paragraphs={[
					<>The second mural shimmered to life, showing components in motion. "The <strong>Updating</strong> phase," Chronos continued, "occurs whenever change flows through a component. First, <strong>shouldComponentUpdate</strong> asks 'Do I need to change?' If yes, <strong>render</strong> repaints the component, and <strong>componentDidUpdate</strong> handles any ripple effects."</>,
					`Aria watched in fascination as the mural showed components gracefully adapting to new data. "So components can evolve without being destroyed and recreated?"`,
					`"Precisely!" Chronos beamed. "That's the beauty of React's lifecycle - efficient transformation without waste."`
				]}
			/>

			<CodeExample
				title="The Update Transformation"
				discoveredBy="Aria's Study Notes"
				code={`componentDidUpdate(prevProps, prevState) {
// This runs after a re-render from state or prop changes
console.log("ComponentDidUpdate: Component was just updated");

// We can compare previous and current props/state
if (prevProps.userId !== this.props.userId) {
// Only fetch new user data if the userId changed
this.fetchUserData(this.props.userId);
}
}`}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Lifecycle Observatory
				</h3>
				<InstructionBox character="Chronos activates a magical observatory.">
					"This device will let you witness the lifecycle methods in action. 
					Watch carefully as components move through their mounting and updating 
					phases in real-time!"
				</InstructionBox>

				<div
					className='lifecycle-demo'
					style={{ position: 'relative' }}>
					{/* Visualization of component with loading state */}
					<div className='component-visualization'>
						{!isComponentBorn && !isComponentRetired ? (
							<div className='component-unborn'>
								<p>Component waiting to be created...</p>
							</div>
						) : isComponentBorn && !isComponentRetired ? (
							<div className='component-active'>
								<div className='component-header'>
									<h4>UserProfileComponent</h4>
								</div>
								<div className='component-body'>
									{componentAge === 0 ? (
										<div style={{ textAlign: 'center' }}>
											<div
												style={{
													display: 'inline-block',
													width: '50px',
													height: '50px',
													borderRadius: '50%',
													background: '#e0e0e0',
													marginBottom: '10px',
												}}></div>
											<p
												style={{
													fontStyle: 'italic',
													color: '#666',
												}}>
												Loading user data...
											</p>
										</div>
									) : (
										<div>
											<div
												style={{ textAlign: 'center' }}>
												<div
													style={{
														display: 'inline-block',
														width: '50px',
														height: '50px',
														borderRadius: '50%',
														background: '#3498db',
														color: 'white',
														lineHeight: '50px',
														fontWeight: 'bold',
														marginBottom: '10px',
													}}>
													JD
												</div>
												<h4 style={{ margin: '5px 0' }}>
													John Doe
												</h4>
												<p>
													Profile updated{' '}
													{componentAge > 1
														? componentAge - 1
														: 0}{' '}
													{componentAge === 2
														? 'time'
														: 'times'}
												</p>
												<p
													style={{
														fontSize: '12px',
														color: '#666',
													}}>
													Last updated:{' '}
													{
														new Date()
															.toLocaleTimeString()
															.split(' ')[0]
													}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						) : (
							<div className='component-retired'>
								<p>Component has been unmounted.</p>
							</div>
						)}
					</div>

					{/* Visual lifecycle method sequence */}
					<div
						style={{
							marginTop: '30px',
							marginBottom: '20px',
							borderRadius: '8px',
							background: '#f8f9fa',
							padding: '15px',
							border: '1px solid #e0e0e0',
						}}>
						<h4 style={{ marginTop: 0, marginBottom: '10px' }}>
							Lifecycle Methods Flow
						</h4>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: '15px',
							}}>
							<div
								style={{
									width: '48%',
									borderRadius: '8px',
									border: '2px solid #27ae60',
									padding: '10px',
								}}>
								<h5
									style={{
										textAlign: 'center',
										margin: '0 0 10px 0',
										color: '#27ae60',
									}}>
									Mounting Phase
								</h5>

								{mountingMethods.map((method) => (
									<div
										key={method.id}
										style={{
											padding: '8px',
											margin: '5px 0',
											borderRadius: '4px',
											backgroundColor:
												isComponentBorn &&
												lifecycleMessages.some((msg) =>
													msg.text
														.toLowerCase()
														.includes(
															method.name.toLowerCase()
														)
												)
													? '#e7f6ef'
													: '#f2f2f2',
											border:
												isComponentBorn &&
												lifecycleMessages.some((msg) =>
													msg.text
														.toLowerCase()
														.includes(
															method.name.toLowerCase()
														)
												)
													? '1px solid #27ae60'
													: '1px solid transparent',
											transition: 'all 0.3s ease',
										}}>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}>
											<span
												style={{
													fontWeight: 'bold',
													fontFamily: 'monospace',
												}}>
												{method.name}()
											</span>
											<span
												style={{
													fontSize: '12px',
													color: '#666',
													maxWidth: '60%',
													textAlign: 'right',
												}}>
												{method.description}
											</span>
										</div>
									</div>
								))}
							</div>

							<div
								style={{
									width: '48%',
									borderRadius: '8px',
									border: '2px solid #3498db',
									padding: '10px',
								}}>
								<h5
									style={{
										textAlign: 'center',
										margin: '0 0 10px 0',
										color: '#3498db',
									}}>
									Updating Phase
								</h5>

								{updatingMethods.map((method) => (
									<div
										key={method.id}
										style={{
											padding: '8px',
											margin: '5px 0',
											borderRadius: '4px',
											backgroundColor:
												isComponentBorn &&
												componentAge > 0 &&
												lifecycleMessages.some(
													(msg) =>
														msg.text
															.toLowerCase()
															.includes(
																method.name.toLowerCase()
															) &&
														(msg.text
															.toLowerCase()
															.includes(
																'update'
															) ||
															method.name.toLowerCase() ===
																'render')
												)
													? '#e6f3fb'
													: '#f2f2f2',
											border:
												isComponentBorn &&
												componentAge > 0 &&
												lifecycleMessages.some(
													(msg) =>
														msg.text
															.toLowerCase()
															.includes(
																method.name.toLowerCase()
															) &&
														(msg.text
															.toLowerCase()
															.includes(
																'update'
															) ||
															method.name.toLowerCase() ===
																'render')
												)
													? '1px solid #3498db'
													: '1px solid transparent',
											transition: 'all 0.3s ease',
										}}>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}>
											<span
												style={{
													fontWeight: 'bold',
													fontFamily: 'monospace',
												}}>
												{method.name}()
											</span>
											<span
												style={{
													fontSize: '12px',
													color: '#666',
													maxWidth: '60%',
													textAlign: 'right',
												}}>
												{method.description}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='lifecycle-controls'>
						<button
							onClick={birthComponent}
							disabled={isComponentBorn}
							className='lifecycle-button mount-button'>
							Mount Component
						</button>
						<button
							onClick={updateComponent}
							disabled={
								!isComponentBorn ||
								isComponentRetired ||
								componentAge < 1
							}
							className='lifecycle-button update-button'>
							Update Component
						</button>
						<button
							onClick={() => {
								// Use our existing update function but customize for the initial data load
								if (
									isComponentBorn &&
									!isComponentRetired &&
									componentAge === 0
								) {
									updateComponent();
								}
							}}
							disabled={
								!isComponentBorn ||
								isComponentRetired ||
								componentAge > 0
							}
							className='lifecycle-button update-button'
							style={{ backgroundColor: '#f39c12' }}>
							Finish Loading Data
						</button>
						<button
							onClick={retireComponent}
							disabled={!isComponentBorn || isComponentRetired}
							className='lifecycle-button unmount-button'>
							Unmount Component
						</button>
						<button
							onClick={resetDemo}
							className='lifecycle-button reset-button'>
							Reset Demo
						</button>
					</div>

					<div className='lifecycle-log'>
						<h4>Lifecycle Method Log:</h4>
						<div className='log-entries'>
							{lifecycleMessages.length === 0 ? (
								<p className='empty-log'>
									No lifecycle events yet. Start by mounting
									the component.
								</p>
							) : (
								lifecycleMessages.map((message) => (
									<div key={message.id} className='log-entry'>
										{message.text}
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='lifecycle-methods-table'>
				<h3>Lifecycle Methods Reference</h3>

				<table className='methods-table'>
					<thead>
						<tr>
							<th>Lifecycle Method</th>
							<th>When It Runs</th>
							<th>Use It For</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>constructor()</td>
							<td>Before mounting</td>
							<td>Setting up initial state, binding methods</td>
						</tr>
						<tr>
							<td>render()</td>
							<td>During mounting and updating</td>
							<td>Returning JSX to describe the UI</td>
						</tr>
						<tr>
							<td>componentDidMount()</td>
							<td>After mounting</td>
							<td>API calls, DOM manipulation, subscriptions</td>
						</tr>
						<tr>
							<td>shouldComponentUpdate()</td>
							<td>Before updating</td>
							<td>
								Performance optimization by skipping renders
							</td>
						</tr>
						<tr>
							<td>componentDidUpdate()</td>
							<td>After updating</td>
							<td>
								Responding to prop/state changes, network
								requests
							</td>
						</tr>
						<tr>
							<td>componentWillUnmount()</td>
							<td>Before unmounting</td>
							<td>
								Cleanup (cancel timers, subscriptions, etc.)
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: 'The Update Lesson:',
					content:
						"The mounting and updating phases are where most of a component's work happens. Mounting methods like constructor and componentDidMount are perfect for initialization and setup, while updating methods like componentDidUpdate let you respond to changes. By understanding when each method is called, you can ensure that your code runs at the optimal time in a component's lifecycle.",
				}}
				reflectionQuestions={[
					'How do mounting and updating methods differ in their purpose?',
					'When would you use componentDidMount vs. componentDidUpdate?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 7 (Afternoon)",
					content:
						"I'm starting to see the pattern! Mounting is like a component being born with a purpose (constructor), showing itself (render), and then taking its first actions (componentDidMount). Updating is like growing and adapting - the component can decide if it needs to change and then react to those changes. It's beautiful how organized it all is!",
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
