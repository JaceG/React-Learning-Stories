import React, { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	const { 
		selectedPotion, 
		handlePotionSelect,
		cauldronContents,
		setCauldronContents 
	} = useOutletContext();

	const [controlledValue, setControlledValue] = useState('');
	const uncontrolledRef = useRef(null);

	const potions = [
		{ name: 'Controlled', icon: '🧪', color: '#667eea' },
		{ name: 'Uncontrolled', icon: '⚗️', color: '#e94560' },
		{ name: 'Hybrid', icon: '🔮', color: '#48bb78' }
	];

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: The Alchemist's Laboratory</h2>
			
			<div className='chapter-bridge'>
				<p>The Form Alchemy Lab was unlike any workshop Aria had seen before. Instead of 
				forges and energy streams, it contained rows of bubbling cauldrons, crystalline 
				vials, and transmutation circles etched into the floor.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"<strong>Aria the Hook Craftmaster!</strong>" A figure in a stained laboratory coat 
					emerged from behind a particularly vigorous cauldron. "<strong>Master Alchemist Formeus</strong> 
					at your service. Your reputation precedes you - Elder useState himself wrote of your 
					innovations."
				</p>
				
				<p className='story-paragraph'>
					Binary's sensors immediately began analyzing the various reactions occurring throughout 
					the lab, projecting chemical formulas and React patterns in the air.
				</p>
				
				<p className='story-paragraph'>
					Aria smiled humbly. "I've mastered the internal magics, but I'm here to learn how 
					they apply to user interaction."
				</p>
				
				<p className='story-paragraph'>
					"Perfect mindset!" Formeus gestured to three glowing cauldrons. "Form Alchemy isn't just 
					about inputs and buttons - it's about transforming user intent into application state. 
					Your hook expertise will be invaluable here. Let me show you the fundamental choice: 
					controlled versus uncontrolled components."
				</p>
				
				<p className='story-paragraph'>
					Formeus approached the cauldrons, each bubbling with different intensities. "These 
					represent the three approaches to form alchemy. Watch closely..."
				</p>

				<div className='alchemy-lab'>
					<h3>The Three Cauldrons of Form Control</h3>
					<div className='potion-shelf'>
						{potions.map((potion) => (
							<div
								key={potion.name}
								className={`potion-bottle ${selectedPotion === potion.name ? 'active' : ''}`}
								onClick={() => handlePotionSelect(potion.name)}
								style={{ borderColor: selectedPotion === potion.name ? potion.color : undefined }}>
								<div className='potion-icon'>{potion.icon}</div>
								<h4>{potion.name} Potion</h4>
								<p>Click to select</p>
							</div>
						))}
					</div>

					<div className='cauldron'>
						<div className='cauldron-contents'>
							{cauldronContents || 'Select a potion to begin...'}
						</div>
					</div>
				</div>
			</div>

			<div className='aria-insight'>
				<h3>The Hook Master's Connection</h3>
				<p className='story-paragraph'>
					"Controlled components..." Aria's eyes lit up with understanding. "They're like 
					components with useState managing every change! The React way of maintaining single 
					source of truth!"
				</p>
				
				<p className='story-paragraph'>
					Formeus nodded enthusiastically. "Exactly! You grasp it immediately. And uncontrolled?"
				</p>
				
				<p className='story-paragraph'>
					"Like refs - accessing DOM directly when needed. I learned about useRef from Elder 
					useRef in the Hook Council!" Aria recalled her lessons from the Eastern Quarter.
				</p>
				
				<p className='story-paragraph'>
					Binary chimed in with a projection: "Pattern detected! Controlled = React state ownership. 
					Uncontrolled = DOM state ownership. Processing optimization strategies..."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Alchemy of Control
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Master Formeus demonstrates the fundamental difference between controlled 
							and uncontrolled transmutation. Try both approaches!
						</strong>
					</p>
				</div>

				<div className='controlled-demo'>
					<h4>🧪 Controlled Transmutation</h4>
					<p>React maintains constant awareness of the input's value:</p>
					<input
						type='text'
						value={controlledValue}
						onChange={(e) => {
							setControlledValue(e.target.value);
							setCauldronContents(`Controlled: "${e.target.value}"`);
						}}
						placeholder='Type here (controlled)'
						className='alchemy-input'
					/>
					<div className='state-display'>
						State value: "{controlledValue}"
					</div>
				</div>

				<div className='uncontrolled-demo'>
					<h4>⚗️ Uncontrolled Transmutation</h4>
					<p>The DOM maintains the value until we need it:</p>
					<input
						type='text'
						ref={uncontrolledRef}
						onChange={(e) => {
							setCauldronContents(`Uncontrolled: "${e.target.value}"`);
						}}
						placeholder='Type here (uncontrolled)'
						className='alchemy-input'
					/>
					<button onClick={() => {
						if (uncontrolledRef?.current) {
							alert(`Uncontrolled value: ${uncontrolledRef.current.value}`);
						}
					}} className='extract-button'>
						Extract Value
					</button>
				</div>
			</div>

			<div className='alchemy-formula'>
				<h3 className='formula-title'>Aria's Improved Alchemy Formulas</h3>
				<pre className='magical-code'>{`// Aria combines her hook knowledge with form alchemy
function useControlledInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  
  const handleChange = (e) => {
    setValue(e.target.value);
    if (!touched) setTouched(true);
  };
  
  const reset = () => {
    setValue(initialValue);
    setTouched(false);
  };
  
  return { value, onChange: handleChange, touched, reset };
}

// Using the pattern
function AlchemicalForm() {
  const nameInput = useControlledInput('');
  const emailInput = useControlledInput('');
  
  return (
    <form>
      <input {...nameInput} placeholder="Name" />
      <input {...emailInput} placeholder="Email" />
      <button onClick={() => {
        nameInput.reset();
        emailInput.reset();
      }}>Reset Cauldron</button>
    </form>
  );
}`}</pre>
			</div>

			<div className='formeus-reaction'>
				<p className='story-paragraph'>
					Formeus watched in amazement as Aria quickly sketched out the custom hook pattern. 
					"Remarkable! You've just created a reusable transmutation formula that most alchemists 
					take months to understand!"
				</p>
				
				<p className='story-paragraph'>
					"It's just applying what I learned in the Synthesis Workshop," Aria replied modestly. 
					"Custom hooks can encapsulate any stateful logic - including form controls."
				</p>
			</div>

			<div className='practical-application'>
				<h3>The Alchemist's Decision Matrix</h3>
				<div className='decision-grid'>
					<div className='decision-card controlled'>
						<h4>🧪 Use Controlled Components When:</h4>
						<ul>
							<li>You need instant validation feedback</li>
							<li>You want to enforce input formats as user types</li>
							<li>Multiple components need to share the form state</li>
							<li>You need to disable submit based on input</li>
							<li>You're building complex form logic</li>
						</ul>
					</div>
					<div className='decision-card uncontrolled'>
						<h4>⚗️ Use Uncontrolled Components When:</h4>
						<ul>
							<li>Working with file inputs (always uncontrolled)</li>
							<li>Integrating with non-React libraries</li>
							<li>You only need the value on submit</li>
							<li>Performance is critical for large forms</li>
							<li>Building quick prototypes</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='story-section'>
				<div className='character-intro'>
					<h4>Aria's Journal - Day 20 (Morning)</h4>
					<p>The Western Quarter is fascinating! Master Formeus showed me how form handling 
					is really just specialized state management. Controlled components use useState to 
					maintain a single source of truth - every keystroke updates React state. Uncontrolled 
					components let the DOM handle the state, using refs when we need values. I immediately 
					saw how to improve their patterns with custom hooks! Created useControlledInput that 
					encapsulates common form logic. Formeus was impressed, but this is just the beginning. 
					Binary is cataloging all the transmutation patterns for optimization.</p>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Master Alchemist's Wisdom:</h3>
				<p>
					Form control is the foundation of interactive alchemy. Controlled components maintain 
					React as the single source of truth, enabling instant validation, format enforcement, 
					and state sharing. Uncontrolled components delegate to the DOM, useful for file inputs 
					and third-party integrations. Most modern React applications favor controlled components 
					for their predictability and power. Remember: with great control comes great capability - 
					choose wisely based on your transmutation needs.
				</p>
			</div>
			
			<div className='character-intro'>
				<h4>Character Introduction</h4>
				<p><strong>Master Alchemist Formeus</strong> - The Western Quarter's foremost expert on 
				form transmutation. His laboratory contains centuries of accumulated knowledge about 
				transforming user input into application state. Known for his bubbling enthusiasm and 
				tendency to get excited about elegant solutions. His stained coat bears the marks of 
				countless experiments with input validation and state management.</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does Aria's hook mastery enhance her understanding of form controls?
				</p>
				<p className='story-paragraph'>
					Why might constant monitoring (controlled) be more powerful than passive observation (uncontrolled)?
				</p>
				<p className='story-paragraph'>
					What patterns from your own forms could benefit from custom hook extraction?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterOne;