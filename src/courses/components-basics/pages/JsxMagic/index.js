import React, { useState } from 'react';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './JsxMagic.css';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';

function JsxMagic() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [jsxExample, setJsxExample] = useState(`<div className="greeting">
  <h1>Hello, Adventurer!</h1>
  <p>Welcome to the Component Kingdom.</p>
</div>`);
	const [jsxOutput, setJsxOutput] = useState('');

	// Chapter 1 states
	const [showJsxOutput, setShowJsxOutput] = useState(false);

	// Chapter 2 states
	const [expressionType, setExpressionType] = useState('text');
	const [visitorName, setVisitorName] = useState('Traveler');
	const [userRole, setUserRole] = useState('guest');
	const [messageCount, setMessageCount] = useState(3);
	const [items, setItems] = useState([
		{ id: 1, name: 'Potion', quantity: 5 },
		{ id: 2, name: 'Sword', quantity: 1 },
		{ id: 3, name: 'Shield', quantity: 1 },
	]);
	const [newItemName, setNewItemName] = useState('');
	const [newItemQuantity, setNewItemQuantity] = useState(1);
	const [buttonStyle, setButtonStyle] = useState('primary');

	// Function to handle adding a new item
	const addItem = () => {
		if (newItemName.trim() !== '') {
			const newItem = {
				id:
					items.length > 0
						? Math.max(...items.map((item) => item.id)) + 1
						: 1,
				name: newItemName,
				quantity: newItemQuantity,
			};
			setItems([...items, newItem]);
			setNewItemName('');
			setNewItemQuantity(1);
		}
	};

	// Function to remove an item by id
	const removeItem = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	// Chapter 3 states
	const [activeChallengeId, setActiveChallengeId] = useState(null);
	const [userCode, setUserCode] = useState('');
	const [codeResult, setCodeResult] = useState(null);
	const [fixedCode, setFixedCode] = useState(false);
	const [jsxChallenges, setJsxChallenges] = useState([
		{
			id: 1,
			title: 'Single Root Element',
			solved: false,
			code: `function Profile() {
  return (
    <h1>User Profile</h1>
    <p>Username: adventurer123</p>
    <p>Level: 42</p>
  );
}`,
			solution: `function Profile() {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: adventurer123</p>
      <p>Level: 42</p>
    </div>
  );
}`,
		},
		{
			id: 2,
			title: 'Self-Closing Tags',
			solved: false,
			code: `function Inventory() {
  return (
    <div>
      <h2>Inventory</h2>
      <input type="text" placeholder="Search items">
      <img src="sword.png" alt="Legendary Sword">
    </div>
  );
}`,
			solution: `function Inventory() {
  return (
    <div>
      <h2>Inventory</h2>
      <input type="text" placeholder="Search items" />
      <img src="sword.png" alt="Legendary Sword" />
    </div>
  );
}`,
		},
		{
			id: 3,
			title: 'camelCase Properties',
			solved: false,
			code: `function Button() {
  return (
    <button 
      class="magic-button"
      onclick={handleClick}
      tabindex="1"
    >
      Cast Spell
    </button>
  );
}`,
			solution: `function Button() {
  return (
    <button 
      className="magic-button"
      onClick={handleClick}
      tabIndex="1"
    >
      Cast Spell
    </button>
  );
}`,
		},
	]);

	// Function to show the transpiled JSX
	const showTranspiledJsx = () => {
		// Create a more realistic "transpiled" version based on the current JSX example
		const lines = jsxExample.trim().split('\n');

		// Process the JSX to create a React.createElement representation
		let jsOutput = '';
		if (lines.length >= 3) {
			// Extract the root element and its attributes
			const rootMatch = lines[0].match(/<(\w+)([^>]*)>/);
			if (rootMatch) {
				const element = rootMatch[1];
				const props = rootMatch[2].includes('className')
					? '{ className: "greeting" }'
					: 'null';

				// Start building the output
				jsOutput = `React.createElement(\n  "${element}", \n  ${props}`;

				// Process children
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

	// Reset to show JSX input
	const showOriginalJsx = () => {
		setShowJsxOutput(false);
	};

	// Select a JSX challenge to work on
	const selectChallenge = (id) => {
		const challenge = jsxChallenges.find((c) => c.id === id);
		setActiveChallengeId(id);
		setUserCode(challenge.code);
		setCodeResult(null);
		setFixedCode(false);
	};

	// Check if user code matches the solution pattern
	const checkSolution = () => {
		const challenge = jsxChallenges.find((c) => c.id === activeChallengeId);
		if (!challenge) return;

		let isCorrect = false;
		let feedback = '';

		// For simplicity, let's implement basic pattern matching for each challenge type
		switch (activeChallengeId) {
			case 1: // Single Root Element
				isCorrect =
					userCode.includes('<div>') &&
					userCode.includes('</div>') &&
					userCode.indexOf('<div>') < userCode.indexOf('<h1>');
				feedback = isCorrect
					? "Great job! You've wrapped the elements in a single root div."
					: 'Not quite. Remember, JSX requires a single root element to wrap all content.';
				break;
			case 2: // Self-Closing Tags
				isCorrect =
					userCode.includes('/>') &&
					!userCode.includes(
						'<input type="text" placeholder="Search items">'
					) &&
					!userCode.includes(
						'<img src="sword.png" alt="Legendary Sword">'
					);
				feedback = isCorrect
					? "Perfect! You've properly closed all the tags."
					: "Check again. Self-closing tags in JSX must end with '/>' instead of '>'";
				break;
			case 3: // camelCase Properties
				isCorrect =
					userCode.includes('className') &&
					userCode.includes('onClick') &&
					userCode.includes('tabIndex');
				feedback = isCorrect
					? "Excellent! You've used the correct camelCase properties."
					: 'Make sure to convert HTML attributes to their JSX camelCase equivalents.';
				break;
		}

		setCodeResult({ isCorrect, feedback });

		if (isCorrect) {
			// Mark the challenge as solved
			const updatedChallenges = jsxChallenges.map((c) =>
				c.id === activeChallengeId ? { ...c, solved: true } : c
			);
			setJsxChallenges(updatedChallenges);
			setFixedCode(true);
		}
	};

	// Show the solution for the current challenge
	const showSolution = () => {
		const challenge = jsxChallenges.find((c) => c.id === activeChallengeId);
		if (challenge) {
			setUserCode(challenge.solution);
			setFixedCode(true);
		}
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

			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Chapter 1: The Magic Language */}
			{currentChapter === 1 && (
				<ChapterOne
					showJsxOutput={showJsxOutput}
					jsxOutput={jsxOutput}
					jsxExample={jsxExample}
					setJsxExample={setJsxExample}
					showTranspiledJsx={showTranspiledJsx}
					showOriginalJsx={showOriginalJsx}
				/>
			)}

			{/* Chapter 2: Expressions in JSX */}
			{currentChapter === 2 && (
				<ChapterTwo
					expressionType={expressionType}
					setExpressionType={setExpressionType}
					visitorName={visitorName}
					setVisitorName={setVisitorName}
					userRole={userRole}
					setUserRole={setUserRole}
					messageCount={messageCount}
					setMessageCount={setMessageCount}
					items={items}
					setItems={setItems}
					newItemName={newItemName}
					setNewItemName={setNewItemName}
					newItemQuantity={newItemQuantity}
					setNewItemQuantity={setNewItemQuantity}
					addItem={addItem}
					removeItem={removeItem}
					buttonStyle={buttonStyle}
					setButtonStyle={setButtonStyle}
				/>
			)}

			{/* Chapter 3: JSX Rules and Limitations */}
			{currentChapter === 3 && (
				<ChapterThree
					jsxChallenges={jsxChallenges}
					activeChallengeId={activeChallengeId}
					selectChallenge={selectChallenge}
					userCode={userCode}
					setUserCode={setUserCode}
					checkSolution={checkSolution}
					codeResult={codeResult}
					showSolution={showSolution}
					fixedCode={fixedCode}
				/>
			)}

			{/* Add chapter-navigation at the bottom, just above LessonNavigation */}
			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='components-basics'
				lessonId='jsx-magic'
			/>
		</div>
	);
}

export default JsxMagic;
