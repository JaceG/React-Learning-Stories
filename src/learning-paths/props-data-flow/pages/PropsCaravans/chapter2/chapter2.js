import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterTwo() {
	const cargoManifest = {
		text: 'Welcome Traveler',
		count: 42,
		isActive: true,
		colors: ['red', 'blue', 'green'],
		destination: { workshop: 'Button', floor: 3 },
	};

	const [inspectedCargo, setInspectedCargo] = useState(null);

	const resetInspection = () => {
		setInspectedCargo(null);
	};

	const cargoTypes = [
		{ key: 'text', label: 'Text Scroll', type: 'string' },
		{ key: 'count', label: 'Number Tablet', type: 'number' },
		{ key: 'isActive', label: 'Boolean Crystal', type: 'boolean' },
		{ key: 'colors', label: 'Array Chest', type: 'array' },
		{ key: 'destination', label: 'Object Map', type: 'object' },
	];

	const inspectCargo = (key) => {
		setInspectedCargo({
			key,
			value: cargoManifest[key],
			type: typeof cargoManifest[key],
		});
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title="Loading the Cargo"
					bridge="Dawn broke over the Trade Quarter as Aria arrived at the Grand Loading Dock. Massive wagons lined up in neat rows, each being carefully loaded with diverse cargo under Propius's watchful eye."
				/>

			<StorySection
				paragraphs={[
					`"Aria! Ready for today's lesson?" Propius called out, clipboard in hand. "Yesterday you learned about basic cargo transport. Today, we explore the full diversity of what our caravans can carry!"`,
					`He led her to a particularly impressive wagon. "This beauty is headed to the ProductCard Workshop. Look at its manifest - it carries text scrolls, number tablets, boolean crystals, entire arrays of items, even complex object maps!"`,
					`Binary's display lit up with curiosity. "All in one caravan? How do they keep track?"`,
					`"Every piece of cargo has a label," Propius explained, showing them the detailed manifest. "In React, we call these prop names. Each name tells the receiving workshop exactly what they're getting and how to use it."`,
					`Aria studied the manifest intently. "So a component can receive multiple props at once, each with its own purpose?"`,
					`"Exactly! And here's the clever part - workshops can 'destructure' their deliveries, unpacking exactly what they need in one smooth motion. Let me show you!"`
				]}
			/>

				<div className='interactive-section'>
					<h3 className='section-title'>Cargo Manifest Inspector</h3>
					<p>Click on each cargo type to inspect its contents:</p>

					<div className='cargo-selector'>
						{cargoTypes.map((cargo) => (
							<div
								key={cargo.key}
								className={`cargo-item ${
									inspectedCargo?.key === cargo.key
										? 'selected'
										: ''
								}`}
								onClick={() => inspectCargo(cargo.key)}>
								<div>{cargo.label}</div>
								<small
									style={{ fontSize: '12px', opacity: 0.8 }}>
									Type: {cargo.type}
								</small>
							</div>
						))}
					</div>

					{inspectedCargo && (
						<div
							className='caravan-display'
							style={{ textAlign: 'left', padding: '20px' }}>
							<h4>Cargo Inspection Report</h4>
							<p>
								<strong>Name:</strong> {inspectedCargo.key}
							</p>
							<p>
								<strong>Type:</strong> {inspectedCargo.type}
							</p>
							<p>
								<strong>Contents:</strong>
							</p>
							<div
								className='code-example'
								style={{ marginTop: '10px' }}>
								<pre>
									{JSON.stringify(
										inspectedCargo.value,
										null,
										2
									)}
								</pre>
							</div>
							<div
								style={{
									display: 'flex',
									gap: '10px',
									justifyContent: 'center',
									marginTop: '15px',
								}}>
								<button
									className='reset-button'
									onClick={resetInspection}
									disabled={!inspectedCargo}>
									Reset Inspection
								</button>
							</div>
						</div>
					)}
				</div>

			<StorySection
				paragraphs={[
					`After exploring the cargo types, Propius showed Aria how workshops prepared for incoming deliveries. "Each workshop posts a manifest at their entrance," he explained, leading them to a nearby Button Workshop. "See? It lists every type of cargo they accept."`,
					`Aria read the manifest aloud: "Text for display, color specifications, size measurements, and... function scrolls?"`,
					`"Ah, those are special!" Propius's eyes gleamed. "Function scrolls contain instructions that activate when certain events occur. We call them callbacks. They allow child components to send messages back to their parents!"`,
					`"Like a return caravan?" Aria asked.`,
					`"Precisely! The parent sends a function, and the child can invoke it when needed. It's how components communicate upstream, against the normal flow of props."`
				]}
			/>

				<CodeExample
					title="Sending a Fully Loaded Caravan"
					code={`// Sending a fully loaded caravan
<ProductCard
  title="Magic Potion"           // string
  price={99.99}                  // number
  inStock={true}                 // boolean
  ingredients={['herbs', 'crystals']} // array
  seller={{ name: 'Wizard Shop', rating: 5 }} // object
  onPurchase={() => handlePurchase()} // function
/>

// The receiving workshop unpacks everything
function ProductCard(props) {
  // Destructuring - unpacking the cargo efficiently
  const { title, price, inStock, ingredients, seller, onPurchase } = props;
  
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>Price: {price} gold coins</p>
      <p>Status: {inStock ? 'Available' : 'Sold Out'}</p>
      <p>Ingredients: {ingredients.join(', ')}</p>
      <p>Sold by: {seller.name} (★{seller.rating})</p>
      <button onClick={onPurchase}>Purchase</button>
    </div>
  );
}`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>Props Flow Visualization</h3>
					<div className='prop-flow-visualizer'>
						<div className='flow-component parent'>
							<h4>Parent Component</h4>
							<p>Loads cargo</p>
							<small>(App.js)</small>
						</div>
						<div className='flow-arrow'>→</div>
						<div className='flow-component'>
							<h4>Child Component</h4>
							<p>Receives cargo</p>
							<small>(ProductCard.js)</small>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "Propius's Cargo Management Wisdom:",
						content: "React props accept any JavaScript type as cargo - from simple strings and numbers to complex objects and powerful function callbacks. Destructuring allows clean unpacking of multiple props, while descriptive naming ensures clarity. Function props are particularly special, enabling upward communication from child to parent. Remember: props flow down, events bubble up through callbacks, creating a complete communication cycle in your component hierarchy."
					}}
					reflectionQuestions={[
						"How does the cargo manifest metaphor help you understand prop typing?",
						"Why are function props like \"return addresses\" for component communication?",
						"What benefits do you see in destructuring props versus accessing them directly?"
					]}
					journalEntry={{
						title: "Aria's Journal - Day 12 (Afternoon)",
						content: "The Loading Dock taught me that props are incredibly versatile! A single caravan (component) can carry strings, numbers, booleans, arrays, objects, and even functions. Propius showed me how destructuring lets workshops unpack cargo efficiently - much cleaner than accessing props.text, props.price, etc. The most magical discovery: function props! They're like return addresses that let child components send messages back to their parents. This two-way communication (props down, callbacks up) creates truly interactive applications!"
					}}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterTwo;
