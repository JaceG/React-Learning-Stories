import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';

function ChapterOne() {
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

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title='The Hook Forge Basics'
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome, Aria!" The figure turned, revealing a woman
						whose apron sparkled with embedded hook patterns. "I am{' '}
						<strong>Master Artificer Compose</strong>, and this is
						where we transcend from hook users to hook creators!"
					</p>

					<p className='story-paragraph'>
						Binary scanned the workshop, projecting amazement at the
						complex hook blueprints floating everywhere.
					</p>

					<p className='story-paragraph'>
						"You've mastered useState and useEffect," Compose
						continued, gesturing to her workbench. "But what if you
						need the same pattern repeatedly? What if you want to
						share stateful logic between components? This is where
						custom hooks shine!"
					</p>

					<p className='story-paragraph'>
						"So we can create our own hooks?" Aria asked, examining
						a glowing blueprint.
					</p>

					<p className='story-paragraph'>
						"Exactly! The secret is simple yet profound," Compose
						explained, beginning to forge a new hook. "Any function
						starting with 'use' can contain other hooks. This naming
						convention tells React to apply the Rules of Hooks.
						Watch as I forge two fundamental patterns!"
					</p>

					<div className='forge-illustration'>
						<div
							className={`forge ${
								isForgeOpen ? 'forge-active' : ''
							}`}>
							<div className='forge-fire'>🔥</div>
							<div className='forge-anvil'>
								<div className='hook-being-forged'>
									{isForgeOpen ? 'useCustomHook' : 'Closed'}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Forge Your First Hooks
					</h3>
					<InstructionBox character='Experience the power of custom hooks by interacting with useCounter and useToggle below!'>
						Try the counter controls and toggle the forge to see custom hooks in action.
					</InstructionBox>

					<div className='hook-demonstrations'>
						<div className='demo-section'>
							<h4>useCounter Hook in Action</h4>
							<div className='counter-demo'>
								<div className='counter-display'>
									<span className='counter-value'>
										{counter.count}
									</span>
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
									{isForgeOpen
										? '🔥 Forge is Open'
										: '❄️ Forge is Closed'}
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
							<p>
								Share logic between multiple components without
								copy-pasting code
							</p>
						</div>
						<div className='benefit-card'>
							<h4>2. Separation of Concerns</h4>
							<p>
								Keep your components clean by extracting complex
								logic
							</p>
						</div>
						<div className='benefit-card'>
							<h4>3. Testability</h4>
							<p>
								Test your logic independently from your
								components
							</p>
						</div>
						<div className='benefit-card'>
							<h4>4. Composition</h4>
							<p>
								Combine hooks to create more powerful
								abstractions
							</p>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: 'Hook Forging Fundamentals:',
						content: "Master custom hooks to become a true React artificer. Start function names with \"use\" to enable hook composition - this convention activates React's Rules of Hooks. Extract repetitive stateful logic into reusable functions that return state and methods. Popular patterns include useCounter, useToggle, useFetch, and useLocalStorage. Custom hooks share logic, not state - each component gets its own instance. Think of them as your personal React toolkit, crafted for your specific needs."
					}}
					reflectionQuestions={[
						'How does the workshop setting reflect the creative nature of custom hooks?',
						'What patterns in your own code are begging to be extracted into custom hooks?',
						'Why is "use" more than just a naming convention?'
					]}
					journalEntry={{
						title: "Aria's Journal - Day 18 (Morning)",
						content: "The Synthesis Workshop opened my eyes to the true power of React! Master Artificer Compose showed me how to forge my own hooks. The secret: any function starting with \"use\" can contain other hooks! I created useCounter (encapsulating increment/decrement logic) and useToggle (managing boolean states with helper methods). Custom hooks extract stateful logic into reusable functions - I can share complex patterns between components without copy-pasting! It's like creating my own toolkit of React superpowers. The forge metaphor is perfect - we're literally crafting new tools from existing hooks!"
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
