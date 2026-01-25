import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const {
		errorSpells,
		learnErrorSpell,
		capturedErrors,
		captureError,
		protectionLevel
	} = useOutletContext();

	const [selectedError, setSelectedError] = useState(null);
	const [enchantmentActive, setEnchantmentActive] = useState(false);

	// Different error types to learn about
	const errorTypes = [
		{ 
			id: 'syntax',
			name: 'Syntax Error',
			icon: '⚡',
			description: 'When code violates language rules',
			example: 'Uncaught SyntaxError: Unexpected token',
			power: 10
		},
		{ 
			id: 'reference',
			name: 'Reference Error',
			icon: '❓',
			description: 'Accessing undefined variables',
			example: 'Uncaught ReferenceError: x is not defined',
			power: 15
		},
		{ 
			id: 'type',
			name: 'Type Error',
			icon: '🔀',
			description: 'Operating on wrong data types',
			example: 'Uncaught TypeError: Cannot read property',
			power: 20
		},
		{ 
			id: 'runtime',
			name: 'Runtime Error',
			icon: '💥',
			description: 'Errors during execution',
			example: 'Maximum call stack size exceeded',
			power: 25
		},
		{ 
			id: 'async',
			name: 'Async Error',
			icon: '⏱️',
			description: 'Unhandled promise rejections',
			example: 'Unhandled Promise Rejection',
			power: 30
		}
	];

	// Capture and enchant an error
	const enchantError = (error) => {
		setSelectedError(error);
		setEnchantmentActive(true);
		
		// Learn the spell for this error type
		learnErrorSpell({
			id: error.id,
			name: `${error.name} Protection`,
			type: error.id,
			power: error.power
		});

		// Capture the error
		setTimeout(() => {
			captureError({
				id: Date.now(),
				type: error.name,
				message: error.example,
				handled: true
			});
			setEnchantmentActive(false);
		}, 2000);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Error Sanctuary`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					After mastering integration testing at the Inn, <strong>Aria</strong> arrived 
					at the Error Enchantments sanctuary. This mystical place was unlike anything 
					she'd seen - errors floated in the air like glowing orbs, each containing 
					dangerous power.
				</p>

				<p className='story-paragraph'>
					<strong>Guardian Safiya</strong> welcomed her with a knowing smile. "Welcome to 
					where we turn chaos into control. Here, errors aren't enemies - they're teachers. 
					Each one reveals a weakness in our defenses."
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> hooted nervously as a TypeError orb floated past. 
					"In React, errors can cascade through component trees, crashing entire applications. 
					But with the right enchantments..."
				</p>

				<p className='story-paragraph'>
					Safiya gestured to the floating errors. "These are the common error types that 
					plague React applications. Learn their nature, and you can protect against them."
				</p>

			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Error Type Sanctuary</h3>
				
				<div className='error-sanctuary'>
					<h4>
						<span className='error-icon'>⚠️</span>
						Floating Error Types
					</h4>
					<p>Click on an error type to capture and enchant it!</p>
					
					<div className='error-types-grid'>
						{errorTypes.map(error => (
							<div
								key={error.id}
								className={`error-type-card ${
									capturedErrors.find(e => e.type === error.name) ? 'captured' : ''
								} ${selectedError?.id === error.id ? 'selected' : ''}`}
								onClick={() => !enchantmentActive && enchantError(error)}>
								<span className='error-icon'>{error.icon}</span>
								<div className='error-name'>{error.name}</div>
								<div className='error-description'>{error.description}</div>
								{capturedErrors.find(e => e.type === error.name) && (
									<div className='captured-indicator'>✓ Captured</div>
								)}
							</div>
						))}
					</div>
				</div>

				{enchantmentActive && selectedError && (
					<div className='enchantment-process'>
						<h4>Enchanting {selectedError.name}...</h4>
						<div className='enchantment-animation'>
							<div className='spell-circle'>
								<span className='spell-icon'>{selectedError.icon}</span>
							</div>
						</div>
						<p>Learning protection spell...</p>
					</div>
				)}

				<div className='protection-meter'>
					<h4>Sanctuary Protection Level</h4>
					<div className='protection-circle'>
						<div className='protection-level'>{protectionLevel}%</div>
					</div>
					<p>Capture more errors to increase protection!</p>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Understanding React Error Types</span>
					<div className='code-actions'>
						<button onClick={() => captureError({ 
							type: 'Manual Error', 
							message: 'Test error captured' 
						})}>
							Trigger Test Error
						</button>
					</div>
				</div>
				<CodeExample
					title={`Understanding React Error Types`}
					discoveredBy={`Transcribed by Aria`}
					code={`// Common React Error Patterns

// 1. Component Lifecycle Errors
class BuggyComponent extends React.Component {
  componentDidMount() {
    // This will throw an error
    throw new Error('Component mount error!');
  }
  
  render() {
    return <div>This won't render</div>;
  }
}

// 2. Async Errors in Components
function AsyncComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Unhandled promise rejection
    fetchData().then(data => {
      setData(data.nested.property); // Error if nested doesn't exist
    });
    // Missing .catch() handler!
  }, []);
  
  return <div>{data}</div>;
}

