import React, { Component } from "react";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Kindred from "../../components/Kindred/Kindred";
import BuildControls from "../../components/Kindred/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import SaveSummary from "../../components/Kindred/SaveSummary/SaveSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-saved";
import * as actionTypes from "../../store/actions";

//TO DO Disable buttons if out of points

class KindredBuilder extends Component {
  state = {
    saving: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get("https://react-kindred-default-rtdb.firebaseio.com/attributes.json")
    //   .then(response => {
    //     this.setState({ attributes: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }

  updateSaveState(attributes) {
    const sum = Object.keys(attributes)
      .map(atKey => {
        return attributes[atKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum === 10 ;
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
    const queryParams = [];
    for (let i in this.props.atr) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.atr[i])
      );
    }

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/saved",
      search: "?" + queryString,
    });
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
    let kindred = this.state.error ? (
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
    if (this.state.loading) {
      saveSummary = <Spinner />;
    }
    return (
      <Auxiliary>
        <Modal 
          show={this.state.saving} 
          modalClosed={this.saveCancelHandler}
        >
          {saveSummary}
        </Modal>
        {kindred}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    atr: state.attributes,
    points: state.availablePoints
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAttributeAdded: atName =>
      dispatch({ type: actionTypes.ADD_ATTRIBUTE, attributeName: atName }),
    onAttributeRemoved: atName =>
      dispatch({ type: actionTypes.REMOVE_ATTRIBUTE, attributeName: atName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(KindredBuilder, axios));
