import React, { useState, useEffect } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter3() {
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
    await new Promise(resolve => setTimeout(resolve, delay));
    
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
      fetchTime: new Date().toLocaleTimeString()
    };
  };

  useEffect(() => {
    // Create abort controller for cleanup
    const abortController = new AbortController();
    
    // Async function inside useEffect
    const fetchData = async () => {
      const requestId = Date.now();
      const logEvent = (message, type = 'info') => {
        setEventLog(prev => [...prev.slice(-4), {
          id: requestId,
          message,
          time: new Date().toLocaleTimeString(),
          type
        }]);
      };

      try {
        setLoading(true);
        setError(null);
        setRequestCount(prev => prev + 1);
        setActiveRequests(prev => prev + 1);
        logEvent(`Started fetching User ${userId}`, 'start');
        
        const userData = await fetchUserData(userId, abortController.signal);
        
        // Only update state if request wasn't cancelled
        if (!abortController.signal.aborted) {
          setData(userData);
          setLoading(false);
          setActiveRequests(prev => prev - 1);
          logEvent(`✓ Successfully fetched User ${userId}`, 'success');
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err.message);
          setLoading(false);
          setActiveRequests(prev => prev - 1);
          logEvent(`✗ Error fetching User ${userId}: ${err.message}`, 'error');
        } else {
          setCancelledRequests(prev => prev + 1);
          setActiveRequests(prev => prev - 1);
          logEvent(`⚠ Cancelled request for User ${userId}`, 'cancel');
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
        <h2 className='chapter-title'>Chapter 3: Async Enchantments</h2>

        <div className='story-section'>
          <p className='story-paragraph'>
            Master Effectus led his students to the Chamber of Asynchronous Arts, where time 
            seemed to flow differently. Mystical portals flickered in and out of existence, 
            representing data traveling from distant realms.
          </p>

          <p className='story-paragraph'>
            "Async operations in useEffect require special care," Master Effectus began, his 
            staff glowing with anticipation. "You cannot make the effect function itself async, 
            for that would return a Promise, and React expects either nothing or a cleanup function."
          </p>

          <p className='story-paragraph'>
            He waved his hand, revealing the correct incantation pattern:
          </p>

          <div className='code-example'>
            <pre>{`// ❌ Don't do this - effect can't be async
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
}, []);`}</pre>
          </div>

          <p className='story-paragraph'>
            "But the greatest danger," Master Effectus warned, his voice grave, "is the race 
            condition. When multiple async spells overlap, chaos ensues! Always use the 
            AbortController enchantment to cancel outdated requests."
          </p>

          <div className='code-example'>
            <pre>{`// Race condition protection with AbortController
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
}, [url]);`}</pre>
          </div>
        </div>

        <div className='interactive-section'>
          <h3 className='section-title'>The Async Data Portal</h3>
          <p>Watch how async operations are handled with proper cleanup and race condition prevention:</p>

          <div className='async-workshop'>
            <div className='user-selector'>
              <h4>Select User to Fetch:</h4>
              <div className='user-buttons'>
                {[1, 2, 3, 4, 5].map(id => (
                  <button
                    key={id}
                    className={`user-button ${userId === id ? 'active' : ''}`}
                    onClick={() => setUserId(id)}
                  >
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
                <div className='stat-value'>{activeRequests}</div>
              </div>
              <div className='stat-card'>
                <h5>Cancelled Requests</h5>
                <div className='stat-value'>{cancelledRequests}</div>
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
                  <p className='fetch-time'>Fetched at: {data.fetchTime}</p>
                </div>
              )}
            </div>

            <div className='event-log-section'>
              <h4>Request Event Log</h4>
              <div className='event-log'>
                {eventLog.length === 0 ? (
                  <p className='log-empty'>Click users to see request events...</p>
                ) : (
                  eventLog.map((event, index) => (
                    <div 
                      key={`${event.id}-${index}`} 
                      className={`log-entry log-${event.type}`}
                    >
                      <span className='log-time'>{event.time}</span>
                      <span className='log-message'>{event.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className='race-condition-demo'>
              <p className='hint'>
                💡 <strong>Try this:</strong> Click User 1, then immediately click User 2, then User 3 rapidly! 
                Watch the event log above - you'll see that earlier requests get cancelled (⚠) when you click 
                a new user. This prevents old data from overwriting new data (race condition).
              </p>
              <p className='hint' style={{marginTop: '10px'}}>
                Without AbortController, all requests would complete and the last one to finish (not necessarily 
                the last one clicked!) would set the final data.
              </p>
            </div>

            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <button 
                className='reset-button'
                onClick={() => {
                  setRequestCount(0);
                  setCancelledRequests(0);
                  setActiveRequests(0);
                  setEventLog([]);
                  setData(null);
                  setError(null);
                }}
              >
                Reset Stats & Log
              </button>
            </div>
          </div>
        </div>

        <div className='pattern-showcase'>
          <span className='pattern-badge'>Best Practice</span>
          <h4>Async Error Handling Pattern</h4>
          <div className='code-example'>
            <pre>{`const [data, setData] = useState(null);
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
}, []);`}</pre>
          </div>
        </div>

        <div className='lesson-insight'>
          <h3>The Async useEffect Lesson:</h3>
          <p>
            Asynchronous operations in useEffect require careful handling to avoid common pitfalls. 
            Always create an async function inside the effect rather than making the effect itself 
            async. Use AbortController or a cancelled flag to prevent race conditions when requests 
            overlap. Proper cleanup ensures your app doesn't update state after a component unmounts, 
            preventing memory leaks and React warnings. These patterns become essential when building 
            data-driven applications that fetch from APIs.
          </p>
        </div>

        <div className='reflection-section'>
          <h3>Reflect on the Story</h3>
          <p>
            Why can't we make the useEffect callback function itself async?
          </p>
          <p>
            How do race conditions occur with multiple async requests, and why is cleanup important?
          </p>
          <p>
            What would happen if we didn't check for abort/cancellation before updating state?
          </p>
        </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter3;