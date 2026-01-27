// Defines the sequence of lessons for each course
const lessonSequences = {
  'components-basics': [
    { id: 'component-kingdom', title: 'The Component Kingdom' },
    { id: 'props-messengers', title: 'The Props Messengers' },
    { id: 'jsx-magic', title: 'The JSX Magic Scrolls' },
    { id: 'lifecycle-chronicles', title: 'The Lifecycle Chronicles' }
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
  ],
  'advanced-patterns': [
    { id: 'compound-components', title: 'Compound Components' },
    { id: 'render-props', title: 'Render Props' },
    { id: 'higher-order-components', title: 'Higher-Order Components' },
    { id: 'portals-refs', title: 'Portals & Refs' }
  ],
  'react-ecosystem': [
    { id: 'state-management-libraries', title: 'State Management Libraries' },
    { id: 'styling-solutions', title: 'Styling Solutions' },
    { id: 'form-libraries', title: 'Form Libraries' },
    { id: 'animation-libraries', title: 'Animation Libraries' }
  ],
  'server-data': [
    { id: 'api-integration', title: 'API Integration' },
    { id: 'realtime-connections', title: 'Real-time Connections' },
    { id: 'caching-castle', title: 'Caching Castle' },
    { id: 'graphql-gateway', title: 'GraphQL Gateway' }
  ],
  'typescript-react': [
    { id: 'type-forge', title: 'Type Forge' },
    { id: 'component-armory', title: 'Component Armory' },
    { id: 'generic-forge', title: 'Generic Forge' },
    { id: 'type-guard-tower', title: 'Type Guard Tower' }
  ],
  'build-deploy': [
    { id: 'build-systems', title: 'Build Systems' },
    { id: 'ci-cd-pipeline', title: 'CI/CD Pipeline' },
    { id: 'hosting-horizons', title: 'Hosting Horizons' },
    { id: 'production-readiness', title: 'Production Readiness' }
  ],
  'react-native': [
    { id: 'mobile-foundations', title: 'Mobile Foundations' },
    { id: 'navigation-trails', title: 'Navigation Trails' },
    { id: 'native-powers', title: 'Native Powers' },
    { id: 'app-distribution', title: 'App Distribution' }
  ],
  'accessibility': [
    { id: 'inclusive-foundations', title: 'Inclusive Foundations' },
    { id: 'interaction-patterns', title: 'Interaction Patterns' },
    { id: 'visual-accessibility', title: 'Visual Accessibility' },
    { id: 'testing-tools', title: 'Testing & Tools' }
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