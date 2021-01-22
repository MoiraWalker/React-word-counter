import { WordCount} from "./wordCount";
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<WordCount/>)

test('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
})

test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

const simulateChangeOnTextArea = (wrapper, textAreaSelector, newValue) => {
    let textArea = wrapper.find(textAreaSelector)
    textArea.simulate('change', {
        target: { value: newValue },
    })
    return wrapper.find(textAreaSelector)
}

test( 'test textArea input from user and then reset it', () => {
    const textAreaInput = simulateChangeOnTextArea(wrapper, '#text-area', "This is a test")
    expect(textAreaInput.props().value).toEqual("This is a test")

    const resetBtn = wrapper.find('#reset-button')
    resetBtn.simulate('click')
    expect(wrapper.find('#text-area').props().value).toEqual('')
})

test('test if demo text is sucessfully loaded', () => {
    const textAreaInput = simulateChangeOnTextArea(wrapper, '#text-area', "This is a test")
    expect(textAreaInput.props().value).toEqual("This is a test")

    const demoBtn = wrapper.find('#demo-button')
    demoBtn.simulate('click')
    expect(wrapper.find('#text-area').props().value).toBeTruthy();
})
