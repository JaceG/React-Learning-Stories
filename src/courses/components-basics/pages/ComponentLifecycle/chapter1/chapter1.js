const ChapterOne = ({
	birthComponent,
	updateComponent,
	retireComponent,
	resetDemo,
	isComponentBorn,
	isComponentRetired,
	componentAge,
	lifecycleMessages,
}) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Component Life Stages
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the Component Kingdom, every component went through a
					life journey from birth to retirement. The royal historians
					documented these journeys, noting how components behaved at
					each stage.
				</p>

				<p className='story-paragraph'>
					"Just as humans have a lifecycle, so too do our components,"
					explained the wise Elder Component. "They are born, they
					grow and change, and eventually, they retire from the DOM."
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
					These lifecycle methods gave components the ability to run
					code at specific moments in their existence. Components
					could prepare themselves when entering the world, respond to
					changes during their lifetime, and clean up after themselves
					before departing.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Component Lifecycle Simulation
				</h3>
				<p className='instruction'>
					Control the lifecycle of a component by clicking the buttons
					below. Watch what happens during each phase of its
					existence.
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
					fetching or cleanup) should occur.
				</p>
			</div>
			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the component lifecycle metaphor help you
					understand React's component stages?
				</p>
				<p>
					When might you need to use lifecycle methods in your own
					components?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
