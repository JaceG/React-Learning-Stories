import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const [count, setCount] = useState(0);
	const [showCounterCode, setShowCounterCode] = useState(false);

	const incrementCount = () => setCount(count + 1);

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title="The Memory Keepers"
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					As Aria entered the Eastern Quarter, she marveled at the crystal 
					spires that seemed to pulse with living energy. Each tower contained 
					countless glowing orbs - the stored memories of a thousand components.
				</p>

				<p className='story-paragraph'>
					At the entrance to the tallest spire stood a figure in flowing 
					robes, his staff topped with a constantly shifting orb of light. 
					"Welcome, Aria," he said warmly. "I am <strong>Memnon</strong>, 
					Chief of the State Sorcerers. Chronos told me of your arrival."
				</p>
				
				<p className='story-paragraph'>
					Binary zipped around excitedly. "State Sorcerers are amazing! They 
					can remember things between renders! Regular components forget 
					everything each time they re-render, but not these magical beings!"
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
					Memnon gestured to the glowing orbs floating around his staff. 
					"You see these memory orbs? They represent <strong>state</strong> - 
					the magical ability for components to remember information between 
					renderings. Without state, components would be like goldfish, 
					forgetting everything the moment they blink!"
				</p>

				<p className='story-paragraph'>
					"But how do we give components this power?" Aria asked, her eyes 
					wide with curiosity.
				</p>
				
				<p className='story-paragraph'>
					Memnon smiled and pulled out a shimmering hook from his robes. 
					"With this - the <strong>useState</strong> hook! It's the most 
					fundamental spell in our arsenal. Let me show you..."
				</p>

				<CodeExample
					title="The useState Incantation"
					discoveredBy="Memnon's First Lesson"
					code={`function Counter() {
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
}`}
				/>

				<p className='story-paragraph'>
					"Observe carefully," Memnon explained, tracing the spell in the air. 
					"The useState hook returns two things: a <strong>value</strong> (what 
					you remember) and a <strong>setter</strong> (the spell to change that 
					memory). When you call the setter, React knows to re-render the 
					component with the new memory!"
				</p>
				
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Your First Memory Spell
				</h3>
				<InstructionBox character="Memnon hands you a practice wand.">
					"Now it's your turn, Aria. This counter will remember how many 
					times you've cast the increment spell. Try it!"
				</InstructionBox>

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

			<ChapterSummary
				lessonInsight={{
					title: "Memnon's Wisdom:",
					content: "State is the soul of interactive components. It's what separates a static painting from a living, breathing entity. When you give a component state, you give it the power to remember, to learn, and to respond. The useState hook is your gateway to this power - it returns both the current memory and the spell to change it. And the most magical part? React automatically re-renders your component whenever the state changes, keeping your UI in perfect sync with your data."
				}}
				reflectionQuestions={[
					"How does Memnon's metaphor of memory orbs help you visualize what state does in a React component?",
					"Why do you think React automatically re-renders components when their state changes? What would happen if it didn't?"
				]}
				journalEntry={{
					title: "Aria's Journal - Day 8",
					content: "My first day in the Eastern Quarter! Memnon is wise but kind, and the useState hook seems like the key to everything. It's so simple yet so powerful - just call useState with an initial value, and you get back the current value and a way to update it. When I update it, the component re-renders automatically! It's like giving components a brain!"
				}}
			/>
		</div>
	);
};

export default ChapterOne;
