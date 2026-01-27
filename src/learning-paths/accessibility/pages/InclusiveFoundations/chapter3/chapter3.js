import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [activeAriaExample, setActiveAriaExample] = useState('role');
	const [ariaAttributes, setAriaAttributes] = useState({
		role: false,
		label: false,
		describedby: false,
		live: false,
		expanded: false,
		hidden: false
	});
	const [liveRegionContent, setLiveRegionContent] = useState('');
	const [expandedState, setExpandedState] = useState(false);
	const [tabPanelActive, setTabPanelActive] = useState(0);
	
	const { 
		inclusiveFeatures,
		implementFeature,
		updateAccessibilityScore
	} = useOutletContext();

	const ariaExamples = [
		{
			id: 'role',
			title: 'ARIA Roles',
			description: 'Define what an element is',
			example: 'role="navigation"',
			usage: 'When semantic HTML is not available'
		},
		{
			id: 'label',
			title: 'aria-label',
			description: 'Provide accessible name',
			example: 'aria-label="Close dialog"',
			usage: 'When visible label is not present'
		},
		{
			id: 'describedby',
			title: 'aria-describedby',
			description: 'Additional description',
			example: 'aria-describedby="password-help"',
			usage: 'Link to helpful text'
		},
		{
			id: 'live',
			title: 'aria-live',
			description: 'Announce dynamic changes',
			example: 'aria-live="polite"',
			usage: 'For status updates and alerts'
		},
		{
			id: 'state',
			title: 'ARIA States',
			description: 'Current state of element',
			example: 'aria-expanded="true"',
			usage: 'Dynamic UI states'
		}
	];

	const ariaRules = [
		{
			rule: "First Rule of ARIA",
			description: "Don't use ARIA if you can use semantic HTML",
			example: "Use <button> instead of <div role='button'>"
		},
		{
			rule: "No ARIA is better than bad ARIA",
			description: "Incorrect ARIA can make accessibility worse",
			example: "Wrong: role='button' without keyboard support"
		},
		{
			rule: "All interactive elements must be keyboard accessible",
			description: "If you use ARIA to make it interactive, add keyboard support",
			example: "Add tabIndex='0' and keyboard handlers"
		},
		{
			rule: "Don't change native semantics unnecessarily",
			description: "Avoid overriding built-in roles",
			example: "Don't: <button role='link'>"
		},
		{
			rule: "All interactive elements must have accessible names",
			description: "Use aria-label or aria-labelledby",
			example: "aria-label='Save document'"
		}
	];

	const commonPatterns = [
		{
			name: "Modal Dialog",
			roles: ["dialog", "document"],
			attributes: ["aria-modal", "aria-labelledby", "aria-describedby"],
			focus: "Trap focus within modal"
		},
		{
			name: "Tabs",
			roles: ["tablist", "tab", "tabpanel"],
			attributes: ["aria-selected", "aria-controls", "aria-labelledby"],
			focus: "Arrow keys navigate tabs"
		},
		{
			name: "Accordion",
			roles: ["region"],
			attributes: ["aria-expanded", "aria-controls", "aria-labelledby"],
			focus: "Space/Enter toggles sections"
		},
		{
			name: "Alert",
			roles: ["alert", "status"],
			attributes: ["aria-live", "aria-atomic"],
			focus: "Announced immediately"
		}
	];

	const handleAriaImplementation = (attribute) => {
		setAriaAttributes(prev => ({
			...prev,
			[attribute]: true
		}));
		
		const implemented = Object.values({
			...ariaAttributes,
			[attribute]: true
		}).filter(v => v).length;
		
		if (implemented >= 3 && !inclusiveFeatures.ariaLabels) {
			implementFeature('ariaLabels');
		}
		
		updateAccessibilityScore();
	};

	const updateLiveRegion = (message) => {
		setLiveRegionContent(message);
		// Clear after announcement
		setTimeout(() => setLiveRegionContent(''), 3000);
	};

	const handleTabChange = (index) => {
		setTabPanelActive(index);
		updateLiveRegion(`Tab ${index + 1} selected`);
	};

	return (
		<div className='chapter inclusive-foundations'>
			<ChapterIntro
				chapterNumber={3}
				title={`The ARIA Arsenal`}
				bridge={`"You've mastered semantic HTML," Guardian Semantic said as she led Aria to the Arsenal Chamber. "But sometimes HTML lacks the elements we need. That's when ARIA helps - but use it wisely. It's powerful medicine that requires the right dose."`}
			/>

			<StorySection
				paragraphs={[
					`"Sometimes," Guardian Semantic explained, "HTML lacks the elements we need. That's when ARIA helps - but use it wisely."`,
					`Aria learned ARIA attributes. "It's like adding type annotations, but for accessibility!"`,
					`"Yes, but remember: No ARIA is better than bad ARIA. First rule of ARIA: Don't use ARIA if you can use HTML."`,
					`Binary computed patterns. "ARIA attributes: 67 roles, 48 properties, infinite combinations. Complexity level: high. Misuse probability: 73%!"`,
					`Debuggora studied carefully. "I see - ARIA bridges the gap when semantic HTML isn't enough. But it's a powerful tool that requires understanding."`,
					`Guardian Semantic nodded. "ARIA is your enhancement toolkit. Use it to clarify, not to recreate. Always test with real assistive technologies."`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>ARIA Arsenal</h3>
				
				<InstructionBox character={`Guardian Semantic opens the ARIA Arsenal.`}>
					Explore different ARIA attributes and their use cases. Click each type to learn when and how to use it properly.
				</InstructionBox>
				
				<div className='aria-arsenal'>
					<div style={{ 
						display: 'flex', 
						gap: '10px', 
						marginBottom: '20px',
						flexWrap: 'wrap'
					}}>
						{ariaExamples.map((example) => (
							<button
								key={example.id}
								onClick={() => setActiveAriaExample(example.id)}
								style={{
									padding: '8px 20px',
									background: activeAriaExample === example.id 
										? '#9333EA' 
										: 'rgba(147, 51, 234, 0.2)',
									border: '1px solid #9333EA',
									borderRadius: '20px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								{example.title}
							</button>
						))}
					</div>

					<div style={{
						background: 'rgba(0, 0, 0, 0.5)',
						borderRadius: '10px',
						padding: '25px',
						marginBottom: '20px'
					}}>
						{(() => {
							const current = ariaExamples.find(e => e.id === activeAriaExample);
							return (
								<>
									<h4 style={{ color: '#FCD34D', marginBottom: '15px' }}>
										{current?.title}
									</h4>
									<p style={{ marginBottom: '15px' }}>{current?.description}</p>
									<code style={{ 
										display: 'block',
										padding: '10px',
										background: 'rgba(0, 0, 0, 0.5)',
										borderRadius: '5px',
										color: '#10B981',
										marginBottom: '15px'
									}}>
										{current?.example}
									</code>
									<p style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
										<strong>Use when:</strong> {current?.usage}
									</p>
									<button
										onClick={() => handleAriaImplementation(current?.id)}
										style={{
											marginTop: '15px',
											padding: '8px 20px',
											background: ariaAttributes[current?.id] 
												? '#10B981' 
												: 'rgba(147, 51, 234, 0.2)',
											border: 'none',
											borderRadius: '15px',
											color: 'white',
											cursor: 'pointer'
										}}
									>
										{ariaAttributes[current?.id] ? '✓ Implemented' : 'Implement'}
									</button>
								</>
							);
						})()}
					</div>

					{/* Live Demo Examples */}
					<div style={{ display: 'grid', gap: '20px' }}>
						{/* Live Region Demo */}
						<div style={{
							padding: '20px',
							background: 'rgba(0, 0, 0, 0.3)',
							borderRadius: '10px'
						}}>
							<h4 style={{ marginBottom: '15px' }}>Live Region Demo</h4>
							<InstructionBox character={`Guardian Audio demonstrates live regions.`}>
								Click the buttons to see how aria-live announces dynamic content changes to screen readers.
							</InstructionBox>
							<button
								onClick={() => updateLiveRegion('Item added to cart')}
								style={{
									padding: '10px 20px',
									background: '#9333EA',
									border: 'none',
									borderRadius: '5px',
									color: 'white',
									cursor: 'pointer',
									marginRight: '10px'
								}}
							>
								Add to Cart
							</button>
							<button
								onClick={() => updateLiveRegion('Item removed from cart')}
								style={{
									padding: '10px 20px',
									background: '#EF4444',
									border: 'none',
									borderRadius: '5px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								Remove Item
							</button>
							<div 
								aria-live="polite" 
								aria-atomic="true"
								style={{
									marginTop: '15px',
									padding: '10px',
									background: 'rgba(252, 211, 77, 0.1)',
									borderRadius: '5px',
									minHeight: '40px',
									display: 'flex',
									alignItems: 'center'
								}}
							>
								{liveRegionContent || 'Status updates will appear here'}
							</div>
						</div>

						{/* Expandable Demo */}
						<div style={{
							padding: '20px',
							background: 'rgba(0, 0, 0, 0.3)',
							borderRadius: '10px'
						}}>
							<h4 style={{ marginBottom: '15px' }}>Expandable Content</h4>
							<InstructionBox character={`Guardian Keyboard shows state management.`}>
								Toggle the content and notice how aria-expanded communicates the state to assistive technologies.
							</InstructionBox>
							<button
								onClick={() => setExpandedState(!expandedState)}
								aria-expanded={expandedState}
								aria-controls="expandable-content"
								style={{
									padding: '10px 20px',
									background: 'rgba(147, 51, 234, 0.2)',
									border: '1px solid #9333EA',
									borderRadius: '5px',
									color: 'white',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									gap: '10px'
								}}
							>
								<span style={{ 
									transform: expandedState ? 'rotate(90deg)' : 'rotate(0)',
									transition: 'transform 0.3s ease'
								}}>
									▶
								</span>
								Show Details
							</button>
							<div 
								id="expandable-content"
								style={{
									marginTop: '15px',
									padding: expandedState ? '15px' : '0',
									background: 'rgba(147, 51, 234, 0.1)',
									borderRadius: '5px',
									maxHeight: expandedState ? '200px' : '0',
									overflow: 'hidden',
									transition: 'all 0.3s ease'
								}}
							>
								This content is now {expandedState ? 'visible' : 'hidden'} and the 
								button's aria-expanded attribute reflects this state for screen readers.
							</div>
						</div>

						{/* Tab Panel Demo */}
						<div style={{
							padding: '20px',
							background: 'rgba(0, 0, 0, 0.3)',
							borderRadius: '10px'
						}}>
							<h4 style={{ marginBottom: '15px' }}>Tab Interface</h4>
							<InstructionBox character={`Guardian Semantic demonstrates complex patterns.`}>
								Tabs require multiple ARIA attributes working together. Notice the roles, states, and relationships.
							</InstructionBox>
							<div role="tablist" style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
								{['General', 'Advanced', 'Support'].map((tab, index) => (
									<button
										key={index}
										role="tab"
										aria-selected={tabPanelActive === index}
										aria-controls={`tabpanel-${index}`}
										onClick={() => handleTabChange(index)}
										style={{
											padding: '8px 16px',
											background: tabPanelActive === index 
												? '#9333EA' 
												: 'rgba(147, 51, 234, 0.2)',
											border: 'none',
											borderRadius: '5px 5px 0 0',
											color: 'white',
											cursor: 'pointer'
										}}
									>
										{tab}
									</button>
								))}
							</div>
							{['General settings content', 'Advanced settings content', 'Support information'].map((content, index) => (
								<div
									key={index}
									role="tabpanel"
									id={`tabpanel-${index}`}
									aria-labelledby={`tab-${index}`}
									hidden={tabPanelActive !== index}
									style={{
										padding: '15px',
										background: 'rgba(147, 51, 234, 0.1)',
										borderRadius: '0 5px 5px 5px'
									}}
								>
									{content}
								</div>
							))}
						</div>
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>The Five Rules of ARIA</h3>
				
				<InstructionBox character={`Guardian Semantic reveals the sacred rules.`}>
					These five rules govern all ARIA usage. Memorize them - they'll save you from creating more problems than you solve.
				</InstructionBox>
				
				<div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
					{ariaRules.map((rule, index) => (
						<div
							key={index}
							style={{
								padding: '20px',
								background: 'rgba(0, 0, 0, 0.3)',
								border: '1px solid rgba(147, 51, 234, 0.3)',
								borderRadius: '10px',
								transition: 'all 0.3s ease'
							}}
						>
							<h4 style={{ 
								color: '#FCD34D', 
								marginBottom: '10px',
								display: 'flex',
								alignItems: 'center',
								gap: '10px'
							}}>
								<span style={{
									width: '30px',
									height: '30px',
									background: '#9333EA',
									borderRadius: '50%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '0.9em'
								}}>
									{index + 1}
								</span>
								{rule.rule}
							</h4>
							<p style={{ marginBottom: '10px' }}>{rule.description}</p>
							<code style={{ 
								display: 'block',
								padding: '8px',
								background: 'rgba(0, 0, 0, 0.5)',
								borderRadius: '5px',
								fontSize: '0.9em',
								color: '#10B981'
							}}>
								{rule.example}
							</code>
						</div>
					))}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Common ARIA Patterns</h3>
				
				<InstructionBox character={`Guardian Semantic presents the pattern library.`}>
					These common patterns show how ARIA attributes work together for complex widgets. Study the roles, attributes, and focus management for each.
				</InstructionBox>
				
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
					gap: '20px',
					marginTop: '20px'
				}}>
					{commonPatterns.map((pattern, index) => (
						<div
							key={index}
							style={{
								padding: '20px',
								background: 'rgba(0, 0, 0, 0.4)',
								border: '2px solid rgba(147, 51, 234, 0.3)',
								borderRadius: '10px',
								transition: 'all 0.3s ease'
							}}
						>
							<h4 style={{ color: '#9333EA', marginBottom: '15px' }}>
								{pattern.name}
							</h4>
							<div style={{ marginBottom: '10px' }}>
								<strong style={{ color: '#FCD34D' }}>Roles:</strong>
								<div style={{ fontSize: '0.9em', marginTop: '5px' }}>
									{pattern.roles.map(role => (
										<code 
											key={role}
											style={{ 
												display: 'inline-block',
												margin: '2px',
												padding: '2px 8px',
												background: 'rgba(147, 51, 234, 0.2)',
												borderRadius: '3px'
											}}
										>
											{role}
										</code>
									))}
								</div>
							</div>
							<div style={{ marginBottom: '10px' }}>
								<strong style={{ color: '#FCD34D' }}>Attributes:</strong>
								<div style={{ fontSize: '0.85em', marginTop: '5px', color: '#bdc3c7' }}>
									{pattern.attributes.join(', ')}
								</div>
							</div>
							<div style={{ 
								fontSize: '0.85em', 
								color: '#10B981',
								marginTop: '10px',
								padding: '8px',
								background: 'rgba(16, 185, 129, 0.1)',
								borderRadius: '5px'
							}}>
								💡 {pattern.focus}
							</div>
						</div>
					))}
				</div>
			</div>

			<CodeExample
				title={`ARIA Best Practices`}
				discoveredBy={`Guardian Semantic's arsenal`}
				code={`# ARIA (Accessible Rich Internet Applications)
// Guardian Semantic: "ARIA is powerful medicine - use the right dose!"

# Understanding ARIA
ARIA provides semantic information to assistive technologies when 
HTML alone isn't sufficient. It doesn't change behavior or appearance.

# ARIA Attributes Categories

## 1. Roles (What is it?)
// Define the purpose of an element
<div role="navigation">...</div>
<div role="main">...</div>
<div role="button" tabIndex="0" onClick={...}>...</div>

// Widget roles
role="button"      // Clickable element
role="checkbox"    // Checkable input
role="dialog"      // Modal dialog
role="progressbar" // Progress indicator
role="tab"         // Tab interface

// Document structure roles
role="article"     // Self-contained content
role="banner"      // Site header
role="navigation"  // Navigation section
role="main"        // Main content
role="search"      // Search functionality

## 2. Properties (What is it called?)
// Provide labels and relationships

// aria-label: Direct label
<button aria-label="Close dialog">×</button>

// aria-labelledby: Reference to label element
<nav aria-labelledby="main-nav-heading">
  <h2 id="main-nav-heading">Main Navigation</h2>
  ...
</nav>

// aria-describedby: Additional description
<input 
  type="password" 
  aria-describedby="password-help"
/>
<span id="password-help">
  Must be at least 8 characters
</span>

## 3. States (What's happening?)
// Communicate dynamic information

// aria-expanded: Expandable sections
<button 
  aria-expanded={isOpen}
  aria-controls="panel-1"
>
  Toggle Panel
</button>
<div id="panel-1" hidden={!isOpen}>...</div>

// aria-selected: Selection state
<li role="tab" aria-selected="true">Tab 1</li>

// aria-checked: Checkbox state
<div 
  role="checkbox" 
  aria-checked={isChecked}
  tabIndex="0"
/>

// aria-disabled: Disabled state
<button aria-disabled="true">Submit</button>

// aria-hidden: Hide from assistive tech
<span aria-hidden="true">👁️</span> View

## 4. Live Regions (Announce changes)
// Binary: "Dynamic content requires dynamic announcements!"

// aria-live: Announce content changes
<div aria-live="polite">
  {statusMessage}
</div>

// Live region politeness levels
aria-live="polite"     // Wait for pause
aria-live="assertive"  // Interrupt immediately
aria-live="off"        // Don't announce (default)

// Complete status component
function StatusMessage({ message, type }) {
  return (
    <div 
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

# Common ARIA Patterns

## Modal Dialog
// Debuggora: "Focus management is crucial!"
function Modal({ isOpen, onClose, title, children }) {
  const previousFocus = useRef();
  
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement;
      // Focus first focusable element
    }
    return () => {
      previousFocus.current?.focus();
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
    >
      <h2 id="modal-title">{title}</h2>
      <div id="modal-desc">{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

## Tabs Interface
function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <>
      <div role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={\`panel-\${index}\`}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => {
              // Arrow key navigation
              if (e.key === 'ArrowRight') {
                setActiveTab((index + 1) % tabs.length);
              } else if (e.key === 'ArrowLeft') {
                setActiveTab(index === 0 ? tabs.length - 1 : index - 1);
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={\`panel-\${index}\`}
          aria-labelledby={\`tab-\${index}\`}
          hidden={activeTab !== index}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}

## Accordion
function Accordion({ sections }) {
  const [expanded, setExpanded] = useState({});
  
  return (
    <div>
      {sections.map((section, index) => (
        <div key={index}>
          <h3>
            <button
              aria-expanded={expanded[index] || false}
              aria-controls={\`section-\${index}\`}
              onClick={() => setExpanded({
                ...expanded,
                [index]: !expanded[index]
              })}
            >
              {section.title}
            </button>
          </h3>
          <div 
            id={\`section-\${index}\`}
            hidden={!expanded[index]}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}

## Loading States
// Aria: "Users need to know something's happening!"
function LoadingButton({ loading, onClick, children }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      aria-label={loading ? 'Loading...' : undefined}
    >
      {loading && (
        <span 
          role="status" 
          aria-label="Loading"
        >
          <Spinner />
        </span>
      )}
      {children}
    </button>
  );
}

# Testing ARIA
// Use browser DevTools and screen readers

// Chrome DevTools
1. Elements > Accessibility pane
2. Check computed properties
3. View accessibility tree

// Screen reader testing
1. Enable screen reader
2. Navigate with keyboard
3. Listen to announcements
4. Verify relationships

# Common Mistakes to Avoid
// Guardian Semantic: "Learn from others' errors!"

// ❌ Don't use ARIA to fix bad HTML
<div role="button">Click</div> // Bad
<button>Click</button>         // Good

// ❌ Don't change native semantics
<button role="heading">Title</button> // Bad
<h2><button>Title</button></h2>      // Good

// ❌ Don't use ARIA without keyboard support
<div role="button" onClick={...}>   // Bad - not keyboard accessible
<div role="button" onClick={...} tabIndex="0" onKeyPress={...}> // Better

// ❌ Don't hide focusable elements
<button aria-hidden="true">Click</button> // Bad - confusing

// ❌ Don't use placeholder as label
<input placeholder="Email" />                    // Bad
<input placeholder="email@example.com" aria-label="Email" /> // Good`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The ARIA Lesson:`,
					content: `The ARIA Arsenal teaches us that ARIA is not a replacement for semantic HTML, but an enhancement layer for complex interactions. Guardian Semantic's wisdom shows that ARIA should be used sparingly and correctly - it's better to have no ARIA than incorrect ARIA. When semantic HTML falls short, ARIA bridges the gap, providing the semantic information assistive technologies need. Master the five rules, understand the patterns, and always test with real users and assistive technologies.`
				}}
				reflectionQuestions={[
					`Why is "No ARIA is better than bad ARIA" such an important principle?`,
					`How does ARIA complement semantic HTML rather than replace it?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 41 (Evening)`,
					content: `My first day in the Inclusive Empire is complete! Guardian Semantic introduced me to ARIA - the enhancement toolkit for when semantic HTML isn't enough. Binary computed the complexity: 67 roles, 48 properties, infinite combinations - with a 73% misuse probability! The five rules of ARIA are now burned into my memory, especially "No ARIA is better than bad ARIA." I practiced with live regions, expandable content, and tab interfaces - seeing how ARIA attributes work together for complex patterns. Empress Inclusiva's final wisdom echoed: "True mastery means building for everyone." Tomorrow, I continue learning about keyboard navigation and focus management. The Inclusive Empire has shown me that accessibility isn't an add-on - it's fundamental to quality.`
				}}
				chapterEnding={[
					`As the evening star rose over the Inclusive Empire, Empress Inclusiva gathered her Guardians around Aria.`,
					`"You've learned the foundations," she said warmly. "The POUR principles, semantic HTML, and the ARIA Arsenal. But accessibility is a journey, not a destination."`,
					`Binary processed their progress. "Accessibility Score: significantly improved. But Guardian Keyboard awaits - keyboard navigation and focus management will complete the foundation."`,
					`Guardian Semantic nodded. "Remember: start with semantic HTML, enhance with ARIA only when needed, and always test with real users. The Inclusive Empire welcomes all who build with empathy."`,
					`Aria smiled, her scroll filling with new patterns and principles. "Building for everyone isn't just good practice - it's the right thing to do. The Keyboard Kingdom awaits!"`
				]}
			/>
		</div>
	);
};

export default ChapterThree;
