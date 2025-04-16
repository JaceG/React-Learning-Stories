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