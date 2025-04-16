import React, { useState } from 'react';
import './LearningStyles.css';

function StoryBased() {
  const [currentChapter, setCurrentChapter] = useState(1);
  
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
    <div className="learning-style-container story-based">
      <h2>The React Chronicles: A Coding Adventure</h2>
      
      <div className="story-navigation">
        <button 
          onClick={prevChapter} 
          disabled={currentChapter === 1}
          className="story-nav-button"
        >
          ← Previous
        </button>
        <span className="chapter-indicator">Chapter {currentChapter} of 3</span>
        <button 
          onClick={nextChapter} 
          disabled={currentChapter === 3}
          className="story-nav-button"
        >
          Next →
        </button>
      </div>
      
      <div className="story-content">
        {currentChapter === 1 && (
          <div className="story-chapter">
            <h3>Chapter 1: The Component Kingdom</h3>
            
            <p className="story-paragraph">
              In the digital realm of Weblandia, there existed a kingdom called React where everything was built from magical building blocks known as Components. Unlike the static structures in neighboring kingdoms, these Components were alive and responsive.
            </p>
            
            <p className="story-paragraph">
              The secret to their magic was a special language called JSX – a powerful blend of HTML and JavaScript that allowed the Components to describe exactly how they should appear.
            </p>
            
            <div className="story-code-example">
              <pre>{`// This is how a simple Component citizen looked
function Greeting() {
  return <h1>Welcome to the Component Kingdom!</h1>;
}`}</pre>
            </div>
            
            <p className="story-paragraph">
              Each Component in the kingdom had its own special role and appearance, but they all followed the same rule: they took in information called "props" and displayed themselves accordingly.
            </p>
            
            <div className="story-insight">
              <h4>The Component Lesson:</h4>
              <p>In React, everything you see is a Component – a reusable piece of code that returns JSX elements describing what should appear on the screen. Components can be as simple as a button or as complex as an entire page.</p>
            </div>
          </div>
        )}
        
        {currentChapter === 2 && (
          <div className="story-chapter">
            <h3>Chapter 2: The State Sorcerers</h3>
            
            <p className="story-paragraph">
              Within the Component Kingdom lived a special class of citizens known as the State Sorcerers. These powerful entities had the unique ability to remember things and change over time.
            </p>
            
            <p className="story-paragraph">
              A young apprentice named Counter was learning the ways of state magic. His mentor handed him a mysterious hook called useState.
            </p>
            
            <div className="story-code-example">
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
              "With this hook," the mentor explained, "you can create a memory that persists between renderings. The first value is what you remember, and the second is a spell to change that memory."
            </p>
            
            <p className="story-paragraph">
              The young Counter was amazed. When someone clicked his button, he could remember and increment the number of clicks!
            </p>
            
            <div className="story-insight">
              <h4>The State Lesson:</h4>
              <p>State in React is like a component's memory. It allows components to remember information and change over time in response to user actions, network responses, or anything else. When state changes, React automatically updates the UI to reflect those changes.</p>
            </div>
          </div>
        )}
        
        {currentChapter === 3 && (
          <div className="story-chapter">
            <h3>Chapter 3: The Props Messengers</h3>
            
            <p className="story-paragraph">
              The Component Kingdom thrived because of its robust communication system: the Props Messengers. These special couriers carried information from parent components to their children.
            </p>
            
            <p className="story-paragraph">
              In one corner of the kingdom, a parent Dashboard component needed to share user information with its children. It sent Props Messengers to deliver this important data.
            </p>
            
            <div className="story-code-example">
              <pre>{`function Dashboard() {
  const username = "Adventure Seeker";
  
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {/* Sending a Props Messenger */}
      <UserGreeting name={username} />
      <UserProfile name={username} />
    </div>
  );
}

function UserGreeting(props) {
  // The props messenger delivered the name!
  return <h2>Hello, {props.name}!</h2>;
}`}</pre>
            </div>
            
            <p className="story-paragraph">
              The children components received their messages and knew exactly how to display themselves based on this information. However, they could only read the messages, never change them – that was a sacred rule of the Props Messengers.
            </p>
            
            <div className="story-insight">
              <h4>The Props Lesson:</h4>
              <p>Props are how components talk to each other. They're passed from parent to child, like arguments to a function. Props are read-only – a component must never modify its own props. This one-way data flow keeps everything predictable and makes debugging easier.</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="story-reflection">
        <h3>Reflect on the Story</h3>
        <p>How does thinking of React components as characters in a kingdom help you understand their purpose?</p>
        <p>Can you picture the flow of information through props as messengers traveling between components?</p>
        <p>Does the metaphor of state as a component's memory help clarify why and when to use state?</p>
      </div>
    </div>
  );
}

export default StoryBased;