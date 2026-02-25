import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';
import useNarrative from '../../../../../hooks/useNarrative';

const ChapterThree = () => {
	const { narrative, loading } = useNarrative('components-basics', 'PropsMessengers', 3);
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

	if (loading || !narrative) return <div className="chapter loading">Loading...</div>;

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={narrative.title}
				bridge={narrative.bridge}
			/>

			<StorySection paragraphs={narrative.storySections[0]} />

			<div className='proptype-guardians-illustration'>
				<div className='component-selector'>
					<h3>Choose a Component</h3>
					<div className='component-options'>
						<button
							className={`component-option ${
								propTypeComponent === 'button' ? 'selected' : ''
							}`}
							onClick={() =>
								handlePropTypeComponentChange('button')
							}>
							Button Component
						</button>
						<button
							className={`component-option ${
								propTypeComponent === 'card' ? 'selected' : ''
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
									<label>color (string.isRequired):</label>
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
												(err) => err.prop === 'color'
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
									<label>onClick (func.isRequired):</label>
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
												(err) => err.prop === 'onClick'
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
									<label>title (string.isRequired):</label>
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
									<label>content (string.isRequired):</label>
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
												: propInputs.size === 'large'
													? '12px 24px'
													: '8px 16px',
										fontSize:
											propInputs.size === 'small'
												? '12px'
												: propInputs.size === 'large'
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
									propInputs.isActive ? 'active' : 'inactive'
								}`}>
								<h3>{propInputs.title || 'Default Title'}</h3>
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

			<StorySection paragraphs={narrative.storySections[1]} />

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Be the PropTypes Guardian!
				</h3>
				<InstructionBox
					character='Try modifying the props above to trigger PropType warnings!'
					secondaryText='See if you can understand why each warning appears based on the PropTypes definition.'
				/>

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

			<CodeExample
				title="Guardian TypeCheck's Protection Spell"
				discoveredBy='Learned by Aria at the Guild'
				code={`import PropTypes from 'prop-types';

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
};`}
			/>

			<StorySection paragraphs={narrative.storySections[2]} />

			<ChapterSummary
				characterIntros={narrative.characterIntros}
				lessonInsight={narrative.lessonInsight}
				reflectionQuestions={narrative.reflectionQuestions}
				journalEntry={narrative.journalEntry}
				lessonEnding={narrative.lessonEnding}
			/>
		</div>
	);
};

export default ChapterThree;
