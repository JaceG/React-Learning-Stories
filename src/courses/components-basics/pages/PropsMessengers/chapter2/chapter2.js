const ChapterTwo = ({
	handlePropDragStart,
	handleCraftsmanDrop,
	handleDragOver,
	resetCraftsmenAndProps,
	messageBoard,
	propBags,
	craftsmen,
}) => {
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

				<div className='message-board'>
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

				<div className='reflection-section'>
					<h3>Reflection:</h3>
					<p>
						Why is it important that props only flow in one
						direction? Think about how this creates a predictable
						data flow in your application.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChapterTwo;
