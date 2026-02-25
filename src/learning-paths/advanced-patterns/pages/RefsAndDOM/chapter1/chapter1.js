import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const {
		portals,
		createPortal,
		closePortal,
		portalTarget,
		setPortalTarget,
		bridgeStrength,
		evolve
	} = useOutletContext();

	const [showModal, setShowModal] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [selectedExample, setSelectedExample] = useState(null);

	// Portal use cases
	const portalUseCases = [
		{
			id: 'modal',
			name: 'Modal Dialogs',
			icon: '🗨️',
			description: 'Render above everything'
		},
		{
			id: 'tooltip',
			name: 'Tooltips',
			icon: '💬',
			description: 'Position freely in DOM'
		},
		{
			id: 'notification',
			name: 'Notifications',
			icon: '🔔',
			description: 'Top-level alerts'
		},
		{
			id: 'dropdown',
			name: 'Dropdowns',
			icon: '📋',
			description: 'Escape overflow hidden'
		}
	];

	// Portal targets
	const portalTargets = [
		{ id: 'modal-root', name: 'Modal Root', location: 'Body level' },
		{ id: 'tooltip-root', name: 'Tooltip Root', location: 'Fixed layer' },
		{ id: 'notification-root', name: 'Notification Root', location: 'Top of page' }
	];

	// Create portal example
	const demonstratePortal = (type) => {
		setSelectedExample(type);
		if (type === 'modal') {
			setShowModal(true);
			createPortal('Modal Dialog', 'modal-root');
			evolve('learning');
		} else if (type === 'tooltip') {
			setShowTooltip(true);
			createPortal('Tooltip', 'tooltip-root');
		}
	};

	// Modal portal component
	const ModalPortal = ({ children, onClose }) => {
		const modalRoot = document.getElementById('modal-root');
		
		if (!modalRoot) {
			// Create modal root if it doesn't exist
			const root = document.createElement('div');
			root.id = 'modal-root';
			document.body.appendChild(root);
			return null;
		}

		return ReactDOM.createPortal(
			<div className='modal-overlay' onClick={onClose}>
				<div className='modal-content' onClick={e => e.stopPropagation()}>
					{children}
					<button 
						onClick={onClose}
						style={{
							position: 'absolute',
							top: '10px',
							right: '10px',
							background: 'none',
							border: 'none',
							fontSize: '24px',
							cursor: 'pointer'
						}}>
						✕
					</button>
				</div>
			</div>,
			modalRoot
		);
	};

	// Tooltip portal component
	const TooltipPortal = ({ children, targetRef }) => {
		const [position, setPosition] = useState({ top: 0, left: 0 });
		
		useEffect(() => {
			if (targetRef && targetRef.current) {
				const rect = targetRef.current.getBoundingClientRect();
				setPosition({
					top: rect.top - 40,
					left: rect.left + rect.width / 2
				});
			}
		}, [targetRef]);

		const tooltipRoot = document.getElementById('tooltip-root');
		if (!tooltipRoot) {
			const root = document.createElement('div');
			root.id = 'tooltip-root';
			document.body.appendChild(root);
			return null;
		}

		return ReactDOM.createPortal(
			<div 
				style={{
					position: 'fixed',
					top: `${position.top}px`,
					left: `${position.left}px`,
					transform: 'translateX(-50%)',
					background: '#333',
					color: 'white',
					padding: '8px 12px',
					borderRadius: '4px',
					fontSize: '14px',
					pointerEvents: 'none',
					zIndex: 1000
				}}>
				{children}
			</div>,
			tooltipRoot
		);
	};

	const tooltipRef = React.useRef(null);

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Portal Dimension`}
			/>

		<StorySection
			paragraphs={[
				<>The final chamber of the Architect's Academy defied physics - portals opened to different parts of the DOM tree. <strong>Portal Keeper Escapius</strong> demonstrated: "Sometimes components need to render outside their parent hierarchy."</>,
				<>"Like my Navigation Portals!" <strong>Aria</strong> exclaimed. "But more fundamental - actual DOM escaping."</>,
				<><strong>Binary</strong> computed the implications. "This breaks the normal parent-child relationship. Components can render anywhere!"</>,
				<>"Precisely," Escapius nodded. "Portals let you maintain React's component structure while rendering to different DOM locations. Essential for modals, tooltips, and any UI that must escape its container's constraints."</>
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Portal Gateway</h3>
				
				<InstructionBox character={`Portal Keeper Escapius opens the Portal Creation Chamber.`}>
					Click on portal use cases to see how components escape their containers! 
					Watch the DOM tree visualization as modals and tooltips render outside the React root.
				</InstructionBox>
				
				<div className='portal-gateway'>
					<h4>Portal Creation Chamber</h4>
					
					<div className='portal-visualizer'>
						<div className='dom-tree'>
							<div className='dom-node root'>
								#root (React App)
								<div className='dom-node'>
									App Component
									<div className='dom-node'>
										Current Component
										{showModal && <div className='portal-bridge'></div>}
									</div>
								</div>
							</div>
							{showModal && (
								<div className='portal-node'>
									#modal-root (Portal Target)
									<div style={{ fontSize: '14px', marginTop: '5px' }}>
										Modal renders here!
									</div>
								</div>
							)}
						</div>
					</div>

					<div className='portal-targets'>
						<h5>Portal Targets</h5>
						<select 
							value={portalTarget} 
							onChange={(e) => setPortalTarget(e.target.value)}
							style={{
								padding: '8px',
								borderRadius: '4px',
								border: '1px solid #ddd',
								width: '100%'
							}}>
							{portalTargets.map(target => (
								<option key={target.id} value={target.id}>
									{target.name} - {target.location}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className='use-cases-grid'>
					{portalUseCases.map(useCase => (
						<div
							key={useCase.id}
							className={`use-case-card ${selectedExample === useCase.id ? 'active' : ''}`}
							onClick={() => demonstratePortal(useCase.id)}>
							<span className='use-case-icon'>{useCase.icon}</span>
							<div className='use-case-title'>{useCase.name}</div>
							<div className='use-case-description'>{useCase.description}</div>
						</div>
					))}
				</div>

				<div className='portal-demo'>
					<h4>Portal Demonstration</h4>
					
					<div style={{ position: 'relative', overflow: 'hidden', height: '100px', border: '2px dashed #e74c3c' }}>
						<p>This container has overflow: hidden</p>
						<button
							ref={tooltipRef}
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
							style={{
								padding: '10px 20px',
								background: '#3498db',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
								cursor: 'pointer'
							}}>
							Hover for Portal Tooltip
						</button>
						
						{showTooltip && (
							<TooltipPortal targetRef={tooltipRef}>
								I escaped the container!
							</TooltipPortal>
						)}
					</div>
				</div>

				{showModal && (
					<ModalPortal onClose={() => {
						setShowModal(false);
						closePortal(portals[portals.length - 1]?.id);
					}}>
						<h3>Portal Modal</h3>
						<p>This modal is rendered outside the React root but maintains 
						event propagation and context!</p>
						<p>Current Bridge Strength: {bridgeStrength}%</p>
					</ModalPortal>
				)}

				<div className='bridge-strength'>
					<h4>Dimensional Bridge Strength</h4>
					<div className='strength-bar'>
						<div 
							className='strength-fill' 
							style={{ width: `${Math.min(bridgeStrength, 100)}%` }}>
							{bridgeStrength}%
						</div>
					</div>
					<p>Create more portals to strengthen the bridge!</p>
				</div>
			</div>

			<CodeExample
				title={`Portal Fundamentals`}
				discoveredBy={`Transcribed by Aria`}
				code={`// React Portals - Rendering Outside the Parent

