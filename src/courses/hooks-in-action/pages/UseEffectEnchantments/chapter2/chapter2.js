import React, { useState, useEffect, useRef } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter2() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [seconds, setSeconds] = useState(0);
  
  // Use refs to track effect executions without causing re-renders
  const effectCountsRef = useRef({
    noDepsTrigger: 0,
    emptyDepsTrigger: 0,
    countDepsTrigger: 0,
    nameDepsTrigger: 0,
    multiDepsTrigger: 0
  });
  
  const [effectTriggers, setEffectTriggers] = useState({...effectCountsRef.current});
  
  // Track render count
  const [displayRenderCount, setDisplayRenderCount] = useState(0);
  
  // Only count renders when actual state changes occur
  useEffect(() => {
    setDisplayRenderCount(prev => prev + 1);
  }, [count, name, seconds]);

  // Update displayed counts when dependencies change
  const updateDisplayedCounts = () => {
    setEffectTriggers({...effectCountsRef.current});
  };

  // Effect with empty dependency array - runs ONCE on mount
  useEffect(() => {
    effectCountsRef.current.emptyDepsTrigger += 1;
    updateDisplayedCounts();
  }, []);

  // Effect watching count - runs when count changes
  useEffect(() => {
    effectCountsRef.current.countDepsTrigger += 1;
    effectCountsRef.current.noDepsTrigger += 1; // Simulate no-deps behavior
    updateDisplayedCounts();
  }, [count]);

  // Effect watching name - runs when name changes
  useEffect(() => {
    if (name) {
      effectCountsRef.current.nameDepsTrigger += 1;
    }
    effectCountsRef.current.noDepsTrigger += 1; // Simulate no-deps behavior
    updateDisplayedCounts();
  }, [name]);

  // Effect watching multiple dependencies
  useEffect(() => {
    if (count > 0 || name) {
      effectCountsRef.current.multiDepsTrigger += 1;
    }
    updateDisplayedCounts();
  }, [count, name]);

  // Timer that increments every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => {
        // Update no-deps counter each second to simulate constant re-renders
        effectCountsRef.current.noDepsTrigger += 1;
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 2: Dependencies and Watchers</h2>

        <div className='story-section'>
          <p className='story-paragraph'>
            Master Effectus gathered his students around a mystical crystal ball that showed 
            swirling patterns of dependencies. "Now that you understand the basics of useEffect, 
            let's explore its most crucial aspect: the dependency array."
          </p>

          <p className='story-paragraph'>
            He tapped the crystal ball three times. "The dependency array is like a watchlist 
            for your effects. It tells React, 'Only run this effect when these specific values 
            change.' Without it, your effects could run wild, consuming resources unnecessarily."
          </p>

          <p className='story-paragraph'>
            "Observe these three sacred patterns," Master Effectus continued, as three glowing 
            orbs appeared before the students:
          </p>

          <div className='code-example'>
            <pre>{`// Pattern 1: No dependency array - runs after EVERY render
useEffect(() => {
  console.log('I run after every render!');
});

// Pattern 2: Empty array - runs ONCE on mount
useEffect(() => {
  console.log('I run only once when component mounts!');
}, []);

// Pattern 3: With dependencies - runs when deps change
useEffect(() => {
  console.log('I run when count or name changes!');
}, [count, name]);`}</pre>
          </div>

          <p className='story-paragraph'>
            "But beware!" Master Effectus warned, his eyes glowing with caution. "Missing 
            dependencies can lead to stale closures, and unnecessary dependencies can cause 
            excessive re-renders. The ESLint plugin 'exhaustive-deps' is your guardian spell 
            against these pitfalls."
          </p>
        </div>

        <div className='interactive-section'>
          <h3 className='section-title'>The Dependency Observatory</h3>
          <p>Watch how different dependency arrays affect when effects run:</p>

          <div className='dependency-lab'>
            <div className='control-panel'>
              <div className='control-item'>
                <label>Count:</label>
                <button 
                  className='spell-button' 
                  onClick={() => setCount(c => c + 1)}
                >
                  Increment ({count})
                </button>
              </div>
              
              <div className='control-item'>
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Enter a name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '2px solid #6c5ce7',
                    marginLeft: '10px'
                  }}
                />
              </div>

              <div className='control-item'>
                <label>Timer:</label>
                <span className='timer-display'>{seconds}s</span>
              </div>
            </div>

            <div className='effect-monitors'>
              <h4>Effect Trigger Counts</h4>
              <div style={{marginBottom: '15px', textAlign: 'center'}}>
                <span style={{color: '#666', fontSize: '14px'}}>
                  State changes have triggered <strong>{displayRenderCount}</strong> renders
                </span>
              </div>
              
              <div className='monitor-grid'>
                <div className='monitor-card'>
                  <h5>No Dependencies</h5>
                  <div className='trigger-count'>{effectTriggers.noDepsTrigger}</div>
                  <small>Runs on every render</small>
                </div>

                <div className='monitor-card'>
                  <h5>Empty Array []</h5>
                  <div className='trigger-count'>{effectTriggers.emptyDepsTrigger}</div>
                  <small>Runs once on mount</small>
                </div>

                <div className='monitor-card'>
                  <h5>[count]</h5>
                  <div className='trigger-count'>{effectTriggers.countDepsTrigger}</div>
                  <small>Runs when count changes</small>
                </div>

                <div className='monitor-card'>
                  <h5>[name]</h5>
                  <div className='trigger-count'>{effectTriggers.nameDepsTrigger}</div>
                  <small>Runs when name changes</small>
                </div>

                <div className='monitor-card'>
                  <h5>[count, name]</h5>
                  <div className='trigger-count'>{effectTriggers.multiDepsTrigger}</div>
                  <small>Runs when either changes</small>
                </div>
              </div>
            </div>
            
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <button 
                className='reset-button'
                onClick={() => {
                  setCount(0);
                  setName('');
                  setSeconds(0);
                  setDisplayRenderCount(0);
                  effectCountsRef.current = {
                    noDepsTrigger: 0,
                    emptyDepsTrigger: 0,
                    countDepsTrigger: 0,
                    nameDepsTrigger: 0,
                    multiDepsTrigger: 0
                  };
                  setEffectTriggers({...effectCountsRef.current});
                }}
              >
                Reset All Counters
              </button>
            </div>
          </div>
        </div>

        <div className='pattern-showcase'>
          <span className='pattern-badge'>Common Pitfall</span>
          <h4>Avoiding Dependency Array Mistakes</h4>
          <div className='code-example'>
            <pre>{`// ❌ Missing dependency - causes stale closure
const [count, setCount] = useState(0);
useEffect(() => {
  const timer = setTimeout(() => {
    console.log(count); // Always logs initial value!
  }, 3000);
  return () => clearTimeout(timer);
}, []); // Missing 'count' dependency

// ✅ Correct - includes all dependencies
useEffect(() => {
  const timer = setTimeout(() => {
    console.log(count); // Logs current value
  }, 3000);
  return () => clearTimeout(timer);
}, [count]); // Includes 'count' dependency`}</pre>
          </div>
        </div>

        <div className='lesson-insight'>
          <h3>The Dependencies Lesson:</h3>
          <p>
            The dependency array is your contract with React about when an effect should run. 
            An empty array means "run once," no array means "run always," and a filled array 
            means "run when these change." Understanding dependencies prevents performance issues 
            and bugs. Always include all values from the component scope that your effect uses, 
            and let tools like ESLint's exhaustive-deps rule guide you to write correct effects.
          </p>
        </div>

        <div className='reflection-section'>
          <h3>Reflect on the Story</h3>
          <p>
            Why might running an effect on every render cause performance problems?
          </p>
          <p>
            What's the difference between an empty dependency array and no array at all?
          </p>
          <p>
            How can missing dependencies lead to bugs in your application?
          </p>
        </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter2;