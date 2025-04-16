import React, { useState } from 'react';
import '../../CourseStyles.css';
import './StateSorcerers.css';

function StateSorcerers() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [count, setCount] = useState(0);
  const [showCounterCode, setShowCounterCode] = useState(false);
  
  // State for form example in Chapter 2
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    power: 'transformation'
  });
  
  // State for the enchanted items in Chapter 3
  const [items, setItems] = useState([
    { id: 1, name: 'Scroll of Knowledge', collected: false },
    { id: 2, name: 'Crystal of Memory', collected: false },
    { id: 3, name: 'Quill of Truth', collected: false }
  ]);
  
  // Handler for Counter component
  const incrementCount = () => {
    setCount(count + 1);
  };
  
  // Handler for form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Handler for collecting enchanted items
  const toggleCollectItem = (itemId) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, collected: !item.collected } 
          : item
      )
    );
  };
  
  // Navigation functions
  const nextChapter = () => {
    if (currentChapter < 3) {
      setCurrentChapter(currentChapter + 1);
    }
  };
  
  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  return (
    <div className="lesson-container">
      <h1 className="lesson-title">The State Sorcerers</h1>
      <p className="lesson-subtitle">Discover the magic of component memory and state transformations</p>
      
      <div className="chapter-navigation">
        <button 
          onClick={prevChapter} 
          disabled={currentChapter === 1}
          className="chapter-nav-button"
        >
          ← Previous Chapter
        </button>
        <span className="chapter-indicator">Chapter {currentChapter} of 3</span>
        <button 
          onClick={nextChapter} 
          disabled={currentChapter === 3}
          className="chapter-nav-button"
        >
          Next Chapter →
        </button>
      </div>
      
      {/* Chapter 1: Introduction to State Magic */}
      {currentChapter === 1 && (
        <div className="chapter">
          <h2 className="chapter-title">Chapter 1: The Memory Keepers</h2>
          
          <div className="story-section">
            <p className="story-paragraph">
              Within the Component Kingdom lived a special class of citizens known as the State Sorcerers. 
              These powerful entities had the unique ability to remember things and change over time.
            </p>
            
            <div className="sorcerer-illustration">
              <div className="sorcerer">
                <div className="sorcerer-head"></div>
                <div className="sorcerer-body"></div>
                <div className="sorcerer-staff">
                  <div className="staff-orb"></div>
                </div>
              </div>
              <div className="memory-orbs">
                <div className="memory-orb">count: 0</div>
                <div className="memory-orb">name: ""</div>
                <div className="memory-orb">isActive: false</div>
              </div>
            </div>
            
            <p className="story-paragraph">
              "Unlike ordinary Components," explained the Council Elder, "State Sorcerers possess magical orbs 
              that store memories. These memories persist between renderings, allowing the Sorcerers to remember 
              past interactions and change their appearance accordingly."
            </p>
            
            <p className="story-paragraph">
              A young apprentice named Counter was learning the ways of state magic. His mentor handed him a 
              mysterious hook called useState.
            </p>
            
            <div className="code-example">
              <pre>{`function Counter() {
  // The useState spell creates a magical memory
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}</pre>
            </div>
            
            <p className="story-paragraph">
              "With this hook," the mentor explained, "you can create a memory that persists between renderings. 
              The first value is what you remember, and the second is a spell to change that memory."
            </p>
          </div>
          
          <div className="interactive-section">
            <h3 className="section-title">Interactive Exercise: The Counter Spell</h3>
            <p className="instruction">
              Try clicking the button below to see state magic in action. Each click updates the count state!
            </p>
            
            <div className="counter-demo">
              <div className="counter-display">
                <div className="count-value">{count}</div>
                <div className="count-label">Click Count</div>
              </div>
              
              <button 
                className="counter-button"
                onClick={incrementCount}
              >
                Increment Count
              </button>
              
              <button 
                className="toggle-code-button"
                onClick={() => setShowCounterCode(!showCounterCode)}
              >
                {showCounterCode ? "Hide Code" : "Show Code"}
              </button>
              
              {showCounterCode && (
                <div className="code-display">
                  <pre>{`function CounterDemo() {
  // State declaration using useState hook
  const [count, setCount] = useState(${count});
  
  // Event handler to update state
  const incrementCount = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <div className="count-value">{count}</div>
      <button onClick={incrementCount}>
        Increment Count
      </button>
    </div>
  );
}`}</pre>
                </div>
              )}
            </div>
          </div>
          
          <div className="lesson-insight">
            <h3>The State Insight:</h3>
            <p>
              State in React is like a component's memory. It allows components to remember information and change 
              over time in response to user actions, network responses, or anything else. When state changes, React 
              automatically updates the UI to reflect those changes. The useState hook provides a way to add state 
              to functional components, returning a pair: the current state value and a function to update it.
            </p>
          </div>
        </div>
      )}
      
      {/* Chapter 2: State Transformation */}
      {currentChapter === 2 && (
        <div className="chapter">
          <h2 className="chapter-title">Chapter 2: The Transformation Spells</h2>
          
          <div className="story-section">
            <p className="story-paragraph">
              As State Sorcerers became more skilled, they learned that state could take many forms, not just 
              simple values like numbers. The most powerful Sorcerers could manage complex memories with objects, 
              arrays, and nested structures.
            </p>
            
            <p className="story-paragraph">
              "Remember," cautioned the mentor, "state is immutable in our kingdom. You cannot directly change 
              state memories; you must create new memories to replace the old ones."
            </p>
            
            <div className="code-example">
              <pre>{`function SorcererForm() {
  // Complex state example: an object with multiple properties
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    power: 'transformation'
  });
  
  // Handler to update a specific field while preserving others
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,  // Spread operator preserves existing fields
      [name]: value // Updates only the changed field
    }));
  };
  
  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Sorcerer Name"
      />
      {/* Other fields */}
    </form>
  );
}`}</pre>
            </div>
            
            <p className="story-paragraph">
              The Council Elder demonstrated the proper way to update different types of state:
            </p>
          </div>
          
          <div className="interactive-section">
            <h3 className="section-title">Interactive Exercise: Sorcerer Registration</h3>
            <p className="instruction">
              Fill out the form below to register as a State Sorcerer. Notice how each field you change updates 
              the state object without affecting other fields!
            </p>
            
            <div className="sorcerer-form">
              <div className="form-preview">
                <div className="sorcerer-card">
                  <div className="sorcerer-card-header">
                    <h4>{formData.name || 'Unnamed Sorcerer'}</h4>
                    <div className="sorcerer-title">{formData.title || 'Apprentice'}</div>
                  </div>
                  <div className="sorcerer-card-body">
                    <div className="sorcerer-power">
                      <span>Magical Power:</span> {formData.power}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-inputs">
                <div className="input-group">
                  <label htmlFor="name">Sorcerer Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="title">Magical Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Grand Wizard, Mystic Sage"
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="power">Primary Power:</label>
                  <select
                    id="power"
                    name="power"
                    value={formData.power}
                    onChange={handleInputChange}
                  >
                    <option value="transformation">Transformation</option>
                    <option value="illusion">Illusion</option>
                    <option value="divination">Divination</option>
                    <option value="enchantment">Enchantment</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="state-display">
              <h4>Current State:</h4>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          </div>
          
          <div className="lesson-insight">
            <h3>The State Transformation Insight:</h3>
            <p>
              When working with complex state like objects and arrays, it's crucial to treat state as immutable. 
              Instead of modifying existing state directly, always create new versions using the spread operator 
              (...) or methods like map(), filter(), and concat(). This approach ensures that React can properly 
              detect state changes and re-render components efficiently.
            </p>
          </div>
        </div>
      )}
      
      {/* Chapter 3: State and Effects */}
      {currentChapter === 3 && (
        <div className="chapter">
          <h2 className="chapter-title">Chapter 3: The Side Effect Enchantments</h2>
          
          <div className="story-section">
            <p className="story-paragraph">
              As State Sorcerers advanced in their studies, they discovered that changes in state could 
              trigger side effects—powerful enchantments that interacted with the world outside their component.
            </p>
            
            <p className="story-paragraph">
              "There exists a second magical hook," explained the mentor, "called useEffect. This hook allows 
              you to perform side effects when your state changes, like communicating with remote data sources,
              directly manipulating the DOM, or setting up subscriptions."
            </p>
            
            <div className="code-example">
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
          
          <div className="interactive-section">
            <h3 className="section-title">Interactive Exercise: Enchanted Items Collection</h3>
            <p className="instruction">
              Collect the enchanted items below by clicking the buttons. Watch how the collected count updates 
              as you collect or return items!
            </p>
            
            <div className="enchanted-items">
              <h4>Magical Artifacts Collection</h4>
              
              <div className="items-collection">
                {items.map(item => (
                  <div 
                    key={item.id} 
                    className={`enchanted-item ${item.collected ? 'collected' : ''}`}
                  >
                    <div className="item-name">{item.name}</div>
                    <button 
                      className="item-button"
                      onClick={() => toggleCollectItem(item.id)}
                    >
                      {item.collected ? 'Return' : 'Collect'}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="collection-status">
                <div className="status-count">
                  <span>Items Collected:</span> {items.filter(item => item.collected).length} / {items.length}
                </div>
                
                {items.filter(item => item.collected).length === items.length && (
                  <div className="status-complete">
                    Collection Complete! You have mastered State magic!
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lesson-insight">
            <h3>The Side Effects Insight:</h3>
            <p>
              The useEffect hook lets you perform side effects in your components, such as fetching data, 
              updating the DOM, or setting up subscriptions. By specifying a dependency array, you control 
              when the effect runs - only when specific state or props change. Effects let you synchronize 
              your component with external systems and handle operations that shouldn't happen during rendering.
            </p>
          </div>
        </div>
      )}
      
      <div className="chapter-summary">
        <h4>Chapter Summary:</h4>
        {currentChapter === 1 && (
          <p>
            In Chapter 1, we learned that State allows components to remember information between renders and 
            change over time. The useState hook gives components a memory that persists across re-renders, 
            along with a function to update that memory and trigger UI changes.
          </p>
        )}
        {currentChapter === 2 && (
          <p>
            In Chapter 2, we discovered how to work with complex state like objects and arrays. We learned the 
            importance of treating state as immutable, creating new state objects rather than modifying existing 
            ones directly, using techniques like the spread operator.
          </p>
        )}
        {currentChapter === 3 && (
          <p>
            In Chapter 3, we explored how state changes can trigger side effects using the useEffect hook. 
            We learned how to synchronize component state with external systems, and how to control when 
            effects run by specifying dependencies.
          </p>
        )}
      </div>
      
      <div className="lesson-navigation">
        <button className="lesson-nav-button">Previous Lesson</button>
        <button className="lesson-complete-button">Mark as Complete</button>
        <button className="lesson-nav-button">Next Lesson</button>
      </div>
    </div>
  );
}

export default StateSorcerers;