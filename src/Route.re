open Relude.Globals;
open ReludeReact;
open Axios;

let api = "http://localhost:3000/promise";

type state = {data: AsyncResult.t(string, string)};

let initialState = {data: AsyncResult.init};

type action =
  | FetchRoute
  | FetchRouteSuccess(string)
  | FetchRouteError(string);

let reducer = (state, action) => {
  switch (action) {
  | FetchRoute =>
    Reducer.UpdateWithIO(
      {data: state.data |> AsyncResult.toBusy},
      IO.async(onDone =>
        Js.Promise.(
          Axios.get(api)
          |> then_(r => {onDone(Ok(FetchRouteSuccess(r##data))) |> resolve})
        )
        |> ignore
      ),
    )
  | FetchRouteSuccess(s) => Reducer.Update({data: AsyncResult.completeOk(s)})
  };
};

let renderData = d =>
  d
  |> ReludeReact.Render.asyncResultByValueLazy(
       _ => <p> {React.string("Loading")} </p>,
       data => <p> {React.string("Data")} </p>,
       error => <p> {React.string("Error")} </p>,
     );

[@react.component]
let make = () => {
  let (state, dispatch) = Reducer.useReducer(reducer, initialState);

  <>
    {renderData(state.data)}
    <button onClick={_ => dispatch(FetchRoute)}>
      {React.string("fetch route")}
    </button>
  </>;
};
