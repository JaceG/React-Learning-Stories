const ChapterOne = ({
	selectedComponent,
	handleComponentSelect,
	handlePropSelect,
	activeProp,
	handlePropValueChange,
	currentPropValues,
}) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: The Royal Messengers</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the Component Kingdom, communication was vital. The
					master builder <strong>App</strong> needed a way to tell
					each workshop exactly what to create. For this purpose, the
					kingdom employed special messengers, known as{' '}
					<strong>Props</strong>.
				</p>

				<p className='story-paragraph'>
					These messengers carried satchels filled with specific
					instructions from App to each workshop. A Button workshop
					might receive props telling it what color to be, what text
					to display, and what action to perform when clicked.
				</p>

				<div className='props-kingdom-illustration'>
					<div className='app-castle'>
						<div className='app-label'>App Component</div>
					</div>

					<div className='messengers-container'>
						<div
							className={`messenger messenger-button ${
								selectedComponent === 'button' ? 'selected' : ''
							}`}
							onClick={() => handleComponentSelect('button')}>
							<div className='messenger-label'>
								Button Messenger
							</div>
							<div className='satchel-icon'>📫</div>
						</div>
						<div
							className={`messenger messenger-card ${
								selectedComponent === 'card' ? 'selected' : ''
							}`}
							onClick={() => handleComponentSelect('card')}>
							<div className='messenger-label'>
								Card Messenger
							</div>
							<div className='satchel-icon'>📫</div>
						</div>
					</div>

					<div className='props-pathway'>
						{selectedComponent && (
							<div className='prop-satchel'>
								<div className='satchel-content'>
									{selectedComponent === 'button' ? (
										<div className='props-list'>
											<div
												className={`prop-item ${
													activeProp === 'buttonColor'
														? 'active'
														: ''
												}`}
												onClick={() =>
													handlePropSelect(
														'buttonColor'
													)
												}>
												color: "
												{currentPropValues.buttonColor}"
											</div>
											<div
												className={`prop-item ${
													activeProp === 'buttonText'
														? 'active'
														: ''
												}`}
												onClick={() =>
													handlePropSelect(
														'buttonText'
													)
												}>
												text: "
												{currentPropValues.buttonText}"
											</div>
											<div
												className={`prop-item ${
													activeProp === 'buttonClick'
														? 'active'
														: ''
												}`}
												onClick={() =>
													handlePropSelect(
														'buttonClick'
													)
												}>
												onClick: function()
												&#123;...&#125;
											</div>
										</div>
									) : (
										<div className='props-list'>
											<div
												className={`prop-item ${
													activeProp === 'cardTitle'
														? 'active'
														: ''
												}`}
												onClick={() =>
													handlePropSelect(
														'cardTitle'
													)
												}>
												title: "
												{currentPropValues.cardTitle}"
											</div>
											<div
												className={`prop-item ${
													activeProp === 'cardContent'
														? 'active'
														: ''
												}`}
												onClick={() =>
													handlePropSelect(
														'cardContent'
													)
												}>
												content: "
												{currentPropValues.cardContent}"
											</div>
										</div>
									)}
								</div>
								<div className='satchel-arrow'>↓</div>
							</div>
						)}
					</div>

					<div className='workshops-container'>
						<div
							className={`workshop button-workshop ${
								selectedComponent === 'button' ? 'active' : ''
							}`}>
							<h4>Button Workshop</h4>
							{selectedComponent === 'button' && (
								<div className='workshop-output'>
									<button
										style={{
											backgroundColor:
												currentPropValues.buttonColor,
											color: 'white',
											padding: '8px 16px',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer',
										}}
										onClick={() =>
											alert('Button clicked!')
										}>
										{currentPropValues.buttonText}
									</button>
								</div>
							)}
						</div>
						<div
							className={`workshop card-workshop ${
								selectedComponent === 'card' ? 'active' : ''
							}`}>
							<h4>Card Workshop</h4>
							{selectedComponent === 'card' && (
								<div className='workshop-output'>
									<div className='card-component'>
										<h3>{currentPropValues.cardTitle}</h3>
										<p>{currentPropValues.cardContent}</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					Props could contain various types of information: text
					strings, numbers, boolean flags, functions, arrays, objects,
					and even other components. This flexibility allowed for rich
					communication between components.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Modify Props
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							👉 Click on a messenger above to see what props it
							carries!
						</strong>
					</p>
					<p>Click on a specific prop to modify its value below.</p>
				</div>

				{activeProp && (
					<div className='prop-editor'>
						<h4>Edit {activeProp}</h4>
						{activeProp === 'buttonColor' && (
							<div className='prop-input-group'>
								<label>Button Color:</label>
								<select
									value={currentPropValues.buttonColor}
									onChange={(e) =>
										handlePropValueChange(
											'buttonColor',
											e.target.value
										)
									}>
									<option value='blue'>Blue</option>
									<option value='red'>Red</option>
									<option value='green'>Green</option>
									<option value='purple'>Purple</option>
									<option value='orange'>Orange</option>
								</select>
							</div>
						)}

						{activeProp === 'buttonText' && (
							<div className='prop-input-group'>
								<label>Button Text:</label>
								<input
									type='text'
									value={currentPropValues.buttonText}
									onChange={(e) =>
										handlePropValueChange(
											'buttonText',
											e.target.value
										)
									}
									placeholder='Enter button text'
								/>
							</div>
						)}

						{activeProp === 'cardTitle' && (
							<div className='prop-input-group'>
								<label>Card Title:</label>
								<input
									type='text'
									value={currentPropValues.cardTitle}
									onChange={(e) =>
										handlePropValueChange(
											'cardTitle',
											e.target.value
										)
									}
									placeholder='Enter card title'
								/>
							</div>
						)}

						{activeProp === 'cardContent' && (
							<div className='prop-input-group'>
								<label>Card Content:</label>
								<textarea
									value={currentPropValues.cardContent}
									onChange={(e) =>
										handlePropValueChange(
											'cardContent',
											e.target.value
										)
									}
									placeholder='Enter card content'
									rows='3'
								/>
							</div>
						)}

						{activeProp === 'buttonClick' && (
							<div className='prop-description'>
								<p>
									The onClick prop is a function that will be
									called when the button is clicked.
								</p>
								<button
									className='test-function-button'
									onClick={() =>
										alert(
											'This is the onClick function in action!'
										)
									}>
									Test the onClick Function
								</button>
							</div>
						)}
					</div>
				)}
			</div>

			<div className='code-example'>
				<pre>{`// The App component sending Props to a Button
function App() {
return (
<div>
<Button 
color="${currentPropValues.buttonColor}" 
text="${currentPropValues.buttonText}" 
onClick={() => alert('Button clicked!')}
/>
</div>
);
}

// The Button component receiving Props
function Button(props) {
return (
<button 
style={{ backgroundColor: props.color }}
onClick={props.onClick}
>
{props.text}
</button>
);
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Props Lesson:</h3>
				<p>
					Props are the primary way for parent components to pass data
					to child components in React. They are read-only and flow
					downward through the component tree, allowing parent
					components to control and configure their children.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the messenger metaphor help you understand how
					props work in React?
				</p>
				<p>
					How might you use different prop types to create more
					dynamic and reusable components?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
