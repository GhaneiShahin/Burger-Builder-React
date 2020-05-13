import React, { Component, Fragment } from "react";

import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axiosOrders";
import Spinner from "../components/UI/Spinner/Spinner";
import WithErrorHandle from "../hoc/WithErrorHandle/WithErrorHandle";

const INGREDIENT_PRICES = {
  tomato: 0.2,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    modalShow: false,
    loading: false
  };

  componentDidMount() {
    axios
      .get("https://react-burger-builder-80c92.firebaseio.com/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      });
  }

  modalShowHandler = () => {
    this.setState({ modalShow: true });
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };

  purchaseContinueHandler = () => {
    // alert("You continue!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Shahin Ghanei",
        address: {
          street: "Von-Velbrück 35",
          zipCode: "40764",
          country: "Germany"
        },
        email: "me@me.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false, modalShow: false });
      })
      .catch((err) => {
        this.setState({ loading: false, modalShow: false });
      });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addingredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeingredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientsAdded={this.addingredientsHandler}
            ingredientsRemove={this.removeingredientsHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            modalHandler={this.modalShowHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.modalCloseHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if( this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <Fragment>
        <Modal show={this.state.modalShow} modalClosed={this.modalCloseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default WithErrorHandle(BurgerBuilder, axios);
