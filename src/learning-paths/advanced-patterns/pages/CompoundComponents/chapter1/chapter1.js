import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

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
			<ChapterIntro
				chapterNumber={1}
				title={`The Architect's Invitation`}
			/>

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
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Component Composition Laboratory</h3>
				
				<InstructionBox character={`Dean Architectus gestures to the Pattern Explorer.`}>
					Click on a pattern to see how compound components work together. Watch as the 
					component family forms and implicit connections are established!
				</InstructionBox>
				
				<div className='architects-academy'>
					<h4>Pattern Explorer</h4>
					
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

			<CodeExample
				title={`Introduction to Compound Components`}
				discoveredBy={`Transcribed by Aria`}
				code={`// Compound Components Pattern
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
// 5. Easy to extend and customize`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Dean Architectus`,
						description: `Master of architectural patterns and component composition. His philosophy: "The most elegant code is not clever - it's clear. Compound components hide complexity while providing intuitive APIs that developers love to use."`
					}
				]}
				lessonInsight={{
					title: `The Compound Lesson:`,
					content: `Compound components are like a family that shares an implicit understanding. Dean Architectus teaches that the most elegant APIs hide complexity while providing flexibility - components that just "know" how to work together. Unlike traditional prop drilling where parent components must orchestrate everything, compound components distribute responsibility.`
				}}
				reflectionQuestions={[
					`How do compound components improve developer experience compared to prop drilling?`,
					`When would you choose compound components over simple component composition?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 33 (Morning)`,
					content: `Received an invitation to the Architect's Academy! Dean Architectus welcomed me to learn the highest architectural arts. My first lesson: Compound Components - the art of components that work as one. I explored patterns like Tabs, Accordions, and Selects - all demonstrating how component families communicate through implicit understanding rather than explicit prop drilling. Binary was amazed by the hidden connections. The Dean's wisdom: "The most elegant code is not clever - it's clear." Architecture Level at ${architectureLevel}%!`
				}}
			/>
		</div>
	);
};

export default ChapterOne;