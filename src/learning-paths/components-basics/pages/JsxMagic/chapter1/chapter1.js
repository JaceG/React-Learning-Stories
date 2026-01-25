import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';

const ChapterOne = () => {
	const [jsxExample, setJsxExample] = useState(`<div className="greeting">
  <h1>Hello, Adventurer!</h1>
  <p>Welcome to the Component Kingdom.</p>
</div>`);
	const [jsxOutput, setJsxOutput] = useState('');
	const [showJsxOutput, setShowJsxOutput] = useState(false);

	const handleJsxChange = (e) => {
		setJsxExample(e.target.value);
	};

	const showTranspiledJsx = () => {
		const lines = jsxExample.trim().split('\n');
		let jsOutput = '';
		if (lines.length >= 3) {
			const rootMatch = lines[0].match(/<(\w+)([^>]*)>/);
			if (rootMatch) {
				const element = rootMatch[1];
				const props = rootMatch[2].includes('className')
					? '{ className: "greeting" }'
					: 'null';
				jsOutput = `React.createElement(\n  "${element}", \n  ${props}`;
				const childLines = lines.slice(1, -1);
				for (const line of childLines) {
					const childMatch = line
						.trim()
						.match(/<(\w+)([^>]*)>(.*?)<\/\w+>/);
					if (childMatch) {
						const childElement = childMatch[1];
						const childProps = 'null';
						const childContent = childMatch[3].trim();
						jsOutput += `,\n  React.createElement("${childElement}", ${childProps}, "${childContent}")`;
					}
				}
				jsOutput += '\n);';
			}
		}
		setJsxOutput(jsOutput);
		setShowJsxOutput(true);
	};

	const showOriginalJsx = () => {
		setShowJsxOutput(false);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title='The Magic Language'
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Welcome, Aria!" called out <strong>Professor Syntaxis</strong>, 
					a wise mage whose robes shimmered with HTML tags and JavaScript 
					symbols. "I've heard of your progress from Hermes. You're ready 
					to learn the ancient language that makes React truly magical."
				</p>

				<p className='story-paragraph'>
					Professor Syntaxis led Aria to a grand library filled with 
					glowing scrolls. "This is <strong>JSX</strong> - a magical 
					syntax that allows us to write component spells using a blend 
					of HTML-like tags and JavaScript expressions."
				</p>
				
				<p className='story-paragraph'>
					"But how can browsers understand this magical language?" Aria 
					asked, examining a scroll that seemed to contain both HTML and 
					JavaScript.
				</p>

				<p className='story-paragraph'>
					"Ah, that's where our translator sprite, <strong>Babel</strong>, 
					comes in," Syntaxis explained. "Babel transforms JSX into regular 
					JavaScript function calls that browsers can understand. Watch!"
				</p>

				<div className='code-example'>
					<div className='scroll-header'>
						<span>Ancient JSX Transformation Scroll</span>
						<span className='discovered-by'>Revealed to Aria by Professor Syntaxis</span>
					</div>
					<pre>{`// Aria's First JSX Spell
function Greeting() {
  // This magical syntax combines HTML and JavaScript!
  return (
    <div className="greeting">
      <h1>Hello, Adventurer!</h1>
      <p>Welcome to the Component Kingdom.</p>
    </div>
  );
}

// Professor Syntaxis: "But Babel transforms it to this:"
// React.createElement("div", {className: "greeting"},
//   React.createElement("h1", null, "Hello, Adventurer!"),
//   React.createElement("p", null, "Welcome to the Component Kingdom.")
// )`}</pre>
				</div>

				<p className='story-paragraph'>
					"Incredible!" Aria exclaimed. "So JSX is like a more elegant 
					spell notation that gets translated into the verbose function 
					calls?"
				</p>
				
				<p className='story-paragraph'>
					"Exactly!" Syntaxis beamed. "This makes our component spells 
					much more readable and intuitive. Now, let me show you how 
					to use the JSX Translator Crystal..."
				</p>
				
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The JSX Translator Crystal
				</h3>
				<InstructionBox character="Professor Syntaxis hands you a glowing crystal.">
					"This translator crystal will show you how Babel transforms JSX. 
					Try editing the JSX spell below, then activate the crystal!"
				</InstructionBox>

				<div className='jsx-translator'>
					<div className='jsx-display'>
						<h4>
							{showJsxOutput
								? 'Translated JavaScript'
								: 'Original JSX'}
						</h4>
						{!showJsxOutput ? (
							<textarea
								className='jsx-code-editor'
								value={jsxExample}
								onChange={handleJsxChange}
								style={{
									width: '100%',
									minHeight: '150px',
									fontFamily: 'monospace',
									padding: '10px',
									border: '1px solid #ccc',
									borderRadius: '4px',
								}}
							/>
						) : (
							<pre className='jsx-code'>{jsxOutput}</pre>
						)}
						<div className='translator-controls'>
							{showJsxOutput ? (
								<button
									className='translator-button'
									onClick={showOriginalJsx}>
									Show Original JSX
								</button>
							) : (
								<button
									className='translator-button'
									onClick={showTranspiledJsx}>
									Translate to JavaScript
								</button>
							)}
						</div>
					</div>
					<div className='translation-explanation'>
						<h4>How It Works:</h4>
						<p>
							JSX is a syntax extension that's transformed by
							tools like Babel before it reaches the browser. Each
							JSX element becomes a React.createElement() call
							with three arguments:
						</p>
						<ol>
							<li>
								The element type (div, h1, or a component name)
							</li>
							<li>The properties or attributes (as an object)</li>
							<li>The children (nested content)</li>
						</ol>
						<p>
							This transformation happens during the build
							process, so your components can be written in the
							more intuitive JSX syntax while still being fully
							compatible with browsers.
						</p>
					</div>
				</div>

				<div className='jsx-examples'>
					<h4>Try these examples:</h4>
					<div className='example-buttons'>
						<button
							className='example-button'
							onClick={() =>
								setJsxExample(`<div className="greeting">
  <h1>Hello, Adventurer!</h1>
  <p>Welcome to the Component Kingdom.</p>
</div>`)
							}>
							Basic Element
						</button>
						<button
							className='example-button'
							onClick={() =>
								setJsxExample(`<button className="magic-button" onClick={castSpell}>
  Cast Magic Spell
</button>`)
							}>
							Button with Event
						</button>
						<button
							className='example-button'
							onClick={() =>
								setJsxExample(`<nav className="navigation">
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#spells">Spells</a></li>
    <li><a href="#potions">Potions</a></li>
  </ul>
</nav>`)
							}>
							Navigation Menu
						</button>
					</div>
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: 'The JSX Lesson:',
					content:
						'JSX is a syntax extension for JavaScript that looks similar to HTML but allows you to write React elements in a more intuitive way. It\'s not understood directly by browsers and must be transpiled to standard JavaScript before running. JSX makes your component code more readable by representing the UI structure in a familiar HTML-like format. As Professor Syntaxis says: "JSX bridges the gap between markup and logic!"',
				}}
				reflectionQuestions={[
					"How does the translator crystal metaphor help you understand Babel's role in React development?",
					'Why might combining HTML-like syntax with JavaScript be more powerful than keeping them separate?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 6",
					content:
						'The JSX Magic Academy is amazing! Professor Syntaxis showed me how JSX combines the familiarity of HTML with the power of JavaScript. It\'s like writing in a language that feels natural but has hidden depths. The Babel sprite is fascinating - it works tirelessly behind the scenes to translate our elegant JSX into function calls.',
				}}
			/>
		</div>
	);
};

export default ChapterOne;
