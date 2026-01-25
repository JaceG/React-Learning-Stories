import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const [currentFocus, setCurrentFocus] = useState(null);
	const [tabNavigation, setTabNavigation] = useState(false);
	const [keyPresses, setKeyPresses] = useState([]);
	const [focusTrapped, setFocusTrapped] = useState(false);
	const [skipLinkVisible, setSkipLinkVisible] = useState(false);
	const focusTrapRef = useRef(null);
	
	const { 
		keyboardMode,
		setKeyboardMode,
		focusPath,
		addToFocusPath,
		clearFocusPath,
		keyboardShortcuts,
		masterShortcut,
		skipLinks,
		setSkipLinks,
		focusIndicators,
		setFocusIndicators
	} = useOutletContext();

	const focusableElements = [
		{ id: 'nav', label: 'Navigation', type: 'nav' },
		{ id: 'search', label: 'Search', type: 'input' },
		{ id: 'content', label: 'Main Content', type: 'main' },
		{ id: 'button1', label: 'Action Button', type: 'button' },
		{ id: 'link1', label: 'Help Link', type: 'link' },
		{ id: 'footer', label: 'Footer', type: 'footer' }
	];

	const keyboardKeys = [
		{ key: 'Tab', label: 'Navigate forward', shortcut: 'tab' },
		{ key: 'Shift+Tab', label: 'Navigate backward', shortcut: 'shiftTab' },
		{ key: 'Enter', label: 'Activate buttons/links', shortcut: 'enter' },
		{ key: 'Space', label: 'Activate buttons', shortcut: 'space' },
		{ key: 'Escape', label: 'Close/Cancel', shortcut: 'escape' },
		{ key: '↑↓←→', label: 'Navigate within', shortcut: 'arrows' }
	];

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!keyboardMode) return;
			
			const keyPress = {
				key: e.key,
				code: e.code,
				shift: e.shiftKey,
				time: new Date()
			};
			
			setKeyPresses(prev => [...prev.slice(-4), keyPress]);
			
			// Track specific shortcuts
			if (e.key === 'Tab') {
				masterShortcut('tab');
				e.preventDefault();
				navigateWithTab(e.shiftKey);
			} else if (e.key === 'Enter') {
				masterShortcut('enter');
			} else if (e.key === 'Escape') {
				masterShortcut('escape');
				if (focusTrapped) setFocusTrapped(false);
			} else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
				masterShortcut('arrows');
			} else if (e.key === ' ') {
				masterShortcut('space');
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyboardMode, focusTrapped]);

	const navigateWithTab = (reverse = false) => {
		const elements = focusableElements;
		const currentIndex = elements.findIndex(el => el.id === currentFocus);
		let nextIndex;
		
		if (reverse) {
			nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
		} else {
			nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
		}
		
		const nextElement = elements[nextIndex];
		setCurrentFocus(nextElement.id);
		addToFocusPath(nextElement.label);
	};

	const handleFocusTrap = () => {
		setFocusTrapped(!focusTrapped);
		if (!focusTrapped && focusTrapRef.current) {
			const firstButton = focusTrapRef.current.querySelector('button');
			firstButton?.focus();
		}
	};

	const handleSkipToMain = (e) => {
		e.preventDefault();
		setCurrentFocus('content');
		addToFocusPath('Main Content (via skip link)');
	};

	return (
		<div className='chapter interaction-patterns'>
			<h2 className='chapter-title'>
				Chapter 1: The Keyboard Kingdom
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Guardian Keyboard</strong> ruled a kingdom navigated entirely 
					without mice. "Many users can't or won't use pointing devices. Your apps 
					must be fully keyboard accessible."
				</p>
				
				<p className='story-paragraph'>
					Aria tried navigating her apps with only a keyboard. "I can't reach half 
					my interactive elements!"
				</p>

				<p className='story-paragraph'>
					"Focus management, tab order, keyboard shortcuts - these are your tools 
					for keyboard accessibility."
				</p>

				<p className='story-paragraph'>
					Binary calculated rapidly. "Keyboard users: 3% use keyboard exclusively, 
					20% use keyboard frequently, 100% benefit from keyboard support!"
				</p>

				<p className='story-paragraph'>
					Debuggora observed the patterns. "Every click needs a key equivalent. 
					Every hover needs a focus state. Every interaction must be reachable!"
				</p>

				<p className='story-paragraph'>
					Guardian Keyboard nodded. "The keyboard is the universal interface. Master 
					it, and you unlock access for millions."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Keyboard Navigation Simulator</h3>
				
				<button
					onClick={() => setKeyboardMode(!keyboardMode)}
					style={{
						padding: '12px 30px',
						background: keyboardMode 
							? 'linear-gradient(135deg, #27AE60, #229954)' 
							: 'linear-gradient(135deg, #3498DB, #2980B9)',
						border: 'none',
						borderRadius: '25px',
						color: 'white',
						fontSize: '1.1em',
						fontWeight: 'bold',
						cursor: 'pointer',
						marginBottom: '20px'
					}}
				>
					{keyboardMode ? '⌨️ Keyboard Mode Active' : '🖱️ Enable Keyboard Mode'}
				</button>

				{keyboardMode && (
					<div className='keyboard-kingdom'>
						{/* Skip Link Demo */}
						<div className='skip-links-demo'>
							<a 
								href="#main-content" 
								className='skip-link'
								onFocus={() => setSkipLinkVisible(true)}
								onBlur={() => setSkipLinkVisible(false)}
								onClick={handleSkipToMain}
							>
								Skip to main content
							</a>
						</div>

						{/* Focus Path Visualization */}
						<div className='focus-path-visualizer'>
							<h4 style={{ marginBottom: '15px' }}>Focus Journey</h4>
							<div className='focus-path'>
								{focusableElements.map((element, index) => (
									<>
										<div 
											key={element.id}
											className={`focus-node ${currentFocus === element.id ? 'active' : ''}`}
											tabIndex={keyboardMode ? 0 : -1}
											onFocus={() => {
												setCurrentFocus(element.id);
												addToFocusPath(element.label);
											}}
										>
											<div>{element.label}</div>
											<div className='key-label'>{element.type}</div>
										</div>
										{index < focusableElements.length - 1 && (
											<span className='focus-arrow'>→</span>
										)}
									</>
								))}
							</div>
							
							{focusPath.length > 0 && (
								<div style={{ marginTop: '20px' }}>
									<h5>Your Focus Path:</h5>
									<div style={{ 
										padding: '10px', 
										background: 'rgba(0, 0, 0, 0.3)', 
										borderRadius: '5px',
										marginTop: '10px'
									}}>
										{focusPath.join(' → ')}
									</div>
									<button
										onClick={clearFocusPath}
										style={{
											marginTop: '10px',
											padding: '5px 15px',
											background: 'rgba(231, 76, 60, 0.2)',
											border: '1px solid #E74C3C',
											borderRadius: '5px',
											color: 'white',
											cursor: 'pointer'
										}}
									>
										Clear Path
									</button>
								</div>
							)}
						</div>

						{/* Keyboard Shortcut Trainer */}
						<div className='keyboard-trainer' style={{ marginTop: '30px' }}>
							<h4>Master Keyboard Shortcuts</h4>
							<div className='keyboard-layout'>
								{keyboardKeys.map((key) => (
									<div 
										key={key.shortcut}
										className={`keyboard-key ${keyboardShortcuts[key.shortcut] ? 'mastered' : ''}`}
									>
										<div style={{ fontSize: '1.2em', marginBottom: '5px' }}>
											{key.key}
										</div>
										<div className='key-label'>{key.label}</div>
										{keyboardShortcuts[key.shortcut] && (
											<div style={{ color: '#27AE60', marginTop: '5px' }}>✓</div>
										)}
									</div>
								))}
							</div>
							
							{keyPresses.length > 0 && (
								<div style={{ 
									marginTop: '20px', 
									padding: '15px', 
									background: 'rgba(0, 0, 0, 0.3)', 
									borderRadius: '8px' 
								}}>
									<h5>Recent Key Presses:</h5>
									<div style={{ fontFamily: 'monospace', marginTop: '10px' }}>
										{keyPresses.map((press, index) => (
											<div key={index} style={{ marginBottom: '5px' }}>
												{press.shift && 'Shift + '}{press.key} 
												<span style={{ color: '#7f8c8d', marginLeft: '10px' }}>
													({press.code})
												</span>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Focus Trap Demo */}
						<div style={{ marginTop: '30px' }}>
							<h4>Focus Trap Example (Modal)</h4>
							<button
								onClick={handleFocusTrap}
								style={{
									padding: '10px 20px',
									background: '#9333EA',
									border: 'none',
									borderRadius: '5px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								Open Modal Dialog
							</button>
							
							{focusTrapped && (
								<div style={{
									position: 'fixed',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									background: '#2c3e50',
									padding: '30px',
									borderRadius: '10px',
									boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
									zIndex: 1000
								}}>
									<div ref={focusTrapRef}>
										<h3 style={{ marginBottom: '20px' }}>Modal Dialog</h3>
										<p style={{ marginBottom: '20px' }}>
											Focus is trapped within this modal. Use Tab to navigate between buttons.
										</p>
										<div style={{ display: 'flex', gap: '10px' }}>
											<button 
												style={{
													padding: '8px 16px',
													background: '#3498DB',
													border: 'none',
													borderRadius: '5px',
													color: 'white',
													cursor: 'pointer'
												}}
											>
												Confirm
											</button>
											<button 
												onClick={() => setFocusTrapped(false)}
												style={{
													padding: '8px 16px',
													background: '#E74C3C',
													border: 'none',
													borderRadius: '5px',
													color: 'white',
													cursor: 'pointer'
												}}
											>
												Cancel (Esc)
											</button>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Focus Indicator Styles */}
						<div style={{ marginTop: '30px' }}>
							<h4>Focus Indicator Styles</h4>
							<div className='focus-indicator-demo'>
								<div className='focus-style-example'>
									<h5>Outline Style</h5>
									<button className='focus-button outline-style'>
										Focus me
									</button>
								</div>
								<div className='focus-style-example'>
									<h5>Glow Style</h5>
									<button className='focus-button glow-style'>
										Focus me
									</button>
								</div>
								<div className='focus-style-example'>
									<h5>Border Style</h5>
									<button className='focus-button border-style'>
										Focus me
									</button>
								</div>
								<div className='focus-style-example'>
									<h5>Custom Style</h5>
									<button className='focus-button custom-style'>
										Focus me
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Keyboard Navigation Patterns</span>
					<span className='discovered-by'>Guardian Keyboard's wisdom</span>
				</div>
				<pre>{`# Keyboard Accessibility Fundamentals
// Guardian Keyboard: "Every mouse action needs a keyboard equivalent!"

# Focus Management

## Basic Focus Control
// Make any element focusable
<div tabIndex={0} onKeyDown={handleKeyDown}>
  Focusable div
</div>

// Programmatic focus
const buttonRef = useRef(null);

useEffect(() => {
  // Focus on mount
  buttonRef.current?.focus();
}, []);

<button ref={buttonRef}>Auto-focused button</button>

## Focus Trap Pattern
// Essential for modals and dialogs
function FocusTrap({ children, isActive }) {
  const trapRef = useRef(null);
  
  useEffect(() => {
    if (!isActive) return;
    
    const trap = trapRef.current;
    const focusableElements = trap.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    firstElement?.focus();
    
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    trap.addEventListener('keydown', handleTab);
    return () => trap.removeEventListener('keydown', handleTab);
  }, [isActive]);
  
  return <div ref={trapRef}>{children}</div>;
}

## Skip Links
// Allow keyboard users to skip repetitive content
function SkipLink() {
  return (
    <a 
      href="#main-content" 
      className="skip-link"
      style={{
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
      onFocus={(e) => {
        e.target.style.left = '10px';
        e.target.style.width = 'auto';
        e.target.style.height = 'auto';
      }}
      onBlur={(e) => {
        e.target.style.left = '-10000px';
        e.target.style.width = '1px';
        e.target.style.height = '1px';
      }}
    >
      Skip to main content
    </a>
  );
}

# Tab Order Management

## Controlling Tab Order
// Use tabIndex wisely
tabIndex="0"   // Natural tab order
tabIndex="-1"  // Programmatically focusable only
tabIndex="1"   // Avoid! Disrupts natural order

// Dynamic tab management
function TabList({ tabs, activeTab }) {
  return (
    <div role="tablist">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          role="tab"
          tabIndex={activeTab === index ? 0 : -1}
          aria-selected={activeTab === index}
          onClick={() => setActiveTab(index)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              setActiveTab((index + 1) % tabs.length);
            } else if (e.key === 'ArrowLeft') {
              setActiveTab(index === 0 ? tabs.length - 1 : index - 1);
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

# Keyboard Event Handling

## Key Event Patterns
function KeyboardHandler() {
  const handleKeyDown = (e) => {
    switch(e.key) {
      case 'Enter':
      case ' ':
        // Activate button
        e.preventDefault();
        handleClick();
        break;
        
      case 'Escape':
        // Close/cancel
        handleClose();
        break;
        
      case 'ArrowUp':
        // Navigate up
        e.preventDefault();
        navigateUp();
        break;
        
      case 'ArrowDown':
        // Navigate down
        e.preventDefault();
        navigateDown();
        break;
        
      case 'Home':
        // Go to first
        e.preventDefault();
        goToFirst();
        break;
        
      case 'End':
        // Go to last
        e.preventDefault();
        goToLast();
        break;
    }
  };
  
  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Content */}
    </div>
  );
}

## Keyboard Shortcuts
// Binary: "Efficiency boost: 47% with keyboard shortcuts!"

function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = [
        e.ctrlKey && 'ctrl',
        e.metaKey && 'cmd',
        e.altKey && 'alt',
        e.shiftKey && 'shift',
        e.key.toLowerCase()
      ].filter(Boolean).join('+');
      
      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Usage
useKeyboardShortcuts({
  'ctrl+s': handleSave,
  'ctrl+shift+f': openSearch,
  'escape': closeModal,
  '/': focusSearch
});

# Focus Indicators

## Visible Focus Styles
// Debuggora: "Invisible focus = confused users!"

/* Good focus indicators */
:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Don't remove outline without replacement */
:focus {
  outline: none; /* Bad if not replaced */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Good replacement */
}

/* Focus-visible for keyboard only */
:focus-visible {
  outline: 2px solid #007bff;
}

:focus:not(:focus-visible) {
  outline: none; /* Hide for mouse users */
}

# Common Keyboard Patterns

## Dropdown Menu
function DropdownMenu({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const handleKeyDown = (e) => {
    switch(e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setSelectedIndex(prev => 
            prev < items.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : items.length - 1
        );
        break;
        
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };
  
  return (
    <div className="dropdown">
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      {isOpen && (
        <ul role="menu">
          {items.map((item, index) => (
            <li
              key={item.id}
              role="menuitem"
              tabIndex={selectedIndex === index ? 0 : -1}
              className={selectedIndex === index ? 'selected' : ''}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

# Testing Keyboard Navigation

// Aria: "Test with real keyboard, not simulated events!"

1. Tab through entire page
2. Verify all interactive elements reachable
3. Check focus indicators visible
4. Test Shift+Tab backwards
5. Verify skip links work
6. Test keyboard shortcuts
7. Check focus trap in modals
8. Verify Escape closes things
9. Test with screen reader
10. Disable mouse to verify`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Keyboard Lesson:</h3>
				<p>
					Guardian Keyboard reveals that keyboard accessibility is not optional - it's 
					fundamental to universal access. Every interactive element must be reachable 
					and operable via keyboard. Focus management, clear indicators, and logical 
					tab order create a navigable experience. Remember: if it's clickable, it must 
					be keyboard accessible. The keyboard is the bridge between all users and your 
					application.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Why is keyboard navigation considered the "universal interface" for accessibility?
				</p>
				<p>
					How does proper focus management improve the experience for all users, not 
					just those using keyboards?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;