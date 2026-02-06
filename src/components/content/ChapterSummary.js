/**
 * ChapterSummary - A reusable component for the summary sections at the end of each chapter.
 *
 * This component maintains consistent structure and styling for:
 * - Character Intros (optional) - New characters introduced in this chapter (chapter 1 only)
 * - Lesson Insight (orange) - Main takeaway from the chapter
 * - Reflection Section (blue) - Questions to ponder
 * - Journal Entry (optional) - Character journal entries like "Aria's Journal"
 * - Lesson Ending (optional) - Transition narrative to the next lesson
 *
 * @example
 * <ChapterSummary
 *   characterIntros={[
 *     { name: "Master Velocity", description: "Guardian of the Speed Sanctum..." }
 *   ]}
 *   lessonInsight={{
 *     title: "The Component Lesson:",
 *     content: "In React, everything you see is a Component..."
 *   }}
 *   reflectionQuestions={[
 *     "How does thinking of components as workshops help you understand their purpose?",
 *     "Why is it useful to have many small, focused components?"
 *   ]}
 *   journalEntry={{
 *     title: "Aria's Journal - Day 1",
 *     content: "Finally made it to the React Kingdom!"
 *   }}
 *   lessonEnding={[
 *     "As the sun set over the Component Workshop District...",
 *     "Aria clutched the scroll, excited for her next adventure."
 *   ]}
 * />
 */

const ChapterSummary = ({
	characterIntros,
	lessonInsight,
	reflectionQuestions,
	journalEntry,
	lessonEnding,
}) => {
	return (
		<div className='chapter-summary'>
			{/* Character Introductions - For chapter 1s (optional) */}
			{characterIntros && characterIntros.length > 0 && (
				<div className='character-intros'>
					{characterIntros.map((character, index) => (
						<div key={index} className='character-intro'>
							<h4>{character.name}</h4>
							{typeof character.description === 'string' ? (
								<p>{character.description}</p>
							) : (
								character.description
							)}
						</div>
					))}
				</div>
			)}

			{/* Lesson Insight - Orange section */}
			{lessonInsight && (
				<div className='lesson-insight'>
					<h3>{lessonInsight.title}</h3>
					{typeof lessonInsight.content === 'string' ? (
						<p>{lessonInsight.content}</p>
					) : (
						lessonInsight.content
					)}
				</div>
			)}

			{/* Reflection Section - Blue section */}
			{reflectionQuestions && reflectionQuestions.length > 0 && (
				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					{reflectionQuestions.map((question, index) => (
						<p key={index}>{question}</p>
					))}
				</div>
			)}

			{/* Journal Entry - Aria's journal (optional) */}
			{journalEntry && (
				<div className='journal-entry'>
					<h4>{journalEntry.title}</h4>
					{typeof journalEntry.content === 'string' ? (
						<p>{journalEntry.content}</p>
					) : (
						journalEntry.content
					)}
				</div>
			)}

			{/* Lesson Ending - Transition to next lesson (optional) */}
			{lessonEnding && lessonEnding.length > 0 && (
				<div className='lesson-ending'>
					{lessonEnding.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
			)}
		</div>
	);
};

export default ChapterSummary;
