// Defines the sequence of lessons for each course
const lessonSequences = {
  'components-basics': [
    { id: 'component-kingdom', title: 'The Component Kingdom' },
    { id: 'props-messengers', title: 'The Props Messengers' },
    { id: 'jsx-magic', title: 'The JSX Magic Scrolls' },
    { id: 'component-lifecycle', title: 'The Lifecycle Chronicles' }
  ],
  'state-management': [
    { id: 'state-sorcerers', title: 'The State Sorcerers' },
    { id: 'magical-hooks', title: 'The Magical Hooks' },
    { id: 'grand-context', title: 'The Grand Context' },
    { id: 'state-management-adventures', title: 'State Management Adventures' }
  ],
  'props-data-flow': [
    { id: 'props-caravans', title: 'The Props Caravans' },
    { id: 'data-rivers', title: 'The Data Rivers' },
    { id: 'prop-forge', title: 'The Prop Forge' },
    { id: 'event-echoes', title: 'The Event Echoes' }
  ],
  'hooks-in-action': [
    { id: 'use-state-spells', title: 'The useState Spells' },
    { id: 'use-effect-enchantments', title: 'The useEffect Enchantments' },
    { id: 'custom-hook-crafting', title: 'Custom Hook Crafting' },
    { id: 'hook-pattern-mastery', title: 'Hook Pattern Mastery' }
  ],
  'forms-events': [
    { id: 'form-alchemy', title: 'Form Alchemy' },
    { id: 'event-symphony', title: 'Event Symphony' },
    { id: 'validation-guardians', title: 'Validation Guardians' },
    { id: 'submission-portals', title: 'Submission Portals' }
  ],
  'routing-navigation': [
    { id: 'navigation-compass', title: 'The Navigation Compass' },
    { id: 'guardian-gates', title: 'Guardian Gates' },
    { id: 'waypoint-wizardry', title: 'Waypoint Wizardry' },
    { id: 'portal-passages', title: 'Portal Passages' }
  ],
  'performance-optimization': [
    { id: 'speed-sanctum', title: 'The Speed Sanctum' },
    { id: 'memory-monastery', title: 'Memory Monastery' },
    { id: 'lazy-library', title: 'The Lazy Library' },
    { id: 'virtualization-vault', title: 'Virtualization Vault' }
  ],
  'testing-debugging': [
    { id: 'testing-tower', title: 'The Testing Tower' },
    { id: 'debug-dungeon', title: 'Debug Dungeon' },
    { id: 'integration-inn', title: 'Integration Inn' },
    { id: 'error-enchantments', title: 'Error Enchantments' }
  ]
};

// Helper function to get next and previous lessons
export const getAdjacentLessons = (courseId, lessonId) => {
  const courseLessons = lessonSequences[courseId] || [];
  const currentIndex = courseLessons.findIndex(lesson => lesson.id === lessonId);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    prev: currentIndex > 0 ? courseLessons[currentIndex - 1] : null,
    next: currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null
  };
};

export default lessonSequences;