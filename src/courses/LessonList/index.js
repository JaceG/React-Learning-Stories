import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import ComponentKingdom from '../components-basics/pages/ComponentKingdom';
import ChapterOne from '../components-basics/pages/ComponentKingdom/chapter1/chapter1';
import ChapterTwo from '../components-basics/pages/ComponentKingdom/chapter2/chapter2';
import ChapterThree from '../components-basics/pages/ComponentKingdom/chapter3/chapter3';
import PropsMessengers from '../components-basics/pages/PropsMessengers';
import PMChapterOne from '../components-basics/pages/PropsMessengers/chapter1/chapter1';
import PMChapterTwo from '../components-basics/pages/PropsMessengers/chapter2/chapter2';
import PMChapterThree from '../components-basics/pages/PropsMessengers/chapter3/chapter3';
import JsxMagic from '../components-basics/pages/JsxMagic';
import JsxMagicChapterOne from '../components-basics/pages/JsxMagic/chapter1/chapter1';
import JsxMagicChapterTwo from '../components-basics/pages/JsxMagic/chapter2/chapter2';
import JsxMagicChapterThree from '../components-basics/pages/JsxMagic/chapter3/chapter3';
import ComponentLifecycle from '../components-basics/pages/ComponentLifecycle';
import ComponentLifecycleChapterOne from '../components-basics/pages/ComponentLifecycle/chapter1/chapter1';
import ComponentLifecycleChapterTwo from '../components-basics/pages/ComponentLifecycle/chapter2/chapter2';
import ComponentLifecycleChapterThree from '../components-basics/pages/ComponentLifecycle/chapter3/chapter3';
import StateSorcerers from '../state-management/pages/StateSorcerers';
import StateSorcerersChapterOne from '../state-management/pages/StateSorcerers/chapter1/chapter1';
import StateSorcerersChapterTwo from '../state-management/pages/StateSorcerers/chapter2/chapter2';
import StateSorcerersChapterThree from '../state-management/pages/StateSorcerers/chapter3/chapter3';
import MagicalHooks from '../state-management/pages/MagicalHooks';
import MagicalHooksChapterOne from '../state-management/pages/MagicalHooks/chapter1/chapter1';
import MagicalHooksChapterTwo from '../state-management/pages/MagicalHooks/chapter2/chapter2';
import MagicalHooksChapterThree from '../state-management/pages/MagicalHooks/chapter3/chapter3';
import GrandContext from '../state-management/pages/GrandContext';
import GrandContextChapterOne from '../state-management/pages/GrandContext/chapter1/chapter1';
import GrandContextChapterTwo from '../state-management/pages/GrandContext/chapter2/chapter2';
import GrandContextChapterThree from '../state-management/pages/GrandContext/chapter3/chapter3';
import StateManagementAdventures from '../state-management/pages/StateManagementAdventures';
import StateManagementAdventuresChapterOne from '../state-management/pages/StateManagementAdventures/chapter1/chapter1';
import StateManagementAdventuresChapterTwo from '../state-management/pages/StateManagementAdventures/chapter2/chapter2';
import StateManagementAdventuresChapterThree from '../state-management/pages/StateManagementAdventures/chapter3/chapter3';

