import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const { 
		mixedIngredients, 
		handleIngredientAdd,
		setMixedIngredients,
		transmutationState,
		handleTransmutation
	} = useOutletContext();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	});

	const ingredients = [
		{ name: 'Text Input', type: 'text', icon: '📝' },
		{ name: 'Email Field', type: 'email', icon: '📧' },
		{ name: 'Password', type: 'password', icon: '🔒' },
		{ name: 'Textarea', type: 'textarea', icon: '📄' },
		{ name: 'Checkbox', type: 'checkbox', icon: '☑️' },
		{ name: 'Radio', type: 'radio', icon: '⭕' },
		{ name: 'Select', type: 'select', icon: '📋' }
	];

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		});
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Form Transmutation Circle
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Aria discovered that forms were not just collections of inputs, 
					but complex alchemical circles where data transmuted from one 
					state to another. Each input type was a different ingredient, 
					and managing their state was the key to successful transmutation.
				</p>

				<div className='ingredient-mixer'>
					<h3>The Ingredient Collection</h3>
					<div className='ingredient-list'>
						{ingredients.map((ingredient) => (
							<div
								key={ingredient.name}
								className={`ingredient ${mixedIngredients.includes(ingredient.name) ? 'selected' : ''}`}
								onClick={() => handleIngredientAdd(ingredient.name)}>
								<span>{ingredient.icon}</span> {ingredient.name}
							</div>
						))}
					</div>

					{mixedIngredients.length > 0 && (
						<div className='mixing-result'>
							<h4>Your Form Recipe:</h4>
							<p>{mixedIngredients.join(' + ')}</p>
							<button onClick={() => setMixedIngredients([])}>
								Clear Recipe
							</button>
						</div>
					)}
				</div>

				<div className='form-transmutation'>
					<h3>The Transmutation Process</h3>
					<div className='transmutation-circle'>
						<div className='form-state'>
							<h4>User Input</h4>
							<p>Raw data from the user</p>
						</div>
						<div className='transmutation-arrow'>→</div>
						<div className='form-state'>
							<h4>React State</h4>
							<p>Controlled and managed</p>
						</div>
					</div>

					<div className='demo-controls'>
						<button 
							onClick={() => handleTransmutation('controlled')}
							className={transmutationState === 'controlled' ? 'active' : ''}>
							Controlled Transmutation
						</button>
						<button 
							onClick={() => handleTransmutation('uncontrolled')}
							className={transmutationState === 'uncontrolled' ? 'active' : ''}>
							Uncontrolled Transmutation
						</button>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Complex Form State
				</h3>

				<div className='form-preview'>
					<h4>The Master's Form</h4>
					<form onSubmit={(e) => {
						e.preventDefault();
						alert(`Form Data: ${JSON.stringify(formData, null, 2)}`);
					}}>
						<div>
							<label>Name (Text):</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								placeholder='Enter your name'
							/>
						</div>

						<div>
							<label>Email (Email):</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleInputChange}
								placeholder='your@email.com'
							/>
						</div>

						<div>
							<label>Message (Textarea):</label>
							<textarea
								name='message'
								value={formData.message}
								onChange={handleInputChange}
								placeholder='Your message here...'
								rows='4'
							/>
						</div>

						<button type='submit'>Submit Form</button>
					</form>

					<div className='state-display'>
						<h5>Current Form State:</h5>
						<pre>{JSON.stringify(formData, null, 2)}</pre>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Managing Complex Form State
function AlchemyForm() {
  // Single state object for all form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    potion: 'healing',
    ingredients: [],
    urgent: false
  });

  // Universal handler for all inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle array fields (like multi-select)
  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map(option => option.value);
    
    setFormData(prevData => ({
      ...prevData,
      ingredients: values
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      
      <select
        name="potion"
        value={formData.potion}
        onChange={handleChange}
      >
        <option value="healing">Healing</option>
        <option value="strength">Strength</option>
        <option value="wisdom">Wisdom</option>
      </select>
      
      <input
        type="checkbox"
        name="urgent"
        checked={formData.urgent}
        onChange={handleChange}
      />
    </form>
  );
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Transmutation Secret:</h3>
				<p>
					Form state management is like maintaining a perfect alchemical 
					balance. Use a single state object for related fields, and 
					create universal handlers that can manage any input type. This 
					makes your forms scalable and maintainable, like a well-organized 
					alchemist's workshop.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does thinking of form inputs as "ingredients" help you 
					understand their role in creating a complete form?
				</p>
				<p>
					Why is it beneficial to manage all form fields in a single 
					state object rather than separate states?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;