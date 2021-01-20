import { WordCount} from "./wordCount";
import Enzyme, { shallow } from 'enzyme';
import hello from "./wordCount";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


test('renders without crashing', () => {
    const wrapper = shallow(<WordCount/>);
    console.log(wrapper.debug());
    expect(wrapper).toBeTruthy();
})



describe("hello function", () => {
    test("output should be hello", () => {
        const word = "hello";
        expect(hello("hello")).toEqual(word);
    });
});
