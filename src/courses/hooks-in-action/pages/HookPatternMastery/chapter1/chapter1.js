import { useState, useEffect, useCallback } from 'react';

const ChapterOne = () => {
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
			}
		};
	};

	// Custom hook for form management
	const useForm = (initialValues, validators = {}) => {
		const [isSubmitting, setIsSubmitting] = useState(false);
		const [submitCount, setSubmitCount] = useState(0);

		// Create form fields
		const fields = {};
		Object.keys(initialValues).forEach(key => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			fields[key] = useFormField(initialValues[key], validators[key]);
		});

		const hasErrors = Object.values(fields).some(field => field.error);
		const allTouched = Object.values(fields).every(field => field.touched);

		const handleSubmit = useCallback(async (onSubmit) => {
			setSubmitCount(count => count + 1);
			
			// Touch all fields
			Object.values(fields).forEach(field => field.onBlur());

			if (!hasErrors) {
				setIsSubmitting(true);
				try {
					const values = {};
					Object.keys(fields).forEach(key => {
						values[key] = fields[key].value;
					});
					await onSubmit(values);
				} finally {
					setIsSubmitting(false);
				}
			}
		}, [fields, hasErrors]);

		const reset = () => {
			Object.values(fields).forEach(field => field.reset());
			setSubmitCount(0);
		};

		return {
			fields,
			handleSubmit,
			reset,
			isSubmitting,
			hasErrors,
			allTouched,
			submitCount
		};
	};

	// Validators
	const validators = {
		username: (value) => {
			if (!value) return 'Username is required';
			if (value.length < 3) return 'Username must be at least 3 characters';
			if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
			return '';
		},
		email: (value) => {
			if (!value) return 'Email is required';
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
			return '';
		},
		age: (value) => {
			if (!value) return 'Age is required';
			const age = parseInt(value);
			if (isNaN(age)) return 'Age must be a number';
			if (age < 1 || age > 150) return 'Age must be between 1 and 150';
			return '';
		}
	};

	// Using our orchestrated hooks
	const form = useForm(
		{ username: '', email: '', age: '' },
		validators
	);

	const handleFormSubmit = async (values) => {
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 2000));
		console.log('Form submitted with values:', values);
		alert(`Welcome to the Orchestra, ${values.username}!`);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Grand Orchestra - Harmonizing Multiple Hooks
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the grand concert hall of React Kingdom, Maestro <strong>Hookius</strong> 
					stood before an orchestra of hooks, each playing its own unique melody. 
					"Today," he announced, raising his conductor's baton, "we shall learn the 
					art of making multiple hooks work in perfect harmony. Like instruments in 
					an orchestra, each hook has its role, but together they create something 
					far more beautiful than any could alone."
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
						<div className='conductor-label'>Form Orchestrator</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Watch," said Maestro Hookius, "as we conduct a form symphony. Each field 
					is like a musician, with its own state and validation. The form orchestrator 
					brings them all together, ensuring they play in sync, handle errors gracefully, 
					and perform as one unified ensemble!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Form Symphony
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Experience how multiple custom hooks work together to create a 
							powerful, reusable form management system!
						</strong>
					</p>
				</div>

				<div className='form-orchestra'>
					<form onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit(handleFormSubmit);
					}} className='orchestrated-form'>
						<div className='form-section'>
							<div className='field-group'>
								<label>Username</label>
								<input
									type='text'
									{...form.fields.username}
									className={`form-input ${form.fields.username.error && form.fields.username.touched ? 'error' : ''}`}
									placeholder='Enter username'
								/>
								{form.fields.username.error && form.fields.username.touched && (
									<span className='error-message'>{form.fields.username.error}</span>
								)}
							</div>

							<div className='field-group'>
								<label>Email</label>
								<input
									type='email'
									{...form.fields.email}
									className={`form-input ${form.fields.email.error && form.fields.email.touched ? 'error' : ''}`}
									placeholder='Enter email'
								/>
								{form.fields.email.error && form.fields.email.touched && (
									<span className='error-message'>{form.fields.email.error}</span>
								)}
							</div>

							<div className='field-group'>
								<label>Age</label>
								<input
									type='number'
									{...form.fields.age}
									className={`form-input ${form.fields.age.error && form.fields.age.touched ? 'error' : ''}`}
									placeholder='Enter age'
								/>
								{form.fields.age.error && form.fields.age.touched && (
									<span className='error-message'>{form.fields.age.error}</span>
								)}
							</div>
						</div>

						<div className='form-actions'>
							<button 
								type='submit' 
								className='submit-button'
								disabled={form.isSubmitting}>
								{form.isSubmitting ? 'Submitting...' : 'Join the Orchestra'}
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
								<span className='stat-label'>Submit Attempts:</span>
								<span className='stat-value'>{form.submitCount}</span>
							</div>
							<div className='stat'>
								<span className='stat-label'>Has Errors:</span>
								<span className='stat-value'>{form.hasErrors ? 'Yes' : 'No'}</span>
							</div>
							<div className='stat'>
								<span className='stat-label'>All Fields Touched:</span>
								<span className='stat-value'>{form.allTouched ? 'Yes' : 'No'}</span>
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

			<div className='lesson-insight'>
				<h3>The Orchestra Lesson:</h3>
				<p>
					Like a conductor leading an orchestra, combining multiple hooks requires 
					understanding how each part contributes to the whole. By creating hooks 
					that work together, you can build complex functionality from simple, 
					reusable pieces. This orchestration pattern allows you to manage state, 
					side effects, and logic in a coordinated way, making your components 
					cleaner and your code more maintainable. Remember: the beauty lies not 
					in individual hooks, but in how they harmonize together.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the orchestra metaphor help you understand the coordination 
					of multiple hooks? Think about how each hook plays its part while 
					contributing to a larger purpose.
				</p>
				<p>
					What other complex UI patterns could benefit from this orchestration 
					approach? Consider scenarios like data tables, wizards, or interactive 
					dashboards.
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;