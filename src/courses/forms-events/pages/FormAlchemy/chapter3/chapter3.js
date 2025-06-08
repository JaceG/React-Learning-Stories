import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterThree() {
	const { 
		validationRunes,
		activateValidationRune,
		portalActive,
		openPortal
	} = useOutletContext();

	// Aria's ultimate form management hook
	const useAdvancedForm = (initialValues, validationSchema) => {
		const [values, setValues] = useState(initialValues);
		const [errors, setErrors] = useState({});
		const [touched, setTouched] = useState({});
		const [isSubmitting, setIsSubmitting] = useState(false);
		const [submitCount, setSubmitCount] = useState(0);

		// Memoized validation for performance
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

		// Effect for real-time validation
		useEffect(() => {
			const newErrors = validate();
			setErrors(newErrors);
			
			// Activate runes for valid fields
			Object.keys(values).forEach(field => {
				if (!newErrors[field] && values[field] && touched[field]) {
					activateValidationRune(field);
				}
			});
		}, [values, touched, validate, activateValidationRune]);

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

		const handleSubmit = useCallback(async (onSubmit) => {
			setSubmitCount(prev => prev + 1);
			
			// Touch all fields
			const allTouched = {};
			Object.keys(values).forEach(key => { allTouched[key] = true; });
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
		}, [values, validate, initialValues, openPortal]);

		const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
		const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [values, initialValues]);

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
			handleSubmit
		};
	};

	// Validation rules
	const required = (message) => (value) => !value ? message : null;
	const minLength = (min, message) => (value) => value && value.length < min ? message : null;
	const email = (message) => (value) => value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : null;
	const number = (min, max, message) => (value) => {
		const num = Number(value);
		return value && (isNaN(num) || num < min || num > max) ? message : null;
	};

	// Validation schema
	const validationSchema = {
		wizardName: [
			required('Every wizard must have a name'),
			minLength(3, 'Name must be at least 3 characters')
		],
		spellLevel: [
			required('Spell level is required'),
			number(1, 10, 'Level must be between 1-10')
		],
		email: [
			required('Contact email is required'),
			email('Must be a valid email address')
		],
		ingredients: [
			required('Spells need ingredients'),
			(value) => value && value.split(',').length < 2 ? 'At least 2 ingredients required' : null
		],
		incantation: [
			required('No spell works without words'),
			minLength(10, 'Incantation too short - needs more power!')
		]
	};

	// Using Aria's advanced form hook
	const form = useAdvancedForm(
		{
			wizardName: '',
			spellLevel: '',
			email: '',
			ingredients: '',
			incantation: '',
			purpose: ''
		},
		validationSchema
	);

	const handleFormSubmit = async (values) => {
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 3000));
		alert(`🎉 Spell successfully cast by ${values.wizardName}!`);
	};

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 3: The Grand Transmutation</h2>
			
			<div className='chapter-bridge'>
				<p>In the final chamber of the Form Alchemy Lab, Formeus stood before an elaborate 
				setup - multiple cauldrons connected by glowing channels, validation runes floating 
				in the air, and a shimmering portal at the center.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"This is it, Aria," Formeus announced solemnly. "The Grand Transmutation - where 
					all form alchemy converges. Most alchemists take years to master this, but with 
					your hook expertise..."
				</p>
				
				<p className='story-paragraph'>
					Aria stepped forward confidently. "I see it now. Forms aren't just about inputs and 
					validation - they're complete systems. Let me show you what I learned from combining 
					all my React knowledge."
				</p>
				
				<p className='story-paragraph'>
					Binary's processors hummed at maximum capacity, ready to assist with the most complex 
					form pattern yet. "All systems ready for Grand Transmutation protocol!"
				</p>
				
				<p className='story-paragraph'>
					"I'll create a form management system," Aria declared, "that combines everything: 
					memoized validation for performance, proper submission handling, field-level error 
					display, and even validation runes that light up as fields become valid!"
				</p>

				<div className='validation-runes'>
					<h3>The Validation Rune Circle</h3>
					<p>Each rune activates when its field passes all validations:</p>
					<div className='rune-circle'>
						{Object.keys(form.values).map((field) => (
							<div 
								key={field}
								className={`validation-rune ${validationRunes[field] ? 'active' : ''} ${form.errors[field] && form.touched[field] ? 'error' : ''}`}>
								<div className='rune-symbol'>{field.charAt(0).toUpperCase()}</div>
								<div className='rune-label'>{field}</div>
							</div>
						))}
					</div>
				</div>

				<div className={`submission-portal ${portalActive ? 'active' : ''}`}>
					<div className='portal-vortex'></div>
					<div className='portal-status'>
						{portalActive ? '✨ Transmuting...' : '🌀 Portal Ready'}
					</div>
				</div>
			</div>

			<div className='aria-masterpiece'>
				<h3>Aria's Ultimate Form System</h3>
				<pre className='magical-code'>{`// The Grand Transmutation Pattern
const useAdvancedForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized validation for performance
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

  // Real-time validation with useEffect
  useEffect(() => {
    const newErrors = validate();
    setErrors(newErrors);
  }, [values, validate]);

  // Optimized handlers with useCallback
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  // Performance optimizations with useMemo
  const isValid = useMemo(() => 
    Object.keys(errors).length === 0, [errors]
  );

  return { 
    values, errors, touched, isSubmitting, isValid,
    handleChange, handleBlur, handleSubmit 
  };
};`}</pre>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					The Grand Transmutation Demonstration
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Witness Aria's complete form alchemy system - combining all React patterns 
							into a unified, powerful form management solution!
						</strong>
					</p>
				</div>

				<div className='grand-form'>
					<form onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit(handleFormSubmit);
					}}>
						<h4>🧙‍♂️ Spell Creation Registry</h4>
						
						<div className='form-field'>
							<label>Wizard Name: ✦</label>
							<input
								type='text'
								name='wizardName'
								value={form.values.wizardName}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								placeholder='Enter your wizard name'
								className={form.errors.wizardName && form.touched.wizardName ? 'error' : ''}
							/>
							{form.errors.wizardName && form.touched.wizardName && (
								<p className='error-message'>{form.errors.wizardName}</p>
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
								className={form.errors.email && form.touched.email ? 'error' : ''}
							/>
							{form.errors.email && form.touched.email && (
								<p className='error-message'>{form.errors.email}</p>
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
								className={form.errors.spellLevel && form.touched.spellLevel ? 'error' : ''}
							/>
							{form.errors.spellLevel && form.touched.spellLevel && (
								<p className='error-message'>{form.errors.spellLevel}</p>
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
								className={form.errors.ingredients && form.touched.ingredients ? 'error' : ''}
							/>
							{form.errors.ingredients && form.touched.ingredients && (
								<p className='error-message'>{form.errors.ingredients}</p>
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
								className={form.errors.incantation && form.touched.incantation ? 'error' : ''}
							/>
							{form.errors.incantation && form.touched.incantation && (
								<p className='error-message'>{form.errors.incantation}</p>
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
								<option value='protection'>Protection</option>
								<option value='transformation'>Transformation</option>
								<option value='divination'>Divination</option>
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
							disabled={form.isSubmitting || (!form.isValid && form.submitCount > 0)}
							className='transmute-button'>
							{form.isSubmitting ? '✨ Casting Spell...' : '🎯 Cast Spell'}
						</button>
					</form>
				</div>
			</div>

			<div className='formeus-finale'>
				<p className='story-paragraph'>
					Formeus watched in awe as Aria's form system handled every edge case flawlessly. 
					"This is... this is beyond anything in our ancient texts! You've combined performance 
					optimization, user experience, and maintainability into one elegant solution!"
				</p>
				
				<p className='story-paragraph'>
					"It's the synthesis of everything," Aria explained. "useState for values, useCallback 
					for handler optimization, useMemo for expensive computations, useEffect for reactive 
					validation. Every hook has its role in the grand transmutation."
				</p>
				
				<p className='story-paragraph'>
					Binary projected statistics: "Form validation efficiency: 95%. User experience score: 
					98%. Code reusability: 100%. This pattern could revolutionize form handling across 
					the entire kingdom!"
				</p>
			</div>

			<div className='practical-application'>
				<h3>The Complete Form Alchemy Toolkit</h3>
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

			<div className='story-section'>
				<div className='character-intro'>
					<h4>Aria's Journal - Day 20 (Evening)</h4>
					<p>What a day! Created the Grand Transmutation - a complete form system using every 
					React pattern I've learned. The validation runes were inspired by the Council chambers, 
					lighting up as each field becomes valid. Used memoization from Performance Sanctuary 
					to optimize validation checks, callbacks from Echo Tower for stable handlers, and 
					effects from Temporal Tower for reactive validation. Formeus declared it revolutionary! 
					The best part: the entire system is reusable. Any form in the kingdom can now use 
					this pattern. Binary is already compiling optimization metrics. Tomorrow we move to 
					the Event Symphony Hall!</p>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Grand Transmutation Mastery:</h3>
				<p>
					Complete form systems require orchestrating all React patterns. Build reusable hooks 
					that encapsulate validation logic, submission handling, and state management. Use 
					memoization for expensive validations, callbacks for stable handlers, and effects 
					for reactive updates. Create composable validation rules that can be mixed and matched. 
					Remember: great forms aren't just functional - they guide users, prevent errors, 
					provide clear feedback, and handle edge cases gracefully. This is the true alchemy 
					of React forms.
				</p>
			</div>
			
			<div className='chapter-finale'>
				<p className='story-paragraph'>
					As the final validation rune lit up and the portal stabilized, Formeus placed a 
					hand on Aria's shoulder. "You've mastered Form Alchemy faster than anyone in our 
					history. Your approach will be taught to future generations."
				</p>
				<p className='story-paragraph'>
					"Thank you, Master Formeus," Aria replied. "But I sense there's more to learn about 
					user interaction. What about handling complex events?"
				</p>
				<p className='story-paragraph'>
					Formeus smiled. "Ah, you're ready for Conductor Eventus at the Event Symphony Hall. 
					He's been eagerly awaiting someone with your talents. The way you handled form events 
					shows you're ready for the full symphony of browser interactions."
				</p>
				<p className='story-paragraph'>
					Binary displayed a map highlighting their next destination. "Event patterns detected 
					in neighboring district. Shall we proceed to the Symphony Hall?"
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the Grand Transmutation represent the culmination of all React knowledge?
				</p>
				<p className='story-paragraph'>
					What makes Aria's approach revolutionary compared to traditional form handling?
				</p>
				<p className='story-paragraph'>
					Which patterns from your own forms could benefit from this holistic approach?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterThree;