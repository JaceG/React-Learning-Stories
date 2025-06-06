import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const { 
		portalState,
		activatePortal,
		addLog,
		resetPortal
	} = useOutletContext();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	});

	const [submissionMethod, setSubmissionMethod] = useState('');

	const submissionStates = [
		{ name: 'idle', icon: '😴', description: 'Portal dormant, awaiting data' },
		{ name: 'validating', icon: '🔍', description: 'Checking data integrity' },
		{ name: 'submitting', icon: '🌀', description: 'Transmitting through portal' },
		{ name: 'success', icon: '✨', description: 'Successfully transmitted!' },
		{ name: 'error', icon: '⚡', description: 'Transmission failed' }
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

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: Opening the Portal
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the mystical realm of Form Submission, a portal keeper named 
					Sage discovered ancient gateways that could transport data across 
					dimensions. Each portal had different states and behaviors, and 
					understanding them was key to successful data transmission.
				</p>

				<div className='portal-chamber'>
					<h3>The Submission Portal</h3>
					<div className='submission-portal'>
						<div className='portal-ring'></div>
						<div className='portal-ring'></div>
						<div className='portal-ring'></div>
						<div className={`portal-core ${portalState}`}>
							{portalState === 'idle' && '🌀'}
							{portalState === 'active' && '✨'}
							{portalState === 'success' && '✅'}
							{portalState === 'error' && '❌'}
						</div>
					</div>
					
					<div className='submission-states'>
						{submissionStates.map((state) => (
							<div 
								key={state.name}
								className={`state-card ${portalState === state.name ? 'active' : ''}`}>
								<div className='state-icon'>{state.icon}</div>
								<h4>{state.name.charAt(0).toUpperCase() + state.name.slice(1)}</h4>
								<p>{state.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Basic Portal Activation
				</h3>

				<div className='submission-form'>
					<h4>Portal Control Panel</h4>
					
					<form onSubmit={handleBasicSubmit}>
						<div className='form-field'>
							<label>Traveler Name:</label>
							<input
								type='text'
								value={formData.name}
								onChange={(e) => handleFieldChange('name', e.target.value)}
								placeholder='Enter your name'
								required
							/>
						</div>

						<div className='form-field'>
							<label>Contact Dimension (Email):</label>
							<input
								type='email'
								value={formData.email}
								onChange={(e) => handleFieldChange('email', e.target.value)}
								placeholder='your@email.com'
								required
							/>
						</div>

						<div className='form-field'>
							<label>Message to Send:</label>
							<textarea
								value={formData.message}
								onChange={(e) => handleFieldChange('message', e.target.value)}
								placeholder='Your message...'
								rows='4'
								required
							/>
						</div>

						<div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
							<button type='submit'>
								Activate Portal (Submit)
							</button>
							<button type='button' onClick={demonstratePreventDefault}>
								Prevent Default
							</button>
							<button type='button' onClick={demonstrateNativeSubmit}>
								Native Submit (Demo)
							</button>
						</div>
					</form>

					{submissionMethod && (
						<div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
							<h5>Submission Method: {submissionMethod}</h5>
							{submissionMethod === 'prevented' && (
								<p>✅ Form submission prevented - custom logic executed instead</p>
							)}
							{submissionMethod === 'native' && (
								<p>⚠️ Native submission would cause a page reload/redirect</p>
							)}
						</div>
					)}
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Basic Form Submission in React
function SubmissionPortal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle form submission
  const handleSubmit = (e) => {
    // CRITICAL: Prevent default browser submission
    e.preventDefault();
    
    // Your custom submission logic
    console.log('Form submitted:', formData);
    
    // You can now:
    // - Validate the data
    // - Send to an API
    // - Show loading states
    // - Handle responses
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({
          ...formData,
          name: e.target.value
        })}
      />
      
      <button type="submit">
        Submit Form
      </button>
    </form>
  );
}

// Understanding Form Events
const FormEventTypes = {
  onSubmit: "Fired when form is submitted",
  onChange: "Fired when input value changes",
  onBlur: "Fired when input loses focus",
  onFocus: "Fired when input gains focus",
  onReset: "Fired when form is reset"
};

// Different Submit Triggers
// 1. Button with type="submit" (default)
// 2. Input with type="submit"
// 3. Pressing Enter in a text input
// 4. form.submit() JavaScript method`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Portal Keeper's Wisdom:</h3>
				<p>
					Form submission is like opening a portal between your application 
					and a server. The key insight is that React gives you complete 
					control over this portal through the onSubmit event and preventDefault(). 
					This allows you to intercept the browser's default behavior (page reload) 
					and instead handle the submission with JavaScript, maintaining your 
					application's state and providing a smooth user experience.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Why is preventing the default form submission behavior crucial 
					in single-page React applications?
				</p>
				<p>
					How does thinking of form submission as a "portal" help you 
					understand the flow of data from client to server?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;