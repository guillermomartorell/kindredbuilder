import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);
  const {buildingKindred, authRedirectPath, onSetAuthRedirectPath} = props;
  useEffect(() => { 
    if (!buildingKindred && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
    
  }, [buildingKindred, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formElemArr = [];
  for (let key in authForm) {
    formElemArr.push({
      id: key,
      config: authForm[key],
    });
  }
  let form = formElemArr.map(elem => (
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
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let error = null;
  if (props.error) {
    error = <p>There was an error: {props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      <form onSubmit={submitHandler}>
        {form}
        {error}
        <Button btnType="Success">Login</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        Switch to {isSignUp ? "Sign In" : "Sign UP!"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingKindred: state.kindredBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
