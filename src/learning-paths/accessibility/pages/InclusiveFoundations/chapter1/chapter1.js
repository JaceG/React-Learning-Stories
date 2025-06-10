import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const [screenReaderActive, setScreenReaderActive] = useState(false);
	const [keyboardMode, setKeyboardMode] = useState(false);
	const [currentFocus, setCurrentFocus] = useState(null);
	const [detectedBarriers, setDetectedBarriers] = useState([]);
	const [contrastMode, setContrastMode] = useState('normal');
	
	const { 
		accessibilityScore,
		barriersDetected,
		addBarrier,
		removeBarrier,
		accessibilityLevel,
		inclusiveFeatures,
		implementFeature,
		updateAccessibilityScore
	} = useOutletContext();

	const commonBarriers = [
		{ 
			id: 'missing-alt', 
			name: 'Missing Alt Text', 
			icon: '🖼️', 
			description: 'Images without descriptive text',
			solution: 'Add meaningful alt attributes to all images'
		},
		{ 
			id: 'color-only', 
			name: 'Color-Only Information', 
			icon: '🎨', 
			description: 'Information conveyed through color alone',
			solution: 'Add text labels or icons alongside colors'
		},
		{ 
			id: 'no-keyboard', 
			name: 'No Keyboard Access', 
			icon: '⌨️', 
			description: 'Interactive elements not keyboard accessible',
			solution: 'Ensure all interactive elements are focusable'
		},
		{ 
			id: 'poor-contrast', 
			name: 'Poor Color Contrast', 
			icon: '👁️', 
			description: 'Text difficult to read due to low contrast',
			solution: 'Meet WCAG contrast ratio requirements'
		},
		{ 
			id: 'no-labels', 
			name: 'Missing Form Labels', 
			icon: '📝', 
			description: 'Form inputs without associated labels',
			solution: 'Use proper label elements or aria-label'
		}
	];

	const guardians = [
		{ name: 'Guardian Semantic', role: 'HTML Expert', icon: '🏛️' },
		{ name: 'Guardian Keyboard', role: 'Interaction Specialist', icon: '⌨️' },
		{ name: 'Guardian Audio', role: 'Screen Reader Master', icon: '🔊' },
		{ name: 'Guardian Spectrum', role: 'Visual Accessibility', icon: '🎨' },
		{ name: 'Guardian Still', role: 'Motion Consideration', icon: '⏸️' }
	];

	const handleBarrierDetection = () => {
		// Simulate barrier detection
		const foundBarriers = commonBarriers.slice(0, 3);
		foundBarriers.forEach(barrier => addBarrier(barrier));
		setDetectedBarriers(foundBarriers);
	};

	const handleScreenReaderSimulation = () => {
		setScreenReaderActive(!screenReaderActive);
		if (!screenReaderActive) {
			// Simulate screen reader announcement
			speakText("Welcome to the Inclusive Empire. Navigation landmark. Main content area.");
		}
	};

	const speakText = (text) => {
		// In a real app, this would use the Web Speech API
		console.log(`Screen reader: ${text}`);
	};

	const handleKeyboardTest = () => {
		setKeyboardMode(!keyboardMode);
		setCurrentFocus(0);
	};

	const handleContrastCheck = () => {
		const modes = ['normal', 'high', 'inverted'];
		const currentIndex = modes.indexOf(contrastMode);
		const nextMode = modes[(currentIndex + 1) % modes.length];
		setContrastMode(nextMode);
	};

	return (
		<div className='chapter inclusive-foundations'>
			<h2 className='chapter-title'>
				Chapter 1: The Inclusive Empire
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					At the heart of the digital realm stood the Inclusive Empire - not a 
					separate kingdom, but a philosophy that touched every corner of the React 
					world. <strong>Empress Inclusiva</strong> welcomed Aria with a gentle 
					smile that seemed to see everything and nothing at once.
				</p>
				
				<p className='story-paragraph'>
					"Captain Aria," she began, her voice carrying through multiple sensory 
					channels, "you've built powerful applications, optimized them, deployed 
					them globally. But can everyone use them?"
				</p>

				<p className='story-paragraph'>
					The throne room was unlike any Aria had seen - ramps alongside stairs, 
					visual displays paired with audio, text in multiple sizes and contrasts. 
					Every element had multiple ways to interact.
				</p>

				<p className='story-paragraph'>
					Binary's circuits hummed with new understanding. "Aria, I'm detecting 
					screen readers, voice controls, switch devices... so many ways to interact!"
				</p>

				<p className='story-paragraph'>
					Debuggora's eyes glowed with empathy. "And I see barriers everywhere in 
					our old code - color-only information, mouse-only interactions, missing labels."
				</p>

				<p className='story-paragraph'>
					Empress Inclusiva gestured to her diverse council. "Meet the Guardians of 
					Inclusion - each represents different ways people interact with your 
					applications. Your final lesson: true mastery means building for everyone."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Accessibility Audit Chamber</h3>
				
				<div className='inclusive-empire'>
					<div className='guardian-council'>
						{guardians.map((guardian, index) => (
							<div key={index} className='guardian'>
								<div className='guardian-avatar'>
									{guardian.icon}
								</div>
								<div className='guardian-name'>{guardian.name}</div>
								<div className='guardian-role'>{guardian.role}</div>
							</div>
						))}
					</div>

					<div className='accessibility-score'>
						<div className='score-meter'>
							<div 
								className='score-circle' 
								style={{ '--score': accessibilityScore }}
							>
								<div className='score-inner'>
									<div className='score-value'>{accessibilityScore}</div>
									<div className='score-label'>Accessibility Score</div>
								</div>
							</div>
						</div>
						<div className='accessibility-level'>{accessibilityLevel}</div>
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Barrier Detector</h3>
				
				<div className='barrier-detector'>
					<button 
						onClick={handleBarrierDetection}
						style={{
							padding: '12px 30px',
							background: 'linear-gradient(135deg, #EF4444, #DC2626)',
							border: 'none',
							borderRadius: '25px',
							color: 'white',
							fontSize: '1.1em',
							fontWeight: 'bold',
							cursor: 'pointer',
							marginBottom: '20px'
						}}
					>
						🔍 Scan for Accessibility Barriers
					</button>

					{barriersDetected.length > 0 && (
						<div className='barrier-list'>
							{barriersDetected.map((barrier) => (
								<div key={barrier.id} className='barrier-item'>
									<div className='barrier-icon'>{barrier.icon}</div>
									<div className='barrier-info'>
										<div className='barrier-name'>{barrier.name}</div>
										<div className='barrier-description'>{barrier.description}</div>
									</div>
									<button 
										className='barrier-fix'
										onClick={() => {
											removeBarrier(barrier.id);
											implementFeature(barrier.id === 'missing-alt' ? 'semanticHTML' : 'ariaLabels');
										}}
									>
										Fix Issue
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Interactive Testing Tools</h3>
				
				<div style={{ display: 'grid', gap: '20px' }}>
					{/* Screen Reader Simulator */}
					<div>
						<button
							onClick={handleScreenReaderSimulation}
							style={{
								padding: '10px 25px',
								background: screenReaderActive ? '#10B981' : 'rgba(147, 51, 234, 0.2)',
								border: '1px solid #9333EA',
								borderRadius: '20px',
								color: 'white',
								cursor: 'pointer',
								marginBottom: '15px'
							}}
						>
							{screenReaderActive ? '🔊 Screen Reader Active' : '🔇 Activate Screen Reader'}
						</button>
						
						{screenReaderActive && (
							<div className='screen-reader-simulator'>
								<div className='screen-reader-output'>
									Welcome to the Inclusive Empire. Navigation landmark.{'\n'}
									Heading level 1: Accessibility Audit Chamber{'\n'}
									Button: Scan for Accessibility Barriers{'\n'}
									List of 5 items: Guardian Council{'\n'}
									Accessibility Score: {accessibilityScore} out of 100
									<span className='screen-reader-cursor'></span>
								</div>
							</div>
						)}
					</div>

					{/* Keyboard Navigation Tester */}
					<div>
						<button
							onClick={handleKeyboardTest}
							style={{
								padding: '10px 25px',
								background: keyboardMode ? '#10B981' : 'rgba(147, 51, 234, 0.2)',
								border: '1px solid #9333EA',
								borderRadius: '20px',
								color: 'white',
								cursor: 'pointer',
								marginBottom: '15px'
							}}
						>
							{keyboardMode ? '⌨️ Keyboard Mode Active' : '🖱️ Test Keyboard Navigation'}
						</button>
						
						{keyboardMode && (
							<div className='keyboard-tester'>
								<p style={{ marginBottom: '15px', color: '#bdc3c7' }}>
									Use Tab to navigate, Enter to activate
								</p>
								<div className='keyboard-grid'>
									{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
										<button
											key={num}
											className={`keyboard-target ${currentFocus === num ? 'focused' : ''}`}
											onFocus={() => setCurrentFocus(num)}
											tabIndex={keyboardMode ? 0 : -1}
										>
											Target {num}
										</button>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Contrast Analyzer */}
					<div>
						<button
							onClick={handleContrastCheck}
							style={{
								padding: '10px 25px',
								background: 'rgba(147, 51, 234, 0.2)',
								border: '1px solid #9333EA',
								borderRadius: '20px',
								color: 'white',
								cursor: 'pointer',
								marginBottom: '15px'
							}}
						>
							🎨 Check Color Contrast ({contrastMode})
						</button>
						
						<div className='contrast-analyzer'>
							<div className='contrast-samples'>
								<div 
									className='contrast-sample'
									style={{
										background: contrastMode === 'inverted' ? '#fff' : '#1a1a1a',
										color: contrastMode === 'inverted' ? '#333' : contrastMode === 'high' ? '#fff' : '#666'
									}}
								>
									<span className='contrast-ratio contrast-fail'>2.5:1 ❌</span>
									<p>Poor Contrast</p>
									<small>Hard to read</small>
								</div>
								<div 
									className='contrast-sample'
									style={{
										background: contrastMode === 'inverted' ? '#fff' : '#1a1a1a',
										color: contrastMode === 'inverted' ? '#000' : '#bbb'
									}}
								>
									<span className='contrast-ratio contrast-pass'>4.5:1 ✓</span>
									<p>Normal Text</p>
									<small>WCAG AA compliant</small>
								</div>
								<div 
									className='contrast-sample'
									style={{
										background: contrastMode === 'inverted' ? '#000' : '#fff',
										color: contrastMode === 'inverted' ? '#fff' : '#000'
									}}
								>
									<span className='contrast-ratio contrast-pass'>21:1 ✓</span>
									<p>High Contrast</p>
									<small>Maximum clarity</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Accessibility Foundations</span>
					<span className='discovered-by'>Empress Inclusiva's wisdom</span>
				</div>
				<pre>{`# Understanding Web Accessibility
// Empress Inclusiva: "Accessibility is not a feature, it's a fundamental!"

# What is Web Accessibility?
Web accessibility means that websites, tools, and technologies are 
designed and developed so that people with disabilities can use them.

# The POUR Principles (WCAG)
1. Perceivable - Information must be presentable in different ways
2. Operable - Interface must be operable by keyboard
3. Understandable - Information must be understandable
4. Robust - Content must work with assistive technologies

# Who Benefits from Accessibility?
// Binary: "Calculating beneficiaries... Result: EVERYONE!"

- People with permanent disabilities (15% of global population)
- People with temporary disabilities (broken arm, eye infection)
- People with situational limitations (bright sunlight, noisy environment)
- People using older devices or slow internet
- Search engines and SEO
- Voice assistants and IoT devices

# Common Accessibility Barriers in React
// Debuggora: "I've found these bugs in 87% of React apps!"

1. Div-itis (using divs for everything)
<div onClick={handleClick}>Click me</div> // Bad
<button onClick={handleClick}>Click me</button> // Good

2. Missing keyboard support
// Bad - mouse only
<div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>

// Good - keyboard support
<div 
  onMouseEnter={showTooltip} 
  onMouseLeave={hideTooltip}
  onFocus={showTooltip}
  onBlur={hideTooltip}
  tabIndex={0}
>

3. Poor focus management
// After modal closes, return focus
const previousFocus = useRef(document.activeElement);

useEffect(() => {
  return () => {
    previousFocus.current?.focus();
  };
}, []);

4. Images without alt text
<img src="logo.png" /> // Bad
<img src="logo.png" alt="Company logo" /> // Good
<img src="decoration.png" alt="" /> // Good for decorative images

5. Color as sole information
// Bad
<span style={{color: 'red'}}>Error</span>

// Good
<span style={{color: 'red'}}>
  <Icon name="error" /> Error
</span>

# Assistive Technologies
// Aria: "So many ways to interact with our apps!"

1. Screen Readers
   - NVDA (Windows) - Free
   - JAWS (Windows) - Commercial
   - VoiceOver (macOS/iOS) - Built-in
   - TalkBack (Android) - Built-in

2. Alternative Input Devices
   - Keyboard only navigation
   - Switch controls
   - Voice control
   - Eye tracking
   - Head pointers

3. Visual Aids
   - Screen magnifiers
   - High contrast modes
   - Color filters
   - Text-to-speech

# React Accessibility Tools
npm install eslint-plugin-jsx-a11y react-axe

// Development-time accessibility checking
import React from 'react';
import ReactDOM from 'react-dom';
import axe from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}

# Browser DevTools
- Chrome Lighthouse (automated audits)
- Firefox Accessibility Inspector
- Chrome Accessibility Tree viewer
- WAVE browser extension

# Testing with Screen Readers
// macOS VoiceOver shortcuts
Cmd + F5: Toggle VoiceOver
Ctrl + Option + Arrow keys: Navigate
Ctrl + Option + Space: Activate

// Windows NVDA shortcuts
Insert + Space: Toggle browse/focus mode
Tab: Navigate interactive elements
H: Jump to headings
Enter: Activate elements

# The Business Case for Accessibility
// Guardian Semantic: "Good for users, good for business!"

1. Legal Compliance
   - ADA (Americans with Disabilities Act)
   - Section 508 (US Federal agencies)
   - EN 301 549 (European standard)
   - AODA (Accessibility for Ontarians)

2. Market Reach
   - 1+ billion people with disabilities globally
   - $13 trillion in annual disposable income
   - 2x more likely to be loyal customers

3. SEO Benefits
   - Semantic HTML improves search rankings
   - Alt text provides keyword opportunities
   - Better structure aids crawling

4. Better User Experience
   - Cleaner, more maintainable code
   - Faster load times
   - Works in more situations
   - Future-proof design`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Inclusion Lesson:</h3>
				<p>
					Accessibility isn't about adding features for "others" - it's about removing 
					barriers for everyone. Empress Inclusiva teaches that accessible applications 
					are better applications, benefiting all users in unexpected ways. When we 
					design for the edges, we create better experiences for the center. The 
					Inclusive Empire shows us that true React mastery means building applications 
					that adapt to human diversity, not forcing humans to adapt to our applications.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the Inclusive Empire as a "philosophy" rather than a place reflect 
					accessibility's role in development?
				</p>
				<p>
					Why might accessible applications benefit users without disabilities?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;