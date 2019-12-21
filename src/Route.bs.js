'use strict';

var React = require("react");

function Route(Props) {
  return React.createElement("p", undefined, "test");
}

var make = Route;

exports.make = make;
/* react Not a pure module */
