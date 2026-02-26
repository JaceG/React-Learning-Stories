import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterThree() {
	const [testProps, setTestProps] = useState({
		name: '',
		level: '',
		element: 'fire',
	});

	const [validationResults, setValidationResults] = useState([]);

	const propValidations = {
		name: {
			test: (value) => value && value.length >= 3,
			message: 'Name must be at least 3 characters',
		},
		level: {
			test: (value) => !isNaN(value) && value >= 1 && value <= 100,
			message: 'Level must be a number between 1 and 100',
		},
		element: {
			test: (value) => ['fire', 'water', 'earth', 'air'].includes(value),
			message: 'Element must be fire, water, earth, or air',
		},
	};

	const validateProps = () => {
		const results = Object.entries(testProps).map(([key, value]) => {
			const validation = propValidations[key];
			const isValid = validation.test(value);
			return {
				prop: key,
				value,
				isValid,
				message: isValid ? 'Valid!' : validation.message,
			};
		});
		setValidationResults(results);
	};

	const updateProp = (key, value) => {
		setTestProps({ ...testProps, [key]: value });
	};

	const resetValidation = () => {
		setTestProps({
			name: '',
			level: '',
			element: 'fire',
		});
		setValidationResults([]);
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={3}
					title="The Validation Vault"
					bridge="On the final day at the Prop Forge, Destructo led Aria and Binary deep underground to a chamber that hummed with protective energy. Glowing runes covered every surface, pulsing with validation magic."
				/>

			<StorySection
				paragraphs={[
					`"Welcome to the Validation Vault," Destructo said solemnly. "This is where we ensure prop quality. Every prop that passes through here is tested, validated, and guaranteed to be exactly what it claims."`,
					`Aria examined the runes. "These symbols... they're checking data types?"`,
					`"Precisely! The most insidious bugs come from props that lie," Destructo explained. "A string masquerading as a number, a missing required prop, an unexpected null - these can shatter components like brittle iron."`,
					`Binary projected a warning symbol. "Type errors detected! Type errors detected!"`,
					`"Your companion understands!" Destructo smiled. "In the early days, we used PropTypes - magical validators that warned of incorrect props. Now, many smiths use TypeScript, an even more powerful enchantment that catches errors before the code even runs."`,
					`"It's like having a quality inspector for every prop?" Aria asked.`,
					`"Exactly! And just as important - default values provide safety nets when optional props are missing. Come, let me show you the validation process!"`
				]}
			/>

				<div className='interactive-section'>
					<h3>The Validation Forge</h3>
					<p>Test prop validation by forging a magical item:</p>

					<div className='validation-panel'>
						<div style={{ marginBottom: '20px' }}>
							<label
								style={{
									display: 'block',
									marginBottom: '5px',
								}}>
								Item Name:
								<input
									type='text'
									value={testProps.name}
									onChange={(e) =>
										updateProp('name', e.target.value)
									}
									style={{
										display: 'block',
										width: '100%',
										padding: '8px',
										marginTop: '5px',
										borderRadius: '4px',
										border: '1px solid #dee2e6',
									}}
								/>
							</label>
						</div>

						<div style={{ marginBottom: '20px' }}>
							<label
								style={{
									display: 'block',
									marginBottom: '5px',
								}}>
								Power Level:
								<input
									type='text'
									value={testProps.level}
									onChange={(e) =>
										updateProp('level', e.target.value)
									}
									style={{
										display: 'block',
										width: '100%',
										padding: '8px',
										marginTop: '5px',
										borderRadius: '4px',
										border: '1px solid #dee2e6',
									}}
								/>
							</label>
						</div>

						<div style={{ marginBottom: '20px' }}>
							<label
								style={{
									display: 'block',
									marginBottom: '5px',
								}}>
								Element Type:
								<select
									value={testProps.element}
									onChange={(e) =>
										updateProp('element', e.target.value)
									}
									style={{
										display: 'block',
										width: '100%',
										padding: '8px',
										marginTop: '5px',
										borderRadius: '4px',
										border: '1px solid #dee2e6',
									}}>
									<option value='fire'>Fire</option>
									<option value='water'>Water</option>
									<option value='earth'>Earth</option>
									<option value='air'>Air</option>
									<option value='chaos'>
										Chaos (Invalid)
									</option>
								</select>
							</label>
						</div>

						<div
							style={{
								display: 'flex',
								gap: '10px',
								justifyContent: 'center',
							}}>
							<button
								className='forge-button'
								onClick={validateProps}>
								Validate Props
							</button>
							<button
								className='reset-button'
								onClick={resetValidation}
								disabled={
									testProps.name === '' &&
									testProps.level === '' &&
									testProps.element === 'fire' &&
									validationResults.length === 0
								}>
								Reset Validation
							</button>
						</div>

						{validationResults.length > 0 && (
							<div style={{ marginTop: '20px' }}>
								<h4>Validation Results:</h4>
								{validationResults.map((result, index) => (
									<div
										key={index}
										className={`validation-result ${
											result.isValid ? 'valid' : 'invalid'
										}`}>
										<strong>{result.prop}:</strong>{' '}
										{result.message}
										{result.value && (
											<span>
												{' '}
												(value: "{result.value}")
											</span>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

			<StorySection
				paragraphs={[
					`After the validation demonstration, Destructo gathered several perfectly forged props, each bearing the seal of quality. "These represent the pinnacle of our craft," he said proudly.`,
					`"Remember the sacred rules, Aria: Never mutate props - they're read-only contracts. Always validate for type safety. Provide sensible defaults for optional props. And document everything!"`,
					`Aria nodded thoughtfully. "So validation isn't just about catching errors - it's about creating reliable contracts between components?"`,
					`"Wisdom beyond your years!" Destructo beamed. "Props are promises. When a parent sends props to a child, it's making a promise about what data will arrive. Validation ensures that promise is kept."`,
					`"Future developers - including yourself six months from now - will thank you for clear prop interfaces and good validation. It's the difference between a forge that produces masterworks and one that creates brittle failures."`
				]}
			/>

				<CodeExample
					title="PropTypes and TypeScript Validation"
					code={`// PropTypes validation (classic approach)
import PropTypes from 'prop-types';

function MagicalItem({ name, level, element, onUse }) {
  return (
    <div className="item">
      <h3>{name}</h3>
      <p>Level: {level}</p>
      <p>Element: {element}</p>
      <button onClick={onUse}>Use Item</button>
    </div>
  );
}

MagicalItem.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  element: PropTypes.oneOf(['fire', 'water', 'earth', 'air']).isRequired,
  onUse: PropTypes.func.isRequired
};

MagicalItem.defaultProps = {
  element: 'fire'
};

// TypeScript approach (modern)
interface MagicalItemProps {
  name: string;
  level: number;
  element: 'fire' | 'water' | 'earth' | 'air';
  onUse: () => void;
  rarity?: 'common' | 'rare' | 'legendary'; // optional prop
}

const MagicalItem: React.FC<MagicalItemProps> = ({ 
  name, 
  level, 
  element = 'fire', 
  onUse,
  rarity = 'common'
}) => {
  return (
    <div className="item">
      <h3>{name}</h3>
      <p>Level: {level}</p>
      <p>Element: {element}</p>
      <p>Rarity: {rarity}</p>
      <button onClick={onUse}>Use Item</button>
    </div>
  );
};

// Runtime validation helper
function validateProps(props, schema) {
  const errors = [];
  
  Object.entries(schema).forEach(([key, validator]) => {
    if (validator.required && !props[key]) {
      errors.push(\`\${key} is required\`);
    }
    if (props[key] && validator.type && typeof props[key] !== validator.type) {
      errors.push(\`\${key} must be of type \${validator.type}\`);
    }
    if (props[key] && validator.validate && !validator.validate(props[key])) {
      errors.push(\`\${key} failed validation\`);
    }
  });
  
  return errors;
}`}
				/>

				<div className='interactive-section'>
					<h3>Master Smith's Best Practices</h3>
					<div className='forge-controls'>
						<h4>The Sacred Rules of Prop Forging:</h4>

						<ol style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
							<li>
								<strong>Never Mutate Props:</strong> Props are
								read-only contracts
							</li>
							<li>
								<strong>Validate Early:</strong> Catch type
								errors during development
							</li>
							<li>
								<strong>Provide Defaults:</strong> Handle
								missing optional props gracefully
							</li>
							<li>
								<strong>Use Descriptive Names:</strong>{' '}
								<code>isLoading</code> not <code>loading</code>
							</li>
							<li>
								<strong>Keep Props Minimal:</strong> Pass only
								what's needed
							</li>
							<li>
								<strong>Document Complex Props:</strong> Add
								comments for clarity
							</li>
							<li>
								<strong>Avoid Prop Drilling:</strong> Consider
								Context for deep trees
							</li>
							<li>
								<strong>Type Your Props:</strong> Use TypeScript
								or PropTypes
							</li>
						</ol>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "Master Destructo's Final Wisdom:",
						content: "Prop validation transforms fragile components into reliable systems. Use PropTypes for runtime warnings or TypeScript for compile-time safety. Always provide default values for optional props, creating robust components that handle edge cases gracefully. Well-validated props serve as living documentation, showing exactly what each component expects. Remember: props are immutable contracts - validate them thoroughly, document them clearly, and never mutate them directly. Quality validation prevents bugs before they happen."
					}}
					reflectionQuestions={[
						"How does the forging metaphor help you think about prop quality and validation?",
						"What benefits do you see in treating props as \"contracts\" between components?",
						"How might validation patterns change as your application scales?"
					]}
					journalEntry={{
						title: "Aria's Journal - Day 14 (Evening)",
						content: "The Validation Vault revealed the final secrets of prop mastery! Props are contracts between components, and validation ensures those contracts are honored. PropTypes provide runtime warnings, while TypeScript catches errors before code even runs. Default values act as safety nets for optional props. Destructo's sacred rules: never mutate props, validate everything, provide defaults, use clear names, and document thoroughly. The forge taught me that prop handling isn't just about passing data - it's about creating reliable, maintainable component relationships. Quality props make quality applications!"
					}}
					lessonEnding={[
						"As they prepared to leave the Prop Forge, Destructo presented Aria with a small hammer pendant. \"This symbolizes your mastery of prop transformation. You've learned to destructure, spread, and validate - the three pillars of prop craftsmanship.\"",
						"\"Thank you, Master Destructo,\" Aria said, fastening the pendant. \"I'll never look at props the same way. They're not just data - they're carefully crafted artifacts that need respect and proper handling.\"",
						"Binary displayed a holographic forge in miniature. \"Props forged with care!\"",
						"\"Indeed!\" Destructo laughed. \"Now, I believe you have one more destination? The Echo Caves await, where you'll learn how events travel back up the component tree.\"",
						"\"From props flowing down to events echoing up,\" Aria mused. \"The cycle completes!\"",
						"\"May your props be well-typed and your components unbreakable!\" Destructo called as they departed. The forge's heat faded behind them as they headed toward their final lesson."
					]}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterThree;
