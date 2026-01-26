import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const {
		animationTechniques,
		learnTechnique,
		currentDojo,
		focusDojo,
		monasteryStage,
		evolve
	} = useOutletContext();

	const [selectedConcept, setSelectedConcept] = useState(null);
	const [understandingLevel, setUnderstandingLevel] = useState(0);

	// Animation fundamentals
	const animationConcepts = [
		{
			id: 'transitions',
			name: 'CSS Transitions',
			icon: '🔄',
			description: 'Simple property changes over time',
			example: 'transition: all 0.3s ease',
			complexity: 'Basic'
		},
		{
			id: 'keyframes',
			name: 'CSS Animations',
			icon: '🎬',
			description: 'Complex multi-step animations',
			example: '@keyframes slide { from {} to {} }',
			complexity: 'Intermediate'
		},
		{
			id: 'js-animations',
			name: 'JavaScript Animations',
			icon: '📜',
			description: 'Programmatic control over motion',
			example: 'requestAnimationFrame()',
			complexity: 'Advanced'
		},
		{
			id: 'physics',
			name: 'Physics-Based Motion',
			icon: '🌊',
			description: 'Natural movement with spring physics',
			example: 'Spring animations, easing curves',
			complexity: 'Advanced'
		}
	];

	// React animation challenges
	const reactChallenges = [
		{
			challenge: 'Component Lifecycle',
			issue: 'Components unmount immediately',
			solution: 'Animation libraries handle exit animations'
		},
		{
			challenge: 'State Synchronization',
			issue: 'Animations out of sync with state',
			solution: 'Declarative animation APIs'
		},
		{
			challenge: 'Performance',
			issue: 'Re-renders interrupt animations',
			solution: 'Optimized animation runtime'
		},
		{
			challenge: 'Gesture Integration',
			issue: 'Complex gesture handling',
			solution: 'Built-in gesture recognition'
		}
	];

	// Animation principles
	const animationPrinciples = [
		{
			principle: 'Timing',
			description: 'Duration affects perception of weight and importance'
		},
		{
			principle: 'Easing',
			description: 'Acceleration and deceleration create natural motion'
		},
		{
			principle: 'Anticipation',
			description: 'Prepare users for what\'s about to happen'
		},
		{
			principle: 'Follow-through',
			description: 'Elements don\'t stop abruptly'
		}
	];

	// Learn a concept
	const studyConcept = (concept) => {
		setSelectedConcept(concept);
		learnTechnique(concept);
		setUnderstandingLevel(prev => Math.min(100, prev + 25));
		
		if (animationTechniques.length >= 3) {
			evolve('enlightened');
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Motion Monastery`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Motion Monastery moved constantly - walls shifted, decorations 
					danced, everything flowed. <strong>Animation Abbess Motia</strong> 
					greeted Aria with a gesture that left glowing trails in the air.
				</p>

				<p className='story-paragraph'>
					"Welcome, Ambassador Aria, to where static UIs come to life. Users 
					expect fluid, responsive interfaces. Animation isn't decoration - 
					it's communication."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong>'s circuits sparkled with excitement. "This 
					place makes my processors happy! Look at all the smooth transitions!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> observed the flowing motions. "Beautiful, 
					but smooth animation requires careful performance management. Too much 
					motion can overwhelm."
				</p>

				<p className='story-paragraph'>
					Abbess Motia nodded. "Exactly. Animation must serve purpose: guide 
					attention, provide feedback, and create delight without distraction."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Animation Fundamentals</h3>
				
				<InstructionBox character={`Abbess Motia demonstrates the fundamentals.`}>
					Learn the core animation concepts: timing functions, transforms, and 
					transitions. Practice each technique to build your foundation!
				</InstructionBox>
				
				<div className='monastery-entrance'>
					<h4>The Path to Motion Mastery</h4>
					<div className='animation-dojos'>
						{animationConcepts.map(concept => (
							<div
								key={concept.id}
								className={`dojo-card ${
									selectedConcept?.id === concept.id ? 'selected' : ''
								}`}
								onClick={() => studyConcept(concept)}
								style={{ '--dojo-color': '#f093fb' }}>
								<span className='dojo-icon'>{concept.icon}</span>
								<div className='dojo-name'>{concept.name}</div>
								<div className='dojo-philosophy'>{concept.description}</div>
								{selectedConcept?.id === concept.id && (
									<div style={{ 
										marginTop: '15px',
										padding: '10px',
										background: 'rgba(240, 147, 251, 0.2)',
										borderRadius: '5px',
										fontSize: '0.9em'
									}}>
										<code>{concept.example}</code>
										<div style={{ marginTop: '5px', color: '#f093fb' }}>
											Complexity: {concept.complexity}
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='understanding-progress' style={{ marginTop: '30px' }}>
					<h4>Understanding Progress</h4>
					<div style={{
						background: 'rgba(255, 255, 255, 0.1)',
						height: '20px',
						borderRadius: '10px',
						overflow: 'hidden'
					}}>
						<div style={{
							width: `${understandingLevel}%`,
							height: '100%',
							background: 'linear-gradient(90deg, #f093fb, #f5576c)',
							transition: 'width 0.5s ease'
						}} />
					</div>
					<p style={{ marginTop: '10px', textAlign: 'center' }}>
						{understandingLevel < 100 
							? 'Study more concepts to deepen understanding...'
							: 'You grasp the fundamentals of web animation!'}
					</p>
				</div>

				<div className='react-challenges' style={{ marginTop: '40px' }}>
					<h4>React Animation Challenges</h4>
					<table className='comparison-table'>
						<thead>
							<tr>
								<th>Challenge</th>
								<th>Issue</th>
								<th>Solution</th>
							</tr>
						</thead>
						<tbody>
							{reactChallenges.map((item, index) => (
								<tr key={index}>
									<td><strong>{item.challenge}</strong></td>
									<td style={{ color: '#e74c3c' }}>{item.issue}</td>
									<td style={{ color: '#27ae60' }}>{item.solution}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='animation-principles' style={{ marginTop: '40px' }}>
					<h4>The Four Pillars of Motion</h4>
					<div className='animation-patterns'>
						{animationPrinciples.map((item, index) => (
							<div key={index} className='pattern-card'>
								<div className='pattern-title'>{item.principle}</div>
								<div className='pattern-description'>{item.description}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<CodeExample
				title={`Animation Foundations in React`}
				discoveredBy={`Abbess Motia's Wisdom`}
				code={`// Understanding Animation in React

// 1. The CSS Approach
// Simple but limited
.element {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.element.active {
  transform: translateX(100px);
  opacity: 0.5;
}

// React Component
function SimpleAnimation() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div 
      className={\`element \${isActive ? 'active' : ''}\`}
      onClick={() => setIsActive(!isActive)}
    >
      Click me!
    </div>
  );
}

// 2. CSS Keyframes
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-element {
  animation: slideIn 0.5s ease-out forwards;
}

// 3. The Problem with Unmounting
// This won't animate out!
function BadExample() {
  const [show, setShow] = useState(true);
  
  return (
    <>
      {show && (
        <div className="fade-in">
          I disappear instantly!
        </div>
      )}
      <button onClick={() => setShow(!show)}>Toggle</button>
    </>
  );
}

// 4. JavaScript Animation Basics
function JSAnimation() {
  const elementRef = useRef(null);
  
  const animate = () => {
    let start = null;
    const duration = 1000; // 1 second
    
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      
      if (progress < 1) {
        const x = progress * 100;
        elementRef.current.style.transform = \`translateX(\${x}px)\`;
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  };
  
  return (
    <div ref={elementRef} onClick={animate}>
      Click to animate!
    </div>
  );
}

// 5. Performance Considerations
// BAD: Animating properties that trigger layout
.bad-animation {
  transition: width 0.3s, height 0.3s; /* Causes reflow */
}

// GOOD: Animating compositor-only properties
.good-animation {
  transition: transform 0.3s, opacity 0.3s; /* GPU accelerated */
}

// 6. React-Specific Challenges

// Challenge 1: State updates during animation
function AnimationChallenge() {
  const [position, setPosition] = useState(0);
  
  // This causes janky animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(p => p + 1); // Re-render every frame!
    }, 16);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div style={{ transform: \`translateX(\${position}px)\` }} />;
}

// Challenge 2: Coordinating multiple elements
function CoordinationChallenge() {
  const [items, setItems] = useState([1, 2, 3]);
  
  // How to stagger animations?
  // How to animate items leaving?
  // How to handle interruptions?
  
  return (
    <div>
      {items.map(item => (
        <div key={item} className="item">
          Item {item}
        </div>
      ))}
    </div>
  );
}

// 7. Why Animation Libraries?

// They solve:
// - Exit animations (components can animate out)
// - Gesture integration (drag, swipe, pinch)
// - Performance optimization (batching, GPU acceleration)
// - Complex orchestration (sequences, staggering)
// - Interruption handling (smooth transitions between states)
// - Spring physics (natural motion)

// 8. Accessibility Considerations
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function AccessibleAnimation({ children }) {
  if (prefersReducedMotion) {
    return children; // No animation
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// 9. Animation Performance Tips
// - Use transform and opacity (GPU accelerated)
// - Avoid animating layout properties (width, height, padding)
// - Use will-change sparingly
// - Batch DOM reads/writes
// - Use CSS containment
// - Profile with DevTools

// 10. Common Animation Patterns
// Fade In/Out
// Slide In/Out
// Scale
// Rotate
// Morph/Transform
// Parallax
// Reveal on scroll
// Hover effects
// Loading states
// Page transitions`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Animation Abbess Motia`,
						description: `Master of motion and guardian of the Motion Monastery. Her philosophy: "Every animation tells a story. Make it meaningful, make it smooth, make it accessible. Motion is the bridge between intention and understanding."`
					}
				]}
				lessonInsight={{
					title: `The Motion Insight:`,
					content: `Animation in React requires understanding both browser animation capabilities and React's component lifecycle. CSS animations excel at simple transitions but struggle with dynamic content. The key challenge is React's immediate unmounting, which prevents exit animations. Animation libraries solve this with declarative APIs matching React's programming model.`
				}}
				reflectionQuestions={[
					`When does animation enhance vs. distract?`,
					`How do performance constraints shape animation choices?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 40 (Morning)`,
					content: `Arrived at the Motion Monastery floating above the clouds! Animation Abbess Motia greeted me with trails of light following her gestures: "Every animation tells a story." I learned the fundamentals: CSS transitions (simple but limited), timing functions (ease, linear, spring), and the biggest challenge - React unmounts components immediately, preventing exit animations! Animation libraries solve: exit animations, gesture integration, performance optimization, complex orchestration, spring physics. ${animationTechniques.length} techniques learned! Performance tips: Use transform/opacity (GPU accelerated), avoid layout properties (width/height). Accessibility matters too: prefers-reduced-motion!`
				}}
			/>
		</div>
	);
};

export default ChapterOne;