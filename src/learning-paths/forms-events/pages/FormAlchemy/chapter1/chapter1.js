import React, { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	const {
		selectedPotion,
		handlePotionSelect,
		cauldronContents,
		setCauldronContents,
	} = useOutletContext();

	const [controlledValue, setControlledValue] = useState('');
	const uncontrolledRef = useRef(null);

	const potions = [
		{ name: 'Controlled', icon: '🧪', color: '#667eea' },
		{ name: 'Uncontrolled', icon: '⚗️', color: '#e94560' },
		{ name: 'Hybrid', icon: '🔮', color: '#48bb78' },
	];

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 1: The Alchemist's Laboratory
				</h2>

				<div className='chapter-bridge'>
					<p>
						After mastering hook patterns with Pattern Weaver
						Synthesis, Aria received a letter sealed with a
						mysterious symbol. "The Western Quarter awaits," the
						Academy's chancellor had said. "It's time you learned
						how to apply your hook mastery to real user
						interactions." The Form Alchemy Lab was unlike any
						workshop she had seen before - instead of forges and
						energy streams, it contained rows of bubbling cauldrons,
						crystalline vials, and transmutation circles etched into
						the floor.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"<strong>Welcome, young scholar!</strong>" A figure in a
						stained laboratory coat emerged from behind a
						particularly vigorous cauldron. "
						<strong>Master Alchemist Formeus</strong>
						at your service. The Academy sent word that you've been
						mastering advanced hook patterns. Perfect timing - we
						need someone who truly understands{' '}
						<strong>useState</strong>
						and <strong>useRef</strong>."
					</p>

					<p className='story-paragraph'>
						Binary's sensors immediately began analyzing the various
						reactions occurring throughout the lab, projecting
						chemical formulas and React patterns in the air.
						"Detecting new applications! Form interactions combined
						with hook patterns!"
					</p>

					<p className='story-paragraph'>
						Aria looked around in wonder. "I understand useState and
						useRef from the Academy, but I'm curious how they apply
						to capturing user input in forms."
					</p>

					<p className='story-paragraph'>
						"Excellent question!" Formeus gestured enthusiastically
						to three glowing cauldrons. "Form Alchemy is about
						applying the hooks you've mastered to real user
						interactions. The patterns you learned from Pattern
						Weaver Synthesis are the foundation, but now we must
						learn how to capture and transform user intent into
						application state. Let me show you the fundamental
						choice: <strong>controlled</strong> versus{' '}
						<strong>uncontrolled</strong> components."
					</p>

					<p className='story-paragraph'>
						Formeus approached the cauldrons, each bubbling with
						different intensities. "These represent the three
						approaches to form alchemy. Watch closely as I
						demonstrate how your hook knowledge applies to user
						input..."
					</p>

					<div className='alchemy-lab'>
						<h3>The Three Cauldrons of Form Control</h3>
						<div className='potion-shelf'>
							{potions.map((potion) => (
								<div
									key={potion.name}
									className={`potion-bottle ${
										selectedPotion === potion.name
											? 'active'
											: ''
									}`}
									onClick={() =>
										handlePotionSelect(potion.name)
									}
									style={{
										borderColor:
											selectedPotion === potion.name
												? potion.color
												: undefined,
									}}>
									<div className='potion-icon'>
										{potion.icon}
									</div>
									<h4>{potion.name} Potion</h4>
									<p>Click to select</p>
								</div>
							))}
						</div>

						<div className='cauldron'>
							<div className='cauldron-contents'>
								{cauldronContents ||
									'Select a potion to begin...'}
							</div>
						</div>
					</div>
				</div>

				<div className='aria-learning'>
					<h3>Aria Connects Her Knowledge</h3>
					<p className='story-paragraph'>
						"Controlled components..." Aria said thoughtfully,
						connecting the dots. "They use
						<strong>useState</strong> to manage every change! Like
						the state patterns I learned from Professor Hooksworth
						at the Academy."
					</p>

					<p className='story-paragraph'>
						"Excellent connection!" Formeus beamed. "You're applying
						your hook training perfectly. And what about
						uncontrolled components?"
					</p>

					<p className='story-paragraph'>
						"They must use <strong>useRef</strong> - accessing the
						DOM directly when needed. I remember the Effect Sage
						teaching about persistent references that don't trigger
						re-renders!" Aria's eyes lit up with understanding.
					</p>

					<p className='story-paragraph'>
						Binary chimed in excitedly: "Pattern analysis complete!
						Controlled = React state ownership. Uncontrolled = DOM
						state ownership. Aria is making excellent hook
						connections!"
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Learning Form Control Patterns
					</h3>
					<div className='instruction-box'>
						<p>
							<strong>
								Help Aria understand how her hook knowledge
								applies to form control by trying both
								approaches!
							</strong>
						</p>
					</div>

					<div className='controlled-demo'>
						<h4>🧪 Controlled Transmutation</h4>
						<p>
							React maintains constant awareness of the input's
							value:
						</p>
						<input
							type='text'
							value={controlledValue}
							onChange={(e) => {
								setControlledValue(e.target.value);
								setCauldronContents(
									`Controlled: "${e.target.value}"`
								);
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
								setCauldronContents(
									`Uncontrolled: "${e.target.value}"`
								);
							}}
							placeholder='Type here (uncontrolled)'
							className='alchemy-input'
						/>
						<button
							onClick={() => {
								if (uncontrolledRef?.current) {
									alert(
										`Uncontrolled value: ${uncontrolledRef.current.value}`
									);
								}
							}}
							className='extract-button'>
							Extract Value
						</button>
					</div>
				</div>

				<div className='alchemy-formula'>
					<h3 className='formula-title'>
						Aria Applies Her Hook Knowledge
					</h3>
					<pre className='magical-code'>{`// Aria applies her Academy training to form alchemy
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

// Applying the pattern like Pattern Weaver taught me
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
						Formeus watched in amazement as Aria quickly sketched
						out the custom hook pattern. "Remarkable! You're
						applying your Academy training beautifully - turning
						form control into reusable hook patterns!"
					</p>

					<p className='story-paragraph'>
						"It's just what I learned from Pattern Weaver
						Synthesis," Aria replied modestly. "Custom hooks can
						encapsulate any stateful logic - including form
						controls."
					</p>
				</div>

				<div className='practical-application'>
					<h3>The Alchemist's Decision Matrix</h3>
					<div className='decision-grid'>
						<div className='decision-card controlled'>
							<h4>🧪 Use Controlled Components When:</h4>
							<ul>
								<li>You need instant validation feedback</li>
								<li>
									You want to enforce input formats as user
									types
								</li>
								<li>
									Multiple components need to share the form
									state
								</li>
								<li>
									You need to disable submit based on input
								</li>
								<li>You're building complex form logic</li>
							</ul>
						</div>
						<div className='decision-card uncontrolled'>
							<h4>⚗️ Use Uncontrolled Components When:</h4>
							<ul>
								<li>
									Working with file inputs (always
									uncontrolled)
								</li>
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
						<p>
							The Western Quarter is fascinating! Master Formeus
							showed me how form handling is really just
							specialized hook application. Controlled components
							use useState to maintain a single source of truth -
							every keystroke updates React state. Uncontrolled
							components let the DOM handle the state, using
							useRef when we need values. I immediately saw how to
							apply my Academy training - created
							useControlledInput that encapsulates common form
							logic using the patterns Pattern Weaver taught me.
							Formeus was impressed, but this is just the
							beginning. Binary is cataloging all the
							transmutation patterns for optimization.
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>The Master Alchemist's Wisdom:</h3>
					<p>
						Form control applies your hook mastery to user
						interaction. Controlled components maintain React as the
						single source of truth using useState patterns you've
						learned, enabling instant validation, format
						enforcement, and state sharing. Uncontrolled components
						delegate to the DOM using useRef for persistent
						references. Most modern React applications favor
						controlled components for their predictability and
						power. Remember: with great control comes great
						capability - choose wisely based on your transmutation
						needs.
					</p>
				</div>

				<div className='character-intro'>
					<h4>Character Introduction</h4>
					<p>
						<strong>Master Alchemist Formeus</strong> - The Western
						Quarter's foremost expert on form transmutation. His
						laboratory contains centuries of accumulated knowledge
						about transforming user input into application state.
						Known for his bubbling enthusiasm and tendency to get
						excited about elegant solutions. His stained coat bears
						the marks of countless experiments with input validation
						and state management.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does Aria's hook mastery from the Academy enhance
						her understanding of form controls?
					</p>
					<p className='story-paragraph'>
						Why might constant monitoring (controlled) be more
						powerful than passive observation (uncontrolled)?
					</p>
					<p className='story-paragraph'>
						What patterns from your own forms could benefit from
						custom hook extraction?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
