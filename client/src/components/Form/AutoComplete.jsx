import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AutoComplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array, Object)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestions: 0,
      filteredSuggestions: [],
      shownSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.target.value;
    const filteredSuggestions = suggestions
      .map(i => userInput && i.route_short_name + "-" + i.route_long_name)
      .filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
    this.setState({
      activeSuggestions: 0,
      filteredSuggestions,
      shownSuggestions: true,
      userInput
    });
  };

  onClick = e => {
    const { handleChange } = this.props;
    handleChange(e.target.innerText);
    this.setState({
      activeSuggestions: 0,
      filteredSuggestions: [],
      shownSuggestions: false,
      userInput: e.target.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestions, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestions: 0,
        shownSuggestions: false,
        userInput: filteredSuggestions[activeSuggestions]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestions === 0) return;

      this.setState({ activeSuggestions: activeSuggestions - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestions - 1 === filteredSuggestions.length) return;
      this.setState({ activeSuggestions: activeSuggestions + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestions,
        filteredSuggestions,
        shownSuggestions,
        userInput
      }
    } = this;
    const { handleChange } = this.props;
    const ulMinHeight =
      filteredSuggestions.length > 5 ? "h-48" : filteredSuggestions.length;
    let suggestionsListComponent;

    if (shownSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul
            className={`${ulMinHeight} suggestions cursor-pointer bg-gray-100 mt-3 rounded-lg shadow-md bg-scroll overflow-auto`}
          >
            {filteredSuggestions.map((suggestion, index) => {
              let className =
                "block py-2 px-4 text-gray-800 hover:bg-indigo-500";

              // if (index === activeSuggestions) {
              //   className += "suggestion-active";
              // }

              return (
                <li key={index} className={className} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No results Found</em>
          </div>
        );
      }
    }
    return (
      <>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="route"
          >
            Bus Route:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="route"
            name="route"
            type="text"
            placeholder="Enter bus number or route"
            onInput={handleChange}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {suggestionsListComponent}
        </div>
      </>
    );
  }
}
