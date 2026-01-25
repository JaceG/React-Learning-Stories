import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';

const ChapterThree = () => {
	const [activeComponent, setActiveComponent] = useState(null);
	const [compositePreview, setCompositePreview] = useState([]);

	const handleComponentClick = (component) => {
		setActiveComponent(component);
		setCompositePreview((prev) =>
			prev.includes(component) ? prev : [...prev, component]
		);
	};

	const removeComponent = (component) => {
		setCompositePreview((prev) => prev.filter((c) => c !== component));
		if (activeComponent === component) {
			setActiveComponent(null);
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title='Building Complex Structures'
				bridge='After learning how components communicate through props, Aria was ready for her final lesson in the Component Kingdom. Master Aurelius led her to the Grand Assembly Hall.'
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Now comes the true power of our kingdom," Aurelius announced with pride. 
					"Watch how workshops collaborate. Larger workshops can use the creations 
					of smaller workshops, combining them into more complex structures. This 
					practice, known as <strong>Component Composition</strong>, allows us to 
					build incredible things."
				</p>
				
				<p className='story-paragraph'>
					Aria watched as components began assembling themselves like magical 
					building blocks. "It's like... each component is a piece of a larger puzzle!"
				</p>
				
				<p className='story-paragraph'>
					"Exactly!" Aurelius beamed. "And the beauty is that each puzzle piece 
					focuses on doing one thing well, delegating other responsibilities to 
					specialized components."
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
					Aria experimented with different combinations, marveling at how 
					simple components could be assembled into increasingly sophisticated 
					interfaces. "I can build anything now!" she exclaimed.
				</p>
				
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Component Composer
				</h3>
				<InstructionBox
					character="Build your own dashboard by selecting components from the library above!"
					secondaryText="Click on a component to add it to your dashboard. Click the × button to remove it."
				/>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Master Blueprint: Component Composition</span>
					<span className='discovered-by'>Aria's Final Component Lesson</span>
				</div>
				<pre>{`// The Dashboard workshop combines other components
function Dashboard() {
  // Master Aurelius: "Notice how Dashboard delegates to specialized components"
  return (
    <div className="dashboard">
      {/* Header knows how to display titles */}
      <Header title="Kingdom Dashboard" />
      
      {/* Card can contain other components! */}
      <Card 
        title="Royal Tasks" 
        content={<TaskList tasks={royalTasks} />} 
      />
      
      {/* Multiple buttons working together */}
      <div className="dashboard-actions">
        <Button label="New Task" onClick={createTask} />
        <Button label="Send Message" onClick={sendMessage} />
      </div>
      
      {/* Footer handles copyright display */}
      <Footer copyright="Component Kingdom, 2025" />
    </div>
  );
}

// Aria's insight: "Each component has a single responsibility!"`}</pre>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: 'The Composition Lesson:',
					content:
						'React encourages building UIs through composition rather than inheritance. Complex interfaces are created by combining simpler components together, creating a hierarchy that\'s both flexible and maintainable. Master Aurelius\'s final teaching: "A kingdom is strongest when each citizen excels at their craft and works in harmony with others."',
				}}
				reflectionQuestions={[
					'How does component composition help you build more complex interfaces?',
					'Why is it beneficial for larger components to delegate responsibilities to smaller, specialized components?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 3",
					content:
						'Today I learned the most important lesson yet - components are meant to work together! By combining simple, focused components, I can build complex applications. Each component does one thing well, making them easy to understand, test, and reuse. I feel like I truly understand the Component Kingdom now!',
				}}
				chapterEnding={[
					'As the sun set over the Component Workshop District, Master Aurelius handed Aria a sealed scroll. "Tomorrow, you\'ll journey to the Eastern Quarter to meet the Props Messengers Guild. They hold deeper secrets about component communication."',
					'Aria clutched the scroll, excited for her next adventure. She had learned to create components, make them communicate, and compose them into complex structures. But she sensed there was so much more to discover in the React Kingdom.',
				]}
			/>
		</div>
	);
};

export default ChapterThree;