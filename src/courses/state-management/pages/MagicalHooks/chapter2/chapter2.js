const ChapterTwo = ({ effectCount, effectDependency, toggleDependency }) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Mystical Spell of useEffect
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					As young wizard <strong>Hooker</strong> continued his
					training, his mentor introduced him to a more advanced spell
					known as <strong>useEffect</strong>. This powerful
					incantation allowed wizards to perform side effects in their
					components - actions that reached beyond the React realm
					into the outside world.
				</p>

				<div className='spell-illustration'>
					<div className='spell-circle'>
						<div className='spell-core'>
							<div
								className='dependency-orb'
								onClick={toggleDependency}>
								{effectDependency ? 'Active' : 'Inactive'}
							</div>
						</div>
						<div
							className='spell-aura'
							style={{ opacity: effectCount * 0.2 }}>
							<div className='effect-count'>
								Effects: {effectCount}
							</div>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Be cautious with this spell," warned his mentor. "The{' '}
					<strong>useEffect</strong> enchantment has tremendous power.
					It creates magical side effects that occur after your
					component renders. But these effects need careful control
					with dependency arrays, or they may trigger more often than
					you intend."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Effect Spell
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Click the dependency orb above to toggle its state
							and observe how the useEffect reacts! The spell aura
							grows stronger with each effect execution.
						</strong>
					</p>
				</div>

				<div className='effect-controls'>
					<div className='effect-info'>
						<div className='info-box'>
							<h4>Effect Triggered</h4>
							<div className='count-display'>
								{effectCount} times
							</div>
						</div>
						<div className='info-box'>
							<h4>Dependency State</h4>
							<div className='dependency-display'>
								{effectDependency ? 'True' : 'False'}
							</div>
						</div>
					</div>

					<button className='spell-button' onClick={toggleDependency}>
						Toggle Dependency
					</button>
				</div>

				<div className='code-visualization'>
					<pre className='magical-code'>
						{`// This is how useEffect works
function EffectComponent() {
  // State for our dependency
  const [isActive, setIsActive] = useState(${effectDependency});
  const [effectCount, setEffectCount] = useState(${effectCount});
  
  // This effect runs when the component mounts
  // AND whenever isActive changes
  useEffect(() => {
    // This is the "effect" - a side effect that runs after render
    console.log("The effect spell has been cast!");
    setEffectCount(prevCount => prevCount + 1);
    
    // Optional cleanup function that runs before the next effect
    // or when the component unmounts
    return () => {
      console.log("Cleaning up the previous effect spell");
    };
  }, [isActive]); // This array controls when the effect runs
  
  return (
    <button onClick={() => setIsActive(!isActive)}>
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
}`}
					</pre>
				</div>
			</div>

			<div className='effect-cautions'>
				<h3>Cautions and Best Practices:</h3>
				<ul>
					<li>
						<strong>Missing Dependencies:</strong> Always include
						all values from the component scope that change over
						time and are used by the effect.
					</li>
					<li>
						<strong>Infinite Loops:</strong> Be careful not to
						create infinite loops by updating state in an effect
						without proper dependencies.
					</li>
					<li>
						<strong>Cleanup:</strong> Return a cleanup function from
						your effect to prevent memory leaks.
					</li>
					<li>
						<strong>Multiple Effects:</strong> Use multiple
						useEffect hooks for unrelated logic instead of combining
						everything into one.
					</li>
				</ul>
			</div>

			<div className='lesson-insight'>
				<h3>The useEffect Lesson:</h3>
				<p>
					useEffect is a Hook that lets you perform side effects in
					functional components. Side effects are actions that affect
					something outside the scope of the function being executed,
					such as:
				</p>
				<ul>
					<li>Data fetching</li>
					<li>Setting up subscriptions</li>
					<li>Manually changing the DOM</li>
					<li>Logging</li>
				</ul>
				<p>
					The syntax{' '}
					<code>useEffect(effectFunction, dependencyArray)</code>{' '}
					takes two arguments:
				</p>
				<ol>
					<li>The function containing the effect code</li>
					<li>
						An array of dependencies that determines when the effect
						runs
					</li>
				</ol>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does thinking of useEffect as a "spell with side
					effects" help you understand its role in React?
				</p>
				<p>
					Why is it important to carefully control when effects run
					with the dependency array?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;
