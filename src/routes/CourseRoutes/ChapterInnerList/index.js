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
import LifecycleChroniclesChapterOne from '../../../learning-paths/components-basics/pages/LifecycleChronicles/chapter1/chapter1';
import LifecycleChroniclesChapterTwo from '../../../learning-paths/components-basics/pages/LifecycleChronicles/chapter2/chapter2';
import LifecycleChroniclesChapterThree from '../../../learning-paths/components-basics/pages/LifecycleChronicles/chapter3/chapter3';
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
import PatternEvolutionChapterOne from '../../../learning-paths/advanced-patterns/pages/PatternEvolution/chapter1/chapter1';
import PatternEvolutionChapterTwo from '../../../learning-paths/advanced-patterns/pages/PatternEvolution/chapter2/chapter2';
import PatternEvolutionChapterThree from '../../../learning-paths/advanced-patterns/pages/PatternEvolution/chapter3/chapter3';
import AdvancedCompositionChapterOne from '../../../learning-paths/advanced-patterns/pages/AdvancedComposition/chapter1/chapter1';
import AdvancedCompositionChapterTwo from '../../../learning-paths/advanced-patterns/pages/AdvancedComposition/chapter2/chapter2';
import AdvancedCompositionChapterThree from '../../../learning-paths/advanced-patterns/pages/AdvancedComposition/chapter3/chapter3';
import RefsAndDOMChapterOne from '../../../learning-paths/advanced-patterns/pages/RefsAndDOM/chapter1/chapter1';
import RefsAndDOMChapterTwo from '../../../learning-paths/advanced-patterns/pages/RefsAndDOM/chapter2/chapter2';
import RefsAndDOMChapterThree from '../../../learning-paths/advanced-patterns/pages/RefsAndDOM/chapter3/chapter3';
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
import ApiIntegrationChapterOne from '../../../learning-paths/server-data/pages/ApiIntegration/chapter1/chapter1';
import ApiIntegrationChapterTwo from '../../../learning-paths/server-data/pages/ApiIntegration/chapter2/chapter2';
import ApiIntegrationChapterThree from '../../../learning-paths/server-data/pages/ApiIntegration/chapter3/chapter3';
import RealtimeConnectionsChapterOne from '../../../learning-paths/server-data/pages/RealtimeConnections/chapter1/chapter1';
import RealtimeConnectionsChapterTwo from '../../../learning-paths/server-data/pages/RealtimeConnections/chapter2/chapter2';
import RealtimeConnectionsChapterThree from '../../../learning-paths/server-data/pages/RealtimeConnections/chapter3/chapter3';
import CachingCastleChapterOne from '../../../learning-paths/server-data/pages/CachingCastle/chapter1/chapter1';
import CachingCastleChapterTwo from '../../../learning-paths/server-data/pages/CachingCastle/chapter2/chapter2';
import CachingCastleChapterThree from '../../../learning-paths/server-data/pages/CachingCastle/chapter3/chapter3';
import GraphQLGatewayChapterOne from '../../../learning-paths/server-data/pages/GraphQLGateway/chapter1/chapter1';
import GraphQLGatewayChapterTwo from '../../../learning-paths/server-data/pages/GraphQLGateway/chapter2/chapter2';
import GraphQLGatewayChapterThree from '../../../learning-paths/server-data/pages/GraphQLGateway/chapter3/chapter3';
import TypeForgeChapterOne from '../../../learning-paths/typescript-react/pages/TypeForge/chapter1/chapter1';
import TypeForgeChapterTwo from '../../../learning-paths/typescript-react/pages/TypeForge/chapter2/chapter2';
import TypeForgeChapterThree from '../../../learning-paths/typescript-react/pages/TypeForge/chapter3/chapter3';
import ComponentArmoryChapterOne from '../../../learning-paths/typescript-react/pages/ComponentArmory/chapter1/chapter1';
import ComponentArmoryChapterTwo from '../../../learning-paths/typescript-react/pages/ComponentArmory/chapter2/chapter2';
import ComponentArmoryChapterThree from '../../../learning-paths/typescript-react/pages/ComponentArmory/chapter3/chapter3';
import GenericForgeChapterOne from '../../../learning-paths/typescript-react/pages/GenericForge/chapter1/chapter1';
import GenericForgeChapterTwo from '../../../learning-paths/typescript-react/pages/GenericForge/chapter2/chapter2';
import GenericForgeChapterThree from '../../../learning-paths/typescript-react/pages/GenericForge/chapter3/chapter3';
import TypeSafeArchitectureChapterOne from '../../../learning-paths/typescript-react/pages/TypeSafeArchitecture/chapter1/chapter1';
import TypeSafeArchitectureChapterTwo from '../../../learning-paths/typescript-react/pages/TypeSafeArchitecture/chapter2/chapter2';
import TypeSafeArchitectureChapterThree from '../../../learning-paths/typescript-react/pages/TypeSafeArchitecture/chapter3/chapter3';
import BuildSystemsChapterOne from '../../../learning-paths/build-deploy/pages/BuildSystems/chapter1/chapter1';
import BuildSystemsChapterTwo from '../../../learning-paths/build-deploy/pages/BuildSystems/chapter2/chapter2';
import BuildSystemsChapterThree from '../../../learning-paths/build-deploy/pages/BuildSystems/chapter3/chapter3';
import CICDPipelinesChapterOne from '../../../learning-paths/build-deploy/pages/CICDPipelines/chapter1/chapter1';
import CICDPipelinesChapterTwo from '../../../learning-paths/build-deploy/pages/CICDPipelines/chapter2/chapter2';
import CICDPipelinesChapterThree from '../../../learning-paths/build-deploy/pages/CICDPipelines/chapter3/chapter3';
import HostingAndDeploymentChapterOne from '../../../learning-paths/build-deploy/pages/HostingAndDeployment/chapter1/chapter1';
import HostingAndDeploymentChapterTwo from '../../../learning-paths/build-deploy/pages/HostingAndDeployment/chapter2/chapter2';
import HostingAndDeploymentChapterThree from '../../../learning-paths/build-deploy/pages/HostingAndDeployment/chapter3/chapter3';
import ProductionReadinessChapterOne from '../../../learning-paths/build-deploy/pages/ProductionReadiness/chapter1/chapter1';
import ProductionReadinessChapterTwo from '../../../learning-paths/build-deploy/pages/ProductionReadiness/chapter2/chapter2';
import ProductionReadinessChapterThree from '../../../learning-paths/build-deploy/pages/ProductionReadiness/chapter3/chapter3';
import FrameworkFoundationsChapterOne from '../../../learning-paths/full-stack-react/pages/FrameworkFoundations/chapter1/chapter1';
import FrameworkFoundationsChapterTwo from '../../../learning-paths/full-stack-react/pages/FrameworkFoundations/chapter2/chapter2';
import FrameworkFoundationsChapterThree from '../../../learning-paths/full-stack-react/pages/FrameworkFoundations/chapter3/chapter3';
import RenderingStrategiesChapterOne from '../../../learning-paths/full-stack-react/pages/RenderingStrategies/chapter1/chapter1';
import RenderingStrategiesChapterTwo from '../../../learning-paths/full-stack-react/pages/RenderingStrategies/chapter2/chapter2';
import RenderingStrategiesChapterThree from '../../../learning-paths/full-stack-react/pages/RenderingStrategies/chapter3/chapter3';
import ServerComponentsChapterOne from '../../../learning-paths/full-stack-react/pages/ServerComponents/chapter1/chapter1';
import ServerComponentsChapterTwo from '../../../learning-paths/full-stack-react/pages/ServerComponents/chapter2/chapter2';
import ServerComponentsChapterThree from '../../../learning-paths/full-stack-react/pages/ServerComponents/chapter3/chapter3';
import FullStackPatternsChapterOne from '../../../learning-paths/full-stack-react/pages/FullStackPatterns/chapter1/chapter1';
import FullStackPatternsChapterTwo from '../../../learning-paths/full-stack-react/pages/FullStackPatterns/chapter2/chapter2';
import FullStackPatternsChapterThree from '../../../learning-paths/full-stack-react/pages/FullStackPatterns/chapter3/chapter3';
import InclusiveFoundationsChapterOne from '../../../learning-paths/accessibility/pages/InclusiveFoundations/chapter1/chapter1';
import InclusiveFoundationsChapterTwo from '../../../learning-paths/accessibility/pages/InclusiveFoundations/chapter2/chapter2';
import InclusiveFoundationsChapterThree from '../../../learning-paths/accessibility/pages/InclusiveFoundations/chapter3/chapter3';
import InteractionPatternsChapterOne from '../../../learning-paths/accessibility/pages/InteractionPatterns/chapter1/chapter1';
import InteractionPatternsChapterTwo from '../../../learning-paths/accessibility/pages/InteractionPatterns/chapter2/chapter2';
import InteractionPatternsChapterThree from '../../../learning-paths/accessibility/pages/InteractionPatterns/chapter3/chapter3';
import VisualAccessibilityChapterOne from '../../../learning-paths/accessibility/pages/VisualAccessibility/chapter1/chapter1';
import VisualAccessibilityChapterTwo from '../../../learning-paths/accessibility/pages/VisualAccessibility/chapter2/chapter2';
import VisualAccessibilityChapterThree from '../../../learning-paths/accessibility/pages/VisualAccessibility/chapter3/chapter3';
import TestingToolsChapterOne from '../../../learning-paths/accessibility/pages/TestingTools/chapter1/chapter1';
import TestingToolsChapterTwo from '../../../learning-paths/accessibility/pages/TestingTools/chapter2/chapter2';
import TestingToolsChapterThree from '../../../learning-paths/accessibility/pages/TestingTools/chapter3/chapter3';

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
		'lifecycle-chronicles': {
			'/': <LifecycleChroniclesChapterOne />,
			chapter1: <LifecycleChroniclesChapterOne />,
			chapter2: <LifecycleChroniclesChapterTwo />,
			chapter3: <LifecycleChroniclesChapterThree />,
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
		'pattern-evolution': {
			'/': <PatternEvolutionChapterOne />,
			chapter1: <PatternEvolutionChapterOne />,
			chapter2: <PatternEvolutionChapterTwo />,
			chapter3: <PatternEvolutionChapterThree />,
		},
		'advanced-composition': {
			'/': <AdvancedCompositionChapterOne />,
			chapter1: <AdvancedCompositionChapterOne />,
			chapter2: <AdvancedCompositionChapterTwo />,
			chapter3: <AdvancedCompositionChapterThree />,
		},
		'refs-and-dom': {
			'/': <RefsAndDOMChapterOne />,
			chapter1: <RefsAndDOMChapterOne />,
			chapter2: <RefsAndDOMChapterTwo />,
			chapter3: <RefsAndDOMChapterThree />,
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
	'server-data': {
		'api-integration': {
			'/': <ApiIntegrationChapterOne />,
			chapter1: <ApiIntegrationChapterOne />,
			chapter2: <ApiIntegrationChapterTwo />,
			chapter3: <ApiIntegrationChapterThree />,
		},
		'realtime-connections': {
			'/': <RealtimeConnectionsChapterOne />,
			chapter1: <RealtimeConnectionsChapterOne />,
			chapter2: <RealtimeConnectionsChapterTwo />,
			chapter3: <RealtimeConnectionsChapterThree />,
		},
		'caching-castle': {
			'/': <CachingCastleChapterOne />,
			chapter1: <CachingCastleChapterOne />,
			chapter2: <CachingCastleChapterTwo />,
			chapter3: <CachingCastleChapterThree />,
		},
		'graphql-gateway': {
			'/': <GraphQLGatewayChapterOne />,
			chapter1: <GraphQLGatewayChapterOne />,
			chapter2: <GraphQLGatewayChapterTwo />,
			chapter3: <GraphQLGatewayChapterThree />,
		},
	},
	'typescript-react': {
		'type-forge': {
			'/': <TypeForgeChapterOne />,
			chapter1: <TypeForgeChapterOne />,
			chapter2: <TypeForgeChapterTwo />,
			chapter3: <TypeForgeChapterThree />,
		},
		'component-armory': {
			'/': <ComponentArmoryChapterOne />,
			chapter1: <ComponentArmoryChapterOne />,
			chapter2: <ComponentArmoryChapterTwo />,
			chapter3: <ComponentArmoryChapterThree />,
		},
		'generic-forge': {
			'/': <GenericForgeChapterOne />,
			chapter1: <GenericForgeChapterOne />,
			chapter2: <GenericForgeChapterTwo />,
			chapter3: <GenericForgeChapterThree />,
		},
		'type-safe-architecture': {
			'/': <TypeSafeArchitectureChapterOne />,
			chapter1: <TypeSafeArchitectureChapterOne />,
			chapter2: <TypeSafeArchitectureChapterTwo />,
			chapter3: <TypeSafeArchitectureChapterThree />,
		},
	},
	'build-deploy': {
		'build-systems': {
			'/': <BuildSystemsChapterOne />,
			chapter1: <BuildSystemsChapterOne />,
			chapter2: <BuildSystemsChapterTwo />,
			chapter3: <BuildSystemsChapterThree />,
		},
		'cicd-pipelines': {
			'/': <CICDPipelinesChapterOne />,
			chapter1: <CICDPipelinesChapterOne />,
			chapter2: <CICDPipelinesChapterTwo />,
			chapter3: <CICDPipelinesChapterThree />,
		},
		'hosting-and-deployment': {
			'/': <HostingAndDeploymentChapterOne />,
			chapter1: <HostingAndDeploymentChapterOne />,
			chapter2: <HostingAndDeploymentChapterTwo />,
			chapter3: <HostingAndDeploymentChapterThree />,
		},
		'production-readiness': {
			'/': <ProductionReadinessChapterOne />,
			chapter1: <ProductionReadinessChapterOne />,
			chapter2: <ProductionReadinessChapterTwo />,
			chapter3: <ProductionReadinessChapterThree />,
		},
	},
	'full-stack-react': {
		'framework-foundations': {
			'/': <FrameworkFoundationsChapterOne />,
			chapter1: <FrameworkFoundationsChapterOne />,
			chapter2: <FrameworkFoundationsChapterTwo />,
			chapter3: <FrameworkFoundationsChapterThree />,
		},
		'rendering-strategies': {
			'/': <RenderingStrategiesChapterOne />,
			chapter1: <RenderingStrategiesChapterOne />,
			chapter2: <RenderingStrategiesChapterTwo />,
			chapter3: <RenderingStrategiesChapterThree />,
		},
		'server-components': {
			'/': <ServerComponentsChapterOne />,
			chapter1: <ServerComponentsChapterOne />,
			chapter2: <ServerComponentsChapterTwo />,
			chapter3: <ServerComponentsChapterThree />,
		},
		'full-stack-patterns': {
			'/': <FullStackPatternsChapterOne />,
			chapter1: <FullStackPatternsChapterOne />,
			chapter2: <FullStackPatternsChapterTwo />,
			chapter3: <FullStackPatternsChapterThree />,
		},
	},
	'accessibility': {
		'inclusive-foundations': {
			'/': <InclusiveFoundationsChapterOne />,
			chapter1: <InclusiveFoundationsChapterOne />,
			chapter2: <InclusiveFoundationsChapterTwo />,
			chapter3: <InclusiveFoundationsChapterThree />,
		},
		'interaction-patterns': {
			'/': <InteractionPatternsChapterOne />,
			chapter1: <InteractionPatternsChapterOne />,
			chapter2: <InteractionPatternsChapterTwo />,
			chapter3: <InteractionPatternsChapterThree />,
		},
		'visual-accessibility': {
			'/': <VisualAccessibilityChapterOne />,
			chapter1: <VisualAccessibilityChapterOne />,
			chapter2: <VisualAccessibilityChapterTwo />,
			chapter3: <VisualAccessibilityChapterThree />,
		},
		'testing-tools': {
			'/': <TestingToolsChapterOne />,
			chapter1: <TestingToolsChapterOne />,
			chapter2: <TestingToolsChapterTwo />,
			chapter3: <TestingToolsChapterThree />,
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
