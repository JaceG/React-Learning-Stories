const ChapterThree = ({
	propTypeComponent,
	propInputs,
	propTypeErrors,
	showPropTypeErrors,
	handlePropTypeComponentChange,
	handlePropInputChange,
	validateProps,
}) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The PropTypes Guardians
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					As the Component Kingdom grew, occasionally messengers would
					deliver the wrong type of props to a workshop. A Button
					might receive a number where it expected text, or a Card
					might receive a string where it expected an object. These
					mismatches caused chaos in the kingdom.
				</p>

				<p className='story-paragraph'>
					To solve this problem, the kingdom established the PropTypes
					Guardians - specialized sentinels that inspected the props
					at each workshop to ensure they were of the correct type. If
					an improper prop was detected, the Guardians would raise a
					warning.
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
										<select
											value={propInputs.size}
											onChange={(e) =>
												handlePropInputChange(
													'size',
													e.target.value
												)
											}>
											<option value='small'>small</option>
											<option value='medium'>
												medium
											</option>
											<option value='large'>large</option>
										</select>
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
										<select
											value={propInputs.isActive}
											onChange={(e) =>
												handlePropInputChange(
													'isActive',
													e.target.value === 'true'
												)
											}>
											<option value='true'>true</option>
											<option value='false'>false</option>
										</select>
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
										}}>
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
					The PropTypes Guardians didn't prevent a component from
					rendering with incorrect props, but they provided valuable
					warnings during development, making it easier to track down
					bugs. Some workshops also established DefaultProps as
					fallback values if a messenger failed to deliver a
					particular prop.
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
					<ul>
						<li>Delete the text for a required prop</li>
						<li>
							Try entering a number (like 42) instead of a string
							for 'color'
						</li>
						<li>
							Remove the parentheses from the onClick function
						</li>
						<li>Try entering "extraLarge" for the size prop</li>
					</ul>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`import PropTypes from 'prop-types';

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

// Default values for props
Button.defaultProps = {
size: 'medium'
};`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The PropTypes Lesson:</h3>
				<p>
					Type checking with PropTypes helps catch bugs by verifying
					that components receive the right types of props. This is
					especially useful in larger applications where components
					may be reused in different contexts. Default props provide
					fallback values to ensure components can render even if
					certain props are omitted.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Why is it helpful to detect prop type errors during
					development rather than at runtime?
				</p>
				<p>
					How might PropTypes and defaultProps work together to create
					more robust components?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;
