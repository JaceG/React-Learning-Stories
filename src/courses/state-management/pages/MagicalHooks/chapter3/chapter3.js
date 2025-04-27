const ChapterThree = ({ memoizedValue, toggleRender, renderCount }) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Advanced Magical Artifacts
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					After mastering the basics of state sorcery and effect
					enchantments, <strong>Hooker</strong> was ready for more
					advanced artifacts. His mentor opened an ancient chest
					containing three powerful tools: <strong>useRef</strong>, a
					crystal that could remember values without triggering
					re-renders; <strong>useMemo</strong>, a potion that could
					cache expensive calculations; and{' '}
					<strong>useCallback</strong>, a scroll that preserved
					function references.
				</p>

				<div className='artifacts-illustration'>
					<div className='artifact-container'>
						<div className='artifact ref-crystal'>
							<div className='artifact-label'>useRef</div>
							<div className='artifact-text'>
								Persists Between Renders
							</div>
						</div>
						<div className='artifact memo-potion'>
							<div className='artifact-label'>useMemo</div>
							<div className='memo-value'>{memoizedValue}</div>
						</div>
						<div className='artifact callback-scroll'>
							<div className='artifact-label'>useCallback</div>
							<div className='artifact-text'>
								Stable Function References
							</div>
						</div>
					</div>
					<div className='render-counter'>
						Component Renders:{' '}
						<span className='render-count'>{renderCount}</span>
					</div>
				</div>

				<p className='story-paragraph'>
					"These artifacts," explained the mentor, "will help you
					optimize your spells. <strong>useRef</strong> lets you
					maintain values that won't cause re-renders when changed.{' '}
					<strong>useMemo</strong> remembers results of complex
					calculations. And <strong>useCallback</strong> preserves
					function identity across re-renders."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Performance Optimization
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Click the button below to trigger a re-render.
							Notice how the memoized calculation doesn't run
							again unless its dependencies change!
						</strong>
					</p>
				</div>

				<div className='optimization-controls'>
					<button className='render-button' onClick={toggleRender}>
						Force Re-render
					</button>
				</div>

				<div className='optimization-insights'>
					<div className='optimization-card'>
						<h4>useRef</h4>
						<pre className='optimization-code'>
							{`// useRef creates a mutable reference that persists across renders
function Timer() {
  // Create a ref to store the interval ID
  const intervalRef = useRef(null);
  
  // Start the timer
  const startTimer = () => {
    // We can store values in .current without causing re-renders
    intervalRef.current = setInterval(() => {
      console.log('Tick');
    }, 1000);
  };
  
  // Stop the timer
  const stopTimer = () => {
    // We can access the value later when needed
    clearInterval(intervalRef.current);
  };
  
  // The ref persists even when the component re-renders
  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}`}
						</pre>
					</div>
					<div className='optimization-card'>
						<h4>useMemo</h4>
						<pre className='optimization-code'>
							{`// useMemo caches expensive calculations
function ExpensiveComponent({ data, filter }) {
  // This calculation only runs when data or filter changes
  const filteredData = useMemo(() => {
    console.log('Filtering data - expensive operation!');
    
    return data.filter(item => {
      // Imagine this is a complex calculation
      return item.name.includes(filter);
    });
  }, [data, filter]); // Dependencies array
  
  return (
    <ul>
      {filteredData.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`}
						</pre>
					</div>
					<div className='optimization-card'>
						<h4>useCallback</h4>
						<pre className='optimization-code'>
							{`// useCallback preserves function references
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Without useCallback, this function would be recreated
  // on every render, causing unnecessary re-renders in ChildComponent
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Empty dependencies - never recreated
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      {/* ChildComponent only re-renders when handleClick changes */}
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

// This component uses React.memo to skip renders when props haven't changed
const ChildComponent = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});`}
						</pre>
					</div>
				</div>
			</div>

			<div className='comparison-section'>
				<h3>When to Use Each Hook:</h3>
				<div className='comparison-table'>
					<div className='comparison-row header'>
						<div className='comparison-cell'>Hook</div>
						<div className='comparison-cell'>Purpose</div>
						<div className='comparison-cell'>Use When</div>
						<div className='comparison-cell'>Example Use Case</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>useRef</div>
						<div className='comparison-cell'>
							Persist mutable values without causing re-renders
						</div>
						<div className='comparison-cell'>
							You need to access DOM elements directly, store
							previous values, or track mutable values that
							shouldn't trigger re-renders
						</div>
						<div className='comparison-cell'>
							Form input focus, storing interval IDs, previous
							state values
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>useMemo</div>
						<div className='comparison-cell'>
							Cache computation results between renders
						</div>
						<div className='comparison-cell'>
							You have expensive calculations that don't need to
							be re-computed unless specific dependencies change
						</div>
						<div className='comparison-cell'>
							Data filtering/sorting, complex calculations,
							derived state
						</div>
					</div>
					<div className='comparison-row'>
						<div className='comparison-cell'>useCallback</div>
						<div className='comparison-cell'>
							Cache function instances between renders
						</div>
						<div className='comparison-cell'>
							You're passing callbacks to optimized child
							components that rely on reference equality to
							prevent unnecessary renders
						</div>
						<div className='comparison-cell'>
							Event handlers passed to pure components, callbacks
							in dependency arrays
						</div>
					</div>
				</div>
			</div>

			<div className='best-practices'>
				<h3>Best Practices:</h3>
				<ul>
					<li>
						<strong>Don't overuse these hooks</strong> - they add
						complexity and should only be used when there's a clear
						performance benefit.
					</li>
					<li>
						<strong>Measure performance before optimizing</strong> -
						use React DevTools Profiler to identify actual
						bottlenecks.
					</li>
					<li>
						<strong>Dependency arrays matter</strong> - missing
						dependencies in useMemo and useCallback can cause subtle
						bugs.
					</li>
					<li>
						<strong>useRef is not just for DOM references</strong> -
						it's useful anytime you need a mutable value that
						persists across renders.
					</li>
				</ul>
			</div>

			<div className='lesson-insight'>
				<h3>The Performance Optimization Lesson:</h3>
				<p>
					These three hooks are primarily used for performance
					optimization and handling specific edge cases in React:
				</p>
				<ul>
					<li>
						<strong>useRef</strong> creates a mutable object with a
						.current property that persists across renders
					</li>
					<li>
						<strong>useMemo</strong> memoizes the result of a
						computation, only recomputing when dependencies change
					</li>
					<li>
						<strong>useCallback</strong> memoizes a function
						definition, preventing it from being recreated on each
						render
					</li>
				</ul>
				<p>
					It's important to remember that premature optimization can
					lead to more complex code. Use these hooks when you have
					identified actual performance issues, not preemptively.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do the metaphors of the crystal (useRef), potion
					(useMemo), and scroll (useCallback) help you understand the
					purposes of these hooks?
				</p>
				<p>
					Can you think of a scenario in your own applications where
					each of these hooks would be beneficial?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;
