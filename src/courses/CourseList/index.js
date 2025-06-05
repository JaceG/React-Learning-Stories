import { useParams } from 'react-router-dom';
import ComponentsBasicsOverview from '../components-basics/ComponentsBasicsOverview';
import StateManagementOverview from '../state-management/StateManagementOverview';
import PropsDataFlowOverview from '../props-data-flow/PropsDataFlowOverview';
import HooksInActionOverview from '../hooks-in-action/HooksInActionOverview';

const courseListMap = {
	'components-basics': <ComponentsBasicsOverview />,
	'state-management': <StateManagementOverview />,
	'props-data-flow': <PropsDataFlowOverview />,
	'hooks-in-action': <HooksInActionOverview />,
};
const CourseList = () => {
	const { courseId } = useParams();

	return <>{courseListMap[courseId]}</>;
};

export default CourseList;
