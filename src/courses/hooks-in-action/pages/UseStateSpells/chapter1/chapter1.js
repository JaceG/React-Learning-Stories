import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter1() {
  const [spellCount, setSpellCount] = useState(0);
  const [magicLevel, setMagicLevel] = useState(1);
  const [spellName, setSpellName] = useState('');
  const [castedSpells, setCastedSpells] = useState([]);

  const castSpell = () => {
    if (spellName.trim()) {
      setCastedSpells([...castedSpells, { 
        id: Date.now(), 
        name: spellName, 
        power: magicLevel 
      }]);
      setSpellCount(spellCount + 1);
      setSpellName('');
    }
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 1: Advanced State Incantations</h2>

        <div className='story-section'>
          <p className='story-paragraph'>
            Years had passed since the State Sorcerers first discovered their memory-keeping abilities. 
            Now, a new generation of wizards sought to master more advanced forms of the useState spell. 
            In the grand library of the Hook Academy, Master Hooksworth prepared to reveal deeper secrets.
          </p>

          <p className='story-paragraph'>
            "Welcome, young spell casters," Master Hooksworth began, his beard shimmering with magical 
            energy. "You've learned the basics of useState from the State Sorcerers, but today we delve 
            into patterns that will elevate your magic to new heights."
          </p>

          <p className='story-paragraph'>
            He opened an ancient spell book, its pages glowing with ethereal light. "The first advanced 
            pattern is the <strong>Lazy Initial State</strong>. When your initial state requires complex 
            calculations, you can provide a function instead of a value."
          </p>

          <div className='code-example'>
            <pre>{`// Instead of this (runs on every render):
const [data, setData] = useState(expensiveCalculation());

// Use this (runs only once):
const [data, setData] = useState(() => expensiveCalculation());`}</pre>
          </div>

          <p className='story-paragraph'>
            "This incantation," Master Hooksworth explained, "ensures your expensive magical calculations 
            only occur during the component's birth, not with every re-rendering of the spell."
          </p>
        </div>

        <div className='interactive-section'>
          <h3 className='section-title'>Practice Your State Spells</h3>
          <p>Create your own magical spells and watch them accumulate in your spell book!</p>

          <div className='spell-workshop'>
            <div className='spell-controls'>
              <input
                type="text"
                placeholder="Enter spell name..."
                value={spellName}
                onChange={(e) => setSpellName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && castSpell()}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '2px solid #6c5ce7',
                  fontSize: '16px',
                  width: '200px'
                }}
              />
              
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <label>Magic Level:</label>
                <select 
                  value={magicLevel} 
                  onChange={(e) => setMagicLevel(Number(e.target.value))}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '2px solid #6c5ce7'
                  }}
                >
                  <option value={1}>Novice (1)</option>
                  <option value={2}>Adept (2)</option>
                  <option value={3}>Master (3)</option>
                </select>
              </div>

              <button className='spell-button' onClick={castSpell} disabled={!spellName.trim()}>
                Cast Spell ✨
              </button>
            </div>

            <div className='state-visualizer'>
              <div className='state-item'>
                <h4>Total Spells Cast</h4>
                <div className='state-orb'>{spellCount}</div>
              </div>
              <div className='state-item'>
                <h4>Current Magic Level</h4>
                <div className='state-orb'>{magicLevel}</div>
              </div>
            </div>

            {castedSpells.length > 0 && (
              <div className='spell-book'>
                <h4>Your Spell Book:</h4>
                {castedSpells.map(spell => (
                  <div key={spell.id} className='spell-card'>
                    <strong>{spell.name}</strong> - Power Level: {spell.power}
                  </div>
                ))}
              </div>
            )}

            <button 
              className='reset-button' 
              onClick={() => {
                setCastedSpells([]);
                setSpellCount(0);
                setMagicLevel(1);
                setSpellName('');
              }}
              disabled={castedSpells.length === 0}
              style={{marginTop: '15px'}}
            >
              Clear Spell Book
            </button>
          </div>
        </div>

        <div className='pattern-showcase'>
          <span className='pattern-badge'>Advanced Pattern</span>
          <h4>Functional Updates</h4>
          <p>When updating state based on previous state, always use the functional form:</p>
          <div className='code-example'>
            <pre>{`// ❌ Avoid: Can cause bugs with multiple updates
setCount(count + 1);

// ✅ Prefer: Always gets the latest state
setCount(prevCount => prevCount + 1);`}</pre>
          </div>
        </div>

        <div className='lesson-insight'>
          <h3>The useState Lesson:</h3>
          <p>
            Advanced useState patterns help us write more efficient and bug-free components. Lazy 
            initialization prevents expensive calculations on every render, while functional updates 
            ensure we always work with the most current state. These patterns become essential as 
            your React applications grow in complexity and your components handle more sophisticated 
            state management scenarios.
          </p>
        </div>

        <div className='reflection-section'>
          <h3>Reflect on the Story</h3>
          <p>
            Why might lazy initialization be important for performance in larger applications?
          </p>
          <p>
            When would you use functional updates instead of direct state updates?
          </p>
          <p>
            How do these advanced patterns make your components more reliable?
          </p>
        </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter1;