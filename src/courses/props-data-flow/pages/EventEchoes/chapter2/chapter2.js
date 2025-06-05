import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter2() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    element: 'fire',
    power: 50
  });

  const logEvent = (eventType, detail) => {
    const newEvent = {
      id: Date.now(),
      type: eventType,
      detail,
      timestamp: new Date().toLocaleTimeString()
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
      power: 50
    });
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 2: Echo Chambers</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          The Echo Keeper led you deeper into the tower to a magnificent chamber where sounds 
          bounced and amplified. "This," she announced, "is where we master the art of complex 
          communication between components."
        </p>
        <p className='story-paragraph'>
          "Simple clicks are just the beginning," she explained, gesturing to intricate sound 
          patterns on the walls. "Real applications need rich communication—forms sending data, 
          lists notifying of selections, and complex interactions flowing upward through the 
          component tree."
        </p>
        <p className='story-paragraph'>
          She handed you a resonance crystal. "With callback props, children can send not just 
          signals, but entire messages filled with data. The parent component becomes a listener, 
          ready to respond to any echo from its children."
        </p>
      </div>

      <div className="interactive-section">
        <h3>The Communication Form</h3>
        <p>Fill out the form and watch events echo to the parent:</p>

        <div className="callback-visual">
          <div className="tower-level" style={{flex: 1}}>
            <h4>Child: Magic Item Form</h4>
            <form onSubmit={handleFormSubmit}>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px'}}>
                  Item Name:
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                </label>
              </div>

              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px'}}>
                  Element Type:
                  <select 
                    value={formData.element}
                    onChange={(e) => handleInputChange('element', e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  >
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="earth">Earth</option>
                    <option value="air">Air</option>
                  </select>
                </label>
              </div>

              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px'}}>
                  Power Level: {formData.power}
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={formData.power}
                    onChange={(e) => handleInputChange('power', e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '5px'
                    }}
                  />
                </label>
              </div>

              <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                <button type="submit" className="echo-button">
                  Submit Item
                </button>
                <button 
                  type="button"
                  className="reset-button"
                  onClick={resetEventLog}
                  disabled={events.length === 0 && formData.name === '' && formData.power === 50}
                >
                  Reset Log
                </button>
              </div>
            </form>
          </div>

          <div className="callback-arrow">↑</div>

          <div className="tower-level parent" style={{flex: 1}}>
            <h4>Parent: Event Listener</h4>
            <div className="event-log" style={{maxHeight: '250px'}}>
              {events.length === 0 ? (
                <div style={{color: '#74b9ff'}}>Waiting for events...</div>
              ) : (
                events.map(event => (
                  <div key={event.id} className="event-entry">
                    <span className="event-timestamp">{event.timestamp}</span>
                    <span className="event-type">{event.type}:</span>
                    <span className="event-detail">{event.detail}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          "See how rich the communication can be?" the Echo Keeper asked. "The child component 
          doesn't just say 'something happened'—it sends detailed information about what changed, 
          what was selected, or what was submitted."
        </p>
        <p className='story-paragraph'>
          She showed you a scroll of patterns. "Callback props can handle any type of upward 
          communication: updating parent state, triggering side effects, or even controlling 
          sibling components through the parent's orchestration."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// Parent component with multiple callback handlers
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
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3>Callback Best Practices</h3>
        <div className="echo-chamber">
          <h4>Echo Chamber Guidelines:</h4>
          
          <ol style={{lineHeight: '1.8', paddingLeft: '20px'}}>
            <li><strong>Name callbacks clearly:</strong> Use <code>onAction</code> pattern (onClick, onSubmit, onChange)</li>
            <li><strong>Pass relevant data:</strong> Send only necessary information upward</li>
            <li><strong>Handle events early:</strong> Process in child when possible, echo results</li>
            <li><strong>Avoid callback chains:</strong> Don't pass callbacks through many levels</li>
            <li><strong>Memoize callbacks:</strong> Use useCallback for performance when needed</li>
            <li><strong>Document expectations:</strong> Clear prop types for callbacks</li>
          </ol>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Callback Communication Lesson:</h3>
        <p>
          Callback props enable rich communication from children to parents, allowing complex data to flow upward through 
          callback arguments. Parents become orchestrators, coordinating multiple children through different callbacks for 
          adding, selecting, or deleting items. This pattern is especially common in form handling, where children collect 
          user input and send complete data objects to parent components for processing.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          How do callbacks enable component composition?
        </p>
        <p className='story-paragraph'>
          When should data be managed in parent vs child components?
        </p>
        <p className='story-paragraph'>
          What patterns help organize complex callback relationships?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter2;