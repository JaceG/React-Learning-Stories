import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const { 
		activeGates,
		secureGate,
		logDefense
	} = useOutletContext();

	const [fieldValues, setFieldValues] = useState({
		email: '',
		password: '',
		age: '',
		username: ''
	});

	const [fieldErrors, setFieldErrors] = useState({});

	const validationGates = [
		{
			name: 'Required',
			icon: '🚪',
			test: (value) => value.trim().length > 0,
			message: 'This field cannot be empty'
		},
		{
			name: 'Email',
			icon: '📧',
			test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
			message: 'Must be a valid email address'
		},
		{
			name: 'Length',
			icon: '📏',
			test: (value) => value.length >= 8,
			message: 'Must be at least 8 characters'
		},
		{
			name: 'Number',
			icon: '🔢',
			test: (value) => !isNaN(value) && value !== '',
			message: 'Must be a valid number'
		}
	];

	const validateField = (fieldName, value, validationType) => {
		const gate = validationGates.find(g => g.name === validationType);
		if (!gate) return true;

		const isValid = gate.test(value);
		const gateName = `${fieldName}-${validationType}`;
		
		secureGate(gateName, isValid);
		
		if (!isValid) {
			setFieldErrors({
				...fieldErrors,
				[fieldName]: gate.message
			});
		} else {
			const newErrors = { ...fieldErrors };
			delete newErrors[fieldName];
			setFieldErrors(newErrors);
		}

		return isValid;
	};

	const handleFieldChange = (fieldName, value) => {
		setFieldValues({ ...fieldValues, [fieldName]: value });

		// Apply appropriate validation based on field
		switch (fieldName) {
			case 'email':
				validateField(fieldName, value, 'Email');
				break;
			case 'password':
				validateField(fieldName, value, 'Length');
				break;
			case 'age':
				validateField(fieldName, value, 'Number');
				break;
			default:
				validateField(fieldName, value, 'Required');
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Guardian Gates
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the digital fortress of FormLand, a young guardian named 
					Vera stood watch over the gates. Each gate represented a 
					different validation rule, protecting the realm from invalid 
					data that could corrupt the kingdom's records.
				</p>

				<div className='fortress'>
					<h3>The Fortress Gates</h3>
					<div className='guardian-gates'>
						{validationGates.map((gate) => (
							<div
								key={gate.name}
								className={`gate ${
									Object.entries(activeGates).some(
										([key, value]) => key.includes(gate.name) && value
									) ? 'secured' : ''
								} ${
									Object.entries(activeGates).some(
										([key, value]) => key.includes(gate.name) && !value
									) ? 'breached' : ''
								}`}>
								<div className='gate-icon'>{gate.icon}</div>
								<h4>{gate.name} Gate</h4>
								<p>{gate.message}</p>
							</div>
						))}
					</div>
				</div>

				<p className='story-paragraph'>
					"Each gate," Vera explained to the new recruits, "tests 
					incoming data against specific rules. Only when data passes 
					through the appropriate gates can it enter our kingdom's 
					sacred databases."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Test the Gates
				</h3>

				<div className='guardian-form'>
					<h4>Guardian Training Ground</h4>
					
					<div className='validation-field'>
						<label>Email Address (Email Gate):</label>
						<input
							type='text'
							value={fieldValues.email}
							onChange={(e) => handleFieldChange('email', e.target.value)}
							className={fieldErrors.email ? 'invalid' : fieldValues.email ? 'valid' : ''}
							placeholder='guardian@fortress.com'
						/>
						{fieldErrors.email && (
							<p className='error-message'>{fieldErrors.email}</p>
						)}
						<div className='field-shield'>
							{activeGates['email-Email'] ? '✅' : fieldErrors.email ? '❌' : '🛡️'}
						</div>
					</div>

					<div className='validation-field'>
						<label>Password (Length Gate - 8+ chars):</label>
						<input
							type='password'
							value={fieldValues.password}
							onChange={(e) => handleFieldChange('password', e.target.value)}
							className={fieldErrors.password ? 'invalid' : fieldValues.password ? 'valid' : ''}
							placeholder='Enter secure password'
						/>
						{fieldErrors.password && (
							<p className='error-message'>{fieldErrors.password}</p>
						)}
						<div className='field-shield'>
							{activeGates['password-Length'] ? '✅' : fieldErrors.password ? '❌' : '🛡️'}
						</div>
					</div>

					<div className='validation-field'>
						<label>Age (Number Gate):</label>
						<input
							type='text'
							value={fieldValues.age}
							onChange={(e) => handleFieldChange('age', e.target.value)}
							className={fieldErrors.age ? 'invalid' : fieldValues.age ? 'valid' : ''}
							placeholder='Enter your age'
						/>
						{fieldErrors.age && (
							<p className='error-message'>{fieldErrors.age}</p>
						)}
						<div className='field-shield'>
							{activeGates['age-Number'] ? '✅' : fieldErrors.age ? '❌' : '🛡️'}
						</div>
					</div>

					<div className='validation-field'>
						<label>Username (Required Gate):</label>
						<input
							type='text'
							value={fieldValues.username}
							onChange={(e) => handleFieldChange('username', e.target.value)}
							className={fieldErrors.username ? 'invalid' : fieldValues.username ? 'valid' : ''}
							placeholder='Choose a username'
						/>
						{fieldErrors.username && (
							<p className='error-message'>{fieldErrors.username}</p>
						)}
						<div className='field-shield'>
							{activeGates['username-Required'] ? '✅' : fieldErrors.username ? '❌' : '🛡️'}
						</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Basic Validation Gates Pattern
const validationRules = {
  required: (value) => {
    return value.trim().length > 0 
      ? { valid: true } 
      : { valid: false, message: 'This field is required' };
  },
  
  email: (value) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(value)
      ? { valid: true }
      : { valid: false, message: 'Invalid email format' };
  },
  
  minLength: (min) => (value) => {
    return value.length >= min
      ? { valid: true }
      : { valid: false, message: \`Minimum \${min} characters\` };
  },
  
  pattern: (regex, message) => (value) => {
    return regex.test(value)
      ? { valid: true }
      : { valid: false, message };
  }
};

// Using validation in a form
function ValidatedForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    const rules = {
      email: [validationRules.required, validationRules.email],
      password: [validationRules.required, validationRules.minLength(8)],
      phone: [validationRules.pattern(/^\\d{10}$/, 'Must be 10 digits')]
    };

    const fieldRules = rules[name] || [];
    
    for (const rule of fieldRules) {
      const result = rule(value);
      if (!result.valid) {
        setErrors({ ...errors, [name]: result.message });
        return false;
      }
    }
    
    // Clear error if validation passes
    const newErrors = { ...errors };
    delete newErrors[name];
    setErrors(newErrors);
    return true;
  };

  return (
    <form>
      <input
        name="email"
        onChange={(e) => {
          setValues({ ...values, email: e.target.value });
          validate('email', e.target.value);
        }}
      />
      {errors.email && <span>{errors.email}</span>}
    </form>
  );
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Guardian's Wisdom:</h3>
				<p>
					Validation gates are your first line of defense against bad data. 
					Each gate serves a specific purpose - some check format (email), 
					others check constraints (length), and some ensure presence (required). 
					By combining multiple gates, you create a robust defense system that 
					ensures only valid data enters your application's state.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do validation gates protect your application like guards 
					protect a fortress?
				</p>
				<p>
					Why is it important to validate data at the point of entry 
					rather than waiting until form submission?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;