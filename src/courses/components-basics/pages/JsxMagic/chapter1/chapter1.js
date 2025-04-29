import { useState } from 'react';

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
			<h2 className='chapter-title'>Chapter 1: The Magic Language</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Deep in the archives of the Component Kingdom, ancient
					scrolls contained a special language called{' '}
					<strong>JSX</strong>. This magical syntax allowed the
					craftsmen to describe their creations using a blend of
					HTML-like tags and JavaScript expressions.
				</p>

				<p className='story-paragraph'>
					The royal scribes taught that JSX wasn't actually understood
					by the browsers directly. Instead, a special translator
					called Babel would transform the JSX into regular JavaScript
					function calls that browsers could understand.
				</p>

				<div className='code-example'>
					<pre>{`// JSX for a simple greeting component
function Greeting() {
return (
<div className="greeting">
<h1>Hello, Adventurer!</h1>
<p>Welcome to the Component Kingdom.</p>
</div>
);
}`}</pre>
				</div>

				<p className='story-paragraph'>
					This JSX magic was just a more elegant way to write
					React.createElement() calls, making the component code much
					more readable and intuitive for the kingdom's craftsmen.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The JSX Translator
				</h3>
				<p className='instruction'>
					Try editing the JSX code below, then click the "Translate"
					button to see how it's transformed into JavaScript that
					browsers understand!
				</p>

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

			<div className='lesson-insight'>
				<h3>The JSX Lesson:</h3>
				<p>
					JSX is a syntax extension for JavaScript that looks similar
					to HTML but allows you to write React elements in a more
					intuitive way. It's not understood directly by browsers and
					must be transpiled to standard JavaScript before running.
					JSX makes your component code more readable by representing
					the UI structure in a familiar HTML-like format.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does writing UI in JSX compare to writing it in plain
					JavaScript or HTML?
				</p>
				<p>
					Why do you think React uses JSX instead of just JavaScript
					or HTML?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
