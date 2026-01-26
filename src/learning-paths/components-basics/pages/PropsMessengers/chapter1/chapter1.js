import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const [selectedComponent, setSelectedComponent] = useState(null);
	const [activeProp, setActiveProp] = useState(null);
	const [currentPropValues, setCurrentPropValues] = useState({
		buttonColor: 'blue',
		buttonText: 'Click Me',
		cardTitle: 'Welcome',
		cardContent: 'This is a card component',
	});

	const handleComponentSelect = (component) => {
		setSelectedComponent(component);
		setActiveProp(null);
	};

	const handlePropSelect = (prop) => {
		setActiveProp(prop);
	};

	const handlePropValueChange = (propName, value) => {
		setCurrentPropValues({
			...currentPropValues,
			[propName]: value,
		});
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title='The Royal Messengers'
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Props Messenger Guild was a hive of activity. Messengers rushed in 
					all directions, carrying satchels filled with important information. 
					<strong>Hermes</strong>, the Head Messenger, greeted Aria warmly.
				</p>
				
				<p className='story-paragraph'>
					"Welcome, apprentice Aria! Master Aurelius told me about your progress 
					with components. Now you'll learn how we enable communication in the kingdom." 
					Hermes gestured to the busy messengers. "These are our <strong>Props</strong> - 
					special messengers who carry instructions from parent components to their children."
				</p>

				<p className='story-paragraph'>
					"I see!" Aria exclaimed, remembering her lessons. "So the master builder 
					<strong>App</strong> uses these messengers to tell each workshop exactly 
					what to create?"
				</p>
				
				<p className='story-paragraph'>
					"Precisely!" Hermes smiled. "Watch how a Button workshop might receive 
					props telling it what color to be, what text to display, and what action 
					to perform when clicked."
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
							className={`workshop props-button-workshop ${
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
							className={`workshop props-card-workshop ${
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
					"Props can contain various types of information," Hermes explained 
					as Aria experimented with the messengers. "Text strings, numbers, 
					boolean flags, functions, arrays, objects, and even other components! 
					This flexibility allows for rich communication between components."
				</p>
				
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Modify Props
				</h3>
				<InstructionBox
					character="Click on a messenger above to see what props it carries!"
					secondaryText="Click on a specific prop to modify its value below."
				/>

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

			<CodeExample
				title="Guild Master's Prop Patterns"
				discoveredBy="Studied by Aria with Hermes"
				code={`// Hermes demonstrates: "Watch how App sends Props to Button"
function App() {
  return (
    <div>
      {/* The messenger carries these props to Button */}
      <Button 
        color="${currentPropValues.buttonColor}" 
        text="${currentPropValues.buttonText}" 
        onClick={() => alert('Button clicked!')}
      />
    </div>
  );
}

// Aria learns: "Button receives props from its messenger"
function Button(props) {
  // props contains all the messages from the parent
  return (
    <button 
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: 'The Props Lesson:',
					content:
						'Props are the primary way for parent components to pass data to child components in React. They are read-only and flow downward through the component tree, allowing parent components to control and configure their children. Hermes teaches that props are like sealed letters - children can read them but never modify them.',
				}}
				reflectionQuestions={[
					'How does the messenger metaphor help you understand how props work in React?',
					'How might you use different prop types to create more dynamic and reusable components?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 4",
					content:
						"The Props Messenger Guild is amazing! I now understand how components communicate - parent components send props to their children like messengers delivering instructions. Hermes showed me how changing a prop instantly updates the component. It's like magic, but it's just React's data flow!",
				}}
			/>
		</div>
	);
};

export default ChapterOne;