import ReactDOM from 'react-dom';

// 1. Basic Portal Usage
function Modal({ children, onClose }) {
  // Portal renders children into a DOM node
  // that exists outside the parent component
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Target DOM node
  );
}

// 2. Creating Portal Target
// In your HTML:
// <div id="root"></div>
// <div id="modal-root"></div>

// Or create dynamically:
function usePortalTarget(id) {
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) {
      const newElement = document.createElement('div');
      newElement.id = id;
      document.body.appendChild(newElement);
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [id]);
}

// 3. Modal with Portal
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h2>Modal Title</h2>
          <p>This modal renders outside the parent!</p>
        </Modal>
      )}
    </>
  );
}

// 4. Tooltip Portal with Positioning
function Tooltip({ children, targetRef }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    if (!targetRef.current) return;
    
    const updatePosition = () => {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 30,
        left: rect.left + rect.width / 2
      });
    };
    
    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [targetRef]);
  
  return ReactDOM.createPortal(
    <div 
      className="tooltip"
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        transform: 'translateX(-50%)'
      }}>
      {children}
    </div>,
    document.body
  );
}

// 5. Notification System with Portals
function NotificationPortal({ notifications }) {
  return ReactDOM.createPortal(
    <div className="notification-container">
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          {notification.message}
        </div>
      ))}
    </div>,
    document.getElementById('notification-root')
  );
}

