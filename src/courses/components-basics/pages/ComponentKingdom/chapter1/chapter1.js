const ChapterOne = ({
	highlightedCard,
	handleWorkshopHover,
	handleWorkshopLeave,
}) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Village of Components
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the digital realm of Weblandia, there existed a kingdom
					called React where everything was built from magical
					building blocks known as <strong>Components</strong>. Unlike
					the static structures in neighboring kingdoms, these
					Components were alive and responsive.
				</p>

				<div className='kingdom-illustration'>
					<div className='castle'>
						<div className='castle-tower'>App</div>
						<div className='castle-body'>
							<div
								className={`workshop button-workshop ${
									highlightedCard === 0 ? 'highlight' : ''
								}`}
								onMouseEnter={() => handleWorkshopHover(0)}
								onMouseLeave={handleWorkshopLeave}>
								Button Workshop
							</div>
							<div
								className={`workshop card-workshop ${
									highlightedCard === 1 ? 'highlight' : ''
								}`}
								onMouseEnter={() => handleWorkshopHover(1)}
								onMouseLeave={handleWorkshopLeave}>
								Card Workshop
							</div>
							<div
								className={`workshop form-workshop ${
									highlightedCard === 2 ? 'highlight' : ''
								}`}
								onMouseEnter={() => handleWorkshopHover(2)}
								onMouseLeave={handleWorkshopLeave}>
								Form Workshop
							</div>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					The master builder, <strong>App</strong>, lived in the
					tallest tower and was responsible for organizing all the
					craftsmen to work together. Every component in the kingdom
					had its own special purpose and design, but they all shared
					the ability to be reused throughout the realm.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Component Explorer
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							👉 Hover over each workshop in the kingdom above to
							see what it produces!
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
									The Button workshop creates interactive
									buttons that can trigger actions when
									clicked.
								</p>
								<p>
									They receive props like: <code>label</code>,{' '}
									<code>onClick</code>, <code>disabled</code>
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
										This is a card component displaying
										content.
									</p>
								</div>
							</div>
							<div className='showcase-details'>
								<p>
									The Card workshop creates containers that
									display organized information.
								</p>
								<p>
									They receive props like: <code>title</code>,{' '}
									<code>content</code>, <code>image</code>
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
									The Form workshop creates interactive forms
									for collecting user input.
								</p>
								<p>
									They receive props like: <code>fields</code>
									, <code>onSubmit</code>,{' '}
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
					In React, everything you see is a Component – a reusable
					piece of code that returns JSX elements describing what
					should appear on the screen. Components can be as simple as
					a button or as complex as an entire page.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does thinking of components as specialized workshops
					help you understand their purpose in React?
				</p>
				<p>
					Why is it useful to have many small, focused components
					rather than a few large ones?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;