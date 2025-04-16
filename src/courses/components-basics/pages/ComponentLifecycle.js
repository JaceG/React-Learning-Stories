import React, { useState } from 'react';
import '../../CourseStyles.css';
import './ComponentLifecycle.css';
import LessonNavigation from '../../../components/layout/LessonNavigation';

function ComponentLifecycle() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [isComponentBorn, setIsComponentBorn] = useState(false);
	const [componentAge, setComponentAge] = useState(0);
	const [isComponentRetired, setIsComponentRetired] = useState(false);
	const [lifecycleMessages, setLifecycleMessages] = useState([]);

	// Function to simulate component birth (mounting)
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

	// Function to simulate component update
	const updateComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			setComponentAge(componentAge + 1);
			addLifecycleMessage(
				`Component is updated! Age is now ${componentAge + 1}.`
			);
			addLifecycleMessage(
				'Component runs componentDidUpdate after changes.'
			);
		}
	};

	// Function to simulate component retirement (unmounting)
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

	// Function to reset the simulation
	const resetDemo = () => {
		setIsComponentBorn(false);
		setComponentAge(0);
		setIsComponentRetired(false);
		setLifecycleMessages([]);
	};

	// Helper to add messages to the lifecycle log
	const addLifecycleMessage = (message) => {
		setLifecycleMessages((prev) => [
			...prev,
			{ text: message, id: Date.now() },
		]);
	};

	// Navigation functions
	const nextChapter = () => {
		if (currentChapter < 3) {
			setCurrentChapter(currentChapter + 1);
		}
	};

	const prevChapter = () => {
		if (currentChapter > 1) {
			setCurrentChapter(currentChapter - 1);
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Lifecycle Chronicles</h1>
			<p className='lesson-subtitle'>
				The journey of a component from birth to retirement
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Chapter 1: The Component Life Stages */}
			{currentChapter === 1 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 1: The Component Life Stages
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							In the Component Kingdom, every component went
							through a life journey from birth to retirement. The
							royal historians documented these journeys, noting
							how components behaved at each stage.
						</p>

						<p className='story-paragraph'>
							"Just as humans have a lifecycle, so too do our
							components," explained the wise Elder Component.
							"They are born, they grow and change, and
							eventually, they retire from the DOM."
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
								<p>
									Component re-renders when props or state
									change
								</p>
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
							These lifecycle methods gave components the ability
							to run code at specific moments in their existence.
							Components could prepare themselves when entering
							the world, respond to changes during their lifetime,
							and clean up after themselves before departing.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>
							Interactive Exercise: Component Lifecycle Simulation
						</h3>
						<p className='instruction'>
							Control the lifecycle of a component by clicking the
							buttons below. Watch what happens during each phase
							of its existence.
						</p>

						<div className='lifecycle-demo'>
							<div className='component-visualization'>
								{!isComponentBorn && !isComponentRetired ? (
									<div className='component-unborn'>
										<p>
											Component waiting to be created...
										</p>
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
									disabled={
										!isComponentBorn || isComponentRetired
									}
									className='lifecycle-button update-button'>
									Update Component
								</button>
								<button
									onClick={retireComponent}
									disabled={
										!isComponentBorn || isComponentRetired
									}
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
											No lifecycle events yet. Try
											mounting the component.
										</p>
									) : (
										lifecycleMessages.map((message) => (
											<div
												key={message.id}
												className='log-entry'>
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
							Every React component goes through a series of
							lifecycle stages: mounting (birth), updating
							(growth), and unmounting (retirement). React
							provides special methods that run at each stage,
							allowing you to execute code at precise moments in a
							component's life. Understanding this lifecycle is
							crucial for controlling when certain operations
							(like data fetching or cleanup) should occur.
						</p>
					</div>
				</div>
			)}

			{/* Chapter 2: The Mount and Update Chronicles */}
			{currentChapter === 2 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 2: The Mount and Update Chronicles
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							The Royal Component Library contained ancient
							scrolls detailing the most important moments in a
							component's life. The two most active phases were
							the Mounting and Updating phases, where components
							would establish themselves and adapt to changes.
						</p>

						<p className='story-paragraph'>
							The Mounting phase was like the birth of a
							component. First, the constructor would prepare the
							initial state and bind event handlers. Then the
							render method would describe how the component
							should appear. Finally, componentDidMount would run
							after the component was fully born, ready to fetch
							data or interact with the DOM.
						</p>

						<div className='code-example'>
							<pre>{`class MountingComponent extends React.Component {
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
}`}</pre>
						</div>

						<p className='story-paragraph'>
							The Updating phase would occur whenever props
							changed or state was updated. The component would
							first decide if it needed to re-render using
							shouldComponentUpdate. If so, it would render again,
							and then componentDidUpdate would run to handle any
							side effects of the change.
						</p>

						<div className='code-example'>
							<pre>{`componentDidUpdate(prevProps, prevState) {
  // This runs after a re-render from state or prop changes
  console.log("ComponentDidUpdate: Component was just updated");
  
  // We can compare previous and current props/state
  if (prevProps.userId !== this.props.userId) {
    // Only fetch new user data if the userId changed
    this.fetchUserData(this.props.userId);
  }
}`}</pre>
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
									<td>
										Setting up initial state, binding
										methods
									</td>
								</tr>
								<tr>
									<td>render()</td>
									<td>During mounting and updating</td>
									<td>Returning JSX to describe the UI</td>
								</tr>
								<tr>
									<td>componentDidMount()</td>
									<td>After mounting</td>
									<td>
										API calls, DOM manipulation,
										subscriptions
									</td>
								</tr>
								<tr>
									<td>shouldComponentUpdate()</td>
									<td>Before updating</td>
									<td>
										Performance optimization by skipping
										renders
									</td>
								</tr>
								<tr>
									<td>componentDidUpdate()</td>
									<td>After updating</td>
									<td>
										Responding to prop/state changes,
										network requests
									</td>
								</tr>
								<tr>
									<td>componentWillUnmount()</td>
									<td>Before unmounting</td>
									<td>
										Cleanup (cancel timers, subscriptions,
										etc.)
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className='lesson-insight'>
						<h3>The Mount and Update Lesson:</h3>
						<p>
							The mounting and updating phases are where most of a
							component's work happens. Mounting methods like
							constructor and componentDidMount are perfect for
							initialization and setup, while updating methods
							like componentDidUpdate let you respond to changes.
							By understanding when each method is called, you can
							ensure that your code runs at the optimal time in a
							component's lifecycle.
						</p>
					</div>
				</div>
			)}

			{/* Chapter 3: The Farewell Ceremony */}
			{currentChapter === 3 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 3: The Farewell Ceremony
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							Not all components lived forever in the Component
							Kingdom. When a component was no longer needed, it
							would go through an Unmounting phase – a graceful
							farewell ceremony where it could clean up after
							itself before departing.
						</p>

						<p className='story-paragraph'>
							"The mark of a truly noble component," said the
							Elder, "is how it behaves when it's time to leave. A
							well-crafted component cleans up all its
							connections, cancels any pending operations, and
							says goodbye without leaving a mess behind."
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
							In this example, the TimerComponent started an
							interval when it mounted, which would continue to
							run even if the component was removed from the DOM.
							By implementing componentWillUnmount, the component
							ensured that the timer was properly cleaned up,
							preventing memory leaks and unexpected behavior.
						</p>
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
									Cancel any setTimeout or setInterval calls
									to prevent them from running after the
									component is gone.
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
									Remove any event listeners added to the
									window, document, or other elements outside
									the component.
								</p>
							</div>

							<div className='cleanup-card'>
								<h4>Unsubscribe from External Sources</h4>
								<pre>{`componentWillUnmount() {
  this.subscription.unsubscribe();
}`}</pre>
								<p>
									End subscriptions to data services,
									WebSockets, or observables to prevent memory
									leaks.
								</p>
							</div>

							<div className='cleanup-card'>
								<h4>Cancel Network Requests</h4>
								<pre>{`componentWillUnmount() {
  this.abortController.abort();
}`}</pre>
								<p>
									Abort any pending fetch or axios requests to
									prevent state updates after unmounting.
								</p>
							</div>
						</div>
					</div>

					<div className='lesson-insight'>
						<h3>The Unmounting Lesson:</h3>
						<p>
							The unmounting phase gives components a chance to
							clean up before they're removed from the DOM. The
							componentWillUnmount method is called just before a
							component is destroyed, making it the perfect place
							to remove event listeners, clear timers, and cancel
							subscriptions. Proper cleanup prevents memory leaks
							and ensures your app runs smoothly even as
							components come and go.
						</p>
					</div>
				</div>
			)}

			<LessonNavigation
				courseId='components-basics'
				lessonId='component-lifecycle'
			/>
		</div>
	);
}

export default ComponentLifecycle;
