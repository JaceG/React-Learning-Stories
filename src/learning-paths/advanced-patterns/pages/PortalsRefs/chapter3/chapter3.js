import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterThree = () => {
	const {
		portals,
		refs,
		focusManagement,
		imperativeHandles,
		bridgeStrength,
		masteryLevel,
		evolve
	} = useOutletContext();

	const [architectureDemo, setArchitectureDemo] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const modalRef = useRef(null);
	const dropdownButtonRef = useRef(null);

	// Pattern combinations
	const patternCombinations = [
		{
			id: 'modal-focus',
			name: 'Modal with Focus Management',
			patterns: ['Portals', 'Refs', 'Focus Trap'],
			icon: '🎯'
		},
		{
			id: 'dropdown-position',
			name: 'Smart Dropdown',
			patterns: ['Portals', 'Refs', 'Position Calculation'],
			icon: '📍'
		},
		{
			id: 'compound-modal',
			name: 'Compound Modal System',
			patterns: ['Portals', 'Compound Components', 'Refs'],
			icon: '🏗️'
		},
		{
			id: 'render-portal',
			name: 'Render Prop Portal',
			patterns: ['Portals', 'Render Props', 'Imperative Handle'],
			icon: '🎨'
		}
	];

	// Modal with complete architecture
	const ArchitecturalModal = forwardRef(({ isOpen, onClose, children }, ref) => {
		const modalContentRef = useRef(null);
		const previousActiveElement = useRef(null);

		// Store the previously focused element
		useEffect(() => {
			if (isOpen) {
				previousActiveElement.current = document.activeElement;
			}
		}, [isOpen]);

		// Focus management
		useEffect(() => {
			if (!isOpen || !modalContentRef.current) return;

			// Focus first focusable element
			const focusableElements = modalContentRef.current.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			focusableElements[0]?.focus();

			// Trap focus
			const handleKeyDown = (e) => {
				if (e.key === 'Escape') {
					onClose();
					return;
				}

				if (e.key !== 'Tab') return;

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (e.shiftKey && document.activeElement === firstElement) {
					e.preventDefault();
					lastElement?.focus();
				} else if (!e.shiftKey && document.activeElement === lastElement) {
					e.preventDefault();
					firstElement?.focus();
				}
			};

			document.addEventListener('keydown', handleKeyDown);

			return () => {
				document.removeEventListener('keydown', handleKeyDown);
				// Restore focus when modal closes
				previousActiveElement.current?.focus();
			};
		}, [isOpen, onClose]);

		// Imperative API
		useImperativeHandle(ref, () => ({
			focus: () => {
				const firstFocusable = modalContentRef.current?.querySelector(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				firstFocusable?.focus();
			},
			contains: (element) => {
				return modalContentRef.current?.contains(element) || false;
			}
		}));

		if (!isOpen) return null;

		return ReactDOM.createPortal(
			<div 
				className='modal-overlay' 
				onClick={onClose}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 1000
				}}>
				<div 
					ref={modalContentRef}
					className='modal-content' 
					onClick={e => e.stopPropagation()}
					style={{
						background: 'white',
						padding: '30px',
						borderRadius: '10px',
						maxWidth: '500px',
						width: '90%',
						position: 'relative'
					}}>
					{children}
				</div>
			</div>,
			document.body
		);
	});

	// Smart dropdown with positioning
	const SmartDropdown = ({ trigger, children }) => {
		const [isOpen, setIsOpen] = useState(false);
		const [position, setPosition] = useState({ top: 0, left: 0 });
		const triggerRef = useRef(null);
		const dropdownRef = useRef(null);

		useEffect(() => {
			if (!isOpen || !triggerRef.current) return;

			const updatePosition = () => {
				const rect = triggerRef.current.getBoundingClientRect();
				const dropdownHeight = 200; // Estimate
				const spaceBelow = window.innerHeight - rect.bottom;
				const spaceAbove = rect.top;

				const shouldFlip = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

				setPosition({
					top: shouldFlip ? rect.top - dropdownHeight : rect.bottom,
					left: rect.left,
					width: rect.width
				});
			};

			updatePosition();

			// Click outside handler
			const handleClickOutside = (e) => {
				if (!dropdownRef.current?.contains(e.target) && 
					!triggerRef.current?.contains(e.target)) {
					setIsOpen(false);
				}
			};

			document.addEventListener('click', handleClickOutside);
			window.addEventListener('scroll', updatePosition);
			window.addEventListener('resize', updatePosition);

			return () => {
				document.removeEventListener('click', handleClickOutside);
				window.removeEventListener('scroll', updatePosition);
				window.removeEventListener('resize', updatePosition);
			};
		}, [isOpen]);

		return (
			<>
				<div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
					{trigger}
				</div>
				{isOpen && ReactDOM.createPortal(
					<div 
						ref={dropdownRef}
						style={{
							position: 'fixed',
							top: position.top,
							left: position.left,
							width: position.width,
							background: 'white',
							border: '1px solid #ddd',
							borderRadius: '5px',
							boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
							zIndex: 1000,
							maxHeight: '200px',
							overflow: 'auto'
						}}>
						{children}
					</div>,
					document.body
				)}
			</>
		);
	};

	// Demonstrate architectural pattern
	const demonstratePattern = (pattern) => {
		setArchitectureDemo(pattern);
		if (pattern === 'modal-focus') {
			setModalOpen(true);
		} else if (pattern === 'dropdown-position') {
			setDropdownOpen(true);
		}
		if (bridgeStrength >= 80) {
			evolve('master');
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Architectural Summit`}
				bridge={`Dean Architectus returned for Aria's final evaluation. "You've learned our four great patterns - Compound Components, Render Props, Higher-Order Components, and now Portals & Refs. How would you combine them?" Aria demonstrated a modal system using portals for rendering, compound components for API design, refs for focus management, and render props for customization.`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Dean Architectus</strong> returned for Aria's final evaluation. 
					"You've learned our four great patterns. How would you combine them?"
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> demonstrated a modal system using portals for 
					rendering, compound components for API design, refs for focus management, 
					and render props for customization.
				</p>

				<p className='story-paragraph'>
					"Magnificent! You think like a true architect - not just using patterns, 
					but combining them purposefully." The Dean's approval resonated through 
					the chamber.
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> compiled their architectural knowledge. "Each 
					pattern has its strength, but combined, they create solutions impossible 
					with any single approach."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Architectural Pattern Synthesis</h3>
				
				<InstructionBox character={`Dean Architectus presents the Final Challenge.`}>
					Explore combined pattern demonstrations - Modal with Focus Management, Smart Dropdown, 
					Compound Modal System, and Render Prop Portal. Open the Architectural Modal to see 
					all patterns working together!
				</InstructionBox>
				
				<div className='pattern-combinations'>
					<h4>Combined Pattern Demonstrations</h4>
					<div className='use-cases-grid'>
						{patternCombinations.map(combo => (
							<div
								key={combo.id}
								className={`use-case-card ${architectureDemo === combo.id ? 'active' : ''}`}
								onClick={() => demonstratePattern(combo.id)}>
								<span className='use-case-icon'>{combo.icon}</span>
								<div className='use-case-title'>{combo.name}</div>
								<div style={{ fontSize: '12px', marginTop: '5px' }}>
									{combo.patterns.join(' + ')}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='architecture-demo'>
					<h4>Live Architecture Demo</h4>
					
					{/* Modal with Focus Management Demo */}
					<div style={{ marginBottom: '20px' }}>
						<button
							onClick={() => setModalOpen(true)}
							style={{
								padding: '10px 20px',
								background: '#6c5ce7',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
								cursor: 'pointer'
							}}>
							Open Architectural Modal
						</button>
						
						<ArchitecturalModal
							ref={modalRef}
							isOpen={modalOpen}
							onClose={() => setModalOpen(false)}>
							<h3>Architectural Modal</h3>
							<p>This modal combines:</p>
							<ul>
								<li>✅ Portal for rendering outside root</li>
								<li>✅ Ref for focus management</li>
								<li>✅ Imperative handle for parent control</li>
								<li>✅ Focus trap and restoration</li>
							</ul>
							<input 
								type="text" 
								placeholder="Try tabbing through elements"
								style={{
									width: '100%',
									padding: '10px',
									margin: '10px 0',
									borderRadius: '5px',
									border: '1px solid #ddd'
								}}
							/>
							<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
								<button 
									onClick={() => setModalOpen(false)}
									style={{
										padding: '10px 20px',
										background: '#e74c3c',
										color: 'white',
										border: 'none',
										borderRadius: '5px',
										cursor: 'pointer'
									}}>
									Cancel
								</button>
								<button
									onClick={() => {
										alert('Confirmed!');
										setModalOpen(false);
									}}
									style={{
										padding: '10px 20px',
										background: '#27ae60',
										color: 'white',
										border: 'none',
										borderRadius: '5px',
										cursor: 'pointer'
									}}>
									Confirm
								</button>
							</div>
						</ArchitecturalModal>
					</div>

					{/* Smart Dropdown Demo */}
					<div style={{ marginBottom: '20px' }}>
						<SmartDropdown
							trigger={
								<button
									ref={dropdownButtonRef}
									style={{
										padding: '10px 20px',
										background: '#3498db',
										color: 'white',
										border: 'none',
										borderRadius: '5px',
										cursor: 'pointer'
									}}>
									Smart Dropdown ▼
								</button>
							}>
							<div style={{ padding: '10px' }}>
								<h4 style={{ margin: '0 0 10px 0' }}>Smart Features:</h4>
								<ul style={{ margin: 0, paddingLeft: '20px' }}>
									<li>Position calculation</li>
									<li>Viewport awareness</li>
									<li>Click outside handling</li>
									<li>Scroll/resize updates</li>
								</ul>
							</div>
						</SmartDropdown>
					</div>

					{/* Pattern synthesis visualization */}
					<div className='pattern-synthesis' style={{
						background: '#ecf0f1',
						padding: '20px',
						borderRadius: '10px',
						marginTop: '20px'
					}}>
						<h5>Pattern Synthesis Status</h5>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
							<div style={{ 
								background: portals.length > 0 ? '#27ae60' : '#95a5a6',
								color: 'white',
								padding: '10px',
								borderRadius: '5px',
								textAlign: 'center'
							}}>
								Portals: {portals.length}
							</div>
							<div style={{ 
								background: refs.length > 0 ? '#27ae60' : '#95a5a6',
								color: 'white',
								padding: '10px',
								borderRadius: '5px',
								textAlign: 'center'
							}}>
								Refs: {refs.length}
							</div>
							<div style={{ 
								background: focusManagement.length > 0 ? '#27ae60' : '#95a5a6',
								color: 'white',
								padding: '10px',
								borderRadius: '5px',
								textAlign: 'center'
							}}>
								Focus Events: {focusManagement.length}
							</div>
							<div style={{ 
								background: imperativeHandles.length > 0 ? '#27ae60' : '#95a5a6',
								color: 'white',
								padding: '10px',
								borderRadius: '5px',
								textAlign: 'center'
							}}>
								Imperative Handles: {imperativeHandles.length}
							</div>
						</div>
					</div>
				</div>

				<div className='mastery-indicator'>
					<h4>Architectural Mastery Level</h4>
					<div className='mastery-levels'>
						<div className={`mastery-level ${masteryLevel === 'novice' ? 'active' : ''}`}>
							Novice
						</div>
						<div className={`mastery-level ${masteryLevel === 'learning' ? 'active' : ''}`}>
							Learning
						</div>
						<div className={`mastery-level ${masteryLevel === 'understanding' ? 'active' : ''}`}>
							Understanding
						</div>
						<div className={`mastery-level ${masteryLevel === 'advanced' ? 'active' : ''}`}>
							Advanced
						</div>
						<div className={`mastery-level ${masteryLevel === 'master' ? 'active' : ''}`}>
							Master
						</div>
					</div>
				</div>

				{masteryLevel === 'master' && (
					<div className='achievement-banner'>
						<h4>🏆 Architectural Master Achievement!</h4>
						<p>You've mastered the art of combining React patterns to create powerful, 
						elegant solutions!</p>
					</div>
				)}
			</div>

			<CodeExample
				title={`Architectural Pattern Synthesis`}
				discoveredBy={`Transcribed by Aria`}
				code={`// Combining Portals, Refs, and Advanced Patterns

// 1. Complete Modal Architecture
const Modal = {
  Root: forwardRef(({ children, isOpen, onClose }, ref) => {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);
    
    // Focus restoration
    useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement;
      }
      return () => {
        if (!isOpen && previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }, [isOpen]);
    
    // Imperative API
    useImperativeHandle(ref, () => ({
      focus: () => modalRef.current?.focus(),
      contains: (element) => modalRef.current?.contains(element)
    }));
    
    if (!isOpen) return null;
    
    return ReactDOM.createPortal(
      <ModalContext.Provider value={{ onClose }}>
        <FocusTrap active={isOpen}>
          <div className="modal-overlay" onClick={onClose}>
            <div 
              ref={modalRef}
              className="modal-content"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true">
              {children}
            </div>
          </div>
        </FocusTrap>
      </ModalContext.Provider>,
      document.getElementById('modal-root')
    );
  }),
  
  Header: ({ children }) => {
    const { onClose } = useContext(ModalContext);
    return (
      <div className="modal-header">
        {children}
        <button onClick={onClose} aria-label="Close">×</button>
      </div>
    );
  },
  
  Body: ({ children }) => (
    <div className="modal-body">{children}</div>
  ),
  
  Footer: ({ children }) => (
    <div className="modal-footer">{children}</div>
  )
};

// 2. Tooltip System with Render Props and Portals
function TooltipProvider({ children, render }) {
  const [tooltip, setTooltip] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const showTooltip = (content, target) => {
    const rect = target.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setTooltip(content);
  };
  
  const hideTooltip = () => setTooltip(null);
  
  const tooltipProps = {
    onMouseEnter: (e) => showTooltip(e.currentTarget.dataset.tooltip, e.currentTarget),
    onMouseLeave: hideTooltip,
    onFocus: (e) => showTooltip(e.currentTarget.dataset.tooltip, e.currentTarget),
    onBlur: hideTooltip
  };
  
  return (
    <>
      {children({ tooltipProps })}
      {tooltip && ReactDOM.createPortal(
        render({
          content: tooltip,
          position,
          isVisible: true
        }),
        document.body
      )}
    </>
  );
}

// 3. Notification System Architecture
class NotificationManager {
  constructor() {
    this.listeners = new Set();
    this.notifications = [];
  }
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  
  notify(notification) {
    const id = Date.now();
    const fullNotification = { ...notification, id };
    this.notifications.push(fullNotification);
    this.listeners.forEach(listener => listener(this.notifications));
    
    if (notification.duration) {
      setTimeout(() => this.remove(id), notification.duration);
    }
    
    return id;
  }
  
  remove(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.listeners.forEach(listener => listener(this.notifications));
  }
}

const notificationManager = new NotificationManager();

function NotificationContainer() {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    return notificationManager.subscribe(setNotifications);
  }, []);
  
  return ReactDOM.createPortal(
    <div className="notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => notificationManager.remove(notification.id)}
        />
      ))}
    </div>,
    document.getElementById('notification-root')
  );
}

// 4. Advanced Focus Management Hook
function useFocusManager() {
  const focusStack = useRef([]);
  const focusListeners = useRef(new Set());
  
  const pushFocus = (element) => {
    const currentFocus = document.activeElement;
    focusStack.current.push(currentFocus);
    element?.focus();
  };
  
  const popFocus = () => {
    const previousFocus = focusStack.current.pop();
    previousFocus?.focus();
  };
  
  const trapFocus = (container) => {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };
    
    container.addEventListener('keydown', handleTab);
    focusListeners.current.add({ container, handler: handleTab });
    
    return () => {
      container.removeEventListener('keydown', handleTab);
      focusListeners.current.delete({ container, handler: handleTab });
    };
  };
  
  return { pushFocus, popFocus, trapFocus };
}

// Usage combining all patterns
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal.Root ref={modalRef} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <h2>Architectural Modal</h2>
        </Modal.Header>
        <Modal.Body>
          <p>Combines Portals, Refs, Context, and Compound Components!</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </Modal.Footer>
      </Modal.Root>
      
      <NotificationContainer />
    </>
  );
}`}
			/>

			{masteryLevel === 'master' && (
				<div className='achievement-banner'>
					<h4>🏆 Architectural Master Achievement!</h4>
					<p>You've mastered the art of combining React patterns to create powerful, 
					elegant solutions!</p>
				</div>
			)}

			<ChapterSummary
				lessonInsight={{
					title: `The Synthesis Insight:`,
					content: `True architectural mastery comes from understanding not just individual patterns, but how they complement each other. Portals and refs often work together for UI needing both rendering flexibility and imperative control. The key is purposeful combination - each addition should solve a specific problem. The best architectures feel simple to use despite their internal sophistication.`
				}}
				reflectionQuestions={[
					`How do you decide which patterns to combine?`,
					`What makes an architecture elegant versus over-engineered?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 36 (Evening)`,
					content: `Dean Architectus returned for my final evaluation! I demonstrated a complete modal system combining ALL the patterns: Portals for rendering outside the DOM hierarchy, Compound Components for intuitive API design, Refs for focus management and imperative control, Render Props for customization, and Context for state sharing. The Pattern Masters assembled to congratulate me. Bridge Strength at ${bridgeStrength}%, Mastery Level: ${masteryLevel}. Binary computed: "We've come so far from basic components." 🎓 Advanced Patterns Learning Path Complete!`
				}}
				chapterEnding={[
					`The Pattern Masters assembled. Dean Architectus spoke: "Aria, you've mastered component composition at its highest level. You understand not just how to use patterns, but when and why. You're ready for the Modern Frontiers!"`,
					`As Aria left the floating academy, Binary computed their growth. "We've come so far from basic components, Aria."`,
					`"And yet," Aria smiled, looking toward the horizon, "there's always more to learn. The Allied Kingdoms await - it's time to explore the React Ecosystem!"`
				]}
			/>
		</div>
	);
};

export default ChapterThree;