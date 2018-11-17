import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const params = this.props.match.params;

    // first reinstate local storage
    const localStorageRef = localStorage.getItem(`order-${params.storeId}`);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    const params = this.props.match.params;
    localStorage.setItem(`order-${params.storeId}`, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of existing state
    // ... = object spread, effectively a clone()
    const updatedFishes = { ...this.state.fishes };

    // 2. Add new fish to state
    updatedFishes[`fish${Date.now()}`] = fish;

    // 3. Set the new state to be the source of truth
    this.setState({
      fishes: updatedFishes
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. Copy existing state
    const updatedFishes = { ...this.state.fishes };

    // 2. Update requested fish
    updatedFishes[key] = updatedFish;

    // 3. Set the new state
    this.setState({
      fishes: updatedFishes
    });
  };

  deleteFish = key => {
    // 1. Copy current state
    const updatedFishes = { ...this.state.fishes };

    // 2. Delete requested fish
    updatedFishes[key] = null;

    // 3. Set the new state
    this.setState({
      fishes: updatedFishes
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    // 1. Take a copy of existing state
    const updatedOrder = { ...this.state.order };

    // 2. Add new order to state
    updatedOrder[key] = updatedOrder[key] + 1 || 1;

    // 3. Update App state
    this.setState({
      order: updatedOrder
    });
  };

  removeFromOrder = key => {
    // 1. Copy existing state
    const updatedOrder = { ...this.state.order };

    // 2. Delete requested order (we're not syncing order data to firebase, so this is okay)
    delete updatedOrder[key];

    // 3. Update App state
    this.setState({
      order: updatedOrder
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
