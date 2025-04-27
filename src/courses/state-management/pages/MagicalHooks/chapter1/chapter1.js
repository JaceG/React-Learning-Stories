const ChapterOne = ({ currentState, handleStateChange }) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Enchanted Potion of useState
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the mystical land of React, there lived a young wizard
					named <strong>Hooker</strong> who was learning the art of
					state sorcery. His mentor, an ancient sage named{' '}
					<strong>useState</strong>, had shown him a magical potion
					that could remember values and trigger re-renders when those
					values changed.
				</p>

				<div className='potion-illustration'>
					<div className='potion-bottle'>
						<div
							className='potion-liquid'
							style={{ height: `${currentState * 10}%` }}>
							<span className='potion-value'>{currentState}</span>
						</div>
						<div className='potion-label'>State Potion</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Remember, young wizard," said <strong>useState</strong>,
					"this potion has two magical properties. First, it{' '}
					<em>preserves</em> information between renders. Second, when
					you change its contents using the setter function, it{' '}
					<em>triggers</em> a re-render of your component."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Potion of Change
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Adjust the state value using the buttons below to
							see how the component re-renders when state changes!
						</strong>
					</p>
				</div>

				<div className='magic-controls'>
					<button
						className='magic-button decrease'
						onClick={() => handleStateChange(currentState - 1)}
						disabled={currentState <= 0}>
						Decrease Value
					</button>
					<div className='current-state'>
						Current state:{' '}
						<span className='state-value'>{currentState}</span>
					</div>
					<button
						className='magic-button increase'
						onClick={() => handleStateChange(currentState + 1)}
						disabled={currentState >= 10}>
						Increase Value
					</button>
				</div>

				<div className='code-visualization'>
					<pre className='magical-code'>
						{`// This is how useState works
function PotionComponent() {
  // Declare a state variable named "potionLevel" with initial value of ${currentState}
  const [potionLevel, setPotionLevel] = useState(${currentState});

  // Functions to update the state
  const addIngredient = () => {
    setPotionLevel(potionLevel + 1);  // This causes a re-render!
  };

  const removeIngredient = () => {
    setPotionLevel(potionLevel - 1);  // This also causes a re-render!
  };

  // The component re-renders when state changes
  return (
    <div>
      <h2>Potion Level: {potionLevel}</h2>
      <button onClick={removeIngredient}>Remove</button>
      <button onClick={addIngredient}>Add</button>
    </div>
  );
}`}
					</pre>
				</div>
			</div>

			<div className='practical-application'>
				<h3>Practical Usage Patterns:</h3>
				<div className='usage-pattern'>
					<h4>1. Form Input State</h4>
					<pre className='example-code'>
						{`function MagicForm() {
  const [name, setName] = useState("");
  
  return (
    <input 
      value={name} 
      onChange={e => setName(e.target.value)} 
    />
  );
}`}
					</pre>
				</div>
				<div className='usage-pattern'>
					<h4>2. Toggle State</h4>
					<pre className='example-code'>
						{`function MagicSwitch() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}`}
					</pre>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The useState Lesson:</h3>
				<p>
					The useState hook is your spell for component memory. It
					returns two values: the current state and a function to
					update it. Every time this update function is called, React
					will re-render the component with the new state value. The
					useState hook can store any type of data: numbers, strings,
					booleans, objects, arrays, or even functions. This powerful
					yet simple hook forms the foundation of React's state
					management capabilities and is essential for creating
					dynamic, interactive applications.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the potion metaphor help you understand the concept
					of state in React?
				</p>
				<p>
					Why is it important that state changes trigger re-renders?
					What would happen if they didn't?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
