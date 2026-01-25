import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';

const ChapterThree = () => {
	const [propTypeComponent, setPropTypeComponent] = useState('button');
	const [propTypeErrors, setPropTypeErrors] = useState([]);
	const [showPropTypeErrors, setShowPropTypeErrors] = useState(false);
	const [propInputs, setPropInputs] = useState({
		color: 'blue',
		text: 'Click Me',
		onClick: '() => alert("Clicked!")',
		size: 'medium',
		title: '',
		content: '',
		image: '',
		isActive: true,
	});

	const handlePropTypeComponentChange = (component) => {
		setPropTypeComponent(component);
		setShowPropTypeErrors(false);
		setPropTypeErrors([]);
	};

	const handlePropInputChange = (propName, value) => {
		setPropInputs({
			...propInputs,
			[propName]: value,
		});
	};

	const validateProps = () => {
		const newErrors = [];

		if (propTypeComponent === 'button') {
			if (
				typeof propInputs.color !== 'string' ||
				propInputs.color.trim() === '' ||
				!isNaN(propInputs.color)
			) {
				newErrors.push({
					prop: 'color',
					expected: 'string',
					received: typeof propInputs.color,
				});
			}
			if (
				typeof propInputs.text !== 'string' ||
				propInputs.text.trim() === '' ||
				!isNaN(propInputs.text)
			) {
				newErrors.push({
					prop: 'text',
					expected: 'string',
					received: typeof propInputs.text,
				});
			}
			if (!propInputs.onClick.includes('()')) {
				newErrors.push({
					prop: 'onClick',
					expected: 'function',
					received: 'not a function',
				});
			}
			const allowedSizes = ['small', 'medium', 'large'];
			if (propInputs.size && !allowedSizes.includes(propInputs.size)) {
				newErrors.push({
					prop: 'size',
					expected: "one of ['small', 'medium', 'large']",
					received: propInputs.size,
				});
			}
			if (!propInputs.color) {
				newErrors.push({
					prop: 'color',
					error: 'Required prop missing',
				});
			}
			if (!propInputs.text) {
				newErrors.push({
					prop: 'text',
					error: 'Required prop missing',
				});
			}
		}
		if (
			typeof propInputs.title !== 'string' ||
			propInputs.title.trim() === '' ||
			!isNaN(propInputs.title)
		) {
			newErrors.push({
				prop: 'title',
				expected: 'string',
				received: typeof propInputs.title,
			});
		}
		if (
			typeof propInputs.content !== 'string' ||
			propInputs.content.trim() === '' ||
			!isNaN(propInputs.content)
		) {
			newErrors.push({
				prop: 'content',
				expected: 'string',
				received: typeof propInputs.content,
			});
		}
		if (
			propInputs.image &&
			(typeof propInputs.image !== 'string' || !isNaN(propInputs.image))
		) {
			newErrors.push({
				prop: 'image',
				expected: 'string',
				received: typeof propInputs.image,
			});
		}
		if (
			propInputs.isActive !== undefined &&
			typeof propInputs.isActive !== 'boolean'
		) {
			newErrors.push({
				prop: 'isActive',
				expected: 'boolean',
				received: typeof propInputs.isActive,
			});
		}
		if (!propInputs.title) {
			newErrors.push({
				prop: 'title',
				error: 'Required prop missing',
			});
		}
		if (!propInputs.content) {
			newErrors.push({
				prop: 'content',
				error: 'Required prop missing',
			});
		}
		setPropTypeErrors(newErrors);
		setShowPropTypeErrors(true);
	};

	function parseOnClickFunction(onClickInput) {
		if (typeof onClickInput === 'function') return onClickInput;
		if (typeof onClickInput === 'string') {
			// Only allow a simple alert for demo purposes
			if (onClickInput.includes('alert')) {
				return () => alert('This is the onClick function in action!');
			}
		}
		return () => {};
	}

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title='The PropTypes Guardians'
				bridge='Having learned about the one-way flow of props, Aria was ready for the final lesson at the Props Messenger Guild. Hermes had one more important concept to share.'
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"As our kingdom grew," Hermes began, "we encountered a new problem. 
					Sometimes messengers would deliver the wrong type of props to a workshop. 
					A Button might receive a number where it expected text, or a Card 
					might receive a string where it expected an object."
				</p>
				
				<p className='story-paragraph'>
					Aria winced. "That must have caused chaos!"
				</p>
				
				<p className='story-paragraph'>
					"Indeed it did," Hermes nodded. "Until we established the 
					<strong>PropTypes Guardians</strong> - specialized sentinels that 
					inspect the props at each workshop to ensure they are of the correct 
					type. If an improper prop is detected, the Guardians raise a warning."
				</p>
				
				<p className='story-paragraph'>
					A stern-looking guardian appeared, wearing robes adorned with type 
					symbols. "I am Guardian TypeCheck," she announced. "I ensure that 
					workshops receive exactly what they expect. Watch and learn!"
				</p>

				<div className='proptype-guardians-illustration'>
					<div className='component-selector'>
						<h3>Choose a Component</h3>
						<div className='component-options'>
							<button
								className={`component-option ${
									propTypeComponent === 'button'
										? 'selected'
										: ''
								}`}
								onClick={() =>
									handlePropTypeComponentChange('button')
								}>
								Button Component
							</button>
							<button
								className={`component-option ${
									propTypeComponent === 'card'
										? 'selected'
										: ''
								}`}
								onClick={() =>
									handlePropTypeComponentChange('card')
								}>
								Card Component
							</button>
						</div>
					</div>

					<div className='proptype-schema'>
						<h3>PropTypes Definition</h3>
						<div className='proptype-code'>
							<pre>
								{propTypeComponent === 'button'
									? `Button.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  size: 'medium'
};`
									: `Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
  isActive: PropTypes.bool
};

Card.defaultProps = {
  isActive: true
};`}
							</pre>
						</div>
					</div>

					<div className='props-testing-area'>
						<h3>Test Your Props</h3>
						<div className='prop-testing-form'>
							{propTypeComponent === 'button' ? (
								<>
									<div className='prop-input-group'>
										<label>
											color (string.isRequired):
										</label>
										<input
											type='text'
											value={propInputs.color}
											onChange={(e) =>
												handlePropInputChange(
													'color',
													e.target.value
												)
											}
											className={
												propTypeErrors.some(
													(err) =>
														err.prop === 'color'
												)
													? 'error'
													: ''
											}
										/>
									</div>
									<div className='prop-input-group'>
										<label>text (string.isRequired):</label>
										<input
											type='text'
											value={propInputs.text}
											onChange={(e) =>
												handlePropInputChange(
													'text',
													e.target.value
												)
											}
											className={
												propTypeErrors.some(
													(err) => err.prop === 'text'
												)
													? 'error'
													: ''
											}
										/>
									</div>
									<div className='prop-input-group'>
										<label>
											onClick (func.isRequired):
										</label>
										<input
											type='text'
											value={propInputs.onClick}
											onChange={(e) =>
												handlePropInputChange(
													'onClick',
													e.target.value
												)
											}
											className={
												propTypeErrors.some(
													(err) =>
														err.prop === 'onClick'
												)
													? 'error'
													: ''
											}
										/>
									</div>
									<div className='prop-input-group'>
										<label>
											size (oneOf['small', 'medium',
											'large']):
										</label>
										<input
											type='text'
											value={propInputs.size}
											onChange={(e) =>
												handlePropInputChange(
													'size',
													e.target.value
												)
											}
											placeholder='e.g. small, medium, large'
										/>
									</div>
								</>
							) : (
								<>
									<div className='prop-input-group'>
										<label>
											title (string.isRequired):
										</label>
										<input
											type='text'
											value={propInputs.title || ''}
											onChange={(e) =>
												handlePropInputChange(
													'title',
													e.target.value
												)
											}
										/>
									</div>
									<div className='prop-input-group'>
										<label>
											content (string.isRequired):
										</label>
										<textarea
											value={propInputs.content || ''}
											onChange={(e) =>
												handlePropInputChange(
													'content',
													e.target.value
												)
											}
											rows='3'
										/>
									</div>
									<div className='prop-input-group'>
										<label>image (string):</label>
										<input
											type='text'
											value={propInputs.image || ''}
											onChange={(e) =>
												handlePropInputChange(
													'image',
													e.target.value
												)
											}
										/>
									</div>
									<div className='prop-input-group'>
										<label>isActive (bool):</label>
										<input
											type='text'
											value={propInputs.isActive}
											onChange={(e) =>
												handlePropInputChange(
													'isActive',
													e.target.value
												)
											}
											placeholder='e.g. true, false, maybe'
										/>
									</div>
								</>
							)}
							<button
								className='validate-button'
								onClick={validateProps}>
								Validate Props
							</button>
						</div>
					</div>

					{showPropTypeErrors && (
						<div className='proptype-console'>
							<h3>PropTypes Console</h3>
							<div className='console-output'>
								{propTypeErrors.length > 0 ? (
									<div className='error-messages'>
										{propTypeErrors.map((error, index) => (
											<div
												className='error-message'
												key={index}>
												Warning: Failed prop type:{' '}
												{error.error ||
													`Invalid prop \`${error.prop}\` of type \`${error.received}\` supplied to \`${propTypeComponent}\`, expected \`${error.expected}\`.`}
											</div>
										))}
									</div>
								) : (
									<div className='success-message'>
										✓ All prop types are valid!
									</div>
								)}
							</div>
						</div>
					)}

					<div className='component-preview'>
						<h3>Component Preview</h3>
						<div className='preview-container'>
							{propTypeComponent === 'button' && (
								<div className='button-preview'>
									<button
										style={{
											backgroundColor:
												propInputs.color || 'blue',
											padding:
												propInputs.size === 'small'
													? '4px 8px'
													: propInputs.size ===
													  'large'
													? '12px 24px'
													: '8px 16px',
											fontSize:
												propInputs.size === 'small'
													? '12px'
													: propInputs.size ===
													  'large'
													? '18px'
													: '14px',
										}}
										onClick={parseOnClickFunction(
											propInputs.onClick
										)}>
										{propInputs.text || 'Default Text'}
									</button>
								</div>
							)}

							{propTypeComponent === 'card' && (
								<div
									className={`card-preview ${
										propInputs.isActive
											? 'active'
											: 'inactive'
									}`}>
									<h3>
										{propInputs.title || 'Default Title'}
									</h3>
									{propInputs.image && (
										<div className='card-image-placeholder'>
											[Image: {propInputs.image}]
										</div>
									)}
									<p>
										{propInputs.content ||
											'Default content text'}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"The PropTypes Guardians don't prevent a component from rendering 
					with incorrect props," Guardian TypeCheck explained, "but they 
					provide valuable warnings during development, making it easier to 
					track down bugs."
				</p>
				
				<p className='story-paragraph'>
					"And notice," Hermes added, "how some workshops establish 
					<strong>DefaultProps</strong> as fallback values if a messenger 
					fails to deliver a particular prop. It's like having spare parts 
					ready just in case!"
				</p>
				
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Be the PropTypes Guardian!
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							👉 Try modifying the props above to trigger PropType
							warnings!
						</strong>
					</p>
					<p>
						See if you can understand why each warning appears based
						on the PropTypes definition.
					</p>
				</div>

				<div className='tips-section'>
					<h4>Try These Experiments:</h4>
					{propTypeComponent === 'card' ? (
						<ul>
							<li>
								Delete the text for a required prop (title or
								content)
							</li>
							<li>
								Try entering a number (like 42) instead of a
								string for 'title' or 'content'
							</li>
							<li>
								Enter a non-string value (like 123) for the
								'image' prop
							</li>
							<li>
								Try entering something other than 'true' or
								'false' for isActive (like 'maybe')
							</li>
						</ul>
					) : (
						<ul>
							<li>Delete the text for a required prop</li>
							<li>
								Try entering a number (like 42) instead of a
								string for 'color'
							</li>
							<li>
								Remove the parentheses from the onClick function
							</li>
							<li>Try entering "extraLarge" for the size prop</li>
						</ul>
					)}
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Guardian TypeCheck's Protection Spell</span>
					<span className='discovered-by'>Learned by Aria at the Guild</span>
				</div>
				<pre>{`import PropTypes from 'prop-types';

// Aria's final lesson: Type safety for components
function Button({ color, text, onClick, size }) {
  return (
    <button 
      style={{ 
        backgroundColor: color,
        padding: size === 'small' ? '4px 8px' : 
            size === 'large' ? '12px 24px' : '8px 16px',
        fontSize: size === 'small' ? '12px' : 
             size === 'large' ? '18px' : '14px'
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// The PropTypes Guardians ensure props are correct
Button.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

// Default values for props - "spare parts" as Hermes calls them
Button.defaultProps = {
  size: 'medium'
};`}</pre>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: 'The PropTypes Lesson:',
					content:
						'Type checking with PropTypes helps catch bugs by verifying that components receive the right types of props. This is especially useful in larger applications where components may be reused in different contexts. Default props provide fallback values to ensure components can render even if certain props are omitted. Guardian TypeCheck reminds us: "An ounce of type checking is worth a pound of debugging!"',
				}}
				reflectionQuestions={[
					'Why is it helpful to detect prop type errors during development rather than at runtime?',
					'How might PropTypes and defaultProps work together to create more robust components?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 5",
					content:
						"The PropTypes Guardians are brilliant! They're like quality control inspectors, catching mistakes before they cause problems. I've learned so much at the Props Messenger Guild - how props flow from parent to child, how they must never be modified, and how PropTypes ensure we receive the right data. Tomorrow I head to the JSX Magic Academy!",
				}}
				chapterEnding={[
					'As Aria prepared to leave the Props Messenger Guild, Hermes handed her a special badge. "You\'ve earned this - the Messenger\'s Seal. You now understand how components communicate in our kingdom."',
					'"Thank you, Hermes," Aria said gratefully. "I feel like I truly understand props now - their flow, their immutability, and their types."',
					'"Your next destination is the JSX Magic Academy," Hermes pointed northward. "There you\'ll learn the ancient art of JSX - the magical syntax that makes React components possible. Safe travels!"',
				]}
			/>
		</div>
	);
};

export default ChapterThree;