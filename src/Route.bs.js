'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Axios = require("axios");
var React = require("react");
var Relude_IO = require("relude/src/Relude_IO.bs.js");
var ReludeReact_Render = require("relude-reason-react/src/ReludeReact_Render.bs.js");
var Relude_AsyncResult = require("relude/src/Relude_AsyncResult.bs.js");
var ReludeReact_Reducer = require("relude-reason-react/src/ReludeReact_Reducer.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var api = "http://localhost:3000/promise";

var initialState = {
  data: Relude_AsyncResult.init
};

function reducer(state, action) {
  if (typeof action === "number") {
    return /* UpdateWithIO */Block.__(5, [
              {
                data: Relude_AsyncResult.toBusy(state.data)
              },
              Relude_IO.async((function (onDone) {
                      Axios.get(api).then((function (r) {
                              return Promise.resolve(Curry._1(onDone, /* Ok */Block.__(0, [/* FetchRouteSuccess */Block.__(0, [r.data])])));
                            }));
                      return /* () */0;
                    }))
            ]);
  } else if (action.tag) {
    throw [
          Caml_builtin_exceptions.match_failure,
          /* tuple */[
            "Route.re",
            16,
            33
          ]
        ];
  } else {
    return /* Update */Block.__(0, [{
                data: Relude_AsyncResult.completeOk(action[0])
              }]);
  }
}

function renderData(d) {
  return ReludeReact_Render.asyncResultByValueLazy((function (param) {
                return React.createElement("p", undefined, "Loading");
              }), (function (data) {
                return React.createElement("p", undefined, "Data");
              }), (function (error) {
                return React.createElement("p", undefined, "Error");
              }), d);
}

function Route(Props) {
  var match = ReludeReact_Reducer.useReducer(reducer, initialState);
  var dispatch = match[1];
  return React.createElement(React.Fragment, undefined, renderData(match[0].data), React.createElement("button", {
                  onClick: (function (param) {
                      return Curry._1(dispatch, /* FetchRoute */0);
                    })
                }, "fetch route"));
}

var make = Route;

exports.api = api;
exports.initialState = initialState;
exports.reducer = reducer;
exports.renderData = renderData;
exports.make = make;
/* axios Not a pure module */
