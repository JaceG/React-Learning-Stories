import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterTwo = () => {
	const {
		addLogicProvider,
		addPresentationConsumer,
		selectedPattern,
		selectPattern,
		tradeoffBalance,
		setTradeoffBalance,
		flexibilityLevel
	} = useOutletContext();

	const [activeDemo, setActiveDemo] = useState('prop-getters');
	const [complexityWarning, setComplexityWarning] = useState(false);

	// Advanced delegation patterns
	const advancedPatterns = [
		{
			id: 'prop-getters',
			name: 'Prop Getters',
			description: 'Simplify integration with prop getter functions',
			complexity: 60
		},
		{
			id: 'state-reducer',
			name: 'State Reducer',
			description: 'Allow consumers to control state changes',
			complexity: 85
		},
		{
			id: 'control-props',
			name: 'Control Props',
			description: 'Support both controlled and uncontrolled modes',
			complexity: 75
		}
	];

	// Handle pattern selection and complexity
	const exploreAdvancedPattern = (pattern) => {
		selectPattern(pattern.id);
		setActiveDemo(pattern.id);
		
		// Add to logic providers
		addLogicProvider({
			id: pattern.id,
			name: pattern.name,
			type: 'advanced'
		});

		// Update tradeoff balance
		if (pattern.complexity > 70) {
			setComplexityWarning(true);
			setTradeoffBalance({ 
				flexibility: pattern.complexity, 
				simplicity: 100 - pattern.complexity 
			});
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Delegation Patterns`}
				bridge={`With basic render props understood, Pattern Master Renderius led Aria to the Advanced Delegation Laboratory. "It's more flexible than compound components," Aria noted, "but the consumer has to do more work." Renderius nodded. "Precisely why we have patterns like prop getters - they provide flexibility while reducing the burden on consumers."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Aria</strong> practiced different delegation patterns in the workshop. 
					"It's more flexible than compound components," she noted, "but the consumer 
					has to do more work."
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong>, perched nearby, observed: "But with great power 
					comes great responsibility. The consumer must handle more complexity."
				</p>

				<p className='story-paragraph'>
					<strong>Pattern Master Renderius</strong> nodded. "Precisely why we have 
					patterns like prop getters - they provide flexibility while reducing the 
					burden on consumers. Let me show you..."
				</p>

				<p className='story-paragraph'>
					He demonstrated three advanced patterns, each balancing flexibility and 
					ease of use differently. "Choose your pattern based on your consumers' needs."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Advanced Delegation Laboratory</h3>
				
				<InstructionBox character={`Renderius opens the Advanced Patterns Vault.`}>
					Explore the advanced delegation patterns - prop getters, state reducers, and 
					control props. Watch how the tradeoff balance shifts between flexibility and simplicity!
				</InstructionBox>
				
				<div className='separation-workshop'>
					<h4>Logic vs Presentation Separation</h4>
					
					<div className='workshop-panels'>
						<div className='logic-panel'>
							<h4>Logic Providers</h4>
							{advancedPatterns.map(pattern => (
								<div 
									key={pattern.id}
									className='logic-item'
									onClick={() => exploreAdvancedPattern(pattern)}>
									{pattern.name}
								</div>
							))}
						</div>
						
						<div className='presentation-panel'>
							<h4>Presentation Consumers</h4>
							<div className='presentation-item'>Custom Toggle UI</div>
							<div className='presentation-item'>Dropdown Menu</div>
							<div className='presentation-item'>Accordion Panel</div>
							<div className='presentation-item'>Modal Dialog</div>
						</div>
					</div>
				</div>

				{selectedPattern && (
					<div className='pattern-details'>
						<h4>Pattern: {selectedPattern.toUpperCase()}</h4>
						
						{activeDemo === 'prop-getters' && (
							<div className='prop-getters-demo'>
								<h5>Prop Getters Pattern</h5>
								<div className='getter-flow'>
									<div className='getter-step'>
										1. Component provides getter functions
									</div>
									<div className='getter-step'>
										2. Getters return props with correct handlers
									</div>
									<div className='getter-step'>
										3. Consumer spreads props - simple integration!
									</div>
								</div>
							</div>
						)}

						{activeDemo === 'state-reducer' && (
							<div className='state-reducer-demo'>
								<h5>State Reducer Pattern</h5>
								<p>Consumer can intercept and modify state changes:</p>
								<div className='reducer-controls'>
									<button className='reducer-button'>Default Behavior</button>
									<button className='reducer-button'>Custom Logic</button>
									<button className='reducer-button'>Prevent Change</button>
								</div>
							</div>
						)}

						{complexityWarning && (
							<div style={{ 
								background: '#fff3cd', 
								border: '1px solid #ffeaa7', 
								padding: '15px', 
								borderRadius: '8px',
								marginTop: '20px' 
							}}>
								⚠️ High complexity pattern - provides maximum flexibility but 
								requires more from consumers
							</div>
						)}
					</div>
				)}

				<div className='tradeoff-balance'>
					<h4>Flexibility vs Simplicity Tradeoff</h4>
					<div className='balance-visualization'>
						<div 
							className='flexibility-side' 
							style={{ width: `${tradeoffBalance.flexibility}%` }}>
							Flexibility {tradeoffBalance.flexibility}%
						</div>
						<div 
							className='simplicity-side' 
							style={{ width: `${tradeoffBalance.simplicity}%` }}>
							Simplicity {tradeoffBalance.simplicity}%
						</div>
					</div>
					<p style={{ textAlign: 'center', marginTop: '10px' }}>
						More flexibility = More complexity for consumers
					</p>
				</div>
			</div>

			<CodeExample
				title={`Advanced Render Prop Patterns`}
				discoveredBy={`Transcribed by Aria`}
				code={`// Advanced Render Prop Patterns

// 1. Prop Getters Pattern - Simplifying Integration
function useToggle(initialOn = false) {
  const [on, setOn] = useState(initialOn);
  const toggle = () => setOn(!on);
  
  // Prop getter functions
  const getTogglerProps = (props = {}) => ({
    ...props,
    onClick: (...args) => {
      props.onClick?.(...args);
      toggle();
    },
    'aria-pressed': on,
    role: 'button'
  });
  
  return { on, toggle, getTogglerProps };
}

// Simple usage with prop getters
function Toggle({ children }) {
  const toggle = useToggle();
  return children(toggle);
}

function App() {
  return (
    <Toggle>
      {({ on, getTogglerProps }) => (
        <>
          {/* Super simple - just spread! */}
          <button {...getTogglerProps()}>
            {on ? 'ON' : 'OFF'}
          </button>
          
          {/* With additional props */}
          <button 
            {...getTogglerProps({ 
              className: 'fancy-button',
              onClick: () => console.log('clicked!')
            })}>
            Custom Toggle
          </button>
        </>
      )}
    </Toggle>
  );
}

// 2. State Reducer Pattern - Ultimate Control
function useToggleWithReducer(initialOn = false, reducer = (s, a) => a) {
  const [{ on }, dispatch] = useReducer(
    (state, action) => {
      const changes = toggleReducer(state, action);
      return reducer(state, changes);
    },
    { on: initialOn }
  );
  
  const toggle = () => dispatch({ type: 'TOGGLE' });
  const setOn = () => dispatch({ type: 'SET_ON' });
  const setOff = () => dispatch({ type: 'SET_OFF' });
  
  return { on, toggle, setOn, setOff };
}

function toggleReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { on: !state.on };
    case 'SET_ON':
      return { on: true };
    case 'SET_OFF':
      return { on: false };
    default:
      return state;
  }
}

// 3. Control Props Pattern - Controlled/Uncontrolled
function Toggle({ on: controlledOn, onChange, children }) {
  const [uncontrolledOn, setUncontrolledOn] = useState(false);
  
  // Determine if controlled
  const isControlled = controlledOn !== undefined;
  const on = isControlled ? controlledOn : uncontrolledOn;
  
  const handleToggle = () => {
    if (!isControlled) {
      setUncontrolledOn(!on);
    }
    onChange?.(!on);
  };
  
  const getTogglerProps = (props = {}) => ({
    ...props,
    onClick: (...args) => {
      props.onClick?.(...args);
      handleToggle();
    },
    'aria-pressed': on
  });
  
  return children({ on, getTogglerProps });
}

// Can be used controlled or uncontrolled
function App() {
  const [on, setOn] = useState(false);
  
  return (
    <>
      {/* Controlled */}
      <Toggle on={on} onChange={setOn}>
        {({ on, getTogglerProps }) => (
          <button {...getTogglerProps()}>
            Controlled: {on ? 'ON' : 'OFF'}
          </button>
        )}
      </Toggle>
      
      {/* Uncontrolled */}
      <Toggle>
        {({ on, getTogglerProps }) => (
          <button {...getTogglerProps()}>
            Uncontrolled: {on ? 'ON' : 'OFF'}
          </button>
        )}
      </Toggle>
    </>
  );
}

// 4. Named Multiple Render Props
function DataTable({ 
  data, 
  renderHeader, 
  renderRow, 
  renderEmpty,
  renderFooter 
}) {
  if (data.length === 0) {
    return renderEmpty?.() || <div>No data</div>;
  }
  
  return (
    <table>
      {renderHeader && <thead>{renderHeader()}</thead>}
      <tbody>
        {data.map((item, index) => renderRow(item, index))}
      </tbody>
      {renderFooter && <tfoot>{renderFooter()}</tfoot>}
    </table>
  );
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Pattern Evolution:`,
					content: `Advanced render prop patterns evolved to address the complexity challenge. Prop getters make integration almost as simple as regular components. State reducers give power users complete control. Control props support both controlled and uncontrolled usage. The key is knowing your audience.`
				}}
				reflectionQuestions={[
					`How do you balance flexibility with ease of use?`,
					`When is too much flexibility a bad thing?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 34 (Afternoon)`,
					content: `Pattern Master Renderius showed me the advanced delegation patterns! Prop getters reduce boilerplate - just spread and you're done. State reducers let consumers intercept and control state changes for ultimate power. Control props support both controlled and uncontrolled modes. The tradeoff balance visualization really helped me understand: more flexibility means more complexity for consumers. Debuggora noted the patterns can even be combined!`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;