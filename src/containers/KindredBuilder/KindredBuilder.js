import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
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

  let saveSummary = null;
  let kindred = props.error ? <p>Sorry this app isn't working</p> : <Spinner />;

  if (props.atr) {
    kindred = (
      <Auxiliary>
        <BuildControls
          attributes={props.atr}
          attributeValue={props.onSetAttributeValue}
          saving={saveHandler}
          isAuth={props.isAuth}
        />
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
    error: state.kindredBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAttributeValue: (atName, pointValue) =>
      dispatch(actions.setAttributeValue(atName, pointValue)),
    onInitAttributes: () => dispatch(actions.initAttributes()),
    onInitSave: () => dispatch(actions.saveInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(KindredBuilder, axios));
