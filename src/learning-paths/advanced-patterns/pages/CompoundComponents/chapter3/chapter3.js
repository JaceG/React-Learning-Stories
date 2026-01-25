import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		componentFamily,
		implicitConnections,
		sharedState,
		updateSharedState,
		previewComposition,
		architectureLevel
	} = useOutletContext();

	const [activeExample, setActiveExample] = useState('accordion');
	const [showImplementation, setShowImplementation] = useState(false);
	const [symphonyActive, setSymphonyActive] = useState(false);

	// Complete compound component examples
	const completeExamples = [
		{
			id: 'accordion',
			name: 'Accordion Symphony',
			icon: '🎼',
			description: 'Multiple items, single active state'
		},
		{
			id: 'menu',
			name: 'Menu Composition',
			icon: '🍱',
			description: 'Nested menus with keyboard navigation'
		},
		{
			id: 'form',
			name: 'Form Orchestra',
			icon: '📋',
			description: 'Form fields working in harmony'
		},
		{
			id: 'modal',
			name: 'Modal Ensemble',
			icon: '🎭',
			description: 'Header, body, footer coordination'
		}
	];

	// Start the component symphony
	const startSymphony = () => {
		setSymphonyActive(true);
		
		// Simulate all components working together
		let delay = 0;
		completeExamples.forEach(example => {
			setTimeout(() => {
				updateSharedState(`${example.id}Active`, true);
				previewComposition(example);
			}, delay);
			delay += 1000;
		});

		// Complete the symphony
		setTimeout(() => {
			updateSharedState('symphonyComplete', true);
		}, delay + 1000);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Composed Symphony
			</h2>

			<div className='chapter-bridge'>
				Time to bring all the patterns together in perfect harmony...
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Your compound components sing together," <strong>Dean Architectus</strong> 
					praised. "You've learned that the best components hide complexity while 
					maximizing flexibility. Now, let me show you the full symphony."
				</p>

				<p className='story-paragraph'>
					The academy's main hall transformed into a concert stage. Each compound 
					component system took its place - Accordions, Menus, Forms, and Modals - 
					all ready to perform together.
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> watched in awe as the components began their performance. 
					Each system maintained its own state while contributing to the greater whole. 
					<strong>Binary</strong> calculated the complexity: "Hundreds of possible 
					interactions, yet the API remains simple!"
				</p>

				<p className='story-paragraph'>
					"This is the true power of compound components," Architectus explained. 
					"Complex behavior, simple interface. Now you're ready for the next pattern."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Component Symphony Hall</h3>
				
				<div className='architects-academy'>
					<h4>Complete Component Examples</h4>
					
					<div className='pattern-cards'>
						{completeExamples.map(example => (
							<div
								key={example.id}
								className={`pattern-card ${activeExample === example.id ? 'selected' : ''}`}
								onClick={() => setActiveExample(example.id)}>
								<span className='pattern-icon'>{example.icon}</span>
								<div className='pattern-name'>{example.name}</div>
								<div className='pattern-description'>{example.description}</div>
							</div>
						))}
					</div>
					
					{!symphonyActive && (
						<button 
							className='symphony-button'
							onClick={startSymphony}
							style={{
								display: 'block',
								margin: '20px auto',
								padding: '12px 24px',
								fontSize: '18px',
								background: '#6c5ce7',
								color: 'white',
								border: 'none',
								borderRadius: '8px',
								cursor: 'pointer'
							}}>
							🎵 Start the Component Symphony
						</button>
					)}
				</div>

				{symphonyActive && (
					<div className='symphony-visualization'>
						<h4>Components Working in Harmony</h4>
						<div className='symphony-stage'>
							{completeExamples.map(example => (
								<div 
									key={example.id}
									className={`symphony-performer ${
										sharedState[`${example.id}Active`] ? 'active' : ''
									}`}>
									<span style={{ fontSize: '30px' }}>{example.icon}</span>
									<div>{example.name}</div>
								</div>
							))}
						</div>
						{sharedState.symphonyComplete && (
							<p style={{ textAlign: 'center', color: '#2ecc71', marginTop: '20px' }}>
								🎉 Perfect harmony achieved! All components working together!
							</p>
						)}
					</div>
				)}

				<div className='implementation-viewer'>
					<h4>Implementation Showcase</h4>
					<button 
						className='demo-button'
						onClick={() => setShowImplementation(!showImplementation)}>
						{showImplementation ? 'Hide' : 'Show'} Complete Implementation
					</button>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Complete Compound Component Examples</span>
				</div>
				<div className='code-example'>
					<pre>{`// Complete Compound Component Implementations

// 1. Accordion with animations and accessibility
const Accordion = ({ children, allowMultiple = false }) => {
  const [activeIndexes, setActiveIndexes] = useState([]);
  
  const toggleItem = (index) => {
    setActiveIndexes(prev => {
      if (allowMultiple) {
        return prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index];
      }
      return prev.includes(index) ? [] : [index];
    });
  };
  
  return (
    <AccordionContext.Provider value={{ activeIndexes, toggleItem }}>
      <div className="accordion" role="region">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = function AccordionItem({ children, index }) {
  const { activeIndexes } = useContext(AccordionContext);
  const isActive = activeIndexes.includes(index);
  
  return (
    <div className={\`accordion-item \${isActive ? 'active' : ''}\`}>
      {children}
    </div>
  );
};

Accordion.Header = function AccordionHeader({ children, index }) {
  const { toggleItem } = useContext(AccordionContext);
  
  return (
    <button
      className="accordion-header"
      onClick={() => toggleItem(index)}
      aria-expanded={isActive}
      aria-controls={\`panel-\${index}\`}>
      {children}
      <span className="accordion-icon">{isActive ? '−' : '+'}</span>
    </button>
  );
};

Accordion.Panel = function AccordionPanel({ children, index }) {
  const { activeIndexes } = useContext(AccordionContext);
  const isActive = activeIndexes.includes(index);
  
  return (
    <div
      id={\`panel-\${index}\`}
      className="accordion-panel"
      hidden={!isActive}
      aria-labelledby={\`header-\${index}\`}>
      <div className="accordion-content">{children}</div>
    </div>
  );
};

// 2. Modal with focus management
const Modal = ({ children, isOpen, onClose }) => {
  const modalRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      // Focus trap
      const focusableElements = modalRef.current.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      firstElement?.focus();
      
      const handleTab = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <ModalContext.Provider value={{ onClose }}>
      <div className="modal-overlay" onClick={onClose}>
        <div 
          ref={modalRef}
          className="modal-container" 
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true">
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

Modal.Header = function ModalHeader({ children }) {
  const { onClose } = useContext(ModalContext);
  
  return (
    <div className="modal-header">
      {children}
      <button 
        className="modal-close" 
        onClick={onClose}
        aria-label="Close modal">
        ×
      </button>
    </div>
  );
};

Modal.Body = function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
};

Modal.Footer = function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
};

// 3. Form with field coordination
const Form = ({ children, onSubmit }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const updateField = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const setFieldError = (name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const setFieldTouched = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  
  return (
    <FormContext.Provider value={{
      values,
      errors,
      touched,
      updateField,
      setFieldError,
      setFieldTouched
    }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

Form.Field = function FormField({ name, label, validate, children }) {
  const { 
    values, 
    errors, 
    touched, 
    updateField, 
    setFieldError, 
    setFieldTouched 
  } = useContext(FormContext);
  
  const value = values[name] || '';
  const error = errors[name];
  const isTouched = touched[name];
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    updateField(name, newValue);
    
    if (validate) {
      const error = validate(newValue);
      setFieldError(name, error);
    }
  };
  
  const handleBlur = () => {
    setFieldTouched(name);
  };
  
  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}</label>}
      {React.cloneElement(children, {
        id: name,
        name,
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        'aria-invalid': isTouched && !!error,
        'aria-describedby': error ? \`\${name}-error\` : undefined
      })}
      {isTouched && error && (
        <span id={\`\${name}-error\`} className="field-error">
          {error}
        </span>
      )}
    </div>
  );
};

// Usage - Clean and powerful
function App() {
  return (
    <div>
      <Accordion allowMultiple>
        <Accordion.Item index={0}>
          <Accordion.Header index={0}>Section 1</Accordion.Header>
          <Accordion.Panel index={0}>Content 1</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item index={1}>
          <Accordion.Header index={1}>Section 2</Accordion.Header>
          <Accordion.Panel index={1}>Content 2</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      
      <Form onSubmit={data => console.log(data)}>
        <Form.Field 
          name="email" 
          label="Email"
          validate={v => !v.includes('@') ? 'Invalid email' : null}>
          <input type="email" />
        </Form.Field>
        <Form.Field name="password" label="Password">
          <input type="password" />
        </Form.Field>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Mastery Achievement:</strong> "These examples show production-ready 
					compound components. Notice the attention to accessibility, keyboard navigation, 
					and error handling. This is architectural thinking at its finest."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Symphony of Architecture:</h3>
				<p>
					Compound components represent a pinnacle of React component design. They 
					combine multiple patterns - Context for state sharing, static properties 
					for organization, and flexible children handling - into cohesive, reusable 
					systems.
				</p>
				<p>
					The true mastery lies not in the individual techniques, but in knowing when 
					and how to combine them. Like a conductor leading an orchestra, you must 
					balance complexity with simplicity, power with usability.
				</p>
			</div>

			{architectureLevel >= 80 && (
				<div className='achievement-banner'>
					<h4>🏛️ Compound Component Mastery Achieved! 🏛️</h4>
					<p>You've mastered the art of component composition!</p>
					<ul style={{ listStyle: 'none', padding: 0 }}>
						<li>✓ Implicit state sharing understood</li>
						<li>✓ Flexible API design mastered</li>
						<li>✓ Component families created</li>
						<li>✓ Production patterns learned</li>
						<li>✓ Architecture Level: {architectureLevel}%</li>
					</ul>
				</div>
			)}

			<div className='chapter-ending'>
				<p>
					Dean Architectus smiled proudly as the component symphony concluded. "You've 
					mastered compound components - hiding complexity while providing flexibility. 
					But there's another way to share behavior. Pattern Master Renderius awaits 
					to teach you about Render Props..."
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;