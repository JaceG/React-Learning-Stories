import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter3() {
  // Removed unused state - waterfallData was not being used in this component
  
  const [cascadeLevel, setCascadeLevel] = useState(1);

  const showNextLevel = () => {
    if (cascadeLevel < 4) {
      setCascadeLevel(cascadeLevel + 1);
    }
  };

  const resetCascade = () => {
    setCascadeLevel(1);
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 3: Waterfalls and Cascades</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          On your final day at the Data Rivers, Flow brought you to the kingdom's most spectacular 
          sight: the Great Waterfall. Here, data cascaded down through multiple levels, each pool 
          feeding into the next, creating a magnificent display of nested data flow.
        </p>
        <p className='story-paragraph'>
          "This waterfall," Flow explained with reverence, "represents how data flows through deeply 
          nested component trees. Each level receives water from above and can choose what to pass 
          down to the levels below."
        </p>
        <p className='story-paragraph'>
          She pointed to the multiple tiers. "Notice how some water splits into different channels at 
          each level? This is how parent components can distribute different pieces of data to different 
          children, creating complex but organized flow patterns."
        </p>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>The Cascading Waterfall</h3>
        <p>Watch how data cascades through nested components:</p>

        <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px'}}>
          <button className="action-button" onClick={showNextLevel} disabled={cascadeLevel >= 4}>
            Show Next Level
          </button>
          <button className="reset-button" onClick={resetCascade} disabled={cascadeLevel === 1}>
            Reset Cascade
          </button>
        </div>

        <div className="waterfall-container">
          {cascadeLevel >= 1 && (
            <div className="waterfall-level" style={{marginTop: '0'}}>
              <h4>App (Source Pool)</h4>
              <div className="water-drop">user: "River Master"</div>
              <div className="water-drop">theme: "blue"</div>
              <div className="water-drop">permissions: [...]</div>
              {cascadeLevel > 1 && <div className="waterfall-cascade"></div>}
            </div>
          )}

          {cascadeLevel >= 2 && (
            <div className="waterfall-level">
              <h4>Dashboard (Second Tier)</h4>
              <div className="water-drop">user: "River Master"</div>
              <div className="water-drop">theme: "blue"</div>
              <small>Filtered: permissions not needed here</small>
              {cascadeLevel > 2 && <div className="waterfall-cascade"></div>}
            </div>
          )}

          {cascadeLevel >= 3 && (
            <div className="waterfall-level">
              <h4>UserPanel & ThemeSelector (Third Tier)</h4>
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div>
                  <strong>UserPanel receives:</strong>
                  <div className="water-drop">user: "River Master"</div>
                </div>
                <div>
                  <strong>ThemeSelector receives:</strong>
                  <div className="water-drop">theme: "blue"</div>
                </div>
              </div>
              {cascadeLevel > 3 && <div className="waterfall-cascade"></div>}
            </div>
          )}

          {cascadeLevel >= 4 && (
            <div className="waterfall-level">
              <h4>Avatar & ThemePreview (Bottom Pools)</h4>
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div>
                  <strong>Avatar:</strong>
                  <div className="water-drop">name: "River Master"</div>
                </div>
                <div>
                  <strong>ThemePreview:</strong>
                  <div className="water-drop">color: "blue"</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          "The challenge with waterfalls," Flow cautioned, "is that the deeper they go, the harder they 
          become to maintain. When data must cascade through many levels, any change at the top can have 
          unexpected effects at the bottom."
        </p>
        <p className='story-paragraph'>
          She showed you a map of alternative routes. "This is why wise developers sometimes build 
          aqueducts—Context providers—that can transport water directly to where it's needed, bypassing 
          intermediate levels. But that's a lesson for another journey."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// The waterfall cascade pattern
function App() {
  const userData = { name: 'River Master', role: 'guide', id: 123 };
  const theme = { primary: 'blue', mode: 'light' };
  const permissions = ['read', 'write', 'admin'];
  
  return (
    <Dashboard 
      userData={userData}
      theme={theme}
      permissions={permissions}
    />
  );
}

function Dashboard({ userData, theme, permissions }) {
  // Dashboard doesn't need permissions, so doesn't pass them down
  return (
    <div style={{ background: theme.primary }}>
      <Header userData={userData} theme={theme} />
      <MainContent userData={userData} />
    </div>
  );
}

function Header({ userData, theme }) {
  // Split the flow - different data to different children
  return (
    <header>
      <UserInfo user={userData} />
      <ThemeToggle currentTheme={theme} />
    </header>
  );
}

function UserInfo({ user }) {
  // Further nesting - extract only what's needed
  return (
    <div>
      <Avatar userName={user.name} />
      <span>Welcome, {user.name}!</span>
    </div>
  );
}

function Avatar({ userName }) {
  // The bottom of our waterfall - receiving filtered data
  const initial = userName.charAt(0).toUpperCase();
  return <div className="avatar">{initial}</div>;
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Cascade Patterns</h3>
        <div className="flow-control-panel">
          <h4>Common Waterfall Patterns:</h4>
          
          <div style={{marginTop: '15px'}}>
            <strong>1. Full Cascade:</strong>
            <p>All props flow through every level (can cause prop drilling)</p>
          </div>
          
          <div style={{marginTop: '15px'}}>
            <strong>2. Filtered Cascade:</strong>
            <p>Each level takes what it needs and passes specific subsets down</p>
          </div>
          
          <div style={{marginTop: '15px'}}>
            <strong>3. Transformed Cascade:</strong>
            <p>Data is processed and reshaped at each level</p>
          </div>
          
          <div style={{marginTop: '15px'}}>
            <strong>4. Split Cascade:</strong>
            <p>Data branches into different streams for different child components</p>
          </div>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Cascading Data Lesson:</h3>
        <p>
          Data naturally cascades through nested component hierarchies like a waterfall, with each level passing down 
          only what its children need. Deep cascades beyond 3-4 levels often indicate the need for Context API or state 
          management solutions. By splitting data streams at branch points and filtering props at each tier, you can 
          avoid unnecessary prop passing and maintain clean, manageable component trees.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          How deep should you let props cascade before considering alternatives?
        </p>
        <p className='story-paragraph'>
          What strategies help manage complex nested data flow?
        </p>
        <p className='story-paragraph'>
          When does a waterfall pattern enhance vs. hinder code clarity?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter3;