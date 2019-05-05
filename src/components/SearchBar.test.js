import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SearchBar } from './SearchBar';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
    describe('SearchBar', () => {
        it('should render initial state', () => {
            const wrapper = mount(<SearchBar />);
            wrapper.setState({ movieTitle: '' });

            expect(wrapper.find('div').hasClass('search-bar')).toBe(true);
            expect(wrapper.find('input').hasClass('search-bar__input')).toBe(true);
            expect(wrapper.find('input').instance().placeholder).toEqual('type movie title...');
            expect(wrapper.find('input').instance().value).toEqual('');
        });

        it('should handle movie search, if more than 3 characters are typed', () => {
            const searchMoviesPropsSpy = jest.fn();
            const wrapper = shallow(<SearchBar searchMovies={searchMoviesPropsSpy} />);
            const spy = jest.spyOn(wrapper.instance(), 'searchMovies');

            jest.useFakeTimers();

            wrapper.instance().handleChange({
                target: {
                    value: 'set',
                    id: 'movieTitle'
                }
            });

            jest.runAllTimers();

            expect(wrapper.state('movieTitle')).toEqual('set');
            expect(spy).toBeCalledWith('set');
            expect(searchMoviesPropsSpy).toBeCalledWith({ 'movieTitle': 'set' });
        });

        it('should not handle movie search, if less than 3 characters are typed', () => {
            const searchMoviesPropsSpy = jest.fn();
            const wrapper = mount(<SearchBar searchMovies={searchMoviesPropsSpy} />);
            const searchMoviesSpy = jest.spyOn(wrapper.instance(), 'searchMovies');

            jest.useFakeTimers();

            wrapper.instance().handleChange({
                target: {
                    value: 'se',
                    id: 'movieTitle'
                }
            });

            jest.runAllTimers();

            expect(wrapper.state('movieTitle')).toEqual('se');
            expect(searchMoviesSpy).toBeCalledWith('se');
            expect(searchMoviesPropsSpy).not.toHaveBeenCalled();
        });
    });
});
