import { useParams } from 'react-router-dom';
import ComponentKingdomChapterOne from '../../../learning-paths/components-basics/pages/ComponentKingdom/chapter1/chapter1';
import ComponentKingdomChapterTwo from '../../../learning-paths/components-basics/pages/ComponentKingdom/chapter2/chapter2';
import ComponentKingdomChapterThree from '../../../learning-paths/components-basics/pages/ComponentKingdom/chapter3/chapter3';
import PMChapterOne from '../../../learning-paths/components-basics/pages/PropsMessengers/chapter1/chapter1';
import PMChapterTwo from '../../../learning-paths/components-basics/pages/PropsMessengers/chapter2/chapter2';
import PMChapterThree from '../../../learning-paths/components-basics/pages/PropsMessengers/chapter3/chapter3';
import JsxMagicChapterOne from '../../../learning-paths/components-basics/pages/JsxMagic/chapter1/chapter1';
import JsxMagicChapterTwo from '../../../learning-paths/components-basics/pages/JsxMagic/chapter2/chapter2';
import JsxMagicChapterThree from '../../../learning-paths/components-basics/pages/JsxMagic/chapter3/chapter3';
import ComponentLifecycleChapterOne from '../../../learning-paths/components-basics/pages/ComponentLifecycle/chapter1/chapter1';
import ComponentLifecycleChapterTwo from '../../../learning-paths/components-basics/pages/ComponentLifecycle/chapter2/chapter2';
import ComponentLifecycleChapterThree from '../../../learning-paths/components-basics/pages/ComponentLifecycle/chapter3/chapter3';
import StateSorcerersChapterOne from '../../../learning-paths/state-management/pages/StateSorcerers/chapter1/chapter1';
import StateSorcerersChapterTwo from '../../../learning-paths/state-management/pages/StateSorcerers/chapter2/chapter2';
import StateSorcerersChapterThree from '../../../learning-paths/state-management/pages/StateSorcerers/chapter3/chapter3';
import MagicalHooksChapterOne from '../../../learning-paths/state-management/pages/MagicalHooks/chapter1/chapter1';
import MagicalHooksChapterTwo from '../../../learning-paths/state-management/pages/MagicalHooks/chapter2/chapter2';
import MagicalHooksChapterThree from '../../../learning-paths/state-management/pages/MagicalHooks/chapter3/chapter3';
import GrandContextChapterOne from '../../../learning-paths/state-management/pages/GrandContext/chapter1/chapter1';
import GrandContextChapterTwo from '../../../learning-paths/state-management/pages/GrandContext/chapter2/chapter2';
import GrandContextChapterThree from '../../../learning-paths/state-management/pages/GrandContext/chapter3/chapter3';
import StateManagementAdventuresChapterOne from '../../../learning-paths/state-management/pages/StateManagementAdventures/chapter1/chapter1';
import StateManagementAdventuresChapterTwo from '../../../learning-paths/state-management/pages/StateManagementAdventures/chapter2/chapter2';
import StateManagementAdventuresChapterThree from '../../../learning-paths/state-management/pages/StateManagementAdventures/chapter3/chapter3';
import PropsCaravansChapterOne from '../../../learning-paths/props-data-flow/pages/PropsCaravans/chapter1/chapter1';
import PropsCaravansChapterTwo from '../../../learning-paths/props-data-flow/pages/PropsCaravans/chapter2/chapter2';
import PropsCaravansChapterThree from '../../../learning-paths/props-data-flow/pages/PropsCaravans/chapter3/chapter3';
import DataRiversChapterOne from '../../../learning-paths/props-data-flow/pages/DataRivers/chapter1/chapter1';
import DataRiversChapterTwo from '../../../learning-paths/props-data-flow/pages/DataRivers/chapter2/chapter2';
import DataRiversChapterThree from '../../../learning-paths/props-data-flow/pages/DataRivers/chapter3/chapter3';
import PropForgeChapterOne from '../../../learning-paths/props-data-flow/pages/PropForge/chapter1/chapter1';
import PropForgeChapterTwo from '../../../learning-paths/props-data-flow/pages/PropForge/chapter2/chapter2';
import PropForgeChapterThree from '../../../learning-paths/props-data-flow/pages/PropForge/chapter3/chapter3';
import EventEchoesChapterOne from '../../../learning-paths/props-data-flow/pages/EventEchoes/chapter1/chapter1';
import EventEchoesChapterTwo from '../../../learning-paths/props-data-flow/pages/EventEchoes/chapter2/chapter2';
import EventEchoesChapterThree from '../../../learning-paths/props-data-flow/pages/EventEchoes/chapter3/chapter3';
import UseStateSpellsChapterOne from '../../../learning-paths/hooks-in-action/pages/UseStateSpells/chapter1/chapter1';
import UseStateSpellsChapterTwo from '../../../learning-paths/hooks-in-action/pages/UseStateSpells/chapter2/chapter2';
import UseStateSpellsChapterThree from '../../../learning-paths/hooks-in-action/pages/UseStateSpells/chapter3/chapter3';
import UseEffectEnchantmentsChapterOne from '../../../learning-paths/hooks-in-action/pages/UseEffectEnchantments/chapter1/chapter1';
import UseEffectEnchantmentsChapterTwo from '../../../learning-paths/hooks-in-action/pages/UseEffectEnchantments/chapter2/chapter2';
import UseEffectEnchantmentsChapterThree from '../../../learning-paths/hooks-in-action/pages/UseEffectEnchantments/chapter3/chapter3';
import CustomHookCraftingChapterOne from '../../../learning-paths/hooks-in-action/pages/CustomHookCrafting/chapter1/chapter1';
import CustomHookCraftingChapterTwo from '../../../learning-paths/hooks-in-action/pages/CustomHookCrafting/chapter2/chapter2';
import CustomHookCraftingChapterThree from '../../../learning-paths/hooks-in-action/pages/CustomHookCrafting/chapter3/chapter3';
import HookPatternMasteryChapterOne from '../../../learning-paths/hooks-in-action/pages/HookPatternMastery/chapter1/chapter1';
import HookPatternMasteryChapterTwo from '../../../learning-paths/hooks-in-action/pages/HookPatternMastery/chapter2/chapter2';
import HookPatternMasteryChapterThree from '../../../learning-paths/hooks-in-action/pages/HookPatternMastery/chapter3/chapter3';
import FormAlchemyChapterOne from '../../../learning-paths/forms-events/pages/FormAlchemy/chapter1/chapter1';
import FormAlchemyChapterTwo from '../../../learning-paths/forms-events/pages/FormAlchemy/chapter2/chapter2';
import FormAlchemyChapterThree from '../../../learning-paths/forms-events/pages/FormAlchemy/chapter3/chapter3';
import EventSymphonyChapterOne from '../../../learning-paths/forms-events/pages/EventSymphony/chapter1/chapter1';
import EventSymphonyChapterTwo from '../../../learning-paths/forms-events/pages/EventSymphony/chapter2/chapter2';
import EventSymphonyChapterThree from '../../../learning-paths/forms-events/pages/EventSymphony/chapter3/chapter3';
import ValidationGuardiansChapterOne from '../../../learning-paths/forms-events/pages/ValidationGuardians/chapter1/chapter1';
import ValidationGuardiansChapterTwo from '../../../learning-paths/forms-events/pages/ValidationGuardians/chapter2/chapter2';
import ValidationGuardiansChapterThree from '../../../learning-paths/forms-events/pages/ValidationGuardians/chapter3/chapter3';
import SubmissionPortalsChapterOne from '../../../learning-paths/forms-events/pages/SubmissionPortals/chapter1/chapter1';
import SubmissionPortalsChapterTwo from '../../../learning-paths/forms-events/pages/SubmissionPortals/chapter2/chapter2';
import SubmissionPortalsChapterThree from '../../../learning-paths/forms-events/pages/SubmissionPortals/chapter3/chapter3';
import NavigationCompassChapterOne from '../../../learning-paths/routing-navigation/pages/NavigationCompass/chapter1/chapter1';
import NavigationCompassChapterTwo from '../../../learning-paths/routing-navigation/pages/NavigationCompass/chapter2/chapter2';
import NavigationCompassChapterThree from '../../../learning-paths/routing-navigation/pages/NavigationCompass/chapter3/chapter3';
import GuardianGatesChapterOne from '../../../learning-paths/routing-navigation/pages/GuardianGates/chapter1/chapter1';
import GuardianGatesChapterTwo from '../../../learning-paths/routing-navigation/pages/GuardianGates/chapter2/chapter2';
import GuardianGatesChapterThree from '../../../learning-paths/routing-navigation/pages/GuardianGates/chapter3/chapter3';
import WaypointWizardryChapterOne from '../../../learning-paths/routing-navigation/pages/WaypointWizardry/chapter1/chapter1';
import WaypointWizardryChapterTwo from '../../../learning-paths/routing-navigation/pages/WaypointWizardry/chapter2/chapter2';
import WaypointWizardryChapterThree from '../../../learning-paths/routing-navigation/pages/WaypointWizardry/chapter3/chapter3';
import PortalPassagesChapterOne from '../../../learning-paths/routing-navigation/pages/PortalPassages/chapter1/chapter1';
import PortalPassagesChapterTwo from '../../../learning-paths/routing-navigation/pages/PortalPassages/chapter2/chapter2';
import PortalPassagesChapterThree from '../../../learning-paths/routing-navigation/pages/PortalPassages/chapter3/chapter3';
import SpeedSanctumChapterOne from '../../../learning-paths/performance-optimization/pages/SpeedSanctum/chapter1/chapter1';
import SpeedSanctumChapterTwo from '../../../learning-paths/performance-optimization/pages/SpeedSanctum/chapter2/chapter2';
import SpeedSanctumChapterThree from '../../../learning-paths/performance-optimization/pages/SpeedSanctum/chapter3/chapter3';
import MemoryMonasteryChapterOne from '../../../learning-paths/performance-optimization/pages/MemoryMonastery/chapter1/chapter1';
import MemoryMonasteryChapterTwo from '../../../learning-paths/performance-optimization/pages/MemoryMonastery/chapter2/chapter2';
import MemoryMonasteryChapterThree from '../../../learning-paths/performance-optimization/pages/MemoryMonastery/chapter3/chapter3';
import LazyLibraryChapterOne from '../../../learning-paths/performance-optimization/pages/LazyLibrary/chapter1/chapter1';
import LazyLibraryChapterTwo from '../../../learning-paths/performance-optimization/pages/LazyLibrary/chapter2/chapter2';
import LazyLibraryChapterThree from '../../../learning-paths/performance-optimization/pages/LazyLibrary/chapter3/chapter3';
import VirtualizationVaultChapterOne from '../../../learning-paths/performance-optimization/pages/VirtualizationVault/chapter1/chapter1';
import VirtualizationVaultChapterTwo from '../../../learning-paths/performance-optimization/pages/VirtualizationVault/chapter2/chapter2';
import VirtualizationVaultChapterThree from '../../../learning-paths/performance-optimization/pages/VirtualizationVault/chapter3/chapter3';
import TestingTowerChapterOne from '../../../learning-paths/testing-debugging/pages/TestingTower/chapter1/chapter1';
import TestingTowerChapterTwo from '../../../learning-paths/testing-debugging/pages/TestingTower/chapter2/chapter2';
import TestingTowerChapterThree from '../../../learning-paths/testing-debugging/pages/TestingTower/chapter3/chapter3';
import DebugDungeonChapterOne from '../../../learning-paths/testing-debugging/pages/DebugDungeon/chapter1/chapter1';
import DebugDungeonChapterTwo from '../../../learning-paths/testing-debugging/pages/DebugDungeon/chapter2/chapter2';
import DebugDungeonChapterThree from '../../../learning-paths/testing-debugging/pages/DebugDungeon/chapter3/chapter3';
import IntegrationInnChapterOne from '../../../learning-paths/testing-debugging/pages/IntegrationInn/chapter1/chapter1';
import IntegrationInnChapterTwo from '../../../learning-paths/testing-debugging/pages/IntegrationInn/chapter2/chapter2';
import IntegrationInnChapterThree from '../../../learning-paths/testing-debugging/pages/IntegrationInn/chapter3/chapter3';
import ErrorEnchantmentsChapterOne from '../../../learning-paths/testing-debugging/pages/ErrorEnchantments/chapter1/chapter1';
import ErrorEnchantmentsChapterTwo from '../../../learning-paths/testing-debugging/pages/ErrorEnchantments/chapter2/chapter2';
import ErrorEnchantmentsChapterThree from '../../../learning-paths/testing-debugging/pages/ErrorEnchantments/chapter3/chapter3';
import CompoundComponentsChapterOne from '../../../learning-paths/advanced-patterns/pages/CompoundComponents/chapter1/chapter1';
import CompoundComponentsChapterTwo from '../../../learning-paths/advanced-patterns/pages/CompoundComponents/chapter2/chapter2';
import CompoundComponentsChapterThree from '../../../learning-paths/advanced-patterns/pages/CompoundComponents/chapter3/chapter3';
import RenderPropsChapterOne from '../../../learning-paths/advanced-patterns/pages/RenderProps/chapter1/chapter1';
import RenderPropsChapterTwo from '../../../learning-paths/advanced-patterns/pages/RenderProps/chapter2/chapter2';
import RenderPropsChapterThree from '../../../learning-paths/advanced-patterns/pages/RenderProps/chapter3/chapter3';
import HigherOrderComponentsChapterOne from '../../../learning-paths/advanced-patterns/pages/HigherOrderComponents/chapter1/chapter1';
import HigherOrderComponentsChapterTwo from '../../../learning-paths/advanced-patterns/pages/HigherOrderComponents/chapter2/chapter2';
import HigherOrderComponentsChapterThree from '../../../learning-paths/advanced-patterns/pages/HigherOrderComponents/chapter3/chapter3';
import PortalsRefsChapterOne from '../../../learning-paths/advanced-patterns/pages/PortalsRefs/chapter1/chapter1';
import PortalsRefsChapterTwo from '../../../learning-paths/advanced-patterns/pages/PortalsRefs/chapter2/chapter2';
import PortalsRefsChapterThree from '../../../learning-paths/advanced-patterns/pages/PortalsRefs/chapter3/chapter3';
import StateManagementLibrariesChapterOne from '../../../learning-paths/react-ecosystem/pages/StateManagementLibraries/chapter1/chapter1';
import StateManagementLibrariesChapterTwo from '../../../learning-paths/react-ecosystem/pages/StateManagementLibraries/chapter2/chapter2';
import StateManagementLibrariesChapterThree from '../../../learning-paths/react-ecosystem/pages/StateManagementLibraries/chapter3/chapter3';
import StylingSolutionsChapterOne from '../../../learning-paths/react-ecosystem/pages/StylingSolutions/chapter1/chapter1';
import StylingSolutionsChapterTwo from '../../../learning-paths/react-ecosystem/pages/StylingSolutions/chapter2/chapter2';
import StylingSolutionsChapterThree from '../../../learning-paths/react-ecosystem/pages/StylingSolutions/chapter3/chapter3';
import FormLibrariesChapterOne from '../../../learning-paths/react-ecosystem/pages/FormLibraries/chapter1/chapter1';
import FormLibrariesChapterTwo from '../../../learning-paths/react-ecosystem/pages/FormLibraries/chapter2/chapter2';
import FormLibrariesChapterThree from '../../../learning-paths/react-ecosystem/pages/FormLibraries/chapter3/chapter3';
import AnimationLibrariesChapterOne from '../../../learning-paths/react-ecosystem/pages/AnimationLibraries/chapter1/chapter1';
import AnimationLibrariesChapterTwo from '../../../learning-paths/react-ecosystem/pages/AnimationLibraries/chapter2/chapter2';
import AnimationLibrariesChapterThree from '../../../learning-paths/react-ecosystem/pages/AnimationLibraries/chapter3/chapter3';

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
	'performance-optimization': {
		'speed-sanctum': {
			'/': <SpeedSanctumChapterOne />,
			chapter1: <SpeedSanctumChapterOne />,
			chapter2: <SpeedSanctumChapterTwo />,
			chapter3: <SpeedSanctumChapterThree />,
		},
		'memory-monastery': {
			'/': <MemoryMonasteryChapterOne />,
			chapter1: <MemoryMonasteryChapterOne />,
			chapter2: <MemoryMonasteryChapterTwo />,
			chapter3: <MemoryMonasteryChapterThree />,
		},
		'lazy-library': {
			'/': <LazyLibraryChapterOne />,
			chapter1: <LazyLibraryChapterOne />,
			chapter2: <LazyLibraryChapterTwo />,
			chapter3: <LazyLibraryChapterThree />,
		},
		'virtualization-vault': {
			'/': <VirtualizationVaultChapterOne />,
			chapter1: <VirtualizationVaultChapterOne />,
			chapter2: <VirtualizationVaultChapterTwo />,
			chapter3: <VirtualizationVaultChapterThree />,
		},
	},
	'testing-debugging': {
		'testing-tower': {
			'/': <TestingTowerChapterOne />,
			chapter1: <TestingTowerChapterOne />,
			chapter2: <TestingTowerChapterTwo />,
			chapter3: <TestingTowerChapterThree />,
		},
		'debug-dungeon': {
			'/': <DebugDungeonChapterOne />,
			chapter1: <DebugDungeonChapterOne />,
			chapter2: <DebugDungeonChapterTwo />,
			chapter3: <DebugDungeonChapterThree />,
		},
		'integration-inn': {
			'/': <IntegrationInnChapterOne />,
			chapter1: <IntegrationInnChapterOne />,
			chapter2: <IntegrationInnChapterTwo />,
			chapter3: <IntegrationInnChapterThree />,
		},
		'error-enchantments': {
			'/': <ErrorEnchantmentsChapterOne />,
			chapter1: <ErrorEnchantmentsChapterOne />,
			chapter2: <ErrorEnchantmentsChapterTwo />,
			chapter3: <ErrorEnchantmentsChapterThree />,
		},
	},
	'advanced-patterns': {
		'compound-components': {
			'/': <CompoundComponentsChapterOne />,
			chapter1: <CompoundComponentsChapterOne />,
			chapter2: <CompoundComponentsChapterTwo />,
			chapter3: <CompoundComponentsChapterThree />,
		},
		'render-props': {
			'/': <RenderPropsChapterOne />,
			chapter1: <RenderPropsChapterOne />,
			chapter2: <RenderPropsChapterTwo />,
			chapter3: <RenderPropsChapterThree />,
		},
		'higher-order-components': {
			'/': <HigherOrderComponentsChapterOne />,
			chapter1: <HigherOrderComponentsChapterOne />,
			chapter2: <HigherOrderComponentsChapterTwo />,
			chapter3: <HigherOrderComponentsChapterThree />,
		},
		'portals-refs': {
			'/': <PortalsRefsChapterOne />,
			chapter1: <PortalsRefsChapterOne />,
			chapter2: <PortalsRefsChapterTwo />,
			chapter3: <PortalsRefsChapterThree />,
		},
	},
	'react-ecosystem': {
		'state-management-libraries': {
			'/': <StateManagementLibrariesChapterOne />,
			chapter1: <StateManagementLibrariesChapterOne />,
			chapter2: <StateManagementLibrariesChapterTwo />,
			chapter3: <StateManagementLibrariesChapterThree />,
		},
		'styling-solutions': {
			'/': <StylingSolutionsChapterOne />,
			chapter1: <StylingSolutionsChapterOne />,
			chapter2: <StylingSolutionsChapterTwo />,
			chapter3: <StylingSolutionsChapterThree />,
		},
		'form-libraries': {
			'/': <FormLibrariesChapterOne />,
			chapter1: <FormLibrariesChapterOne />,
			chapter2: <FormLibrariesChapterTwo />,
			chapter3: <FormLibrariesChapterThree />,
		},
		'animation-libraries': {
			'/': <AnimationLibrariesChapterOne />,
			chapter1: <AnimationLibrariesChapterOne />,
			chapter2: <AnimationLibrariesChapterTwo />,
			chapter3: <AnimationLibrariesChapterThree />,
		},
	},
};
const ChapterInnerList = () => {
	const { lessonId, courseId, chapterId } = useParams();

	if (!courseListMap[courseId] || !courseListMap[courseId][lessonId]) {
		return (
			<div>
				Course or lesson not found - Course: {courseId}, Lesson:{' '}
				{lessonId}
			</div>
		);
	}

	const chapterKey = chapterId || 'chapter1';
	const chapter = courseListMap[courseId][lessonId][chapterKey];

	if (!chapter) {
		return <div>Chapter not found - Chapter: {chapterKey}</div>;
	}

	return <>{chapter}</>;
};

export default ChapterInnerList;
