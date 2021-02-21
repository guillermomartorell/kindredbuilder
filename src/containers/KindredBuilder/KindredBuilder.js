import React, { Component } from "react";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Kindred from "../../components/Kindred/Kindred";
import BuildControls from "../../components/Kindred/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import SaveSummary from "../../components/Kindred/SaveSummary/SaveSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "../../axios-saved";

//TO DO Disable buttons if out of points

class KindredBuilder extends Component {
  state = {
    saving: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitAttributes();
  }

  updateSaveState(attributes) {
    const sum = Object.keys(attributes)
      .map(atKey => {
        return attributes[atKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum === 10;
  }

  // addAttributeHandler = type => {
  //   const oldCount = this.state.attributes[type];
  //   if (oldCount >= 5) {
  //     return;
  //   }
  //   const updatedCount = oldCount + 1;
  //   const updatedAttributes = { ...this.state.attributes };
  //   updatedAttributes[type] = updatedCount;
  //   const priceAddition = ATTRIBUTES_PRICES[type];
  //   const oldPrice = this.state.availablePoints;
  //   if (this.state.availablePoints === 0) {
  //     return;
  //   }
  //   const newPrice = oldPrice - priceAddition;
  //   this.setState({ availablePoints: newPrice, attributes: updatedAttributes });
  //   this.updateSaveState(updatedAttributes);
  // };

  // removeAttributeHandler = type => {
  //   const oldCount = this.state.attributes[type];
  //   if (oldCount <= 1) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedAttributes = { ...this.state.attributes };
  //   updatedAttributes[type] = updatedCount;
  //   const priceDeduction = ATTRIBUTES_PRICES[type];
  //   const oldPrice = this.state.availablePoints;

  //   const newPrice = oldPrice + priceDeduction;
  //   this.setState({ availablePoints: newPrice, attributes: updatedAttributes });
  //   this.updateSaveState(updatedAttributes);
  // };

  saveHandler = () => {
    this.setState({ saving: true });
  };

  saveCancelHandler = () => {
    this.setState({ saving: false });
  };

  saveContinueHandler = () => {
    this.props.onInitSave();
    this.props.history.push("/saved");
  };

  render() {
    const disabledInfoMin = {
      ...this.props.atr,
    };
    for (let key in disabledInfoMin) {
      disabledInfoMin[key] = disabledInfoMin[key] <= 1;
    }
    const disabledInfoMax = {
      ...this.props.atr,
    };
    for (let key in disabledInfoMax) {
      disabledInfoMax[key] = disabledInfoMax[key] >= 5;
    }
    let saveSummary = null;
    let kindred = this.props.error ? (
      <p>Sorry this app isn't working</p>
    ) : (
      <Spinner />
    );

    if (this.props.atr) {
      kindred = (
        <Auxiliary>
          <Kindred attributes={this.props.atr} />
          <BuildControls
            attributesAdded={this.props.onAttributeAdded}
            attributesRemoved={this.props.onAttributeRemoved}
            disabledMin={disabledInfoMin}
            disabledMax={disabledInfoMax}
            savable={this.updateSaveState(this.props.atr)}
            saving={this.saveHandler}
            availablePoints={this.props.points}
          />
        </Auxiliary>
      );
      saveSummary = (
        <SaveSummary
          attributes={this.props.atr}
          savingCanceld={this.saveCancelHandler}
          savingContinue={this.saveContinueHandler}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal show={this.state.saving} modalClosed={this.saveCancelHandler}>
          {saveSummary}
        </Modal>
        {kindred}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    atr: state.kindredBuilder.attributes,
    points: state.kindredBuilder.availablePoints,
    error: state.kindredBuilder.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAttributeAdded: atName => dispatch(actions.addAttributes(atName)),
    onAttributeRemoved: atName => dispatch(actions.removeAttributes(atName)),
    onInitAttributes: () => dispatch(actions.initAttributes()),
    onInitSave: () => dispatch(actions.saveInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(KindredBuilder, axios));
