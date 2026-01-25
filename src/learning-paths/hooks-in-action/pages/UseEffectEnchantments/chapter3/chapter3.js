import React, { useState, useEffect } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterThree() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [userId, setUserId] = useState(1);
	const [requestCount, setRequestCount] = useState(0);
	const [cancelledRequests, setCancelledRequests] = useState(0);
	const [activeRequests, setActiveRequests] = useState(0);
	const [eventLog, setEventLog] = useState([]);

	// Simulated API call with random delay
	const fetchUserData = async (id, signal) => {
		const delay = Math.random() * 2000 + 500; // 0.5-2.5 seconds
		await new Promise((resolve) => setTimeout(resolve, delay));

		if (signal.aborted) {
			throw new Error('Request cancelled');
		}

		// Simulate occasional errors
		if (Math.random() < 0.1) {
			throw new Error('Network error occurred');
		}

		return {
			id,
			name: `User ${id}`,
			email: `user${id}@example.com`,
			level: Math.floor(Math.random() * 10) + 1,
			fetchTime: new Date().toLocaleTimeString(),
		};
	};

	useEffect(() => {
		// Create abort controller for cleanup
		const abortController = new AbortController();

		// Async function inside useEffect
		const fetchData = async () => {
			const requestId = Date.now();
			const logEvent = (message, type = 'info') => {
				setEventLog((prev) => [
					...prev.slice(-4),
					{
						id: requestId,
						message,
						time: new Date().toLocaleTimeString(),
						type,
					},
				]);
			};

			try {
				setLoading(true);
				setError(null);
				setRequestCount((prev) => prev + 1);
				setActiveRequests((prev) => prev + 1);
				logEvent(`Started fetching User ${userId}`, 'start');

				const userData = await fetchUserData(
					userId,
					abortController.signal
				);

				// Only update state if request wasn't cancelled
				if (!abortController.signal.aborted) {
					setData(userData);
					setLoading(false);
					setActiveRequests((prev) => prev - 1);
					logEvent(
						`✓ Successfully fetched User ${userId}`,
						'success'
					);
				}
			} catch (err) {
				if (!abortController.signal.aborted) {
					setError(err.message);
					setLoading(false);
					setActiveRequests((prev) => prev - 1);
					logEvent(
						`✗ Error fetching User ${userId}: ${err.message}`,
						'error'
					);
				} else {
					setCancelledRequests((prev) => prev + 1);
					setActiveRequests((prev) => prev - 1);
					logEvent(
						`⚠ Cancelled request for User ${userId}`,
						'cancel'
					);
				}
			}
		};

		fetchData();

		// Cleanup function - cancel request if component unmounts or userId changes
		return () => {
			abortController.abort();
		};
	}, [userId]);

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={3}
					title='Async Enchantments'
					bridge="At the tower's apex, Aria found the Chamber of Asynchronous Arts - a place where multiple timelines converged. Portals opened and closed randomly, each showing data arriving from different moments. The Effect Sage stood at the center, orchestrating the temporal chaos."
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome to the most dangerous chamber in the tower,"
						the Sage intoned, gestures creating ripples through
						time. "Here, we handle asynchronous operations - where
						time becomes non-linear and race conditions threaten
						reality itself."
					</p>

					<p className='story-paragraph'>
						Binary's processors whirred anxiously as it detected
						temporal anomalies everywhere.
					</p>

					<p className='story-paragraph'>
						"The first law of async effects," the Sage continued,
						stabilizing a flickering portal, "is that you cannot
						make the effect function itself async. React expects
						either nothing or a cleanup function, not a Promise
						floating in temporal limbo."
					</p>

					<p className='story-paragraph'>
						"So we create async functions inside the effect?" Aria
						deduced, studying the patterns.
					</p>

					<p className='story-paragraph'>
						"Precisely! Observe the proper incantation:"
					</p>

					<CodeExample
						title='Async Effect Pattern'
						discoveredBy='Transcribed by Aria'
						code={`// ❌ Don't do this - effect can't be async
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);

// ✅ Do this - async function inside effect
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchData();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  loadData();
}, []);`}
					/>

					<p className='story-paragraph'>
						The Sage's form flickered between multiple states. "But
						beware the greatest temporal threat - race conditions!
						When multiple async requests overlap, they create
						competing timelines. The last to arrive isn't always the
						last requested!"
					</p>

					<p className='story-paragraph'>
						"Like messages arriving out of order?" Aria asked,
						watching portals deliver data chaotically.
					</p>

					<p className='story-paragraph'>
						"Exactly! The AbortController spell is your temporal
						guardian," the Sage demonstrated, closing outdated
						portals with precise gestures. "It cancels obsolete
						requests, preventing old data from overwriting new.
						Without it, temporal chaos reigns!"
					</p>

					<CodeExample
						title='Race Condition Protection'
						code={`// Race condition protection with AbortController
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: controller.signal
      });
      const data = await response.json();
      
      // Only update if not aborted
      if (!controller.signal.aborted) {
        setData(data);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message);
      }
    }
  };
  
  fetchData();
  
  // Cleanup - cancel pending request
  return () => controller.abort();
}, [url]);`}
					/>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>Interactive Exercise: The Async Data Portal</h3>
					<InstructionBox character='Watch how async operations are handled with proper cleanup and race condition prevention!'>
						Click different users rapidly to see how AbortController prevents race conditions.
					</InstructionBox>

					<div className='async-workshop'>
						<div className='user-selector'>
							<h4>Select User to Fetch:</h4>
							<div className='user-buttons'>
								{[1, 2, 3, 4, 5].map((id) => (
									<button
										key={id}
										className={`user-button ${
											userId === id ? 'active' : ''
										}`}
										onClick={() => setUserId(id)}>
										User {id}
									</button>
								))}
							</div>
						</div>

						<div className='request-stats'>
							<div className='stat-card'>
								<h5>Total Requests</h5>
								<div className='stat-value'>{requestCount}</div>
							</div>
							<div className='stat-card'>
								<h5>Active Requests</h5>
								<div className='stat-value'>
									{activeRequests}
								</div>
							</div>
							<div className='stat-card'>
								<h5>Cancelled Requests</h5>
								<div className='stat-value'>
									{cancelledRequests}
								</div>
							</div>
						</div>

						<div className='data-display'>
							{loading && (
								<div className='loading-state'>
									<div className='spinner'></div>
									<p>Fetching data from the async realm...</p>
								</div>
							)}

							{error && !loading && (
								<div className='error-state'>
									<p className='error-message'>⚠️ {error}</p>
								</div>
							)}

							{data && !loading && !error && (
								<div className='data-card'>
									<h4>{data.name}</h4>
									<p>Email: {data.email}</p>
									<p>Level: {data.level}</p>
									<p className='fetch-time'>
										Fetched at: {data.fetchTime}
									</p>
								</div>
							)}
						</div>

						<div className='event-log-section'>
							<h4>Request Event Log</h4>
							<div className='event-log'>
								{eventLog.length === 0 ? (
									<p className='log-empty'>
										Click users to see request events...
									</p>
								) : (
									eventLog.map((event, index) => (
										<div
											key={`${event.id}-${index}`}
											className={`log-entry log-${event.type}`}>
											<span className='log-time'>
												{event.time}
											</span>
											<span className='log-message'>
												{event.message}
											</span>
										</div>
									))
								)}
							</div>
						</div>

						<div className='race-condition-demo'>
							<p className='hint'>
								💡 <strong>Try this:</strong> Click User 1, then
								immediately click User 2, then User 3 rapidly!
								Watch the event log above - you'll see that
								earlier requests get cancelled (⚠) when you
								click a new user. This prevents old data from
								overwriting new data (race condition).
							</p>
							<p className='hint' style={{ marginTop: '10px' }}>
								Without AbortController, all requests would
								complete and the last one to finish (not
								necessarily the last one clicked!) would set the
								final data.
							</p>
						</div>

						<div style={{ textAlign: 'center', marginTop: '20px' }}>
							<button
								className='reset-button'
								onClick={() => {
									setRequestCount(0);
									setCancelledRequests(0);
									setActiveRequests(0);
									setEventLog([]);
									setData(null);
									setError(null);
								}}>
								Reset Stats & Log
							</button>
						</div>
					</div>
				</div>

				<div className='pattern-showcase'>
					<span className='pattern-badge'>Best Practice</span>
					<h4>Async Error Handling Pattern</h4>
					<CodeExample
						title='Complete Async Pattern'
						code={`const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  let cancelled = false;
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await api.getData();
      
      if (!cancelled) {
        setData(result);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };
  
  fetchData();
  
  return () => {
    cancelled = true;
  };
}, []);`}
					/>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: 'Async Effect Mastery:',
						content: "Master asynchronous operations by respecting useEffect's constraints. Create async functions inside effects, never make the effect itself async. Defend against race conditions with AbortController or cancellation flags - without them, old requests overwrite new data chaotically. Always check if requests were aborted before updating state, preventing updates to unmounted components. These patterns are essential for data-fetching - they transform temporal chaos into predictable, reliable behavior."
					}}
					reflectionQuestions={[
						'How does the "competing timelines" metaphor help visualize race conditions?',
						'Why does the Sage call AbortController a "temporal guardian"?',
						'What chaos have you experienced from unmanaged async operations?'
					]}
					journalEntry={{
						title: "Aria's Journal - Day 17 (Evening)",
						content: "The Chamber of Asynchronous Arts was mind-bending! The Effect Sage showed me how async operations create non-linear time flows in React. Key insights: Never make the effect itself async (React expects cleanup, not Promises!), always create async functions inside effects. Race conditions are the real danger - when multiple requests overlap, the last to finish overwrites all others, regardless of order! AbortController is our salvation, cancelling obsolete requests before they corrupt our timeline. Without proper cleanup, we risk updating unmounted components - temporal contamination at its worst!"
					}}
					chapterEnding={[
						"As the portals stabilized and temporal chaos subsided, the Effect Sage's form solidified. \"You've mastered the most treacherous aspects of useEffect, Aria. From lifecycle management to dependencies to async operations - you understand the bridge between React's pure world and external chaos.\"",
						"\"It's all about managing time,\" Aria reflected, watching Binary's chronometer finally stabilize. \"Effects exist in their own timeline, and we must respect that separation.\"",
						"\"Wise words from a true Effect Mage,\" the Sage smiled. \"Now, I believe Master Artificer Compose awaits in the Synthesis Workshop. There you'll learn to craft your own hooks - the ultimate expression of React mastery.\"",
						'Aria bowed gratefully. The Temporal Tower had revealed its secrets, but she sensed even greater challenges awaited in custom hook creation. With Binary chirping excitedly, they descended toward their next lesson.'
					]}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
