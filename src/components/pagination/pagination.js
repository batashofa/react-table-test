import React from "react";
import "./pagination.css";

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.numOfElements !== prevProps.numOfElements) {
            this.setState({currentPage: 1})
        }
    }

    handleClick(page) {
        this.props.currentPage(page);
        this.setState({currentPage: page});
    }

    getPaginationButtons() {
        const buttonArray = [];
        const paginationSize = 3;
        const numOfPages = Math.ceil(
            this.props.numOfElements / this.props.elementsPerPage
        );
        let space = "";
        for (let i = 0; i < paginationSize; i++) {
            let page = this.state.currentPage + i;

            if (this.state.currentPage + 2 >= numOfPages) {
                page = numOfPages - 2 + i;
                space = "";
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
        if (this.props.numOfElements === 0) {
            return this.state.currentPage;
        }
        if (this.state.currentPage >= 1 && this.state.currentPage < this.props.numOfElements / this.props.elementsPerPage) {
            return this.state.currentPage + 1;
        } else {
            return this.state.currentPage;
        }
    }

    textPaginationItems() {
        if (this.props.numOfElements === 0) {
            return this.state.currentPage - 1;
        }
        if (
            this.props.numOfElements !==
            this.state.currentPage * this.props.elementsPerPage + 1
        ) {
            return `${this.state.currentPage * this.props.elementsPerPage - 19}-${this.state.currentPage * this.props.elementsPerPage >
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
                        <b onClick={() => this.handleClick(this.onClickLeft())}>Previous</b>
                    </li>
                    <li>{this.getPaginationButtons()}</li>
                    <li className="pagination__list-right">
                        <b onClick={() => this.handleClick(this.onClickRight())}>Next</b>
                    </li>
                </ul>
            </div>
        );
    }
}
