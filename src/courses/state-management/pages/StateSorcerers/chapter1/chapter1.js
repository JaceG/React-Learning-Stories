const ChapterOne = ({
	count,
	incrementCount,
	showCounterCode,
	setShowCounterCode,
}) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: The Memory Keepers</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Within the Component Kingdom lived a special class of
					citizens known as the State Sorcerers. These powerful
					entities had the unique ability to remember things and
					change over time.
				</p>

				<div className='sorcerer-illustration'>
					<div className='sorcerer'>
						<div className='sorcerer-head'></div>
						<div className='sorcerer-body'></div>
						<div className='sorcerer-staff'>
							<div className='staff-orb'></div>
						</div>
					</div>
					<div className='memory-orbs'>
						<div className='memory-orb'>count: 0</div>
						<div className='memory-orb'>name: ""</div>
						<div className='memory-orb'>isActive: false</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Unlike ordinary Components," explained the Council Elder,
					"State Sorcerers possess magical orbs that store memories.
					These memories persist between renderings, allowing the
					Sorcerers to remember past interactions and change their
					appearance accordingly."
				</p>

				<p className='story-paragraph'>
					A young apprentice named Counter was learning the ways of
					state magic. His mentor handed him a mysterious hook called
					useState.
				</p>

				<div className='code-example'>
					<pre>{`function Counter() {
// The useState spell creates a magical memory
const [count, setCount] = useState(0);

return (
<div>
<p>You clicked {count} times</p>
<button onClick={() => setCount(count + 1)}>
Click me
</button>
</div>
);
}`}</pre>
				</div>

				<p className='story-paragraph'>
					"With this hook," the mentor explained, "you can create a
					memory that persists between renderings. The first value is
					what you remember, and the second is a spell to change that
					memory."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Counter Spell
				</h3>
				<p className='instruction'>
					Try clicking the button below to see state magic in action.
					Each click updates the count state!
				</p>

				<div className='counter-demo'>
					<div className='counter-display'>
						<div className='count-value'>{count}</div>
						<div className='count-label'>Click Count</div>
					</div>

					<button className='counter-button' onClick={incrementCount}>
						Increment Count
					</button>

					<button
						className='toggle-code-button'
						onClick={() => setShowCounterCode(!showCounterCode)}>
						{showCounterCode ? 'Hide Code' : 'Show Code'}
					</button>

					{showCounterCode && (
						<div className='code-display'>
							<pre>{`function CounterDemo() {
// State declaration using useState hook
const [count, setCount] = useState(${count});

// Event handler to update state
const incrementCount = () => {
setCount(count + 1);
};

return (
<div>
<div className="count-value">{count}</div>
<button onClick={incrementCount}>
Increment Count
</button>
</div>
);
}`}</pre>
						</div>
					)}
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The State Lesson:</h3>
				<p>
					State in React is like a component's memory. It allows
					components to remember information and change over time in
					response to user actions, network responses, or anything
					else. When state changes, React automatically updates the UI
					to reflect those changes. The useState hook provides a way
					to add state to functional components, returning a pair: the
					current state value and a function to update it.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the idea of state as magical memory help you
					understand how React components remember things?
				</p>
				<p>
					Why is it important that state changes cause the UI to
					update automatically?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
