import React, { useState, useCallback, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterThree() {
	const {
		errorState,
		handleError,
		retryCount,
		retrySubmission,
		optimizations,
		toggleOptimization,
		submissionLog,
		addLog,
		responseData,
		completeSubmission,
		resetPortal,
		portalState,
		activatePortal,
		updateProgress,
	} = useOutletContext();

	const [ultimateForm, setUltimateForm] = useState({
		// Form state from Form Alchemy
		customerInfo: {
			name: '',
			email: '',
			company: '',
		},
		// Event handling from Event Symphony
		projectDetails: {
			title: '',
			description: '',
			priority: 'medium',
			technologies: [],
		},
		// Validation rules from Validation Guardians
		requirements: {
			budget: '',
			timeline: '',
			teamSize: '',
		},
		// Submission config from Portals
		submissionConfig: {
			retryEnabled: true,
			optimisticUpdate: true,
			backgroundSync: true,
		},
	});

	const [validationStatus, setValidationStatus] = useState({
		customerInfo: false,
		projectDetails: false,
		requirements: false,
	});

	const [synthesisActive, setSynthesisActive] = useState(false);
	const [masterPatterns, setMasterPatterns] = useState([]);
	const queueRef = useRef([]);

	// The ultimate validation system combining all patterns
	const validateSection = useCallback((section, data) => {
		switch (section) {
			case 'customerInfo':
				return data.name && data.email.includes('@') && data.company;
			case 'projectDetails':
				return (
					data.title &&
					data.description &&
					data.technologies.length > 0
				);
			case 'requirements':
				return (
					data.budget &&
					!isNaN(data.budget) &&
					data.timeline &&
					data.teamSize
				);
			default:
				return false;
		}
	}, []);

	// Event orchestration from Event Symphony
	const handleFieldChange = useCallback(
		(section, field, value) => {
			setUltimateForm((prev) => ({
				...prev,
				[section]: {
					...prev[section],
					[field]: value,
				},
			}));

			// Real-time validation
			const newData = {
				...ultimateForm[section],
				[field]: value,
			};
			const isValid = validateSection(section, newData);
			setValidationStatus((prev) => ({
				...prev,
				[section]: isValid,
			}));

			// Log the event
			addLog(`Field updated: ${section}.${field}`, 'info');
		},
		[ultimateForm, validateSection, addLog]
	);

	// The Grand Synthesis submission
	const handleGrandSynthesis = async (e) => {
		e.preventDefault();

		setSynthesisActive(true);
		activatePortal();

		// Phase 1: Form State Collection (Form Alchemy)
		updateProgress(20, 'Collecting Form State');
		addLog('Gathering form data using Alchemy patterns...', 'info');
		await new Promise((resolve) => setTimeout(resolve, 800));

		// Phase 2: Event Processing (Event Symphony)
		updateProgress(40, 'Processing Events');
		addLog('Orchestrating event flows with Symphony patterns...', 'info');
		await new Promise((resolve) => setTimeout(resolve, 800));

		// Phase 3: Validation (Validation Guardians)
		updateProgress(60, 'Validating Data');
		addLog('Applying Guardian validation patterns...', 'info');
		const allValid = Object.values(validationStatus).every((v) => v);
		if (!allValid) {
			handleError('Validation failed - incomplete data');
			setSynthesisActive(false);
			return;
		}
		await new Promise((resolve) => setTimeout(resolve, 800));

		// Phase 4: Submission (Portal Transmission)
		updateProgress(80, 'Portal Transmission');
		addLog('Opening portal with advanced patterns...', 'info');

		try {
			// Simulate the ultimate submission
			const response = await simulateUltimateSubmission(ultimateForm);

			updateProgress(100, 'Complete');
			completeSubmission(response);
			addLog(
				'🎉 Grand Synthesis successful! All patterns unified!',
				'success'
			);

			// Demonstrate pattern mastery
			setMasterPatterns([
				'Form State Management ✓',
				'Event Orchestration ✓',
				'Validation Defense ✓',
				'Portal Transmission ✓',
			]);
		} catch (error) {
			handleError(error.message);
			if (ultimateForm.submissionConfig.retryEnabled) {
				addLog(
					'Initiating retry with exponential backoff...',
					'warning'
				);
			}
		} finally {
			setSynthesisActive(false);
		}
	};

	const simulateUltimateSubmission = async (data) => {
		// 80% success rate to demonstrate error handling
		if (Math.random() > 0.8) {
			throw new Error('Portal temporarily unstable');
		}

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					id: 'synthesis-' + Date.now(),
					...data,
					timestamp: new Date().toISOString(),
					message: 'The Grand Synthesis is complete!',
				});
			}, 1500);
		});
	};

	const technologies = [
		'React',
		'TypeScript',
		'GraphQL',
		'Node.js',
		'PostgreSQL',
		'Docker',
	];

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={3}
					title='The Grand Portal Synthesis'
					bridge='The Grand Synthesis Chamber pulsed with the combined energy of every form pattern in the Western Quarter. Here, Sage had brought together masters from each domain - Alchemist Formicus, Conductor Eventus, and Commander Validus - all struggling to create the ultimate submission system.'
				/>

				<StorySection paragraphs={[
					<>"<strong>Aria!</strong>" Sage's voice echoed with excitement. "Perfect timing! I've gathered all your teachers here for a special lesson. Each master will show you how their domain connects with the others to create the ultimate form system."</>,
					`Binary's sensors detected massive energy fluctuations. "Multiple pattern types detected! Form state management, event handlers, validation logic, and submission systems all present. Preparing to learn integration patterns!"`,
					`Aria looked around in wonder at the assembled masters. "This is incredible! All my teachers working together?"`,
					`"Indeed," Sage smiled. "For your final lesson, we'll show you how everything connects. Formeus will demonstrate state management, Eventus will show event orchestration, Validus will handle validation, and I'll teach submission - all working as one unified system."`,
					`"Form Alchemy for state, Event Symphony for interaction, Validation Guardians for defense, and Portal Submission for transmission," Formeus explained. "They're all movements in the same composition, and today you'll learn how they harmonize."`
				]} />

				<div className='aria-grand-synthesis'>
					<h3>Aria's Ultimate Form System</h3>
					<p className='story-paragraph'>
						"Watch as I unify all the patterns you've taught me
						into one seamless system..."
					</p>
				</div>

				<div className='grand-synthesis-chamber'>
					<h3>The Grand Synthesis Interface</h3>
					<p className='sage-amazement'>
						Sage: "Witness the unification of all Forms & Events
						mastery!"
					</p>

					{masterPatterns.length > 0 && (
						<div className='master-patterns-display'>
							<h4>✨ Unified Patterns</h4>
							<div className='pattern-list'>
								{masterPatterns.map((pattern, idx) => (
									<div
										key={idx}
										className='pattern-achievement'>
										{pattern}
									</div>
								))}
							</div>
						</div>
					)}

					<div className='synthesis-status'>
						<div className='status-grid'>
							<div
								className={`status-card ${
									validationStatus.customerInfo ? 'valid' : ''
								}`}>
								<h4>🧪 Form Alchemy</h4>
								<p>Customer Info State</p>
								<span>
									{validationStatus.customerInfo
										? '✓ Ready'
										: '○ Incomplete'}
								</span>
							</div>
							<div
								className={`status-card ${
									validationStatus.projectDetails
										? 'valid'
										: ''
								}`}>
								<h4>🎵 Event Symphony</h4>
								<p>Project Details Flow</p>
								<span>
									{validationStatus.projectDetails
										? '✓ Ready'
										: '○ Incomplete'}
								</span>
							</div>
							<div
								className={`status-card ${
									validationStatus.requirements ? 'valid' : ''
								}`}>
								<h4>🛡️ Validation Guard</h4>
								<p>Requirements Defense</p>
								<span>
									{validationStatus.requirements
										? '✓ Ready'
										: '○ Incomplete'}
								</span>
							</div>
						</div>
					</div>
				</div>

				<CodeExample
					title="The Master Synthesis Pattern"
					discoveredBy="Aria's Grand Synthesis"
					code={`// Aria's Grand Synthesis - All Patterns United
const useUltimateForm = () => {
  // Form Alchemy: State Management
  const [formState, setFormState] = useState(initialState);
  const [validationState, setValidationState] = useState({});
  
  // Event Symphony: Orchestrated Handlers
  const handleChange = useCallback((section, field, value) => {
    // Update state
    setFormState(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
    
    // Trigger validation
    validateField(section, field, value);
    
    // Emit events for other systems
    eventBus.emit('fieldChange', { section, field, value });
  }, []);
  
  // Validation Guardians: Defense Layers
  const validateForm = useMemo(() => {
    return async (data) => {
      const validators = {
        customerInfo: [required, email, companyValid],
        projectDetails: [hasTitle, hasDescription, hasTech],
        requirements: [validBudget, validTimeline, validTeam]
      };
      
      for (const [section, rules] of Object.entries(validators)) {
        for (const rule of rules) {
          const result = await rule(data[section]);
          if (!result.valid) {
            setValidationState(prev => ({
              ...prev,
              [section]: result.message
            }));
            return false;
          }
        }
      }
      return true;
    };
  }, []);
  
  // Portal Submission: Advanced Transmission
  const submit = useCallback(async () => {
    try {
      // Pre-submission validation
      const isValid = await validateForm(formState);
      if (!isValid) throw new Error('Validation failed');
      
      // Optimistic update
      const tempId = 'opt-' + Date.now();
      updateUI({ ...formState, id: tempId, status: 'pending' });
      
      // Submit with retry logic
      const response = await submitWithRetry(formState, {
        maxRetries: 3,
        backoff: 'exponential',
        onRetry: (attempt) => {
          console.log(\`Retry attempt \${attempt}\`);
        }
      });
      
      // Replace optimistic update with real data
      updateUI(response);
      
      return response;
      
    } catch (error) {
      // Rollback optimistic update
      rollbackUI(tempId);
      
      // Queue for background sync if offline
      if (!navigator.onLine) {
        queueForSync(formState);
      }
      
      throw error;
    }
  }, [formState, validateForm]);
  
  return {
    formState,
    validationState,
    handleChange,
    submit,
    isValid: Object.keys(validationState).length === 0
  };
};`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: The Grand Synthesis
					</h3>
					<InstructionBox character="All the masters stand ready around the synthesis chamber.">
						Help Aria demonstrate the ultimate form pattern synthesis! Complete all sections to witness the unified power of Forms & Events mastery.
					</InstructionBox>

					<form
						onSubmit={handleGrandSynthesis}
						className='ultimate-form'>
						<div className='form-section alchemy'>
							<h4>🧪 Form Alchemy Section</h4>
							<p className='section-desc'>
								State management patterns from the Alchemy Lab
							</p>

							<div className='form-field'>
								<label>Alchemist Name:</label>
								<input
									type='text'
									value={ultimateForm.customerInfo.name}
									onChange={(e) =>
										handleFieldChange(
											'customerInfo',
											'name',
											e.target.value
										)
									}
									placeholder='Your name'
									disabled={synthesisActive}
									className='synthesis-input'
								/>
							</div>

							<div className='form-field'>
								<label>Contact Dimension:</label>
								<input
									type='email'
									value={ultimateForm.customerInfo.email}
									onChange={(e) =>
										handleFieldChange(
											'customerInfo',
											'email',
											e.target.value
										)
									}
									placeholder='your@email.com'
									disabled={synthesisActive}
									className='synthesis-input'
								/>
							</div>

							<div className='form-field'>
								<label>Guild Affiliation:</label>
								<input
									type='text'
									value={ultimateForm.customerInfo.company}
									onChange={(e) =>
										handleFieldChange(
											'customerInfo',
											'company',
											e.target.value
										)
									}
									placeholder='Your company/guild'
									disabled={synthesisActive}
									className='synthesis-input'
								/>
							</div>
						</div>

						<div className='form-section symphony'>
							<h4>🎵 Event Symphony Section</h4>
							<p className='section-desc'>
								Event orchestration from the Concert Hall
							</p>

							<div className='form-field'>
								<label>Project Composition:</label>
								<input
									type='text'
									value={ultimateForm.projectDetails.title}
									onChange={(e) =>
										handleFieldChange(
											'projectDetails',
											'title',
											e.target.value
										)
									}
									placeholder='Project title'
									disabled={synthesisActive}
									className='synthesis-input'
								/>
							</div>

							<div className='form-field'>
								<label>Symphony Description:</label>
								<textarea
									value={
										ultimateForm.projectDetails.description
									}
									onChange={(e) =>
										handleFieldChange(
											'projectDetails',
											'description',
											e.target.value
										)
									}
									placeholder='Describe your project vision...'
									rows='3'
									disabled={synthesisActive}
									className='synthesis-textarea'
								/>
							</div>

							<div className='form-field'>
								<label>Technology Instruments:</label>
								<div className='tech-selector'>
									{technologies.map((tech) => (
										<label
											key={tech}
											className='tech-option'>
											<input
												type='checkbox'
												checked={ultimateForm.projectDetails.technologies.includes(
													tech
												)}
												onChange={(e) => {
													const techs = e.target
														.checked
														? [
																...ultimateForm
																	.projectDetails
																	.technologies,
																tech,
														  ]
														: ultimateForm.projectDetails.technologies.filter(
																(t) =>
																	t !== tech
														  );
													handleFieldChange(
														'projectDetails',
														'technologies',
														techs
													);
												}}
												disabled={synthesisActive}
											/>
											<span>{tech}</span>
										</label>
									))}
								</div>
							</div>
						</div>

						<div className='form-section guardians'>
							<h4>🛡️ Validation Guardian Section</h4>
							<p className='section-desc'>
								Defense patterns from the Fortress
							</p>

							<div className='form-field'>
								<label>Budget Allocation:</label>
								<input
									type='number'
									value={ultimateForm.requirements.budget}
									onChange={(e) =>
										handleFieldChange(
											'requirements',
											'budget',
											e.target.value
										)
									}
									placeholder='Project budget'
									min='0'
									disabled={synthesisActive}
									className='synthesis-input'
								/>
							</div>

							<div className='form-field'>
								<label>Timeline Defense:</label>
								<select
									value={ultimateForm.requirements.timeline}
									onChange={(e) =>
										handleFieldChange(
											'requirements',
											'timeline',
											e.target.value
										)
									}
									disabled={synthesisActive}
									className='synthesis-select'>
									<option value=''>Select timeline...</option>
									<option value='1-month'>
										1 Moon Cycle
									</option>
									<option value='3-months'>
										3 Moon Cycles
									</option>
									<option value='6-months'>
										6 Moon Cycles
									</option>
									<option value='1-year'>
										Full Solar Cycle
									</option>
								</select>
							</div>

							<div className='form-field'>
								<label>Guardian Team Size:</label>
								<input
									type='number'
									value={ultimateForm.requirements.teamSize}
									onChange={(e) =>
										handleFieldChange(
											'requirements',
											'teamSize',
											e.target.value
										)
									}
									placeholder='Team members needed'
									min='1'
									max='100'
									disabled={synthesisActive}
									className='synthesis-input'
								/>
							</div>
						</div>

						<div className='form-section portal'>
							<h4>🌀 Portal Configuration</h4>
							<p className='section-desc'>
								Submission patterns from the Gateway
							</p>

							<div className='config-options'>
								<label className='config-option'>
									<input
										type='checkbox'
										checked={
											ultimateForm.submissionConfig
												.retryEnabled
										}
										onChange={(e) =>
											handleFieldChange(
												'submissionConfig',
												'retryEnabled',
												e.target.checked
											)
										}
										disabled={synthesisActive}
									/>
									<span>Enable Retry Logic</span>
								</label>
								<label className='config-option'>
									<input
										type='checkbox'
										checked={
											ultimateForm.submissionConfig
												.optimisticUpdate
										}
										onChange={(e) =>
											handleFieldChange(
												'submissionConfig',
												'optimisticUpdate',
												e.target.checked
											)
										}
										disabled={synthesisActive}
									/>
									<span>Optimistic Updates</span>
								</label>
								<label className='config-option'>
									<input
										type='checkbox'
										checked={
											ultimateForm.submissionConfig
												.backgroundSync
										}
										onChange={(e) =>
											handleFieldChange(
												'submissionConfig',
												'backgroundSync',
												e.target.checked
											)
										}
										disabled={synthesisActive}
									/>
									<span>Background Sync</span>
								</label>
							</div>
						</div>

						<div className='synthesis-controls'>
							<button
								type='submit'
								disabled={
									synthesisActive ||
									!Object.values(validationStatus).every(
										(v) => v
									)
								}
								className='synthesis-button'>
								{synthesisActive
									? '🌟 Synthesis Active...'
									: '⚡ Initiate Grand Synthesis'}
							</button>

							{errorState && (
								<button
									type='button'
									onClick={retrySubmission}
									className='retry-button'>
									🔄 Retry Synthesis
								</button>
							)}
						</div>
					</form>

					{responseData && (
						<div className='synthesis-success'>
							<h4>🎉 Grand Synthesis Complete!</h4>
							<p>Portal ID: {responseData.id}</p>
							<p className='success-message'>
								{responseData.message}
							</p>
						</div>
					)}
				</div>

			<StorySection paragraphs={[
				`The assembled masters watched with satisfaction as their collaborative teaching stabilized the portal. Each pattern flowed seamlessly into the next - form state managed by alchemy, events orchestrated like a symphony, validation standing guard, and submission flowing through a perfect portal.`,
				`"Incredible!" Formeus exclaimed. "She's learned how to connect my controlled components with Eventus's delegation patterns!"`,
				`"And my validation gates work perfectly with Sage's async submission!" Validus added, his armor glowing with approval.`,
				`Binary's final analysis appeared: "System efficiency: 99.7%! All patterns unified. Zero conflicts detected. Aria has achieved true Forms & Events mastery!"`
			]} />

				<div className='ultimate-wisdom'>
					<h3>The Unified Patterns</h3>
					<div className='wisdom-grid'>
						<div className='wisdom-card'>
							<h4>🧪 State Unity</h4>
							<p>
								Form state, validation state, and submission
								state work as one unified system
							</p>
						</div>
						<div className='wisdom-card'>
							<h4>🎵 Event Harmony</h4>
							<p>
								Changes flow through validation to submission in
								perfect orchestration
							</p>
						</div>
						<div className='wisdom-card'>
							<h4>🛡️ Defense Depth</h4>
							<p>
								Validation at every layer ensures data integrity
								throughout the journey
							</p>
						</div>
						<div className='wisdom-card'>
							<h4>🌀 Portal Power</h4>
							<p>
								Submission handles all scenarios with retry,
								optimization, and sync
							</p>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "The Grand Synthesis Master's Ultimate Wisdom:",
						content:
							"True mastery of Forms & Events isn't about individual patterns - it's about understanding how they create a unified whole. Form state management provides the data foundation. Event handling creates the interaction layer. Validation ensures data integrity at every step. Submission patterns handle the journey to the server. When combined, they create a seamless experience where users feel guided, protected, and empowered. Remember: in React, every form is a complete application in miniature. Master the synthesis of these patterns, and you master the essence of interactive web applications.",
					}}
					reflectionQuestions={[
						'How did combining all Forms & Events patterns create something greater than the sum of its parts?',
						"What patterns from Aria's entire React journey came together in this Grand Synthesis?",
						'How can you apply this unified approach to forms in your own React applications?',
					]}
					journalEntry={{
						title: "Aria's Journal - Day 20 (Evening)",
						content:
							"The Grand Synthesis complete! Today all my teachers worked together to show me how all their patterns unite into one seamless system. Form Alchemy provides the foundation of state. Event Symphony orchestrates user interaction. Validation Guardians ensure data integrity. Portal Submission handles the final transmission. But the true magic is how they work together - state changes trigger events, events trigger validation, validation enables submission, and submission completes the cycle. Binary recorded 99.7% efficiency when all patterns unified. The masters declared my Forms & Events training complete! Tomorrow, we journey to the Routing Crossroads for the next challenge of my React mastery!",
					}}
					lessonEnding={[
						'As the Grand Synthesis Chamber\'s energy stabilized, Sage approached Aria with deep respect. "You\'ve done what none of us could achieve alone. You\'ve shown that true mastery comes not from perfecting individual patterns, but from understanding how they dance together."',
						'"Every pattern has its purpose," Aria reflected, "but their true power emerges when unified. This synthesis will serve the Western Quarter for generations."',
						'Binary displayed a new map marker. "Routing Crossroads detected ahead. The final challenge of your React journey awaits."',
						'Aria looked at the assembled masters one last time. Each smiled with the satisfaction of teachers who had guided a dedicated student to mastery. She had learned from each of them and grown tremendously. With Binary at her side, she set off toward the Routing Crossroads, ready for the next chapter of her React journey.',
					]}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
