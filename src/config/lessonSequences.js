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
    { id: 'prop-workbench', title: 'The Prop Workbench' },
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
    { id: 'pattern-evolution', title: 'Pattern Evolution' },
    { id: 'advanced-composition', title: 'Advanced Composition' },
    { id: 'refs-and-dom', title: 'Refs & DOM' }
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
    { id: 'type-scriptorium', title: 'Type Scriptorium' },
    { id: 'component-archives', title: 'Component Archives' },
    { id: 'pattern-alcove', title: 'Pattern Alcove' },
    { id: 'type-safe-architecture', title: 'Type-Safe Architecture' }
  ],
  'build-deploy': [
    { id: 'build-systems', title: 'Build Systems' },
    { id: 'cicd-pipelines', title: 'CI/CD Pipelines' },
    { id: 'hosting-and-deployment', title: 'Hosting & Deployment' },
    { id: 'production-readiness', title: 'Production Readiness' }
  ],
  'full-stack-react': [
    { id: 'framework-foundations', title: 'Framework Foundations' },
    { id: 'rendering-strategies', title: 'Rendering Strategies' },
    { id: 'server-components', title: 'Server Components' },
    { id: 'full-stack-patterns', title: 'Full-Stack Patterns' }
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