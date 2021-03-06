import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./SavedData.module.css";
import axios from "../../../axios-saved";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as saveActions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const SavedData = props => {
  const [formSave, setFormSave] = useState({
    //TODO write helper function to create the object and just call f to initialize it below
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street Address",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      //TODO dropdown with countries
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country ",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "your@e.mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    downloadMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "smallest", displayValue: "Smallest Size" },
          { value: "largest", displayValue: "Full Size" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const saveDataHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formEl in formSave) {
      formData[formEl] = formSave[formEl].value;
    }
    const save = {
      attributes: props.atr,

      playerData: formData,
      userId: props.userId,
    };
    props.onSaveKindred(save, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    // const updatedPlayerForm = JSON.parse(JSON.stringify(formSave));
    // updatedPlayerForm[inputIdentifier].value = event.target.value;
    // this.setState({ player: updatedPlayerForm });

    const updatedPlayerElem = updateObject(formSave[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        formSave[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedPlayerForm = updateObject(formSave, {
      [inputIdentifier]: updatedPlayerElem,
    });

    let formValid = true;
    for (let inputIdentifier in updatedPlayerForm) {
      formValid = updatedPlayerForm[inputIdentifier].valid && formValid;
    }
    setFormSave(updatedPlayerForm);
    setFormIsValid(formValid);
    // this.setState({ player: updatedPlayerForm, formIsValid: formValid });
  };

  const formElemArr = [];
  for (let key in formSave) {
    formElemArr.push({
      id: key,
      config: formSave[key],
    });
  }

  let form = (
    <form onSubmit={saveDataHandler}>
      {formElemArr.map(elem => (
        <Input
          key={elem.id}
          elementType={elem.config.elementType}
          elementConfig={elem.config.elementConfig}
          value={elem.config.value}
          invalid={!elem.config.valid}
          shouldValidate={elem.config.validation}
          touched={elem.config.touched}
          changed={event => inputChangedHandler(event, elem.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        SAVE
      </Button>
    </form>
  );
  if (props.loading === true) {
    form = <Spinner />;
  }
  return (
    <div className={classes.SavedData}>
      <h4>Enter you Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    atr: state.kindredBuilder.attributes,
    loading: state.save.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveKindred: (orderData, token) =>
      dispatch(saveActions.saveKindred(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(SavedData, axios));
