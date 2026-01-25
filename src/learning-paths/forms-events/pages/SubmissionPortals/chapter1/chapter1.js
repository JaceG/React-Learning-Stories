import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterOne() {
	const { portalState, activatePortal, addLog, resetPortal } =
		useOutletContext();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [submissionMethod, setSubmissionMethod] = useState('');

	const submissionStates = [
		{
			name: 'idle',
			icon: '😴',
			description: 'Portal dormant, awaiting data',
		},
		{
			name: 'validating',
			icon: '🔍',
			description: 'Checking data integrity',
		},
		{
			name: 'submitting',
			icon: '🌀',
			description: 'Transmitting through portal',
		},
		{
			name: 'success',
			icon: '✨',
			description: 'Successfully transmitted!',
		},
		{ name: 'error', icon: '⚡', description: 'Transmission failed' },
	];

	const handleFieldChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleBasicSubmit = (e) => {
		e.preventDefault();

		// Show the portal activation
		activatePortal();
		addLog('Basic form submission initiated', 'info');

		// Simulate submission process
		setTimeout(() => {
			addLog('Form data prepared for transmission', 'info');
			console.log('Submitted data:', formData);

			// Reset after showing success
			setTimeout(() => {
				resetPortal();
			}, 2000);
		}, 1000);
	};

	const demonstratePreventDefault = (e) => {
		e.preventDefault();
		addLog('Default form submission prevented!', 'warning');
		addLog('Custom submission logic can now run', 'info');
		setSubmissionMethod('prevented');
	};

	const demonstrateNativeSubmit = () => {
		addLog('⚠️ Native submission would reload the page!', 'error');
		setSubmissionMethod('native');
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title='Opening the Portal'
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"<strong>Aria!</strong>" Sage's voice echoed with
						warmth. "<strong>Portal Keeper Sage</strong>
						at your service. I've heard of your progress across the
						Western Quarter. Welcome to the Portal Gateway - here
						I'll teach you the final piece of the Forms & Events
						puzzle!"
					</p>

					<p className='story-paragraph'>
						Binary's sensors detected massive energy fluctuations.
						"Portal instability detected! Multiple failed
						submissions, synchronization errors, and data loss
						events recorded."
					</p>

					<p className='story-paragraph'>
						Aria studied the chaotic portal with curiosity. "This
						looks complex! I wonder if there are patterns I could
						learn to help stabilize it?"
					</p>

					<p className='story-paragraph'>
						"Excellent instinct!" Sage gestured urgently. "Every
						failed submission costs us valuable data. The
						traditional methods cause page reloads, lost state, and
						poor user experience. Let me teach you the fundamental
						secret of portal control."
					</p>

					<p className='story-paragraph'>
						"The key," Sage explained, demonstrating the technique,
						"is understanding and preventing the browser's default
						behavior. Watch as I show you the foundational pattern."
					</p>

					<div className='aria-portal-mastery'>
						<h3>Aria's Portal Control Theory</h3>
						<p className='story-paragraph'>
							"Every form submission starts with
							e.preventDefault()," Sage taught. "This simple
							incantation gives us complete control over the
							portal, allowing us to validate, transform, and
							transmit data however we choose."
						</p>

						<p className='story-paragraph'>
							"I see!" Aria exclaimed. "So we intercept the
							browser's natural behavior and replace it with our
							own controlled process?"
						</p>
					</div>

					<div className='portal-chamber'>
						<h3>The Submission Portal States</h3>
						<p className='sage-explanation'>
							Sage: "Observe how the portal transitions through
							different states..."
						</p>
						<div className='submission-portal'>
							<div className='portal-ring outer'></div>
							<div className='portal-ring middle'></div>
							<div className='portal-ring inner'></div>
							<div className={`portal-core ${portalState}`}>
								<span className='portal-icon'>
									{portalState === 'idle' && '🌀'}
									{portalState === 'active' && '✨'}
									{portalState === 'success' && '✅'}
									{portalState === 'error' && '❌'}
								</span>
							</div>
						</div>

						<div className='submission-states'>
							{submissionStates.map((state) => (
								<div
									key={state.name}
									className={`state-card ${
										portalState === state.name
											? 'active'
											: ''
									}`}>
									<div className='state-icon'>
										{state.icon}
									</div>
									<h4>
										{state.name.charAt(0).toUpperCase() +
											state.name.slice(1)}
									</h4>
									<p className='state-desc'>
										{state.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<CodeExample
					title="The Foundation of Portal Control"
					discoveredBy="Demonstrated by Portal Keeper Sage"
					code={`// Aria's Portal Control Pattern
function SubmissionPortal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [portalState, setPortalState] = useState('idle');

  // The crucial pattern - prevent default!
  const handleSubmit = async (e) => {
    // CRITICAL: Stop the browser's natural behavior
    e.preventDefault();
    
    // Now we control the portal completely
    setPortalState('validating');
    
    try {
      // Validate (using patterns from Validation Fortress)
      const isValid = await validateForm(formData);
      if (!isValid) throw new Error('Validation failed');
      
      setPortalState('submitting');
      
      // Submit (the actual portal opening)
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setPortalState('success');
      // Handle success...
      
    } catch (error) {
      setPortalState('error');
      // Handle error...
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Open Portal</button>
    </form>
  );
}`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Mastering Portal Control
					</h3>
					<InstructionBox character="Portal Keeper Sage activates the gateway.">
						Help Aria demonstrate proper portal control! Submit the form and observe how preventing default behavior gives us complete control over the submission process.
					</InstructionBox>

					<div className='submission-form'>
						<h4>🌀 Portal Control Interface</h4>

						<form onSubmit={handleBasicSubmit}>
							<div className='form-field'>
								<label>Traveler Name:</label>
								<input
									type='text'
									value={formData.name}
									onChange={(e) =>
										handleFieldChange(
											'name',
											e.target.value
										)
									}
									placeholder='Enter your name'
									className='portal-input'
									required
								/>
							</div>

							<div className='form-field'>
								<label>Contact Dimension (Email):</label>
								<input
									type='email'
									value={formData.email}
									onChange={(e) =>
										handleFieldChange(
											'email',
											e.target.value
										)
									}
									placeholder='your@dimension.portal'
									className='portal-input'
									required
								/>
							</div>

							<div className='form-field'>
								<label>Transmission Message:</label>
								<textarea
									value={formData.message}
									onChange={(e) =>
										handleFieldChange(
											'message',
											e.target.value
										)
									}
									placeholder='Your message to transmit...'
									rows='4'
									className='portal-textarea'
									required
								/>
							</div>

							<div className='submission-controls'>
								<button type='submit' className='submit-button'>
									🌀 Activate Portal (Submit)
								</button>
								<button
									type='button'
									onClick={demonstratePreventDefault}
									className='prevent-button'>
									🛡️ Prevent Default
								</button>
								<button
									type='button'
									onClick={demonstrateNativeSubmit}
									className='native-button'>
									⚠️ Native Submit (Demo)
								</button>
							</div>
						</form>

						{submissionMethod && (
							<div className='method-display'>
								<h5>Submission Method Analysis</h5>
								{submissionMethod === 'prevented' && (
									<div className='method-success'>
										<p>
											✅ Default behavior prevented
											successfully!
										</p>
										<p>
											React now has full control over the
											submission process.
										</p>
									</div>
								)}
								{submissionMethod === 'native' && (
									<div className='method-warning'>
										<p>⚠️ Native submission would cause:</p>
										<ul>
											<li>Page reload/redirect</li>
											<li>Lost application state</li>
											<li>Poor user experience</li>
										</ul>
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				<div className='sage-enlightenment'>
					<p className='story-paragraph'>
						Sage watched in amazement as Aria effortlessly
						controlled the portal. "Incredible! You've shown that
						the secret isn't in complex magic, but in understanding
						and preventing the browser's default behavior!"
					</p>

					<p className='story-paragraph'>
						"Exactly," Aria confirmed. "Every form submission starts
						with e.preventDefault(). This simple incantation gives
						us complete control over the portal, allowing us to
						validate, transform, and transmit data however we
						choose."
					</p>

					<p className='story-paragraph'>
						Binary added excitedly, "Portal stability increased to
						100%! No more page reloads detected. User experience
						optimization achieved!"
					</p>
				</div>

				<div className='submission-triggers'>
					<h3>Portal Activation Methods</h3>
					<div className='trigger-grid'>
						<div className='trigger-card'>
							<h4>📱 Submit Button</h4>
							<pre className='mini-code'>{`<button type="submit">
  Open Portal
</button>`}</pre>
							<p>Most common trigger</p>
						</div>
						<div className='trigger-card'>
							<h4>⌨️ Enter Key</h4>
							<pre className='mini-code'>{`// Automatic in text inputs
<input type="text" />
// Press Enter to submit`}</pre>
							<p>Natural user behavior</p>
						</div>
						<div className='trigger-card'>
							<h4>🎯 Programmatic</h4>
							<pre className='mini-code'>{`// Manual submission
formRef.current.submit();
// Or dispatch event
formRef.current.dispatchEvent(
  new Event('submit')
);`}</pre>
							<p>Code-triggered</p>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "The Portal Keeper's First Law:",
						content:
							'Form submission is the gateway between your React application and the outside world. The fundamental pattern is preventDefault() - this single method transforms chaotic browser behavior into controlled data transmission. By preventing the default submission, you maintain complete control over validation, error handling, loading states, and success feedback. Remember: every portal begins with prevention. Master this, and you master the flow of data from client to server.',
					}}
					reflectionQuestions={[
						'Why is preventDefault() the foundation of modern form submission in React?',
						'How does controlling the submission "portal" improve user experience?',
						'What happens to your application state without proper portal control?',
					]}
					journalEntry={{
						title: "Aria's Journal - Day 20 (Morning)",
						content:
							"Portal Keeper Sage welcomed me to the Portal Gateway with warmth! This is my final Forms & Events lesson. The portal was unstable - failed submissions, synchronization errors, data loss. Sage taught me the foundational secret: e.preventDefault()! This single incantation stops the browser's default form submission (which would reload the page and lose all state). Now I control the entire submission process - validation, transformation, transmission. Binary detected 100% portal stability after applying the pattern. The submission states (idle, validating, submitting, success, error) remind me of the state machines I learned. Sage mentions advanced techniques await this afternoon!",
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
