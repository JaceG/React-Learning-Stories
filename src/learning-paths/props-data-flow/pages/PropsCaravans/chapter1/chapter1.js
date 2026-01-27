import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterOne() {
	const [caravans, setCaravans] = useState([]);
	const [selectedCargo, setSelectedCargo] = useState('');

	const cargoOptions = [
		{ name: 'Text Messages', value: 'text' },
		{ name: 'Number Scrolls', value: 'number' },
		{ name: 'Color Crystals', value: 'color' },
		{ name: 'Size Specifications', value: 'size' },
	];

	const addCaravan = () => {
		if (selectedCargo) {
			setCaravans([
				...caravans,
				{ id: Date.now(), cargo: selectedCargo },
			]);
			setSelectedCargo('');
		}
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title="The Caravan Masters"
				/>

			<StorySection
				paragraphs={[
					`The Trade Quarter's morning market was unlike anything Aria had seen. Merchants called out their wares while caravans rolled through cobblestone streets, each wagon carefully labeled with its destination and cargo.`,
					`"Aria! Over here!" A familiar voice cut through the market noise. It was Propius, one of the Props Messengers she'd met during her early training. But now he wore the elaborate robes of a Caravan Master, decorated with routing symbols and data flow patterns.`,
					`"Propius!" Aria exclaimed. "You've certainly moved up in the world!"`,
					`He grinned proudly. "Indeed! After you mastered basic prop passing, we messengers evolved our craft. No longer do we carry simple messages - now we organize entire caravans!" He gestured to the bustling depot behind him. "Each caravan can transport multiple pieces of data: text scrolls, number tablets, color crystals, even function scrolls that contain powerful spells!"`,
					`Binary whirred excitedly. "So props aren't just simple values anymore?"`,
					`"Exactly, little companion," Propius nodded. "Modern React demands sophisticated data transport. Let me show you how we organize our caravans."`
				]}
			/>

				<div className='interactive-section'>
					<h3 className='section-title'>Build Your First Caravan</h3>
					<p>Select cargo to load into your caravan:</p>

					<div className='cargo-selector'>
						{cargoOptions.map((option) => (
							<div
								key={option.value}
								className={`cargo-item ${
									selectedCargo === option.value
										? 'selected'
										: ''
								}`}
								onClick={() => setSelectedCargo(option.value)}>
								{option.name}
							</div>
						))}
					</div>

					<div
						style={{
							display: 'flex',
							gap: '10px',
							justifyContent: 'center',
						}}>
						<button
							className='action-button'
							onClick={addCaravan}
							disabled={!selectedCargo}>
							Add to Caravan
						</button>
						<button
							className='reset-button'
							onClick={() => {
								setCaravans([]);
								setSelectedCargo('');
							}}
							disabled={caravans.length === 0}>
							Reset Caravan
						</button>
					</div>

					<div className='caravan-display'>
						{caravans.length === 0 ? (
							<p style={{ color: '#6c757d' }}>
								Your caravan is empty. Select cargo to begin!
							</p>
						) : (
							caravans.map((caravan) => (
								<div key={caravan.id} className='caravan-wagon'>
									<div>📦 Wagon</div>
									<span className='cargo'>
										{caravan.cargo}
									</span>
								</div>
							))
						)}
					</div>
				</div>

			<StorySection
				paragraphs={[
					`As Aria watched the caravans being loaded, Propius explained, "Each component workshop in React Kingdom has specific needs. When a parent component wants something built, it doesn't just send vague instructions - it sends a fully loaded caravan with precise specifications."`,
					`He led them to a nearby Button Workshop where artisans were unpacking a newly arrived caravan. "Watch this," Propius said. "The App component just sent this caravan with everything needed to create a perfect button: the text to display, the color scheme, even a function scroll that activates when the button is pressed."`,
					`Aria observed as the workshop artisans carefully unpacked each item, using them to craft exactly what was requested. "So props are like... detailed blueprints and materials combined?"`,
					`"Precisely!" Propius beamed. "And the beauty is that the same workshop can create countless different buttons, each unique based on the cargo it receives. This is the power of component reusability!"`
				]}
			/>

				<CodeExample
					title="Props as Cargo"
					code={`// The parent component loads the caravan
<Button 
  text="Click Me"        // Text cargo
  color="blue"          // Color cargo
  onClick={handleClick} // Function cargo
/>

// The child component receives and unpacks the cargo
function Button(props) {
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
						title: "Propius's Trading Wisdom:",
						content: "Props in React are the cargo that flows from parent components to their children, carrying any JavaScript value - strings, numbers, arrays, objects, even functions. Like merchant caravans, props travel in one direction only (parent to child) and their contents are read-only, ensuring data integrity. This system enables the same component to render differently based on the props it receives, making your components as versatile as a workshop that can craft countless unique items from different materials."
					}}
					reflectionQuestions={[
						"How does the caravan metaphor help you understand the one-way flow of props?",
						"Why is it important that props are read-only, like sealed cargo?",
						"What advantages does a workshop (component) gain by accepting different cargo (props) rather than always building the same thing?"
					]}
					journalEntry={{
						title: "Aria's Journal - Day 12 (Morning)",
						content: "The Trade Quarter has opened my eyes to a whole new aspect of React! Props aren't just simple messages - they're complete cargo shipments that can carry any type of data. Propius showed me how a single Button Workshop can create thousands of unique buttons, each crafted according to the props it receives. The key insight: props make components reusable by separating what a component does (its logic) from what it displays (its data). And since props are read-only, the receiving component can't accidentally modify the sender's data - maintaining order in the kingdom!"
					}}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterOne;
