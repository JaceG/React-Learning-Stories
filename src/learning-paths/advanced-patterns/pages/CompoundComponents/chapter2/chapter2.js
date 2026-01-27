import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const {
		implicitConnections,
		createConnection,
		sharedState,
		updateSharedState,
		architectureLevel
	} = useOutletContext();

	const [selectedComponent, setSelectedComponent] = useState(null);
	const [contextFlow, setContextFlow] = useState([]);
	const [apiDesignMode, setApiDesignMode] = useState(false);

	// Simulate context flow visualization
	useEffect(() => {
		if (selectedComponent === 'accordion') {
			const flow = [
				{ id: 1, from: 'Accordion', to: 'Context', data: 'activeIndex' },
				{ id: 2, from: 'Context', to: 'AccordionItem', data: 'activeIndex' },
				{ id: 3, from: 'AccordionItem', to: 'Context', data: 'setActiveIndex' }
			];
			setContextFlow(flow);
		}
	}, [selectedComponent]);

	// Component examples for demonstration
	const componentExamples = [
		{
			id: 'accordion',
			name: 'Accordion System',
			icon: '🎹',
			parent: 'Accordion',
			children: ['AccordionItem', 'AccordionHeader', 'AccordionPanel']
		},
		{
			id: 'select',
			name: 'Select Component',
			icon: '📋',
			parent: 'Select',
			children: ['Option', 'OptionGroup', 'SelectTrigger']
		},
		{
			id: 'menu',
			name: 'Menu System',
			icon: '📜',
			parent: 'Menu',
			children: ['MenuItem', 'MenuDivider', 'SubMenu']
		}
	];

	// Handle component selection and connection creation
	const selectComponentSystem = (system) => {
		setSelectedComponent(system.id);
		
		// Create implicit connections
		system.children.forEach(child => {
			createConnection(system.parent, child);
		});
		
		// Update shared state
		updateSharedState(`${system.id}Active`, true);
		updateSharedState(`${system.id}Data`, { expanded: false, selected: null });
	};

	// Toggle API design mode
	const toggleApiDesign = () => {
		setApiDesignMode(!apiDesignMode);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Implicit Bond`}
				bridge={`With the basics understood, Dean Architectus revealed the deeper magic. "Watch how these components share state without explicit props," he demonstrated. A Select component and its Options communicated seamlessly through the Bonding Chamber.`}
			/>

		<StorySection
			paragraphs={[
				<><strong>Dean Architectus</strong> led Aria to the Bonding Chamber. "Watch how these components share state without explicit props," he demonstrated. A Select component and its Options communicated seamlessly.</>,
				<>"It's like the Grand Context," <strong>Aria</strong> observed, "but scoped to a component family!"</>,
				<>"Precisely! You're combining your Context knowledge with component design. This is true architectural thinking." The Dean waved his hand, and the implicit connections became visible - glowing threads of shared state.</>,
				<><strong>Binary</strong> computed rapidly. "The parent provides context, children consume it, but the API user sees none of this complexity. Elegant!"</>
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Implicit Communication Laboratory</h3>
				
				<InstructionBox character={`Dean Architectus unveils the Component Communication Patterns.`}>
					Click on different component systems to see how parent components provide context 
					and children consume it - all while keeping the API surface clean!
				</InstructionBox>
				
				<div className='composition-lab'>
					<div className='lab-title'>Component Communication Patterns</div>
					
					<div className='component-builder'>
						{componentExamples.map(example => (
							<div 
								key={example.id}
								className='builder-panel'
								onClick={() => selectComponentSystem(example)}>
								<h4>{example.icon} {example.name}</h4>
								<div className='component-slot'>
									<strong>{example.parent}</strong>
								</div>
								<div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
									{example.children.map(child => (
										<div key={child} className='component-piece'>
											{child}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				{selectedComponent && (
					<div className='communication-visualizer'>
						<h4>Context Flow Visualization</h4>
						<div className='comm-nodes'>
							<div className='comm-node'>Parent</div>
							<div className='comm-flow'></div>
							<div className='comm-node'>Context</div>
							<div className='comm-flow'></div>
							<div className='comm-node'>Children</div>
						</div>
						{contextFlow.length > 0 && (
							<div style={{ marginTop: '20px', textAlign: 'center' }}>
								<p>Data flowing: <code>{contextFlow[0]?.data}</code></p>
								<p>Connections: {implicitConnections.length}</p>
							</div>
						)}
					</div>
				)}

				<div className='interactive-demo'>
					<h4>API Design Workshop</h4>
					<div className='demo-controls'>
						<button 
							className='demo-button'
							onClick={toggleApiDesign}>
							{apiDesignMode ? 'Hide' : 'Show'} API Design Principles
						</button>
					</div>
					
					{apiDesignMode && (
						<div className='demo-output'>
							<h5>Compound Component API Design Rules:</h5>
							<ul>
								<li>✓ Components should be composable in any order</li>
								<li>✓ Parent manages state, children read/update it</li>
								<li>✓ Use static properties for better organization</li>
								<li>✓ Provide sensible defaults</li>
								<li>✓ Allow customization through props</li>
								<li>✓ Keep the API surface minimal</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title={`Advanced Compound Patterns`}
				discoveredBy={`Transcribed by Aria`}
				code={`// Advanced Compound Component Patterns

// 1. Using React.Children.map for flexible ordering
const Accordion = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  // Clone children with extra props
  const items = React.Children.map(children, (child, index) => {
    if (child.type === AccordionItem) {
      return React.cloneElement(child, {
        index,
        isActive: activeIndex === index,
        onToggle: () => setActiveIndex(index)
      });
    }
    return child;
  });
  
  return <div className="accordion">{items}</div>;
};

