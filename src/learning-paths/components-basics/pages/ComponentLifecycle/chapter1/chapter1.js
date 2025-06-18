import { useState } from 'react';

const ChapterOne = () => {
	const [isComponentBorn, setIsComponentBorn] = useState(false);
	const [componentAge, setComponentAge] = useState(0);
	const [isComponentRetired, setIsComponentRetired] = useState(false);
	const [lifecycleMessages, setLifecycleMessages] = useState([]);

	const birthComponent = () => {
		if (!isComponentBorn && !isComponentRetired) {
			setIsComponentBorn(true);
			addLifecycleMessage(
				'Component is born (mounted)! Constructor called.'
			);
			addLifecycleMessage(
				'Component runs setup code in componentDidMount.'
			);
		}
	};

	const updateComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			setComponentAge((prevAge) => {
				const newAge = prevAge + 1;
				addLifecycleMessage(
					`Component is updated! Age is now ${newAge}.`
				);
				addLifecycleMessage(
					'Component runs componentDidUpdate after changes.'
				);
				return newAge;
			});
		}
	};

	const retireComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			setIsComponentRetired(true);
			addLifecycleMessage('Component is retiring...');
			addLifecycleMessage(
				'Component runs cleanup in componentWillUnmount.'
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

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Component Life Stages
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Lifecycle Sanctum was unlike anything Aria had seen. 
					Massive hourglasses floated in the air, each representing a 
					different component's journey through time. An ancient figure 
					approached - <strong>Chronos</strong>, the Master Time Keeper.
				</p>

				<p className='story-paragraph'>
					"Welcome, young Aria," Chronos said, his voice echoing through 
					time itself. "Professor Syntaxis speaks highly of your progress. 
					Today, you'll learn the most fundamental truth of our kingdom: 
					every component has a lifecycle - a journey from creation to 
					destruction."
				</p>
				
				<p className='story-paragraph'>
					Binary appeared beside Aria, bouncing excitedly. "I love this 
					place! Watch - when a component is born, mounted into the DOM, 
					updated with new data, or unmounted from existence, special 
					methods are called. It's like having birthday parties, growth 
					spurts, and retirement ceremonies!"
				</p>

				<div className='lifecycle-diagram'>
					<div className='lifecycle-stage'>
						<div className='lifecycle-icon mounting'></div>
						<h3>Mounting</h3>
						<p>Component enters the DOM</p>
						<ul>
							<li>Constructor</li>
							<li>render</li>
							<li>componentDidMount</li>
						</ul>
					</div>

					<div className='lifecycle-connector'></div>

					<div className='lifecycle-stage'>
						<div className='lifecycle-icon updating'></div>
						<h3>Updating</h3>
						<p>Component re-renders when props or state change</p>
						<ul>
							<li>shouldComponentUpdate</li>
							<li>render</li>
							<li>componentDidUpdate</li>
						</ul>
					</div>

					<div className='lifecycle-connector'></div>

					<div className='lifecycle-stage'>
						<div className='lifecycle-icon unmounting'></div>
						<h3>Unmounting</h3>
						<p>Component leaves the DOM</p>
						<ul>
							<li>componentWillUnmount</li>
						</ul>
					</div>
				</div>

				<p className='story-paragraph'>
					Chronos gestured to the floating hourglasses. "These lifecycle 
					methods are the heartbeat of every component. They allow 
					components to prepare when born, adapt when they change, and 
					gracefully depart when their time ends."
				</p>
				
				<div className='character-intro'>
					<h4>Aria's Journal - Day 7</h4>
					<p>The Lifecycle Sanctum is awe-inspiring! Chronos showed me 
					how every component follows the same pattern: Mounting (birth), 
					Updating (growth), and Unmounting (farewell). It's like watching 
					the entire circle of life, but for React components. Binary keeps 
					making jokes about component "birthdays" - he's so silly!</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Time Keeper's Hourglass
				</h3>
				<p className='instruction'>
					<strong>👉 Chronos hands you a magical hourglass.</strong>
					"This hourglass will let you control a component's lifecycle. 
					Watch carefully as it moves through each stage of existence."
				</p>

				<div className='lifecycle-demo'>
					<div className='component-visualization'>
						{!isComponentBorn && !isComponentRetired ? (
							<div className='component-unborn'>
								<p>Component waiting to be created...</p>
							</div>
						) : isComponentBorn && !isComponentRetired ? (
							<div className='component-active'>
								<div className='component-header'>
									<h4>DemoComponent</h4>
								</div>
								<div className='component-body'>
									<p>Age: {componentAge}</p>
									<p>Status: Active</p>
								</div>
							</div>
						) : (
							<div className='component-retired'>
								<p>Component has been unmounted.</p>
							</div>
						)}
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
							disabled={!isComponentBorn || isComponentRetired}
							className='lifecycle-button update-button'>
							Update Component
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
						<h4>Lifecycle Log:</h4>
						<div className='log-entries'>
							{lifecycleMessages.length === 0 ? (
								<p className='empty-log'>
									No lifecycle events yet. Try mounting the
									component.
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

			<div className='lesson-insight'>
				<h3>The Lifecycle Lesson:</h3>
				<p>
					Every React component goes through a series of lifecycle
					stages: mounting (birth), updating (growth), and unmounting
					(retirement). React provides special methods that run at
					each stage, allowing you to execute code at precise moments
					in a component's life. Understanding this lifecycle is
					crucial for controlling when certain operations (like data
					fetching or cleanup) should occur. As Chronos teaches: 
					"Time is the canvas upon which components paint their purpose."
				</p>
			</div>
			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does Chronos's hourglass metaphor help you visualize 
					the flow of a component's life?
				</p>
				<p>
					Which lifecycle stage (mounting, updating, or unmounting) 
					do you think is most critical for component behavior?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