// 6. Dropdown that Escapes Overflow
function Dropdown({ isOpen, children, targetRef }) {
  const [position, setPosition] = useState({});
  
  useLayoutEffect(() => {
    if (!isOpen || !targetRef.current) return;
    
    const rect = targetRef.current.getBoundingClientRect();
    const dropdownHeight = 200; // Estimate or measure
    
    // Smart positioning
    const shouldFlip = rect.bottom + dropdownHeight > window.innerHeight;
    
    setPosition({
      top: shouldFlip ? rect.top - dropdownHeight : rect.bottom,
      left: rect.left,
      width: rect.width
    });
  }, [isOpen, targetRef]);
  
  if (!isOpen) return null;
  
  return ReactDOM.createPortal(
    <div 
      className="dropdown"
      style={{
        position: 'fixed',
        ...position
      }}>
      {children}
    </div>,
    document.body
  );
}

// 7. Event Propagation Through Portals
function PortalEventExample() {
  // Events bubble through React tree, not DOM tree!
  return (
    <div onClick={() => console.log('Parent clicked')}>
      <Modal>
        <button onClick={() => console.log('Button clicked')}>
          Click me
        </button>
        {/* Clicking button logs:
            1. "Button clicked"
            2. "Parent clicked" (through React tree!)
        */}
      </Modal>
    </div>
  );
}

// 8. Context Through Portals
const ThemeContext = React.createContext('light');

function ThemedModal({ children }) {
  // Portals maintain context from React tree
  const theme = useContext(ThemeContext);
  
  return ReactDOM.createPortal(
    <div className={\`modal theme-\${theme}\`}>
      {children}
    </div>,
    document.getElementById('modal-root')
  );
}

// 9. Managing Multiple Portals
function usePortalManager() {
  const [portals, setPortals] = useState([]);
  
  const addPortal = (content, target = 'portal-root') => {
    const id = Date.now();
    setPortals(prev => [...prev, { id, content, target }]);
    return id;
  };
  
  const removePortal = (id) => {
    setPortals(prev => prev.filter(p => p.id !== id));
  };
  
  return { portals, addPortal, removePortal };
}`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Portal Keeper Escapius`,
						description: `Master of dimensional rendering and DOM manipulation. His motto: "Sometimes the best place for a component isn't where it lives in the code, but where it needs to appear in the DOM."`
					}
				]}
				lessonInsight={{
					title: `The Portal Lesson:`,
					content: `React Portals provide a first-class way to render children into a DOM node that exists outside the parent component's DOM hierarchy. Essential for modals, tooltips, and notifications that need to escape their containers. Despite rendering elsewhere in the DOM, portals maintain their position in the React tree, preserving context and event bubbling.`
				}}
				reflectionQuestions={[
					`Why do portals maintain React's event propagation?`,
					`When should you avoid portals?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 36 (Morning)`,
					content: `Portal Keeper Escapius welcomed me to the final chamber of the Architect's Academy - where physics bend! I learned React Portals render children outside the parent's DOM hierarchy while maintaining the React component tree. This is essential for modals that need to escape overflow:hidden containers, tooltips that need fixed positioning, and notifications. The key insight: events and context flow through the React tree, not the DOM tree! Bridge Strength at ${bridgeStrength}%.`
				}}
			/>
		</div>
	);
};

export default ChapterOne;