import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const { 
		wardRunes,
		activateWardRune,
		guardianStance,
		changeStance,
		logDefense,
		defenseLog
	} = useOutletContext();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		birthDate: ''
	});

	const [touchedFields, setTouchedFields] = useState({});
	const [validationMode, setValidationMode] = useState('onBlur');

	const stances = [
		{
			name: 'defensive',
			icon: '🛡️',
			description: 'Validate on blur - gentle protection'
		},
		{
			name: 'aggressive',
			icon: '⚔️',
			description: 'Validate on change - immediate feedback'
		},
		{
			name: 'strategic',
			icon: '🎯',
			description: 'Validate on submit - delayed validation'
		}
	];

	const complexValidations = {
		passwordStrength: (password) => {
			const hasUpper = /[A-Z]/.test(password);
			const hasLower = /[a-z]/.test(password);
			const hasNumber = /\d/.test(password);
			const hasSpecial = /[!@#$%^&*]/.test(password);
			const isLongEnough = password.length >= 8;

			const strength = [hasUpper, hasLower, hasNumber, hasSpecial, isLongEnough]
				.filter(Boolean).length;

			if (strength === 5) {
				activateWardRune('Ultimate');
				return { valid: true, strength: 'Ultimate', message: 'Maximum protection!' };
			} else if (strength >= 3) {
				activateWardRune('Strong');
				return { valid: true, strength: 'Strong', message: 'Good protection' };
			} else {
				return { valid: false, strength: 'Weak', message: 'Need stronger password' };
			}
		},

		matchingFields: (value1, value2, fieldName) => {
			if (value1 === value2 && value1.length > 0) {
				activateWardRune('Match');
				return { valid: true, message: `${fieldName} match!` };
			}
			return { valid: false, message: `${fieldName} must match` };
		},

		ageVerification: (birthDate) => {
			const today = new Date();
			const birth = new Date(birthDate);
			const age = today.getFullYear() - birth.getFullYear();
			const monthDiff = today.getMonth() - birth.getMonth();
			
			const actualAge = monthDiff < 0 || 
				(monthDiff === 0 && today.getDate() < birth.getDate()) 
				? age - 1 : age;

			if (actualAge >= 18) {
				activateWardRune('Age');
				return { valid: true, message: 'Age verified' };
			}
			return { valid: false, message: 'Must be 18 or older' };
		},

		asyncEmailCheck: async (email) => {
			logDefense('Checking email availability...', true);
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			const taken = ['admin@test.com', 'user@test.com'].includes(email.toLowerCase());
			if (!taken && email.includes('@')) {
				activateWardRune('Unique');
				return { valid: true, message: 'Email available' };
			}
			return { valid: false, message: taken ? 'Email already taken' : 'Invalid email' };
		}
	};

	const handleFieldChange = (fieldName, value) => {
		setFormData({ ...formData, [fieldName]: value });

		if (guardianStance === 'aggressive' || touchedFields[fieldName]) {
			validateField(fieldName, value);
		}
	};

	const handleFieldBlur = (fieldName) => {
		setTouchedFields({ ...touchedFields, [fieldName]: true });
		
		if (guardianStance === 'defensive') {
			validateField(fieldName, formData[fieldName]);
		}
	};

	const validateField = async (fieldName, value) => {
		switch (fieldName) {
			case 'password':
				const strengthResult = complexValidations.passwordStrength(value);
				logDefense(
					`Password strength: ${strengthResult.strength}`,
					strengthResult.valid
				);
				break;
			
			case 'confirmPassword':
				const matchResult = complexValidations.matchingFields(
					formData.password,
					value,
					'Passwords'
				);
				logDefense(matchResult.message, matchResult.valid);
				break;
			
			case 'birthDate':
				if (value) {
					const ageResult = complexValidations.ageVerification(value);
					logDefense(ageResult.message, ageResult.valid);
				}
				break;
			
			case 'email':
				if (value && value.includes('@')) {
					await complexValidations.asyncEmailCheck(value);
				}
				break;
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: Advanced Protection Spells
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Vera discovered that simple gates weren't enough. The fortress 
					needed advanced protection spells - validations that could check 
					multiple conditions, compare fields, and even consult the ancient 
					records (async validation) to ensure complete protection.
				</p>

				<div className='guardian-stance'>
					{stances.map((stance) => (
						<div
							key={stance.name}
							className={`stance-option ${guardianStance === stance.name ? 'active' : ''}`}
							onClick={() => changeStance(stance.name)}>
							<div style={{ fontSize: '2rem' }}>{stance.icon}</div>
							<h4>{stance.name.charAt(0).toUpperCase() + stance.name.slice(1)}</h4>
							<p>{stance.description}</p>
						</div>
					))}
				</div>

				<div className='ward-circle'>
					<div className={`ward-rune ${wardRunes.Ultimate ? 'activated' : ''}`}>U</div>
					<div className={`ward-rune ${wardRunes.Strong ? 'activated' : ''}`}>S</div>
					<div className={`ward-rune ${wardRunes.Match ? 'activated' : ''}`}>M</div>
					<div className={`ward-rune ${wardRunes.Age ? 'activated' : ''}`}>A</div>
					<div style={{ textAlign: 'center' }}>
						<h4>Protection Wards</h4>
						<p>Activate all wards for ultimate protection</p>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Complex Validations
				</h3>

				<div className='guardian-form'>
					<h4>Advanced Protection Training</h4>

					<div className='validation-field'>
						<label>Email (Async Validation):</label>
						<input
							type='email'
							value={formData.email}
							onChange={(e) => handleFieldChange('email', e.target.value)}
							onBlur={() => handleFieldBlur('email')}
							placeholder='Check availability in real-time'
						/>
						<p style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
							Try: admin@test.com (taken) or your@email.com (available)
						</p>
					</div>

					<div className='validation-field'>
						<label>Password (Strength Check):</label>
						<input
							type='password'
							value={formData.password}
							onChange={(e) => handleFieldChange('password', e.target.value)}
							onBlur={() => handleFieldBlur('password')}
							placeholder='Mix upper, lower, numbers, symbols'
						/>
						<div className='validation-rules'>
							<span className={`rule ${/[A-Z]/.test(formData.password) ? 'passed' : ''}`}>
								Uppercase
							</span>
							<span className={`rule ${/[a-z]/.test(formData.password) ? 'passed' : ''}`}>
								Lowercase
							</span>
							<span className={`rule ${/\d/.test(formData.password) ? 'passed' : ''}`}>
								Number
							</span>
							<span className={`rule ${/[!@#$%^&*]/.test(formData.password) ? 'passed' : ''}`}>
								Symbol
							</span>
							<span className={`rule ${formData.password.length >= 8 ? 'passed' : ''}`}>
								8+ chars
							</span>
						</div>
					</div>

					<div className='validation-field'>
						<label>Confirm Password (Match Check):</label>
						<input
							type='password'
							value={formData.confirmPassword}
							onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
							onBlur={() => handleFieldBlur('confirmPassword')}
							placeholder='Must match password above'
						/>
						{formData.confirmPassword && (
							<p className={formData.password === formData.confirmPassword ? 'success-message' : 'error-message'}>
								{formData.password === formData.confirmPassword ? '✅ Passwords match!' : '❌ Passwords do not match'}
							</p>
						)}
					</div>

					<div className='validation-field'>
						<label>Birth Date (Age Verification):</label>
						<input
							type='date'
							value={formData.birthDate}
							onChange={(e) => handleFieldChange('birthDate', e.target.value)}
							onBlur={() => handleFieldBlur('birthDate')}
						/>
					</div>
				</div>

				<div className='defense-log'>
					<h4>Defense Log</h4>
					{defenseLog.map((entry, index) => (
						<div key={index} className={`defense-entry ${entry.success ? 'success' : 'failure'}`}>
							[{entry.timestamp}] {entry.message}
						</div>
					))}
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Advanced Validation Patterns

// 1. Multi-field Validation
const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return { valid: false, message: 'Please confirm password' };
  if (password !== confirmPassword) return { valid: false, message: 'Passwords do not match' };
  return { valid: true };
};

// 2. Async Validation with Debouncing
const checkEmailAvailability = debounce(async (email) => {
  try {
    const response = await fetch(\`/api/check-email?email=\${email}\`);
    const { available } = await response.json();
    return available 
      ? { valid: true } 
      : { valid: false, message: 'Email already taken' };
  } catch (error) {
    return { valid: false, message: 'Could not verify email' };
  }
}, 500);

// 3. Complex Field Dependencies
const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validators = {
    password: [
      required('Password is required'),
      minLength(8, 'At least 8 characters'),
      pattern(/[A-Z]/, 'Need one uppercase letter'),
      pattern(/[a-z]/, 'Need one lowercase letter'),
      pattern(/\\d/, 'Need one number'),
      pattern(/[!@#$%^&*]/, 'Need one special character')
    ],
    confirmPassword: [
      required('Please confirm password'),
      (value, allValues) => 
        value === allValues.password 
          ? null 
          : 'Passwords must match'
    ],
    age: [
      required('Age is required'),
      (value) => value >= 18 ? null : 'Must be 18 or older'
    ]
  };

  const validateField = async (name, value) => {
    const fieldValidators = validators[name] || [];
    
    for (const validator of fieldValidators) {
      const error = await validator(value, values);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
        return false;
      }
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  };

  return { values, errors, touched, validateField };
};`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Advanced Guardian's Secret:</h3>
				<p>
					Advanced validation goes beyond simple rules. It includes field 
					dependencies (password matching), async checks (email availability), 
					and complex patterns (password strength). The key is choosing the 
					right validation strategy - immediate feedback for critical fields, 
					blur validation for less intrusive UX, or submit-time validation 
					for performance. Like a skilled guardian adjusting their stance, 
					adapt your validation approach to the situation.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do different guardian stances (validation timings) affect 
					the user's experience navigating your form?
				</p>
				<p>
					Why might complex validations like password strength be more 
					valuable than simple length checks?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;