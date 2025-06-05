import { useParams } from 'react-router-dom';
import ComponentsBasicsOverview from '../components-basics/ComponentsBasicsOverview';
import StateManagementOverview from '../state-management/StateManagementOverview';
import PropsDataFlowOverview from '../props-data-flow/PropsDataFlowOverview';

const courseListMap = {
	'components-basics': <ComponentsBasicsOverview />,
	'state-management': <StateManagementOverview />,
	'props-data-flow': <PropsDataFlowOverview />,
};
const CourseList = () => {
	const { courseId } = useParams();

	return <>{courseListMap[courseId]}</>;
};

export default CourseList;