// 2. Static properties pattern
const Select = ({ children, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  
  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };
  
  return (
    <SelectContext.Provider value={{ isOpen, selected, handleSelect }}>
      <div className="select-container">{children}</div>
    </SelectContext.Provider>
  );
};

// Attach sub-components as static properties
Select.Trigger = function SelectTrigger({ children }) {
  const { isOpen, selected } = useContext(SelectContext);
  return (
    <button className="select-trigger">
      {children || selected?.label || 'Select...'}
    </button>
  );
};

Select.Options = function SelectOptions({ children }) {
  const { isOpen } = useContext(SelectContext);
  if (!isOpen) return null;
  return <div className="select-options">{children}</div>;
};

Select.Option = function SelectOption({ value, children }) {
  const { handleSelect } = useContext(SelectContext);
  return (
    <div 
      className="select-option"
      onClick={() => handleSelect({ value, label: children })}>
      {children}
    </div>
  );
};

// 3. Compound components with render props
const DataTable = ({ children, data }) => {
  const [sortBy, setSortBy] = useState(null);
  const [filterBy, setFilterBy] = useState('');
  
  const processedData = useMemo(() => {
    let result = [...data];
    if (filterBy) {
      result = result.filter(item => 
        JSON.stringify(item).includes(filterBy)
      );
    }
    if (sortBy) {
      result.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);
    }
    return result;
  }, [data, sortBy, filterBy]);
  
  return (
    <TableContext.Provider value={{ 
      data: processedData, 
      sortBy, 
      setSortBy, 
      filterBy, 
      setFilterBy 
    }}>
      <div className="data-table">{children}</div>
    </TableContext.Provider>
  );
};

// 4. Compound components with slots
const Card = ({ children }) => {
  // Extract specific children by type
  const header = React.Children.toArray(children)
    .find(child => child.type === Card.Header);
  const body = React.Children.toArray(children)
    .find(child => child.type === Card.Body);
  const footer = React.Children.toArray(children)
    .find(child => child.type === Card.Footer);
  
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      {body && <div className="card-body">{body}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

Card.Header = ({ children }) => children;
Card.Body = ({ children }) => children;
Card.Footer = ({ children }) => children;

// Usage example showing flexibility
function App() {
  return (
    <>
      {/* Order doesn't matter with slots */}
      <Card>
        <Card.Footer>
          <button>Save</button>
        </Card.Footer>
        <Card.Body>
          Content goes here
        </Card.Body>
        <Card.Header>
          <h3>Title</h3>
        </Card.Header>
      </Card>
      
      {/* Clean API with static properties */}
      <Select onChange={value => console.log(value)}>
        <Select.Trigger />
        <Select.Options>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Options>
      </Select>
    </>
  );
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Architecture Insight:`,
					content: `The power of compound components lies in their implicit communication. By using Context internally and React.Children for flexibility, we create components that are both powerful and pleasant to use. Static properties keep related components organized, while flexible child ordering ensures the API remains intuitive.`
				}}
				reflectionQuestions={[
					`How does hiding implementation details improve API design?`,
					`What are the trade-offs of implicit vs explicit communication?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 33 (Afternoon)`,
					content: `Dean Architectus led me to the Bonding Chamber where I learned the deeper magic of compound components. I discovered how to use React.Children.map for flexible ordering, static properties for clean organization, and Context for implicit state sharing. I created my first compound component - a Tabs system where Tab and TabPanel intuitively understand their relationships! Binary mapped the implicit connections, creating a beautiful visualization. The Dean's insight: "See how we hide complexity and expose simplicity? That's the goal."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;