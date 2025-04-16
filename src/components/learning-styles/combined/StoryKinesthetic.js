import React, { useState, useEffect } from 'react';
import './StoryKinesthetic.css';

function StoryKinesthetic() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [buttonsCreated, setButtonsCreated] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageBoard, setMessageBoard] = useState('');
  
  // State for highlighting craftsman cards
  const [highlightedCard, setHighlightedCard] = useState(null);
  
  // Exercise state for chapter 2
  const [craftsmen, setCraftsmen] = useState([
    { id: 1, name: 'Button Craftsman', connected: false, accepts: ['color', 'text', 'action'] },
    { id: 2, name: 'Card Craftsman', connected: false, accepts: ['title', 'content', 'image'] },
    { id: 3, name: 'Navbar Craftsman', connected: false, accepts: ['menuItems', 'logo', 'theme'] }
  ]);
  
  const [propBags, setPropBags] = useState([
    { id: 1, type: 'color', content: 'red', assigned: false },
    { id: 2, type: 'text', content: 'Click Me', assigned: false },
    { id: 3, type: 'action', content: 'show alert', assigned: false },
    { id: 4, type: 'title', content: 'Welcome', assigned: false },
    { id: 5, type: 'content', content: 'This is a card', assigned: false },
    { id: 6, type: 'image', content: 'picture.jpg', assigned: false },
    { id: 7, type: 'menuItems', content: ['Home', 'About'], assigned: false },
    { id: 8, type: 'logo', content: 'logo.png', assigned: false },
    { id: 9, type: 'theme', content: 'dark', assigned: false }
  ]);
  
  // For Chapter 3 - Creating buttons
  const createNewButton = (color, text) => {
    if (buttonsCreated.length < 3) {
      const newButton = { color, text, id: buttonsCreated.length + 1 };
      setButtonsCreated([...buttonsCreated, newButton]);
      
      if (buttonsCreated.length === 2) {
        setTimeout(() => {
          setShowSuccess(true);
        }, 500);
      }
    }
  };
  
  const resetButtons = () => {
    setButtonsCreated([]);
    setShowSuccess(false);
  };
  
  // For Chapter 2 - Drag and drop props
  const [draggedProp, setDraggedProp] = useState(null);
  
  const handlePropDragStart = (e, propId) => {
    setDraggedProp(propId);
  };
  
  const handleCraftsmanDrop = (e, craftsmanId) => {
    e.preventDefault();
    
    if (draggedProp !== null) {
      // Find the prop and craftsman
      const prop = propBags.find(p => p.id === draggedProp);
      const craftsman = craftsmen.find(c => c.id === craftsmanId);
      
      // Check if craftsman accepts this prop type
      if (craftsman.accepts.includes(prop.type)) {
        // Mark the prop as assigned
        const updatedProps = propBags.map(p => 
          p.id === draggedProp ? { ...p, assigned: true } : p
        );
        setPropBags(updatedProps);
        
        // Mark the craftsman as connected if all required props are assigned
        const requiredProps = propBags.filter(p => 
          craftsman.accepts.includes(p.type)
        );
        
        const assignedCount = requiredProps.filter(p => 
          p.assigned || p.id === draggedProp
        ).length;
        
        if (assignedCount === craftsman.accepts.length) {
          const updatedCraftsmen = craftsmen.map(c => 
            c.id === craftsmanId ? { ...c, connected: true } : c
          );
          setCraftsmen(updatedCraftsmen);
          
          // Show message
          setMessageBoard(`${craftsman.name} received all needed props!`);
          
          // Check if all craftsmen are connected
          if (updatedCraftsmen.every(c => c.connected)) {
            setTimeout(() => {
              setMessageBoard('All craftsmen have received their props! The Component Kingdom is thriving!');
            }, 1000);
          }
        } else {
          setMessageBoard(`${craftsman.name} received a ${prop.type} prop!`);
        }
      } else {
        setMessageBoard(`${craftsman.name} doesn't need ${prop.type} props!`);
      }
    }
    
    setDraggedProp(null);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const resetCraftsmenAndProps = () => {
    setCraftsmen(craftsmen.map(c => ({ ...c, connected: false })));
    setPropBags(propBags.map(p => ({ ...p, assigned: false })));
    setMessageBoard('');
  };

  // For Chapter 4 - Children's Palace
  const [palaceItems, setPalaceItems] = useState([
    { id: 1, type: 'title', content: 'Royal Announcement', placed: false },
    { id: 2, type: 'message', content: 'The king welcomes visitors today!', placed: false },
    { id: 3, type: 'decree', content: 'Hear ye, hear ye!', placed: false }
  ]);
  
  const [palaceStructure, setPalaceStructure] = useState({
    header: null,
    content: [],
    footer: null
  });
  
  const [draggedItem, setDraggedItem] = useState(null);
  
  const handleItemDragStart = (e, itemId) => {
    setDraggedItem(itemId);
  };
  
  const handlePalaceDrop = (e, zone) => {
    e.preventDefault();
    
    if (draggedItem !== null) {
      const item = palaceItems.find(i => i.id === draggedItem);
      
      // Update palace structure based on zone
      if (zone === 'header' && item.type === 'title') {
        setPalaceStructure({ ...palaceStructure, header: item });
      } else if (zone === 'content') {
        setPalaceStructure({ 
          ...palaceStructure, 
          content: [...palaceStructure.content, item] 
        });
      } else if (zone === 'footer' && item.type === 'decree') {
        setPalaceStructure({ ...palaceStructure, footer: item });
      } else {
        setMessageBoard(`This item doesn't belong in the ${zone}!`);
        setDraggedItem(null);
        return;
      }
      
      // Mark item as placed
      const updatedItems = palaceItems.map(i => 
        i.id === draggedItem ? { ...i, placed: true } : i
      );
      setPalaceItems(updatedItems);
      
      // Check if palace is complete
      setTimeout(() => {
        if (palaceStructure.header && 
            palaceStructure.content.length > 0 && 
            palaceStructure.footer) {
          setMessageBoard('The Children\'s Palace is complete!');
        }
      }, 500);
    }
    
    setDraggedItem(null);
  };
  
  const resetPalace = () => {
    setPalaceItems(palaceItems.map(i => ({ ...i, placed: false })));
    setPalaceStructure({ header: null, content: [], footer: null });
    setMessageBoard('');
  };
  
  // Navigation functions
  const nextChapter = () => {
    if (currentChapter < 4) {
      setCurrentChapter(currentChapter + 1);
      setMessageBoard('');
    }
  };
  
  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      setMessageBoard('');
    }
  };

  // Hover effects
  const handleWorkshopHover = (index) => {
    setHighlightedCard(index);
  };
  
  const handleWorkshopLeave = () => {
    setHighlightedCard(null);
  };

  return (
    <div className="combined-learning-container">
      <h2>The Tale of Component Kingdom</h2>
      <p className="subtitle">An interactive story about React's Component and Props system</p>
      
      <div className="story-navigation">
        <button 
          onClick={prevChapter} 
          disabled={currentChapter === 1}
          className="nav-button"
        >
          ← Previous Chapter
        </button>
        <span className="chapter-indicator">Chapter {currentChapter} of 4</span>
        <button 
          onClick={nextChapter} 
          disabled={currentChapter === 4}
          className="nav-button"
        >
          Next Chapter →
        </button>
      </div>
      
      {/* Chapter 1: The Village Craftsmen */}
      {currentChapter === 1 && (
        <div className="story-chapter">
          <h3>Chapter 1: The Village Craftsmen</h3>
          
          <div className="story-content">
            <p>
              In the realm of Component Kingdom, there lived many specialized craftsmen, 
              each creating unique pieces that could be assembled to build magnificent structures. 
              These craftsmen were known as <strong>Components</strong>, and they took great
              pride in their ability to be reused throughout the kingdom.
            </p>
            
            <div className="kingdom-illustration">
              <div className="castle">
                <div className="castle-tower">App</div>
                <div className="castle-body">
                  <div 
                    className="workshop button-workshop"
                    onMouseEnter={() => handleWorkshopHover(0)}
                    onMouseLeave={handleWorkshopLeave}
                  >
                    Button Craftsman
                  </div>
                  <div 
                    className="workshop card-workshop"
                    onMouseEnter={() => handleWorkshopHover(1)}
                    onMouseLeave={handleWorkshopLeave}
                  >
                    Card Craftsman
                  </div>
                  <div 
                    className="workshop navbar-workshop"
                    onMouseEnter={() => handleWorkshopHover(2)}
                    onMouseLeave={handleWorkshopLeave}
                  >
                    Navbar Craftsman
                  </div>
                </div>
              </div>
            </div>
            
            <p>
              The master builder, <strong>App</strong>, lived in the tallest tower and was 
              responsible for organizing all the craftsmen to work together. App would send 
              messengers carrying detailed instructions to each craftsman, telling them exactly
              what to build. These messengers carried bags called <strong>Props</strong>, which
              contained all the specifications a craftsman needed.
            </p>
            
            <div className="interactive-section">
              <h4>Interactive Exercise: The Props Messenger</h4>
              <div className="hover-instruction">
                <p><strong>👉 Move your mouse over each colored workshop above to see what props they require!</strong></p>
              </div>
              
              <div className="craftsmen-props">
                <div className={`craftsman-card ${highlightedCard === 0 ? 'highlight' : ''}`}>
                  <h5>Button Craftsman</h5>
                  <div className="prop-list">
                    <div className="prop-item">color: "red"</div>
                    <div className="prop-item">text: "Click Me"</div>
                    <div className="prop-item">action: function()</div>
                  </div>
                </div>
                
                <div className={`craftsman-card ${highlightedCard === 1 ? 'highlight' : ''}`}>
                  <h5>Card Craftsman</h5>
                  <div className="prop-list">
                    <div className="prop-item">title: "Welcome"</div>
                    <div className="prop-item">content: "This is a card component"</div>
                    <div className="prop-item">image: "card-image.jpg"</div>
                  </div>
                </div>
                
                <div className={`craftsman-card ${highlightedCard === 2 ? 'highlight' : ''}`}>
                  <h5>Navbar Craftsman</h5>
                  <div className="prop-list">
                    <div className="prop-item">menuItems: ["Home", "About", "Contact"]</div>
                    <div className="prop-item">logo: "logo.png"</div>
                    <div className="prop-item">theme: "dark"</div>
                  </div>
                </div>
              </div>
              
              <div className="reflection-question">
                <h4>Reflection:</h4>
                <p>Notice how each craftsman (Component) needs different props based on what they're building. 
                   Think about why a Button needs different information than a Card or Navbar.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Chapter 2: The One-Way Road */}
      {currentChapter === 2 && (
        <div className="story-chapter">
          <h3>Chapter 2: The One-Way Road</h3>
          
          <div className="story-content">
            <p>
              An important rule in Component Kingdom was that Props could only travel in one 
              direction—from parent to child. No craftsman could modify the contents of the Props
              bag they received; they could only read the instructions and create their piece accordingly.
            </p>
            
            <div className="kingdom-roads">
              <div className="app-castle">App</div>
              <div className="roads">
                <div className="road road-left"></div>
                <div className="road road-middle"></div>
                <div className="road road-right"></div>
              </div>
              <div className="workshops">
                <div className="road-workshop">Button</div>
                <div className="road-workshop">Card</div>
                <div className="road-workshop">Navbar</div>
              </div>
            </div>
            
            <div className="interactive-section">
              <h4>Interactive Exercise: Deliver Props to Craftsmen</h4>
              <p>
                Drag each prop bag to the appropriate craftsman who needs it. 
                Remember, props can only travel down from App to Components!
              </p>
              
              <div className="message-board">
                {messageBoard && <p>{messageBoard}</p>}
              </div>
              
              <div className="props-delivery-game">
                <div className="prop-bags">
                  {propBags.filter(prop => !prop.assigned).map(prop => (
                    <div
                      key={prop.id}
                      className={`prop-bag prop-${prop.type}`}
                      draggable
                      onDragStart={(e) => handlePropDragStart(e, prop.id)}
                    >
                      {prop.type}: {typeof prop.content === 'object' ? 'Array' : prop.content}
                    </div>
                  ))}
                </div>
                
                <div className="target-craftsmen">
                  {craftsmen.map(craftsman => (
                    <div
                      key={craftsman.id}
                      className={`target-craftsman ${craftsman.connected ? 'connected' : ''}`}
                      onDrop={(e) => handleCraftsmanDrop(e, craftsman.id)}
                      onDragOver={handleDragOver}
                    >
                      <h5>{craftsman.name}</h5>
                      <p>Needs: {craftsman.accepts.join(', ')}</p>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="reset-button"
                  onClick={resetCraftsmenAndProps}
                >
                  Reset Exercise
                </button>
              </div>
              
              <div className="reflection-question">
                <h4>Reflection:</h4>
                <p>
                  Why is it important that props only flow in one direction? Think about how this
                  creates a predictable data flow in your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Chapter 3: The Reusable Button Craftsmen */}
      {currentChapter === 3 && (
        <div className="story-chapter">
          <h3>Chapter 3: The Reusable Button Craftsmen</h3>
          
          <div className="story-content">
            <p>
              One day, App called upon the Button craftsman to create three different buttons 
              for the royal palace. With just one workshop template, the Button craftsman could 
              produce many variations based on the props it received.
            </p>
            
            <div className="code-example">
              <pre>{`// The Button craftsman's workshop
function Button(props) {
  return (
    <button 
      style={{ backgroundColor: props.color }}
      onClick={props.action}
    >
      {props.text}
    </button>
  );
}

// App sending instructions to create three different buttons
function App() {
  return (
    <div>
      <h1>Royal Palace Controls</h1>
      <Button color="red" text="Emergency" action={() => alert('Emergency!')} />
      <Button color="green" text="Enter" action={() => alert('Welcome!')} />
      <Button color="blue" text="Information" action={() => alert('Info')} />
    </div>
  );
}`}</pre>
            </div>
            
            <div className="interactive-section">
              <h4>Interactive Exercise: Create Custom Buttons</h4>
              <div className="hover-instruction">
                <p><strong>👉 Click on a color below to create a button with that color!</strong></p>
              </div>
              
              <div className="button-workshop-game">
                <div className="button-creation">
                  <div className="button-options">
                    <div className="option-group">
                      <h5>Choose Button Color:</h5>
                      <div className="color-options">
                        <div className="color-option red" onClick={() => createNewButton('red', 'Click Me')}></div>
                        <div className="color-option green" onClick={() => createNewButton('green', 'Click Me')}></div>
                        <div className="color-option blue" onClick={() => createNewButton('blue', 'Click Me')}></div>
                        <div className="color-option purple" onClick={() => createNewButton('purple', 'Click Me')}></div>
                        <div className="color-option orange" onClick={() => createNewButton('orange', 'Click Me')}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="created-buttons">
                    <h5>Your Created Buttons:</h5>
                    <div className="button-showcase">
                      {buttonsCreated.map(button => (
                        <div 
                          key={button.id}
                          className="showcase-button"
                          style={{ backgroundColor: button.color }}
                        >
                          {button.text}
                        </div>
                      ))}
                    </div>
                    
                    {showSuccess && (
                      <div className="success-message">
                        <p>Great job! You've created multiple buttons from the same Button component!</p>
                        <p>This demonstrates how reusable components are in React.</p>
                      </div>
                    )}
                    
                    <button 
                      className="reset-button"
                      onClick={resetButtons}
                    >
                      Reset Buttons
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="reflection-question">
                <h4>Reflection:</h4>
                <p>
                  How is creating different buttons from the same component similar to a craftsman
                  using the same workshop to create different products based on instructions?
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Chapter 4: The Children's Palace */}
      {currentChapter === 4 && (
        <div className="story-chapter">
          <h3>Chapter 4: The Children's Palace</h3>
          
          <div className="story-content">
            <p>
              In Component Kingdom, there was a special kind of Prop called <strong>children</strong>.
              This allowed craftsmen to build frames or containers while other craftsmen created
              what went inside. The wise Layout craftsman specialized in this technique.
            </p>
            
            <div className="code-example">
              <pre>{`// The Layout craftsman's workshop
function Layout(props) {
  return (
    <div className="layout-container">
      <header className="layout-header">
        {props.title}
      </header>
      <main className="layout-content">
        {props.children}
      </main>
      <footer className="layout-footer">
        © Component Kingdom
      </footer>
    </div>
  );
}

// App using the Layout craftsman
function App() {
  return (
    <Layout title="Welcome to the Royal Palace">
      <h2>Royal Announcements</h2>
      <p>The king welcomes all visitors today!</p>
      <Button color="gold" text="Royal Decree" />
    </Layout>
  );
}`}</pre>
            </div>
            
            <div className="interactive-section">
              <h4>Interactive Exercise: Build the Children's Palace</h4>
              <div className="hover-instruction">
                <p><strong>👉 Drag each item and drop it in the appropriate section of the palace layout!</strong></p>
              </div>
              
              <div className="message-board">
                {messageBoard && <p>{messageBoard}</p>}
              </div>
              
              <div className="palace-building-game">
                <div className="palace-items">
                  {palaceItems.filter(item => !item.placed).map(item => (
                    <div
                      key={item.id}
                      className={`palace-item palace-${item.type}`}
                      draggable
                      onDragStart={(e) => handleItemDragStart(e, item.id)}
                    >
                      {item.type}: {item.content}
                    </div>
                  ))}
                </div>
                
                <div className="palace-layout">
                  <div 
                    className={`palace-header ${palaceStructure.header ? 'filled' : ''}`}
                    onDrop={(e) => handlePalaceDrop(e, 'header')}
                    onDragOver={handleDragOver}
                  >
                    {palaceStructure.header ? 
                      palaceStructure.header.content : 'Header (Drop title here)'}
                  </div>
                  <div 
                    className={`palace-content ${palaceStructure.content.length > 0 ? 'filled' : ''}`}
                    onDrop={(e) => handlePalaceDrop(e, 'content')}
                    onDragOver={handleDragOver}
                  >
                    {palaceStructure.content.length > 0 ? 
                      palaceStructure.content.map(item => (
                        <div key={item.id}>{item.content}</div>
                      )) : 'Content (Drop message here)'}
                  </div>
                  <div 
                    className={`palace-footer ${palaceStructure.footer ? 'filled' : ''}`}
                    onDrop={(e) => handlePalaceDrop(e, 'footer')}
                    onDragOver={handleDragOver}
                  >
                    {palaceStructure.footer ? 
                      palaceStructure.footer.content : 'Footer (Drop decree here)'}
                  </div>
                </div>
                
                <button 
                  className="reset-button"
                  onClick={resetPalace}
                >
                  Reset Palace
                </button>
              </div>
              
              <div className="reflection-question">
                <h4>Reflection:</h4>
                <p>
                  How does the concept of <code>children</code> props help create flexible,
                  reusable components? Think about how containers like Layout can be reused
                  with different content inside.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="chapter-summary">
        <h4>Chapter Summary:</h4>
        {currentChapter === 1 && (
          <p>
            In Chapter 1, we learned that React Components are like craftsmen in Component Kingdom,
            each specializing in creating a specific part of the UI. The App component coordinates
            everything, passing Props (instructions) to each craftsman.
          </p>
        )}
        {currentChapter === 2 && (
          <p>
            In Chapter 2, we discovered that Props travel in one direction only, from parent to
            child components. This creates a predictable data flow and helps maintain the
            component hierarchy.
          </p>
        )}
        {currentChapter === 3 && (
          <p>
            In Chapter 3, we saw how a single Component can create multiple different UI elements
            based on the Props it receives. This makes components reusable and versatile.
          </p>
        )}
        {currentChapter === 4 && (
          <p>
            In Chapter 4, we explored the special children prop, which allows components to act
            as containers or layouts for other components. This creates flexible, composable UIs.
          </p>
        )}
      </div>
    </div>
  );
}

export default StoryKinesthetic;