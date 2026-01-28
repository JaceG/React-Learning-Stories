import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

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
				<ChapterIntro chapterNumber={1} title='The Guardian Gates' />

				<StorySection
					paragraphs={[
						<>
							"<strong>Aria!</strong>" Commander Validus's voice
							boomed across the hall. A warrior in gleaming red
							armor strode forward, each piece inscribed with
							validation runes. "Word from the Event Symphony Hall
							speaks of your progress with Conductor Eventus.
							Welcome to the Validation Fortress - I'm eager to
							teach you about defensive data patterns!"
						</>,
						`Binary's sensors immediately began analyzing the fortress's defensive systems. "Detecting multiple validation layers, but patterns could benefit from optimization techniques. Validation logic scattered, potential for systematic improvement."`,
						`Aria surveyed the training grounds where guardians practiced on isolated validation gates. "I can see validation happening, but I'm curious how to apply systematic patterns to coordinate these defenses more efficiently."`,
						`"Excellent question!" Validus gestured to the assembled recruits. "These are our finest, but they struggle with complex, multi-field validation. Your Academy training in systematic thinking should help you understand these patterns quickly."`,
					]}
				/>

				<div className='aria-applies-training'>
					<h3>Aria Applies Systematic Thinking</h3>
					<p className='story-paragraph'>
						"I see the connections," Aria said, drawing on her
						training. "Each gate is strong alone, but I imagine when
						coordinated through a central system - like the
						orchestration patterns I learned - they could become
						much more effective?"
					</p>
					<p className='story-paragraph'>
						"Precisely!" Validus beamed. "Let me show you how
						validation coordination works..."
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
											key.includes(gate.name) && !value
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

				<div className='aria-validation-patterns'>
					<h3>Aria's Unified Validation Strategy</h3>
					<p className='story-paragraph'>
						"Watch how I combine validation rules into a reusable
						system," Aria explained, her fingers dancing across
						Binary's projection interface.
					</p>

					<CodeExample
						title="Aria's Guardian Validation System"
						discoveredBy='Applied by Aria'
						code={`// Aria's Guardian Validation System
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
    valid: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
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
};`}
					/>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Guardian Training Ground
					</h3>
					<InstructionBox character='Commander Validus gestures to the training gates.'>
						Help train the guardian recruits by testing different
						validation gates. Watch how each field activates its
						specific defensive measures!
					</InstructionBox>

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

				<StorySection
					paragraphs={[
						`Commander Validus watched as his recruits began understanding the coordinated defense patterns. "Remarkable! You've shown them how to unify individual gates into a cohesive defensive system!"`,
						`"It's the same principle I used in form alchemy," Aria explained. "Individual validations are like solo defenders. But when orchestrated through a central hook, they become an elite guard unit."`,
						`Binary displayed tactical analysis: "Defense coordination improved by 82%. Validation response time decreased by 67%. Error detection accuracy: 99.7%!"`,
					]}
				/>

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

				<ChapterSummary
					characterIntros={[
						{
							name: `Commander Validus`,
							description: `Guardian commander of the Validation Fortress training grounds, warrior in gleaming red armor with each piece inscribed with validation runes. His voice booms with authority as he teaches defensive data patterns. "These are our finest guardians, but they struggle with complex, multi-field validation. Validation gates are your fortress's first line of defense - validate early, validate often, and coordinate your defenses."`,
						},
					]}
					lessonInsight={{
						title: "The Guardian's First Law:",
						content:
							"Validation gates are your fortress's first line of defense. Each gate serves a specific purpose - format validation (email), constraint checking (length), presence verification (required), and type validation (number). By combining gates through a unified validation system, you create impenetrable defenses. Remember: validate early, validate often, and coordinate your defenses. A fortress with scattered guards is weaker than one with organized defenders working in harmony.",
					}}
					reflectionQuestions={[
						"How does Aria's hook expertise enhance traditional validation patterns?",
						'Why is coordinated validation more effective than isolated checks?',
						'What validation challenges in your forms could benefit from unified defense?',
					]}
					journalEntry={{
						title: "Aria's Journal - Day 19 (Morning)",
						content:
							"Commander Validus welcomed me to the Validation Fortress with great enthusiasm! He's heard about my progress from Conductor Eventus. Today I learned about validation gates - each type serves a specific purpose: Required (presence), Email (format), Length (constraints), Number (type). The key insight is creating a unified validation system using custom hooks like useValidation that coordinates all gates. Binary analyzed the fortress defenses and suggested connecting validation to the controlled component patterns I learned from Formeus. Validus mentioned advanced protection spells await this afternoon!",
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
