import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  formInput = React.createRef();

  goToStore = event => {
    // 1. Prevent form from submitting
    event.preventDefault();

    // 2. Get text from input
    const storeName = this.formInput.current.value;

    // 3. Change the page to /store/what-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          ref={this.formInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
