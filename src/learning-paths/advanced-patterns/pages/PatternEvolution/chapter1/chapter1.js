import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const {
		renderDelegations,
		addDelegation,
		selectedPattern,
		selectPattern,
		flexibilityLevel
	} = useOutletContext();

	const [paintbrushHolder, setPaintbrushHolder] = useState(null);
	const [delegationActive, setDelegationActive] = useState(false);

	// Render prop patterns to explore
	const renderPatterns = [
		{
			id: 'basic-render',
			name: 'Basic Render Prop',
			icon: '🎨',
			complexity: 'Simple',
			description: 'Pass a function as a prop'
		},
		{
			id: 'children-function',
			name: 'Children as Function',
			icon: '👶',
			complexity: 'Common',
			description: 'Use children prop as render function'
		},
		{
			id: 'multiple-render',
			name: 'Multiple Render Props',
			icon: '🎭',
			complexity: 'Advanced',
			description: 'Multiple render functions for different parts'
		}
	];

	// Handle paintbrush delegation metaphor
	const delegatePaintbrush = (from, to) => {
		setPaintbrushHolder(to);
		setDelegationActive(true);
		
		addDelegation({
			id: Date.now(),
			from: from,
			to: to,
			type: 'render-control'
		});

		setTimeout(() => {
			setDelegationActive(false);
		}, 2000);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Render Delegation`}
			/>

		<StorySection
			paragraphs={[
				<><strong>Pattern Master Renderius</strong> introduced the next concept in a chamber filled with floating paintbrushes and blank canvases. "Compound components share state implicitly. Render props share behavior explicitly. Watch..."</>,
				<>He showed a component that delegated its rendering to its children. "It's like giving someone else your paintbrush but guiding their hand."</>,
				<><strong>Aria's</strong> eyes widened. "So the component provides the logic, but the consumer provides the UI?"</>,
				<>"Exactly!" Renderius smiled. "The logic provider says 'here's what's happening,' and the presentation consumer says 'here's how to show it.' Maximum flexibility, complete separation of concerns."</>
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Render Delegation Workshop</h3>
				
				<InstructionBox character={`Pattern Master Renderius hands you a magical paintbrush.`}>
					Click to see how render props delegate control. Watch the logic flow from 
					provider to consumer as the paintbrush passes between them!
				</InstructionBox>
				
				<div className='render-delegation-chamber'>
					<h4>The Paintbrush Metaphor</h4>
					
					<div className='delegation-visualizer'>
						<div className='delegation-flow'>
							<div className='logic-provider'>
								<h5>Logic Provider</h5>
								<p>Mouse Tracker</p>
								<button 
									className='delegation-button'
									onClick={() => delegatePaintbrush('Logic', 'Presentation')}>
									Pass Paintbrush →
								</button>
							</div>
							
							<div className='render-delegate'></div>
							
							<div className='presentation-consumer'>
								<h5>Presentation Consumer</h5>
								<p>{paintbrushHolder === 'Presentation' ? '🎨 Has Control!' : 'Waiting...'}</p>
							</div>
						</div>
						
						{delegationActive && (
							<p style={{ textAlign: 'center', color: '#fd79a8', marginTop: '20px' }}>
								Logic: "Here's the mouse position (x, y)"<br/>
								Presentation: "I'll draw a custom cursor!"
							</p>
						)}
					</div>
				</div>

				<div className='pattern-showcase'>
					<h4>Render Prop Patterns</h4>
					<div className='render-patterns'>
						{renderPatterns.map(pattern => (
							<div
								key={pattern.id}
								className={`render-pattern-card ${selectedPattern === pattern.id ? 'selected' : ''}`}
								onClick={() => selectPattern(pattern.id)}>
								<span className='pattern-icon'>{pattern.icon}</span>
								<div className='pattern-name'>{pattern.name}</div>
								<div className='pattern-complexity'>
									Complexity: {pattern.complexity}
								</div>
								<div className='pattern-description'>{pattern.description}</div>
							</div>
						))}
					</div>
				</div>

				<div className='flexibility-meter'>
					<h4>Flexibility Level</h4>
					<div className='flexibility-bar'>
						<div 
							className='flexibility-fill' 
							style={{ width: `${Math.min(flexibilityLevel, 100)}%` }}>
							<span>{flexibilityLevel}%</span>
						</div>
					</div>
					<p>Explore patterns to increase component flexibility!</p>
				</div>
			</div>

			<CodeExample
				title={`Render Props Fundamentals`}
				discoveredBy={`Transcribed by Aria`}
				code={`// Render Props Pattern - Separation of Concerns

// 1. Basic Render Prop Pattern
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };
  
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {/* Delegate rendering to the consumer */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage - Consumer controls presentation
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div>
          <h1>Mouse position: ({x}, {y})</h1>
          <div 
            style={{
              position: 'absolute',
              left: x - 10,
              top: y - 10,
              width: 20,
              height: 20,
              background: 'red',
              borderRadius: '50%'
            }}
          />
        </div>
      )}
    />
  );
}

// 2. Children as Function Pattern (more common)
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  
  // Children is a function that receives state and helpers
  return children({ on, toggle });
}

// Clean usage
function App() {
  return (
    <Toggle>
      {({ on, toggle }) => (
        <>
          <button onClick={toggle}>
            {on ? 'ON' : 'OFF'}
          </button>
          {on && <div>The light is on! 💡</div>}
        </>
      )}
    </Toggle>
  );
}

// 3. Multiple Render Props for Complex UIs
function DataFetcher({ renderSuccess, renderError, renderLoading, url }) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error }));
  }, [url]);
  
  if (state.loading) return renderLoading();
  if (state.error) return renderError(state.error);
  return renderSuccess(state.data);
}

// Flexible usage with custom UI for each state
<DataFetcher
  url="/api/users"
  renderLoading={() => <Spinner />}
  renderError={(error) => <ErrorMessage error={error} />}
  renderSuccess={(users) => <UserList users={users} />}
/>

// 4. Render Props with Hooks (Modern approach)
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return position;
}

// Component that uses render prop pattern with hooks
function WithMouse({ children }) {
  const mousePosition = useMousePosition();
  return children(mousePosition);
}

// Benefits of Render Props:
// 1. Maximum flexibility in rendering
// 2. Logic reuse without UI coupling
// 3. Dynamic composition
// 4. Inversion of control
// 5. Testable logic separate from UI`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Pattern Master Renderius`,
						description: `Expert in delegation patterns and flexible APIs. His philosophy: "True power comes from letting go of control. Provide the what, let others decide the how. This is the path to truly reusable components."`
					}
				]}
				lessonInsight={{
					title: `The Delegation Lesson:`,
					content: `Render props represent the ultimate in component flexibility. By separating what happens (logic) from how it looks (presentation), we create components that can adapt to any UI requirement. Unlike compound components which provide a complete system, render props provide just the behavior, letting consumers bring their own presentation.`
				}}
				reflectionQuestions={[
					`When would you choose render props over compound components?`,
					`What are the trade-offs of maximum flexibility?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 34 (Morning)`,
					content: `Pattern Master Renderius introduced me to render props - a completely different approach from compound components! Instead of implicit state sharing, render props share behavior explicitly. It's like giving someone else your paintbrush but guiding their hand. The logic provider says "here's what's happening," and the consumer decides how to show it. I explored patterns like MouseTracker and Toggle - the same logic can power infinite UIs! Flexibility Level at ${flexibilityLevel}%.`
				}}
			/>
		</div>
	);
};

export default ChapterOne;