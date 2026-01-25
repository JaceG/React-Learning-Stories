import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterOne() {
	const [spellCount, setSpellCount] = useState(0);
	const [magicLevel, setMagicLevel] = useState(1);
	const [spellName, setSpellName] = useState('');
	const [castedSpells, setCastedSpells] = useState([]);

	const castSpell = () => {
		if (spellName.trim()) {
			setCastedSpells([
				...castedSpells,
				{
					id: Date.now(),
					name: spellName,
					power: magicLevel,
				},
			]);
			setSpellCount(spellCount + 1);
			setSpellName('');
		}
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title='Advanced State Incantations'
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						In a circular classroom filled with hovering spell
						books, Aria found a distinguished wizard whose robes
						seemed to shimmer between different states. His beard
						sparkled with tiny useState calls that blinked in and
						out of existence.
					</p>

					<p className='story-paragraph'>
						"Ah, you must be Aria!" the wizard exclaimed, adjusting
						his spectacles that displayed real-time component
						renders. "I am <strong>Professor Hooksworth</strong>,
						keeper of the Hook Laws. Word of your achievements has
						reached even these halls."
					</p>

					<p className='story-paragraph'>
						Binary chirped a greeting, projecting a small hologram
						of their previous adventures.
					</p>

					<p className='story-paragraph'>
						"Impressive companion!" Hooksworth noted. "Now, I
						understand you've mastered basic state management with
						the State Sorcerers. But here at the Academy, we refine
						those crude spells into elegant hooks."
					</p>

					<p className='story-paragraph'>
						He waved his wand, and glowing runes appeared in the
						air. "Let's begin with an advanced pattern -{' '}
						<strong>Lazy Initial State</strong>. You see, Aria,
						sometimes our initial state requires expensive
						calculations. Rather than computing them on every
						render..."
					</p>

					<p className='story-paragraph'>
						"We can provide a function!" Aria finished, her eyes
						lighting up with understanding. "It only runs once,
						during initialization!"
					</p>

					<p className='story-paragraph'>
						"Precisely!" Hooksworth beamed. "You're already thinking
						like a Hook Mage. Let me show you the incantation."
					</p>

					<CodeExample
						title='Lazy Initial State Pattern'
						discoveredBy='Transcribed by Aria'
						code={`// Instead of this (runs on every render):
const [data, setData] = useState(expensiveCalculation());

// Use this (runs only once):
const [data, setData] = useState(() => expensiveCalculation());`}
					/>

					<p className='story-paragraph'>
						"This incantation," Hooksworth explained, waving his
						wand to highlight the arrow function, "ensures expensive
						calculations only occur during the component's birth,
						not with every re-render. It's the difference between a
						novice and a master!"
					</p>

					<p className='story-paragraph'>
						Binary beeped excitedly, projecting performance metrics
						showing the efficiency gains.
					</p>

					<p className='story-paragraph'>
						"Your companion grasps it immediately!" Hooksworth
						chuckled. "Now, let me show you another crucial pattern
						- functional updates. This is where many apprentices
						stumble."
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Practice Your State Spells
					</h3>
					<InstructionBox character='Create your own magical spells and watch them accumulate in your spell book!'>
						Enter a spell name, set the magic level, and cast your spell.
					</InstructionBox>

					<div className='spell-workshop'>
						<div className='spell-controls'>
							<input
								type='text'
								placeholder='Enter spell name...'
								value={spellName}
								onChange={(e) => setSpellName(e.target.value)}
								onKeyPress={(e) =>
									e.key === 'Enter' && castSpell()
								}
								style={{
									padding: '10px',
									borderRadius: '6px',
									border: '2px solid #6c5ce7',
									fontSize: '16px',
									width: '200px',
								}}
							/>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '10px',
								}}>
								<label>Magic Level:</label>
								<select
									value={magicLevel}
									onChange={(e) =>
										setMagicLevel(Number(e.target.value))
									}
									style={{
										padding: '8px',
										borderRadius: '4px',
										border: '2px solid #6c5ce7',
									}}>
									<option value={1}>Novice (1)</option>
									<option value={2}>Adept (2)</option>
									<option value={3}>Master (3)</option>
								</select>
							</div>

							<button
								className='spell-button'
								onClick={castSpell}
								disabled={!spellName.trim()}>
								Cast Spell ✨
							</button>
						</div>

						<div className='state-visualizer'>
							<div className='state-item'>
								<h4>Total Spells Cast</h4>
								<div className='state-orb'>{spellCount}</div>
							</div>
							<div className='state-item'>
								<h4>Current Magic Level</h4>
								<div className='state-orb'>{magicLevel}</div>
							</div>
						</div>

						{castedSpells.length > 0 && (
							<div className='spell-book'>
								<h4>Your Spell Book:</h4>
								{castedSpells.map((spell) => (
									<div key={spell.id} className='spell-card'>
										<strong>{spell.name}</strong> - Power
										Level: {spell.power}
									</div>
								))}
							</div>
						)}

						<button
							className='reset-button'
							onClick={() => {
								setCastedSpells([]);
								setSpellCount(0);
								setMagicLevel(1);
								setSpellName('');
							}}
							disabled={castedSpells.length === 0}
							style={{ marginTop: '15px' }}>
							Clear Spell Book
						</button>
					</div>
				</div>

				<div className='pattern-showcase'>
					<span className='pattern-badge'>Advanced Pattern</span>
					<h4>Functional Updates</h4>
					<p>
						When updating state based on previous state, always use
						the functional form:
					</p>
					<CodeExample
						title='Functional Updates Pattern'
						code={`// ❌ Avoid: Can cause bugs with multiple updates
setCount(count + 1);

// ✅ Prefer: Always gets the latest state
setCount(prevCount => prevCount + 1);`}
					/>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "Professor Hooksworth's useState Wisdom:",
						content: "Master useState through advanced patterns that separate novices from experts. Lazy initialization with functions prevents expensive computations on every render. Functional updates guarantee you always work with current state, crucial for handling rapid user interactions. These patterns become indispensable as applications scale - they're not optimizations, they're professional requirements. Remember: hooks aren't just simpler syntax, they're a more powerful paradigm."
					}}
					reflectionQuestions={[
						"How does the Academy's modern setting reflect the evolution from classes to hooks?",
						'Why might Professor Hooksworth call functional updates "crucial for rapid interactions"?',
						'What real-world scenarios would benefit from lazy initialization?'
					]}
					journalEntry={{
						title: "Aria's Journal - Day 16 (Morning)",
						content: "The Hooks Academy is incredible! Professor Hooksworth introduced me to advanced useState patterns that make my previous spells look amateur. Lazy initialization with arrow functions prevents expensive calculations from running on every render - such an elegant optimization! And functional updates ensure I always work with the latest state, avoiding race conditions. These aren't just improvements; they're essential patterns for professional React development. The Academy truly teaches mastery!"
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
