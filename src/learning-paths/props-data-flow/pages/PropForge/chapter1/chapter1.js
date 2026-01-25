import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterOne() {
	const [selectedMaterials, setSelectedMaterials] = useState([]);
	const [forgedProps, setForgedProps] = useState({});
	const [isForging, setIsForging] = useState(false);

	const materials = [
		{ id: 'title', name: 'Title Iron', value: '"Master Sword"' },
		{ id: 'damage', name: 'Damage Crystal', value: '100' },
		{ id: 'element', name: 'Element Gem', value: '"fire"' },
		{ id: 'durability', name: 'Durability Stone', value: '500' },
	];

	const toggleMaterial = (material) => {
		if (selectedMaterials.find((m) => m.id === material.id)) {
			setSelectedMaterials(
				selectedMaterials.filter((m) => m.id !== material.id)
			);
		} else {
			setSelectedMaterials([...selectedMaterials, material]);
		}
	};

	const forgeProp = () => {
		setIsForging(true);
		setTimeout(() => {
			const newProps = {};
			selectedMaterials.forEach((material) => {
				newProps[material.id] = material.value;
			});
			setForgedProps(newProps);
			setIsForging(false);
			setSelectedMaterials([]);
		}, 1500);
	};

	const resetForge = () => {
		setSelectedMaterials([]);
		setForgedProps({});
		setIsForging(false);
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title="The Art of Destructuring"
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						The heat hit Aria like a wall as she entered the Prop
						Forge. Molten data flowed in channels carved into the
						floor, and the air shimmered with the energy of
						transformation. At the center of it all stood a figure
						wielding a glowing hammer.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome to my domain!" The smith turned, revealing a
						face weathered by years at the forge. His beard was
						singed at the edges, and his eyes sparkled with the
						reflection of data flames. "I am{' '}
						<strong>Master Smith Destructo</strong>, and you must be
						Aria!"
					</p>
					<p className='story-paragraph'>
						"How did you know?" Aria asked, wiping sweat from her
						brow.
					</p>
					<p className='story-paragraph'>
						"River Master Flux sent word of your coming. Plus," he
						grinned, "Binary's unique design is hard to miss. Not
						many companion constructs can project holograms like
						that!"
					</p>
					<p className='story-paragraph'>
						Binary beamed proudly, literally, projecting a small
						light show.
					</p>
					<p className='story-paragraph'>
						"Now then," Destructo continued, gesturing to his
						workshop, "you've learned to transport props and control
						their flow. But here, we master their transformation!
						The ancient art of destructuring allows us to break
						props apart and extract exactly what we need."
					</p>
					<p className='story-paragraph'>
						He held up a glowing object. "Behold - a prop object
						containing multiple values. Watch as I extract its
						essence with a single incantation!"
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>The Forging Chamber</h3>
					<p>Select materials to forge into props:</p>

					<div className='material-selector'>
						{materials.map((material) => (
							<div
								key={material.id}
								className={`prop-material ${
									selectedMaterials.find(
										(m) => m.id === material.id
									)
										? 'selected'
										: ''
								}`}
								onClick={() => toggleMaterial(material)}>
								<strong>{material.name}</strong>
								<div
									style={{
										fontSize: '14px',
										marginTop: '5px',
									}}>
									{material.id}: {material.value}
								</div>
							</div>
						))}
					</div>

					<div className='forge-workshop'>
						<div className='anvil'>
							<div className='hammer' onClick={forgeProp}>
								🔨
							</div>
							<p>
								{isForging
									? 'Forging...'
									: 'Click hammer to forge!'}
							</p>
						</div>

						{Object.keys(forgedProps).length > 0 && !isForging && (
							<div
								style={{
									textAlign: 'center',
									marginTop: '20px',
								}}>
								<h4 style={{ color: 'white' }}>
									Forged Props:
								</h4>
								<div className='forged-prop'>
									{JSON.stringify(forgedProps, null, 2)}
								</div>
							</div>
						)}

						<div
							style={{
								display: 'flex',
								gap: '10px',
								justifyContent: 'center',
								marginTop: '20px',
							}}>
							<button
								className='reset-button'
								onClick={resetForge}
								disabled={
									selectedMaterials.length === 0 &&
									Object.keys(forgedProps).length === 0
								}>
								Reset Forge
							</button>
						</div>
					</div>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						After the forging demonstration, Destructo's expression
						grew serious. "Forging is only half the craft. The true
						mastery lies in destructuring - breaking props apart
						efficiently."
					</p>
					<p className='story-paragraph'>
						He showed Aria two identical prop objects. "Watch the
						difference between a novice and a master." With one, he
						tediously accessed each property: props.title,
						props.damage, props.element. With the other, he
						performed a single elegant gesture, and the properties
						separated cleanly into individual variables.
					</p>
					<p className='story-paragraph'>
						"Destructuring!" Aria exclaimed. "You're extracting
						multiple values at once!"
					</p>
					<p className='story-paragraph'>
						"Exactly! And it gets better," Destructo winked. "We can
						even provide default values for properties that might be
						missing. It's like having a backup plan built into your
						extraction process."
					</p>
				</div>

				<CodeExample
					title="The Art of Destructuring Props"
					code={`// The old way - accessing props repeatedly
function WeaponCard(props) {
  return (
    <div className="weapon">
      <h3>{props.title}</h3>
      <p>Damage: {props.damage}</p>
      <p>Element: {props.element}</p>
      <p>Durability: {props.durability}</p>
    </div>
  );
}

// The master smith's way - destructuring
function WeaponCard({ title, damage, element, durability }) {
  return (
    <div className="weapon">
      <h3>{title}</h3>
      <p>Damage: {damage}</p>
      <p>Element: {element}</p>
      <p>Durability: {durability}</p>
    </div>
  );
}

// Advanced destructuring with defaults
function WeaponCard({ 
  title = "Unknown Weapon",
  damage = 0,
  element = "normal",
  durability = 100 
}) {
  return (
    <div className="weapon">
      <h3>{title}</h3>
      <p>Damage: {damage}</p>
      <p>Element: {element}</p>
      <p>Durability: {durability}/{100}</p>
    </div>
  );
}`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Destructuring Demonstration
					</h3>
					<div className='prop-inspector'>
						<p style={{ color: '#ffd43b', marginBottom: '15px' }}>
							{'// Original props object:'}
						</p>
						<pre>{`const props = {
  title: "Master Sword",
  damage: 100,
  element: "fire",
  durability: 500,
  owner: "Link"
}`}</pre>

						<p style={{ color: '#ffd43b', margin: '15px 0' }}>
							{'// Destructuring magic:'}
						</p>
						<pre>{`const { title, damage, element, durability, owner } = props;

// Now each property is its own variable!
console.log(title);     // "Master Sword"
console.log(damage);    // 100
console.log(element);   // "fire"`}</pre>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "Master Destructo's Forging Wisdom:",
						content: "Destructuring extracts properties from props objects with surgical precision, transforming verbose prop access into clean, readable code. Master this art by destructuring in function parameters, providing default values for optional props, and extracting only what you need. This technique not only reduces repetition but also documents your component's expectations clearly. Remember: a component that destructures its props is a component that knows exactly what it needs."
					}}
					reflectionQuestions={[
						"How does the forging metaphor help you understand prop transformation?",
						"Why might destructuring with defaults be like having a \"backup plan\"?",
						"What advantages does parameter destructuring provide over accessing props directly?"
					]}
					characterIntros={[
						{
							name: "Master Smith Destructo",
							description: "The legendary prop smith of React Kingdom. His forge transforms raw data into refined props, but his true mastery lies in destructuring - the art of elegantly extracting exactly what's needed from complex prop objects. His singed beard tells tales of countless hours perfecting the craft."
						}
					]}
					journalEntry={{
						title: "Aria's Journal - Day 14 (Morning)",
						content: "The Prop Forge is incredible! Master Destructo showed me how destructuring transforms clumsy prop access into elegant extraction. Instead of writing props.this and props.that everywhere, we can extract all needed properties in one line! Even better - we can provide default values, so our components never break from missing props. It's like having a safety net built into the code. Destructuring in function parameters is especially powerful - it immediately shows which props a component expects. This isn't just about writing less code; it's about writing clearer, more intentional code!"
					}}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterOne;
