import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  renderOrderItem = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    // If fish data isn't loaded yet (waiting on firebase), don't render orders
    if (!fish) return;

    const isAvailable = fish.status === "available";
    const settings = { enter: 500, exit: 500 };
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: settings
    };
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>Sorry, {fish ? fish.name : "fish"} is no longer available</li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={settings}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  calculateTotalOrderCost = orderIds => {
    return orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = this.calculateTotalOrderCost(orderIds);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrderItem)}
        </TransitionGroup>

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
