import React, { useState, useEffect, useCallback } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	// Custom hook for form field
	const useFormField = (initialValue, validator) => {
		const [value, setValue] = useState(initialValue);
		const [error, setError] = useState('');
		const [touched, setTouched] = useState(false);

		const handleChange = (e) => {
			const newValue = e.target.value;
			setValue(newValue);
			if (touched && validator) {
				setError(validator(newValue) || '');
			}
		};

		const handleBlur = () => {
			setTouched(true);
			if (validator) {
				setError(validator(value) || '');
			}
		};

		return {
			value,
			error,
			touched,
			onChange: handleChange,
			onBlur: handleBlur,
			reset: () => {
				setValue(initialValue);
				setError('');
				setTouched(false);
			},
		};
	};

	// Custom hook for form management
	const useForm = (initialValues, validators = {}) => {
		const [isSubmitting, setIsSubmitting] = useState(false);
		const [submitCount, setSubmitCount] = useState(0);

		// Create form fields
		const fields = {};
		Object.keys(initialValues).forEach((key) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			fields[key] = useFormField(initialValues[key], validators[key]);
		});

		const hasErrors = Object.values(fields).some((field) => field.error);
		const allTouched = Object.values(fields).every(
			(field) => field.touched
		);

		const handleSubmit = useCallback(
			async (onSubmit) => {
				setSubmitCount((count) => count + 1);

				// Touch all fields
				Object.values(fields).forEach((field) => field.onBlur());

				if (!hasErrors) {
					setIsSubmitting(true);
					try {
						const values = {};
						Object.keys(fields).forEach((key) => {
							values[key] = fields[key].value;
						});
						await onSubmit(values);
					} finally {
						setIsSubmitting(false);
					}
				}
			},
			[fields, hasErrors]
		);

		const reset = () => {
			Object.values(fields).forEach((field) => field.reset());
			setSubmitCount(0);
		};

		return {
			fields,
			handleSubmit,
			reset,
			isSubmitting,
			hasErrors,
			allTouched,
			submitCount,
		};
	};

	// Validators
	const validators = {
		username: (value) => {
			if (!value) return 'Username is required';
			if (value.length < 3)
				return 'Username must be at least 3 characters';
			if (!/^[a-zA-Z0-9_]+$/.test(value))
				return 'Username can only contain letters, numbers, and underscores';
			return '';
		},
		email: (value) => {
			if (!value) return 'Email is required';
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
				return 'Invalid email format';
			return '';
		},
		age: (value) => {
			if (!value) return 'Age is required';
			const age = parseInt(value);
			if (isNaN(age)) return 'Age must be a number';
			if (age < 1 || age > 150) return 'Age must be between 1 and 150';
			return '';
		},
	};

	// Using our orchestrated hooks
	const form = useForm({ username: '', email: '', age: '' }, validators);

	const handleFormSubmit = async (values) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log('Form submitted with values:', values);
		alert(`Welcome to the Orchestra, ${values.username}!`);
	};

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 1: The Grand Orchestra - Harmonizing Multiple Hooks
				</h2>

				<div className='chapter-bridge'>
					<p>
						The Integration Sanctum was breathtaking - a perfect
						sphere where energy streams from every part of the
						Academy converged. At its center stood a figure whose
						very presence seemed to weave the streams into
						intricate, ever-changing patterns.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Aria, Binary, welcome!" The figure turned, revealing
						robes that seemed woven from pure React patterns. "I am{' '}
						<strong>Pattern Weaver Synthesis</strong>, and this is
						where all your hook knowledge culminates into true
						mastery."
					</p>

					<p className='story-paragraph'>
						Binary's processors hummed with excitement, detecting
						the complex interplay of all the hooks they'd learned
						flowing together.
					</p>

					<p className='story-paragraph'>
						"You've learned individual hooks," Synthesis continued,
						gesturing to the energy streams, "but real applications
						require orchestration. Watch as I conduct multiple hooks
						like instruments in a symphony!"
					</p>

					<p className='story-paragraph'>
						Synthesis raised their hands, and the energy streams
						began to dance. "Form management is the perfect
						demonstration - it requires state, validation,
						submission handling, error management, all working in
						perfect harmony."
					</p>

					<p className='story-paragraph'>
						"Like a conductor managing an orchestra?" Aria
						suggested, already seeing the pattern.
					</p>

					<p className='story-paragraph'>
						"Precisely! Each hook plays its part," Synthesis smiled,
						"but together they create something far greater. Let me
						show you the Form Symphony pattern!"
					</p>

					<div className='orchestra-visualization'>
						<div className='orchestra-section'>
							<div className='instrument'>🎻 useState</div>
							<div className='instrument'>🎺 useEffect</div>
							<div className='instrument'>🥁 useCallback</div>
							<div className='instrument'>🎹 Custom Hooks</div>
						</div>
						<div className='conductor'>
							<div className='conductor-icon'>🎼</div>
							<div className='conductor-label'>
								Form Orchestrator
							</div>
						</div>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: The Form Symphony
					</h3>
					<div className='instruction-box'>
						<p>
							<strong>
								Experience how multiple custom hooks work
								together to create a powerful, reusable form
								management system!
							</strong>
						</p>
					</div>

					<div className='form-orchestra'>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit(handleFormSubmit);
							}}
							className='orchestrated-form'>
							<div className='form-section'>
								<div className='field-group'>
									<label>Username</label>
									<input
										type='text'
										{...form.fields.username}
										className={`form-input ${
											form.fields.username.error &&
											form.fields.username.touched
												? 'error'
												: ''
										}`}
										placeholder='Enter username'
									/>
									{form.fields.username.error &&
										form.fields.username.touched && (
											<span className='error-message'>
												{form.fields.username.error}
											</span>
										)}
								</div>

								<div className='field-group'>
									<label>Email</label>
									<input
										type='email'
										{...form.fields.email}
										className={`form-input ${
											form.fields.email.error &&
											form.fields.email.touched
												? 'error'
												: ''
										}`}
										placeholder='Enter email'
									/>
									{form.fields.email.error &&
										form.fields.email.touched && (
											<span className='error-message'>
												{form.fields.email.error}
											</span>
										)}
								</div>

								<div className='field-group'>
									<label>Age</label>
									<input
										type='number'
										{...form.fields.age}
										className={`form-input ${
											form.fields.age.error &&
											form.fields.age.touched
												? 'error'
												: ''
										}`}
										placeholder='Enter age'
									/>
									{form.fields.age.error &&
										form.fields.age.touched && (
											<span className='error-message'>
												{form.fields.age.error}
											</span>
										)}
								</div>
							</div>

							<div className='form-actions'>
								<button
									type='submit'
									className='submit-button'
									disabled={form.isSubmitting}>
									{form.isSubmitting
										? 'Submitting...'
										: 'Join the Orchestra'}
								</button>
								<button
									type='button'
									onClick={form.reset}
									className='reset-button'>
									Reset Form
								</button>
							</div>

							<div className='form-stats'>
								<div className='stat'>
									<span className='stat-label'>
										Submit Attempts:
									</span>
									<span className='stat-value'>
										{form.submitCount}
									</span>
								</div>
								<div className='stat'>
									<span className='stat-label'>
										Has Errors:
									</span>
									<span className='stat-value'>
										{form.hasErrors ? 'Yes' : 'No'}
									</span>
								</div>
								<div className='stat'>
									<span className='stat-label'>
										All Fields Touched:
									</span>
									<span className='stat-value'>
										{form.allTouched ? 'Yes' : 'No'}
									</span>
								</div>
							</div>
						</form>
					</div>

					<div className='code-visualization'>
						<h4>The Orchestration Pattern</h4>
						<pre className='magical-code'>
							{`// Custom hook for individual form fields
function useFormField(initialValue, validator) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // Validate on change if field was touched
    if (touched && validator) {
      setError(validator(newValue) || '');
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator) {
      setError(validator(value) || '');
    }
  };

  return {
    value,
    error,
    touched,
    onChange: handleChange,
    onBlur: handleBlur
  };
}

// Orchestrator hook that combines multiple field hooks
function useForm(initialValues, validators = {}) {
  const fields = {};
  
  // Create a field hook for each initial value
  Object.keys(initialValues).forEach(key => {
    fields[key] = useFormField(
      initialValues[key], 
      validators[key]
    );
  });

  const handleSubmit = async (onSubmit) => {
    // Validate all fields
    const hasErrors = Object.values(fields)
      .some(field => field.error);
    
    if (!hasErrors) {
      const values = {};
      Object.keys(fields).forEach(key => {
        values[key] = fields[key].value;
      });
      await onSubmit(values);
    }
  };

  return { fields, handleSubmit };
}`}
						</pre>
					</div>
				</div>

				<div className='practical-application'>
					<h3>Orchestration Patterns:</h3>
					<div className='pattern-showcase'>
						<div className='pattern-example'>
							<h4>1. Coordinator Pattern</h4>
							<p>One hook manages multiple child hooks</p>
							<pre className='mini-code'>
								{`const useCoordinator = () => {
  const state1 = useStateHook1();
  const state2 = useStateHook2();
  const combined = useCombiner(state1, state2);
  return { state1, state2, combined };
};`}
							</pre>
						</div>
						<div className='pattern-example'>
							<h4>2. Pipeline Pattern</h4>
							<p>Hooks process data in sequence</p>
							<pre className='mini-code'>
								{`const usePipeline = (data) => {
  const filtered = useFilter(data);
  const sorted = useSort(filtered);
  const paginated = usePagination(sorted);
  return paginated;
};`}
							</pre>
						</div>
					</div>
				</div>

				<div className='story-section'>
					<div className='character-intro'>
						<h4>Aria's Journal - Day 19 (Morning)</h4>
						<p>
							The Integration Sanctum revealed the true art of
							hooks - orchestration! Pattern Weaver Synthesis
							showed me how to conduct multiple hooks like a
							symphony. The Form Symphony pattern was brilliant:
							useFormField hooks for individual fields (each
							managing its own state, validation, touched status),
							then a useForm orchestrator that coordinates them
							all! The magic is in composition - simple hooks
							combining into complex systems. Like instruments in
							an orchestra, each hook has its role, but together
							they create something magnificent. This isn't just
							using hooks - it's thinking in patterns!
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>Orchestration Mastery:</h3>
					<p>
						Master hook patterns by thinking like a conductor. The
						Orchestra pattern combines multiple specialized hooks
						into coordinated systems. Build small, focused hooks
						(useFormField for field state), then compose them with
						orchestrator hooks (useForm for coordination). This
						separation enables reusability, testability, and
						maintainability. Popular patterns include Form
						Management, Data Pipeline (filter→sort→paginate), and
						State Machines. Remember: complex behavior emerges from
						simple, well-orchestrated parts.
					</p>
				</div>

				<div className='character-intro'>
					<h4>Character Introduction</h4>
					<p>
						<strong>Pattern Weaver Synthesis</strong> - Master of
						the Integration Sanctum, Synthesis teaches the highest
						art of hook composition. Their robes are woven from
						React patterns themselves, constantly shifting to
						demonstrate new combinations. They believe that true
						mastery comes not from individual techniques but from
						understanding how to weave them together into elegant
						solutions.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does orchestration differ from simply using multiple
						hooks?
					</p>
					<p className='story-paragraph'>
						What UI patterns in your applications could benefit from
						this approach?
					</p>
					<p className='story-paragraph'>
						Why is composition more powerful than building
						monolithic hooks?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
