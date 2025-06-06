import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const { 
		selectedPotion, 
		handlePotionSelect,
		cauldronContents,
		setCauldronContents 
	} = useOutletContext();

	const [controlledValue, setControlledValue] = useState('');
	const [uncontrolledRef] = useState(null);

	const potions = [
		{ name: 'Controlled', icon: '🧪', color: '#667eea' },
		{ name: 'Uncontrolled', icon: '⚗️', color: '#e94560' },
		{ name: 'Hybrid', icon: '🔮', color: '#48bb78' }
	];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Alchemist's Laboratory
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the mystical tower of React Forms, young alchemist Aria 
					discovered an ancient laboratory filled with bubbling cauldrons 
					and glowing potions. Each potion represented a different way to 
					handle user input - the fundamental ingredients of interactive 
					applications.
				</p>

				<div className='alchemy-lab'>
					<h3>The Potion Shelf</h3>
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

				<p className='story-paragraph'>
					The <strong>Controlled Potion</strong> glowed with a steady blue 
					light. "This one," Aria read from the ancient tome, "keeps its 
					essence bound to React's state, updating with every stir of the 
					spoon."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Controlled vs Uncontrolled
				</h3>

				<div className='controlled-demo'>
					<h4>🧪 Controlled Component</h4>
					<p>Watch how the state updates with every keystroke:</p>
					<input
						type='text'
						value={controlledValue}
						onChange={(e) => {
							setControlledValue(e.target.value);
							setCauldronContents(`Controlled: "${e.target.value}"`);
						}}
						placeholder='Type here (controlled)'
					/>
					<div className='state-display'>
						State value: "{controlledValue}"
					</div>
				</div>

				<div className='uncontrolled-demo'>
					<h4>⚗️ Uncontrolled Component</h4>
					<p>The value lives in the DOM, accessed only when needed:</p>
					<input
						type='text'
						ref={uncontrolledRef}
						onChange={(e) => {
							setCauldronContents(`Uncontrolled: "${e.target.value}"`);
						}}
						placeholder='Type here (uncontrolled)'
					/>
					<button onClick={() => {
						if (uncontrolledRef?.current) {
							alert(`Uncontrolled value: ${uncontrolledRef.current.value}`);
						}
					}}>
						Get Value
					</button>
				</div>
			</div>

			<div className='alchemy-formula'>
				<h3 className='formula-title'>The Controlled Component Formula</h3>
				<pre>{`// Controlled Component - React manages the value
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input
      type="text"
      value={value}                    // React controls the value
      onChange={(e) => setValue(e.target.value)}  // Update on change
    />
  );
}

// Uncontrolled Component - DOM manages the value
function UncontrolledInput() {
  const inputRef = useRef(null);
  
  return (
    <input
      type="text"
      ref={inputRef}                   // Access DOM directly
      defaultValue="initial"           // Set initial value only
    />
  );
}`}</pre>
			</div>

			<div className='code-example'>
				<pre>{`// The Alchemist's Choice: When to use each potion

// Use Controlled Components when:
// - You need instant validation
// - You want to enforce input formats
// - Multiple components share the form state
// - You need to disable submit based on input

// Use Uncontrolled Components when:
// - Working with file inputs
// - Integrating with non-React code
// - You only need the value on submit
// - Performance is critical for large forms`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Alchemy Lesson:</h3>
				<p>
					Controlled components are like potions you stir constantly, 
					keeping React in sync with every change. Uncontrolled components 
					are like potions that brew on their own, checked only when the 
					recipe is complete. Most React forms use controlled components 
					for their predictability and power.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Why might an alchemist prefer to constantly monitor their 
					potion (controlled) versus letting it brew undisturbed 
					(uncontrolled)?
				</p>
				<p>
					What advantages does having complete control over form 
					inputs give you as a developer?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;