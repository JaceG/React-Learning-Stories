import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const {
		typeSystem,
		setTypeSystem,
		forgeType,
		contractResults,
		typeErrors,
		compileStatus
	} = useOutletContext();

	const [currentInput, setCurrentInput] = useState('');
	const [selectedType, setSelectedType] = useState('string');

	const handleForge = () => {
		if (currentInput) {
			let value = currentInput;
			if (selectedType === 'number') {
				value = isNaN(Number(currentInput)) ? currentInput : Number(currentInput);
			} else if (selectedType === 'boolean') {
				value = currentInput === 'true' ? true : currentInput === 'false' ? false : currentInput;
			}
			forgeType(value, selectedType);
			setCurrentInput('');
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: The Ancient Type Forge</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Deep beneath the React Kingdom, accessible only through the Cloud Citadel's 
					lower passages, lay the Type Forge - a place of ancient power where code 
					contracts were hammered into unbreakable forms.
				</p>

				<p className='story-paragraph'>
					<strong>Master Typus</strong>, the Forge Keeper, greeted Aria with eyes 
					that seemed to see through code to its very essence. His beard sparked with 
					type annotations, and his hammer glowed with strict mode energy.
				</p>

				<p className='story-paragraph'>
					"Ambassador Aria," he rumbled, "you've built great things, but they're held 
					together by trust and hope. Here, we forge guarantees. TypeScript isn't just 
					about catching errors - it's about making impossibilities impossible."
				</p>

				<p className='story-paragraph'>
					<strong>Binary's</strong> circuits hummed with anticipation. "My processors 
					already use types internally, Aria. This feels... natural."
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> nodded wisely. "And I'll see errors before they 
					even compile. Prevention at its purest!"
				</p>

				<div className='forge-illustration'>
					<div className='forge-anvil'>
						<div className={`forge-hammer ${compileStatus === 'forging' ? 'active' : ''}`}></div>
						Type Forge
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Type Forge Workbench</h3>
				<p className='instruction'>
					<strong>👉 Forge your first type contracts! Enter values and select their types to see TypeScript in action.</strong>
				</p>

				<div className='type-workbench'>
					<div className='type-controls'>
						<button 
							className={`type-button inference ${typeSystem === 'inference' ? 'active' : ''}`}
							onClick={() => setTypeSystem('inference')}>
							Type Inference
						</button>
						<button 
							className={`type-button annotation ${typeSystem === 'annotation' ? 'active' : ''}`}
							onClick={() => setTypeSystem('annotation')}>
							Type Annotations
						</button>
						<button 
							className={`type-button interface ${typeSystem === 'interface' ? 'active' : ''}`}
							onClick={() => setTypeSystem('interface')}>
							Interfaces
						</button>
					</div>

					<div className='type-playground'>
						<input
							type='text'
							className='playground-input'
							placeholder='Enter a value to forge...'
							value={currentInput}
							onChange={(e) => setCurrentInput(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && handleForge()}
						/>
						
						<div className='type-selector'>
							<button 
								className={`type-option ${selectedType === 'string' ? 'selected' : ''}`}
								onClick={() => setSelectedType('string')}>
								string
							</button>
							<button 
								className={`type-option ${selectedType === 'number' ? 'selected' : ''}`}
								onClick={() => setSelectedType('number')}>
								number
							</button>
							<button 
								className={`type-option ${selectedType === 'boolean' ? 'selected' : ''}`}
								onClick={() => setSelectedType('boolean')}>
								boolean
							</button>
							<button 
								className={`type-option ${selectedType === 'array' ? 'selected' : ''}`}
								onClick={() => setSelectedType('array')}>
								array
							</button>
						</div>

						<button 
							className='forge-button' 
							onClick={handleForge}
							disabled={!currentInput || compileStatus === 'forging'}>
							⚒️ Forge Type Contract
						</button>
					</div>

					<div className='contract-display'>
						{contractResults.length === 0 && typeErrors.length === 0 ? (
							<div style={{ color: '#95a5a6', textAlign: 'center' }}>
								No contracts forged yet. Try entering a value above!
							</div>
						) : (
							<>
								{contractResults.map((result, index) => (
									<div key={index} className={`contract-line ${result.status}`}>
										const value: {result.type} = {JSON.stringify(result.input)};
									</div>
								))}
								{typeErrors.length > 0 && (
									<div className='type-error-panel'>
										{typeErrors.map((error, index) => (
											<div key={index} className='error-message'>
												<span className='error-icon'>❌</span>
												{error.message}
											</div>
										))}
									</div>
								)}
							</>
						)}
					</div>
				</div>

				<div className='forge-metrics'>
					<div className='metric-card'>
						<div className='metric-value'>100%</div>
						<div className='metric-label'>Type Safety</div>
					</div>
					<div className='metric-card'>
						<div className='metric-value'>0</div>
						<div className='metric-label'>Runtime Errors</div>
					</div>
					<div className='metric-card'>
						<div className='metric-value'>∞</div>
						<div className='metric-label'>Confidence</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Introduction to TypeScript Basics</span>
					<span className='discovered-by'>Master Typus's First Lesson</span>
				</div>
				<pre>{`// Basic Type Annotations - The Foundation of the Forge
let apprenticeName: string = "Aria";
let forgeTemperature: number = 1000;
let isForgeActive: boolean = true;

// Type Inference - TypeScript's Natural Magic
let kingdom = "React"; // TypeScript knows this is a string
let componentCount = 42; // TypeScript knows this is a number

// Arrays with Types
let components: string[] = ["Button", "Card", "Form"];
let propCounts: number[] = [3, 5, 8];

// Object Types with Interfaces
interface Component {
  name: string;
  props: string[];
  isReusable: boolean;
}

const buttonComponent: Component = {
  name: "Button",
  props: ["label", "onClick", "disabled"],
  isReusable: true
};

// Function Types - Contracts for Behavior
function forgeComponent(name: string, propCount: number): Component {
  return {
    name,
    props: Array(propCount).fill("prop"),
    isReusable: true
  };
}

// Union Types - Multiple Possibilities
type ButtonVariant = "primary" | "secondary" | "danger";
let currentVariant: ButtonVariant = "primary";

// Type Guards - Runtime Type Checking
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// The Power of 'never' - Impossible States
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

// Master Typus says: "With types, we make the implicit explicit,
// the uncertain certain, and the impossible... impossible."`}</pre>
			</div>

			<div className='type-transformation'>
				<div className='code-before'>
					<h4>JavaScript (Before)</h4>
					<pre>{`function greet(name) {
  return "Hello, " + name;
}

greet(); // undefined
greet(123); // "Hello, 123"`}</pre>
				</div>
				<div className='transform-arrow'>→</div>
				<div className='code-after'>
					<h4>TypeScript (After)</h4>
					<pre>{`function greet(name: string): string {
  return "Hello, " + name;
}

greet(); // ❌ Error: Expected 1 argument
greet(123); // ❌ Error: number not assignable to string`}</pre>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Type Lesson:</h3>
				<p>
					Types are like the blueprints of the Type Forge - they define what's 
					possible before the code even runs. Master Typus teaches that a well-typed 
					application is like a well-forged sword: strong, reliable, and sharp enough 
					to cut through complexity. TypeScript doesn't just catch bugs; it prevents 
					entire categories of errors from ever existing.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					<strong>How do types serve as "contracts" between different parts of your application?</strong> 
					Consider how they create agreements about data shape and function behavior.
				</p>
				<p>
					<strong>Why is compile-time error catching more powerful than runtime validation?</strong> 
					Think about the development experience and confidence it provides.
				</p>
			</div>

			<div className='master-wisdom'>
				<div className='wisdom-quote'>
					"In the Type Forge, we don't just write code - we forge contracts. Each type 
					is a promise, each interface a guarantee. When your code compiles, it's not 
					hope that makes it work - it's certainty."
				</div>
				<div className='wisdom-author'>- Master Typus, Keeper of the Type Forge</div>
			</div>

			<div className='chapter-ending'>
				<p>
					As <strong>Aria</strong> practiced with the forge, she began to understand 
					the power of types. Each annotation was like a protective spell, each 
					interface a binding contract.
				</p>
				<p>
					"I see it now," she said, watching as TypeScript caught an error before 
					her code even ran. "It's like having Debuggora's vision built into the 
					very language!"
				</p>
				<p>
					<strong>Master Typus</strong> nodded approvingly. "You're beginning to 
					understand. But basic types are just the beginning. Ready to learn how 
					to type your React components?"
				</p>
				<p>
					<strong>Binary</strong> calculated eagerly. "Component contracts! This 
					will make our prop passing bulletproof!"
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;