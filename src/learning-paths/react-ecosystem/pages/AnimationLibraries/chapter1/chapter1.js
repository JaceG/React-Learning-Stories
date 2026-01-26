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

// 1. CSS Transitions (Simple)
.element { transition: transform 0.3s ease; }
.element.active { transform: translateX(100px); }
<div className={\`element \${isActive ? 'active' : ''}\`}>

// 2. The Unmounting Problem - CSS can't animate exit!
{show && <div className="fade-in">I disappear instantly!</div>}

// 3. Performance - GOOD vs BAD
.bad { transition: width 0.3s; }       // Causes reflow
.good { transition: transform 0.3s; }  // GPU accelerated

// 4. React Challenges:
// - State updates each frame = janky animation
// - Coordinating multiple elements
// - Exit animations

// 5. Why Animation Libraries?
// ✅ Exit animations | ✅ Gesture integration
// ✅ GPU acceleration | ✅ Spring physics
// ✅ Orchestration | ✅ Interruption handling

// 6. Accessibility
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return children; // Skip animations

// 7. Common Patterns: Fade, Slide, Scale, Rotate, Parallax, Page transitions`}
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