const courseListMap = {
	'components-basics': {
		'component-kingdom': <ComponentKingdom />,
		'props-messengers': <PropsMessengers />,
		'jsx-magic': <JsxMagic />,
		'component-lifecycle': <ComponentLifecycle />,
	},
	'state-management': {
		'state-sorcerers': <StateSorcerers />,
		'magical-hooks': <MagicalHooks />,
		'grand-context': <GrandContext />,
		'state-management-adventures': <StateManagementAdventures />,
	},
};
const LessonList = () => {
	const { lessonId, courseId } = useParams();

	if (courseId === 'components-basics' && lessonId === 'component-kingdom') {
		return (
			<Routes>
				<Route path='/' element={<ComponentKingdom />}>
					<Route index element={<Navigate to='chapter1' replace />} />
					<Route path='chapter1' element={<ChapterOne />} />
					<Route path='chapter2' element={<ChapterTwo />} />
					<Route path='chapter3' element={<ChapterThree />} />
				</Route>
			</Routes>
		);
	}

	if (courseId === 'components-basics' && lessonId === 'props-messengers') {
		return (
			<Routes>
				<Route path='/' element={<PropsMessengers />}>
					<Route index element={<Navigate to='chapter1' replace />} />
					<Route path='chapter1' element={<PMChapterOne />} />
					<Route path='chapter2' element={<PMChapterTwo />} />
					<Route path='chapter3' element={<PMChapterThree />} />
				</Route>
			</Routes>
		);
	}

	if (courseId === 'components-basics' && lessonId === 'jsx-magic') {
		return (
			<Routes>
				<Route path='/' element={<JsxMagic />}>
					<Route index element={<Navigate to='chapter1' replace />} />
					<Route path='chapter1' element={<JsxMagicChapterOne />} />
					<Route path='chapter2' element={<JsxMagicChapterTwo />} />
					<Route path='chapter3' element={<JsxMagicChapterThree />} />
				</Route>
			</Routes>
		);
	}

	if (
		courseId === 'components-basics' &&
		lessonId === 'component-lifecycle'
	) {
		return (
			<Routes>
				<Route path='/' element={<ComponentLifecycle />}>
					<Route index element={<Navigate to='chapter1' replace />} />
					<Route
						path='chapter1'
						element={<ComponentLifecycleChapterOne />}
					/>
					<Route
						path='chapter2'
						element={<ComponentLifecycleChapterTwo />}
					/>
					<Route
						path='chapter3'
						element={<ComponentLifecycleChapterThree />}
					/>
				</Route>
			</Routes>
		);
	}

	if (courseId === 'state-management' && lessonId === 'grand-context') {
		return (
			<Routes>
				<Route path='/' element={<GrandContext />}>
					<Route index element={<Navigate to='chapter1' replace />} />
					<Route
						path='chapter1'
						element={<GrandContextChapterOne />}
					/>
					<Route
						path='chapter2'
						element={<GrandContextChapterTwo />}
					/>
					<Route
						path='chapter3'
						element={<GrandContextChapterThree />}
					/>
				</Route>
			</Routes>
		);
	}

	if (courseId === 'state-management' && lessonId === 'magical-hooks') {
		return (
			<Routes>
				<Route path='/' element={<MagicalHooks />}>
					<Route index element={<Navigate to='chapter1' replace />} />
					<Route
						path='chapter1'
						element={<MagicalHooksChapterOne />}
					/>
					<Route
						path='chapter2'
						element={<MagicalHooksChapterTwo />}
					/>
					<Route
						path='chapter3'
						element={<MagicalHooksChapterThree />}
					/>
				</Route>
			</Routes>
		);
	}

	if (
		courseId === 'state-management' &&
		lessonId === 'state-management-adventures'
	) {
		return (
			<Routes>
				<Route path='/' element={<StateManagementAdventures />}>
					<Route index element={<Navigate to='chapter1' replace />} />
					<Route
						path='chapter1'
						element={<StateManagementAdventuresChapterOne />}
					/>
					<Route
						path='chapter2'
						element={<StateManagementAdventuresChapterTwo />}
					/>
					<Route
						path='chapter3'
						element={<StateManagementAdventuresChapterThree />}
					/>
				</Route>
			</Routes>
		);
	}

	if (courseId === 'state-management' && lessonId === 'state-sorcerers') {
		return (
			<Routes>
				<Route path='/' element={<StateSorcerers />}>
					<Route index element={<Navigate to='chapter1' replace />} />
					<Route
						path='chapter1'
						element={<StateSorcerersChapterOne />}
					/>
					<Route
						path='chapter2'
						element={<StateSorcerersChapterTwo />}
					/>
					<Route
						path='chapter3'
						element={<StateSorcerersChapterThree />}
					/>
				</Route>
			</Routes>
		);
	}

	return <>{courseListMap[courseId][lessonId]}</>;
};

export default LessonList;
