import React, { useState, useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterTwo() {
	const {
		mixedIngredients,
		handleIngredientAdd,
		setMixedIngredients,
		transmutationState,
		handleTransmutation,
	} = useOutletContext();

	// Aria applies her Academy training to form management
	const useForm = (initialValues, validate) => {
		const [values, setValues] = useState(initialValues);
		const [errors, setErrors] = useState({});
		const [touched, setTouched] = useState({});

		const handleChange = useCallback((e) => {
			const { name, value, type, checked } = e.target;
			setValues((prev) => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value,
			}));
		}, []);

		const handleBlur = useCallback((e) => {
			const { name } = e.target;
			setTouched((prev) => ({ ...prev, [name]: true }));
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

	// Using Aria's Academy-trained hook
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
		{ name: 'Select', type: 'select', icon: '📋' },
	];

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title='The Form Transmutation Circle'
					bridge={`Formeus led Aria deeper into the laboratory, where a massive transmutation circle glowed on the floor. Various input components floated above it, each pulsing with different energies. "Now," he said, "let's see how your Academy training applies to complex form management."`}
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"This is where your hook mastery truly shines," Formeus
						announced, gesturing to the circle. "Managing multiple
						form inputs is like conducting a symphony of
						transmutations. Each input type has its own nature, its
						own requirements."
					</p>

					<p className='story-paragraph'>
						Aria studied the floating components, her mind already
						connecting patterns. "At the Academy, I learned to
						create custom hooks that manage complex state. Could we
						apply those patterns here?"
					</p>

					<p className='story-paragraph'>
						"Show me!" Formeus interrupted eagerly. "I'm curious to
						see how Academy training approaches this challenge!"
					</p>

					<p className='story-paragraph'>
						Binary projected a holographic code editor, and Aria
						began crafting a comprehensive form management solution,
						drawing on everything she'd learned from the Hook
						Council.
					</p>

					<div className='ingredient-mixer'>
						<h3>The Input Ingredient Collection</h3>
						<div className='ingredient-list'>
							{ingredients.map((ingredient) => (
								<div
									key={ingredient.name}
									className={`ingredient ${
										mixedIngredients.includes(
											ingredient.name
										)
											? 'selected'
											: ''
									}`}
									onClick={() =>
										handleIngredientAdd(ingredient.name)
									}>
									<span>{ingredient.icon}</span>{' '}
									{ingredient.name}
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
					<h3>Aria's Academy-Trained Form Hook</h3>
					<p className='story-paragraph'>
						"I think I understand," Aria said thoughtfully. "Could I
						try applying what Pattern Weaver Synthesis taught me
						about hook orchestration? Maybe I could create a form
						management system that combines these concepts..."
					</p>

					<p className='story-paragraph'>
						"Please, show me!" Formeus encouraged eagerly. "I'm
						curious to see how Academy training approaches this
						challenge."
					</p>

					<CodeExample
						title="Academy-Trained Form Management"
						discoveredBy="Transcribed by Aria"
						code={`// Aria applies Academy training to form management
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Using useCallback like the Academy taught me
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

  // Using useEffect for reactive validation like Effect Sage taught
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
};`}
					/>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Aria's Academy-Trained Form System
					</h3>
					<InstructionBox character="Formeus gestures to the glowing transmutation circle.">
						Experience how Aria applies her Academy training to create an advanced form management system with validation and state orchestration!
					</InstructionBox>

					<div className='form-preview'>
						<h4>The Academy-Enhanced Form</h4>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								alert(
									`Form Data: ${JSON.stringify(
										form.values,
										null,
										2
									)}`
								);
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
									className={
										form.errors.name && form.touched.name
											? 'error'
											: ''
									}
								/>
								{form.errors.name && form.touched.name && (
									<span className='error-message'>
										{form.errors.name}
									</span>
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
									className={
										form.errors.email && form.touched.email
											? 'error'
											: ''
									}
								/>
								{form.errors.email && form.touched.email && (
									<span className='error-message'>
										{form.errors.email}
									</span>
								)}
							</div>

							<div className='form-field'>
								<label>Potion Type (Select):</label>
								<select
									name='potion'
									value={form.values.potion}
									onChange={form.handleChange}>
									<option value='healing'>
										Healing Elixir
									</option>
									<option value='strength'>
										Strength Brew
									</option>
									<option value='wisdom'>
										Wisdom Draught
									</option>
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
									className={
										form.errors.message &&
										form.touched.message
											? 'error'
											: ''
									}
								/>
								{form.errors.message &&
									form.touched.message && (
										<span className='error-message'>
											{form.errors.message}
										</span>
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
								<button type='button' onClick={form.reset}>
									Reset Cauldron
								</button>
							</div>
						</form>

						<div className='state-display'>
							<h5>Live Form State:</h5>
							<pre>
								{JSON.stringify(
									{
										values: form.values,
										errors: form.errors,
										touched: form.touched,
									},
									null,
									2
								)}
							</pre>
						</div>
					</div>
				</div>

				<div className='formeus-amazement'>
					<p className='story-paragraph'>
						Formeus watched the demonstration with growing
						excitement. "Incredible! You're grasping how Academy
						patterns apply to form management. This orchestration
						approach is exactly what I hoped you'd understand!"
					</p>

					<p className='story-paragraph'>
						"The key," Formeus explained, "is thinking of forms as
						systems, like Pattern Weaver taught you. Each piece -
						values, errors, touched states - they're all part of the
						same orchestrated pattern."
					</p>

					<p className='story-paragraph'>
						Binary added excitedly, "Pattern efficiency increased by
						73%! Academy training helps understand these
						optimization concepts!"
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

				<ChapterSummary
					lessonInsight={{
						title: "The Transmutation Circle's Secret:",
						content:
							"Complex form management becomes elegant through Academy-trained hook patterns. Unify related concerns - values, errors, touched states - into cohesive abstractions using the orchestration patterns you've mastered. Use useCallback for stable handler references, useEffect for reactive validation, and thoughtful state structure for maintainability. Remember: forms are systems, not collections of inputs. Build reusable patterns that encapsulate common behaviors, reducing boilerplate and increasing consistency across your application.",
					}}
					reflectionQuestions={[
						"How does Aria's Academy training in hook orchestration enhance traditional form management?",
						'Why is unifying form concerns into a single hook more powerful than managing them separately?',
						'What other form patterns could benefit from Academy-style hook composition?',
					]}
					journalEntry={{
						title: "Aria's Journal - Day 20 (Afternoon)",
						content:
							"Form state management is fascinating when viewed through Academy patterns! Formeus guided me through creating a comprehensive useForm hook that handles values, validation, and touch tracking. He was impressed with how I connected Academy concepts to form handling. The validation runs automatically when values change (using useEffect patterns from the Temporal Tower), touch tracking prevents premature error display, and useCallback optimizes the handlers like Professor Hooksworth taught. It's amazing how Academy training helps me understand these new concepts! Formeus says tomorrow we'll tackle different input types and their quirks.",
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
