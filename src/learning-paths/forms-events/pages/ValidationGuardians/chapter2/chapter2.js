import React, { useState, useCallback, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterTwo() {
	const {
		wardRunes,
		activateWardRune,
		guardianStance,
		changeStance,
		logDefense,
		defenseLog,
	} = useOutletContext();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		birthDate: '',
	});

	const [touchedFields, setTouchedFields] = useState({});
	const [validationMode, setValidationMode] = useState('onBlur');

	const stances = [
		{
			name: 'defensive',
			icon: '🛡️',
			description: 'Validate on blur - gentle protection',
		},
		{
			name: 'aggressive',
			icon: '⚔️',
			description: 'Validate on change - immediate feedback',
		},
		{
			name: 'strategic',
			icon: '🎯',
			description: 'Validate on submit - delayed validation',
		},
	];

	const complexValidations = {
		passwordStrength: (password) => {
			const hasUpper = /[A-Z]/.test(password);
			const hasLower = /[a-z]/.test(password);
			const hasNumber = /\d/.test(password);
			const hasSpecial = /[!@#$%^&*]/.test(password);
			const isLongEnough = password.length >= 8;

			const strength = [
				hasUpper,
				hasLower,
				hasNumber,
				hasSpecial,
				isLongEnough,
			].filter(Boolean).length;

			if (strength === 5) {
				activateWardRune('Ultimate');
				return {
					valid: true,
					strength: 'Ultimate',
					message: 'Maximum protection!',
				};
			} else if (strength >= 3) {
				activateWardRune('Strong');
				return {
					valid: true,
					strength: 'Strong',
					message: 'Good protection',
				};
			} else {
				return {
					valid: false,
					strength: 'Weak',
					message: 'Need stronger password',
				};
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

			const actualAge =
				monthDiff < 0 ||
				(monthDiff === 0 && today.getDate() < birth.getDate())
					? age - 1
					: age;

			if (actualAge >= 18) {
				activateWardRune('Age');
				return { valid: true, message: 'Age verified' };
			}
			return { valid: false, message: 'Must be 18 or older' };
		},

		asyncEmailCheck: async (email) => {
			logDefense('Checking email availability...', true);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const taken = ['admin@test.com', 'user@test.com'].includes(
				email.toLowerCase()
			);
			if (!taken && email.includes('@')) {
				activateWardRune('Unique');
				return { valid: true, message: 'Email available' };
			}
			return {
				valid: false,
				message: taken ? 'Email already taken' : 'Invalid email',
			};
		},
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
				const strengthResult =
					complexValidations.passwordStrength(value);
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

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 2: Advanced Protection Spells
				</h2>

				<div className='chapter-bridge'>
					<p>
						Commander Validus led Aria deeper into the fortress,
						past the basic training grounds to an advanced tactical
						center. Here, elite guardians practiced complex
						validation maneuvers - cross-field dependencies,
						asynchronous checks, and multi-layered defenses.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"The real threats," Validus explained, "aren't simple
						invalid entries. They're sophisticated attacks that
						require coordinated defenses. Watch our elite guard's
						struggles."
					</p>

					<p className='story-paragraph'>
						Aria observed guardians attempting to validate password
						confirmations, check email availability against distant
						servers, and verify complex business rules. Their
						efforts were valiant but uncoordinated.
					</p>

					<p className='story-paragraph'>
						Aria observed the struggles with growing understanding.
						"I can see some patterns from my Academy training that
						might apply here. The performance issues remind me of
						what I learned about debouncing and memoization."
					</p>

					<p className='story-paragraph'>
						Binary projected analysis: "Current validation
						efficiency: 43%. Response time: 2.3 seconds average.
						User frustration index: HIGH."
					</p>

					<p className='story-paragraph'>
						"Excellent observation!" Validus praised. "Your Academy
						training helps you spot the performance issues. Let me
						teach you how we handle complex validation scenarios."
					</p>

					<div className='aria-advanced-strategy'>
						<h3>Aria's Multi-Layered Defense System</h3>
						<p className='story-paragraph'>
							"First, we need different stances for different
							situations," Validus explained, addressing the elite
							guardians and Aria. "Just like you learned about
							timing at the Academy - timing is everything in
							validation."
						</p>
					</div>

					<div className='guardian-stance'>
						<h3>Guardian Validation Stances</h3>
						<p className='stance-instruction'>
							Commander Validus: "Choose your stance based on the
							threat level!"
						</p>
						{stances.map((stance) => (
							<div
								key={stance.name}
								className={`stance-option ${
									guardianStance === stance.name
										? 'active'
										: ''
								}`}
								onClick={() => changeStance(stance.name)}>
								<div className='stance-icon'>{stance.icon}</div>
								<h4>
									{stance.name.charAt(0).toUpperCase() +
										stance.name.slice(1)}{' '}
									Stance
								</h4>
								<p className='stance-desc'>
									{stance.description}
								</p>
							</div>
						))}
					</div>

					<div className='ward-circle'>
						<h3>Protection Ward Activation</h3>
						<p className='ward-description'>
							Each successful validation activates a protective
							ward
						</p>
						<div className='ward-runes-display'>
							<div
								className={`ward-rune ${
									wardRunes.Ultimate ? 'activated' : ''
								}`}>
								<span className='rune-symbol'>U</span>
								<span className='rune-name'>Ultimate</span>
							</div>
							<div
								className={`ward-rune ${
									wardRunes.Strong ? 'activated' : ''
								}`}>
								<span className='rune-symbol'>S</span>
								<span className='rune-name'>Strong</span>
							</div>
							<div
								className={`ward-rune ${
									wardRunes.Match ? 'activated' : ''
								}`}>
								<span className='rune-symbol'>M</span>
								<span className='rune-name'>Match</span>
							</div>
							<div
								className={`ward-rune ${
									wardRunes.Age ? 'activated' : ''
								}`}>
								<span className='rune-symbol'>A</span>
								<span className='rune-name'>Age</span>
							</div>
							<div
								className={`ward-rune ${
									wardRunes.Unique ? 'activated' : ''
								}`}>
								<span className='rune-symbol'>✓</span>
								<span className='rune-name'>Unique</span>
							</div>
						</div>
					</div>
				</div>

				<div className='aria-advanced-patterns'>
					<h3>Aria's Advanced Validation Architecture</h3>
					<pre className='magical-code'>{`// Aria's Multi-Layer Validation System
const useAdvancedValidation = () => {
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState({});
  const validationCache = useRef({});
  
  // Debounced async validation
  const validateAsync = useCallback(
    debounce(async (field, value, validator) => {
      // Check cache first
      const cacheKey = \`\${field}:\${value}\`;
      if (validationCache.current[cacheKey]) {
        return validationCache.current[cacheKey];
      }
      
      setPending(prev => ({ ...prev, [field]: true }));
      
      try {
        const result = await validator(value);
        validationCache.current[cacheKey] = result;
        
        if (result.valid) {
          clearError(field);
        } else {
          setError(field, result.message);
        }
      } finally {
        setPending(prev => ({ ...prev, [field]: false }));
      }
    }, 500),
    []
  );
  
  // Cross-field validation with memoization
  const validateDependent = useMemo(() => {
    return (field1, field2, validator) => {
      const result = validator(field1.value, field2.value);
      if (!result.valid) {
        setError(field2.name, result.message);
      } else {
        clearError(field2.name);
      }
    };
  }, []);
  
  return { errors, pending, validateAsync, validateDependent };
};`}</pre>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Elite Guardian Training
					</h3>
					<div className='instruction-box'>
						<p>
							<strong>
								Master advanced validation techniques! Test
								different stances and watch how they affect
								validation timing. Activate all ward runes for
								ultimate protection!
							</strong>
						</p>
					</div>

					<div className='guardian-form advanced'>
						<h4>🏰 Advanced Defense Training Ground</h4>

						<div className='validation-field'>
							<label>Email Fortress (Async Validation):</label>
							<input
								type='email'
								value={formData.email}
								onChange={(e) =>
									handleFieldChange('email', e.target.value)
								}
								onBlur={() => handleFieldBlur('email')}
								placeholder='Check availability in real-time'
								className='advanced-input'
							/>
							<p className='field-hint'>
								💡 Try: admin@test.com (taken) or
								aria@hook.master (available)
							</p>
						</div>

						<div className='validation-field'>
							<label>
								Password Stronghold (Multi-Layer Check):
							</label>
							<input
								type='password'
								value={formData.password}
								onChange={(e) =>
									handleFieldChange(
										'password',
										e.target.value
									)
								}
								onBlur={() => handleFieldBlur('password')}
								placeholder='Mix upper, lower, numbers, symbols'
								className='advanced-input'
							/>
							<div className='validation-rules'>
								<span
									className={`rule ${
										/[A-Z]/.test(formData.password)
											? 'passed'
											: ''
									}`}>
									⚔️ Uppercase
								</span>
								<span
									className={`rule ${
										/[a-z]/.test(formData.password)
											? 'passed'
											: ''
									}`}>
									🛡️ Lowercase
								</span>
								<span
									className={`rule ${
										/\d/.test(formData.password)
											? 'passed'
											: ''
									}`}>
									🏹 Number
								</span>
								<span
									className={`rule ${
										/[!@#$%^&*]/.test(formData.password)
											? 'passed'
											: ''
									}`}>
									🗡️ Symbol
								</span>
								<span
									className={`rule ${
										formData.password.length >= 8
											? 'passed'
											: ''
									}`}>
									🏰 8+ chars
								</span>
							</div>
						</div>

						<div className='validation-field'>
							<label>
								Confirm Password (Cross-Field Validation):
							</label>
							<input
								type='password'
								value={formData.confirmPassword}
								onChange={(e) =>
									handleFieldChange(
										'confirmPassword',
										e.target.value
									)
								}
								onBlur={() =>
									handleFieldBlur('confirmPassword')
								}
								placeholder='Must match password above'
								className='advanced-input'
							/>
							{formData.confirmPassword && (
								<p
									className={
										formData.password ===
										formData.confirmPassword
											? 'success-message'
											: 'error-message'
									}>
									{formData.password ===
									formData.confirmPassword
										? '✅ Passwords synchronized!'
										: '❌ Passwords out of sync'}
								</p>
							)}
						</div>

						<div className='validation-field'>
							<label>Birth Date (Complex Logic):</label>
							<input
								type='date'
								value={formData.birthDate}
								onChange={(e) =>
									handleFieldChange(
										'birthDate',
										e.target.value
									)
								}
								onBlur={() => handleFieldBlur('birthDate')}
								className='advanced-input'
							/>
							<p className='field-hint'>
								🎂 Must be 18+ years old to enter the fortress
							</p>
						</div>
					</div>

					<div className='defense-log'>
						<h4>🗂️ Fortress Defense Log</h4>
						<div className='log-entries'>
							{defenseLog.length === 0 ? (
								<p className='empty-log'>
									Awaiting validation attempts...
								</p>
							) : (
								defenseLog.map((entry, index) => (
									<div
										key={index}
										className={`defense-entry ${
											entry.success
												? 'success'
												: 'failure'
										}`}>
										<span className='log-time'>
											[{entry.timestamp}]
										</span>
										<span className='log-message'>
											{entry.message}
										</span>
										<span className='log-icon'>
											{entry.success ? '✅' : '⚠️'}
										</span>
									</div>
								))
							)}
						</div>
					</div>
				</div>

				<div className='validus-enlightenment'>
					<p className='story-paragraph'>
						Commander Validus watched with satisfaction as Aria
						grasped the patterns and the validation attempts became
						smooth, coordinated defenses. "Excellent! You're
						understanding how to apply Academy training to
						validation scenarios without overwhelming our servers!"
					</p>

					<p className='story-paragraph'>
						"The key," Validus explained, "is combining patterns.
						Debouncing from event handling knowledge, caching from
						performance optimization, and memoization from hook
						mastery. Everything connects in validation work."
					</p>

					<p className='story-paragraph'>
						Binary displayed updated metrics: "Validation
						efficiency: 94%. Response time: 0.3 seconds. User
						satisfaction: OPTIMAL. Cache hit rate: 78%!"
					</p>
				</div>

				<div className='advanced-techniques'>
					<h3>Elite Guardian Techniques</h3>
					<div className='technique-grid'>
						<div className='technique-card'>
							<h4>🔄 Async Validation</h4>
							<pre className='mini-code'>{`// Debounced server check
const checkUnique = debounce(
  async (value) => {
    const res = await api.check(value);
    return res.available;
  }, 
  300
);`}</pre>
						</div>
						<div className='technique-card'>
							<h4>🔗 Dependent Fields</h4>
							<pre className='mini-code'>{`// Validate related fields
useEffect(() => {
  if (password && confirmPassword) {
    validateMatch(password, confirmPassword);
  }
}, [password, confirmPassword]);`}</pre>
						</div>
						<div className='technique-card'>
							<h4>💾 Validation Cache</h4>
							<pre className='mini-code'>{`// Cache expensive checks
const cache = useRef(new Map());

const validate = (value) => {
  if (cache.current.has(value)) {
    return cache.current.get(value);
  }
  // ... perform validation
  cache.current.set(value, result);
};`}</pre>
						</div>
					</div>
				</div>

				<div className='story-section'>
					<div className='character-intro'>
						<h4>Aria's Journal - Day 21 (Morning)</h4>
						<p>
							Advanced validation is where all my React knowledge
							converges! Commander Validus taught me how to
							combine debouncing (from event optimization),
							caching (from performance patterns), and dependent
							validation (like Context dependencies). The
							guardians were struggling with async validation
							causing server overload - Validus showed me how
							debouncing fixes this. Cross-field validation was
							causing infinite loops - he taught me how proper
							dependencies solve this. Binary tracked a 94%
							improvement in validation efficiency as I learned
							these patterns. The ward runes lighting up as
							validations pass is oddly satisfying. Validus
							mentioned the Ultimate Defense Strategy awaits...
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>The Elite Guardian's Wisdom:</h3>
					<p>
						Advanced validation requires orchestrating multiple
						techniques. Use debouncing for async checks to prevent
						server overload. Implement caching to avoid redundant
						validations. Handle cross-field dependencies carefully
						to prevent circular validation. Choose validation timing
						(onChange, onBlur, onSubmit) based on user experience
						needs. Remember: the best validation is invisible to
						users when they're doing things right, but immediately
						helpful when they need guidance. Master these patterns,
						and your forms become impenetrable fortresses with
						welcoming gates.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How do different validation stances affect the user's
						journey through your form?
					</p>
					<p className='story-paragraph'>
						Why is caching validation results important for both
						performance and user experience?
					</p>
					<p className='story-paragraph'>
						What validation patterns from Aria's previous learning
						enhanced the fortress defenses?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
