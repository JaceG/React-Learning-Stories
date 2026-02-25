import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';
import useNarrative from '../../../../../hooks/useNarrative';

const ChapterThree = () => {
	const { narrative, loading } = useNarrative('components-basics', 'ComponentKingdom', 3);
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

	if (loading || !narrative) return <div className="chapter loading">Loading...</div>;

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={narrative.title}
				bridge={narrative.bridge}
			/>

			<StorySection paragraphs={narrative.storySections[0]} />

			<div className='story-section'>
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
			</div>

			<StorySection paragraphs={narrative.storySections[1]} />

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Component Composer
				</h3>
				<InstructionBox
					character='Build your own dashboard by selecting components from the library above!'
					secondaryText='Click on a component to add it to your dashboard. Click the × button to remove it.'
				/>
			</div>

			<CodeExample
				title='Master Blueprint: Component Composition'
				discoveredBy="Aria's Final Component Lesson"
				code={`// The Dashboard workshop combines other components
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

// Aria's insight: "Each component has a single responsibility!"`}
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
