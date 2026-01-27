import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterTwo() {
	const [events, setEvents] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		element: 'fire',
		power: 50,
	});

	const logEvent = (eventType, detail) => {
		const newEvent = {
			id: Date.now(),
			type: eventType,
			detail,
			timestamp: new Date().toLocaleTimeString(),
		};
		setEvents([newEvent, ...events.slice(0, 9)]);
	};

	const handleInputChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
		logEvent('Change', `${field}: ${value}`);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		logEvent('Submit', JSON.stringify(formData));
	};

	const resetEventLog = () => {
		setEvents([]);
		setFormData({
			name: '',
			element: 'fire',
			power: 50,
		});
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title="Echo Chambers"
					bridge="Deeper in the Echo Caves, the passages opened into a vast chamber where sounds seemed to multiply and layer upon themselves. Each whisper became a chorus, each footstep a rhythmic pattern. Aria felt like she was inside a living instrument."
				/>

			<StorySection
				paragraphs={[
					`"Welcome to the Echo Chamber!" Callback announced, her voice creating harmonious layers. "Here, we move beyond simple signals to orchestrate complex communication symphonies."`,
					`Aria watched as Binary sent out a chirp that transformed into multiple tones, each carrying different information. "How does it carry so much data?" she asked.`,
					`"Ah, you've discovered the secret!" Callback smiled. "Simple clicks were just the beginning. Real applications need rich communication - forms sending complete datasets, lists notifying of selections, complex interactions flowing upward like multi-voiced songs."`,
					`She handed Aria a resonance crystal that pulsed with captured sounds. "With callback props, children don't just ping their parents - they can send entire messages, complete with context, data, and intent. The parent becomes a conductor, orchestrating responses from multiple children."`,
					`"So callbacks can carry parameters?" Aria asked, examining the crystal.`,
					`"Exactly! Just as an echo can carry the nuance of the original sound, callbacks can transport rich data structures upward. Watch and learn!"`
				]}
			/>

				<div className='interactive-section'>
					<h3>The Communication Form</h3>
					<p>
						Fill out the form and watch events echo to the parent:
					</p>

					<div className='callback-visual'>
						<div className='tower-level' style={{ flex: 1 }}>
							<h4>Child: Magic Item Form</h4>
							<form onSubmit={handleFormSubmit}>
								<div style={{ marginBottom: '15px' }}>
									<label
										style={{
											display: 'block',
											marginBottom: '5px',
										}}>
										Item Name:
										<input
											type='text'
											value={formData.name}
											onChange={(e) =>
												handleInputChange(
													'name',
													e.target.value
												)
											}
											style={{
												display: 'block',
												width: '100%',
												padding: '8px',
												marginTop: '5px',
												borderRadius: '4px',
												border: '1px solid #ddd',
											}}
										/>
									</label>
								</div>

								<div style={{ marginBottom: '15px' }}>
									<label
										style={{
											display: 'block',
											marginBottom: '5px',
										}}>
										Element Type:
										<select
											value={formData.element}
											onChange={(e) =>
												handleInputChange(
													'element',
													e.target.value
												)
											}
											style={{
												display: 'block',
												width: '100%',
												padding: '8px',
												marginTop: '5px',
												borderRadius: '4px',
												border: '1px solid #ddd',
											}}>
											<option value='fire'>Fire</option>
											<option value='water'>Water</option>
											<option value='earth'>Earth</option>
											<option value='air'>Air</option>
										</select>
									</label>
								</div>

								<div style={{ marginBottom: '15px' }}>
									<label
										style={{
											display: 'block',
											marginBottom: '5px',
										}}>
										Power Level: {formData.power}
										<input
											type='range'
											min='0'
											max='100'
											value={formData.power}
											onChange={(e) =>
												handleInputChange(
													'power',
													e.target.value
												)
											}
											style={{
												display: 'block',
												width: '100%',
												marginTop: '5px',
											}}
										/>
									</label>
								</div>

								<div
									style={{
										display: 'flex',
										gap: '10px',
										justifyContent: 'center',
									}}>
									<button
										type='submit'
										className='echo-button'>
										Submit Item
									</button>
									<button
										type='button'
										className='reset-button'
										onClick={resetEventLog}
										disabled={
											events.length === 0 &&
											formData.name === '' &&
											formData.power === 50
										}>
										Reset Log
									</button>
								</div>
							</form>
						</div>

						<div className='callback-arrow'>↑</div>

						<div className='tower-level parent' style={{ flex: 1 }}>
							<h4>Parent: Event Listener</h4>
							<div
								className='event-log'
								style={{ maxHeight: '250px' }}>
								{events.length === 0 ? (
									<div style={{ color: '#74b9ff' }}>
										Waiting for events...
									</div>
								) : (
									events.map((event) => (
										<div
											key={event.id}
											className='event-entry'>
											<span className='event-timestamp'>
												{event.timestamp}
											</span>
											<span className='event-type'>
												{event.type}:
											</span>
											<span className='event-detail'>
												{event.detail}
											</span>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>

			<StorySection
				paragraphs={[
					`"Magnificent!" Aria exclaimed, watching the event log fill with detailed information. "The child isn't just saying 'something happened' - it's sending complete reports!"`,
					`"Now you understand!" Callback's eyes sparkled. "This is how complex applications communicate. Forms send entire data objects, lists report which item was selected with full context, and interactive components share their complete state changes."`,
					`She unrolled a glowing scroll covered in callback patterns. "Through these echoes, parent components become orchestrators. They can update their own state, coordinate between siblings, trigger side effects, or even cascade changes throughout the entire component tree."`,
					`Binary projected examples of callback chains, showing how events could ripple upward through multiple component layers.`,
					`"But be cautious," Callback warned. "Too many echo layers create confusion. If callbacks must travel through many components, consider other patterns like Context or state management libraries. The echo should reach its intended listener directly when possible."`
				]}
			/>

				<CodeExample
					title="Parent Component with Multiple Callback Handlers"
					code={`// Parent component with multiple callback handlers
function ItemManager() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Callback for adding new items
  const handleAddItem = (newItem) => {
    const item = { ...newItem, id: Date.now() };
    setItems([...items, item]);
    console.log('Item added:', item);
  };
  
  // Callback for item selection
  const handleSelectItem = (itemId) => {
    const item = items.find(i => i.id === itemId);
    setSelectedItem(item);
  };
  
  // Callback for item deletion
  const handleDeleteItem = (itemId) => {
    setItems(items.filter(i => i.id !== itemId));
    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };
  
  return (
    <div>
      <ItemForm onSubmit={handleAddItem} />
      <ItemList 
        items={items}
        onSelect={handleSelectItem}
        onDelete={handleDeleteItem}
        selectedId={selectedItem?.id}
      />
      {selectedItem && <ItemDetails item={selectedItem} />}
    </div>
  );
}

// Child component sending complex data upward
function ItemForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'weapon',
    power: 50
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the entire form data object upward
    onSubmit(formData);
    // Reset form
    setFormData({ name: '', type: 'weapon', power: 50 });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs that update local state */}
      <input 
        value={formData.name}
        onChange={(e) => setFormData({
          ...formData, 
          name: e.target.value
        })}
      />
      {/* More inputs... */}
      <button type="submit">Add Item</button>
    </form>
  );
}`}
				/>

				<div className='interactive-section'>
					<h3>Callback Best Practices</h3>
					<div className='echo-chamber'>
						<h4>Echo Chamber Guidelines:</h4>

						<ol style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
							<li>
								<strong>Name callbacks clearly:</strong> Use{' '}
								<code>onAction</code> pattern (onClick,
								onSubmit, onChange)
							</li>
							<li>
								<strong>Pass relevant data:</strong> Send only
								necessary information upward
							</li>
							<li>
								<strong>Handle events early:</strong> Process in
								child when possible, echo results
							</li>
							<li>
								<strong>Avoid callback chains:</strong> Don't
								pass callbacks through many levels
							</li>
							<li>
								<strong>Memoize callbacks:</strong> Use
								useCallback for performance when needed
							</li>
							<li>
								<strong>Document expectations:</strong> Clear
								prop types for callbacks
							</li>
						</ol>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "Echo Chamber Wisdom:",
						content: "Callbacks transport more than signals - they carry rich data structures upward through arguments. Master components orchestrate children by providing specific callbacks for different actions: onAdd, onDelete, onSelect. This pattern shines in forms where children collect complex input and send complete objects to parents. Remember: name callbacks clearly, pass only necessary data, and avoid deep callback chains that echo through too many layers."
					}}
					reflectionQuestions={[
						"How does the orchestrator metaphor help you think about parent components?",
						"When might callback chains become problematic, and what alternatives exist?",
						"What benefits do you see in sending complete data objects versus simple signals?"
					]}
					journalEntry={{
						title: "Aria's Journal - Day 15 (Afternoon)",
						content: "The Echo Chamber revealed the true power of callbacks! They're not just simple signals - they can carry rich data upward. Forms can send entire objects, lists can report selections with full context, and components can share detailed state changes. Parents become orchestrators, managing multiple children through different callbacks. The key insight: callbacks with parameters enable sophisticated upward communication while maintaining one-way data flow. But Callback warned against deep callback chains - echoes should reach their listeners directly!"
					}}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterTwo;
