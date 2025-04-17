const ChapterThree = ({
	activeComponent,
	compositePreview,
	handleComponentClick,
	removeComponent,
}) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: Building Complex Structures
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					The true power of the Component Kingdom became evident when
					workshops began to collaborate. Larger workshops could use
					the creations of smaller workshops, combining them into more
					complex structures. This practice, known as{' '}
					<strong>Component Composition</strong>, allowed the kingdom
					to build incredible things.
				</p>

				<div className='composition-illustration'>
					<div className='component-library'>
						<h4>Component Library</h4>
						<p>Click components to add them to your dashboard:</p>
						<div className='component-palette'>
							<div
								className={`palette-item header-component ${
									activeComponent === 'header' ? 'active' : ''
								}`}
								onClick={() => handleComponentClick('header')}>
								Header
							</div>
							<div
								className={`palette-item nav-component ${
									activeComponent === 'nav' ? 'active' : ''
								}`}
								onClick={() => handleComponentClick('nav')}>
								Navigation
							</div>
							<div
								className={`palette-item card-component ${
									activeComponent === 'card' ? 'active' : ''
								}`}
								onClick={() => handleComponentClick('card')}>
								Card
							</div>
							<div
								className={`palette-item button-component ${
									activeComponent === 'button' ? 'active' : ''
								}`}
								onClick={() => handleComponentClick('button')}>
								Button
							</div>
							<div
								className={`palette-item footer-component ${
									activeComponent === 'footer' ? 'active' : ''
								}`}
								onClick={() => handleComponentClick('footer')}>
								Footer
							</div>
						</div>
					</div>

					<div className='dashboard-preview'>
						<h4>Your Dashboard</h4>
						<div className='dashboard-container'>
							{compositePreview.length > 0 ? (
								<div className='composite-ui'>
									{compositePreview.includes('header') && (
										<div className='composite-header'>
											<h3>Kingdom Dashboard</h3>
											<button
												className='remove-btn'
												onClick={() =>
													removeComponent('header')
												}>
												×
											</button>
										</div>
									)}

									{compositePreview.includes('nav') && (
										<div className='composite-nav'>
											<ul>
												<li>Home</li>
												<li>Tasks</li>
												<li>Messages</li>
											</ul>
											<button
												className='remove-btn'
												onClick={() =>
													removeComponent('nav')
												}>
												×
											</button>
										</div>
									)}

									{compositePreview.includes('card') && (
										<div className='composite-card'>
											<h4>Royal Announcements</h4>
											<p>
												Welcome to the Component Kingdom
												Dashboard!
											</p>
											<button
												className='remove-btn'
												onClick={() =>
													removeComponent('card')
												}>
												×
											</button>
										</div>
									)}

									{compositePreview.includes('button') && (
										<div className='composite-button-container'>
											<button className='composite-button'>
												Take Action
											</button>
											<button
												className='remove-btn'
												onClick={() =>
													removeComponent('button')
												}>
												×
											</button>
										</div>
									)}

									{compositePreview.includes('footer') && (
										<div className='composite-footer'>
											<p>© Component Kingdom, 2025</p>
											<button
												className='remove-btn'
												onClick={() =>
													removeComponent('footer')
												}>
												×
											</button>
										</div>
									)}
								</div>
							) : (
								<div className='empty-dashboard'>
									<p>
										Click components from the library to
										build your dashboard
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					In this way, simple components could be assembled into
					increasingly sophisticated interfaces, each component
					focusing on doing one thing well and delegating other
					responsibilities to specialized components.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Component Composer
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							👉 Build your own dashboard by selecting components
							from the library above!
						</strong>
					</p>
					<p>
						Click on a component to add it to your dashboard. Click
						the × button to remove it.
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
					React encourages building UIs through composition rather
					than inheritance. Complex interfaces are created by
					combining simpler components together, creating a hierarchy
					that's both flexible and maintainable.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does component composition help you build more complex
					interfaces?
				</p>
				<p>
					Why is it beneficial for larger components to delegate
					responsibilities to smaller, specialized components?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;
