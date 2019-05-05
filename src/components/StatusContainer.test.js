import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StatusContainer from './StatusContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
    describe('StatusContainer', () => {
        it('should render initial status', () => {
            const wrapper = shallow(<StatusContainer />);
            wrapper.setState({ status: 'initial' });

            expect(wrapper.find('Status').dive().hasClass('initial')).toBe(true);
        });

        it('should render success status', () => {
            const wrapper = shallow(<StatusContainer />);
            wrapper.setState({ status: 'success' });

            expect(wrapper.find('Status').dive().hasClass('success')).toBe(true);
        });

        it('should render error status', () => {
            const wrapper = shallow(<StatusContainer />);
            wrapper.setState({ status: 'error' });

            expect(wrapper.find('Status').dive().hasClass('error')).toBe(true);
        });

        it('should render loading status', () => {
            const wrapper = shallow(<StatusContainer />);
            wrapper.setState({ status: 'loading' });

            expect(wrapper.find('Status').dive().hasClass('loading')).toBe(true);
        });
    });
});
