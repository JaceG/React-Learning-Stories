import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	const { activeGates, secureGate, logDefense } = useOutletContext();

	const [fieldValues, setFieldValues] = useState({
		email: '',
		password: '',
		age: '',
		username: '',
	});

	const [fieldErrors, setFieldErrors] = useState({});

	const validationGates = [
		{
			name: 'Required',
			icon: '🚪',
			test: (value) => value.trim().length > 0,
			message: 'This field cannot be empty',
		},
		{
			name: 'Email',
			icon: '📧',
			test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
			message: 'Must be a valid email address',
		},
		{
			name: 'Length',
			icon: '📏',
			test: (value) => value.length >= 8,
			message: 'Must be at least 8 characters',
		},
		{
			name: 'Number',
			icon: '🔢',
			test: (value) => !isNaN(value) && value !== '',
			message: 'Must be a valid number',
		},
	];

	const validateField = (fieldName, value, validationType) => {
		const gate = validationGates.find((g) => g.name === validationType);
		if (!gate) return true;

		const isValid = gate.test(value);
		const gateName = `${fieldName}-${validationType}`;

		secureGate(gateName, isValid);

		if (!isValid) {
			setFieldErrors({
				...fieldErrors,
				[fieldName]: gate.message,
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

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>Chapter 1: The Guardian Gates</h2>

				<div className='chapter-bridge'>
					<p>
						Inside the fortress, crimson banners displayed
						validation patterns that had protected the kingdom's
						data for centuries. Aria was led to a vast hall where
						Guardian Commander Validus stood before ranks of trainee
						guardians, all struggling with complex validation
						scenarios.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"<strong>Aria!</strong>" Commander Validus's voice
						boomed across the hall. A warrior in gleaming red armor
						strode forward, each piece inscribed with validation
						runes. "Word from the Event Symphony Hall speaks of your
						systematic approach to optimization. We need someone who
						understands how to coordinate complex systems!"
					</p>

					<p className='story-paragraph'>
						Binary's sensors immediately began analyzing the
						fortress's defensive systems. "Detecting multiple
						validation layers, but patterns could benefit from
						optimization techniques. Validation logic scattered,
						potential for systematic improvement."
					</p>

					<p className='story-paragraph'>
						Aria surveyed the training grounds where guardians
						practiced on isolated validation gates. "I can see
						validation happening, but I'm curious how to apply
						systematic patterns to coordinate these defenses more
						efficiently."
					</p>

					<p className='story-paragraph'>
						"Exactly what we hoped you'd ask!" Validus gestured to
						the assembled recruits. "These are our finest, but they
						struggle with complex, multi-field validation. Your
						systematic thinking could revolutionize our methods."
					</p>

					<div className='aria-applies-training'>
						<h3>Aria Applies Systematic Thinking</h3>
						<p className='story-paragraph'>
							"I've learned about systematic approaches," Aria
							began, drawing on her training. "Each gate is strong
							alone, but when coordinated through a central system
							- like orchestration patterns - they could become
							much more effective."
						</p>
					</div>

					<div className='fortress'>
						<h3>The Fortress Validation Gates</h3>
						<p className='commander-instruction'>
							Commander Validus points to the gates: "Test your
							defenses against Aria's patterns!"
						</p>
						<div className='guardian-gates'>
							{validationGates.map((gate) => (
								<div
									key={gate.name}
									className={`gate ${
										Object.entries(activeGates).some(
											([key, value]) =>
												key.includes(gate.name) && value
										)
											? 'secured'
											: ''
									} ${
										Object.entries(activeGates).some(
											([key, value]) =>
												key.includes(gate.name) &&
												!value
										)
											? 'breached'
											: ''
									}`}>
									<div className='gate-icon'>{gate.icon}</div>
									<h4>{gate.name} Gate</h4>
									<p className='gate-description'>
										{gate.message}
									</p>
									<div className='gate-status'>
										{Object.entries(activeGates).some(
											([key, value]) =>
												key.includes(gate.name) && value
										)
											? '🟢 Secured'
											: Object.entries(activeGates).some(
													([key, value]) =>
														key.includes(
															gate.name
														) && !value
											  )
											? '🔴 Breached'
											: '⚪ Waiting'}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='aria-validation-patterns'>
					<h3>Aria's Unified Validation Strategy</h3>
					<p className='story-paragraph'>
						"Watch how I combine validation rules into a reusable
						system," Aria explained, her fingers dancing across
						Binary's projection interface.
					</p>

					<pre className='magical-code'>{`// Aria's Guardian Validation System
const useValidation = (rules) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Validation command center
  const validate = useCallback((field, value) => {
    const fieldRules = rules[field] || [];
    
    for (const rule of fieldRules) {
      const result = rule(value);
      if (!result.valid) {
        setErrors(prev => ({ ...prev, [field]: result.message }));
        return false;
      }
    }
    
    // Clear error if all gates passed
    setErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    return true;
  }, [rules]);
  
  // Mark field as touched
  const touch = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);
  
  return { errors, touched, validate, touch };
};

// Composable validation rules
const validationRules = {
  required: (msg = 'Required') => (value) => ({
    valid: value.trim().length > 0,
    message: msg
  }),
  
  email: (msg = 'Invalid email') => (value) => ({
    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: msg
  }),
  
  minLength: (min, msg) => (value) => ({
    valid: value.length >= min,
    message: msg || \`Minimum \${min} characters\`
  }),
  
  pattern: (regex, msg) => (value) => ({
    valid: regex.test(value),
    message: msg
  })
};`}</pre>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Guardian Training Ground
					</h3>
					<div className='instruction-box'>
						<p>
							<strong>
								Help train the guardian recruits by testing
								different validation gates. Watch how each field
								activates its specific defensive measures!
							</strong>
						</p>
					</div>

					<div className='guardian-form'>
						<h4>🛡️ Multi-Gate Defense System</h4>

						<div className='validation-field'>
							<label>Email Fortress (Email Gate):</label>
							<input
								type='text'
								value={fieldValues.email}
								onChange={(e) =>
									handleFieldChange('email', e.target.value)
								}
								className={
									fieldErrors.email
										? 'invalid'
										: fieldValues.email
										? 'valid'
										: ''
								}
								placeholder='guardian@fortress.com'
							/>
							{fieldErrors.email && (
								<p className='error-message'>
									⚔️ {fieldErrors.email}
								</p>
							)}
							<div className='field-shield'>
								<span className='shield-label'>
									Defense Status:
								</span>
								{activeGates['email-Email']
									? '✅ Secured'
									: fieldErrors.email
									? '❌ Breached'
									: '🛡️ Ready'}
							</div>
						</div>

						<div className='validation-field'>
							<label>
								Password Stronghold (Length Gate - 8+ chars):
							</label>
							<input
								type='password'
								value={fieldValues.password}
								onChange={(e) =>
									handleFieldChange(
										'password',
										e.target.value
									)
								}
								className={
									fieldErrors.password
										? 'invalid'
										: fieldValues.password
										? 'valid'
										: ''
								}
								placeholder='Enter secure password'
							/>
							{fieldErrors.password && (
								<p className='error-message'>
									⚔️ {fieldErrors.password}
								</p>
							)}
							<div className='field-shield'>
								<span className='shield-label'>
									Defense Status:
								</span>
								{activeGates['password-Length']
									? '✅ Secured'
									: fieldErrors.password
									? '❌ Breached'
									: '🛡️ Ready'}
							</div>
						</div>

						<div className='validation-field'>
							<label>Age Verification (Number Gate):</label>
							<input
								type='text'
								value={fieldValues.age}
								onChange={(e) =>
									handleFieldChange('age', e.target.value)
								}
								className={
									fieldErrors.age
										? 'invalid'
										: fieldValues.age
										? 'valid'
										: ''
								}
								placeholder='Enter your age'
							/>
							{fieldErrors.age && (
								<p className='error-message'>
									⚔️ {fieldErrors.age}
								</p>
							)}
							<div className='field-shield'>
								<span className='shield-label'>
									Defense Status:
								</span>
								{activeGates['age-Number']
									? '✅ Secured'
									: fieldErrors.age
									? '❌ Breached'
									: '🛡️ Ready'}
							</div>
						</div>

						<div className='validation-field'>
							<label>Identity Gate (Required Gate):</label>
							<input
								type='text'
								value={fieldValues.username}
								onChange={(e) =>
									handleFieldChange(
										'username',
										e.target.value
									)
								}
								className={
									fieldErrors.username
										? 'invalid'
										: fieldValues.username
										? 'valid'
										: ''
								}
								placeholder='Choose a username'
							/>
							{fieldErrors.username && (
								<p className='error-message'>
									⚔️ {fieldErrors.username}
								</p>
							)}
							<div className='field-shield'>
								<span className='shield-label'>
									Defense Status:
								</span>
								{activeGates['username-Required']
									? '✅ Secured'
									: fieldErrors.username
									? '❌ Breached'
									: '🛡️ Ready'}
							</div>
						</div>
					</div>
				</div>

				<div className='validus-amazement'>
					<p className='story-paragraph'>
						Commander Validus watched as his recruits began
						understanding the coordinated defense patterns.
						"Remarkable! You've shown them how to unify individual
						gates into a cohesive defensive system!"
					</p>

					<p className='story-paragraph'>
						"It's the same principle I used in form alchemy," Aria
						explained. "Individual validations are like solo
						defenders. But when orchestrated through a central hook,
						they become an elite guard unit."
					</p>

					<p className='story-paragraph'>
						Binary displayed tactical analysis: "Defense
						coordination improved by 82%. Validation response time
						decreased by 67%. Error detection accuracy: 99.7%!"
					</p>
				</div>

				<div className='advanced-defense-patterns'>
					<h3>Guardian Defense Patterns</h3>
					<div className='pattern-showcase'>
						<div className='defense-pattern'>
							<h4>🛡️ Layered Defense</h4>
							<pre className='mini-code'>{`// Multiple validation layers
const passwordRules = [
  required('Password required'),
  minLength(8, 'Too short'),
  hasUpperCase('Need uppercase'),
  hasNumber('Need number'),
  hasSpecialChar('Need symbol')
];`}</pre>
						</div>
						<div className='defense-pattern'>
							<h4>⚔️ Cross-Field Defense</h4>
							<pre className='mini-code'>{`// Validate related fields
const matchField = (field) => (value, form) => ({
  valid: value === form[field],
  message: 'Fields must match'
});

// Usage
confirmPassword: [matchField('password')]`}</pre>
						</div>
						<div className='defense-pattern'>
							<h4>🏰 Async Fortress</h4>
							<pre className='mini-code'>{`// Check against server
const uniqueUsername = async (value) => {
  const exists = await checkUsername(value);
  return {
    valid: !exists,
    message: 'Username taken'
  };
};`}</pre>
						</div>
					</div>
				</div>

				<div className='story-section'>
					<div className='character-intro'>
						<h4>Character Introduction</h4>
						<p>
							<strong>Guardian Commander Validus</strong> - The
							Western Quarter's supreme defender of data
							integrity. A veteran of countless validation
							campaigns, his armor bears runes for every
							validation pattern ever devised. Despite his
							imposing presence, he's eager to learn new
							techniques and quickly recognizes Aria's innovative
							approaches. His mission: train the next generation
							of validation guardians to protect the kingdom's
							data from corruption and invalid entries.
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>The Guardian's First Law:</h3>
					<p>
						Validation gates are your fortress's first line of
						defense. Each gate serves a specific purpose - format
						validation (email), constraint checking (length),
						presence verification (required), and type validation
						(number). By combining gates through a unified
						validation system, you create impenetrable defenses.
						Remember: validate early, validate often, and coordinate
						your defenses. A fortress with scattered guards is
						weaker than one with organized defenders working in
						harmony.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does Aria's hook expertise enhance traditional
						validation patterns?
					</p>
					<p className='story-paragraph'>
						Why is coordinated validation more effective than
						isolated checks?
					</p>
					<p className='story-paragraph'>
						What validation challenges in your forms could benefit
						from unified defense?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
