import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const { 
		portalState,
		activatePortal,
		submissionProgress,
		updateProgress,
		currentPhase,
		handleError,
		completeSubmission,
		addLog,
		resetPortal
	} = useOutletContext();

	const [formData, setFormData] = useState({
		title: '',
		content: '',
		priority: 'medium'
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [feedbackState, setFeedbackState] = useState('idle');

	const submissionPhases = [
		{ name: 'Validation', progress: 20, duration: 1000 },
		{ name: 'Preparation', progress: 40, duration: 800 },
		{ name: 'Transmission', progress: 70, duration: 1500 },
		{ name: 'Confirmation', progress: 90, duration: 1000 },
		{ name: 'Complete', progress: 100, duration: 500 }
	];

	// Simulate API call with various outcomes
	const simulateAPICall = async (data) => {
		// Random outcome for demonstration
		const outcomes = ['success', 'error', 'timeout'];
		const outcome = Math.random() > 0.7 ? outcomes[Math.floor(Math.random() * 2) + 1] : 'success';

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (outcome === 'success') {
					resolve({
						id: Date.now(),
						...data,
						timestamp: new Date().toISOString()
					});
				} else if (outcome === 'error') {
					reject(new Error('Server returned an error'));
				} else {
					reject(new Error('Request timeout'));
				}
			}, 2000);
		});
	};

	const handleAsyncSubmit = async (e) => {
		e.preventDefault();
		
		setIsSubmitting(true);
		setFeedbackState('loading');
		activatePortal();
		
		try {
			// Phase 1: Validation
			updateProgress(20, 'Validation');
			await new Promise(resolve => setTimeout(resolve, 1000));
			addLog('Data validation passed', 'success');

			// Phase 2: Preparation
			updateProgress(40, 'Preparation');
			await new Promise(resolve => setTimeout(resolve, 800));
			addLog('Data prepared for transmission', 'info');

			// Phase 3: Transmission
			updateProgress(70, 'Transmission');
			addLog('Transmitting data...', 'info');
			
			const response = await simulateAPICall(formData);
			
			// Phase 4: Confirmation
			updateProgress(90, 'Confirmation');
			await new Promise(resolve => setTimeout(resolve, 500));
			addLog('Server response received', 'success');

			// Phase 5: Complete
			updateProgress(100, 'Complete');
			completeSubmission(response);
			setFeedbackState('success');
			
			// Reset form
			setTimeout(() => {
				setFormData({ title: '', content: '', priority: 'medium' });
				resetPortal();
				setFeedbackState('idle');
			}, 3000);

		} catch (error) {
			handleError(error.message);
			setFeedbackState('error');
			addLog(`Submission failed: ${error.message}`, 'error');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleFieldChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	// Generate particles for portal effect
	const particles = Array.from({ length: 10 }, (_, i) => (
		<div
			key={i}
			className='particle'
			style={{
				left: `${Math.random() * 100}%`,
				animationDelay: `${Math.random() * 3}s`
			}}
		/>
	));

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: Async Portal Transmission
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Sage learned that portal transmissions weren't instantaneous. 
					Data had to travel through multiple dimensions - validation, 
					preparation, transmission, and confirmation. Managing these 
					async phases while keeping travelers (users) informed was 
					crucial for successful journeys.
				</p>

				<div className='async-timeline'>
					<h3>Transmission Timeline</h3>
					<div className='timeline-track'>
						<div 
							className='timeline-progress'
							style={{ width: `${submissionProgress}%` }}
						/>
					</div>
					<div className='timeline-markers'>
						{submissionPhases.map((phase, index) => (
							<div key={phase.name} className='timeline-marker'>
								<div className={`marker-dot ${
									submissionProgress >= phase.progress ? 'completed' : 
									currentPhase === phase.name ? 'active' : ''
								}`} />
								<span>{phase.name}</span>
							</div>
						))}
					</div>
				</div>

				<div className='feedback-orb-container' style={{ textAlign: 'center' }}>
					<div className={`feedback-orb ${feedbackState}`}>
						{feedbackState === 'idle' && '💤'}
						{feedbackState === 'loading' && '🌀'}
						{feedbackState === 'success' && '✨'}
						{feedbackState === 'error' && '⚡'}
					</div>
					<p>Portal Status: {feedbackState}</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Async Form Submission
				</h3>

				<div className='submission-form'>
					<h4>Async Transmission Control</h4>
					
					<form onSubmit={handleAsyncSubmit}>
						<div className='form-field'>
							<label>Message Title:</label>
							<input
								type='text'
								value={formData.title}
								onChange={(e) => handleFieldChange('title', e.target.value)}
								placeholder='Enter title'
								required
								disabled={isSubmitting}
							/>
						</div>

						<div className='form-field'>
							<label>Message Content:</label>
							<textarea
								value={formData.content}
								onChange={(e) => handleFieldChange('content', e.target.value)}
								placeholder='Enter your message'
								rows='4'
								required
								disabled={isSubmitting}
							/>
						</div>

						<div className='form-field'>
							<label>Priority Level:</label>
							<select
								value={formData.priority}
								onChange={(e) => handleFieldChange('priority', e.target.value)}
								disabled={isSubmitting}>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
								<option value='urgent'>Urgent</option>
							</select>
						</div>

						<button 
							type='submit' 
							disabled={isSubmitting}
							style={{
								opacity: isSubmitting ? 0.6 : 1,
								cursor: isSubmitting ? 'not-allowed' : 'pointer'
							}}>
							{isSubmitting ? '🌀 Transmitting...' : '📡 Send Message'}
						</button>
					</form>

					{isSubmitting && (
						<div className='portal-particles'>
							{particles}
						</div>
					)}
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Async Form Submission Pattern
async function handleSubmit(e) {
  e.preventDefault();
  
  // Update UI state
  setIsSubmitting(true);
  setError(null);
  
  try {
    // Validate data
    const validationResult = await validateForm(formData);
    if (!validationResult.valid) {
      throw new Error(validationResult.message);
    }
    
    // Make API call
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Handle success
    setSuccess(true);
    showSuccessMessage('Form submitted successfully!');
    
    // Reset form after delay
    setTimeout(() => {
      resetForm();
    }, 2000);
    
  } catch (error) {
    // Handle errors
    setError(error.message);
    console.error('Submission error:', error);
    
  } finally {
    // Always cleanup
    setIsSubmitting(false);
  }
}

// Loading States Management
const LoadingStates = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// useSubmit Hook Pattern
function useSubmit(submitFn) {
  const [state, setState] = useState(LoadingStates.IDLE);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const submit = async (...args) => {
    setState(LoadingStates.LOADING);
    setError(null);
    
    try {
      const result = await submitFn(...args);
      setData(result);
      setState(LoadingStates.SUCCESS);
      return result;
    } catch (err) {
      setError(err);
      setState(LoadingStates.ERROR);
      throw err;
    }
  };

  return { submit, state, error, data };
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Async Portal Master's Secret:</h3>
				<p>
					Async form submission is like guiding data through a multi-dimensional 
					portal. The journey isn't instant - it involves validation, network 
					travel time, server processing, and response handling. The key is 
					providing clear feedback at each phase: loading states show the portal 
					is active, progress indicators reveal the journey's stage, and proper 
					error handling ensures failed transmissions can be retried. Always 
					disable form controls during submission to prevent duplicate transmissions.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Why is showing progress through different phases important 
					for user experience during async operations?
				</p>
				<p>
					How does proper error handling in async submissions create 
					a more resilient application?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;