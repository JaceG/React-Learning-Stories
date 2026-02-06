import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [items, setItems] = useState([
		{ id: 1, name: 'Scroll of Knowledge', collected: false },
		{ id: 2, name: 'Crystal of Memory', collected: false },
		{ id: 3, name: 'Quill of Truth', collected: false },
	]);

	const toggleCollectItem = (itemId) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId
					? { ...item, collected: !item.collected }
					: item
			)
		);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title='The Side Effect Enchantments'
				bridge='As State Sorcerers advanced in their studies, they discovered that changes in state could trigger side effects—powerful enchantments that interacted with the world outside their component.'
			/>

			<StorySection
				paragraphs={[
					`"There exists a second magical hook," explained Memnon, "called useEffect. This hook allows you to perform side effects when your state changes, like communicating with remote data sources, directly manipulating the DOM, or setting up subscriptions."`,
				]}
			/>

			<CodeExample
				title='useEffect Side Effects'
				discoveredBy="Memnon's Advanced Teachings"
				code={`function EnchantedItems() {
  const [items, setItems] = useState([
    { id: 1, name: 'Scroll of Knowledge', collected: false },
    { id: 2, name: 'Crystal of Memory', collected: false },
    { id: 3, name: 'Quill of Truth', collected: false }
  ]);

  const [notification, setNotification] = useState('');

  // This effect runs whenever the items state changes
  useEffect(() => {
    const collectedCount = items.filter(item => item.collected).length;

    if (collectedCount === items.length && collectedCount > 0) {
      setNotification('You have collected all items!');
    } else if (collectedCount > 0) {
      setNotification(\`You have collected \${collectedCount} items.\`);
    } else {
      setNotification('');
    }

    // The effect could also interact with external APIs
    // document.title = \`\${collectedCount} items collected\`;
  }, [items]); // Dependency array - effect runs when items changes

  return (
    <div>
      <h3>Enchanted Items</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => toggleCollectItem(item.id)}>
              {item.collected ? 'Return' : 'Collect'}
            </button>
          </li>
        ))}
      </ul>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}`}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Artifact Collection Trial
				</h3>
				<InstructionBox character='Memnon presents three glowing artifacts.'>
					"Your final test today, Aria. Collect these enchanted items
					and watch how the collection status updates automatically.
					This demonstrates state and effects working in harmony!"
				</InstructionBox>

				<div className='enchanted-items'>
					<h4>Magical Artifacts Collection</h4>

					<div className='items-collection'>
						{items.map((item) => (
							<div
								key={item.id}
								className={`enchanted-item ${
									item.collected ? 'collected' : ''
								}`}>
								<div className='item-name'>{item.name}</div>
								<button
									className='item-button'
									onClick={() => toggleCollectItem(item.id)}>
									{item.collected ? 'Return' : 'Collect'}
								</button>
							</div>
						))}
					</div>

					<div className='collection-status'>
						<div className='status-count'>
							<span>Items Collected:</span>{' '}
							{items.filter((item) => item.collected).length} /{' '}
							{items.length}
						</div>

						{items.filter((item) => item.collected).length ===
							items.length && (
							<div className='status-complete'>
								Collection Complete! You have mastered State
								magic!
							</div>
						)}
					</div>
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: "Memnon's Final Wisdom:",
					content:
						"The useEffect hook is the gateway between your component's inner world and the vast kingdom beyond. It lets you reach out - to fetch data from distant servers, update the browser's title, or synchronize with external systems. The dependency array is your control mechanism: it determines when your effects activate. Master this, and you master the art of keeping your components in harmony with the ever-changing world around them.",
				}}
				reflectionQuestions={[
					'How does Memnon\'s teaching about "consequences" help you understand the purpose of useEffect?',
					'Why do you think the dependency array is so important in controlling when effects run?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 8 (Evening)",
					content:
						"What an incredible day with the State Sorcerers! After learning useState and immutability, Memnon revealed the useEffect hook - the gateway between a component's inner world and everything beyond! I collected enchanted artifacts and watched the effects trigger automatically when state changed. The dependency array is like a watchlist - telling React exactly which state changes should trigger the effect. Binary explained that effects can reach out to APIs, update the document title, or set up subscriptions. The key insight: state gives components memory, but useEffect gives them the power to interact with the outside world!",
				}}
				lessonEnding={[
					"As the stars began to appear over the Eastern Quarter, Memnon placed his hand on Aria's shoulder. \"You've done exceptionally well today, young sorcerer. You've grasped the fundamentals of state magic far quicker than most.\"",
					'Binary twirled happily. "Tomorrow you\'ll learn about hooks - special spells that give functional components even more power!"',
					'"Rest well," Memnon advised. "The path ahead leads to the Hook Forge, where you\'ll discover useState and useEffect have many magical siblings. Each one grants unique powers to those wise enough to wield them."',
					"Aria left the crystal spire with her mind buzzing with new knowledge. State, immutability, effects - the building blocks of dynamic components. She couldn't wait to see what tomorrow would bring!",
				]}
			/>
		</div>
	);
};

export default ChapterThree;
