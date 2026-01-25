import React, { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterTwo() {
	const {
		portalState,
		activatePortal,
		submissionProgress,
		updateProgress,
		currentPhase,
		handleError,
		completeSubmission,
		addLog,
		resetPortal,
		optimizations,
		toggleOptimization,
		retryCount,
		retrySubmission,
	} = useOutletContext();

	const [formData, setFormData] = useState({
		title: '',
		content: '',
		priority: 'medium',
		dimensions: [],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [feedbackState, setFeedbackState] = useState('idle');
	const [optimisticUpdate, setOptimisticUpdate] = useState(null);
	const abortControllerRef = useRef(null);

	const submissionPhases = [
		{ name: 'Validation', progress: 20, duration: 1000, icon: '🔍' },
		{ name: 'Preparation', progress: 40, duration: 800, icon: '📦' },
		{ name: 'Transmission', progress: 70, duration: 1500, icon: '🌀' },
		{ name: 'Confirmation', progress: 90, duration: 1000, icon: '✅' },
		{ name: 'Complete', progress: 100, duration: 500, icon: '✨' },
	];

	// Simulate API call with various outcomes
	const simulateAPICall = async (data, signal) => {
		// Simulate different scenarios based on retry count
		const failureRate = retryCount > 0 ? 0.2 : 0.3;
		const shouldFail = Math.random() < failureRate;

		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				if (signal?.aborted) {
					reject(new Error('Request cancelled'));
					return;
				}

				if (shouldFail) {
					const errors = [
						'Network error',
						'Server timeout',
						'Invalid data',
					];
					reject(
						new Error(
							errors[Math.floor(Math.random() * errors.length)]
						)
					);
				} else {
					resolve({
						id: Date.now(),
						...data,
						timestamp: new Date().toISOString(),
						serverConfirmation:
							'Portal-' + Math.random().toString(36).substr(2, 9),
					});
				}
			}, 2000);

			// Handle abort
			signal?.addEventListener('abort', () => {
				clearTimeout(timeout);
				reject(new Error('Request cancelled'));
			});
		});
	};

	const handleAsyncSubmit = async (e) => {
		e.preventDefault();

		// Create new abort controller for this submission
		abortControllerRef.current = new AbortController();

		setIsSubmitting(true);
		setFeedbackState('loading');
		activatePortal();

		// Optimistic UI update
		if (optimizations.optimisticUI) {
			setOptimisticUpdate({
				...formData,
				id: 'temp-' + Date.now(),
				status: 'pending',
			});
			addLog('Optimistic update applied', 'info');
		}

		try {
			// Phase 1: Validation
			updateProgress(20, 'Validation');
			await new Promise((resolve) => setTimeout(resolve, 1000));
			addLog('Data validation passed', 'success');

			// Phase 2: Preparation
			updateProgress(40, 'Preparation');
			await new Promise((resolve) => setTimeout(resolve, 800));
			addLog('Data prepared for transmission', 'info');

			// Phase 3: Transmission
			updateProgress(70, 'Transmission');
			addLog('Opening portal connection...', 'info');

			const response = await simulateAPICall(
				formData,
				abortControllerRef.current.signal
			);

			// Phase 4: Confirmation
			updateProgress(90, 'Confirmation');
			await new Promise((resolve) => setTimeout(resolve, 500));
			addLog('Server confirmation received', 'success');

			// Phase 5: Complete
			updateProgress(100, 'Complete');
			completeSubmission(response);
			setFeedbackState('success');

			// Clear optimistic update with real data
			if (optimizations.optimisticUI) {
				setOptimisticUpdate(response);
			}

			// Reset form
			setTimeout(() => {
				setFormData({
					title: '',
					content: '',
					priority: 'medium',
					dimensions: [],
				});
				resetPortal();
				setFeedbackState('idle');
				setOptimisticUpdate(null);
			}, 3000);
		} catch (error) {
			handleError(error.message);
			setFeedbackState('error');
			addLog(`Portal transmission failed: ${error.message}`, 'error');

			// Revert optimistic update on error
			if (optimizations.optimisticUI) {
				setOptimisticUpdate(null);
				addLog('Reverted optimistic update', 'warning');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleFieldChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const cancelSubmission = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			addLog('Transmission cancelled by user', 'warning');
			setIsSubmitting(false);
			resetPortal();
		}
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title='Advanced Portal Techniques'
					bridge={`Sage guided Aria deeper into the portal chamber, where advanced transmission arrays hummed with energy. "You've mastered basic portal control," Sage said, "but true mastery requires handling the unpredictable - network failures, timeouts, and the art of keeping users informed during long transmissions."`}
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						Aria examined the complex portal mechanisms. "I can see
						patterns from my journey - async operations from event
						handling, state management for loading states, and error
						boundaries for recovery. But I'm not sure how they all
						work together for submission."
					</p>

					<p className='story-paragraph'>
						"Excellent observations!" Sage praised. "Your Academy
						training helps you recognize the underlying patterns.
						Our current system frustrates travelers with long waits
						and unclear feedback. Failed transmissions often leave
						them stranded."
					</p>

					<p className='story-paragraph'>
						Binary projected analysis: "Current retry success rate:
						34%. User abandonment during transmission: 67%.
						Optimistic update implementation: 0%."
					</p>

					<p className='story-paragraph'>
						"Those metrics are concerning," Aria noted. "Could you
						teach me patterns that address these issues? Maybe
						something that combines loading states, error recovery,
						and better user feedback?"
					</p>

					<p className='story-paragraph'>
						"Precisely what I hoped you'd ask!" Sage smiled. "Let me
						show you advanced submission patterns - loading states,
						error recovery, optimistic updates, and even
						cancellation. Portal transmission should feel
						instantaneous, even when it's not."
					</p>

					<div className='aria-advanced-portal'>
						<h3>Aria's Advanced Portal Control System</h3>
						<p className='story-paragraph'>
							"Watch as I enhance your portal with techniques from
							across the kingdom..."
						</p>
					</div>
				</div>

				<div className='portal-optimization-panel'>
					<h3>Portal Enhancement Controls</h3>
					<p className='sage-instruction'>
						Sage: "Activate these enhancements to see Aria's
						advanced patterns!"
					</p>
					<div className='optimization-grid'>
						<div
							className={`optimization-card ${
								optimizations.optimisticUI ? 'active' : ''
							}`}
							onClick={() => toggleOptimization('optimisticUI')}>
							<div className='opt-icon'>🎯</div>
							<h4>Optimistic UI</h4>
							<p className='opt-desc'>
								Update UI before server confirms
							</p>
							<span className='opt-status'>
								{optimizations.optimisticUI
									? '✅ Active'
									: '⚡ Click to enable'}
							</span>
						</div>
						<div
							className={`optimization-card ${
								optimizations.debounce ? 'active' : ''
							}`}
							onClick={() => toggleOptimization('debounce')}>
							<div className='opt-icon'>⏱️</div>
							<h4>Debounced Submit</h4>
							<p className='opt-desc'>
								Prevent rapid resubmissions
							</p>
							<span className='opt-status'>
								{optimizations.debounce
									? '✅ Active'
									: '⚡ Click to enable'}
							</span>
						</div>
						<div
							className={`optimization-card ${
								optimizations.backgroundSync ? 'active' : ''
							}`}
							onClick={() =>
								toggleOptimization('backgroundSync')
							}>
							<div className='opt-icon'>🔄</div>
							<h4>Background Sync</h4>
							<p className='opt-desc'>Retry failed submissions</p>
							<span className='opt-status'>
								{optimizations.backgroundSync
									? '✅ Active'
									: '⚡ Click to enable'}
							</span>
						</div>
					</div>
				</div>

				<div className='async-timeline'>
					<h3>Portal Transmission Phases</h3>
					<div className='timeline-track'>
						<div
							className='timeline-progress'
							style={{ width: `${submissionProgress}%` }}
						/>
					</div>
					<div className='timeline-markers'>
						{submissionPhases.map((phase) => (
							<div key={phase.name} className='timeline-marker'>
								<div
									className={`marker-dot ${
										submissionProgress >= phase.progress
											? 'completed'
											: currentPhase === phase.name
											? 'active'
											: ''
									}`}>
									<span className='phase-icon'>
										{phase.icon}
									</span>
								</div>
								<span className='phase-name'>{phase.name}</span>
							</div>
						))}
					</div>
				</div>

				<div className='portal-states-display'>
					<div className='state-grid'>
						<div className={`state-orb ${feedbackState}`}>
							<div className='orb-inner'>
								{feedbackState === 'idle' && '💤'}
								{feedbackState === 'loading' && '🌀'}
								{feedbackState === 'success' && '✨'}
								{feedbackState === 'error' && '⚡'}
							</div>
							<p className='state-label'>
								Portal Status: {feedbackState}
							</p>
						</div>
						{retryCount > 0 && (
							<div className='retry-indicator'>
								<span className='retry-icon'>🔄</span>
								<p>Retry Attempt: {retryCount}</p>
							</div>
						)}
					</div>
				</div>

				<CodeExample
					title="Aria's Advanced Submission Architecture"
					discoveredBy="Applied by Aria"
					code={`// Aria's Ultimate Submission System
const useAdvancedSubmission = (submitFn, options = {}) => {
  const [state, setState] = useState('idle');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef(null);
  
  // Optimistic update management
  const [optimisticData, setOptimisticData] = useState(null);
  
  // Retry logic with exponential backoff
  const retry = useCallback(async (retryCount = 0) => {
    const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
    await new Promise(resolve => setTimeout(resolve, delay));
    return submit(lastSubmitData);
  }, []);
  
  // Main submission function
  const submit = useCallback(async (formData) => {
    // Create AbortController for cancellation
    abortRef.current = new AbortController();
    
    setState('loading');
    setError(null);
    setProgress(0);
    
    // Apply optimistic update
    if (options.optimistic) {
      setOptimisticData({ ...formData, id: 'temp-' + Date.now() });
    }
    
    try {
      // Track progress through phases
      const phases = [
        { name: 'validate', weight: 20 },
        { name: 'prepare', weight: 20 },
        { name: 'submit', weight: 40 },
        { name: 'confirm', weight: 20 }
      ];
      
      let currentProgress = 0;
      for (const phase of phases) {
        await executePhase(phase.name, formData);
        currentProgress += phase.weight;
        setProgress(currentProgress);
      }
      
      // Final submission
      const result = await submitFn(formData, {
        signal: abortRef.current.signal
      });
      
      setData(result);
      setState('success');
      setOptimisticData(null); // Clear optimistic update
      
      return result;
      
    } catch (err) {
      if (err.name === 'AbortError') {
        setState('cancelled');
      } else {
        setState('error');
        setError(err);
        
        // Revert optimistic update
        if (options.optimistic) {
          setOptimisticData(null);
        }
        
        // Auto-retry logic
        if (options.autoRetry && retryCount < options.maxRetries) {
          return retry(retryCount + 1);
        }
      }
      throw err;
    }
  }, [submitFn, options]);
  
  // Cancel function
  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  }, []);
  
  return {
    submit,
    cancel,
    retry,
    state,
    error,
    data,
    progress,
    optimisticData
  };
};`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Master Portal Transmission
					</h3>
					<InstructionBox character="Sage adjusts the portal optimization controls.">
						Help Aria demonstrate advanced submission patterns! Enable optimizations, handle failures gracefully, and watch the portal respond to different scenarios.
					</InstructionBox>

					<div className='submission-form advanced'>
						<h4>🌀 Advanced Portal Interface</h4>

						{optimisticUpdate && (
							<div className='optimistic-preview'>
								<h5>✨ Optimistic Update Preview</h5>
								<p>ID: {optimisticUpdate.id}</p>
								<p>Status: {optimisticUpdate.status}</p>
							</div>
						)}

						<form onSubmit={handleAsyncSubmit}>
							<div className='form-field'>
								<label>Transmission Title:</label>
								<input
									type='text'
									value={formData.title}
									onChange={(e) =>
										handleFieldChange(
											'title',
											e.target.value
										)
									}
									placeholder='Name your transmission'
									required
									disabled={isSubmitting}
									className='portal-input'
								/>
							</div>

							<div className='form-field'>
								<label>Portal Message:</label>
								<textarea
									value={formData.content}
									onChange={(e) =>
										handleFieldChange(
											'content',
											e.target.value
										)
									}
									placeholder='Craft your message for the distant servers...'
									rows='4'
									required
									disabled={isSubmitting}
									className='portal-textarea'
								/>
							</div>

							<div className='form-field'>
								<label>Priority Channel:</label>
								<select
									value={formData.priority}
									onChange={(e) =>
										handleFieldChange(
											'priority',
											e.target.value
										)
									}
									disabled={isSubmitting}
									className='portal-select'>
									<option value='low'>🟢 Low Priority</option>
									<option value='medium'>
										🟡 Medium Priority
									</option>
									<option value='high'>
										🟠 High Priority
									</option>
									<option value='urgent'>
										🔴 Urgent Transmission
									</option>
								</select>
							</div>

							<div className='form-field'>
								<label>Target Dimensions:</label>
								<div className='dimension-selector'>
									{[
										'Production',
										'Staging',
										'Development',
									].map((dim) => (
										<label
											key={dim}
											className='dimension-option'>
											<input
												type='checkbox'
												checked={formData.dimensions.includes(
													dim
												)}
												onChange={(e) => {
													const dims = e.target
														.checked
														? [
																...formData.dimensions,
																dim,
														  ]
														: formData.dimensions.filter(
																(d) => d !== dim
														  );
													handleFieldChange(
														'dimensions',
														dims
													);
												}}
												disabled={isSubmitting}
											/>
											<span>{dim}</span>
										</label>
									))}
								</div>
							</div>

							<div className='submission-actions'>
								<button
									type='submit'
									disabled={isSubmitting}
									className='submit-button primary'>
									{isSubmitting
										? '🌀 Portal Active...'
										: '📡 Open Portal'}
								</button>

								{isSubmitting && (
									<button
										type='button'
										onClick={cancelSubmission}
										className='cancel-button'>
										❌ Cancel Transmission
									</button>
								)}

								{feedbackState === 'error' &&
									retryCount < 3 && (
										<button
											type='button'
											onClick={retrySubmission}
											className='retry-button'>
											🔄 Retry Transmission
										</button>
									)}
							</div>
						</form>
					</div>
				</div>

				<div className='sage-wisdom'>
					<p className='story-paragraph'>
						Sage watched with satisfaction as Aria grasped the
						advanced patterns and the portal stabilized. "Excellent!
						You're understanding how these patterns work together.
						Optimistic updates make transmissions feel instant,
						retry logic ensures reliability, and cancellation gives
						users control!"
					</p>

					<p className='story-paragraph'>
						"Every pattern serves a purpose," Sage explained.
						"Optimistic UI from state management principles,
						AbortController from modern JavaScript, retry logic with
						exponential backoff from distributed systems. It's all
						connected."
					</p>

					<p className='story-paragraph'>
						Binary's displays lit up with improved metrics: "Retry
						success rate: 89%! User abandonment: down to 12%!
						Perceived performance: 3x faster with optimistic
						updates!"
					</p>
				</div>

				<div className='advanced-patterns'>
					<h3>Portal Transmission Patterns</h3>
					<div className='pattern-grid'>
						<div className='pattern-card'>
							<h4>🎯 Optimistic Updates</h4>
							<pre className='mini-code'>{`// Show success immediately
setOptimisticData(formData);

// Revert on error
catch (error) {
  setOptimisticData(null);
  showError(error);
}`}</pre>
						</div>
						<div className='pattern-card'>
							<h4>🔄 Smart Retry</h4>
							<pre className='mini-code'>{`// Exponential backoff
const delay = Math.min(
  baseDelay * Math.pow(2, attempt),
  maxDelay
);

await sleep(delay);
return retry();`}</pre>
						</div>
						<div className='pattern-card'>
							<h4>❌ Cancellation</h4>
							<pre className='mini-code'>{`// User-controlled abort
const controller = new AbortController();

fetch(url, {
  signal: controller.signal
});

// Cancel on demand
controller.abort();`}</pre>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "The Portal Master's Advanced Wisdom:",
						content:
							'Advanced form submission is about managing the entire lifecycle of data transmission. Implement loading states to show progress through each phase. Use optimistic updates to make the UI feel instant while the server processes. Add retry logic with exponential backoff for resilience. Provide cancellation options for user control. Track metrics to understand failure patterns. Most importantly, treat every submission as a critical user journey - guide them through success and help them recover from failure. Master these patterns, and your forms become reliable portals between client and server realms.',
					}}
					reflectionQuestions={[
						'How do optimistic updates improve perceived performance in form submissions?',
						'Why is giving users the ability to cancel submissions important for user experience?',
						"What patterns from Aria's entire journey came together in this advanced submission system?",
					]}
					journalEntry={{
						title: "Aria's Journal - Day 20 (Afternoon)",
						content:
							"Portal transmission mastery achieved! Sage taught me how to combine everything: async/await patterns, loading states, error boundaries, and even optimistic UI. The key insight was treating form submission as a journey with clear phases. Binary tracked 89% retry success rate after Sage showed me exponential backoff patterns. The AbortController pattern for cancellation was particularly fascinating - it gives users control over their destiny. Sage mentioned one final challenge awaits in the Grand Synthesis Chamber...",
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
