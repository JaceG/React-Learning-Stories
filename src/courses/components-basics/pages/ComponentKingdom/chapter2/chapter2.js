import { useState } from 'react';

const ChapterTwo = () => {
	const [selectedProp, setSelectedProp] = useState(null);
	const [customLabel, setCustomLabel] = useState('');

	const handlePropClick = (name, value) => {
		setSelectedProp({ name, value });
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: Messages Between Workshops
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					For the Component Kingdom to function properly, workshops
					needed to communicate with each other. The master builder
					App would send special messengers carrying bags called{' '}
					<strong>Props</strong> to each workshop. These props
					contained all the specifications a workshop needed to create
					its piece.
				</p>

				<div className='messenger-illustration'>
					<div className='app-messenger'>
						<div className='messenger-label'>App</div>
						<div className='messenger-bag'>
							<div
								className='prop-item'
								onClick={() =>
									handlePropClick('label', 'Royal Decree')
								}>
								label: "Royal Decree"
							</div>
							<div
								className='prop-item'
								onClick={() =>
									handlePropClick(
										'onClick',
										'function() { alert("Hear ye!") }'
									)
								}>
								onClick: function() {'{}'}
							</div>
						</div>
						<div className='messenger-arrow'>→</div>
					</div>
					<div className='button-receiver'>
						<div className='receiver-label'>Button</div>
						<div id='button-output' className='receiver-output'>
							{selectedProp ? (
								<div className='prop-effect'>
									<div className='prop-name'>
										Receiving:{' '}
										<strong>{selectedProp.name}</strong>
									</div>
									<div className='prop-value'>
										Value: <code>{selectedProp.value}</code>
									</div>
									<div className='prop-result'>
										{selectedProp.name === 'label' ? (
											<button className='preview-button'>
												{selectedProp.value}
											</button>
										) : (
											<button
												className='preview-button'
												onClick={() =>
													alert('Hear ye!')
												}>
												Click to Trigger Function
											</button>
										)}
									</div>
								</div>
							) : (
								<div className='instruction-hint'>
									Click on a prop in the messenger bag
								</div>
							)}
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					Each workshop would receive these props and use them to
					determine exactly what to build and how it should behave.
					Props could contain any type of information - text, numbers,
					functions, or even other components!
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Prop Messenger
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							👉 Click on different props in the messenger bag to
							see how they affect the Button component!
						</strong>
					</p>
				</div>

				<div className='prop-customizer'>
					<h4>Try Your Own Props</h4>
					<div className='prop-form'>
						<div className='prop-input-group'>
							<label>Button Label:</label>
							<input
								type='text'
								value={customLabel}
								onChange={(e) => setCustomLabel(e.target.value)}
								placeholder='Enter button text'
							/>
							<button
								className='apply-button'
								onClick={() =>
									handlePropClick('label', customLabel)
								}>
								Apply
							</button>
						</div>
					</div>
					<div className='prop-result-preview'>
						<h4>Result:</h4>
						<button className='preview-button'>
							{customLabel || 'Click Me'}
						</button>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// The App sends props to different workshops
function App() {
return (
<div className="app-container">
<Button 
label="Royal Decree" 
onClick={() => alert('Hear ye, hear ye!')} 
/>

<Card 
title="Kingdom News" 
content="The annual Component Festival begins tomorrow!" 
/>
</div>
);
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Props Lesson:</h3>
				<p>
					Props are how components talk to each other. They're passed
					from parent to child, like arguments to a function. Props
					allow components to be flexible and reusable with different
					data and behaviors.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the messenger metaphor help you understand how
					props work in React?
				</p>
				<p>
					Why is it important that props can carry different types of
					data (strings, numbers, functions)?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;
