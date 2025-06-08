import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const {
		componentFamily,
		addToFamily,
		selectedPattern,
		selectPattern,
		architectureLevel
	} = useOutletContext();

	const [highlightedComponent, setHighlightedComponent] = useState(null);
	const [exploringPattern, setExploringPattern] = useState(false);

	// Component patterns to explore
	const compoundPatterns = [
		{
			id: 'tabs',
			name: 'Tabs Pattern',
			icon: '📑',
			description: 'Tab & TabPanel work together',
			components: ['Tabs', 'Tab', 'TabPanel']
		},
		{
			id: 'accordion',
			name: 'Accordion Pattern',
			icon: '🎹',
			description: 'Accordion sections expand/collapse',
			components: ['Accordion', 'AccordionItem', 'AccordionPanel']
		},
		{
			id: 'select',
			name: 'Select Pattern',
			icon: '📝',
			description: 'Select & Options communicate',
			components: ['Select', 'Option', 'OptionGroup']
		}
	];

	// Handle pattern exploration
	const explorePattern = (pattern) => {
		selectPattern(pattern.id);
		setExploringPattern(true);
		
		// Add components to family
		pattern.components.forEach((comp, index) => {
			setTimeout(() => {
				addToFamily({
					id: `${pattern.id}-${comp}`,
					name: comp,
					type: index === 0 ? 'parent' : 'child'
				});
			}, index * 500);
		});
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Architect's Invitation
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					A golden scroll arrived at <strong>Aria's</strong> quarters, sealed with 
					the mark of the Architect's Academy. The message was brief but momentous: 
					"Guide Aria, your mastery of React's fundamentals, performance, and quality 
					has not gone unnoticed. The Pattern Masters invite you to learn the highest 
					architectural arts."
				</p>

				<p className='story-paragraph'>
					The Architect's Academy floated above the kingdom - a crystalline structure 
					that seemed to shift and reconfigure itself constantly. <strong>Dean Architectus</strong> 
					greeted Aria at the entrance, his robes decorated with component diagrams.
				</p>

				<p className='story-paragraph'>
					"Welcome, Aria. Here we teach not just how to build components, but how to 
					compose them into elegant architectures. Your first lesson: Compound Components - 
					the art of components that work as one."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> scanned the academy. "Aria, the components here... 
					they're communicating in ways I've never seen!"
				</p>

				<div className='character-intro-card'>
					<h4>Dean Architectus</h4>
					<p>Master of architectural patterns and component composition. His philosophy: 
					"The most elegant code is not clever - it's clear. Compound components hide 
					complexity while providing intuitive APIs that developers love to use."</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Component Composition Laboratory</h3>
				
				<div className='architects-academy'>
					<h4>Pattern Explorer</h4>
					<p>Click on a pattern to see how compound components work together:</p>
					
					<div className='pattern-cards'>
						{compoundPatterns.map(pattern => (
							<div
								key={pattern.id}
								className={`pattern-card ${selectedPattern === pattern.id ? 'selected' : ''}`}
								onClick={() => explorePattern(pattern)}
								onMouseEnter={() => setHighlightedComponent(pattern.id)}
								onMouseLeave={() => setHighlightedComponent(null)}>
								<span className='pattern-icon'>{pattern.icon}</span>
								<div className='pattern-name'>{pattern.name}</div>
								<div className='pattern-description'>{pattern.description}</div>
							</div>
						))}
					</div>
				</div>

				{selectedPattern && (
					<div className='component-family'>
						<h4>Component Family: {selectedPattern.toUpperCase()}</h4>
						<div className='family-tree'>
							{componentFamily.filter(c => c.id.startsWith(selectedPattern)).map((component, index) => (
								component.type === 'parent' ? (
									<div key={component.id} className='family-parent'>
										{component.name}
									</div>
								) : null
							))}
							<div className='family-children'>
								{componentFamily.filter(c => c.id.startsWith(selectedPattern) && c.type === 'child').map(component => (
									<div key={component.id} className='family-child'>
										{component.name}
									</div>
								))}
							</div>
						</div>
						{componentFamily.length > 0 && (
							<p style={{ textAlign: 'center', color: '#6c5ce7', marginTop: '20px' }}>
								These components share an implicit understanding!
							</p>
						)}
					</div>
				)}

				<div className='architecture-meter'>
					<h4>Architecture Understanding</h4>
					<div className='architecture-bar'>
						<div 
							className='architecture-fill' 
							style={{ width: `${Math.min(architectureLevel, 100)}%` }}>
							<span className='architecture-percentage'>{architectureLevel}%</span>
						</div>
					</div>
					<p>Explore patterns to increase your architectural knowledge!</p>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Introduction to Compound Components</span>
				</div>
				<div className='code-example'>
					<pre>{`// Compound Components Pattern
// Components that work together as a cohesive unit

// Traditional approach - prop drilling
function TraditionalTabs({ activeTab, onChange, tabs }) {
  return (
    <div>
      {tabs.map((tab, index) => (
        <button 
          key={tab.id}
          onClick={() => onChange(index)}
          className={activeTab === index ? 'active' : ''}>
          {tab.label}
        </button>
      ))}
      <div className="panel">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

// Compound Component approach - implicit communication
function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
}

function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  
  return (
    <button
      className={activeIndex === index ? 'tab active' : 'tab'}
      onClick={() => setActiveIndex(index)}>
      {children}
    </button>
  );
}

function TabPanel({ index, children }) {
  const { activeIndex } = useContext(TabsContext);
  
  if (activeIndex !== index) return null;
  
  return <div className="tab-panel">{children}</div>;
}

// Usage - Clean and intuitive!
function App() {
  return (
    <Tabs>
      <div className="tab-list">
        <Tab index={0}>Profile</Tab>
        <Tab index={1}>Settings</Tab>
        <Tab index={2}>Messages</Tab>
      </div>
      
      <TabPanel index={0}>
        <ProfileContent />
      </TabPanel>
      <TabPanel index={1}>
        <SettingsContent />
      </TabPanel>
      <TabPanel index={2}>
        <MessagesContent />
      </TabPanel>
    </Tabs>
  );
}

// Benefits of Compound Components:
// 1. Flexible markup structure
// 2. No prop drilling
// 3. Intuitive API
// 4. Components "just work" together
// 5. Easy to extend and customize`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Architectus explains:</strong> "Notice how Tab and TabPanel don't need 
					explicit props to communicate? They share state through context, but the API 
					user doesn't need to know that. The implementation is hidden, the interface 
					is clean."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Compound Lesson:</h3>
				<p>
					Compound components are like a family that shares an implicit understanding. 
					Dean Architectus teaches that the most elegant APIs hide complexity while 
					providing flexibility - components that just "know" how to work together.
				</p>
				<p>
					Unlike traditional prop drilling where parent components must orchestrate 
					everything, compound components distribute responsibility. Each component 
					manages its own concern while staying connected to the family's shared state.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Component Architecture</h3>
				<p>
					<strong>How do compound components improve developer experience compared to 
					prop drilling?</strong> Consider the difference between configuring every detail 
					versus components that intuitively understand their relationships.
				</p>
				<p>
					<strong>When would you choose compound components over simple component 
					composition?</strong> Think about flexibility needs, API design, and whether 
					components truly belong together as a family.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As Aria watched the component families communicate seamlessly, Dean Architectus 
					smiled. "You're beginning to see the elegance. Tomorrow, we'll explore the 
					implicit bonds that make this magic possible - diving deep into Context and 
					flexible APIs..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;