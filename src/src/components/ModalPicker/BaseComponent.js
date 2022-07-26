/** @format */

import React from "react";

export default class BaseComponent extends React.PureComponent {
  _bind(...methods) {
    methods.forEach((method) => (this[method] = this[method].bind(this)));
  }
}
