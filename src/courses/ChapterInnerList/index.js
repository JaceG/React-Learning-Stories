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
import PropsCaravansChapterOne from '../props-data-flow/pages/PropsCaravans/chapter1/chapter1';
import PropsCaravansChapterTwo from '../props-data-flow/pages/PropsCaravans/chapter2/chapter2';
import PropsCaravansChapterThree from '../props-data-flow/pages/PropsCaravans/chapter3/chapter3';
import DataRiversChapterOne from '../props-data-flow/pages/DataRivers/chapter1/chapter1';
import DataRiversChapterTwo from '../props-data-flow/pages/DataRivers/chapter2/chapter2';
import DataRiversChapterThree from '../props-data-flow/pages/DataRivers/chapter3/chapter3';
import PropForgeChapterOne from '../props-data-flow/pages/PropForge/chapter1/chapter1';
import PropForgeChapterTwo from '../props-data-flow/pages/PropForge/chapter2/chapter2';
import PropForgeChapterThree from '../props-data-flow/pages/PropForge/chapter3/chapter3';
import EventEchoesChapterOne from '../props-data-flow/pages/EventEchoes/chapter1/chapter1';
import EventEchoesChapterTwo from '../props-data-flow/pages/EventEchoes/chapter2/chapter2';
import EventEchoesChapterThree from '../props-data-flow/pages/EventEchoes/chapter3/chapter3';
import UseStateSpellsChapterOne from '../hooks-in-action/pages/UseStateSpells/chapter1/chapter1';
import UseStateSpellsChapterTwo from '../hooks-in-action/pages/UseStateSpells/chapter2/chapter2';
import UseStateSpellsChapterThree from '../hooks-in-action/pages/UseStateSpells/chapter3/chapter3';
import UseEffectEnchantmentsChapterOne from '../hooks-in-action/pages/UseEffectEnchantments/chapter1/chapter1';
import UseEffectEnchantmentsChapterTwo from '../hooks-in-action/pages/UseEffectEnchantments/chapter2/chapter2';
import UseEffectEnchantmentsChapterThree from '../hooks-in-action/pages/UseEffectEnchantments/chapter3/chapter3';
import CustomHookCraftingChapterOne from '../hooks-in-action/pages/CustomHookCrafting/chapter1/chapter1';
import CustomHookCraftingChapterTwo from '../hooks-in-action/pages/CustomHookCrafting/chapter2/chapter2';
import CustomHookCraftingChapterThree from '../hooks-in-action/pages/CustomHookCrafting/chapter3/chapter3';
import HookPatternMasteryChapterOne from '../hooks-in-action/pages/HookPatternMastery/chapter1/chapter1';
import HookPatternMasteryChapterTwo from '../hooks-in-action/pages/HookPatternMastery/chapter2/chapter2';
import HookPatternMasteryChapterThree from '../hooks-in-action/pages/HookPatternMastery/chapter3/chapter3';
import FormAlchemyChapterOne from '../forms-events/pages/FormAlchemy/chapter1/chapter1';
import FormAlchemyChapterTwo from '../forms-events/pages/FormAlchemy/chapter2/chapter2';
import FormAlchemyChapterThree from '../forms-events/pages/FormAlchemy/chapter3/chapter3';
import EventSymphonyChapterOne from '../forms-events/pages/EventSymphony/chapter1/chapter1';
import EventSymphonyChapterTwo from '../forms-events/pages/EventSymphony/chapter2/chapter2';
import EventSymphonyChapterThree from '../forms-events/pages/EventSymphony/chapter3/chapter3';
import ValidationGuardiansChapterOne from '../forms-events/pages/ValidationGuardians/chapter1/chapter1';
import ValidationGuardiansChapterTwo from '../forms-events/pages/ValidationGuardians/chapter2/chapter2';
import ValidationGuardiansChapterThree from '../forms-events/pages/ValidationGuardians/chapter3/chapter3';
import SubmissionPortalsChapterOne from '../forms-events/pages/SubmissionPortals/chapter1/chapter1';
import SubmissionPortalsChapterTwo from '../forms-events/pages/SubmissionPortals/chapter2/chapter2';
import SubmissionPortalsChapterThree from '../forms-events/pages/SubmissionPortals/chapter3/chapter3';
import NavigationCompassChapterOne from '../routing-navigation/pages/NavigationCompass/chapter1/chapter1';
import NavigationCompassChapterTwo from '../routing-navigation/pages/NavigationCompass/chapter2/chapter2';
import NavigationCompassChapterThree from '../routing-navigation/pages/NavigationCompass/chapter3/chapter3';
import GuardianGatesChapterOne from '../routing-navigation/pages/GuardianGates/chapter1/chapter1';
import GuardianGatesChapterTwo from '../routing-navigation/pages/GuardianGates/chapter2/chapter2';
import GuardianGatesChapterThree from '../routing-navigation/pages/GuardianGates/chapter3/chapter3';
import WaypointWizardryChapterOne from '../routing-navigation/pages/WaypointWizardry/chapter1/chapter1';
import WaypointWizardryChapterTwo from '../routing-navigation/pages/WaypointWizardry/chapter2/chapter2';
import WaypointWizardryChapterThree from '../routing-navigation/pages/WaypointWizardry/chapter3/chapter3';
import PortalPassagesChapterOne from '../routing-navigation/pages/PortalPassages/chapter1/chapter1';
import PortalPassagesChapterTwo from '../routing-navigation/pages/PortalPassages/chapter2/chapter2';
import PortalPassagesChapterThree from '../routing-navigation/pages/PortalPassages/chapter3/chapter3';

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
	'props-data-flow': {
		'props-caravans': {
			'/': <PropsCaravansChapterOne />,
			chapter1: <PropsCaravansChapterOne />,
			chapter2: <PropsCaravansChapterTwo />,
			chapter3: <PropsCaravansChapterThree />,
		},
		'data-rivers': {
			'/': <DataRiversChapterOne />,
			chapter1: <DataRiversChapterOne />,
			chapter2: <DataRiversChapterTwo />,
			chapter3: <DataRiversChapterThree />,
		},
		'prop-forge': {
			'/': <PropForgeChapterOne />,
			chapter1: <PropForgeChapterOne />,
			chapter2: <PropForgeChapterTwo />,
			chapter3: <PropForgeChapterThree />,
		},
		'event-echoes': {
			'/': <EventEchoesChapterOne />,
			chapter1: <EventEchoesChapterOne />,
			chapter2: <EventEchoesChapterTwo />,
			chapter3: <EventEchoesChapterThree />,
		},
	},
	'hooks-in-action': {
		'use-state-spells': {
			'/': <UseStateSpellsChapterOne />,
			chapter1: <UseStateSpellsChapterOne />,
			chapter2: <UseStateSpellsChapterTwo />,
			chapter3: <UseStateSpellsChapterThree />,
		},
		'use-effect-enchantments': {
			'/': <UseEffectEnchantmentsChapterOne />,
			chapter1: <UseEffectEnchantmentsChapterOne />,
			chapter2: <UseEffectEnchantmentsChapterTwo />,
			chapter3: <UseEffectEnchantmentsChapterThree />,
		},
		'custom-hook-crafting': {
			'/': <CustomHookCraftingChapterOne />,
			chapter1: <CustomHookCraftingChapterOne />,
			chapter2: <CustomHookCraftingChapterTwo />,
			chapter3: <CustomHookCraftingChapterThree />,
		},
		'hook-pattern-mastery': {
			'/': <HookPatternMasteryChapterOne />,
			chapter1: <HookPatternMasteryChapterOne />,
			chapter2: <HookPatternMasteryChapterTwo />,
			chapter3: <HookPatternMasteryChapterThree />,
		},
	},
	'forms-events': {
		'form-alchemy': {
			'/': <FormAlchemyChapterOne />,
			chapter1: <FormAlchemyChapterOne />,
			chapter2: <FormAlchemyChapterTwo />,
			chapter3: <FormAlchemyChapterThree />,
		},
		'event-symphony': {
			'/': <EventSymphonyChapterOne />,
			chapter1: <EventSymphonyChapterOne />,
			chapter2: <EventSymphonyChapterTwo />,
			chapter3: <EventSymphonyChapterThree />,
		},
		'validation-guardians': {
			'/': <ValidationGuardiansChapterOne />,
			chapter1: <ValidationGuardiansChapterOne />,
			chapter2: <ValidationGuardiansChapterTwo />,
			chapter3: <ValidationGuardiansChapterThree />,
		},
		'submission-portals': {
			'/': <SubmissionPortalsChapterOne />,
			chapter1: <SubmissionPortalsChapterOne />,
			chapter2: <SubmissionPortalsChapterTwo />,
			chapter3: <SubmissionPortalsChapterThree />,
		},
	},
	'routing-navigation': {
		'navigation-compass': {
			'/': <NavigationCompassChapterOne />,
			chapter1: <NavigationCompassChapterOne />,
			chapter2: <NavigationCompassChapterTwo />,
			chapter3: <NavigationCompassChapterThree />,
		},
		'guardian-gates': {
			'/': <GuardianGatesChapterOne />,
			chapter1: <GuardianGatesChapterOne />,
			chapter2: <GuardianGatesChapterTwo />,
			chapter3: <GuardianGatesChapterThree />,
		},
		'waypoint-wizardry': {
			'/': <WaypointWizardryChapterOne />,
			chapter1: <WaypointWizardryChapterOne />,
			chapter2: <WaypointWizardryChapterTwo />,
			chapter3: <WaypointWizardryChapterThree />,
		},
		'portal-passages': {
			'/': <PortalPassagesChapterOne />,
			chapter1: <PortalPassagesChapterOne />,
			chapter2: <PortalPassagesChapterTwo />,
			chapter3: <PortalPassagesChapterThree />,
		},
	},
};
const ChapterInnerList = () => {
	const { lessonId, courseId, chapterId } = useParams();

	if (!courseListMap[courseId] || !courseListMap[courseId][lessonId]) {
		return <div>Course or lesson not found - Course: {courseId}, Lesson: {lessonId}</div>;
	}

	const chapterKey = chapterId || 'chapter1';
	const chapter = courseListMap[courseId][lessonId][chapterKey];
	
	if (!chapter) {
		return <div>Chapter not found - Chapter: {chapterKey}</div>;
	}

	return <>{chapter}</>;
};

export default ChapterInnerList;
