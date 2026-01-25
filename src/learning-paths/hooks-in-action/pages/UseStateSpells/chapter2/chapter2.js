import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterTwo() {
	const [formData, setFormData] = useState({
		name: '',
		element: 'fire',
		power: 50,
	});
	const [isEditing, setIsEditing] = useState(false);
	const [savedSpells, setSavedSpells] = useState([]);
	const [selectedSpell, setSelectedSpell] = useState(null);

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const saveSpell = () => {
		if (formData.name) {
			setSavedSpells([...savedSpells, { ...formData, id: Date.now() }]);
			setFormData({ name: '', element: 'fire', power: 50 });
		}
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title='State of Complex Objects'
					bridge="The next day, Aria found herself in the Academy's Transmutation Lab, where complex data structures floated as three-dimensional holograms. Professor Hooksworth was already there, manipulating what looked like a crystalline object that morphed between different shapes."
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Ah, Aria! Perfect timing," Hooksworth greeted. "Today
						we tackle a challenge that trips up even experienced
						mages - managing complex state structures."
					</p>

					<p className='story-paragraph'>
						He gestured to the floating crystal. "Watch what happens
						when I try to change this object's properties directly."
						He touched the crystal, and it flickered but didn't
						update. "Nothing! Do you know why?"
					</p>

					<p className='story-paragraph'>
						Aria studied the phenomenon. "Because React only detects
						changes when the reference changes?"
					</p>

					<p className='story-paragraph'>
						"Brilliant!" Hooksworth exclaimed. "This is the{' '}
						<strong>Immutability Principle</strong>. React's
						rendering magic only triggers when it sees a new object,
						not when we mutate an existing one."
					</p>

					<p className='story-paragraph'>
						Binary projected a comparison showing the difference
						between mutation and creating new objects, its display
						highlighting the reference changes.
					</p>

					<p className='story-paragraph'>
						"Your companion visualizes it perfectly," Hooksworth
						noted. "Now, let me show you the proper incantations for
						updating complex state."
					</p>

					<CodeExample
						title='The Immutability Principle'
						discoveredBy='Transcribed by Aria'
						code={`// ❌ This won't trigger re-render:
const [user, setUser] = useState({ name: 'Aria', level: 1 });
user.name = 'Master Aria'; // Mutation!
setUser(user); // Same reference

// ✅ Create a new object:
setUser({ ...user, name: 'Master Aria' });
// Or use functional update:
setUser(prev => ({ ...prev, name: 'Master Aria' }));`}
					/>

					<p className='story-paragraph'>
						"The spread operator is your ally here," Hooksworth
						continued, demonstrating with glowing gestures. "It
						creates a new object while preserving unchanged
						properties. For nested structures, you must spread at
						each level you modify."
					</p>

					<p className='story-paragraph'>
						"It seems tedious," Aria observed, "but I suppose it
						prevents unexpected mutations?"
					</p>

					<p className='story-paragraph'>
						"Exactly! This discipline," Hooksworth emphasized,
						tapping his wand on a floating tome, "is what separates
						reliable applications from buggy nightmares.
						Immutability ensures predictable state updates and
						enables React's optimization magic."
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>Interactive Exercise: Complex Spell Constructor</h3>
					<InstructionBox character='Build complex spell objects and manage them with proper state patterns!'>
						Create spells with multiple properties and see how immutable updates work.
					</InstructionBox>

					<div className='spell-workshop'>
						<div className='pattern-showcase'>
							<span className='pattern-badge'>Object State</span>
							<div style={{ display: 'grid', gap: '15px' }}>
								<div>
									<label>Spell Name:</label>
									<input
										type='text'
										value={formData.name}
										onChange={(e) =>
											handleInputChange(
												'name',
												e.target.value
											)
										}
										placeholder='Enter spell name...'
										style={{
											width: '100%',
											padding: '8px',
											borderRadius: '4px',
											border: '2px solid #6c5ce7',
											marginTop: '5px',
										}}
									/>
								</div>

								<div>
									<label>Element Type:</label>
									<select
										value={formData.element}
										onChange={(e) =>
											handleInputChange(
												'element',
												e.target.value
											)
										}
										style={{
											width: '100%',
											padding: '8px',
											borderRadius: '4px',
											border: '2px solid #6c5ce7',
											marginTop: '5px',
										}}>
										<option value='fire'>🔥 Fire</option>
										<option value='water'>💧 Water</option>
										<option value='earth'>🌍 Earth</option>
										<option value='air'>💨 Air</option>
									</select>
								</div>

								<div>
									<label>Power Level: {formData.power}</label>
									<input
										type='range'
										min='0'
										max='100'
										value={formData.power}
										onChange={(e) =>
											handleInputChange(
												'power',
												Number(e.target.value)
											)
										}
										style={{
											width: '100%',
											marginTop: '5px',
										}}
									/>
								</div>

								<div style={{ display: 'flex', gap: '10px' }}>
									<button
										className='spell-button'
										onClick={saveSpell}
										disabled={!formData.name}>
										Save Spell
									</button>
									<button
										className='reset-button'
										onClick={() =>
											setFormData({
												name: '',
												element: 'fire',
												power: 50,
											})
										}>
										Clear Form
									</button>
								</div>
							</div>
						</div>

						{savedSpells.length > 0 && (
							<div className='spell-book'>
								<h4>Saved Complex Spells:</h4>
								{savedSpells.map((spell) => (
									<div
										key={spell.id}
										className='spell-card'
										onClick={() => setSelectedSpell(spell)}
										style={{ cursor: 'pointer' }}>
										<strong>{spell.name}</strong> - Element:{' '}
										{spell.element} | Power: {spell.power}
									</div>
								))}
								<button
									className='reset-button'
									onClick={() => {
										setSavedSpells([]);
										setSelectedSpell(null);
									}}
									style={{ marginTop: '10px' }}>
									Clear All Spells
								</button>
							</div>
						)}

						{selectedSpell && (
							<div className='spell-result'>
								<h4>Selected Spell Details:</h4>
								<pre>
									{JSON.stringify(selectedSpell, null, 2)}
								</pre>
							</div>
						)}
					</div>
				</div>

				<div className='pattern-showcase'>
					<span className='pattern-badge'>Array Updates</span>
					<h4>Immutable Array Patterns</h4>
					<CodeExample
						title='Array Update Patterns'
						code={`// Adding items:
setItems([...items, newItem]);

// Removing items:
setItems(items.filter(item => item.id !== targetId));

// Updating items:
setItems(items.map(item => 
  item.id === targetId 
    ? { ...item, ...updates } 
    : item
));`}
					/>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: 'The Immutability Lesson:',
						content: "Master complex state through immutability - the cornerstone of predictable React applications. Create new objects with spread syntax rather than mutating existing ones. For arrays, embrace methods that return new arrays: map for updates, filter for removal, concat or spread for additions. This discipline ensures React detects changes and optimizes renders efficiently. Remember: mutation is the enemy of predictability."
					}}
					reflectionQuestions={[
						"How does the crystal metaphor help visualize React's change detection?",
						'Why does Professor Hooksworth call immutability "discipline"?',
						'What debugging nightmares might arise from mutating state directly?'
					]}
					journalEntry={{
						title: "Aria's Journal - Day 16 (Afternoon)",
						content: "The Transmutation Lab revealed why so many developers struggle with React state! The Immutability Principle is crucial - React only re-renders when it detects new references, not mutations. Professor Hooksworth showed me how spread operators create new objects while preserving unchanged data. For arrays, methods like map, filter, and concat return new arrays automatically. This isn't just a React quirk - it's a powerful pattern that prevents bugs and enables optimizations. Immutability is the foundation of predictable state!"
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
