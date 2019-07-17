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
      itemIdRunning: null,
      areItemsMarkedAsCompleted: false
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState(prevState => ({
      nextItemId: prevState.nextItemId + 1,
      items: [...prevState.items, newItem]
    }));
  }

  clearCompletedItems() {
    this.setState(({ items }) => ({
      items: items.filter(item => !item.isCompleted),
      areItemsMarkedAsCompleted: false
    }));
  }

  increaseSessionsCompleted(itemId) {
    this.setState(({ items }) => ({
      items: items.map(item => {
        if (itemId === item.id) item.sessionsCompleted++;
        return item;
      })
    }));
  }

  toggleItemIsCompleted(itemId) {
    // Sets the given item to be completed
    this.setState(({ items }) => ({
      items: items.map(item => {
        if (itemId === item.id) item.isCompleted = !item.isCompleted;
        return item;
      })
    }));

    // Sees if any of the items are marked as completed
    this.setState(({ items }) => ({
      areItemsMarkedAsCompleted: items.reduce((acc, curr) => (
        acc || curr.isCompleted
      ), false)
    }));
  }

  startSession(id) {
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id
    });
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
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
            {this.state.sessionIsRunning && <Timer
              key={this.state.itemIdRunning}
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(this.state.itemIdRunning)}
              autoPlays
            /> }
            <div className="items-container">
            {this.state.items.map(item => (
              <TodoItem
                key={item.id}
                toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                startSession={() => this.startSession(item.id)}
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
