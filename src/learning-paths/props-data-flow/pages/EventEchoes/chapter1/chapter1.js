import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	const [echoCount, setEchoCount] = useState(0);
	const [recentSignals, setRecentSignals] = useState([]);

	const sendSignal = (signalType) => {
		setEchoCount(echoCount + 1);
		const newSignal = {
			id: Date.now(),
			type: signalType,
			timestamp: new Date().toLocaleTimeString(),
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

				<div className='chapter-bridge'>
					<p>
						The entrance to the Echo Caves revealed itself as a
						massive archway carved into the mountainside. Strange
						sounds emanated from within - clicks, chimes, and
						whispers that seemed to defy gravity, traveling upward
						through the rock itself.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						Inside the first cavern, Aria found a figure draped in
						robes that shimmered with sound waves. The woman stood
						beside a crystalline formation that pulsed with each
						echo that passed through it.
					</p>
					<p className='story-paragraph'>
						"Welcome, Aria," the figure said, her voice creating
						visible ripples in the air. "I am
						<strong>Echo Keeper Callback</strong>, guardian of
						upward communication. Master Destructo sent word of your
						arrival."
					</p>
					<p className='story-paragraph'>
						Binary chirped excitedly, the sound bouncing off the
						cave walls in fascinating patterns.
					</p>
					<p className='story-paragraph'>
						"Your companion demonstrates it perfectly!" Callback
						smiled. "You've mastered how data flows downward through
						props, but what happens when a child component needs to
						speak to its parent?"
					</p>
					<p className='story-paragraph'>
						She struck a crystal chime, and Aria watched in
						amazement as the sound traveled upward, defying the
						natural downward flow she'd grown accustomed to.
					</p>
					<p className='story-paragraph'>
						"This is the secret of callbacks," Callback explained.
						"Parents pass down special functions as props - like
						giving children magical conch shells. When children need
						to send messages upward, they simply call these
						functions, creating echoes that reach their parents'
						ears."
					</p>
				</div>

				<div className='interactive-section'>
					<h3>The Signal Chamber</h3>
					<p>Send signals up the tower by clicking the buttons:</p>

					<div className='echo-tower'>
						<div className='tower-level parent'>
							<h4>Parent Component (Tower Peak)</h4>
							<p>Echo Count: {echoCount}</p>
							<p>Listening for signals...</p>
						</div>

						<div
							style={{
								textAlign: 'center',
								fontSize: '30px',
								margin: '20px 0',
							}}>
							↑
						</div>

						<div className='tower-level'>
							<h4>Child Component (Signal Station)</h4>
							<p>Click to send signals upward:</p>
							<div
								style={{
									display: 'flex',
									gap: '10px',
									justifyContent: 'center',
									flexWrap: 'wrap',
								}}>
								<button
									className='echo-button'
									onClick={() => sendSignal('Click')}>
									Send Click Echo
								</button>
								<button
									className='echo-button'
									onClick={() => sendSignal('Hover')}>
									Send Hover Echo
								</button>
								<button
									className='echo-button'
									onClick={() => sendSignal('Focus')}>
									Send Focus Echo
								</button>
								<button
									className='reset-button'
									onClick={resetEchoes}
									disabled={echoCount === 0}>
									Reset Echoes
								</button>
							</div>
						</div>

						{recentSignals.length > 0 && (
							<div
								style={{
									marginTop: '20px',
									padding: '15px',
									background: 'rgba(255,255,255,0.1)',
									borderRadius: '8px',
								}}>
								<h5
									style={{
										color: 'white',
										marginBottom: '10px',
									}}>
									Recent Signals:
								</h5>
								{recentSignals.map((signal) => (
									<div
										key={signal.id}
										className='sound-signal'>
										{signal.type} at {signal.timestamp}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Fascinating!" Aria observed. "The child component
						doesn't directly change the parent's state. It just...
						sends a signal?"
					</p>
					<p className='story-paragraph'>
						"Precisely!" Callback's eyes gleamed. "The child calls
						the function the parent provided, and the parent decides
						how to respond. This maintains the sacred one-way data
						flow."
					</p>
					<p className='story-paragraph'>
						She traced glowing patterns in the air, showing signal
						paths. "Think of it as a conversation across
						generations. Parents speak downward through props:
						'Here's your allowance, here's your task.' Children
						respond upward through callbacks: 'Task complete! Need
						more resources!'"
					</p>
					<p className='story-paragraph'>
						Binary projected a diagram showing props flowing down
						and events echoing up, creating a complete communication
						cycle.
					</p>
					<p className='story-paragraph'>
						"Your companion understands the elegance," Callback
						noted. "Data flows down like a waterfall, but events
						echo up like sound in a canyon. Two different forces,
						working in harmony."
					</p>
				</div>

				<div className='code-example'>
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

				<div className='interactive-section'>
					<h3>Event Handler Patterns</h3>
					<div className='echo-chamber'>
						<h4>Common React Events:</h4>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: '15px',
								marginTop: '15px',
							}}>
							<div
								style={{
									padding: '10px',
									background: 'white',
									borderRadius: '4px',
								}}>
								<strong>onClick</strong>
								<p
									style={{
										fontSize: '14px',
										color: '#6c757d',
										margin: '5px 0',
									}}>
									Triggered when element is clicked
								</p>
							</div>
							<div
								style={{
									padding: '10px',
									background: 'white',
									borderRadius: '4px',
								}}>
								<strong>onChange</strong>
								<p
									style={{
										fontSize: '14px',
										color: '#6c757d',
										margin: '5px 0',
									}}>
									Fired when input value changes
								</p>
							</div>
							<div
								style={{
									padding: '10px',
									background: 'white',
									borderRadius: '4px',
								}}>
								<strong>onSubmit</strong>
								<p
									style={{
										fontSize: '14px',
										color: '#6c757d',
										margin: '5px 0',
									}}>
									Form submission event
								</p>
							</div>
							<div
								style={{
									padding: '10px',
									background: 'white',
									borderRadius: '4px',
								}}>
								<strong>onMouseEnter/Leave</strong>
								<p
									style={{
										fontSize: '14px',
										color: '#6c757d',
										margin: '5px 0',
									}}>
									Mouse hover events
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='story-section'>
					<div className='character-intro'>
						<h4>Aria's Journal - Day 15 (Morning)</h4>
						<p>
							The Echo Caves revealed the missing piece of the
							data flow puzzle! While props flow downward like
							water, events echo upward through callbacks. Echo
							Keeper Callback showed me how parents pass functions
							down as props - like handing children magical
							communication devices. When children need to report
							something, they call these functions, sending echoes
							up the component tree. The parent receives the echo
							and decides how to respond, maintaining the one-way
							data flow. It's brilliant - data down, events up,
							creating a complete communication cycle!
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>Echo Keeper's Wisdom:</h3>
					<p>
						Events in React create echoes that travel upward through
						callback functions passed as props. Child components
						call these callbacks to communicate with parents,
						sending information against the natural downward flow.
						This maintains unidirectional data flow - data descends
						through props while events ascend through callbacks.
						Master this pattern to create interactive components
						that communicate without breaking React's core
						principles. Remember: children speak only when given a
						voice (callback) by their parents.
					</p>
				</div>

				<div className='character-intro'>
					<h4>Character Introduction</h4>
					<p>
						<strong>Echo Keeper Callback</strong> - Guardian of the
						Echo Caves and master of upward communication. Her robes
						shimmer with sound waves, and her voice creates visible
						ripples in the air. She teaches the art of callback
						functions, showing how child components can send
						messages to their parents without violating the sacred
						one-way data flow.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does the echo metaphor help you understand callback
						functions?
					</p>
					<p className='story-paragraph'>
						Why is it important that children can't directly modify
						parent state?
					</p>
					<p className='story-paragraph'>
						What parallels do you see between the waterfall (props)
						and echo (events) metaphors?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
