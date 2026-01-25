import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterThree() {
	const {
		validationRunes,
		activateValidationRune,
		portalActive,
		openPortal,
	} = useOutletContext();

	// Aria's ultimate form management hook combining all Academy knowledge
	const useAdvancedForm = (initialValues, validationSchema) => {
		const [values, setValues] = useState(initialValues);
		const [errors, setErrors] = useState({});
		const [touched, setTouched] = useState({});
		const [isSubmitting, setIsSubmitting] = useState(false);
		const [submitCount, setSubmitCount] = useState(0);

		// Memoized validation for performance (Academy optimization training)
		const validate = useCallback(
			(fieldValues = values) => {
				const newErrors = {};
				Object.keys(validationSchema).forEach((field) => {
					const fieldValidation = validationSchema[field];
					const value = fieldValues[field];

					for (const rule of fieldValidation) {
						const error = rule(value, fieldValues);
						if (error) {
							newErrors[field] = error;
							break;
						}
					}
				});
				return newErrors;
			},
			[values, validationSchema]
		);

		// Effect for real-time validation (Temporal Tower training)
		useEffect(() => {
			const newErrors = validate();
			setErrors(newErrors);

			// Activate runes for valid fields
			Object.keys(values).forEach((field) => {
				if (!newErrors[field] && values[field] && touched[field]) {
					activateValidationRune(field);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [values, touched, validate]);

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

		const handleSubmit = useCallback(
			async (onSubmit) => {
				setSubmitCount((prev) => prev + 1);

				// Touch all fields
				const allTouched = {};
				Object.keys(values).forEach((key) => {
					allTouched[key] = true;
				});
				setTouched(allTouched);

				const validationErrors = validate();
				if (Object.keys(validationErrors).length > 0) {
					setErrors(validationErrors);
					return;
				}

				setIsSubmitting(true);
				openPortal();

				try {
					await onSubmit(values);
					// Reset on success
					setValues(initialValues);
					setErrors({});
					setTouched({});
				} catch (error) {
					console.error('Submission error:', error);
				} finally {
					setIsSubmitting(false);
				}
			},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[values, validate, initialValues]
	);

		const isValid = useMemo(
			() => Object.keys(errors).length === 0,
			[errors]
		);
		const isDirty = useMemo(
			() => JSON.stringify(values) !== JSON.stringify(initialValues),
			[values, initialValues]
		);

		return {
			values,
			errors,
			touched,
			isSubmitting,
			isValid,
			isDirty,
			submitCount,
			handleChange,
			handleBlur,
			handleSubmit,
		};
	};

	// Validation rules using patterns from Academy
	const required = (message) => (value) => !value ? message : null;
	const minLength = (min, message) => (value) =>
		value && value.length < min ? message : null;
	const email = (message) => (value) =>
		value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : null;
	const number = (min, max, message) => (value) => {
		const num = Number(value);
		return value && (isNaN(num) || num < min || num > max) ? message : null;
	};

	// Validation schema
	const validationSchema = {
		wizardName: [
			required('Every wizard must have a name'),
			minLength(3, 'Name must be at least 3 characters'),
		],
		spellLevel: [
			required('Spell level is required'),
			number(1, 10, 'Level must be between 1-10'),
		],
		email: [
			required('Contact email is required'),
			email('Must be a valid email address'),
		],
		ingredients: [
			required('Spells need ingredients'),
			(value) =>
				value && value.split(',').length < 2
					? 'At least 2 ingredients required'
					: null,
		],
		incantation: [
			required('No spell works without words'),
			minLength(10, 'Incantation too short - needs more power!'),
		],
	};

	// Using Aria's Academy-enhanced form hook
	const form = useAdvancedForm(
		{
			wizardName: '',
			spellLevel: '',
			email: '',
			ingredients: '',
			incantation: '',
			purpose: '',
		},
		validationSchema
	);

	const handleFormSubmit = async (values) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 3000));
		alert(`🎉 Spell successfully cast by ${values.wizardName}!`);
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={3}
					title='The Grand Transmutation'
					bridge={`In the final chamber of the Form Alchemy Lab, Formeus stood before an elaborate setup - multiple cauldrons connected by glowing channels, validation runes floating in the air, and a shimmering portal at the center. "This is it, Aria," he announced. "Let's see how your Academy mastery handles our most complex challenge."`}
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"This is the Grand Transmutation," Formeus announced
						solemnly. "Where all form alchemy converges. Most
						alchemists take years to master this, but with your
						Academy training in hook patterns..."
					</p>

					<p className='story-paragraph'>
						Aria studied the complex setup with curiosity. "This
						looks incredibly advanced! I can see patterns from my
						Academy training, but I'm not sure how they all fit
						together."
					</p>

					<p className='story-paragraph'>
						"Precisely the challenge!" Formeus beamed. "The Grand
						Transmutation requires combining everything you've
						learned with new form-specific patterns. Let me guide
						you through creating an advanced form management
						system."
					</p>

					<p className='story-paragraph'>
						Binary's processors hummed at maximum capacity, ready to
						assist with the learning process. "Academy patterns
						detected! Ready to apply previous training to new
						concepts!"
					</p>

					<p className='story-paragraph'>
						"We'll create a form management system together,"
						Formeus explained, "that combines everything: memoized
						validation for performance (like the Performance
						Sanctuary), proper submission handling with effects,
						field-level error display, and even validation runes
						that light up as fields become valid!"
					</p>

					<div className='validation-runes'>
						<h3>The Academy-Enhanced Validation Rune Circle</h3>
						<p>
							Each rune activates when its field passes all
							validations:
						</p>
						<div className='rune-circle'>
							{Object.keys(form.values).map((field) => (
								<div
									key={field}
									className={`validation-rune ${
										validationRunes[field] ? 'active' : ''
									} ${
										form.errors[field] &&
										form.touched[field]
											? 'error'
											: ''
									}`}>
									<div className='rune-symbol'>
										{field.charAt(0).toUpperCase()}
									</div>
									<div className='rune-label'>{field}</div>
								</div>
							))}
						</div>
					</div>

					<div
						className={`submission-portal ${
							portalActive ? 'active' : ''
						}`}>
						<div className='portal-vortex'></div>
						<div className='portal-status'>
							{portalActive
								? '✨ Transmuting...'
								: '🌀 Portal Ready'}
						</div>
					</div>
				</div>

				<CodeExample
					title="Aria's Academy-Enhanced Form System"
					discoveredBy="The Grand Transmutation Pattern"
					code={`// The Grand Transmutation Pattern - Academy Training Applied
const useAdvancedForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized validation for performance (Performance Sanctuary training)
  const validate = useCallback((fieldValues = values) => {
    const newErrors = {};
    Object.keys(validationSchema).forEach(field => {
      const fieldValidation = validationSchema[field];
      const value = fieldValues[field];
      
      for (const rule of fieldValidation) {
        const error = rule(value, fieldValues);
        if (error) {
          newErrors[field] = error;
          break;
        }
      }
    });
    return newErrors;
  }, [values, validationSchema]);

  // Real-time validation with useEffect (Temporal Tower training)
  useEffect(() => {
    const newErrors = validate();
    setErrors(newErrors);
  }, [values, validate]);

  // Optimized handlers with useCallback (Academy optimization)
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  // Performance optimizations with useMemo (Performance Trinity)
  const isValid = useMemo(() => 
    Object.keys(errors).length === 0, [errors]
  );

  return { 
    values, errors, touched, isSubmitting, isValid,
    handleChange, handleBlur, handleSubmit 
  };
};`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>
						The Grand Transmutation Demonstration
					</h3>
					<InstructionBox character="Formeus activates the submission portal.">
						Witness Aria's complete Academy-trained form system - combining all hook patterns into a unified, powerful form management solution!
					</InstructionBox>

					<div className='grand-form'>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit(handleFormSubmit);
							}}>
							<h4>🧙‍♂️ Academy-Enhanced Spell Creation Registry</h4>

							<div className='form-field'>
								<label>Wizard Name: ✦</label>
								<input
									type='text'
									name='wizardName'
									value={form.values.wizardName}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='Enter your wizard name'
									className={
										form.errors.wizardName &&
										form.touched.wizardName
											? 'error'
											: ''
									}
								/>
								{form.errors.wizardName &&
									form.touched.wizardName && (
										<p className='error-message'>
											{form.errors.wizardName}
										</p>
									)}
							</div>

							<div className='form-field'>
								<label>Contact Email: @</label>
								<input
									type='email'
									name='email'
									value={form.values.email}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='wizard@academy.com'
									className={
										form.errors.email && form.touched.email
											? 'error'
											: ''
									}
								/>
								{form.errors.email && form.touched.email && (
									<p className='error-message'>
										{form.errors.email}
									</p>
								)}
							</div>

							<div className='form-field'>
								<label>Spell Level (1-10): #</label>
								<input
									type='number'
									name='spellLevel'
									value={form.values.spellLevel}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='1-10'
									min='1'
									max='10'
									className={
										form.errors.spellLevel &&
										form.touched.spellLevel
											? 'error'
											: ''
									}
								/>
								{form.errors.spellLevel &&
									form.touched.spellLevel && (
										<p className='error-message'>
											{form.errors.spellLevel}
										</p>
									)}
							</div>

							<div className='form-field'>
								<label>Ingredients (comma-separated): ⟡</label>
								<input
									type='text'
									name='ingredients'
									value={form.values.ingredients}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='eye of newt, dragon scale, moonstone'
									className={
										form.errors.ingredients &&
										form.touched.ingredients
											? 'error'
											: ''
									}
								/>
								{form.errors.ingredients &&
									form.touched.ingredients && (
										<p className='error-message'>
											{form.errors.ingredients}
										</p>
									)}
							</div>

							<div className='form-field'>
								<label>Incantation: ✦</label>
								<textarea
									name='incantation'
									value={form.values.incantation}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='The magical words of your spell...'
									rows='3'
									className={
										form.errors.incantation &&
										form.touched.incantation
											? 'error'
											: ''
									}
								/>
								{form.errors.incantation &&
									form.touched.incantation && (
										<p className='error-message'>
											{form.errors.incantation}
										</p>
									)}
							</div>

							<div className='form-field'>
								<label>Purpose:</label>
								<select
									name='purpose'
									value={form.values.purpose}
									onChange={form.handleChange}>
									<option value=''>Select purpose...</option>
									<option value='healing'>Healing</option>
									<option value='protection'>
										Protection
									</option>
									<option value='transformation'>
										Transformation
									</option>
									<option value='divination'>
										Divination
									</option>
								</select>
							</div>

							<div className='form-status'>
								<div className='status-item'>
									Form Valid: {form.isValid ? '✅' : '❌'}
								</div>
								<div className='status-item'>
									Form Dirty: {form.isDirty ? 'Yes' : 'No'}
								</div>
								<div className='status-item'>
									Submit Attempts: {form.submitCount}
								</div>
							</div>

							<button
								type='submit'
								disabled={
									form.isSubmitting ||
									(!form.isValid && form.submitCount > 0)
								}
								className='transmute-button'>
								{form.isSubmitting
									? '✨ Casting Spell...'
									: '🎯 Cast Spell'}
							</button>
						</form>
					</div>
				</div>

				<div className='formeus-finale'>
					<p className='story-paragraph'>
						As they worked together, Formeus guided Aria through
						each step. "Excellent! You're quickly grasping how
						Academy patterns apply to form systems. Your hook
						training gives you a strong foundation for understanding
						these concepts."
					</p>

					<p className='story-paragraph'>
						"It's amazing how everything connects," Aria marveled.
						"useState for values, useCallback for handler
						optimization (Performance Sanctuary), useMemo for
						expensive computations, useEffect for reactive
						validation (Temporal Tower). Every Academy pattern has a
						role in form alchemy!"
					</p>

					<p className='story-paragraph'>
						"Precisely!" Formeus beamed. "You're learning faster
						than most because you already understand the underlying
						hook patterns. Now you see how they apply to practical
						form handling."
					</p>

					<p className='story-paragraph'>
						Binary projected statistics: "Form validation
						efficiency: 95%. User experience score: 98%. Code
						reusability: 100%. Academy training patterns
						successfully applied to form handling!"
					</p>
				</div>

				<div className='practical-application'>
					<h3>The Complete Academy-Enhanced Form Toolkit</h3>
					<div className='toolkit-grid'>
						<div className='tool-card'>
							<h4>🧪 Validation Composition</h4>
							<pre className='mini-code'>{`// Composable validation rules
const required = (msg) => (val) => 
  !val ? msg : null;

const minLength = (min, msg) => (val) => 
  val.length < min ? msg : null;

const compose = (...rules) => (val) => 
  rules.map(rule => rule(val))
    .find(error => error);`}</pre>
						</div>
						<div className='tool-card'>
							<h4>⚡ Performance Patterns</h4>
							<pre className='mini-code'>{`// Optimize expensive operations
const debouncedValidate = useMemo(
  () => debounce(validate, 300),
  [validate]
);

// Memoize computed values
const progress = useMemo(() => 
  (filledFields / totalFields) * 100,
  [filledFields, totalFields]
);`}</pre>
						</div>
						<div className='tool-card'>
							<h4>🎯 Error Handling</h4>
							<pre className='mini-code'>{`// Async submission with error handling
try {
  await api.submit(values);
  showSuccess('Form submitted!');
  resetForm();
} catch (error) {
  if (error.field) {
    setFieldError(error.field, error.message);
  } else {
    showGlobalError(error.message);
  }
}`}</pre>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: 'The Grand Transmutation Mastery:',
						content:
							"Complete form systems require orchestrating all Academy patterns. Build reusable hooks that encapsulate validation logic, submission handling, and state management using the hook orchestration patterns you've mastered. Use memoization for expensive validations, callbacks for stable handlers, and effects for reactive updates. Create composable validation rules that can be mixed and matched. Remember: great forms aren't just functional - they guide users, prevent errors, provide clear feedback, and handle edge cases gracefully. This is Academy-level React form mastery.",
					}}
					reflectionQuestions={[
						'How does the Grand Transmutation represent the culmination of Academy hook training?',
						"What makes Aria's Academy approach revolutionary compared to traditional form handling?",
						'Which Academy patterns from your own forms could benefit from this holistic approach?',
					]}
					journalEntry={{
						title: "Aria's Journal - Day 20 (Evening)",
						content:
							"What a day! Formeus guided me through the Grand Transmutation - a complete form system that uses every Academy pattern I've learned. The validation runes were inspired by the Hook Council chambers, lighting up as each field becomes valid. We used memoization from the Performance Sanctuary to optimize validation checks, callbacks from Academy training for stable handlers, and effects from the Temporal Tower for reactive validation. Formeus was excited to see how Academy patterns applied to form handling! The best part: now I understand how to build reusable form systems. Tomorrow we move to the Event Symphony Hall!",
					}}
					chapterEnding={[
						'As the final validation rune lit up and the portal stabilized, Formeus placed a hand on Aria\'s shoulder. "You\'ve applied Academy training faster than anyone in our history. Your hook mastery approach will be taught to future generations."',
						'"Thank you, Master Formeus," Aria replied. "But I sense there\'s more to learn about user interaction. What about handling complex events?"',
						'Formeus smiled. "Ah, you\'re ready for Conductor Eventus at the Event Symphony Hall. He\'s been eagerly awaiting someone with your Academy training. The way you handled form events shows you\'re ready for the full symphony of browser interactions."',
						'Binary displayed a map highlighting their next destination. "Event patterns detected in neighboring district. Shall we proceed to the Symphony Hall?"',
					]}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
