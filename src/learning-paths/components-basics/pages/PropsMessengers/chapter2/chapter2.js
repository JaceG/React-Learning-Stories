import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';
import useNarrative from '../../../../../hooks/useNarrative';

const ChapterTwo = () => {
	const { narrative, loading } = useNarrative('components-basics', 'PropsMessengers', 2);
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

	if (loading || !narrative) return <div className="chapter loading">Loading...</div>;

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={narrative.title}
				bridge={narrative.bridge}
			/>

			<StorySection paragraphs={narrative.storySections[0]} />

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

			<StorySection paragraphs={narrative.storySections[1]} />

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Deliver Props to Craftsmen
				</h3>
				<InstructionBox character='Drag each prop bag to the appropriate craftsman who needs it.'>
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
					title='The Sacred One-Way Rule'
					discoveredBy='Inscribed by Aria in the Guild Hall'
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

export default ChapterTwo;
