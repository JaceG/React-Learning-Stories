import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
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
		resetPortal
	} = useOutletContext();

	const [advancedForm, setAdvancedForm] = useState({
		action: 'create',
		resource: 'post',
		data: {
			title: '',
			body: '',
			userId: 1
		}
	});

	const [retryConfig, setRetryConfig] = useState({
		maxRetries: 3,
		retryDelay: 1000,
		backoffMultiplier: 2
	});

	const [queuedSubmissions, setQueuedSubmissions] = useState([]);
	const [isOnline, setIsOnline] = useState(true);

	// Simulate network status
	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
			addLog('Network connection restored', 'success');
			processQueue();
		};

		const handleOffline = () => {
			setIsOnline(false);
			addLog('Network connection lost', 'warning');
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	const processQueue = async () => {
		if (queuedSubmissions.length === 0) return;

		addLog(`Processing ${queuedSubmissions.length} queued submissions`, 'info');
		
		for (const submission of queuedSubmissions) {
			try {
				await submitWithRetry(submission);
			} catch (error) {
				addLog(`Failed to process queued submission: ${error.message}`, 'error');
			}
		}
		
		setQueuedSubmissions([]);
	};

	const submitWithRetry = async (data, attempt = 1) => {
		try {
			addLog(`Submission attempt ${attempt}`, 'info');
			
			// Simulate API call with potential failure
			const response = await mockAPICall(data);
			
			completeSubmission(response);
			return response;
			
		} catch (error) {
			if (attempt < retryConfig.maxRetries) {
				const delay = retryConfig.retryDelay * Math.pow(retryConfig.backoffMultiplier, attempt - 1);
				addLog(`Retrying in ${delay}ms...`, 'warning');
				
				await new Promise(resolve => setTimeout(resolve, delay));
				return submitWithRetry(data, attempt + 1);
			}
			
			throw error;
		}
	};

	const mockAPICall = async (data) => {
		// Simulate various API scenarios
		const scenarios = ['success', 'timeout', 'server_error', 'rate_limit'];
		const scenario = Math.random() > 0.6 ? scenarios[0] : 
			scenarios[Math.floor(Math.random() * 3) + 1];

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				switch (scenario) {
					case 'success':
						resolve({
							id: Date.now(),
							...data,
							status: 'created',
							timestamp: new Date().toISOString()
						});
						break;
					case 'timeout':
						reject(new Error('Request timeout'));
						break;
					case 'server_error':
						reject(new Error('500 Internal Server Error'));
						break;
					case 'rate_limit':
						reject(new Error('429 Too Many Requests'));
						break;
				}
			}, 1500);
		});
	};

	const handleOptimizedSubmit = async (e) => {
		e.preventDefault();

		// Optimistic UI Update
		if (optimizations.optimisticUI) {
			addLog('Optimistic update applied', 'info');
			// Show success immediately
			completeSubmission({ ...advancedForm.data, id: 'temp-' + Date.now() });
		}

		// Background Sync
		if (optimizations.backgroundSync && !isOnline) {
			const submission = {
				...advancedForm,
				queuedAt: Date.now()
			};
			setQueuedSubmissions([...queuedSubmissions, submission]);
			addLog('Submission queued for background sync', 'info');
			return;
		}

		try {
			await submitWithRetry(advancedForm);
		} catch (error) {
			handleError(error.message);
			
			if (optimizations.optimisticUI) {
				addLog('Rolling back optimistic update', 'warning');
				resetPortal();
			}
		}
	};

	const updateFormField = (path, value) => {
		if (path.includes('.')) {
			const [parent, child] = path.split('.');
			setAdvancedForm({
				...advancedForm,
				[parent]: {
					...advancedForm[parent],
					[child]: value
				}
			});
		} else {
			setAdvancedForm({
				...advancedForm,
				[path]: value
			});
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: Master Portal Techniques
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Sage had mastered the basics, but the ancient texts revealed 
					advanced techniques: retry mechanisms for unstable portals, 
					optimistic transmissions that assumed success, and background 
					synchronization for offline resilience. These techniques would 
					make the portal system truly robust.
				</p>

				{errorState && (
					<div className='error-dimension'>
						<h3>Error Dimension</h3>
						<p>Portal disruption detected: {errorState}</p>
						<div className='retry-mechanism'>
							<button className='retry-button' onClick={retrySubmission}>
								Retry Transmission (Attempt #{retryCount + 1})
							</button>
							<span>Max retries: {retryConfig.maxRetries}</span>
						</div>
					</div>
				)}

				{responseData && (
					<div className='success-realm'>
						<h3>Success Realm</h3>
						<div className='response-preview'>
							{JSON.stringify(responseData, null, 2)}
						</div>
					</div>
				)}

				<div className='optimization-panel'>
					<h3>Portal Optimizations</h3>
					<div className='optimization-options'>
						<div 
							className={`optimization-toggle ${optimizations.debounce ? 'active' : ''}`}
							onClick={() => toggleOptimization('debounce')}>
							<h4>Debounce</h4>
							<p>Delay submission</p>
						</div>
						<div 
							className={`optimization-toggle ${optimizations.throttle ? 'active' : ''}`}
							onClick={() => toggleOptimization('throttle')}>
							<h4>Throttle</h4>
							<p>Limit frequency</p>
						</div>
						<div 
							className={`optimization-toggle ${optimizations.optimisticUI ? 'active' : ''}`}
							onClick={() => toggleOptimization('optimisticUI')}>
							<h4>Optimistic UI</h4>
							<p>Assume success</p>
						</div>
						<div 
							className={`optimization-toggle ${optimizations.backgroundSync ? 'active' : ''}`}
							onClick={() => toggleOptimization('backgroundSync')}>
							<h4>Background Sync</h4>
							<p>Queue offline</p>
						</div>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Master's Portal Control
				</h3>

				<div className='submission-form'>
					<h4>Advanced Submission Techniques</h4>
					
					<form onSubmit={handleOptimizedSubmit}>
						<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
							<div className='form-field' style={{ flex: 1 }}>
								<label>Action:</label>
								<select
									value={advancedForm.action}
									onChange={(e) => updateFormField('action', e.target.value)}>
									<option value='create'>Create</option>
									<option value='update'>Update</option>
									<option value='delete'>Delete</option>
								</select>
							</div>
							
							<div className='form-field' style={{ flex: 1 }}>
								<label>Resource:</label>
								<select
									value={advancedForm.resource}
									onChange={(e) => updateFormField('resource', e.target.value)}>
									<option value='post'>Post</option>
									<option value='comment'>Comment</option>
									<option value='user'>User</option>
								</select>
							</div>
						</div>

						<div className='form-field'>
							<label>Title:</label>
							<input
								type='text'
								value={advancedForm.data.title}
								onChange={(e) => updateFormField('data.title', e.target.value)}
								placeholder='Enter title'
								required
							/>
						</div>

						<div className='form-field'>
							<label>Body:</label>
							<textarea
								value={advancedForm.data.body}
								onChange={(e) => updateFormField('data.body', e.target.value)}
								placeholder='Enter content'
								rows='3'
								required
							/>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
							<button type='submit'>
								Execute Advanced Submission
							</button>
							<span style={{ 
								padding: '0.5rem 1rem', 
								background: isOnline ? '#2ecc71' : '#e74c3c',
								color: 'white',
								borderRadius: '4px'
							}}>
								{isOnline ? '🟢 Online' : '🔴 Offline'}
							</span>
						</div>
					</form>

					{queuedSubmissions.length > 0 && (
						<div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(243, 156, 18, 0.1)', borderRadius: '8px' }}>
							<h5>📦 Queued Submissions: {queuedSubmissions.length}</h5>
							<p>Will process when connection is restored</p>
						</div>
					)}
				</div>

				<div className='submission-log'>
					<h4>Portal Activity Log</h4>
					{submissionLog.map((entry, index) => (
						<div key={index} className={`log-entry ${entry.type}`}>
							[{entry.timestamp}] {entry.message}
						</div>
					))}
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Advanced Submission Patterns

// 1. Retry with Exponential Backoff
async function submitWithRetry(data, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    backoffMultiplier = 2
  } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
      
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = initialDelay * Math.pow(backoffMultiplier, attempt - 1);
      console.log(\`Retry \${attempt} after \${delay}ms\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 2. Optimistic UI Updates
function useOptimisticSubmit() {
  const [items, setItems] = useState([]);
  
  const submitOptimistically = async (newItem) => {
    // Immediately update UI
    const tempId = 'temp-' + Date.now();
    const optimisticItem = { ...newItem, id: tempId, pending: true };
    setItems(prev => [...prev, optimisticItem]);
    
    try {
      const savedItem = await api.createItem(newItem);
      // Replace temp item with real one
      setItems(prev => prev.map(item => 
        item.id === tempId ? savedItem : item
      ));
    } catch (error) {
      // Rollback on failure
      setItems(prev => prev.filter(item => item.id !== tempId));
      throw error;
    }
  };
  
  return { items, submitOptimistically };
}

// 3. Background Sync for Offline Support
class OfflineQueue {
  constructor() {
    this.queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    
    window.addEventListener('online', () => this.processQueue());
  }
  
  add(request) {
    this.queue.push({
      ...request,
      timestamp: Date.now()
    });
    this.persist();
  }
  
  async processQueue() {
    while (this.queue.length > 0) {
      const request = this.queue[0];
      
      try {
        await this.submit(request);
        this.queue.shift();
        this.persist();
      } catch (error) {
        console.error('Failed to process queued request:', error);
        break;
      }
    }
  }
  
  persist() {
    localStorage.setItem('offlineQueue', JSON.stringify(this.queue));
  }
}

// 4. Request Deduplication
const pendingRequests = new Map();

async function deduplicatedSubmit(key, submitFn) {
  // If request already pending, return existing promise
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }
  
  // Create new request
  const promise = submitFn()
    .finally(() => pendingRequests.delete(key));
  
  pendingRequests.set(key, promise);
  return promise;
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Portal Master's Lesson:</h3>
				<p>
					Master-level form submission goes beyond basic async handling. 
					Implement retry mechanisms with exponential backoff to handle 
					temporary failures. Use optimistic UI updates to make your app 
					feel lightning-fast while maintaining data integrity. Queue 
					submissions during offline periods for true resilience. These 
					advanced patterns transform form submission from a simple data 
					transfer into a robust, user-friendly system that handles all 
					edge cases gracefully. Remember: the best portal is one that 
					users never notice is there.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do advanced patterns like retry mechanisms and optimistic 
					updates improve the reliability of form submissions?
				</p>
				<p>
					What benefits does offline queue functionality provide for 
					users in unreliable network conditions?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;