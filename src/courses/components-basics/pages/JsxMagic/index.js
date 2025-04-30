import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './JsxMagic.css';
// import ChapterOne from './chapter1/chapter1';
// import ChapterTwo from './chapter2/chapter2';
// import ChapterThree from './chapter3/chapter3';

function JsxMagic() {
	const [jsxExample, setJsxExample] = useState(`<div className="greeting">
  <h1>Hello, Adventurer!</h1>
  <p>Welcome to the Component Kingdom.</p>
</div>`);
	const [jsxOutput, setJsxOutput] = useState('');
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

	const selectChallenge = (id) => {
		const challenge = jsxChallenges.find((c) => c.id === id);
		setActiveChallengeId(id);
		setUserCode(challenge.code);
		setCodeResult(null);
		setFixedCode(false);
	};

	const checkSolution = () => {
		const challenge = jsxChallenges.find((c) => c.id === activeChallengeId);
		if (!challenge) return;
		let isCorrect = false;
		let feedback = '';
		switch (activeChallengeId) {
			case 1:
				isCorrect =
					/<div>[\s\S]*<h1>[\s\S]*<\/h1>[\s\S]*<p>[\s\S]*<\/p>[\s\S]*<\/div>/.test(
						userCode
					);
				feedback = isCorrect
					? 'Correct! You wrapped everything in a single root element.'
					: 'Remember: JSX must have a single root element.';
				break;
			case 2:
				isCorrect = /<input[\s\S]*\/>[\s\S]*<img[\s\S]*\/>/.test(
					userCode
				);
				feedback = isCorrect
					? 'Correct! All tags are self-closed.'
					: 'Remember: All tags in JSX must be closed.';
				break;
			case 3:
				isCorrect =
					/className=/.test(userCode) &&
					/onClick=/.test(userCode) &&
					/tabIndex=/.test(userCode);
				feedback = isCorrect
					? 'Correct! You used camelCase for all properties.'
					: 'Remember: Use camelCase for JSX properties.';
				break;
			default:
				feedback = '';
		}
		setCodeResult({ isCorrect, feedback });
		if (isCorrect) {
			setJsxChallenges((prev) =>
				prev.map((c) =>
					c.id === activeChallengeId ? { ...c, solved: true } : c
				)
			);
			setFixedCode(true);
		}
	};

	const showSolution = () => {
		const challenge = jsxChallenges.find((c) => c.id === activeChallengeId);
		if (challenge) {
			setUserCode(challenge.solution);
			setFixedCode(true);
			setCodeResult({
				isCorrect: true,
				feedback: 'Here is the correct solution!',
			});
		}
	};

	const navigate = useNavigate();
	const location = useLocation();
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The JSX Magic Scrolls</h1>
			<p className='lesson-subtitle'>
				A story about the magical syntax that powers React
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<Outlet
				context={{
					jsxExample,
					setJsxExample,
					jsxOutput,
					showJsxOutput,
					showTranspiledJsx,
					showOriginalJsx,
					expressionType,
					setExpressionType,
					visitorName,
					setVisitorName,
					userRole,
					setUserRole,
					messageCount,
					setMessageCount,
					items,
					newItemName,
					setNewItemName,
					newItemQuantity,
					setNewItemQuantity,
					addItem,
					removeItem,
					buttonStyle,
					setButtonStyle,
					jsxChallenges,
					activeChallengeId,
					selectChallenge,
					userCode,
					setUserCode,
					checkSolution,
					codeResult,
					showSolution,
					fixedCode,
				}}
			/>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
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
