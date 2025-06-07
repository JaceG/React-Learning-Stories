import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const { 
		fortressSecured,
		checkFortressSecurity,
		validationStrategies,
		addStrategy,
		logDefense
	} = useOutletContext();

	const [wizardForm, setWizardForm] = useState({
		// Step 1: Basic Info
		firstName: '',
		lastName: '',
		email: '',
		// Step 2: Security
		password: '',
		confirmPassword: '',
		securityQuestion: '',
		// Step 3: Details
		country: '',
		acceptTerms: false,
		newsletter: false
	});

	const [currentStep, setCurrentStep] = useState(1);
	const [stepValidation, setStepValidation] = useState({
		1: false,
		2: false,
		3: false
	});
	const [validationSchema, setValidationSchema] = useState(null);
	const [customRules, setCustomRules] = useState([]);

	const strategies = [
		{ id: 'yup', name: 'Yup Schema', icon: '📋' },
		{ id: 'joi', name: 'Joi Validation', icon: '🎯' },
		{ id: 'custom', name: 'Custom Rules', icon: '⚡' },
		{ id: 'html5', name: 'HTML5 Native', icon: '🌐' }
	];

	useEffect(() => {
		checkFortressSecurity();
	}, [stepValidation]);

	// Validation schemas for each step
	const stepSchemas = {
		1: {
			firstName: [(v) => v.length >= 2 || 'Minimum 2 characters'],
			lastName: [(v) => v.length >= 2 || 'Minimum 2 characters'],
			email: [
				(v) => v.includes('@') || 'Invalid email',
				(v) => v.includes('.') || 'Invalid email format'
			]
		},
		2: {
			password: [
				(v) => v.length >= 8 || 'Minimum 8 characters',
				(v) => /[A-Z]/.test(v) || 'Need uppercase letter',
				(v) => /[a-z]/.test(v) || 'Need lowercase letter',
				(v) => /\d/.test(v) || 'Need number'
			],
			confirmPassword: [(v, form) => v === form.password || 'Passwords must match'],
			securityQuestion: [(v) => v.length > 0 || 'Security question required']
		},
		3: {
			country: [(v) => v.length > 0 || 'Please select country'],
			acceptTerms: [(v) => v === true || 'Must accept terms']
		}
	};

	const validateStep = (step) => {
		const schema = stepSchemas[step];
		let isValid = true;

		Object.keys(schema).forEach(field => {
			const rules = schema[field];
			const value = wizardForm[field];

			for (const rule of rules) {
				const result = rule(value, wizardForm);
				if (result !== true) {
					isValid = false;
					logDefense(`Step ${step} - ${field}: ${result}`, false);
					break;
				}
			}
		});

		setStepValidation({ ...stepValidation, [step]: isValid });
		if (isValid) {
			logDefense(`Step ${step} validation passed!`, true);
		}

		return isValid;
	};

	const handleFieldChange = (field, value) => {
		setWizardForm({ ...wizardForm, [field]: value });
	};

	const nextStep = () => {
		if (validateStep(currentStep)) {
			setCurrentStep(currentStep + 1);
			addStrategy(`Step ${currentStep} Validation`);
		}
	};

	const prevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const submitForm = () => {
		if (validateStep(3)) {
			logDefense('🎉 Fortress fully secured! Form submitted successfully!', true);
			alert('Fortress secured! Your form has been submitted.');
		}
	};

	const addCustomRule = () => {
		const newRule = prompt('Enter custom validation rule (e.g., "Phone must be 10 digits"):');
		if (newRule) {
			setCustomRules([...customRules, newRule]);
			addStrategy('Custom Rule');
			logDefense(`Custom rule added: ${newRule}`, true);
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Ultimate Defense Strategy
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					For the final challenge, Vera had to defend against the most 
					complex attack - a multi-stage form wizard. She would need to 
					combine all her knowledge: step validation, conditional rules, 
					and strategic deployment of validation libraries to create an 
					impenetrable defense.
				</p>

				<div className={`fortress ${fortressSecured ? 'fortified' : ''}`}>
					<h3>Fortress Status: {fortressSecured ? '🏰 SECURED' : '⚠️ VULNERABLE'}</h3>
					
					<div className='validation-strategy'>
						<h4>Available Strategies</h4>
						<div className='strategy-grid'>
							{strategies.map(strategy => (
								<div 
									key={strategy.id}
									className='strategy-card'
									onClick={() => addStrategy(strategy.name)}>
									<div style={{ fontSize: '2rem' }}>{strategy.icon}</div>
									<h5>{strategy.name}</h5>
									{validationStrategies.includes(strategy.name) && 
										<span style={{ color: '#2ecc71' }}>✓ Active</span>
									}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					The Ultimate Form Wizard
				</h3>

				<div className='guardian-form'>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
						{[1, 2, 3].map(step => (
							<div 
								key={step}
								style={{
									flex: 1,
									textAlign: 'center',
									padding: '1rem',
									background: currentStep === step ? '#3498db' : 
										stepValidation[step] ? '#2ecc71' : '#7f8c8d',
									color: 'white',
									borderRadius: '4px',
									margin: '0 0.25rem'
								}}>
								Step {step}
								{stepValidation[step] && ' ✓'}
							</div>
						))}
					</div>

					{currentStep === 1 && (
						<div>
							<h4>Step 1: Basic Information</h4>
							<div className='validation-field'>
								<label>First Name:</label>
								<input
									type='text'
									value={wizardForm.firstName}
									onChange={(e) => handleFieldChange('firstName', e.target.value)}
									placeholder='Min 2 characters'
								/>
							</div>
							<div className='validation-field'>
								<label>Last Name:</label>
								<input
									type='text'
									value={wizardForm.lastName}
									onChange={(e) => handleFieldChange('lastName', e.target.value)}
									placeholder='Min 2 characters'
								/>
							</div>
							<div className='validation-field'>
								<label>Email:</label>
								<input
									type='email'
									value={wizardForm.email}
									onChange={(e) => handleFieldChange('email', e.target.value)}
									placeholder='guardian@fortress.com'
								/>
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div>
							<h4>Step 2: Security Setup</h4>
							<div className='validation-field'>
								<label>Password:</label>
								<input
									type='password'
									value={wizardForm.password}
									onChange={(e) => handleFieldChange('password', e.target.value)}
									placeholder='Strong password required'
								/>
								<div className='validation-rules'>
									<span className={`rule ${wizardForm.password.length >= 8 ? 'passed' : ''}`}>
										8+ chars
									</span>
									<span className={`rule ${/[A-Z]/.test(wizardForm.password) ? 'passed' : ''}`}>
										Uppercase
									</span>
									<span className={`rule ${/[a-z]/.test(wizardForm.password) ? 'passed' : ''}`}>
										Lowercase
									</span>
									<span className={`rule ${/\d/.test(wizardForm.password) ? 'passed' : ''}`}>
										Number
									</span>
								</div>
							</div>
							<div className='validation-field'>
								<label>Confirm Password:</label>
								<input
									type='password'
									value={wizardForm.confirmPassword}
									onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
									placeholder='Must match password'
								/>
							</div>
							<div className='validation-field'>
								<label>Security Question:</label>
								<select
									value={wizardForm.securityQuestion}
									onChange={(e) => handleFieldChange('securityQuestion', e.target.value)}>
									<option value=''>Select a question...</option>
									<option value='pet'>First pet's name?</option>
									<option value='city'>Birth city?</option>
									<option value='school'>First school?</option>
								</select>
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div>
							<h4>Step 3: Final Details</h4>
							<div className='validation-field'>
								<label>Country:</label>
								<select
									value={wizardForm.country}
									onChange={(e) => handleFieldChange('country', e.target.value)}>
									<option value=''>Select country...</option>
									<option value='us'>United States</option>
									<option value='uk'>United Kingdom</option>
									<option value='ca'>Canada</option>
									<option value='au'>Australia</option>
								</select>
							</div>
							<div className='validation-field'>
								<label>
									<input
										type='checkbox'
										checked={wizardForm.acceptTerms}
										onChange={(e) => handleFieldChange('acceptTerms', e.target.checked)}
									/>
									I accept the terms and conditions
								</label>
							</div>
							<div className='validation-field'>
								<label>
									<input
										type='checkbox'
										checked={wizardForm.newsletter}
										onChange={(e) => handleFieldChange('newsletter', e.target.checked)}
									/>
									Subscribe to newsletter
								</label>
							</div>
						</div>
					)}

					<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
						<button
							onClick={prevStep}
							disabled={currentStep === 1}
							style={{
								opacity: currentStep === 1 ? 0.5 : 1,
								cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
							}}>
							← Previous
						</button>
						
						{currentStep < 3 ? (
							<button onClick={nextStep}>
								Next →
							</button>
						) : (
							<button 
								onClick={submitForm}
								style={{
									background: '#2ecc71',
									color: 'white',
									fontWeight: 'bold'
								}}>
								Submit & Secure Fortress
							</button>
						)}
					</div>
				</div>

				<div style={{ marginTop: '2rem' }}>
					<button onClick={addCustomRule} style={{ marginBottom: '1rem' }}>
						+ Add Custom Validation Rule
					</button>
					{customRules.length > 0 && (
						<div className='spell-book'>
							<h4>Custom Rules</h4>
							<ul>
								{customRules.map((rule, index) => (
									<li key={index}>{rule}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Complete Form Validation Strategy

// 1. Schema-based Validation (using Yup)
import * as yup from 'yup';

const wizardSchema = {
  step1: yup.object({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    email: yup.string().email().required()
  }),
  step2: yup.object({
    password: yup.string()
      .min(8)
      .matches(/[A-Z]/, 'Need uppercase')
      .matches(/[a-z]/, 'Need lowercase')
      .matches(/\\d/, 'Need number')
      .required(),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required()
  })
};

// 2. Custom Hook for Form Wizard
function useFormWizard(steps, schemas) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [stepErrors, setStepErrors] = useState({});

  const validateStep = async (step) => {
    try {
      await schemas[step].validate(formData, { abortEarly: false });
      setStepErrors({});
      return true;
    } catch (err) {
      const errors = err.inner.reduce((acc, error) => ({
        ...acc,
        [error.path]: error.message
      }), {});
      setStepErrors(errors);
      return false;
    }
  };

  const next = async () => {
    if (await validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps - 1));
    }
  };

  const previous = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return {
    currentStep,
    formData,
    stepErrors,
    setFormData,
    next,
    previous,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps - 1
  };
}

// 3. Conditional Validation
const conditionalValidation = {
  businessEmail: (values) => {
    if (values.accountType === 'business') {
      return values.email.includes('@company.com') 
        ? null 
        : 'Business accounts require company email';
    }
    return null;
  },
  
  ageRestriction: (values) => {
    if (values.contentType === 'adult') {
      return values.age >= 18 
        ? null 
        : 'Must be 18+ for this content';
    }
    return null;
  }
};`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Master Guardian's Lesson:</h3>
				<p>
					The ultimate defense combines multiple validation strategies: 
					schema-based validation for consistency, step-by-step validation 
					for complex forms, conditional rules for dynamic requirements, 
					and custom validators for unique business logic. Like a fortress 
					with multiple layers of defense, each validation layer catches 
					different types of invalid data. The key is balancing security 
					with user experience - guide users through validation rather 
					than blocking them with walls of errors.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does breaking validation into steps (like a multi-stage 
					fortress defense) improve the user experience?
				</p>
				<p>
					What advantages do validation libraries provide over writing 
					all validation logic from scratch?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;