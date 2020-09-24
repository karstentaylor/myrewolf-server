import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from './Footer';

configure({ adapter: new Adapter() });
describe('<Footer />', () => {
	it('renders without crashing', () => {
		mount(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);
	});
});
