import React, { useState, useReducer } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter3() {
  // Multiple related states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Example of state that should be combined
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true
    }
  });

  // Derived state example
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const fullName = `${firstName} ${lastName}`.trim(); // Derived, not stored

  const simulateDataFetch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() > 0.3) {
        setData({ message: "Spell data successfully retrieved!", power: Math.floor(Math.random() * 100) });
      } else {
        throw new Error("The ancient servers are not responding!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 3: State Architecture Mastery</h2>

        <div className='story-section'>
          <p className='story-paragraph'>
            On the final day of useState training, Master Hooksworth gathered his apprentices in the 
            Great Hall. "You've learned individual spells," he began, "but true mastery comes from 
            understanding <strong>when and how to structure your state</strong>."
          </p>

          <p className='story-paragraph'>
            He waved his staff, and glowing diagrams appeared in the air. "First principle: 
            <strong>Group related state</strong>. If values change together, they belong together." 
            The diagrams morphed to show state organization patterns.
          </p>

          <div className='code-example'>
            <pre>{`// ❌ Separate states that change together:
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

// ✅ Better: Group related state:
const [fetchState, setFetchState] = useState({
  isLoading: false,
  error: null,
  data: null
});

// ✅ Or consider useReducer for complex state logic`}</pre>
          </div>

          <p className='story-paragraph'>
            "Second principle," he continued, "<strong>Don't sync state</strong>. If you can calculate 
            something from existing state, calculate it during render instead of storing it."
          </p>
        </div>

        <div className='interactive-section'>
          <h3 className='section-title'>State Architecture Laboratory</h3>
          <p>Explore different state organization patterns and their effects!</p>

          <div className='spell-workshop'>
            <div className='pattern-showcase'>
              <span className='pattern-badge'>Multiple States</span>
              <h4>Loading State Pattern</h4>
              
              <button className='spell-button' onClick={simulateDataFetch} disabled={isLoading}>
                {isLoading ? 'Fetching...' : 'Fetch Spell Data'}
              </button>

              <div className='state-visualizer' style={{marginTop: '20px'}}>
                <div className={`state-item ${isLoading ? 'active' : ''}`}>
                  <h5>Loading</h5>
                  <div className='state-orb'>{isLoading ? '⏳' : '✓'}</div>
                </div>
                <div className={`state-item ${error ? 'active' : ''}`}>
                  <h5>Error</h5>
                  <div className='state-orb' style={{background: error ? '#e74c3c' : '#95a5a6'}}>
                    {error ? '❌' : '—'}
                  </div>
                </div>
                <div className={`state-item ${data ? 'active' : ''}`}>
                  <h5>Data</h5>
                  <div className='state-orb' style={{background: data ? '#00b894' : '#95a5a6'}}>
                    {data ? '📊' : '—'}
                  </div>
                </div>
              </div>

              {error && (
                <div className='spell-result' style={{background: '#ffe5e5', borderColor: '#e74c3c', marginTop: '15px'}}>
                  Error: {error}
                </div>
              )}

              {data && (
                <div className='spell-result' style={{marginTop: '15px'}}>
                  {data.message} (Power: {data.power})
                </div>
              )}
            </div>

            <div className='pattern-showcase' style={{marginTop: '20px'}}>
              <span className='pattern-badge'>Derived State</span>
              <h4>Calculate, Don't Sync</h4>
              
              <div style={{display: 'grid', gap: '10px'}}>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '2px solid #6c5ce7'
                  }}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '2px solid #6c5ce7'
                  }}
                />
              </div>

              <div className='spell-result' style={{marginTop: '15px'}}>
                Full Name (Derived): {fullName || 'Enter your name above'}
              </div>

              <p style={{fontSize: '14px', color: '#666', marginTop: '10px'}}>
                Notice: fullName is calculated from firstName and lastName, not stored separately!
              </p>
            </div>

            <button 
              className='reset-button' 
              onClick={() => {
                setIsLoading(false);
                setError(null);
                setData(null);
                setFirstName('');
                setLastName('');
              }}
              style={{marginTop: '20px'}}
            >
              Reset All Examples
            </button>
          </div>
        </div>

        <div className='pattern-showcase'>
          <span className='pattern-badge'>Best Practices</span>
          <h4>State Organization Principles</h4>
          <ul style={{textAlign: 'left', lineHeight: '1.8'}}>
            <li>📦 Group related state that changes together</li>
            <li>🧮 Calculate derived values during render</li>
            <li>🎯 Keep state as local as possible</li>
            <li>🔄 Consider useReducer for complex state logic</li>
            <li>🚫 Avoid duplicate state that can get out of sync</li>
          </ul>
        </div>

        <div className='lesson-insight'>
          <h3>The State Architecture Lesson:</h3>
          <p>
            Effective state management is about more than just useState calls. It's about organizing 
            your state thoughtfully. Group related values, avoid redundant state by calculating derived 
            values, and keep state as close to where it's used as possible. When state logic becomes 
            complex with multiple sub-values updating together, consider using useReducer instead. 
            Good state architecture makes your components more predictable and easier to maintain.
          </p>
        </div>

        <div className='reflection-section'>
          <h3>Reflect on the Story</h3>
          <p>
            How does grouping related state make your components easier to understand?
          </p>
          <p>
            Why is derived state better than syncing multiple state values?
          </p>
          <p>
            When would you choose useReducer over multiple useState calls?
          </p>
        </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter3;