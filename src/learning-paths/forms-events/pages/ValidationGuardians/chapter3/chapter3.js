import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterThree() {
	const {
		fortressSecured,
		checkFortressSecurity,
		validationStrategies,
		addStrategy,
		logDefense,
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
		newsletter: false,
	});

	const [currentStep, setCurrentStep] = useState(1);
	const [stepValidation, setStepValidation] = useState({
		1: false,
		2: false,
		3: false,
	});
	const [validationSchema, setValidationSchema] = useState(null);
	const [customRules, setCustomRules] = useState([]);

	const strategies = [
		{ id: 'yup', name: 'Yup Schema', icon: '📋' },
		{ id: 'joi', name: 'Joi Validation', icon: '🎯' },
		{ id: 'custom', name: 'Custom Rules', icon: '⚡' },
		{ id: 'html5', name: 'HTML5 Native', icon: '🌐' },
	];

	useEffect(() => {
		checkFortressSecurity();
	}, [stepValidation, checkFortressSecurity]);

	// Validation schemas for each step
	const stepSchemas = {
		1: {
			firstName: [(v) => v.length >= 2 || 'Minimum 2 characters'],
			lastName: [(v) => v.length >= 2 || 'Minimum 2 characters'],
			email: [
				(v) => v.includes('@') || 'Invalid email',
				(v) => v.includes('.') || 'Invalid email format',
			],
		},
		2: {
			password: [
				(v) => v.length >= 8 || 'Minimum 8 characters',
				(v) => /[A-Z]/.test(v) || 'Need uppercase letter',
				(v) => /[a-z]/.test(v) || 'Need lowercase letter',
				(v) => /\d/.test(v) || 'Need number',
			],
			confirmPassword: [
				(v, form) => v === form.password || 'Passwords must match',
			],
			securityQuestion: [
				(v) => v.length > 0 || 'Security question required',
			],
		},
		3: {
			country: [(v) => v.length > 0 || 'Please select country'],
			acceptTerms: [(v) => v === true || 'Must accept terms'],
		},
	};

	const validateStep = (step) => {
		const schema = stepSchemas[step];
		let isValid = true;

		Object.keys(schema).forEach((field) => {
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
			logDefense(
				'🎉 Fortress fully secured! Form submitted successfully!',
				true
			);
			alert('Fortress secured! Your form has been submitted.');
		}
	};

	const addCustomRule = () => {
		const newRule = prompt(
			'Enter custom validation rule (e.g., "Phone must be 10 digits"):'
		);
		if (newRule) {
			setCustomRules([...customRules, newRule]);
			addStrategy('Custom Rule');
			logDefense(`Custom rule added: ${newRule}`, true);
		}
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={3}
					title='The Ultimate Defense Strategy'
					bridge="The fortress's war room displayed maps of validation strategies from across the kingdom. Commander Validus gathered his elite guard as Aria prepared to demonstrate the ultimate defense - a synthesis of all validation knowledge into one impenetrable system."
				/>

				<StorySection paragraphs={[
					`"This is our greatest challenge," Validus announced. "Multi-stage attacks that evolve and adapt. Traditional defenses crumble against such sophisticated threats."`,
					`Aria stepped forward, Binary projecting complex validation patterns in the air. "I've faced similar challenges across the kingdom. The solution isn't just strong gates - it's intelligent, adaptive defense that guides legitimate users while repelling threats."`,
					`"Show us," Validus commanded, his elite guard leaning forward eagerly.`,
					`"I'll create a validation system that combines everything," Aria declared. "Schema validation, step management, conditional logic, and performance optimization - all working together systematically."`
				]} />

				<div className='aria-ultimate-system'>
					<h3>Aria's Ultimate Defense Architecture</h3>
					<p className='story-paragraph'>
						"Watch as I synthesize all validation knowledge into
						one system..."
					</p>
				</div>

				<div
					className={`fortress ${
						fortressSecured ? 'fortified' : ''
					}`}>
					<h3>Fortress Defense Status</h3>
					<div className='fortress-status'>
						<div className='status-indicator'>
							{fortressSecured
								? '🏰 FULLY SECURED'
								: '⚠️ DEFENSES INCOMPLETE'}
						</div>
						<p className='status-description'>
							{fortressSecured
								? 'All validation layers active. The fortress is impenetrable!'
								: 'Complete all validation steps to secure the fortress.'}
						</p>
					</div>

					<div className='validation-strategy'>
						<h4>Strategic Defense Layers</h4>
						<p className='strategy-intro'>
							Commander Validus: "Deploy these validation
							strategies to fortify our defenses!"
						</p>
						<div className='strategy-grid'>
							{strategies.map((strategy) => (
								<div
									key={strategy.id}
									className={`strategy-card ${
										validationStrategies.includes(
											strategy.name
										)
											? 'active'
											: ''
									}`}
									onClick={() =>
										addStrategy(strategy.name)
									}>
									<div className='strategy-icon'>
										{strategy.icon}
									</div>
									<h5>{strategy.name}</h5>
									<p className='strategy-status'>
										{validationStrategies.includes(
											strategy.name
										)
											? '✅ Deployed'
											: '⚡ Click to activate'}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<CodeExample
					title="The Master Validation System"
					discoveredBy="Aria's Ultimate Pattern"
					code={`// Aria's Ultimate Form Wizard Validation
const useUltimateValidation = (schemas, conditionalRules) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [stepErrors, setStepErrors] = useState({});
  const [stepStatus, setStepStatus] = useState({});
  
  // Memoized validation for performance
  const validateStep = useMemo(() => {
    return async (step, data = formData) => {
      const schema = schemas[step];
      const errors = {};
      
      // Schema validation
      for (const [field, rules] of Object.entries(schema)) {
        for (const rule of rules) {
          const result = await rule(data[field], data);
          if (result !== true) {
            errors[field] = result;
            break;
          }
        }
      }
      
      // Conditional validation
      const conditionalErrors = await validateConditional(step, data);
      Object.assign(errors, conditionalErrors);
      
      setStepErrors(prev => ({ ...prev, [step]: errors }));
      const isValid = Object.keys(errors).length === 0;
      setStepStatus(prev => ({ ...prev, [step]: isValid }));
      
      return isValid;
    };
  }, [schemas, formData]);
  
  // Smart navigation with validation
  const navigate = useCallback(async (direction) => {
    if (direction === 'next') {
      const isValid = await validateStep(currentStep);
      if (isValid) {
        setCurrentStep(prev => Math.min(prev + 1, schemas.length - 1));
      }
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    }
  }, [currentStep, validateStep]);
  
  return {
    currentStep,
    formData,
    stepErrors,
    stepStatus,
    updateField,
    navigate,
    canProceed: stepStatus[currentStep]
  };
};`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>
						The Ultimate Defense Test: Multi-Stage Form Wizard
					</h3>
					<InstructionBox character="Validus presents the ultimate defense challenge.">
						Help Aria demonstrate the ultimate validation system! Navigate through the multi-stage wizard and watch how each layer of defense activates.
					</InstructionBox>

					<div className='guardian-form wizard'>
						<div className='wizard-progress'>
							{[1, 2, 3].map((step) => (
								<div
									key={step}
									className={`progress-step ${
										currentStep === step
											? 'current'
											: stepValidation[step]
											? 'completed'
											: 'pending'
									}`}>
									<div className='step-number'>
										{stepValidation[step] ? '✓' : step}
									</div>
									<div className='step-label'>
										Step {step}
									</div>
								</div>
							))}
						</div>

						<div className='wizard-content'>
							{currentStep === 1 && (
								<div className='wizard-step'>
									<h4>🛡️ Step 1: Identity Verification</h4>
									<p className='step-description'>
										Basic identity gates - the first line of
										defense
									</p>
									<div className='validation-field'>
										<label>First Name:</label>
										<input
											type='text'
											value={wizardForm.firstName}
											onChange={(e) =>
												handleFieldChange(
													'firstName',
													e.target.value
												)
											}
											placeholder='Min 2 characters'
											className='wizard-input'
										/>
									</div>
									<div className='validation-field'>
										<label>Last Name:</label>
										<input
											type='text'
											value={wizardForm.lastName}
											onChange={(e) =>
												handleFieldChange(
													'lastName',
													e.target.value
												)
											}
											placeholder='Min 2 characters'
											className='wizard-input'
										/>
									</div>
									<div className='validation-field'>
										<label>Email Address:</label>
										<input
											type='email'
											value={wizardForm.email}
											onChange={(e) =>
												handleFieldChange(
													'email',
													e.target.value
												)
											}
											placeholder='guardian@fortress.com'
											className='wizard-input'
										/>
									</div>
								</div>
							)}

							{currentStep === 2 && (
								<div className='wizard-step'>
									<h4>⚔️ Step 2: Security Configuration</h4>
									<p className='step-description'>
										Advanced protection spells and
										authentication
									</p>
									<div className='validation-field'>
										<label>Master Password:</label>
										<input
											type='password'
											value={wizardForm.password}
											onChange={(e) =>
												handleFieldChange(
													'password',
													e.target.value
												)
											}
											placeholder='Strong password required'
											className='wizard-input'
										/>
										<div className='validation-rules'>
											<span
												className={`rule ${
													wizardForm.password
														.length >= 8
														? 'passed'
														: ''
												}`}>
												📏 8+ chars
											</span>
											<span
												className={`rule ${
													/[A-Z]/.test(
														wizardForm.password
													)
														? 'passed'
														: ''
												}`}>
												🔠 Uppercase
											</span>
											<span
												className={`rule ${
													/[a-z]/.test(
														wizardForm.password
													)
														? 'passed'
														: ''
												}`}>
												🔡 Lowercase
											</span>
											<span
												className={`rule ${
													/\d/.test(
														wizardForm.password
													)
														? 'passed'
														: ''
												}`}>
												🔢 Number
											</span>
										</div>
									</div>
									<div className='validation-field'>
										<label>Confirm Password:</label>
										<input
											type='password'
											value={wizardForm.confirmPassword}
											onChange={(e) =>
												handleFieldChange(
													'confirmPassword',
													e.target.value
												)
											}
											placeholder='Must match password'
											className='wizard-input'
										/>
									</div>
									<div className='validation-field'>
										<label>Security Question:</label>
										<select
											value={wizardForm.securityQuestion}
											onChange={(e) =>
												handleFieldChange(
													'securityQuestion',
													e.target.value
												)
											}
											className='wizard-select'>
											<option value=''>
												Select a question...
											</option>
											<option value='pet'>
												First pet's name?
											</option>
											<option value='city'>
												Birth city?
											</option>
											<option value='school'>
												First school?
											</option>
										</select>
									</div>
								</div>
							)}

							{currentStep === 3 && (
								<div className='wizard-step'>
									<h4>🏰 Step 3: Final Fortification</h4>
									<p className='step-description'>
										Complete the defense with final
										configurations
									</p>
									<div className='validation-field'>
										<label>Fortress Region:</label>
										<select
											value={wizardForm.country}
											onChange={(e) =>
												handleFieldChange(
													'country',
													e.target.value
												)
											}
											className='wizard-select'>
											<option value=''>
												Select region...
											</option>
											<option value='north'>
												Northern Kingdoms
											</option>
											<option value='east'>
												Eastern Sanctuaries
											</option>
											<option value='south'>
												Southern Realms
											</option>
											<option value='west'>
												Western Quarter
											</option>
										</select>
									</div>
									<div className='validation-field checkbox-group'>
										<label className='checkbox-label'>
											<input
												type='checkbox'
												checked={wizardForm.acceptTerms}
												onChange={(e) =>
													handleFieldChange(
														'acceptTerms',
														e.target.checked
													)
												}
											/>
											<span>
												I accept the Guardian's Oath
											</span>
										</label>
									</div>
									<div className='validation-field checkbox-group'>
										<label className='checkbox-label'>
											<input
												type='checkbox'
												checked={wizardForm.newsletter}
												onChange={(e) =>
													handleFieldChange(
														'newsletter',
														e.target.checked
													)
												}
											/>
											<span>
												Receive fortress defense updates
											</span>
										</label>
									</div>
								</div>
							)}
						</div>

						<div className='wizard-navigation'>
							<button
								onClick={prevStep}
								disabled={currentStep === 1}
								className='nav-button prev'>
								← Previous
							</button>

							{currentStep < 3 ? (
								<button
									onClick={nextStep}
									className='nav-button next'>
									Next Step →
								</button>
							) : (
								<button
									onClick={submitForm}
									className='nav-button submit'>
									🏰 Secure Fortress
								</button>
							)}
						</div>
					</div>

					<div className='custom-rules-section'>
						<button
							onClick={addCustomRule}
							className='add-rule-button'>
							+ Deploy Custom Validation Rule
						</button>
						{customRules.length > 0 && (
							<div className='custom-rules-display'>
								<h4>🎯 Custom Defense Rules</h4>
								<ul className='rules-list'>
									{customRules.map((rule, index) => (
										<li key={index} className='custom-rule'>
											<span className='rule-icon'>
												⚡
											</span>
											{rule}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>

			<StorySection paragraphs={[
				`Commander Validus watched with satisfaction as Aria grasped the validation concepts and the system handled every scenario. "Excellent! You've learned how to create a defense system that's both impenetrable and user-friendly!"`,
				`"The secret," Validus explained, "is treating validation as a journey, not a barrier. Guide users through each step, provide clear feedback, and use all the patterns you've learned - memoization for performance, conditional logic for flexibility, and schema validation for consistency."`,
				`Binary displayed final metrics: "Defense system efficiency: 99.8%. User success rate: 96%. Invalid data blocked: 100%. Academy training successfully applied to validation fortress design!"`
			]} />

				<div className='ultimate-patterns'>
					<h3>The Ultimate Defense Patterns</h3>
					<div className='ultimate-grid'>
						<div className='ultimate-pattern'>
							<h4>🎭 Schema Integration</h4>
							<pre className='mini-code'>{`// Combine multiple schemas
const masterSchema = {
  ...yupSchema,
  ...customRules,
  ...conditionalRules
};

validateWithSchema(data, masterSchema);`}</pre>
						</div>
						<div className='ultimate-pattern'>
							<h4>🔄 Progressive Enhancement</h4>
							<pre className='mini-code'>{`// Build validation progressively
const enhance = (base) => ({
  ...base,
  async: withAsync(base),
  conditional: withConditional(base),
  cached: withCache(base)
});`}</pre>
						</div>
						<div className='ultimate-pattern'>
							<h4>🎯 Smart Error Recovery</h4>
							<pre className='mini-code'>{`// Help users fix errors
const suggest = (field, value) => {
  if (field === 'email' && !value.includes('@')) {
    return 'Did you forget @domain.com?';
  }
  return getSmartSuggestion(field, value);
};`}</pre>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "The Ultimate Guardian's Mastery:",
						content:
							"The ultimate validation defense combines multiple strategies into one coherent system. Use schema validation for consistency and maintainability. Implement multi-step validation for complex forms, breaking the journey into manageable pieces. Apply conditional rules for dynamic requirements. Leverage memoization and caching for performance. Most importantly, treat validation as a guide, not a gatekeeper. The strongest fortress is one that legitimate users can enter easily while keeping threats at bay. Master these patterns, and your forms become both secure and delightful.",
					}}
					reflectionQuestions={[
						'How does breaking validation into steps improve both security and user experience?',
						'Why is combining multiple validation strategies more powerful than relying on one approach?',
						"What validation patterns from Aria's entire journey came together in this ultimate system?",
					]}
					journalEntry={{
						title: "Aria's Journal - Day 19 (Evening)",
						content:
							"What a journey through the Validation Fortress! Validus taught me how to create the ultimate defense system by combining everything: schema validation (like Context patterns), multi-step management (state machines from Eastern Quarter), conditional logic (props patterns), and performance optimization (hook mastery). He was impressed with how quickly I grasped the concepts! The fortress is now impenetrable yet welcoming to legitimate users. Binary's analysis shows 99.8% efficiency! The guardians will use this system for generations. Tomorrow we head to the final challenge at the Submission Portal Gateway. Portal Keeper Sage awaits...",
					}}
					lessonEnding={[
						'As the fortress walls glowed with the light of activated defenses, Commander Validus smiled with pride. "You\'ve learned exceptionally well, Aria! Your understanding of validation patterns will serve you well in your React journey. The Western Quarter\'s data security knowledge is now yours!"',
						'"Every pattern has its place," Aria reflected. "From simple gates to complex multi-stage defenses, it all builds on the React foundations I\'ve learned."',
						'"One final challenge remains," Validus said, pointing toward a shimmering portal. "Portal Keeper Sage has requested your presence. The Submission Portals hold the ultimate test of form mastery."',
						'Binary\'s circuits sparked with anticipation. "Portal energy signatures detected. Shall we complete our Forms & Events mastery?"',
					]}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
