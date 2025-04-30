import { useParams } from 'react-router-dom';
import ComponentKingdomChapterOne from '../components-basics/pages/ComponentKingdom/chapter1/chapter1';
import ComponentKingdomChapterTwo from '../components-basics/pages/ComponentKingdom/chapter2/chapter2';
import ComponentKingdomChapterThree from '../components-basics/pages/ComponentKingdom/chapter3/chapter3';
import PMChapterOne from '../components-basics/pages/PropsMessengers/chapter1/chapter1';
import PMChapterTwo from '../components-basics/pages/PropsMessengers/chapter2/chapter2';
import PMChapterThree from '../components-basics/pages/PropsMessengers/chapter3/chapter3';
import JsxMagicChapterOne from '../components-basics/pages/JsxMagic/chapter1/chapter1';
import JsxMagicChapterTwo from '../components-basics/pages/JsxMagic/chapter2/chapter2';
import JsxMagicChapterThree from '../components-basics/pages/JsxMagic/chapter3/chapter3';
import ComponentLifecycleChapterOne from '../components-basics/pages/ComponentLifecycle/chapter1/chapter1';
import ComponentLifecycleChapterTwo from '../components-basics/pages/ComponentLifecycle/chapter2/chapter2';
import ComponentLifecycleChapterThree from '../components-basics/pages/ComponentLifecycle/chapter3/chapter3';
import StateSorcerersChapterOne from '../state-management/pages/StateSorcerers/chapter1/chapter1';
import StateSorcerersChapterTwo from '../state-management/pages/StateSorcerers/chapter2/chapter2';
import StateSorcerersChapterThree from '../state-management/pages/StateSorcerers/chapter3/chapter3';
import MagicalHooksChapterOne from '../state-management/pages/MagicalHooks/chapter1/chapter1';
import MagicalHooksChapterTwo from '../state-management/pages/MagicalHooks/chapter2/chapter2';
import MagicalHooksChapterThree from '../state-management/pages/MagicalHooks/chapter3/chapter3';
import GrandContextChapterOne from '../state-management/pages/GrandContext/chapter1/chapter1';
import GrandContextChapterTwo from '../state-management/pages/GrandContext/chapter2/chapter2';
import GrandContextChapterThree from '../state-management/pages/GrandContext/chapter3/chapter3';
import StateManagementAdventuresChapterOne from '../state-management/pages/StateManagementAdventures/chapter1/chapter1';
import StateManagementAdventuresChapterTwo from '../state-management/pages/StateManagementAdventures/chapter2/chapter2';
import StateManagementAdventuresChapterThree from '../state-management/pages/StateManagementAdventures/chapter3/chapter3';

const courseListMap = {
	'components-basics': {
		'component-kingdom': {
			'/': <ComponentKingdomChapterOne />,
			chapter1: <ComponentKingdomChapterOne />,
			chapter2: <ComponentKingdomChapterTwo />,
			chapter3: <ComponentKingdomChapterThree />,
		},
		'props-messengers': {
			'/': <PMChapterOne />,
			chapter1: <PMChapterOne />,
			chapter2: <PMChapterTwo />,
			chapter3: <PMChapterThree />,
		},
		'jsx-magic': {
			'/': <JsxMagicChapterOne />,
			chapter1: <JsxMagicChapterOne />,
			chapter2: <JsxMagicChapterTwo />,
			chapter3: <JsxMagicChapterThree />,
		},
		'component-lifecycle': {
			'/': <ComponentLifecycleChapterOne />,
			chapter1: <ComponentLifecycleChapterOne />,
			chapter2: <ComponentLifecycleChapterTwo />,
			chapter3: <ComponentLifecycleChapterThree />,
		},
	},
	'state-management': {
		'state-sorcerers': {
			'/': <StateSorcerersChapterOne />,
			chapter1: <StateSorcerersChapterOne />,
			chapter2: <StateSorcerersChapterTwo />,
			chapter3: <StateSorcerersChapterThree />,
		},
		'magical-hooks': {
			'/': <MagicalHooksChapterOne />,
			chapter1: <MagicalHooksChapterOne />,
			chapter2: <MagicalHooksChapterTwo />,
			chapter3: <MagicalHooksChapterThree />,
		},
		'grand-context': {
			'/': <GrandContextChapterOne />,
			chapter1: <GrandContextChapterOne />,
			chapter2: <GrandContextChapterTwo />,
			chapter3: <GrandContextChapterThree />,
		},
		'state-management-adventures': {
			'/': <StateManagementAdventuresChapterOne />,
			chapter1: <StateManagementAdventuresChapterOne />,
			chapter2: <StateManagementAdventuresChapterTwo />,
			chapter3: <StateManagementAdventuresChapterThree />,
		},
	},
};
const ChapterInnerList = () => {
	const { lessonId, courseId, chapterId } = useParams();

	return <>{courseListMap[courseId][lessonId][chapterId]}</>;
};

export default ChapterInnerList;
