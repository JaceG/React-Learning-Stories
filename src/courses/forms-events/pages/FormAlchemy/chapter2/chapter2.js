import React, { useState, useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterTwo() {
	const { 
		mixedIngredients, 
		handleIngredientAdd,
		setMixedIngredients,
		transmutationState,
		handleTransmutation
	} = useOutletContext();

	// Aria's custom form hook
	const useForm = (initialValues, validate) => {
		const [values, setValues] = useState(initialValues);
		const [errors, setErrors] = useState({});
		const [touched, setTouched] = useState({});

		const handleChange = useCallback((e) => {
			const { name, value, type, checked } = e.target;
			setValues(prev => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value
			}));
		}, []);

		const handleBlur = useCallback((e) => {
			const { name } = e.target;
			setTouched(prev => ({ ...prev, [name]: true }));
		}, []);

		useEffect(() => {
			if (validate) {
				const validationErrors = validate(values);
				setErrors(validationErrors);
			}
		}, [values, validate]);

		const reset = useCallback(() => {
			setValues(initialValues);
			setErrors({});
			setTouched({});
		}, [initialValues]);

		return { values, errors, touched, handleChange, handleBlur, reset };
	};

	// Validation function
	const validateForm = (values) => {
		const errors = {};
		if (!values.name) errors.name = 'Name is required';
		if (!values.email) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
			errors.email = 'Invalid email format';
		}
		if (!values.message) errors.message = 'Message is required';
		return errors;
	};

	// Using Aria's custom hook
	const form = useForm(
		{ name: '', email: '', message: '', potion: 'healing', urgent: false },
		validateForm
	);

	const ingredients = [
		{ name: 'Text Input', type: 'text', icon: '📝' },
		{ name: 'Email Field', type: 'email', icon: '📧' },
		{ name: 'Password', type: 'password', icon: '🔒' },
		{ name: 'Textarea', type: 'textarea', icon: '📄' },
		{ name: 'Checkbox', type: 'checkbox', icon: '☑️' },
		{ name: 'Radio', type: 'radio', icon: '⭕' },
		{ name: 'Select', type: 'select', icon: '📋' }
	];

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 2: The Form Transmutation Circle</h2>
			
			<div className='chapter-bridge'>
				<p>Formeus led Aria deeper into the laboratory, where a massive transmutation circle 
				glowed on the floor. Various input components floated above it, each pulsing with 
				different energies.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Now for the true art," Formeus announced, gesturing to the circle. "Managing 
					multiple form inputs is like conducting a symphony of transmutations. Each input 
					type has its own nature, its own requirements."
				</p>
				
				<p className='story-paragraph'>
					Aria studied the floating components, her mind already connecting patterns. "In the 
					Synthesis Workshop, I learned to create hooks that manage complex state. Could we..."
				</p>
				
				<p className='story-paragraph'>
					"Show me!" Formeus interrupted eagerly. "Your fresh perspective might revolutionize 
					our traditional methods!"
				</p>
				
				<p className='story-paragraph'>
					Binary projected a holographic code editor, and Aria began crafting a comprehensive 
					form management solution, drawing on all her accumulated knowledge.
				</p>

				<div className='ingredient-mixer'>
					<h3>The Input Ingredient Collection</h3>
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
			</div>

			<div className='aria-creates-solution'>
				<h3>Aria's Advanced Form Hook</h3>
				<p className='story-paragraph'>
					"Watch this," Aria said, her fingers dancing across Binary's projection. "I'll 
					combine state management, validation, and touch tracking into a single reusable hook..."
				</p>
				
				<pre className='magical-code'>{`// Aria's comprehensive form management hook
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  // Validate on value changes
  useEffect(() => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, reset };
};`}</pre>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Aria's Form Management System
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Experience how Aria's custom hook manages complex forms with validation, 
							touch tracking, and unified state management!
						</strong>
					</p>
				</div>

				<div className='form-preview'>
					<h4>The Master Alchemist's Enhanced Form</h4>
					<form onSubmit={(e) => {
						e.preventDefault();
						alert(`Form Data: ${JSON.stringify(form.values, null, 2)}`);
					}}>
						<div className='form-field'>
							<label>Name (Text):</label>
							<input
								type='text'
								name='name'
								value={form.values.name}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								placeholder='Enter your name'
								className={form.errors.name && form.touched.name ? 'error' : ''}
							/>
							{form.errors.name && form.touched.name && (
								<span className='error-message'>{form.errors.name}</span>
							)}
						</div>

						<div className='form-field'>
							<label>Email (Email):</label>
							<input
								type='email'
								name='email'
								value={form.values.email}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								placeholder='your@email.com'
								className={form.errors.email && form.touched.email ? 'error' : ''}
							/>
							{form.errors.email && form.touched.email && (
								<span className='error-message'>{form.errors.email}</span>
							)}
						</div>

						<div className='form-field'>
							<label>Potion Type (Select):</label>
							<select
								name='potion'
								value={form.values.potion}
								onChange={form.handleChange}>
								<option value='healing'>Healing Elixir</option>
								<option value='strength'>Strength Brew</option>
								<option value='wisdom'>Wisdom Draught</option>
							</select>
						</div>

						<div className='form-field'>
							<label>Message (Textarea):</label>
							<textarea
								name='message'
								value={form.values.message}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								placeholder='Describe your alchemical needs...'
								rows='4'
								className={form.errors.message && form.touched.message ? 'error' : ''}
							/>
							{form.errors.message && form.touched.message && (
								<span className='error-message'>{form.errors.message}</span>
							)}
						</div>

						<div className='form-field checkbox-field'>
							<label>
								<input
									type='checkbox'
									name='urgent'
									checked={form.values.urgent}
									onChange={form.handleChange}
								/>
								Urgent Order
							</label>
						</div>

						<div className='form-actions'>
							<button type='submit'>Transmute Form</button>
							<button type='button' onClick={form.reset}>Reset Cauldron</button>
						</div>
					</form>

					<div className='state-display'>
						<h5>Live Form State:</h5>
						<pre>{JSON.stringify({
							values: form.values,
							errors: form.errors,
							touched: form.touched
						}, null, 2)}</pre>
					</div>
				</div>
			</div>

			<div className='formeus-amazement'>
				<p className='story-paragraph'>
					Formeus watched the demonstration with growing excitement. "Incredible! You've 
					unified state management, validation, and user interaction tracking in one elegant 
					solution. This would have taken our apprentices months to discover!"
				</p>
				
				<p className='story-paragraph'>
					"The key," Aria explained, "is thinking of forms holistically. Each piece - values, 
					errors, touched states - they're all part of the same system. My time with Pattern 
					Weaver Synthesis taught me to see these connections."
				</p>
				
				<p className='story-paragraph'>
					Binary added proudly, "Pattern efficiency increased by 73%! This approach eliminates 
					redundant state updates and provides optimal user feedback timing."
				</p>
			</div>

			<div className='practical-application'>
				<h3>Advanced Form Patterns</h3>
				<div className='pattern-showcase'>
					<div className='pattern-example'>
						<h4>Dynamic Field Addition</h4>
						<pre className='mini-code'>{`// Add fields dynamically
const [fields, setFields] = useState([{ id: 1, value: '' }]);

const addField = () => {
  setFields([...fields, { 
    id: Date.now(), 
    value: '' 
  }]);
};`}</pre>
					</div>
					<div className='pattern-example'>
						<h4>Conditional Fields</h4>
						<pre className='mini-code'>{`// Show/hide based on other fields
{form.values.potion === 'custom' && (
  <input
    name="customIngredients"
    value={form.values.customIngredients}
    onChange={form.handleChange}
  />
)}`}</pre>
					</div>
					<div className='pattern-example'>
						<h4>Field Arrays</h4>
						<pre className='mini-code'>{`// Managing arrays of inputs
const handleArrayField = (index, value) => {
  const newArray = [...form.values.ingredients];
  newArray[index] = value;
  form.handleChange({
    target: { name: 'ingredients', value: newArray }
  });
};`}</pre>
					</div>
				</div>
			</div>

			<div className='story-section'>
				<div className='character-intro'>
					<h4>Aria's Journal - Day 20 (Afternoon)</h4>
					<p>Form state management is fascinating when viewed through the lens of custom hooks! 
					Created a comprehensive useForm hook that handles values, validation, and touch tracking. 
					Formeus was amazed - apparently their apprentices usually learn these concepts separately. 
					But why separate what works together? The validation runs automatically when values change 
					(using useEffect patterns from the Temporal Tower), touch tracking prevents premature 
					error display, and useCallback optimizes the handlers. It's all connected! Binary 
					calculated we reduced form boilerplate by 80%. Tomorrow we tackle different input types 
					and their quirks.</p>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Transmutation Circle's Secret:</h3>
				<p>
					Complex form management becomes elegant through custom hooks. Unify related concerns - 
					values, errors, touched states - into cohesive abstractions. Use useCallback for stable 
					handler references, useEffect for reactive validation, and thoughtful state structure 
					for maintainability. Remember: forms are systems, not collections of inputs. Build 
					reusable patterns that encapsulate common behaviors, reducing boilerplate and increasing 
					consistency across your application.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does Aria's systematic approach to form management reflect her journey through React?
				</p>
				<p className='story-paragraph'>
					Why is unifying form concerns into a single hook more powerful than managing them separately?
				</p>
				<p className='story-paragraph'>
					What other form patterns could benefit from custom hook abstraction?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterTwo;