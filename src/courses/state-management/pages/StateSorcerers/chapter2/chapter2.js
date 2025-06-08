import React, { useState } from 'react';

const ChapterTwo = () => {
	const [formData, setFormData] = useState({
		name: '',
		title: '',
		power: 'transformation',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Transformation Spells
			</h2>

			<div className='chapter-bridge'>
				<p>After mastering simple state with numbers, Memnon led Aria deeper 
				into the crystal spire. The walls here pulsed with more complex patterns - 
				orbs containing entire collections of memories swirling together.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Now," Memnon announced, his staff glowing brighter, "you're ready 
					for the deeper mysteries. State can hold more than simple values - 
					it can contain <strong>objects</strong>, <strong>arrays</strong>, 
					even nested structures of incredible complexity!"
				</p>
				
				<p className='story-paragraph'>
					Binary bounced excitedly, projecting holographic shapes in the air. 
					"But there's a sacred rule, Aria! State memories are <strong>immutable</strong> - 
					you can never change them directly. You must always create new memories!"
				</p>

				<p className='story-paragraph'>
					Aria looked puzzled. "But why can't we just change the existing memory?"
				</p>
				
				<p className='story-paragraph'>
					"Ah, an excellent question!" Memnon smiled. "React needs to know when 
					something has changed to update the kingdom's reality. If you secretly 
					modify a memory, React won't notice. But if you create a completely new 
					memory, React sees the change and updates everything accordingly!"
				</p>

				<div className='code-example'>
					<div className='scroll-header'>
						<span>Complex State Transformation</span>
						<span className='discovered-by'>The Immutability Principle</span>
					</div>
					<pre>{`function SorcererForm() {
// Complex state example: an object with multiple properties
const [formData, setFormData] = useState({
name: '',
title: '',
power: 'transformation'
});

// Handler to update a specific field while preserving others
const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData(prevData => ({
...prevData,  // Spread operator preserves existing fields
[name]: value // Updates only the changed field
}));
};

return (
<form>
<input
name="name"
value={formData.name}
onChange={handleInputChange}
placeholder="Sorcerer Name"
/>
{/* Other fields */}
</form>
);
}`}</pre>
				</div>

				<p className='story-paragraph'>
					"Watch closely," Memnon demonstrated, tracing glowing patterns in the air. 
					"The spread operator (...) is your most powerful ally. It creates copies 
					of existing memories while allowing you to change specific parts!"
				</p>
				
				<div className='character-intro'>
					<h4>Aria's Journal - Day 8 (Afternoon)</h4>
					<p>Complex state is trickier than I thought! The key is the spread operator - 
					those three dots that copy everything. When updating objects, I spread the old 
					state first, then override specific fields. It's like making a magical copy of 
					a scroll, changing one line, and replacing the original. React needs this to 
					know something changed!</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Sorcerer Registry Crystal
				</h3>
				<p className='instruction'>
					<strong>👉 Memnon gestures to a glowing registration crystal.</strong>
					"Every State Sorcerer must register their powers in our crystal archives. 
					Try filling out your registration form - watch how the state updates 
					immutably with each change!"
				</p>

				<div className='sorcerer-form'>
					<div className='form-preview'>
						<div className='sorcerer-card'>
							<div className='sorcerer-card-header'>
								<h4>{formData.name || 'Unnamed Sorcerer'}</h4>
								<div className='sorcerer-title'>
									{formData.title || 'Apprentice'}
								</div>
							</div>
							<div className='sorcerer-card-body'>
								<div className='sorcerer-power'>
									<span>Magical Power:</span> {formData.power}
								</div>
							</div>
						</div>
					</div>

					<div className='form-inputs'>
						<div className='input-group'>
							<label htmlFor='name'>Sorcerer Name:</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								placeholder='Enter your name'
							/>
						</div>

						<div className='input-group'>
							<label htmlFor='title'>Magical Title:</label>
							<input
								type='text'
								id='title'
								name='title'
								value={formData.title}
								onChange={handleInputChange}
								placeholder='e.g. Grand Wizard, Mystic Sage'
							/>
						</div>

						<div className='input-group'>
							<label htmlFor='power'>Primary Power:</label>
							<select
								id='power'
								name='power'
								value={formData.power}
								onChange={handleInputChange}>
								<option value='transformation'>
									Transformation
								</option>
								<option value='illusion'>Illusion</option>
								<option value='divination'>Divination</option>
								<option value='enchantment'>Enchantment</option>
							</select>
						</div>
					</div>
				</div>

				<div className='state-display'>
					<h4>Current State:</h4>
					<pre>{JSON.stringify(formData, null, 2)}</pre>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>Memnon's Wisdom:</h3>
				<p>
					The principle of immutability is sacred in the React Kingdom. When you 
					modify state directly, you're performing forbidden magic - React cannot 
					see what changed. But when you create new state objects using the spread 
					operator (...) or array methods like map() and filter(), you're following 
					the ancient laws. React sees the new memory, compares it to the old, and 
					updates precisely what needs to change. This is the foundation of React's 
					incredible efficiency!
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the metaphor of "creating new memories" help you understand 
					immutability in React?
				</p>
				<p>
					Why do you think React was designed to require immutable state updates 
					rather than detecting deep changes in objects?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;
