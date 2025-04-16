import React, { useState } from 'react';
import LessonNavigation from '../../../components/layout/LessonNavigation';
import '../../CourseStyles.css';
import './PropsMessengers.css';

function PropsMessengers() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [messageBoard, setMessageBoard] = useState('');
	const [selectedComponent, setSelectedComponent] = useState(null);
	const [activeProp, setActiveProp] = useState(null);
	const [currentPropValues, setCurrentPropValues] = useState({
		buttonColor: 'blue',
		buttonText: 'Click Me',
		cardTitle: 'Welcome',
		cardContent: 'This is a card component',
	});

	// State for Chapter 3 PropTypes exercise
	const [propTypeComponent, setPropTypeComponent] = useState('button');
	const [propTypeErrors, setPropTypeErrors] = useState([]);
	const [showPropTypeErrors, setShowPropTypeErrors] = useState(false);
	const [propInputs, setPropInputs] = useState({
		color: 'blue',
		text: 'Click Me',
		onClick: '() => alert("Clicked!")',
		size: 'medium',
		isActive: true,
	});

	// State for drag and drop props exercise
	const [draggedProp, setDraggedProp] = useState(null);
	const [craftsmen, setCraftsmen] = useState([
		{
			id: 1,
			name: 'Button Craftsman',
			connected: false,
			accepts: ['color', 'text', 'action'],
		},
		{
			id: 2,
			name: 'Card Craftsman',
			connected: false,
			accepts: ['title', 'content', 'image'],
		},
		{
			id: 3,
			name: 'Navbar Craftsman',
			connected: false,
			accepts: ['menuItems', 'logo', 'theme'],
		},
	]);

	const [propBags, setPropBags] = useState([
		{ id: 1, type: 'color', content: 'red', assigned: false },
		{ id: 2, type: 'text', content: 'Click Me', assigned: false },
		{ id: 3, type: 'action', content: 'show alert', assigned: false },
		{ id: 4, type: 'title', content: 'Welcome', assigned: false },
		{ id: 5, type: 'content', content: 'This is a card', assigned: false },
		{ id: 6, type: 'image', content: 'picture.jpg', assigned: false },
		{
			id: 7,
			type: 'menuItems',
			content: ['Home', 'About'],
			assigned: false,
		},
		{ id: 8, type: 'logo', content: 'logo.png', assigned: false },
		{ id: 9, type: 'theme', content: 'dark', assigned: false },
	]);

	const handlePropDragStart = (e, propId) => {
		setDraggedProp(propId);
	};

	const handleCraftsmanDrop = (e, craftsmanId) => {
		e.preventDefault();

		if (draggedProp !== null) {
			// Find the prop and craftsman
			const prop = propBags.find((p) => p.id === draggedProp);
			const craftsman = craftsmen.find((c) => c.id === craftsmanId);

			// Check if craftsman accepts this prop type
			if (craftsman.accepts.includes(prop.type)) {
				// Mark the prop as assigned
				const updatedProps = propBags.map((p) =>
					p.id === draggedProp ? { ...p, assigned: true } : p
				);
				setPropBags(updatedProps);

				// Mark the craftsman as connected if all required props are assigned
				const requiredProps = propBags.filter((p) =>
					craftsman.accepts.includes(p.type)
				);

				const assignedCount = requiredProps.filter(
					(p) => p.assigned || p.id === draggedProp
				).length;

				if (assignedCount === craftsman.accepts.length) {
					const updatedCraftsmen = craftsmen.map((c) =>
						c.id === craftsmanId ? { ...c, connected: true } : c
					);
					setCraftsmen(updatedCraftsmen);

					// Show message
					setMessageBoard(
						`${craftsman.name} received all needed props!`
					);

					// Check if all craftsmen are connected
					if (updatedCraftsmen.every((c) => c.connected)) {
						setTimeout(() => {
							setMessageBoard(
								'All craftsmen have received their props! The Component Kingdom is thriving!'
							);
						}, 1000);
					}
				} else {
					setMessageBoard(
						`${craftsman.name} received a ${prop.type} prop!`
					);
				}
			} else {
				setMessageBoard(
					`${craftsman.name} doesn't need ${prop.type} props!`
				);
			}
		}

		setDraggedProp(null);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const resetCraftsmenAndProps = () => {
		setCraftsmen(craftsmen.map((c) => ({ ...c, connected: false })));
		setPropBags(propBags.map((p) => ({ ...p, assigned: false })));
		setMessageBoard('');
	};

	// Handle component selection in Chapter 1
	const handleComponentSelect = (component) => {
		setSelectedComponent(component);
		setActiveProp(null); // Reset active prop when selecting a new component
	};

	// Handle prop selection in Chapter 1
	const handlePropSelect = (prop) => {
		setActiveProp(prop);
	};

	// Handle prop value change in Chapter 1
	const handlePropValueChange = (propName, value) => {
		setCurrentPropValues({
			...currentPropValues,
			[propName]: value,
		});
	};

	// Chapter 3 PropTypes handlers
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
			// Validate color
			if (typeof propInputs.color !== 'string') {
				newErrors.push({
					prop: 'color',
					expected: 'string',
					received: typeof propInputs.color,
				});
			}

			// Validate text
			if (typeof propInputs.text !== 'string') {
				newErrors.push({
					prop: 'text',
					expected: 'string',
					received: typeof propInputs.text,
				});
			}

			// Validate onClick (simplified for demo)
			if (!propInputs.onClick.includes('()')) {
				newErrors.push({
					prop: 'onClick',
					expected: 'function',
					received: 'not a function',
				});
			}

			// Check for missing required props
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
		} else if (propTypeComponent === 'card') {
			// Validate title
			if (typeof propInputs.title !== 'string') {
				newErrors.push({
					prop: 'title',
					expected: 'string',
					received: typeof propInputs.title,
				});
			}

			// Validate content
			if (typeof propInputs.content !== 'string') {
				newErrors.push({
					prop: 'content',
					expected: 'string',
					received: typeof propInputs.content,
				});
			}
		}

		setPropTypeErrors(newErrors);
		setShowPropTypeErrors(true);
	};

	// Navigation functions
	const nextChapter = () => {
		if (currentChapter < 3) {
			setCurrentChapter(currentChapter + 1);
			setMessageBoard('');
		}
	};

	const prevChapter = () => {
		if (currentChapter > 1) {
			setCurrentChapter(currentChapter - 1);
			setMessageBoard('');
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Props Messengers</h1>
			<p className='lesson-subtitle'>
				A tale of communication between components
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

			{/* Chapter 1: Introduction to Props */}
			{currentChapter === 1 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 1: The Royal Messengers
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							In the Component Kingdom, communication was vital.
							The master builder <strong>App</strong> needed a way
							to tell each workshop exactly what to create. For
							this purpose, the kingdom employed special
							messengers, known as <strong>Props</strong>.
						</p>

						<p className='story-paragraph'>
							These messengers carried satchels filled with
							specific instructions from App to each workshop. A
							Button workshop might receive props telling it what
							color to be, what text to display, and what action
							to perform when clicked.
						</p>

						<div className='props-kingdom-illustration'>
							<div className='app-castle'>
								<div className='app-label'>App Component</div>
							</div>

							<div className='messengers-container'>
								<div
									className={`messenger messenger-button ${
										selectedComponent === 'button'
											? 'selected'
											: ''
									}`}
									onClick={() =>
										handleComponentSelect('button')
									}>
									<div className='messenger-label'>
										Button Messenger
									</div>
									<div className='satchel-icon'>📫</div>
								</div>
								<div
									className={`messenger messenger-card ${
										selectedComponent === 'card'
											? 'selected'
											: ''
									}`}
									onClick={() =>
										handleComponentSelect('card')
									}>
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
															activeProp ===
															'buttonColor'
																? 'active'
																: ''
														}`}
														onClick={() =>
															handlePropSelect(
																'buttonColor'
															)
														}>
														color: "
														{
															currentPropValues.buttonColor
														}
														"
													</div>
													<div
														className={`prop-item ${
															activeProp ===
															'buttonText'
																? 'active'
																: ''
														}`}
														onClick={() =>
															handlePropSelect(
																'buttonText'
															)
														}>
														text: "
														{
															currentPropValues.buttonText
														}
														"
													</div>
													<div
														className={`prop-item ${
															activeProp ===
															'buttonClick'
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
															activeProp ===
															'cardTitle'
																? 'active'
																: ''
														}`}
														onClick={() =>
															handlePropSelect(
																'cardTitle'
															)
														}>
														title: "
														{
															currentPropValues.cardTitle
														}
														"
													</div>
													<div
														className={`prop-item ${
															activeProp ===
															'cardContent'
																? 'active'
																: ''
														}`}
														onClick={() =>
															handlePropSelect(
																'cardContent'
															)
														}>
														content: "
														{
															currentPropValues.cardContent
														}
														"
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
										selectedComponent === 'button'
											? 'active'
											: ''
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
										selectedComponent === 'card'
											? 'active'
											: ''
									}`}>
									<h4>Card Workshop</h4>
									{selectedComponent === 'card' && (
										<div className='workshop-output'>
											<div className='card-component'>
												<h3>
													{
														currentPropValues.cardTitle
													}
												</h3>
												<p>
													{
														currentPropValues.cardContent
													}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						<p className='story-paragraph'>
							Props could contain various types of information:
							text strings, numbers, boolean flags, functions,
							arrays, objects, and even other components. This
							flexibility allowed for rich communication between
							components.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>
							Interactive Exercise: Modify Props
						</h3>
						<div className='instruction-box'>
							<p>
								<strong>
									👉 Click on a messenger above to see what
									props it carries!
								</strong>
							</p>
							<p>
								Click on a specific prop to modify its value
								below.
							</p>
						</div>

						{activeProp && (
							<div className='prop-editor'>
								<h4>Edit {activeProp}</h4>
								{activeProp === 'buttonColor' && (
									<div className='prop-input-group'>
										<label>Button Color:</label>
										<select
											value={
												currentPropValues.buttonColor
											}
											onChange={(e) =>
												handlePropValueChange(
													'buttonColor',
													e.target.value
												)
											}>
											<option value='blue'>Blue</option>
											<option value='red'>Red</option>
											<option value='green'>Green</option>
											<option value='purple'>
												Purple
											</option>
											<option value='orange'>
												Orange
											</option>
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
											value={
												currentPropValues.cardContent
											}
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
											The onClick prop is a function that
											will be called when the button is
											clicked.
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
							Props are the primary way for parent components to
							pass data to child components in React. They are
							read-only and flow downward through the component
							tree, allowing parent components to control and
							configure their children.
						</p>
					</div>

					<div className='reflection-section'>
						<h3>Reflect on the Story</h3>
						<p>
							How does the messenger metaphor help you understand
							how props work in React?
						</p>
						<p>
							How might you use different prop types to create
							more dynamic and reusable components?
						</p>
					</div>
				</div>
			)}

			{/* Chapter 2: The One-Way Road */}
			{currentChapter === 2 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 2: The One-Way Road
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							An important rule in Component Kingdom was that
							Props could only travel in one direction—from parent
							to child. No craftsman could modify the contents of
							the Props bag they received; they could only read
							the instructions and create their piece accordingly.
						</p>

						<div className='kingdom-roads'>
							<div className='app-castle'>App</div>
							<div className='roads'>
								<div className='road road-left'></div>
								<div className='road road-middle'></div>
								<div className='road road-right'></div>
							</div>
							<div className='workshops'>
								<div className='road-workshop'>Button</div>
								<div className='road-workshop'>Card</div>
								<div className='road-workshop'>Navbar</div>
							</div>
						</div>

						<p className='story-paragraph'>
							This one-way flow of data created a predictable
							system. When something needed to change, the
							instructions always came from above. Workshops never
							modified their instructions; they simply followed
							them. If a workshop needed to communicate back up to
							App, it would use special callback messengers
							provided by App itself.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>
							Interactive Exercise: Deliver Props to Craftsmen
						</h3>
						<p>
							Drag each prop bag to the appropriate craftsman who
							needs it. Remember, props can only travel down from
							App to Components!
						</p>

						<div className='message-board'>
							{messageBoard && <p>{messageBoard}</p>}
						</div>

						<div className='props-delivery-game'>
							<div className='prop-bags'>
								{propBags
									.filter((prop) => !prop.assigned)
									.map((prop) => (
										<div
											key={prop.id}
											className={`prop-bag prop-${prop.type}`}
											draggable
											onDragStart={(e) =>
												handlePropDragStart(e, prop.id)
											}>
											{prop.type}:{' '}
											{typeof prop.content === 'object'
												? 'Array'
												: prop.content}
										</div>
									))}
							</div>

							<div className='target-craftsmen'>
								{craftsmen.map((craftsman) => (
									<div
										key={craftsman.id}
										className={`target-craftsman ${
											craftsman.connected
												? 'connected'
												: ''
										}`}
										onDrop={(e) =>
											handleCraftsmanDrop(e, craftsman.id)
										}
										onDragOver={handleDragOver}>
										<h4>{craftsman.name}</h4>
										<p>
											Needs:{' '}
											{craftsman.accepts.join(', ')}
										</p>
									</div>
								))}
							</div>

							<button
								className='reset-button'
								onClick={resetCraftsmenAndProps}>
								Reset Exercise
							</button>
						</div>

						<div className='reflection-section'>
							<h3>Reflection:</h3>
							<p>
								Why is it important that props only flow in one
								direction? Think about how this creates a
								predictable data flow in your application.
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Chapter 3: The Props Types Guardians */}
			{currentChapter === 3 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 3: The PropTypes Guardians
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							As the Component Kingdom grew, occasionally
							messengers would deliver the wrong type of props to
							a workshop. A Button might receive a number where it
							expected text, or a Card might receive a string
							where it expected an object. These mismatches caused
							chaos in the kingdom.
						</p>

						<p className='story-paragraph'>
							To solve this problem, the kingdom established the
							PropTypes Guardians - specialized sentinels that
							inspected the props at each workshop to ensure they
							were of the correct type. If an improper prop was
							detected, the Guardians would raise a warning.
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
											handlePropTypeComponentChange(
												'button'
											)
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
											handlePropTypeComponentChange(
												'card'
											)
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
																err.prop ===
																'color'
														)
															? 'error'
															: ''
													}
												/>
											</div>
											<div className='prop-input-group'>
												<label>
													text (string.isRequired):
												</label>
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
															(err) =>
																err.prop ===
																'text'
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
																err.prop ===
																'onClick'
														)
															? 'error'
															: ''
													}
												/>
											</div>
											<div className='prop-input-group'>
												<label>
													size (oneOf['small',
													'medium', 'large']):
												</label>
												<select
													value={propInputs.size}
													onChange={(e) =>
														handlePropInputChange(
															'size',
															e.target.value
														)
													}>
													<option value='small'>
														small
													</option>
													<option value='medium'>
														medium
													</option>
													<option value='large'>
														large
													</option>
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
													value={
														propInputs.title || ''
													}
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
													value={
														propInputs.content || ''
													}
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
													value={
														propInputs.image || ''
													}
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
															e.target.value ===
																'true'
														)
													}>
													<option value='true'>
														true
													</option>
													<option value='false'>
														false
													</option>
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
												{propTypeErrors.map(
													(error, index) => (
														<div
															className='error-message'
															key={index}>
															Warning: Failed prop
															type:{' '}
															{error.error ||
																`Invalid prop \`${error.prop}\` of type \`${error.received}\` supplied to \`${propTypeComponent}\`, expected \`${error.expected}\`.`}
														</div>
													)
												)}
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
														propInputs.color ||
														'blue',
													padding:
														propInputs.size ===
														'small'
															? '4px 8px'
															: propInputs.size ===
															  'large'
															? '12px 24px'
															: '8px 16px',
													fontSize:
														propInputs.size ===
														'small'
															? '12px'
															: propInputs.size ===
															  'large'
															? '18px'
															: '14px',
												}}>
												{propInputs.text ||
													'Default Text'}
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
												{propInputs.title ||
													'Default Title'}
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

						<p className='story-paragraph'>
							The PropTypes Guardians didn't prevent a component
							from rendering with incorrect props, but they
							provided valuable warnings during development,
							making it easier to track down bugs. Some workshops
							also established DefaultProps as fallback values if
							a messenger failed to deliver a particular prop.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>
							Interactive Exercise: Be the PropTypes Guardian!
						</h3>
						<div className='instruction-box'>
							<p>
								<strong>
									👉 Try modifying the props above to trigger
									PropType warnings!
								</strong>
							</p>
							<p>
								See if you can understand why each warning
								appears based on the PropTypes definition.
							</p>
						</div>

						<div className='tips-section'>
							<h4>Try These Experiments:</h4>
							<ul>
								<li>Delete the text for a required prop</li>
								<li>
									Try entering a number (like 42) instead of a
									string for 'color'
								</li>
								<li>
									Remove the parentheses from the onClick
									function
								</li>
								<li>
									Try entering "extraLarge" for the size prop
								</li>
							</ul>
						</div>
					</div>

					<div className='lesson-insight'>
						<h3>The PropTypes Lesson:</h3>
						<p>
							Type checking with PropTypes helps catch bugs by
							verifying that components receive the right types of
							props. This is especially useful in larger
							applications where components may be reused in
							different contexts. Default props provide fallback
							values to ensure components can render even if
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
							How might PropTypes and defaultProps work together
							to create more robust components?
						</p>
					</div>
				</div>
			)}

			<LessonNavigation
				courseId='components-basics'
				lessonId='props-messengers'
			/>
		</div>
	);
}

export default PropsMessengers;
