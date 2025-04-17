const ChapterThree = ({ items, toggleCollectItem }) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Side Effect Enchantments
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					As State Sorcerers advanced in their studies, they
					discovered that changes in state could trigger side
					effects—powerful enchantments that interacted with the world
					outside their component.
				</p>

				<p className='story-paragraph'>
					"There exists a second magical hook," explained the mentor,
					"called useEffect. This hook allows you to perform side
					effects when your state changes, like communicating with
					remote data sources, directly manipulating the DOM, or
					setting up subscriptions."
				</p>

				<div className='code-example'>
					<pre>{`function EnchantedItems() {
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
}`}</pre>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Enchanted Items Collection
				</h3>
				<p className='instruction'>
					Collect the enchanted items below by clicking the buttons.
					Watch how the collected count updates as you collect or
					return items!
				</p>

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

			<div className='lesson-insight'>
				<h3>The Side Effects Insight:</h3>
				<p>
					The useEffect hook lets you perform side effects in your
					components, such as fetching data, updating the DOM, or
					setting up subscriptions. By specifying a dependency array,
					you control when the effect runs - only when specific state
					or props change. Effects let you synchronize your component
					with external systems and handle operations that shouldn't
					happen during rendering.
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;
