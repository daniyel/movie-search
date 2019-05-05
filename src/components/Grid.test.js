import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Grid } from './Grid';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
    describe('Grid', () => {
        it('should render initial state', () => {
            const wrapper = mount(<Grid movies={[]} />);
            wrapper.setState({ movies: [] });

            expect(wrapper.find('div').first().hasClass('result-section')).toBe(true);
            expect(wrapper.find('div').first().childAt(1).hasClass('grid')).toBe(true);
        });

        it('should render when movies are fetched', () => {
            const wrapper = mount(<Grid movies={[{
                Poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg',
                Title: 'Set It Up',
                Type: 'movie',
                Year: '2018',
                imdbID: 'tt5304992'
            }]} />);

            expect(wrapper.find('div').first().hasClass('result-section')).toBe(true);
            expect(wrapper.find('div').first().childAt(1).hasClass('grid')).toBe(true);
            expect(wrapper.find('div').first().childAt(1).childAt(0).hasClass('tile')).toBe(true);
            expect(wrapper.find('article').hasClass('tile__body')).toBe(true);
            expect(wrapper.find('header').hasClass('tile__header')).toBe(true);
        });
    });
});
