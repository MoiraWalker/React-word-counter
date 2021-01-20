import { WordCount} from "./index";
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


test('renders without crashing', () => {
    const wrapper = shallow(<WordCount/>);
    console.log(wrapper.debug());
    expect(wrapper).toBeTruthy();
})
