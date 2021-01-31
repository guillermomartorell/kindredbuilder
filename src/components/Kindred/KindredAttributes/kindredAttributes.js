import React, { Component } from "react";
// import classes from "./kindredAttributes.module.css";
import PropTypes from "prop-types";

class KindredAttributes extends Component {
  render() {
    let attributes = null;
    if (this.props.type === "str" && this.props.val === 1) {
      attributes = (
        <div>
          <div>
            <strong>Strength:</strong>
          </div>
          • You can easily crush a beer can. (20 kg: a Christmas tree, a stop
          sign)
        </div>
      );
    } else if (this.props.type === "str" && this.props.val === 2) {
      attributes = <div><div><strong>Strength:</strong></div>•• You are physically average. (45 kg: a toilet)</div>;
    } else if (this.props.type === "str" && this.props.val === 3) {
      attributes = (
        <div><div><strong>Strength:</strong></div>
          ••• You might be able to break open a wooden door. (115 kg: a large
          human, an empty coffin, a refrigerator)
        </div>
      );
    } else if (this.props.type === "str" && this.props.val === 4) {
      attributes = (
        <div><div><strong>Strength:</strong></div>
          •••• You are a prime physical specimen, likely with very visible
          musculature. (180 kg: a full coffin, an empty dump- ster)
        </div>
      );
    } else if (this.props.type === "str" && this.props.val === 5) {
      attributes = (
        <div><div><strong>Strength:</strong></div>
          ••••• You are a true powerhouse and can likely break open a metal fire
          door, tear open a chain-link fence, or snap open a chained gate. (250
          kg: a motorcycle, a piano)
        </div>
      );
    } else if (this.props.type === "dex" && this.props.val === 1) {
      attributes = (
        <div><div><strong>Dexterity:</strong></div>• You can run, but balance and dodging are a challenge.</div>
      );
    } else if (this.props.type === "dex" && this.props.val === 2) {
      attributes = (
        <div><div><strong>Dexterity:</strong></div>•• Your sprint is solid, and sometimes you appear graceful.</div>
      );
    } else if (this.props.type === "dex" && this.props.val === 3) {
      attributes = (
        <div><div><strong>Dexterity:</strong></div>
          ••• Your agility is impressive, and your coordination is as good as
          any trained amateur.
        </div>
      );
    } else if (this.props.type === "dex" && this.props.val === 4) {
      attributes = (
        <div><div><strong>Dexterity:</strong></div>
          •••• You could excel at acrobat- ics and move in a way few humans can.
        </div>
      );
    } else if (this.props.type === "dex" && this.props.val === 5) {
      attributes = (
        <div><div><strong>Dexterity:</strong></div>
          ••••• Your movements are liquid and hypnotic – almost super- human.
        </div>
      );
    } else if (this.props.type === "sta" && this.props.val === 1) {
      attributes = <div><div><strong>Stamina:</strong></div>• Even lesser exertions make you winded.</div>;
    } else if (this.props.type === "sta" && this.props.val === 2) {
      attributes = (
        <div><div><strong>Stamina:</strong></div>•• You can take a beating, but consider suing for peace</div>
      );
    } else if (this.props.type === "sta" && this.props.val === 3) {
      attributes = (
        <div><div><strong>Stamina:</strong></div>
          ••• Several days of hard hiking with a backpack is no prob- lem for
          you.
        </div>
      );
    } else if (this.props.type === "sta" && this.props.val === 4) {
      attributes = (
        <div><div><strong>Stamina:</strong></div>
          •••• You could win a marathon or take copious amounts of pain, at
          least physically.
        </div>
      );
    } else if (this.props.type === "sta" && this.props.val === 5) {
      attributes = (
        <div><div><strong>Stamina:</strong></div>••••• Even if you were a mortal, you’d never break a sweat.</div>
      );
    }
    return attributes;
  }
}

KindredAttributes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default KindredAttributes;
