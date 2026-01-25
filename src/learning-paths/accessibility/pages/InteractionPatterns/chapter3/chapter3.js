import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const [activeMethod, setActiveMethod] = useState('mouse');
	const [touchGestures, setTouchGestures] = useState({
		tap: false,
		swipe: false,
		pinch: false,
		rotate: false
	});
	const [voiceCommands, setVoiceCommands] = useState([]);
	const [switchControl, setSwitchControl] = useState(false);
	const [universalFeatures, setUniversalFeatures] = useState({
		largeTargets: false,
		clearLabels: false,
		multiModal: false,
		predictable: false,
		forgiving: false
	});
	const [interactionDemo, setInteractionDemo] = useState('button');
	const touchAreaRef = useRef(null);
	
	const { 
		interactionMethods,
		enableInteractionMethod,
		addAnnouncement
	} = useOutletContext();

	const methods = [
		{
			id: 'mouse',
			name: 'Mouse',
			icon: '🖱️',
			description: 'Traditional pointing device',
			users: '85% of desktop users',
			considerations: ['Hover states', 'Click targets', 'Drag interactions']
		},
		{
			id: 'keyboard',
			name: 'Keyboard',
			icon: '⌨️',
			description: 'Keys and shortcuts',
			users: '100% potential reach',
			considerations: ['Tab navigation', 'Shortcuts', 'Focus indicators']
		},
		{
			id: 'touch',
			name: 'Touch',
			icon: '👆',
			description: 'Touchscreen interaction',
			users: '75% of web traffic',
			considerations: ['Touch targets', 'Gestures', 'No hover state']
		},
		{
			id: 'voice',
			name: 'Voice',
			icon: '🎙️',
			description: 'Voice commands',
			users: 'Growing rapidly',
			considerations: ['Clear labels', 'Numbered items', 'Command words']
		},
		{
			id: 'switch',
			name: 'Switch',
			icon: '🔘',
			description: 'Single or dual switches',
			users: 'Motor impairments',
			considerations: ['Scanning', 'Timing', 'Clear structure']
		}
	];

	const universalPrinciples = [
		{
			principle: 'Large Touch Targets',
			minimum: '44x44px (iOS) / 48x48px (Android)',
			reason: 'Accommodates fingers, tremors, and imprecise pointing'
		},
		{
			principle: 'Clear Visual Labels',
			minimum: 'Visible text or universal icons',
			reason: 'Works for voice control and cognitive clarity'
		},
		{
			principle: 'Keyboard Equivalents',
			minimum: 'Every action keyboard accessible',
			reason: 'Universal fallback for all devices'
		},
		{
			principle: 'Predictable Behavior',
			minimum: 'Consistent interactions',
			reason: 'Reduces cognitive load and errors'
		},
		{
			principle: 'Error Forgiveness',
			minimum: 'Undo, confirmation, recovery',
			reason: 'Accommodates mistakes from any input method'
		}
	];

	const componentExamples = [
		{
			id: 'button',
			name: 'Universal Button',
			good: {
				size: '48px minimum',
				label: 'Clear text label',
				keyboard: 'Enter/Space activates',
				touch: 'Tap to activate',
				voice: '"Click [label]"'
			}
		},
		{
			id: 'slider',
			name: 'Accessible Slider',
			good: {
				size: 'Large thumb (48px)',
				label: 'aria-label with value',
				keyboard: 'Arrow keys adjust',
				touch: 'Drag or tap track',
				voice: '"Set [label] to [value]"'
			}
		},
		{
			id: 'menu',
			name: 'Multi-Modal Menu',
			good: {
				size: 'Adequate spacing',
				label: 'Clear item names',
				keyboard: 'Arrow navigation',
				touch: 'Tap to open/select',
				voice: '"Show menu", "Click [item]"'
			}
		},
		{
			id: 'form',
			name: 'Inclusive Form',
			good: {
				size: 'Large input areas',
				label: 'Visible labels',
				keyboard: 'Tab through fields',
				touch: 'Tap to focus',
				voice: '"Go to [field]"'
			}
		}
	];

	// Touch gesture handling
	useEffect(() => {
		if (!touchAreaRef.current || activeMethod !== 'touch') return;

		let startX = 0;
		let startY = 0;

		const handleTouchStart = (e) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
		};

		const handleTouchEnd = (e) => {
			if (!e.changedTouches[0]) return;
			
			const endX = e.changedTouches[0].clientX;
			const endY = e.changedTouches[0].clientY;
			const deltaX = endX - startX;
			const deltaY = endY - startY;
			
			if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
				setTouchGestures(prev => ({ ...prev, tap: true }));
				addAnnouncement('Tap gesture detected');
			} else if (Math.abs(deltaX) > 50) {
				setTouchGestures(prev => ({ ...prev, swipe: true }));
				addAnnouncement(`Swipe ${deltaX > 0 ? 'right' : 'left'} detected`);
			}
		};

		const element = touchAreaRef.current;
		element.addEventListener('touchstart', handleTouchStart);
		element.addEventListener('touchend', handleTouchEnd);

		return () => {
			element.removeEventListener('touchstart', handleTouchStart);
			element.removeEventListener('touchend', handleTouchEnd);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMethod]);

	// Voice command simulation
	const simulateVoiceCommand = (command) => {
		setVoiceCommands(prev => [...prev, { command, time: new Date() }]);
		addAnnouncement(`Voice command: "${command}"`);
		
		// Simulate command execution
		if (command.includes('click') || command.includes('tap')) {
			addAnnouncement('Button activated by voice');
		} else if (command.includes('next')) {
			addAnnouncement('Navigated to next item');
		} else if (command.includes('scroll')) {
			addAnnouncement('Page scrolled');
		}
	};

	// Switch control simulation
	const handleSwitchScan = () => {
		let scanIndex = 0;
		const elements = document.querySelectorAll('.scannable');
		
		const scanInterval = setInterval(() => {
			elements.forEach((el, i) => {
				el.style.outline = i === scanIndex ? '3px solid #FCD34D' : 'none';
			});
			
			scanIndex = (scanIndex + 1) % elements.length;
		}, 1000);
		
		setTimeout(() => clearInterval(scanInterval), 10000);
	};

	const checkUniversalFeature = (feature) => {
		setUniversalFeatures(prev => ({
			...prev,
			[feature]: true
		}));
		
		const implemented = Object.values({
			...universalFeatures,
			[feature]: true
		}).filter(v => v).length;
		
		if (implemented === 5) {
			addAnnouncement('All universal design principles implemented!');
		}
	};

	return (
		<div className='chapter interaction-patterns'>
			<h2 className='chapter-title'>
				Chapter 3: The Interaction Harmony
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Guardians assembled. "Every interaction method should work," they 
					declared in unison. "Mouse, keyboard, touch, voice, switch - design for all."
				</p>
				
				<p className='story-paragraph'>
					Aria created components that responded to all input methods. "It's more 
					work initially, but the code is actually cleaner!"
				</p>

				<p className='story-paragraph'>
					Binary computed efficiency. "Universal design: 5x development time, 10x user 
					reach. Return on investment: 200%!"
				</p>

				<p className='story-paragraph'>
					Debuggora tested each method. "Every interaction path works! Mouse users, 
					keyboard users, touch users - everyone can accomplish their goals."
				</p>

				<p className='story-paragraph'>
					Guardian Keyboard smiled. "This is the harmony we seek - not designing for 
					the average, but embracing the diversity of human interaction."
				</p>

				<p className='story-paragraph'>
					Empress Inclusiva appeared. "You understand now - accessibility isn't about 
					special features for some. It's about flexible design that adapts to all."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Universal Interaction Laboratory</h3>
				
				{/* Interaction Method Selector */}
				<div className='interaction-methods'>
					{methods.map((method) => (
						<div
							key={method.id}
							className={`interaction-method ${activeMethod === method.id ? 'active' : ''}`}
							onClick={() => {
								setActiveMethod(method.id);
								enableInteractionMethod(method.id);
								addAnnouncement(`Switched to ${method.name} interaction mode`);
							}}
						>
							<div className='method-icon'>{method.icon}</div>
							<div className='method-name'>{method.name}</div>
							<div className='method-description'>{method.description}</div>
							<div style={{ fontSize: '0.8em', color: '#FCD34D', marginTop: '5px' }}>
								{method.users}
							</div>
						</div>
					))}
				</div>

				{/* Method-Specific Demos */}
				{activeMethod === 'mouse' && (
					<div style={{ marginTop: '30px' }}>
						<h4>Mouse Interaction Features</h4>
						<div style={{ 
							display: 'grid', 
							gap: '15px',
							marginTop: '20px',
							padding: '20px',
							background: 'rgba(0, 0, 0, 0.3)',
							borderRadius: '10px'
						}}>
							<button
								style={{
									padding: '12px 24px',
									background: 'rgba(52, 152, 219, 0.2)',
									border: '2px solid transparent',
									borderRadius: '8px',
									color: 'white',
									cursor: 'pointer',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => {
									e.target.style.background = 'rgba(52, 152, 219, 0.4)';
									e.target.style.transform = 'scale(1.05)';
								}}
								onMouseLeave={(e) => {
									e.target.style.background = 'rgba(52, 152, 219, 0.2)';
									e.target.style.transform = 'scale(1)';
								}}
							>
								Hover Effect Button
							</button>
							<div>✓ Clear hover states</div>
							<div>✓ Adequate click targets</div>
							<div>✓ Visual feedback on click</div>
						</div>
					</div>
				)}

				{activeMethod === 'touch' && (
					<div style={{ marginTop: '30px' }}>
						<h4>Touch Gesture Recognition</h4>
						<div 
							ref={touchAreaRef}
							style={{
								height: '200px',
								background: 'rgba(147, 51, 234, 0.1)',
								border: '2px dashed rgba(147, 51, 234, 0.3)',
								borderRadius: '10px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: '20px',
								position: 'relative',
								userSelect: 'none'
							}}
						>
							<div style={{ textAlign: 'center' }}>
								<p>Touch area - Try tapping or swiping</p>
								<div style={{ marginTop: '20px' }}>
									{touchGestures.tap && <span style={{ margin: '0 10px' }}>✓ Tap</span>}
									{touchGestures.swipe && <span style={{ margin: '0 10px' }}>✓ Swipe</span>}
								</div>
							</div>
						</div>
						<div style={{ marginTop: '20px' }}>
							<h5>Touch Guidelines:</h5>
							<ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
								<li>Minimum touch target: 48x48px</li>
								<li>Adequate spacing between targets</li>
								<li>No hover-dependent functionality</li>
								<li>Support for common gestures</li>
							</ul>
						</div>
					</div>
				)}

				{activeMethod === 'voice' && (
					<div style={{ marginTop: '30px' }}>
						<h4>Voice Command Simulator</h4>
						<div className='voice-control-sim'>
							<p style={{ marginBottom: '20px' }}>
								Click a command to simulate voice input:
							</p>
							<div className='voice-commands'>
								{[
									'Click submit button',
									'Scroll down',
									'Go to next page',
									'Show menu',
									'Search for shoes',
									'Read article'
								].map((command) => (
									<div
										key={command}
										className='voice-command'
										onClick={() => simulateVoiceCommand(command)}
									>
										<span className='command-text'>"{command}"</span>
										<span className='command-action'>Click to simulate</span>
									</div>
								))}
							</div>
							{voiceCommands.length > 0 && (
								<div style={{ marginTop: '20px' }}>
									<h5>Command History:</h5>
									{voiceCommands.slice(-5).map((cmd, i) => (
										<div key={i} style={{ marginTop: '5px', fontSize: '0.9em' }}>
											{cmd.time.toLocaleTimeString()}: {cmd.command}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				)}

				{activeMethod === 'switch' && (
					<div style={{ marginTop: '30px' }}>
						<h4>Switch Control Scanner</h4>
						<button
							onClick={() => {
								setSwitchControl(true);
								handleSwitchScan();
							}}
							style={{
								padding: '10px 25px',
								background: '#9333EA',
								border: 'none',
								borderRadius: '5px',
								color: 'white',
								cursor: 'pointer',
								marginBottom: '20px'
							}}
						>
							Start Switch Scanning
						</button>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
							{['Home', 'Products', 'About', 'Services', 'Contact', 'Help'].map((item) => (
								<button
									key={item}
									className='scannable'
									style={{
										padding: '20px',
										background: 'rgba(52, 152, 219, 0.1)',
										border: '2px solid rgba(52, 152, 219, 0.3)',
										borderRadius: '8px',
										color: 'white',
										cursor: 'pointer',
										transition: 'outline 0.3s ease'
									}}
								>
									{item}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Universal Design Principles */}
				<div style={{ marginTop: '40px' }}>
					<h3 className='section-title'>Universal Design Principles</h3>
					<div className='universal-principles'>
						{universalPrinciples.map((principle, index) => (
							<div key={index} className='principle-card'>
								<div className='principle-title'>{principle.principle}</div>
								<div style={{ marginTop: '10px', fontSize: '0.9em' }}>
									<strong>Minimum:</strong> {principle.minimum}
								</div>
								<div style={{ marginTop: '5px', fontSize: '0.9em', color: '#bdc3c7' }}>
									<strong>Why:</strong> {principle.reason}
								</div>
								{!universalFeatures[principle.principle.toLowerCase().replace(/\s+/g, '')] && (
									<button
										onClick={() => checkUniversalFeature(
											principle.principle.toLowerCase().replace(/\s+/g, '')
										)}
										style={{
											marginTop: '10px',
											padding: '6px 16px',
											background: 'rgba(147, 51, 234, 0.2)',
											border: '1px solid #9333EA',
											borderRadius: '15px',
											color: 'white',
											cursor: 'pointer',
											fontSize: '0.9em'
										}}
									>
										Implement
									</button>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Component Examples */}
				<div style={{ marginTop: '40px' }}>
					<h3 className='section-title'>Multi-Modal Component Examples</h3>
					<div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
						{componentExamples.map((example) => (
							<button
								key={example.id}
								onClick={() => setInteractionDemo(example.id)}
								style={{
									padding: '8px 16px',
									background: interactionDemo === example.id ? '#3498DB' : 'rgba(52, 152, 219, 0.2)',
									border: '1px solid #3498DB',
									borderRadius: '20px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								{example.name}
							</button>
						))}
					</div>
					
					{componentExamples.filter(ex => ex.id === interactionDemo).map((example) => (
						<div 
							key={example.id}
							style={{
								background: 'rgba(0, 0, 0, 0.3)',
								borderRadius: '10px',
								padding: '25px'
							}}
						>
							<h4 style={{ marginBottom: '20px' }}>{example.name}</h4>
							<div style={{ display: 'grid', gap: '15px' }}>
								{Object.entries(example.good).map(([method, description]) => (
									<div 
										key={method}
										style={{
											display: 'grid',
											gridTemplateColumns: '100px 1fr',
											alignItems: 'center',
											padding: '10px',
											background: 'rgba(52, 152, 219, 0.1)',
											borderRadius: '5px'
										}}
									>
										<strong style={{ color: '#3498DB' }}>
											{method.charAt(0).toUpperCase() + method.slice(1)}:
										</strong>
										<span>{description}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Universal Interaction Patterns</span>
					<span className='discovered-by'>The Guardians' harmony</span>
				</div>
				<pre>{`# Universal Design Implementation
// The Guardians: "Design once, work everywhere!"

# Multi-Modal Button Component
function UniversalButton({ 
  onClick, 
  children, 
  ariaLabel,
  size = 'medium' 
}) {
  const [isPressed, setIsPressed] = useState(false);
  
  // Size mapping for touch targets
  const sizes = {
    small: 40,  // Still meets minimum
    medium: 48, // Recommended
    large: 64   // Comfortable
  };
  
  const handleInteraction = (e) => {
    // Works for all input methods
    e.preventDefault();
    onClick?.(e);
  };
  
  return (
    <button
      onClick={handleInteraction}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsPressed(true);
          handleInteraction(e);
        }
      }}
      onKeyUp={() => setIsPressed(false)}
      aria-label={ariaLabel}
      aria-pressed={isPressed}
      style={{
        minWidth: \`\${sizes[size]}px\`,
        minHeight: \`\${sizes[size]}px\`,
        padding: '12px 24px',
        // Visual feedback for all methods
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.2s ease',
        // Clear focus indicator
        outline: 'none',
        position: 'relative'
      }}
      className="universal-button"
    >
      {children}
    </button>
  );
}

// CSS for focus indicator
.universal-button:focus-visible::after {
  content: '';
  position: absolute;
  inset: -4px;
  border: 2px solid #007bff;
  border-radius: inherit;
}

# Touch-Friendly Interfaces
// Binary: "Mobile = 52.2% of web traffic!"

## Touch Target Guidelines
const TouchTarget = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        // Minimum 48x48px target
        minWidth: '48px',
        minHeight: '48px',
        // Extra padding for easier targeting
        padding: '12px',
        // Visual size can be smaller than touch target
        position: 'relative'
      }}
    >
      <span style={{
        // Visual content
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {children}
      </span>
    </button>
  );
};

## Gesture Support
function GestureArea({ onSwipeLeft, onSwipeRight, children }) {
  const [touchStart, setTouchStart] = useState(null);
  
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };
  
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
    
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    
    // Horizontal swipe detection
    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // Also support mouse for testing
      onMouseDown={(e) => setTouchStart({ x: e.clientX, y: e.clientY })}
      onMouseUp={(e) => {
        if (!touchStart) return;
        const deltaX = e.clientX - touchStart.x;
        if (Math.abs(deltaX) > 50) {
          deltaX > 0 ? onSwipeRight?.() : onSwipeLeft?.();
        }
      }}
    >
      {children}
    </div>
  );
}

# Voice Control Optimization
// Aria: "Clear labels enable voice control!"

## Voice-Friendly Components
function VoiceOptimizedNav() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        {/* Number items for easy voice reference */}
        {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
          <li key={item}>
            <a href={\`/\${item.toLowerCase()}\`}>
              <span className="voice-number" aria-hidden="true">
                {index + 1}.
              </span>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Voice commands work with:
// "Click Home"
// "Click 1" (number reference)
// "Go to Products"

## Form with Voice Labels
<form>
  {/* Use explicit labels for voice */}
  <label>
    <span className="label-text">First name</span>
    <input 
      type="text" 
      name="firstName"
      // Voice: "Click first name"
    />
  </label>
  
  {/* Avoid ambiguous labels */}
  <button type="submit">
    Submit form {/* Not just "Submit" */}
  </button>
</form>

# Switch Control Support
// Debuggora: "Some users navigate with a single button!"

## Switch-Accessible Component
function SwitchNavigable({ items }) {
  const [scanIndex, setScanIndex] = useState(-1);
  const [isScanning, setIsScanning] = useState(false);
  
  useEffect(() => {
    if (!isScanning) return;
    
    const interval = setInterval(() => {
      setScanIndex(prev => (prev + 1) % items.length);
    }, 1500); // Scan speed
    
    return () => clearInterval(interval);
  }, [isScanning, items.length]);
  
  const handleSwitchActivation = () => {
    if (!isScanning) {
      setIsScanning(true);
    } else if (scanIndex >= 0) {
      // Activate current item
      items[scanIndex].action();
      setIsScanning(false);
      setScanIndex(-1);
    }
  };
  
  // Listen for switch input (Space key as example)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        handleSwitchActivation();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [scanIndex, isScanning]);
  
  return (
    <div className="switch-container">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={scanIndex === index ? 'scanning' : ''}
          style={{
            outline: scanIndex === index ? '3px solid #ff0' : 'none',
            transition: 'outline 0.2s ease'
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

# Adaptive Interfaces
// Empress Inclusiva: "Adapt to the user, not the other way around!"

## Progressive Enhancement Pattern
function AdaptiveComponent() {
  const [inputMethod, setInputMethod] = useState('unknown');
  
  useEffect(() => {
    // Detect primary input method
    const detectInput = () => {
      // Touch capability
      if ('ontouchstart' in window) {
        setInputMethod('touch');
      }
      
      // Fine pointer (mouse)
      if (window.matchMedia('(pointer: fine)').matches) {
        setInputMethod('mouse');
      }
      
      // Coarse pointer (touch)
      if (window.matchMedia('(pointer: coarse)').matches) {
        setInputMethod('touch');
      }
    };
    
    detectInput();
    
    // Listen for input method changes
    let lastTouchTime = 0;
    
    document.addEventListener('touchstart', () => {
      lastTouchTime = Date.now();
      setInputMethod('touch');
    });
    
    document.addEventListener('mousemove', () => {
      // Ignore mouse events just after touch
      if (Date.now() - lastTouchTime > 500) {
        setInputMethod('mouse');
      }
    });
    
    document.addEventListener('keydown', () => {
      setInputMethod('keyboard');
    });
  }, []);
  
  return (
    <div className={\`adaptive-ui input-\${inputMethod}\`}>
      {/* Adjust UI based on input method */}
      {children}
    </div>
  );
}

// CSS adaptations
.adaptive-ui.input-touch button {
  min-height: 48px;
  padding: 12px 20px;
}

.adaptive-ui.input-mouse button {
  min-height: 36px;
  padding: 8px 16px;
}

.adaptive-ui.input-keyboard button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

# Testing All Methods
// Guardian Keyboard: "Test beyond your comfort zone!"

## Testing Checklist
1. Mouse/Trackpad
   - All hover states work
   - Click targets adequate
   - Drag operations have alternatives

2. Keyboard Only
   - Tab through entire interface
   - All actions keyboard accessible
   - Focus indicators visible

3. Touch Device
   - Targets at least 48x48px
   - No hover-dependent features
   - Gestures are optional enhancements

4. Voice Control
   - All elements have clear labels
   - Numbered items where helpful
   - Unambiguous action words

5. Switch Control
   - Logical scanning order
   - Adequate timing
   - Clear selection indicators

6. Screen Reader + Keyboard
   - Everything announced properly
   - Keyboard navigation works
   - Dynamic updates announced`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Harmony Lesson:</h3>
				<p>
					The Interaction Harmony teaches us that true accessibility comes from 
					embracing the diversity of human interaction. Every person has different 
					abilities, preferences, and contexts. By designing for multiple input 
					methods from the start, we create interfaces that are not just accessible 
					but more robust and usable for everyone. The guardians show us that 
					universal design isn't about special accommodations - it's about flexible, 
					thoughtful interfaces that adapt to human diversity.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does designing for multiple interaction methods improve the overall 
					quality and robustness of an interface?
				</p>
				<p>
					Why is it important to test with actual assistive technologies rather 
					than just following guidelines?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;