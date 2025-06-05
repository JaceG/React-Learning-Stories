import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter1() {
  const [echoCount, setEchoCount] = useState(0);
  const [recentSignals, setRecentSignals] = useState([]);

  const sendSignal = (signalType) => {
    setEchoCount(echoCount + 1);
    const newSignal = {
      id: Date.now(),
      type: signalType,
      timestamp: new Date().toLocaleTimeString()
    };
    setRecentSignals([newSignal, ...recentSignals.slice(0, 4)]);
    
    // Create visual echo effect
    const echoWave = document.createElement('div');
    echoWave.className = 'echo-wave';
    echoWave.style.width = '20px';
    echoWave.style.height = '20px';
    const tower = document.querySelector('.echo-tower');
    if (tower) {
      tower.appendChild(echoWave);
      setTimeout(() => echoWave.remove(), 2000);
    }
  };

  const resetEchoes = () => {
    setEchoCount(0);
    setRecentSignals([]);
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 1: The Echo Tower</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          High atop the React Kingdom's tallest spire stood the Echo Tower, where sound signals 
          traveled upward against the natural flow of props. Here, Echo Keeper Callback awaited 
          you, her robes shimmering with sound waves.
        </p>
        <p className='story-paragraph'>
          "Welcome, traveler," she said, her voice creating ripples in the air. "You've learned 
          how data flows downward like water, but what happens when a child component needs to 
          communicate with its parent? This is where the magic of callbacks begins."
        </p>
        <p className='story-paragraph'>
          She struck a crystal chime, and the sound echoed upward through the tower. "Events in 
          our kingdom create echoes—signals that travel from child to parent through special 
          callback functions passed down as props."
        </p>
      </div>

      <div className="interactive-section">
        <h3>The Signal Chamber</h3>
        <p>Send signals up the tower by clicking the buttons:</p>

        <div className="echo-tower">
          <div className="tower-level parent">
            <h4>Parent Component (Tower Peak)</h4>
            <p>Echo Count: {echoCount}</p>
            <p>Listening for signals...</p>
          </div>

          <div style={{textAlign: 'center', fontSize: '30px', margin: '20px 0'}}>
            ↑
          </div>

          <div className="tower-level">
            <h4>Child Component (Signal Station)</h4>
            <p>Click to send signals upward:</p>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button 
                className="echo-button" 
                onClick={() => sendSignal('Click')}
              >
                Send Click Echo
              </button>
              <button 
                className="echo-button" 
                onClick={() => sendSignal('Hover')}
              >
                Send Hover Echo
              </button>
              <button 
                className="echo-button" 
                onClick={() => sendSignal('Focus')}
              >
                Send Focus Echo
              </button>
              <button 
                className="reset-button"
                onClick={resetEchoes}
                disabled={echoCount === 0}
              >
                Reset Echoes
              </button>
            </div>
          </div>

          {recentSignals.length > 0 && (
            <div style={{marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
              <h5 style={{color: 'white', marginBottom: '10px'}}>Recent Signals:</h5>
              {recentSignals.map(signal => (
                <div key={signal.id} className="sound-signal">
                  {signal.type} at {signal.timestamp}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          "Notice," the Echo Keeper explained, "how the child component doesn't directly modify 
          the parent's state. Instead, it sends a signal—calls a function—that the parent provided. 
          The parent then decides how to respond to this echo."
        </p>
        <p className='story-paragraph'>
          She showed you a diagram of signal paths. "This maintains our one-way data flow principle. 
          Data flows down through props, but events echo up through callbacks. It's like a 
          conversation where parents speak through props and children respond through events."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// Parent component provides the echo chamber
function EchoTower() {
  const [signalCount, setSignalCount] = useState(0);
  const [lastSignal, setLastSignal] = useState('');
  
  // The callback function passed to children
  const handleEcho = (signalType) => {
    console.log(\`Received echo: \${signalType}\`);
    setSignalCount(signalCount + 1);
    setLastSignal(signalType);
  };
  
  return (
    <div>
      <h3>Tower Peak - Signals: {signalCount}</h3>
      <p>Last signal: {lastSignal}</p>
      
      {/* Pass the callback down as a prop */}
      <SignalStation onSignal={handleEcho} />
    </div>
  );
}

// Child component sends echoes upward
function SignalStation({ onSignal }) {
  return (
    <div>
      <h4>Signal Station</h4>
      
      {/* Call the parent's callback with different signals */}
      <button onClick={() => onSignal('click')}>
        Send Click Signal
      </button>
      
      <button onClick={() => onSignal('submit')}>
        Send Submit Signal
      </button>
      
      <input 
        onChange={(e) => onSignal(\`change: \${e.target.value}\`)}
        placeholder="Type to send change signals"
      />
    </div>
  );
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3>Event Handler Patterns</h3>
        <div className="echo-chamber">
          <h4>Common React Events:</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '15px'}}>
            <div style={{padding: '10px', background: 'white', borderRadius: '4px'}}>
              <strong>onClick</strong>
              <p style={{fontSize: '14px', color: '#6c757d', margin: '5px 0'}}>
                Triggered when element is clicked
              </p>
            </div>
            <div style={{padding: '10px', background: 'white', borderRadius: '4px'}}>
              <strong>onChange</strong>
              <p style={{fontSize: '14px', color: '#6c757d', margin: '5px 0'}}>
                Fired when input value changes
              </p>
            </div>
            <div style={{padding: '10px', background: 'white', borderRadius: '4px'}}>
              <strong>onSubmit</strong>
              <p style={{fontSize: '14px', color: '#6c757d', margin: '5px 0'}}>
                Form submission event
              </p>
            </div>
            <div style={{padding: '10px', background: 'white', borderRadius: '4px'}}>
              <strong>onMouseEnter/Leave</strong>
              <p style={{fontSize: '14px', color: '#6c757d', margin: '5px 0'}}>
                Mouse hover events
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Event Handling Lesson:</h3>
        <p>
          Events in React allow child components to communicate with their parents through callback functions passed down 
          as props. When children need to send information upward, they call these callbacks, creating echoes that travel 
          against the natural downward flow of props. This pattern maintains React's unidirectional data flow principle 
          while enabling interactive component relationships throughout the application.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          Why can't child components directly modify parent state?
        </p>
        <p className='story-paragraph'>
          How do callbacks maintain the one-way data flow principle?
        </p>
        <p className='story-paragraph'>
          What types of information might you send through event callbacks?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter1;