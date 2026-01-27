import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [activeComparison, setActiveComparison] = useState('button');
	const [semanticElements, setSemanticElements] = useState({
		nav: false,
		main: false,
		article: false,
		section: false,
		header: false,
		footer: false,
		aside: false
	});
	const [headingHierarchy, setHeadingHierarchy] = useState([]);
	const [formAssociations, setFormAssociations] = useState({
		explicitLabel: false,
		implicitLabel: false,
		ariaLabel: false,
		ariaLabelledby: false
	});
	
	const { 
		inclusiveFeatures,
		implementFeature,
		updateAccessibilityScore,
		runAccessibilityAudit
	} = useOutletContext();

	const semanticComparisons = [
		{
			id: 'button',
			bad: '<div onClick={handleClick}>Click me</div>',
			good: '<button onClick={handleClick}>Click me</button>',
			explanation: 'Buttons are keyboard accessible and announce their role'
		},
		{
			id: 'navigation',
			bad: '<div className="menu">...</div>',
			good: '<nav aria-label="Main navigation">...</nav>',
			explanation: 'Nav elements create navigation landmarks for screen readers'
		},
		{
			id: 'list',
			bad: '<div>Item 1</div><div>Item 2</div>',
			good: '<ul><li>Item 1</li><li>Item 2</li></ul>',
			explanation: 'Lists announce their count and position to screen readers'
		},
		{
			id: 'heading',
			bad: '<div className="title">Page Title</div>',
			good: '<h1>Page Title</h1>',
			explanation: 'Headings provide document structure and navigation'
		},
		{
			id: 'form',
			bad: '<input type="text" placeholder="Name" />',
			good: '<label>Name: <input type="text" /></label>',
			explanation: 'Labels are essential for form accessibility'
		}
	];

	const landmarkElements = [
		{ tag: 'header', role: 'banner', description: 'Site header/logo area' },
		{ tag: 'nav', role: 'navigation', description: 'Navigation links' },
		{ tag: 'main', role: 'main', description: 'Main content (one per page)' },
		{ tag: 'section', role: 'region', description: 'Standalone section (with aria-label)' },
		{ tag: 'article', role: 'article', description: 'Self-contained content' },
		{ tag: 'aside', role: 'complementary', description: 'Supporting content' },
		{ tag: 'footer', role: 'contentinfo', description: 'Site footer' }
	];

	const handleSemanticImplementation = (element) => {
		setSemanticElements(prev => ({
			...prev,
			[element]: true
		}));
		
		// Check if enough elements are implemented
		const implemented = Object.values({
			...semanticElements,
			[element]: true
		}).filter(v => v).length;
		
		if (implemented >= 3 && !inclusiveFeatures.semanticHTML) {
			implementFeature('semanticHTML');
		}
	};

	const buildHeadingHierarchy = () => {
		// Simulate building a proper heading structure
		const hierarchy = [
			{ level: 1, text: 'Main Page Title', correct: true },
			{ level: 2, text: 'Section Title', correct: true },
			{ level: 3, text: 'Subsection Title', correct: true },
			{ level: 2, text: 'Another Section', correct: true },
			{ level: 4, text: 'Skipped H3!', correct: false }
		];
		setHeadingHierarchy(hierarchy);
	};

	const handleFormAssociation = (type) => {
		setFormAssociations(prev => ({
			...prev,
			[type]: true
		}));
		updateAccessibilityScore();
	};

	const runSemanticAudit = () => {
		const results = {
			issues: 0,
			warnings: 0,
			passes: 0
		};
		
		// Check semantic elements
		Object.values(semanticElements).forEach(implemented => {
			if (implemented) results.passes++;
			else results.issues++;
		});
		
		// Check form associations
		Object.values(formAssociations).forEach(implemented => {
			if (implemented) results.passes++;
			else results.warnings++;
		});
		
		runAccessibilityAudit(results);
	};

	return (
		<div className='chapter inclusive-foundations'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Semantic Foundation`}
				bridge={`Guardian Semantic stepped forward from the council. "Before we dive into complex solutions," she said, leading Aria to the Foundation Hall, "you must understand the power of semantic HTML. The right element for the right purpose - this is where accessibility begins."`}
			/>

			<StorySection
				paragraphs={[
					<><strong>Guardian Semantic</strong> led Aria to the Foundation Hall. "Before ARIA labels, before complex solutions - semantic HTML. The right element for the right purpose."</>,
					`Aria reviewed her components. "I've been using divs for everything!"`,
					`"A common mistake. Buttons for actions, nav for navigation, main for content. Each element carries meaning that assistive technologies understand."`,
					`Binary processed the patterns. "Semantic HTML: 30% less code, 100% more meaning. Efficiency metrics improving!"`,
					`Debuggora examined the structure. "Look! Screen readers can now understand our content hierarchy. Navigation is clearer, forms make sense!"`,
					`Guardian Semantic smiled. "Semantic HTML is your first and strongest accessibility tool. Master this, and you've solved half your accessibility challenges."`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>Semantic HTML Showcase</h3>
				
				<InstructionBox character={`Guardian Semantic presents the comparison chamber.`}>
					Click on each element type to see the difference between non-semantic and semantic HTML. Notice how the good examples communicate meaning inherently.
				</InstructionBox>
				
				<div className='semantic-showcase'>
					<div style={{ 
						display: 'flex', 
						gap: '15px', 
						marginBottom: '20px',
						flexWrap: 'wrap'
					}}>
						{semanticComparisons.map((comparison) => (
							<button
								key={comparison.id}
								onClick={() => setActiveComparison(comparison.id)}
								style={{
									padding: '8px 20px',
									background: activeComparison === comparison.id 
										? '#9333EA' 
										: 'rgba(147, 51, 234, 0.2)',
									border: '1px solid #9333EA',
									borderRadius: '20px',
									color: 'white',
									cursor: 'pointer'
								}}
							>
								{comparison.id.charAt(0).toUpperCase() + comparison.id.slice(1)}
							</button>
						))}
					</div>

					<div className='semantic-comparison'>
						<div className='semantic-panel bad'>
							<div className='semantic-label'>
								<span>❌</span>
								<span>Non-Semantic</span>
							</div>
							<pre style={{ 
								background: 'rgba(0, 0, 0, 0.5)', 
								padding: '15px', 
								borderRadius: '8px',
								overflow: 'auto'
							}}>
								{semanticComparisons.find(c => c.id === activeComparison)?.bad}
							</pre>
						</div>
						
						<div className='semantic-panel good'>
							<div className='semantic-label'>
								<span>✅</span>
								<span>Semantic</span>
							</div>
							<pre style={{ 
								background: 'rgba(0, 0, 0, 0.5)', 
								padding: '15px', 
								borderRadius: '8px',
								overflow: 'auto'
							}}>
								{semanticComparisons.find(c => c.id === activeComparison)?.good}
							</pre>
						</div>
					</div>
					
					<p style={{ 
						textAlign: 'center', 
						marginTop: '20px', 
						color: '#bdc3c7',
						padding: '15px',
						background: 'rgba(147, 51, 234, 0.1)',
						borderRadius: '10px'
					}}>
						💡 {semanticComparisons.find(c => c.id === activeComparison)?.explanation}
					</p>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Landmark Elements</h3>
				
				<InstructionBox character={`Guardian Semantic reveals the landmark map.`}>
					Click on each landmark element to implement it in your application. Screen readers use these to help users jump directly to different sections.
				</InstructionBox>
				
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
					gap: '15px',
					marginTop: '20px'
				}}>
					{landmarkElements.map((element) => (
						<div
							key={element.tag}
							onClick={() => handleSemanticImplementation(element.tag)}
							style={{
								padding: '20px',
								background: semanticElements[element.tag] 
									? 'rgba(16, 185, 129, 0.2)' 
									: 'rgba(0, 0, 0, 0.3)',
								border: `2px solid ${semanticElements[element.tag] ? '#10B981' : 'rgba(147, 51, 234, 0.3)'}`,
								borderRadius: '10px',
								cursor: 'pointer',
								transition: 'all 0.3s ease'
							}}
						>
							<code style={{ 
								fontSize: '1.2em', 
								color: '#FCD34D',
								display: 'block',
								marginBottom: '10px'
							}}>
								&lt;{element.tag}&gt;
							</code>
							<div style={{ fontSize: '0.9em', color: '#9333EA', marginBottom: '5px' }}>
								role="{element.role}"
							</div>
							<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
								{element.description}
							</div>
							{semanticElements[element.tag] && (
								<div style={{ marginTop: '10px', color: '#10B981' }}>
									✓ Implemented
								</div>
							)}
						</div>
					))}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Heading Hierarchy</h3>
				
				<InstructionBox character={`Guardian Semantic demonstrates proper document structure.`}>
					Build the heading structure to see how screen readers interpret document hierarchy. Watch for skipped levels!
				</InstructionBox>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px',
					marginTop: '20px'
				}}>
					<button
						onClick={buildHeadingHierarchy}
						style={{
							padding: '10px 25px',
							background: 'linear-gradient(135deg, #9333EA, #7C3AED)',
							border: 'none',
							borderRadius: '20px',
							color: 'white',
							cursor: 'pointer',
							marginBottom: '20px'
						}}
					>
						Build Heading Structure
					</button>

					{headingHierarchy.length > 0 && (
						<div style={{ fontFamily: 'monospace' }}>
							{headingHierarchy.map((heading, index) => (
								<div
									key={index}
									style={{
										marginLeft: `${(heading.level - 1) * 30}px`,
										padding: '8px',
										marginBottom: '5px',
										background: heading.correct 
											? 'rgba(16, 185, 129, 0.1)' 
											: 'rgba(239, 68, 68, 0.1)',
										border: `1px solid ${heading.correct ? '#10B981' : '#EF4444'}`,
										borderRadius: '5px'
									}}
								>
									<span style={{ color: '#FCD34D' }}>H{heading.level}</span>
									<span style={{ marginLeft: '15px' }}>{heading.text}</span>
									{!heading.correct && (
										<span style={{ marginLeft: '15px', color: '#EF4444' }}>
											⚠️ Skipped level!
										</span>
									)}
								</div>
							))}
						</div>
					)}
					
					<div style={{
						marginTop: '20px',
						padding: '15px',
						background: 'rgba(147, 51, 234, 0.1)',
						borderRadius: '8px'
					}}>
						<strong>📚 Heading Rules:</strong>
						<ul style={{ marginTop: '10px', marginLeft: '20px' }}>
							<li>Start with H1 (one per page)</li>
							<li>Don't skip levels (H1 → H3 ❌)</li>
							<li>Use for structure, not styling</li>
							<li>Nest logically (H2s under H1, H3s under H2)</li>
						</ul>
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Form Associations</h3>
				
				<InstructionBox character={`Guardian Semantic shows the form labeling techniques.`}>
					Implement each labeling technique to ensure all form inputs are accessible. Every input needs a way to identify itself!
				</InstructionBox>
				
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gap: '20px',
					marginTop: '20px'
				}}>
					<div style={{
						padding: '20px',
						background: 'rgba(0, 0, 0, 0.3)',
						borderRadius: '10px'
					}}>
						<h4 style={{ marginBottom: '15px', color: '#9333EA' }}>Explicit Label</h4>
						<pre style={{ 
							background: 'rgba(0, 0, 0, 0.5)', 
							padding: '10px', 
							borderRadius: '5px',
							fontSize: '0.9em'
						}}>
{`<label htmlFor="name">Name:</label>
<input id="name" type="text" />`}
						</pre>
						<button
							onClick={() => handleFormAssociation('explicitLabel')}
							style={{
								marginTop: '10px',
								padding: '8px 20px',
								background: formAssociations.explicitLabel ? '#10B981' : 'rgba(147, 51, 234, 0.2)',
								border: 'none',
								borderRadius: '15px',
								color: 'white',
								cursor: 'pointer'
							}}
						>
							{formAssociations.explicitLabel ? '✓ Implemented' : 'Implement'}
						</button>
					</div>

					<div style={{
						padding: '20px',
						background: 'rgba(0, 0, 0, 0.3)',
						borderRadius: '10px'
					}}>
						<h4 style={{ marginBottom: '15px', color: '#9333EA' }}>Implicit Label</h4>
						<pre style={{ 
							background: 'rgba(0, 0, 0, 0.5)', 
							padding: '10px', 
							borderRadius: '5px',
							fontSize: '0.9em'
						}}>
{`<label>
  Email:
  <input type="email" />
</label>`}
						</pre>
						<button
							onClick={() => handleFormAssociation('implicitLabel')}
							style={{
								marginTop: '10px',
								padding: '8px 20px',
								background: formAssociations.implicitLabel ? '#10B981' : 'rgba(147, 51, 234, 0.2)',
								border: 'none',
								borderRadius: '15px',
								color: 'white',
								cursor: 'pointer'
							}}
						>
							{formAssociations.implicitLabel ? '✓ Implemented' : 'Implement'}
						</button>
					</div>

					<div style={{
						padding: '20px',
						background: 'rgba(0, 0, 0, 0.3)',
						borderRadius: '10px'
					}}>
						<h4 style={{ marginBottom: '15px', color: '#9333EA' }}>ARIA Label</h4>
						<pre style={{ 
							background: 'rgba(0, 0, 0, 0.5)', 
							padding: '10px', 
							borderRadius: '5px',
							fontSize: '0.9em'
						}}>
{`<input 
  type="search"
  aria-label="Search products"
/>`}
						</pre>
						<button
							onClick={() => handleFormAssociation('ariaLabel')}
							style={{
								marginTop: '10px',
								padding: '8px 20px',
								background: formAssociations.ariaLabel ? '#10B981' : 'rgba(147, 51, 234, 0.2)',
								border: 'none',
								borderRadius: '15px',
								color: 'white',
								cursor: 'pointer'
							}}
						>
							{formAssociations.ariaLabel ? '✓ Implemented' : 'Implement'}
						</button>
					</div>
				</div>
			</div>

			<CodeExample
				title={`Semantic HTML in React`}
				discoveredBy={`Guardian Semantic's foundation`}
				code={`# Semantic HTML Best Practices
// Guardian Semantic: "Structure is meaning, meaning is accessibility!"

# React Component Semantics

## Button vs Div
// Bad - Not keyboard accessible, no role announcement
function BadButton() {
  return (
    <div 
      className="button" 
      onClick={handleClick}
    >
      Click me
    </div>
  );
}

// Good - Full accessibility built-in
function GoodButton() {
  return (
    <button 
      className="button" 
      onClick={handleClick}
    >
      Click me
    </button>
  );
}

// Also good - When you need a link
function LinkButton() {
  return (
    <a 
      href="/path" 
      className="button"
    >
      Click me
    </a>
  );
}

## Document Structure
// Binary: "Logical structure = efficient parsing!"

function PageLayout() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <h1>Page Title</h1>
        <article>
          <h2>Article Title</h2>
          <p>Article content...</p>
        </article>
      </main>
      
      <aside aria-label="Related links">
        <h2>Related</h2>
        <ul>...</ul>
      </aside>
      
      <footer>
        <p>© 2024 Company</p>
      </footer>
    </>
  );
}

## Heading Hierarchy
// Debuggora: "Proper headings = happy screen readers!"

// Bad - Skipped levels
<h1>Site Title</h1>
<h3>Section Title</h3> // Skipped H2!
<h4>Subsection</h4>

// Good - Logical hierarchy
<h1>Site Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
<h2>Another Section</h2>

// React component for consistent headings
function Section({ level = 2, title, children }) {
  const Heading = \`h\${level}\`;
  
  return (
    <section aria-labelledby={title.replace(/\\s+/g, '-')}>
      <Heading id={title.replace(/\\s+/g, '-')}>
        {title}
      </Heading>
      {children}
    </section>
  );
}

## Lists for Groups
// Bad - Not announced as list
<div className="navigation">
  <div>Home</div>
  <div>About</div>
  <div>Contact</div>
</div>

// Good - Announced with count
<nav>
  <ul className="navigation">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

## Form Patterns
// Aria: "Every input needs a label!"

// Multiple labeling techniques
function AccessibleForm() {
  return (
    <form>
      {/* Explicit label */}
      <label htmlFor="username">Username:</label>
      <input id="username" type="text" required />
      
      {/* Implicit label */}
      <label>
        Password:
        <input type="password" required />
      </label>
      
      {/* Grouped fields */}
      <fieldset>
        <legend>Shipping Address</legend>
        <label htmlFor="street">Street:</label>
        <input id="street" type="text" />
        
        <label htmlFor="city">City:</label>
        <input id="city" type="text" />
      </fieldset>
      
      {/* Error messages */}
      <label htmlFor="email">
        Email:
        <input 
          id="email" 
          type="email"
          aria-describedby="email-error"
          aria-invalid={errors.email ? "true" : "false"}
        />
      </label>
      {errors.email && (
        <span id="email-error" role="alert">
          Please enter a valid email
        </span>
      )}
      
      <button type="submit">Submit</button>
    </form>
  );
}

## Tables for Data
// Only use tables for tabular data
function DataTable({ data }) {
  return (
    <table>
      <caption>User Statistics</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.id}>
            <th scope="row">{user.name}</th>
            <td>{user.role}</td>
            <td>{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

## Interactive Elements
// Use semantic elements for interactions

// Details/Summary for collapsible content
<details>
  <summary>More information</summary>
  <p>Additional content here...</p>
</details>

// Dialog for modals
<dialog open>
  <h2>Modal Title</h2>
  <p>Modal content...</p>
  <button onClick={closeModal}>Close</button>
</dialog>

// Progress for loading
<progress value={75} max={100}>
  75% complete
</progress>

## Semantic Component Library
// Create accessible components by default

const Card = ({ heading, children, level = 2 }) => {
  const Heading = \`h\${level}\`;
  
  return (
    <article className="card">
      <Heading>{heading}</Heading>
      {children}
    </article>
  );
};

const NavLink = ({ href, children, current }) => (
  <a 
    href={href}
    aria-current={current ? "page" : undefined}
  >
    {children}
  </a>
);

const Icon = ({ name, label }) => (
  <span 
    role="img" 
    aria-label={label}
    className={\`icon icon-\${name}\`}
  />
);`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Semantic Lesson:`,
					content: `Guardian Semantic reveals that semantic HTML is not just about using the right tags - it's about conveying meaning through structure. When we use semantic elements, we're not just writing code for browsers, we're creating a meaningful document that can be understood by all users and technologies. The foundation of accessibility is choosing elements that accurately describe their content and purpose. This creates a robust base that requires fewer ARIA additions and works reliably across all assistive technologies.`
				}}
				reflectionQuestions={[
					`How does semantic HTML reduce the need for complex accessibility fixes?`,
					`Why is it important to think of HTML elements as having inherent meaning rather than just visual appearance?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 41 (Afternoon)`,
					content: `Guardian Semantic took me to the Foundation Hall and showed me my biggest mistake: I've been using divs for everything! She explained that semantic HTML is the first and strongest accessibility tool. Buttons for actions, nav for navigation, main for content - each element carries meaning that assistive technologies understand automatically. Binary calculated that semantic HTML gives us 30% less code with 100% more meaning. Debuggora could suddenly see our content hierarchy clearly - screen readers now understand our structure! I implemented landmark elements (header, nav, main, aside, footer) and learned proper heading hierarchy. Guardian Semantic's wisdom: "Master semantic HTML, and you've solved half your accessibility challenges."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
