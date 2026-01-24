/**
 * ChapterSummary - A reusable component for the summary sections at the end of each chapter.
 * 
 * This component maintains consistent structure and styling for:
 * - Character Intros (optional) - New character introductions (typically only in chapter 1s)
 * - Lesson Insight (orange) - Main takeaway from the chapter
 * - Reflection Section (blue) - Questions to ponder
 * - Journal Entry (optional) - Character journal entries like "Aria's Journal"
 * - Chapter Ending (optional) - Transition narrative to the next chapter
 * 
 * @example
 * <ChapterSummary
 *   lessonInsight={{
 *     title: "The Component Lesson:",
 *     content: "In React, everything you see is a Component..."
 *   }}
 *   reflectionQuestions={[
 *     "How does thinking of components as workshops help you understand their purpose?",
 *     "Why is it useful to have many small, focused components?"
 *   ]}
 *   characterIntros={[
 *     {
 *       name: "Forge Master Hooke",
 *       description: "Chief architect of React's hook system. Her workshop produces the magical tools that give functional components powers once reserved only for class components."
 *     }
 *   ]}
 *   journalEntry={{
 *     title: "Aria's Journal - Day 1",
 *     content: "Finally made it to the React Kingdom!"
 *   }}
 *   chapterEnding={[
 *     "As the sun set over the Component Workshop District...",
 *     "Aria clutched the scroll, excited for her next adventure."
 *   ]}
 * />
 */

const ChapterSummary = ({
	lessonInsight,
	reflectionQuestions,
	characterIntros,
	journalEntry,
	chapterEnding,
}) => {
	return (
		<div className='chapter-summary'>
			{/* Character Intros - New character introductions (optional, typically chapter 1s) */}
			{characterIntros && characterIntros.length > 0 && (
				characterIntros.map((character, index) => (
					<div key={index} className='character-intro'>
						<h4>{character.name}</h4>
						{typeof character.description === 'string' ? (
							<p>{character.description}</p>
						) : (
							character.description
						)}
					</div>
				))
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
				<div className='character-intro'>
					<h4>{journalEntry.title}</h4>
					{typeof journalEntry.content === 'string' ? (
						<p>{journalEntry.content}</p>
					) : (
						journalEntry.content
					)}
				</div>
			)}

			{/* Chapter Ending - Transition to next chapter (optional) */}
			{chapterEnding && chapterEnding.length > 0 && (
				<div className='chapter-ending'>
					{chapterEnding.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
			)}
		</div>
	);
};

export default ChapterSummary;
