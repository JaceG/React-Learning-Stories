import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter2() {
  const [formData, setFormData] = useState({
    name: '',
    element: 'fire',
    power: 50
  });
  const [isEditing, setIsEditing] = useState(false);
  const [savedSpells, setSavedSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSpell = () => {
    if (formData.name) {
      setSavedSpells([...savedSpells, { ...formData, id: Date.now() }]);
      setFormData({ name: '', element: 'fire', power: 50 });
    }
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 2: State of Complex Objects</h2>

        <div className='story-section'>
          <p className='story-paragraph'>
            Master Hooksworth led his apprentices deeper into the library, where ancient tomes floated 
            in mid-air, their pages turning by themselves. "Now we approach more complex magic," he 
            announced. "Managing state that contains objects and arrays requires special care."
          </p>

          <p className='story-paragraph'>
            A young apprentice named Aria raised her hand. "Master, I tried updating an object in state, 
            but my spell didn't trigger a re-render!" Master Hooksworth smiled knowingly. "Ah, you've 
            discovered the <strong>Immutability Principle</strong>. React's magic only responds to new 
            references, not mutations."
          </p>

          <div className='code-example'>
            <pre>{`// ❌ This won't trigger re-render:
const [user, setUser] = useState({ name: 'Aria', level: 1 });
user.name = 'Master Aria'; // Mutation!
setUser(user); // Same reference

// ✅ Create a new object:
setUser({ ...user, name: 'Master Aria' });
// Or use functional update:
setUser(prev => ({ ...prev, name: 'Master Aria' }));`}</pre>
          </div>

          <p className='story-paragraph'>
            "Remember," the master continued, "when dealing with nested structures, you must create new 
            objects at each level you modify. This is the foundation of predictable state updates."
          </p>
        </div>

        <div className='interactive-section'>
          <h3 className='section-title'>Complex Spell Constructor</h3>
          <p>Build complex spell objects and manage them with proper state patterns!</p>

          <div className='spell-workshop'>
            <div className='pattern-showcase'>
              <span className='pattern-badge'>Object State</span>
              <div style={{display: 'grid', gap: '15px'}}>
                <div>
                  <label>Spell Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter spell name..."
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '2px solid #6c5ce7',
                      marginTop: '5px'
                    }}
                  />
                </div>

                <div>
                  <label>Element Type:</label>
                  <select
                    value={formData.element}
                    onChange={(e) => handleInputChange('element', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '2px solid #6c5ce7',
                      marginTop: '5px'
                    }}
                  >
                    <option value="fire">🔥 Fire</option>
                    <option value="water">💧 Water</option>
                    <option value="earth">🌍 Earth</option>
                    <option value="air">💨 Air</option>
                  </select>
                </div>

                <div>
                  <label>Power Level: {formData.power}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.power}
                    onChange={(e) => handleInputChange('power', Number(e.target.value))}
                    style={{width: '100%', marginTop: '5px'}}
                  />
                </div>

                <div style={{display: 'flex', gap: '10px'}}>
                  <button className='spell-button' onClick={saveSpell} disabled={!formData.name}>
                    Save Spell
                  </button>
                  <button 
                    className='reset-button' 
                    onClick={() => setFormData({ name: '', element: 'fire', power: 50 })}
                  >
                    Clear Form
                  </button>
                </div>
              </div>
            </div>

            {savedSpells.length > 0 && (
              <div className='spell-book'>
                <h4>Saved Complex Spells:</h4>
                {savedSpells.map(spell => (
                  <div 
                    key={spell.id} 
                    className='spell-card'
                    onClick={() => setSelectedSpell(spell)}
                    style={{cursor: 'pointer'}}
                  >
                    <strong>{spell.name}</strong> - 
                    Element: {spell.element} | 
                    Power: {spell.power}
                  </div>
                ))}
                <button 
                  className='reset-button' 
                  onClick={() => {
                    setSavedSpells([]);
                    setSelectedSpell(null);
                  }}
                  style={{marginTop: '10px'}}
                >
                  Clear All Spells
                </button>
              </div>
            )}

            {selectedSpell && (
              <div className='spell-result'>
                <h4>Selected Spell Details:</h4>
                <pre>{JSON.stringify(selectedSpell, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        <div className='pattern-showcase'>
          <span className='pattern-badge'>Array Updates</span>
          <h4>Immutable Array Patterns</h4>
          <div className='code-example'>
            <pre>{`// Adding items:
setItems([...items, newItem]);

// Removing items:
setItems(items.filter(item => item.id !== targetId));

// Updating items:
setItems(items.map(item => 
  item.id === targetId 
    ? { ...item, ...updates } 
    : item
));`}</pre>
          </div>
        </div>

        <div className='lesson-insight'>
          <h3>The Complex State Lesson:</h3>
          <p>
            Managing complex state in React requires understanding immutability. Always create new 
            objects and arrays rather than modifying existing ones. This ensures React can detect 
            changes and update the UI accordingly. The spread operator (...) and array methods like 
            map, filter, and concat are your best friends when working with complex state structures.
          </p>
        </div>

        <div className='reflection-section'>
          <h3>Reflect on the Story</h3>
          <p>
            Why is immutability important when updating objects and arrays in React state?
          </p>
          <p>
            How does the spread operator help maintain immutability?
          </p>
          <p>
            What problems might arise from mutating state directly?
          </p>
        </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter2;