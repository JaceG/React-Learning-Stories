import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [messageBoard, setMessageBoard] = useState('');
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
	const [draggedProp, setDraggedProp] = useState(null);

	const handlePropDragStart = (e, propId) => {
		setDraggedProp(propId);
	};

	const handleCraftsmanDrop = (e, craftsmanId) => {
		e.preventDefault();

		if (draggedProp !== null) {
			const prop = propBags.find((p) => p.id === draggedProp);
			const craftsman = craftsmen.find((c) => c.id === craftsmanId);

			if (craftsman.accepts.includes(prop.type)) {
				const updatedProps = propBags.map((p) =>
					p.id === draggedProp ? { ...p, assigned: true } : p
				);
				setPropBags(updatedProps);

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
					setMessageBoard(
						`${craftsman.name} received all needed props!`
					);
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

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title='The One-Way Road'
				bridge='After understanding how messengers deliver props, Aria was ready to learn about the sacred rule that governed all communication in the React Kingdom.'
			/>

			<StorySection
				paragraphs={[
					`Hermes led Aria to the Grand Thoroughfare - a magnificent road system that connected the App castle to all workshops. "Observe carefully," he said. "Notice how all roads lead downward from App to the workshops?"`,
					`"Yes," Aria replied, studying the paths. "But I don't see any roads going back up!"`,
					<>"Exactly!" Hermes smiled. "This is the most important rule in our kingdom: <strong>Props can only travel in one direction—from parent to child</strong>. No craftsman can modify the contents of the Props bag they receive; they can only read the instructions and create their piece accordingly."</>
				]}
			/>

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

			<StorySection
				paragraphs={[
					`"This one-way flow creates a predictable system," Hermes explained. "When something needs to change, the instructions always come from above. Workshops never modify their instructions; they simply follow them."`,
					`Aria pondered this. "But what if a Button workshop needs to tell App that it was clicked?"`,
					`"Ah, excellent question!" Hermes beamed. "For that, App sends special callback messengers - functions that the workshop can invoke to send messages back up. The workshop doesn't change the prop; it simply calls the function App provided."`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Deliver Props to Craftsmen
				</h3>
				<InstructionBox character="Drag each prop bag to the appropriate craftsman who needs it.">
					Remember, props can only travel down from App to Components!
				</InstructionBox>

				<div
					className={`message-board${
						messageBoard.includes("doesn't need") ? ' error' : ''
					}`}>
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
									craftsman.connected ? 'connected' : ''
								}`}
								onDrop={(e) =>
									handleCraftsmanDrop(e, craftsman.id)
								}
								onDragOver={handleDragOver}>
								<h4>{craftsman.name}</h4>
								<p>Needs: {craftsman.accepts.join(', ')}</p>
							</div>
						))}
					</div>

					<button
						className='reset-button'
						onClick={resetCraftsmenAndProps}>
						Reset Exercise
					</button>
				</div>

				<CodeExample
					title="The Sacred One-Way Rule"
					discoveredBy="Inscribed by Aria in the Guild Hall"
					code={`// Hermes demonstrates the one-way flow
function App() {
  const [count, setCount] = useState(0);
  
  // App can send data down via props
  // AND send functions for communication back up
  return (
    <Button 
      count={count}
      onIncrement={() => setCount(count + 1)}
    />
  );
}

function Button(props) {
  // ❌ FORBIDDEN: props.count = 10; // Cannot modify props!
  
  // ✅ ALLOWED: Read props and call callbacks
  return (
    <button onClick={props.onIncrement}>
      Clicked {props.count} times
    </button>
  );
}

// Aria's note: "The button tells App about clicks through the callback!"`}
				/>

			</div>

			<ChapterSummary
				lessonInsight={{
					title: 'The Flow Lesson:',
					content:
						'Props in React always flow in a single direction: from parent to child. This one-way data flow makes your application easier to understand and debug, because changes always come from above and components never modify the props they receive. If a child needs to communicate back, it does so by calling a callback function provided by its parent. Hermes emphasizes: "Predictability through unidirectional flow!"',
				}}
				reflectionQuestions={[
					'How does the one-way road metaphor help you understand how data flows in React?',
					'Why do you think callbacks are used for child-to-parent communication instead of letting children change props directly?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 4 (Evening)",
					content:
						"The one-way road rule makes so much sense now! It's like a chain of command - orders flow down, reports flow up through official channels (callbacks). This keeps everything organized and predictable. No workshop can accidentally change instructions meant for another!",
				}}
			/>
		</div>
	);
};

export default ChapterTwo;