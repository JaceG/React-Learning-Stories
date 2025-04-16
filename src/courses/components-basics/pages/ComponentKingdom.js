import React, { useState } from 'react';
import LessonNavigation from '../../../components/layout/LessonNavigation';
import '../../CourseStyles.css';
import './ComponentKingdom.css';

function ComponentKingdom() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [highlightedCard, setHighlightedCard] = useState(null);
	const [selectedProp, setSelectedProp] = useState(null);
	const [customLabel, setCustomLabel] = useState('');
	const [activeComponent, setActiveComponent] = useState(null);
	const [compositePreview, setCompositePreview] = useState([]);

	const nextChapter = () => {
		if (currentChapter < 3) {
			setCurrentChapter(currentChapter + 1);
		}
	};

	const prevChapter = () => {
		if (currentChapter > 1) {
			setCurrentChapter(currentChapter - 1);
		}
	};

	// Hover effects for workshop cards
	const handleWorkshopHover = (index) => {
		setHighlightedCard(index);
	};

	const handleWorkshopLeave = () => {
		setHighlightedCard(null);
	};

	// Props handling for Chapter 2
	const handlePropClick = (name, value) => {
		setSelectedProp({ name, value });
	};

	// Component composition handling for Chapter 3
	const handleComponentClick = (component) => {
		setActiveComponent(component);

		// Add component to the preview if it's not already there
		if (!compositePreview.includes(component)) {
			setCompositePreview([...compositePreview, component]);
		}
	};

	const removeComponent = (component) => {
		setCompositePreview(
			compositePreview.filter((item) => item !== component)
		);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Component Kingdom</h1>
			<p className='lesson-subtitle'>
				A story about the fundamental building blocks of React
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

			{/* Chapter 1: Introduction to Components */}
			{currentChapter === 1 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 1: The Village of Components
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							In the digital realm of Weblandia, there existed a
							kingdom called React where everything was built from
							magical building blocks known as{' '}
							<strong>Components</strong>. Unlike the static
							structures in neighboring kingdoms, these Components
							were alive and responsive.
						</p>

						<div className='kingdom-illustration'>
							<div className='castle'>
								<div className='castle-tower'>App</div>
								<div className='castle-body'>
									<div
										className={`workshop button-workshop ${
											highlightedCard === 0
												? 'highlight'
												: ''
										}`}
										onMouseEnter={() =>
											handleWorkshopHover(0)
										}
										onMouseLeave={handleWorkshopLeave}>
										Button Workshop
									</div>
									<div
										className={`workshop card-workshop ${
											highlightedCard === 1
												? 'highlight'
												: ''
										}`}
										onMouseEnter={() =>
											handleWorkshopHover(1)
										}
										onMouseLeave={handleWorkshopLeave}>
										Card Workshop
									</div>
									<div
										className={`workshop form-workshop ${
											highlightedCard === 2
												? 'highlight'
												: ''
										}`}
										onMouseEnter={() =>
											handleWorkshopHover(2)
										}
										onMouseLeave={handleWorkshopLeave}>
										Form Workshop
									</div>
								</div>
							</div>
						</div>

						<p className='story-paragraph'>
							The master builder, <strong>App</strong>, lived in
							the tallest tower and was responsible for organizing
							all the craftsmen to work together. Every component
							in the kingdom had its own special purpose and
							design, but they all shared the ability to be reused
							throughout the realm.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>
							Interactive Exercise: Component Explorer
						</h3>
						<div className='instruction-box'>
							<p>
								<strong>
									👉 Hover over each workshop in the kingdom
									above to see what it produces!
								</strong>
							</p>
						</div>

						<div className='component-showcase'>
							{highlightedCard === 0 && (
								<div className='showcase-item'>
									<h4>Button Component</h4>
									<div className='showcase-preview'>
										<button className='preview-button'>
											Click Me
										</button>
									</div>
									<div className='showcase-details'>
										<p>
											The Button workshop creates
											interactive buttons that can trigger
											actions when clicked.
										</p>
										<p>
											They receive props like:{' '}
											<code>label</code>,{' '}
											<code>onClick</code>,{' '}
											<code>disabled</code>
										</p>
									</div>
								</div>
							)}

							{highlightedCard === 1 && (
								<div className='showcase-item'>
									<h4>Card Component</h4>
									<div className='showcase-preview'>
										<div className='preview-card'>
											<h4>Welcome to React</h4>
											<p>
												This is a card component
												displaying content.
											</p>
										</div>
									</div>
									<div className='showcase-details'>
										<p>
											The Card workshop creates containers
											that display organized information.
										</p>
										<p>
											They receive props like:{' '}
											<code>title</code>,{' '}
											<code>content</code>,{' '}
											<code>image</code>
										</p>
									</div>
								</div>
							)}

							{highlightedCard === 2 && (
								<div className='showcase-item'>
									<h4>Form Component</h4>
									<div className='showcase-preview'>
										<div className='preview-form'>
											<div className='form-field'>
												<label>Username:</label>
												<input
													type='text'
													placeholder='Enter username'
												/>
											</div>
											<div className='form-field'>
												<label>Password:</label>
												<input
													type='password'
													placeholder='Enter password'
												/>
											</div>
											<button className='form-button'>
												Login
											</button>
										</div>
									</div>
									<div className='showcase-details'>
										<p>
											The Form workshop creates
											interactive forms for collecting
											user input.
										</p>
										<p>
											They receive props like:{' '}
											<code>fields</code>,{' '}
											<code>onSubmit</code>,{' '}
											<code>initialValues</code>
										</p>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className='code-example'>
						<pre>{`// The Button Workshop creates buttons for the kingdom
function Button(props) {
  return (
    <button className="kingdom-button" onClick={props.onClick}>
      {props.label}
    </button>
  );
}

// The Card Workshop builds display cards
function Card(props) {
  return (
    <div className="kingdom-card">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  );
}`}</pre>
					</div>

					<div className='lesson-insight'>
						<h3>The Component Lesson:</h3>
						<p>
							In React, everything you see is a Component – a
							reusable piece of code that returns JSX elements
							describing what should appear on the screen.
							Components can be as simple as a button or as
							complex as an entire page.
						</p>
					</div>

					<div className='reflection-section'>
						<h3>Reflect on the Story</h3>
						<p>
							How does thinking of components as specialized
							workshops help you understand their purpose in
							React?
						</p>
						<p>
							Why is it useful to have many small, focused
							components rather than a few large ones?
						</p>
					</div>
				</div>
			)}

			{/* Chapter 2: Component Props */}
			{currentChapter === 2 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 2: Messages Between Workshops
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							For the Component Kingdom to function properly,
							workshops needed to communicate with each other. The
							master builder App would send special messengers
							carrying bags called <strong>Props</strong> to each
							workshop. These props contained all the
							specifications a workshop needed to create its
							piece.
						</p>

						<div className='messenger-illustration'>
							<div className='app-messenger'>
								<div className='messenger-label'>App</div>
								<div className='messenger-bag'>
									<div
										className='prop-item'
										onClick={() =>
											handlePropClick(
												'label',
												'Royal Decree'
											)
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
								<div
									id='button-output'
									className='receiver-output'>
									{selectedProp ? (
										<div className='prop-effect'>
											<div className='prop-name'>
												Receiving:{' '}
												<strong>
													{selectedProp.name}
												</strong>
											</div>
											<div className='prop-value'>
												Value:{' '}
												<code>
													{selectedProp.value}
												</code>
											</div>
											<div className='prop-result'>
												{selectedProp.name ===
												'label' ? (
													<button className='preview-button'>
														{selectedProp.value}
													</button>
												) : (
													<button
														className='preview-button'
														onClick={() =>
															alert('Hear ye!')
														}>
														Click to Trigger
														Function
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
							Each workshop would receive these props and use them
							to determine exactly what to build and how it should
							behave. Props could contain any type of information
							- text, numbers, functions, or even other
							components!
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>
							Interactive Exercise: Prop Messenger
						</h3>
						<div className='instruction-box'>
							<p>
								<strong>
									👉 Click on different props in the messenger
									bag to see how they affect the Button
									component!
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
										onChange={(e) =>
											setCustomLabel(e.target.value)
										}
										placeholder='Enter button text'
									/>
									<button
										className='apply-button'
										onClick={() =>
											handlePropClick(
												'label',
												customLabel
											)
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
							Props are how components talk to each other. They're
							passed from parent to child, like arguments to a
							function. Props allow components to be flexible and
							reusable with different data and behaviors.
						</p>
					</div>

					<div className='reflection-section'>
						<h3>Reflect on the Story</h3>
						<p>
							How does the messenger metaphor help you understand
							how props work in React?
						</p>
						<p>
							Why is it important that props can carry different
							types of data (strings, numbers, functions)?
						</p>
					</div>
				</div>
			)}

			{/* Chapter 3: Component Composition */}
			{currentChapter === 3 && (
				<div className='chapter'>
					<h2 className='chapter-title'>
						Chapter 3: Building Complex Structures
					</h2>

					<div className='story-section'>
						<p className='story-paragraph'>
							The true power of the Component Kingdom became
							evident when workshops began to collaborate. Larger
							workshops could use the creations of smaller
							workshops, combining them into more complex
							structures. This practice, known as{' '}
							<strong>Component Composition</strong>, allowed the
							kingdom to build incredible things.
						</p>

						<div className='composition-illustration'>
							<div className='component-library'>
								<h4>Component Library</h4>
								<p>
									Click components to add them to your
									dashboard:
								</p>
								<div className='component-palette'>
									<div
										className={`palette-item header-component ${
											activeComponent === 'header'
												? 'active'
												: ''
										}`}
										onClick={() =>
											handleComponentClick('header')
										}>
										Header
									</div>
									<div
										className={`palette-item nav-component ${
											activeComponent === 'nav'
												? 'active'
												: ''
										}`}
										onClick={() =>
											handleComponentClick('nav')
										}>
										Navigation
									</div>
									<div
										className={`palette-item card-component ${
											activeComponent === 'card'
												? 'active'
												: ''
										}`}
										onClick={() =>
											handleComponentClick('card')
										}>
										Card
									</div>
									<div
										className={`palette-item button-component ${
											activeComponent === 'button'
												? 'active'
												: ''
										}`}
										onClick={() =>
											handleComponentClick('button')
										}>
										Button
									</div>
									<div
										className={`palette-item footer-component ${
											activeComponent === 'footer'
												? 'active'
												: ''
										}`}
										onClick={() =>
											handleComponentClick('footer')
										}>
										Footer
									</div>
								</div>
							</div>

							<div className='dashboard-preview'>
								<h4>Your Dashboard</h4>
								<div className='dashboard-container'>
									{compositePreview.length > 0 ? (
										<div className='composite-ui'>
											{compositePreview.includes(
												'header'
											) && (
												<div className='composite-header'>
													<h3>Kingdom Dashboard</h3>
													<button
														className='remove-btn'
														onClick={() =>
															removeComponent(
																'header'
															)
														}>
														×
													</button>
												</div>
											)}

											{compositePreview.includes(
												'nav'
											) && (
												<div className='composite-nav'>
													<ul>
														<li>Home</li>
														<li>Tasks</li>
														<li>Messages</li>
													</ul>
													<button
														className='remove-btn'
														onClick={() =>
															removeComponent(
																'nav'
															)
														}>
														×
													</button>
												</div>
											)}

											{compositePreview.includes(
												'card'
											) && (
												<div className='composite-card'>
													<h4>Royal Announcements</h4>
													<p>
														Welcome to the Component
														Kingdom Dashboard!
													</p>
													<button
														className='remove-btn'
														onClick={() =>
															removeComponent(
																'card'
															)
														}>
														×
													</button>
												</div>
											)}

											{compositePreview.includes(
												'button'
											) && (
												<div className='composite-button-container'>
													<button className='composite-button'>
														Take Action
													</button>
													<button
														className='remove-btn'
														onClick={() =>
															removeComponent(
																'button'
															)
														}>
														×
													</button>
												</div>
											)}

											{compositePreview.includes(
												'footer'
											) && (
												<div className='composite-footer'>
													<p>
														© Component Kingdom,
														2025
													</p>
													<button
														className='remove-btn'
														onClick={() =>
															removeComponent(
																'footer'
															)
														}>
														×
													</button>
												</div>
											)}
										</div>
									) : (
										<div className='empty-dashboard'>
											<p>
												Click components from the
												library to build your dashboard
											</p>
										</div>
									)}
								</div>
							</div>
						</div>

						<p className='story-paragraph'>
							In this way, simple components could be assembled
							into increasingly sophisticated interfaces, each
							component focusing on doing one thing well and
							delegating other responsibilities to specialized
							components.
						</p>
					</div>

					<div className='interactive-section'>
						<h3 className='section-title'>
							Interactive Exercise: Component Composer
						</h3>
						<div className='instruction-box'>
							<p>
								<strong>
									👉 Build your own dashboard by selecting
									components from the library above!
								</strong>
							</p>
							<p>
								Click on a component to add it to your
								dashboard. Click the × button to remove it.
							</p>
						</div>
					</div>

					<div className='code-example'>
						<pre>{`// The Dashboard workshop combines other components
function Dashboard() {
  return (
    <div className="dashboard">
      <Header title="Kingdom Dashboard" />
      
      <Card 
        title="Royal Tasks" 
        content={<TaskList tasks={royalTasks} />} 
      />
      
      <div className="dashboard-actions">
        <Button label="New Task" onClick={createTask} />
        <Button label="Send Message" onClick={sendMessage} />
      </div>
      
      <Footer copyright="Component Kingdom, 2025" />
    </div>
  );
}`}</pre>
					</div>

					<div className='lesson-insight'>
						<h3>The Composition Lesson:</h3>
						<p>
							React encourages building UIs through composition
							rather than inheritance. Complex interfaces are
							created by combining simpler components together,
							creating a hierarchy that's both flexible and
							maintainable.
						</p>
					</div>

					<div className='reflection-section'>
						<h3>Reflect on the Story</h3>
						<p>
							How does component composition help you build more
							complex interfaces?
						</p>
						<p>
							Why is it beneficial for larger components to
							delegate responsibilities to smaller, specialized
							components?
						</p>
					</div>
				</div>
			)}

			<LessonNavigation
				courseId='components-basics'
				lessonId='component-kingdom'
			/>
		</div>
	);
}

export default ComponentKingdom;
