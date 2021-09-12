import React from "react";
import "./pagination.css";
import { ReactComponent as Left } from "../../assets/svg/Left.svg";
import { ReactComponent as Right } from "../../assets/svg/Right.svg";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  handleClick(page) {
    this.props.currentPage(page);
    this.setState({ currentPage: page });
  }

  getPaginationButtons() {
    const buttonArray = [];
    const paginationSize = 3;
    const numOfPages = Math.ceil(
      this.props.numOfElements / this.props.elementsPerPage
    );
    let space = "...";
    for (let i = 0; i < paginationSize; i++) {
      let page = this.state.currentPage + i;

      if (this.state.currentPage + 2 >= numOfPages) {
        page = numOfPages - 3 + i;
        space = "";
      } else {
        space = "...";
      }

      if (page > 0) {

        buttonArray.push(
          <button
            key={page}
            className={`pagination__button ${page === this.state.currentPage ? "pagination__button-active" : ""
              } `}
            onClick={() => this.handleClick(page)}
          >
            {page}
          </button>
        );
      }
    }

    buttonArray.push(space);

    buttonArray.push(
      <button
        key={numOfPages}
        className="pagination__button"
        onClick={() => this.handleClick(numOfPages)}
      >
        {numOfPages}
      </button>
    );
    return buttonArray;
  }

  onClickLeft() {
    if (this.state.currentPage > 1) {
      return this.state.currentPage - 1;
    } else {
      return this.state.currentPage;
    }
  }
  onClickRight() {
    if (this.state.currentPage >= 1) {
      return this.state.currentPage + 1;
    }
  }
  textPaginationItems() {
    if (
      this.props.numOfElements !==
      this.state.currentPage * this.props.elementsPerPage - 3
    ) {
      return `${this.state.currentPage * this.props.elementsPerPage - 3}-${this.state.currentPage * this.props.elementsPerPage >
          this.props.numOfElements
          ? this.props.numOfElements
          : this.state.currentPage * this.props.elementsPerPage
        }`;
    }

    return this.props.numOfElements;
  }

  render() {
    return (
      <div className="pagination">
        <ul className="pagination__list">
          <li>
            {this.textPaginationItems()} of {this.props.numOfElements} items
          </li>
          <li className="pagination__list-left">
            <Left onClick={() => this.handleClick(this.onClickLeft())} />
          </li>
          <li>{this.getPaginationButtons()}</li>
          <li className="pagination__list-left">
            <Right onClick={() => this.handleClick(this.onClickRight())} />
          </li>
        </ul>
      </div>
    );
  }
}
