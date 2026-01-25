import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

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
			<ChapterIntro
				chapterNumber={3}
				title={`The Composed Symphony`}
				bridge={`"Your compound components sing together," Dean Architectus praised as they entered the academy's main hall. "You've learned that the best components hide complexity while maximizing flexibility. Now, let me show you the full symphony."`}
			/>

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
				<h3 className='section-title'>Interactive Exercise: The Component Symphony Hall</h3>
				
				<InstructionBox character={`Dean Architectus raises his baton to conduct the Component Symphony.`}>
					Click on different component examples to see them in action. Then start the 
					symphony to see all components working together in perfect harmony!
				</InstructionBox>
				
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

			<CodeExample
				title={`Complete Compound Component Examples`}
				discoveredBy={`Transcribed by Aria`}
				code={`// Complete Compound Component Implementations

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
      <div className="accordion" role="region">{children}</div>
    </AccordionContext.Provider>
  );
};

// 2. Modal with focus management
const Modal = ({ children, isOpen, onClose }) => {
  const modalRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      // Focus trap and keyboard handling
      const handleTab = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <ModalContext.Provider value={{ onClose }}>
      <div className="modal-overlay" onClick={onClose}>
        <div ref={modalRef} className="modal-container" 
             onClick={e => e.stopPropagation()}
             role="dialog" aria-modal="true">
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

Modal.Header = ({ children }) => {
  const { onClose } = useContext(ModalContext);
  return (
    <div className="modal-header">
      {children}
      <button onClick={onClose} aria-label="Close">×</button>
    </div>
  );
};
Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;

// Usage - Clean and powerful
<Accordion allowMultiple>
  <Accordion.Item index={0}>
    <Accordion.Header index={0}>Section 1</Accordion.Header>
    <Accordion.Panel index={0}>Content 1</Accordion.Panel>
  </Accordion.Item>
</Accordion>`}
			/>

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

			<ChapterSummary
				lessonInsight={{
					title: `The Symphony of Architecture:`,
					content: `Compound components represent a pinnacle of React component design. They combine multiple patterns - Context for state sharing, static properties for organization, and flexible children handling - into cohesive, reusable systems. The true mastery lies not in the individual techniques, but in knowing when and how to combine them.`
				}}
				reflectionQuestions={[
					`How does thinking like a conductor help with component design?`,
					`When should you combine patterns vs keep them separate?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 33 (Evening)`,
					content: `The component symphony was magnificent! Dean Architectus showed me how Accordions, Menus, Forms, and Modals all perform together - each maintaining its own state while contributing to the greater whole. Binary calculated hundreds of possible interactions, yet the API remains simple. I've learned to combine Context, static properties, and flexible children handling into production-ready systems with proper accessibility and keyboard navigation. Architecture Level at ${architectureLevel}%! The Dean says I'm ready for Render Props next.`
				}}
				chapterEnding={[
					`Dean Architectus smiled proudly as the component symphony concluded. "You've mastered compound components - hiding complexity while providing flexibility. But there's another way to share behavior. Pattern Master Renderius awaits to teach you about Render Props..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;