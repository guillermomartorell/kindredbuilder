import React, { useState, useEffect } from "react";
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

const KindredBuilder = props => {
  const [saving, setSaving] = useState(false);
  
  const { onInitAttributes } = props;
  useEffect(() => {
    onInitAttributes();
  }, [onInitAttributes]);

  const updateSaveState = attributes => {
    const sum = Object.keys(attributes)
      .map(atKey => {
        return attributes[atKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum === 10;
  };

  const saveHandler = () => {
    if (props.isAuth) {
      setSaving(true);
    } else {
      props.onSetAuthRedirectPath("/saved");
      props.history.push("/auth");
    }
  };

  const saveCancelHandler = () => {
    setSaving(false);
  };

  const saveContinueHandler = () => {
    props.onInitSave();
    props.history.push("/saved");
  };

  const disabledInfoMin = {
    ...props.atr,
  };
  for (let key in disabledInfoMin) {
    disabledInfoMin[key] = disabledInfoMin[key] <= 1;
  }
  const disabledInfoMax = {
    ...props.atr,
  };
  for (let key in disabledInfoMax) {
    disabledInfoMax[key] = disabledInfoMax[key] >= 5;
  }
  let saveSummary = null;
  let kindred = props.error ? <p>Sorry this app isn't working</p> : <Spinner />;

  if (props.atr) {
    kindred = (
      <Auxiliary>
        
        <BuildControls
          attributes={props.atr} 
          // attributesAdded={props.onAttributeAdded}
          // attributesRemoved={props.onAttributeRemoved}
          attributeValue={props.onSetAttributeValue}
          // disabledMin={disabledInfoMin}
          // disabledMax={disabledInfoMax}
          savable={updateSaveState(props.atr)}
          saving={saveHandler}
          availablePoints={props.points}
          // isAuth={props.isAuth}
        />
        {/* <Kindred attributes={props.atr} /> */}
      </Auxiliary>
    );
    saveSummary = (
      <SaveSummary
        attributes={props.atr}
        savingCanceld={saveCancelHandler}
        savingContinue={saveContinueHandler}
      />
    );
  }

  return (
    <Auxiliary>
      <Modal show={saving} modalClosed={saveCancelHandler}>
        {saveSummary}
      </Modal>
      {kindred}
    </Auxiliary>
  );
};

const mapStateToProps = state => {
  return {
    atr: state.kindredBuilder.attributes,
    points: state.kindredBuilder.availablePoints,
    error: state.kindredBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAttributeAdded: atName => dispatch(actions.addAttributes(atName)),
    onAttributeRemoved: atName => dispatch(actions.removeAttributes(atName)),
    onSetAttributeValue: (atName, pointValue) => dispatch(actions.setAttributeValue(atName, pointValue)),
    onInitAttributes: () => dispatch(actions.initAttributes()),
    onInitSave: () => dispatch(actions.saveInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(KindredBuilder, axios));
