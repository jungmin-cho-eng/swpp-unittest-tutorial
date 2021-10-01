import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/index';

jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn(props => {
    return (
      <div className="spyTodo">
        {/* <div className="title" onClick={props.clickDetail}>
          {props.title}
        </div> */}
        <button className="prevButton" onClick={props.clickDone} />
        <button className="nextButton" onClick={props.clickDone} />
      </div>);
  });
});

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let TodoCalendar, spyGetTodos;

  beforeEach(() => {
    TodoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact
            render={() => <TodoList title="TODOLIST_TEST_TITLE" />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Todos', () => {
    const component = mount(TodoCalendar);
    const wrapper = component.find('.spyTodo');
    expect(wrapper.length).toBe(3);
    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
    expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
    expect(wrapper.at(2).text()).toBe('TODO_TEST_TITLE_3');
    expect(spyGetTodos).toBeCalledTimes(1);
  });

//   it(`should call 'clickTodoHandler'`, () => {
//     const spyHistoryPush = jest.spyOn(history, 'push')
//       .mockImplementation(path => {});
//     const component = mount(todoList);
//     const wrapper = component.find('.spyTodo .title').at(0);
//     wrapper.simulate('click');
//     expect(spyHistoryPush).toHaveBeenCalledWith('/todos/1');
//   });

  it(`should call 'handleClickPrev'`, () => {
    const spyClickPrev = jest.spyOn(actionCreators.getTodos())
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(TodoCalendar);
    const wrapper = component.find('.spyTodo .prevButton').at(0);
    wrapper.simulate('click');
    expect(spyClickPrev).toBeCalledTimes(1);
  });

  it(`should call 'handleClickNext'`, () => {
    const spyClickNext = jest.spyOn(actionCreators.getTodos())
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(TodoCalendar);
    const wrapper = component.find('.spyTodo .nextButton').at(0);
    wrapper.simulate('click');
    expect(spyClickNext).toBeCalledTimes(1);
  });
});

// describe('<TodoCalendar />', () => {
//     it('should render without errors', () => {
//       const component = mount(<TodoCalendar />);
//       const wrapper = component.find('.TodoCalendar');
//       expect(wrapper.length).toBe(1);
//     });
  
//   //   it('should render title as not done if done=false', () => {
//   //     const component = shallow(<Todo done={false} title={'TEST_TITLE'} />);
//   //     let wrapper = component.find('.done');
//   //     expect(wrapper.length).toBe(0);
//   //     wrapper = component.find('.text');
//   //     expect(wrapper.text()).toEqual('TEST_TITLE');
//   //   });
  
//   //   it('should render title as done if done=true', () => {
//   //     const component = shallow(<Todo done={true} title={'TEST_TITLE'} />);
//   //     const wrapper = component.find('.done');
//   //     expect(wrapper.text()).toEqual('TEST_TITLE');
//   //   });
  
//     it('should handle "handleClickPrev"', () => {
//       const mockClickDone = jest.fn();
//       const component = mount(<TodoCalendar clickDone={mockClickDone} />);
//       const wrapper = component.find('.doneButton');
//       wrapper.simulate('click');
//       expect(mockClickDone).toHaveBeenCalledTimes(1);
//     });
//   });