import React, { Component } from "react";
import Auxiliary from "../hoc/Auxiliary";
import Kindred from "../components/Kindred/Kindred";
import BuildControls from "../components/Kindred/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import SaveSummary from "../components/Kindred/SaveSummary/SaveSummary";
//TO DO Disable buttons if out of points

const ATTRIBUTES_PRICES = {
  str: 1,
  dex: 1,
  sta: 1,
};
class KindredBuilder extends Component {
  state = {
    attributes: {
      str: 1,
      dex: 1,
      sta: 1,
    },
    availablePoints: 7,
    savable: false,
    saving: false,
  };

  updateSaveState(attributes) {
    const sum = Object.keys(attributes)
      .map(atKey => {
        return attributes[atKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ savable: sum === 10 });
  }

  addAttributeHandler = type => {
    const oldCount = this.state.attributes[type];
    if (oldCount >= 5) {
      return;
    }
    const updatedCount = oldCount + 1;
    const updatedAttributes = { ...this.state.attributes };
    updatedAttributes[type] = updatedCount;
    const priceAddition = ATTRIBUTES_PRICES[type];
    const oldPrice = this.state.availablePoints;
    if (this.state.availablePoints === 0) {
      return;
    }
    const newPrice = oldPrice - priceAddition;
    this.setState({ availablePoints: newPrice, attributes: updatedAttributes });
    this.updateSaveState(updatedAttributes);
  };

  removeAttributeHandler = type => {
    const oldCount = this.state.attributes[type];
    if (oldCount <= 1) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedAttributes = { ...this.state.attributes };
    updatedAttributes[type] = updatedCount;
    const priceDeduction = ATTRIBUTES_PRICES[type];
    const oldPrice = this.state.availablePoints;

    const newPrice = oldPrice + priceDeduction;
    this.setState({ availablePoints: newPrice, attributes: updatedAttributes });
    this.updateSaveState(updatedAttributes);
  };

  saveHandler = () => {
    this.setState({ saving: true });
  };

  saveCancelHandler = () => {
    this.setState({ saving: false });
  };

  saveContinueHandler = () => {
    alert('You Embrace!')
  }

  render() {
    const disabledInfoMin = {
      ...this.state.attributes,
    };
    for (let key in disabledInfoMin) {
      disabledInfoMin[key] = disabledInfoMin[key] <= 1;
    }
    const disabledInfoMax = {
      ...this.state.attributes,
    };
    for (let key in disabledInfoMax) {
      disabledInfoMax[key] = disabledInfoMax[key] >= 5;
    }
    return (
      <Auxiliary>
        <Modal show={this.state.saving} modalClosed={this.saveCancelHandler}>
          <SaveSummary 
          attributes={this.state.attributes} 
          savingCanceld={this.saveCancelHandler}
          savingContinue={this.saveContinueHandler}
          />
        </Modal>
        <Kindred attributes={this.state.attributes} />
        <BuildControls
          attributesAdded={this.addAttributeHandler}
          attributesRemoved={this.removeAttributeHandler}
          disabledMin={disabledInfoMin}
          disabledMax={disabledInfoMax}
          savable={this.state.savable}
          saving={this.saveHandler}
          availablePoints={this.state.availablePoints}
        />
      </Auxiliary>
    );
  }
}

export default KindredBuilder;
