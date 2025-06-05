import { useState } from 'react';

const ChapterOne = () => {
	// Custom hook: useCounter
	const useCounter = (initialValue = 0) => {
		const [count, setCount] = useState(initialValue);
		
		const increment = () => setCount(count + 1);
		const decrement = () => setCount(count - 1);
		const reset = () => setCount(initialValue);
		
		return { count, increment, decrement, reset };
	};
	
	// Custom hook: useToggle
	const useToggle = (initialValue = false) => {
		const [value, setValue] = useState(initialValue);
		
		const toggle = () => setValue(!value);
		const setTrue = () => setValue(true);
		const setFalse = () => setValue(false);
		
		return [value, { toggle, setTrue, setFalse }];
	};
	
	// Using our custom hooks
	const counter = useCounter(0);
	const [isForgeOpen, forgeControls] = useToggle(false);

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Hook Forge Basics
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Deep in the <strong>Valley of Code</strong>, there stood an ancient forge
					where Master Craftsman <strong>Reginald</strong> taught the sacred art of 
					hook creation. Unlike regular functions, custom hooks possessed the magical 
					ability to use other hooks within them, creating powerful abstractions 
					that could be reused across the kingdom.
				</p>

				<div className='forge-illustration'>
					<div className={`forge ${isForgeOpen ? 'forge-active' : ''}`}>
						<div className='forge-fire'>🔥</div>
						<div className='forge-anvil'>
							<div className='hook-being-forged'>
								{isForgeOpen ? 'useCustomHook' : 'Closed'}
							</div>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Remember, young apprentice," said Master Reginald, hammering away at 
					his anvil, "A custom hook is just a JavaScript function whose name starts 
					with 'use'. This naming convention tells React that this function follows 
					the <em>Rules of Hooks</em>. Within these hooks, we can use other hooks 
					like useState, useEffect, and even other custom hooks!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Forge Your First Hooks
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Experience the power of custom hooks by interacting with 
							useCounter and useToggle below!
						</strong>
					</p>
				</div>

				<div className='hook-demonstrations'>
					<div className='demo-section'>
						<h4>useCounter Hook in Action</h4>
						<div className='counter-demo'>
							<div className='counter-display'>
								<span className='counter-value'>{counter.count}</span>
							</div>
							<div className='counter-controls'>
								<button 
									className='magic-button' 
									onClick={counter.decrement}>
									Decrement
								</button>
								<button 
									className='magic-button reset' 
									onClick={counter.reset}>
									Reset
								</button>
								<button 
									className='magic-button' 
									onClick={counter.increment}>
									Increment
								</button>
							</div>
						</div>
					</div>

					<div className='demo-section'>
						<h4>useToggle Hook in Action</h4>
						<div className='toggle-demo'>
							<button 
								className='forge-toggle-button'
								onClick={forgeControls.toggle}>
								{isForgeOpen ? '🔥 Forge is Open' : '❄️ Forge is Closed'}
							</button>
							<div className='toggle-controls'>
								<button 
									className='mini-button' 
									onClick={forgeControls.setTrue}>
									Open Forge
								</button>
								<button 
									className='mini-button' 
									onClick={forgeControls.setFalse}>
									Close Forge
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='code-visualization'>
					<h4>The useCounter Hook Blueprint</h4>
					<pre className='magical-code'>
						{`// Custom Hook: useCounter
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  // Return an object with state and methods
  return { count, increment, decrement, reset };
}

// Using the hook in a component
function CounterComponent() {
  const counter = useCounter(10);
  
  return (
    <div>
      <h2>Count: {counter.count}</h2>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.decrement}>-</button>
      <button onClick={counter.reset}>Reset</button>
    </div>
  );
}`}
					</pre>

					<h4>The useToggle Hook Blueprint</h4>
					<pre className='magical-code'>
						{`// Custom Hook: useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  // Return array like useState for familiar API
  return [value, { toggle, setTrue, setFalse }];
}

// Using the hook in a component
function ToggleComponent() {
  const [isVisible, visibility] = useToggle(false);
  
  return (
    <div>
      <button onClick={visibility.toggle}>
        {isVisible ? 'Hide' : 'Show'} Content
      </button>
      {isVisible && <div>Secret Content!</div>}
    </div>
  );
}`}
					</pre>
				</div>
			</div>

			<div className='practical-application'>
				<h3>Why Create Custom Hooks?</h3>
				<div className='benefits-grid'>
					<div className='benefit-card'>
						<h4>1. Reusability</h4>
						<p>Share logic between multiple components without copy-pasting code</p>
					</div>
					<div className='benefit-card'>
						<h4>2. Separation of Concerns</h4>
						<p>Keep your components clean by extracting complex logic</p>
					</div>
					<div className='benefit-card'>
						<h4>3. Testability</h4>
						<p>Test your logic independently from your components</p>
					</div>
					<div className='benefit-card'>
						<h4>4. Composition</h4>
						<p>Combine hooks to create more powerful abstractions</p>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Custom Hook Lesson:</h3>
				<p>
					Custom hooks are the ultimate tool for code reuse in React. They allow 
					you to extract component logic into reusable functions. By convention, 
					custom hooks start with "use" and can call other hooks. This pattern 
					enables you to share stateful logic between components without changing 
					their structure. Think of custom hooks as your personal collection of 
					React superpowers that you can apply anywhere in your application.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the forge metaphor help you understand the process of creating 
					custom hooks? Why is it important that hooks can "forge" new tools from 
					existing ones?
				</p>
				<p>
					What kind of repetitive logic in your components could benefit from 
					being extracted into a custom hook?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;