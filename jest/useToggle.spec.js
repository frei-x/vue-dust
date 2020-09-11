import { shallowMount } from '@vue/test-utils';

import useToggle from '@lib/useToggle';
describe('test useToggle', () => {
  it('renders a message', () => {
    const wrapper = shallowMount(useToggle, {
      propsData: {
        message: 'Testing the composition API'
      }
    });

    expect(wrapper.find('.message').text()).toBe('TESTING THE COMPOSITION API');
  });
});
