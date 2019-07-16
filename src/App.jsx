import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: nextItemId,
      description: description,
      sessionCompleted: 0,
      isCompleted: false
    };
    this.setState(prevState => ({
      nextItemId: prevState.nextItemId + 1,
      items: [...prevState.items, newItem]
    }));
  }

  clearCompletedItems() {
    // TODO 6
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
  }

  startSession(id) {
    // TODO 4
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            <ClearButton onClick={this.clearCompletedItems} />
          </header>
          {/* TODO 4 */}
            {/* <Timer
              mode="WORK"
              onSessionComplete={() => { console.log("complete") }}
              autoPlays
            /> */}
            <div className="items-container">
            {this.state.items.map(item => (
              <TodoItem
                key={item.id}
                {...item}
              />
            ))}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
