import React from "react";
import PropTypes from "prop-types";

import { formatPrice } from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired,
    addToOrder: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired
  };

  addToOrder = event => {
    // 1. Forward info about this fish to App to add to cart
    this.props.addToOrder(this.props.index);
  };

  render() {
    // const fish = this.props.details;
    const { name, image, price, status, description } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{description}</p>
        <button disabled={!isAvailable} onClick={this.addToOrder}>
          {isAvailable ? "Add To Order" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
