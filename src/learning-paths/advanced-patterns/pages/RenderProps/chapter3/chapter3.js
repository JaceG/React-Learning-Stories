import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterThree = () => {
	const {
		renderDelegations,
		logicProviders,
		presentationConsumers,
		flexibilityLevel,
		tradeoffBalance,
		resetPatterns
	} = useOutletContext();

	const [comparisonMode, setComparisonMode] = useState(false);
	const [masterExample, setMasterExample] = useState('modal');
	const [patternShowcase, setPatternShowcase] = useState(false);

	// Pattern comparison data
	const patternComparison = [
		{
			pattern: 'Compound Components',
			flexibility: 40,
			simplicity: 80,
			useCase: 'Component families with fixed relationships'
		},
		{
			pattern: 'Render Props',
			flexibility: 90,
			simplicity: 30,
			useCase: 'Maximum UI flexibility with shared logic'
		},
		{
			pattern: 'Hooks',
			flexibility: 70,
			simplicity: 70,
			useCase: 'Modern React with composition'
		}
	];

	// Complete examples
	const completeExamples = [
		{
			id: 'modal',
			name: 'Flexible Modal',
			icon: '🎭',
			description: 'Modal with customizable everything'
		},
		{
			id: 'autocomplete',
			name: 'Autocomplete',
			icon: '🔍',
			description: 'Search with custom result rendering'
		},
		{
			id: 'animation',
			name: 'Animation Controller',
			icon: '🎬',
			description: 'Animate anything with shared logic'
		},
		{
			id: 'data-fetcher',
			name: 'Data Fetcher',
			icon: '📊',
			description: 'Fetch data, render any UI'
		}
	];

	// Start pattern showcase
	const startShowcase = () => {
		setPatternShowcase(true);
		let delay = 0;
		
		completeExamples.forEach(example => {
			setTimeout(() => {
				setMasterExample(example.id);
			}, delay);
			delay += 2000;
		});
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Render Mastery`}
				bridge={`"You understand the trade-offs," Pattern Master Renderius said, gathering all the delegation examples. "Compound components for intuitive APIs, render props for maximum flexibility. Both have their place in the architect's toolkit." Time to see render props in their full glory.`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Pattern Master Renderius</strong> gathered all the delegation 
					examples. "You understand the trade-offs. Compound components for intuitive 
					APIs, render props for maximum flexibility. Both have their place in the 
					architect's toolkit."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> demonstrated her mastery by creating components that 
					supported both patterns. "I can provide a default UI with compound components, 
					but allow render prop overrides for customization!"
				</p>

				<p className='story-paragraph'>
					"Brilliant!" Renderius exclaimed. "You're thinking like a true architect - 
					not choosing between patterns, but combining them purposefully."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> displayed the statistics: "Render props: maximum 
					flexibility, higher complexity. Compound components: intuitive API, less 
					flexible. The choice depends on your users' needs."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Render Props Mastery Showcase</h3>
				
				<InstructionBox character={`Pattern Master Renderius presents the Showcase Gallery.`}>
					Explore complete render prop implementations - Modal, Autocomplete, Animation 
					Controller, and Data Fetcher. Start the showcase to see them all in action!
				</InstructionBox>
				
				<div className='render-delegation-chamber'>
					<h4>Complete Render Prop Examples</h4>
					
					<div className='render-patterns'>
						{completeExamples.map(example => (
							<div
								key={example.id}
								className={`render-pattern-card ${masterExample === example.id ? 'selected' : ''}`}
								onClick={() => setMasterExample(example.id)}>
								<span className='pattern-icon'>{example.icon}</span>
								<div className='pattern-name'>{example.name}</div>
								<div className='pattern-description'>{example.description}</div>
							</div>
						))}
					</div>
					
					{!patternShowcase && (
						<button 
							className='showcase-button'
							onClick={startShowcase}
							style={{
								display: 'block',
								margin: '20px auto',
								padding: '12px 24px',
								fontSize: '18px',
								background: '#fd79a8',
								color: 'white',
								border: 'none',
								borderRadius: '8px',
								cursor: 'pointer'
							}}>
							🎨 Start Render Props Showcase
						</button>
					)}
				</div>

				<div className='pattern-comparison'>
					<h4>Pattern Comparison</h4>
					<button 
						className='comparison-toggle'
						onClick={() => setComparisonMode(!comparisonMode)}>
						{comparisonMode ? 'Hide' : 'Show'} Pattern Comparison
					</button>
					
					{comparisonMode && (
						<div className='comparison-grid'>
							{patternComparison.map(item => (
								<div key={item.pattern} className='comparison-item'>
									<h5>{item.pattern}</h5>
									<div className='comparison-bars'>
										<div className='bar-item'>
											<span>Flexibility</span>
											<div className='bar'>
												<div 
													className='bar-fill flexibility'
													style={{ width: `${item.flexibility}%` }}
												/>
											</div>
										</div>
										<div className='bar-item'>
											<span>Simplicity</span>
											<div className='bar'>
												<div 
													className='bar-fill simplicity'
													style={{ width: `${item.simplicity}%` }}
												/>
											</div>
										</div>
									</div>
									<p className='use-case'>{item.useCase}</p>
								</div>
							))}
						</div>
					)}
				</div>

				{patternShowcase && (
					<div className='mastery-summary'>
						<h4>Render Props Mastery Summary</h4>
						<ul>
							<li>✓ {renderDelegations.length} delegation patterns learned</li>
							<li>✓ {logicProviders.length} logic providers created</li>
							<li>✓ Maximum flexibility achieved: {flexibilityLevel}%</li>
							<li>✓ Trade-offs understood and balanced</li>
						</ul>
					</div>
				)}
			</div>

			<CodeExample
				title={`Production Render Props Examples`}
				discoveredBy={`Transcribed by Aria`}
				code={`// Production-Ready Render Props Components

// 1. Flexible Modal with Render Props
function Modal({ isOpen, onClose, renderHeader, renderContent, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  const content = children || renderContent;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {renderHeader?.({ onClose })}
        {typeof content === 'function' ? content({ onClose }) : content}
      </div>
    </div>,
    document.body
  );
}

// 2. Animation Controller - Animate anything!
function SpringAnimation({ from, to, config, children }) {
  const [value, setValue] = useState(from);
  // Spring physics animation logic...
  return children({ value, progress: (value - from) / (to - from) });
}

<SpringAnimation from={0} to={100}>
  {({ value, progress }) => (
    <div style={{ transform: \`translateX(\${value}px)\`, opacity: progress }}>
      Animated content!
    </div>
  )}
</SpringAnimation>

// 3. Combining Patterns - Best of Both Worlds
function Toggle({ on: controlledOn, onChange, children }) {
  const [uncontrolledOn, setUncontrolledOn] = useState(false);
  const on = controlledOn ?? uncontrolledOn;
  
  // Support BOTH render prop AND compound component APIs!
  if (typeof children === 'function') {
    return children({ on, toggle, getTogglerProps });
  }
  return (
    <ToggleContext.Provider value={{ on, toggle, getTogglerProps }}>
      {children}
    </ToggleContext.Provider>
  );
}`}
			/>

			{flexibilityLevel >= 80 && (
				<div className='achievement-banner'>
					<h4>🎨 Render Props Mastery Achieved! 🎨</h4>
					<p>You've mastered the art of delegation!</p>
					<ul style={{ listStyle: 'none', padding: 0 }}>
						<li>✓ Basic render props understood</li>
						<li>✓ Advanced patterns mastered</li>
						<li>✓ Trade-offs balanced</li>
						<li>✓ Production examples implemented</li>
						<li>✓ Flexibility Level: {flexibilityLevel}%</li>
					</ul>
				</div>
			)}

			<ChapterSummary
				lessonInsight={{
					title: `The Render Props Mastery:`,
					content: `Render props shine when you need maximum flexibility. They're perfect for libraries where you can't predict how consumers will want to render UI. Modern React often uses hooks instead for sharing logic, but render props remain valuable for delegating rendering control. The best architects know both patterns and choose based on the specific need.`
				}}
				reflectionQuestions={[
					`When would render props be preferred over hooks?`,
					`How can you combine patterns to support multiple API styles?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 34 (Evening)`,
					content: `Pattern Master Renderius showed me production-ready render prop implementations! I built a Flexible Modal that supports both render props and children function APIs, an Animation Controller using spring physics, and even combined patterns to support both render prop AND compound component APIs! The comparison chart was enlightening: Compound Components = intuitive APIs (flexibility 40%, simplicity 80%), Render Props = maximum flexibility (flexibility 90%, simplicity 30%), Hooks = modern balance (flexibility 70%, simplicity 70%). Flexibility Level at ${flexibilityLevel}%!`
				}}
				chapterEnding={[
					`Pattern Master Renderius applauded as Aria demonstrated her mastery. "You've learned when to hold control and when to delegate it. Render props are powerful, but they're not the only pattern for sharing behavior. Forge Master Enhance awaits to teach you about Higher-Order Components..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;