// 3. Event Handler Errors
function ButtonComponent() {
  const handleClick = (e) => {
    // This will throw if user is null
    console.log(user.name); // ReferenceError
  };
  
  return <button onClick={handleClick}>Click me</button>;
}

// 4. Render Method Errors
function ListComponent({ items }) {
  return (
    <ul>
      {items.map(item => (
        // Error: missing key prop
        <li>{item.name.toUpperCase()}</li> // Error if name is null
      ))}
    </ul>
  );
}

// 5. Hook Rule Violations
function ConditionalHookComponent({ condition }) {
  if (condition) {
    // Error: Conditional hook call
    useState(0); // Breaks Rules of Hooks
  }
  
  return <div>Broken component</div>;
}

// Error Types Quick Reference:
// - SyntaxError: Code structure issues
// - ReferenceError: Using undefined variables
// - TypeError: Wrong data type operations
// - RangeError: Values outside allowed range
// - Runtime Errors: Logic errors during execution`}
				/>
				<div className='code-tooltip'>
					<strong>Safiya's Teaching:</strong> "Each error type requires different handling. 
					Syntax errors prevent compilation, runtime errors crash components, and async 
					errors can go unnoticed. Know thy enemy to defend against it."
				</div>
			</div>

			<ChapterSummary
				characterIntros={[
					{
						name: `Guardian Safiya`,
						description: `Master of Error Boundaries and graceful failure. Her philosophy: "A well-handled error is better than a hidden bug. Errors tell stories - listen to them, learn from them, then protect against them."`
					}
				]}
				lessonInsight={{
					title: `The Error Nature Lesson:`,
					content: (
						<>
							<p>
								Understanding error types is the first step to handling them gracefully. In React, 
								errors can occur at different stages: during rendering, in lifecycle methods, in 
								event handlers, or in asynchronous code. Each requires different defensive strategies.
							</p>
							<p>
								The key insight: Errors are inevitable, but crashes are preventable. By understanding 
								where and why errors occur, you can build defensive barriers that keep your 
								application running even when individual components fail.
							</p>
						</>
					)
				}}
				reflectionQuestions={[
					`Why do some errors crash the entire app while others don't? Consider how React's error propagation works. Errors in render methods and lifecycle methods bubble up the component tree, while errors in event handlers don't.`,
					`What's the difference between compile-time and runtime errors? Think about when each type is caught and how they affect your development workflow. Which are easier to prevent?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 32 (Morning)`,
					content: `The Error Enchantments sanctuary - errors float in the air like glowing orbs! Guardian Safiya welcomed me: "Here, errors aren't enemies - they're teachers." I captured five error types: Syntax (⚡ code structure), Reference (❓ undefined variables), Type (🔀 wrong data types), Runtime (💥 execution errors), and Async (⏱️ unhandled promises). Each captured error increases the sanctuary's Protection Level! In React, errors can occur during rendering, in lifecycle methods, in event handlers, or in async code - each needs different strategies. Safiya's wisdom: "Errors are inevitable, but crashes are preventable. A well-handled error is better than a hidden bug."`
				}}
				chapterEnding={[
					`As Aria captured each error type, she began to understand their patterns. Safiya nodded approvingly. "You've learned to recognize errors. Tomorrow, I'll teach you Error Boundaries - magical barriers that contain errors before they can spread..."`
				]}
			/>
		</div>
	);
};

export default ChapterOne;