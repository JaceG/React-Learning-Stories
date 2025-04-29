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

			<div className='story-section'>
				<p className='story-paragraph'>
					As State Sorcerers became more skilled, they learned that
					state could take many forms, not just simple values like
					numbers. The most powerful Sorcerers could manage complex
					memories with objects, arrays, and nested structures.
				</p>

				<p className='story-paragraph'>
					"Remember," cautioned the mentor, "state is immutable in our
					kingdom. You cannot directly change state memories; you must
					create new memories to replace the old ones."
				</p>

				<div className='code-example'>
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
					The Council Elder demonstrated the proper way to update
					different types of state:
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Sorcerer Registration
				</h3>
				<p className='instruction'>
					Fill out the form below to register as a State Sorcerer.
					Notice how each field you change updates the state object
					without affecting other fields!
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
				<h3>The State Transformation Lesson:</h3>
				<p>
					When working with complex state like objects and arrays,
					it's crucial to treat state as immutable. Instead of
					modifying existing state directly, always create new
					versions using the spread operator (...) or methods like
					map(), filter(), and concat(). This approach ensures that
					React can properly detect state changes and re-render
					components efficiently.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>Why is it important to treat state as immutable in React?</p>
				<p>
					How does using the spread operator or array methods help you
					update state safely?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;
