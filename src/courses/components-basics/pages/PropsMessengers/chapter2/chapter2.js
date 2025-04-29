import { useState } from 'react';

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
			<h2 className='chapter-title'>Chapter 2: The One-Way Road</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					An important rule in Component Kingdom was that Props could
					only travel in one direction—from parent to child. No
					craftsman could modify the contents of the Props bag they
					received; they could only read the instructions and create
					their piece accordingly.
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
					This one-way flow of data created a predictable system. When
					something needed to change, the instructions always came
					from above. Workshops never modified their instructions;
					they simply followed them. If a workshop needed to
					communicate back up to App, it would use special callback
					messengers provided by App itself.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Deliver Props to Craftsmen
				</h3>
				<p>
					Drag each prop bag to the appropriate craftsman who needs
					it. Remember, props can only travel down from App to
					Components!
				</p>

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

				<div className='lesson-insight'>
					<h3>The One-Way Road Lesson:</h3>
					<p>
						Props in React always flow in a single direction: from
						parent to child. This one-way data flow makes your
						application easier to understand and debug, because
						changes always come from above and components never
						modify the props they receive. If a child needs to
						communicate back, it does so by calling a callback
						function provided by its parent.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does the one-way road metaphor help you understand
						how data flows in React?
					</p>
					<p>
						Why do you think callbacks are used for child-to-parent
						communication instead of letting children change props
						directly?
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChapterTwo;
