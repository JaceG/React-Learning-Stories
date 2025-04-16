import React, { useState } from 'react';
import LessonNavigation from '../../../components/layout/LessonNavigation';
import '../../CourseStyles.css';
import './JsxMagic.css';

function JsxMagic() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [jsxExample, setJsxExample] = useState(`<div className="greeting">
  <h1>Hello, Adventurer!</h1>
  <p>Welcome to the Component Kingdom.</p>
</div>`);
	const [jsxOutput, setJsxOutput] = useState('');

	// Toggle between JSX and its JavaScript output
	const [showJsxOutput, setShowJsxOutput] = useState(false);

	// Function to show the transpiled JSX
	const showTranspiledJsx = () => {
		const jsOutput = `React.createElement(
  "div", 
  { className: "greeting" },
  React.createElement("h1", null, "Hello, Adventurer!"),
  React.createElement("p", null, "Welcome to the Component Kingdom.")
);`;

		setJsxOutput(jsOutput);
		setShowJsxOutput(true);
	};

	// Reset to show JSX input
	const showOriginalJsx = () => {
		setShowJsxOutput(false);
	};

	// Navigation functions
	const nextChapter = () => {
		if (currentChapter < 3) {
			setCurrentChapter(currentChapter + 1);
		}
	};

	const prevChapter = () => {
		if (currentChapter > 1) {
			setCurrentChapter(currentChapter - 1);
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The JSX Magic Scrolls</h1>
			<p className='lesson-subtitle'>
				Discover the secret language that brings components to life
			</p>

			{/* Chapter 1: The Magic Language */}
			{currentChapter === 1 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 1: The Magic Language
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							Deep in the archives of the Component Kingdom,
							ancient scrolls contained a special language called{' '}
							<strong>JSX</strong>. This magical syntax allowed
							the craftsmen to describe their creations using a
							blend of HTML-like tags and JavaScript expressions.
						</p>

						<p className='story-paragraph'>
							The royal scribes taught that JSX wasn't actually
							understood by the browsers directly. Instead, a
							special translator called Babel would transform the
							JSX into regular JavaScript function calls that
							browsers could understand.
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
							React.createElement() calls, making the component
							code much more readable and intuitive for the
							kingdom's craftsmen.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>
							Interactive Exercise: The JSX Translator
						</h3>
						<p className='instruction'>
							The scroll below contains JSX code. Click the
							"Translate" button to see how it's transformed into
							JavaScript that browsers understand!
						</p>

						<div className='jsx-translator'>
							<div className='jsx-display'>
								<h4>
									{showJsxOutput
										? 'Translated JavaScript'
										: 'Original JSX'}
								</h4>
								<pre className='jsx-code'>
									{showJsxOutput ? jsxOutput : jsxExample}
								</pre>
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
									JSX is a syntax extension that's transformed
									by tools like Babel before it reaches the
									browser. Each JSX element becomes a
									React.createElement() call with three
									arguments:
								</p>
								<ol>
									<li>
										The element type (div, h1, or a
										component name)
									</li>
									<li>
										The properties or attributes (as an
										object)
									</li>
									<li>The children (nested content)</li>
								</ol>
								<p>
									This transformation happens during the build
									process, so your components can be written
									in the more intuitive JSX syntax while still
									being fully compatible with browsers.
								</p>
							</div>
						</div>
					</div>

					<div className='lesson-insight'>
						<h3>The JSX Lesson:</h3>
						<p>
							JSX is a syntax extension for JavaScript that looks
							similar to HTML but allows you to write React
							elements in a more intuitive way. It's not
							understood directly by browsers and must be
							transpiled to standard JavaScript before running.
							JSX makes your component code more readable by
							representing the UI structure in a familiar
							HTML-like format.
						</p>
					</div>
				</div>
			)}

			{/* Chapter 2: Expressions in JSX */}
			{currentChapter === 2 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 2: Embedding Magic Spells
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							The true power of JSX came from its ability to embed
							JavaScript expressions directly within the markup.
							The craftsmen could place these "spells" inside
							curly braces to dynamically control what appeared in
							their components.
						</p>

						<p className='story-paragraph'>
							One day, a craftsman named Greeter was working on a
							component to welcome visitors to the kingdom.
							Instead of hard-coding each greeting, he discovered
							he could use JavaScript expressions to personalize
							the message for each traveler.
						</p>

						<div className='code-example'>
							<pre>{`function Greeter(props) {
  const currentTime = new Date().getHours();
  let greeting;
  
  if (currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  
  return (
    <div className="greeter">
      <h2>{greeting}, {props.name}!</h2>
      <p>The time is {new Date().toLocaleTimeString()}</p>
      <p>You have {props.messages.length} new messages.</p>
      {props.messages.length > 0 && (
        <button>View Messages</button>
      )}
    </div>
  );
}`}</pre>
						</div>

						<p className='story-paragraph'>
							This ability to combine markup with dynamic
							expressions made JSX incredibly powerful. Craftsmen
							could now create components that adapted to
							different situations and inputs.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>JSX Expression Types</h3>

						<div className='jsx-expressions-grid'>
							<div className='expression-card'>
								<h4>Text Expressions</h4>
								<pre>{`<h1>Hello, {name}!</h1>`}</pre>
								<p>
									Insert JavaScript variables or expressions
									as text content
								</p>
							</div>

							<div className='expression-card'>
								<h4>Attribute Expressions</h4>
								<pre>{`<div className={isActive ? "active" : "inactive"}>`}</pre>
								<p>
									Use expressions to set element attributes or
									props dynamically
								</p>
							</div>

							<div className='expression-card'>
								<h4>Function Calls</h4>
								<pre>{`<p>{formatDate(currentDate)}</p>`}</pre>
								<p>
									Call functions to transform data before
									displaying it
								</p>
							</div>

							<div className='expression-card'>
								<h4>Conditional Rendering</h4>
								<pre>{`{isLoggedIn && <WelcomeBack />}`}</pre>
								<p>
									Conditionally show elements based on logical
									expressions
								</p>
							</div>

							<div className='expression-card'>
								<h4>Array Mapping</h4>
								<pre>{`<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>`}</pre>
								<p>
									Render lists of elements from arrays using
									map()
								</p>
							</div>

							<div className='expression-card'>
								<h4>Ternary Operators</h4>
								<pre>{`{isLoggedIn 
  ? <LogoutButton /> 
  : <LoginButton />
}`}</pre>
								<p>
									Choose between different elements using
									ternary expressions
								</p>
							</div>
						</div>
					</div>

					<div className='lesson-insight'>
						<h3>The Expressions Lesson:</h3>
						<p>
							JSX allows you to embed any JavaScript expression
							within curly braces {}. This enables you to include
							dynamic values, call functions, render
							conditionally, and work with data directly in your
							component's markup. The ability to seamlessly mix
							JavaScript logic with UI structure is what makes
							React components so powerful and flexible.
						</p>
					</div>
				</div>
			)}

			{/* Chapter 3: JSX Rules and Limitations */}
			{currentChapter === 3 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 3: The Rules of the Scrolls
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							Like all magical languages, JSX came with certain
							rules and limitations that all craftsmen needed to
							learn. These principles ensured that components
							would render correctly and maintain compatibility
							with the underlying React system.
						</p>

						<p className='story-paragraph'>
							In the great library of the Component Kingdom,
							scribes documented these rules for all craftsmen to
							follow when working with the JSX scrolls.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>The JSX Rulebook</h3>

						<div className='jsx-rules'>
							<div className='rule-card'>
								<h4>1. Single Root Element</h4>
								<p>
									Every JSX expression must have a single root
									element wrapping all content.
								</p>
								<div className='rule-example'>
									<div className='incorrect'>
										<h5>Incorrect ❌</h5>
										<pre>{`return (
  <h1>Title</h1>
  <p>Paragraph</p>
);`}</pre>
									</div>
									<div className='correct'>
										<h5>Correct ✅</h5>
										<pre>{`return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);`}</pre>
									</div>
								</div>
								<p className='note'>
									Alternative: Use React Fragments (<> </>) to
									avoid extra DOM elements.
								</p>
							</div>

							<div className='rule-card'>
								<h4>2. Close All Tags</h4>
								<p>
									Unlike HTML, all tags in JSX must be closed,
									including self-closing tags.
								</p>
								<div className='rule-example'>
									<div className='incorrect'>
										<h5>Incorrect ❌</h5>
										<pre>{`<input type="text">
<img src="image.jpg">`}</pre>
									</div>
									<div className='correct'>
										<h5>Correct ✅</h5>
										<pre>{`<input type="text" />
<img src="image.jpg" />`}</pre>
									</div>
								</div>
							</div>

							<div className='rule-card'>
								<h4>3. camelCase Properties</h4>
								<p>
									HTML attributes are written in camelCase in
									JSX, not kebab-case.
								</p>
								<div className='rule-example'>
									<div className='incorrect'>
										<h5>Incorrect ❌</h5>
										<pre>{`<div class="container" onclick={handleClick}>
  <input maxlength="10" />
</div>`}</pre>
									</div>
									<div className='correct'>
										<h5>Correct ✅</h5>
										<pre>{`<div className="container" onClick={handleClick}>
  <input maxLength="10" />
</div>`}</pre>
									</div>
								</div>
							</div>

							<div className='rule-card'>
								<h4>4. JavaScript Reserved Words</h4>
								<p>
									Some HTML attribute names are replaced in
									JSX to avoid conflicts with JavaScript.
								</p>
								<table className='rule-table'>
									<thead>
										<tr>
											<th>HTML</th>
											<th>JSX</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>class</td>
											<td>className</td>
										</tr>
										<tr>
											<td>for</td>
											<td>htmlFor</td>
										</tr>
										<tr>
											<td>tabindex</td>
											<td>tabIndex</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className='lesson-insight'>
						<h3>The Rules Lesson:</h3>
						<p>
							JSX has specific syntax rules that differ from
							standard HTML because it's ultimately converted to
							JavaScript. Understanding these rules—like requiring
							a single root element, using camelCase for
							attributes, and properly closing all tags—is
							essential for writing valid React components. These
							constraints ensure that your JSX can be correctly
							transformed into the function calls that React uses
							to create elements.
						</p>
					</div>
				</div>
			)}

			<LessonNavigation
				courseId='components-basics'
				lessonId='jsx-magic'
			/>
		</div>
	);
}

export default JsxMagic;
