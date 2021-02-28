import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './index.css';
import './App.css';

// Type constants
const TYPES = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
};

// Reducer
const reducer = (state = { count: 0 }, action) => {
  const { INCREMENT, DECREMENT, RESET } = TYPES;
  switch (action.type) {
    case INCREMENT: {
      return { ...state, count: state.count + 1 };
    }
    case DECREMENT: {
      return { ...state, count: state.count - 1 };
    }
    case RESET: {
      return { ...state, count: action.payload };
    }
    default: {
      return state;
    }
  }
};

// Action creator
const incrementCount = () => {
  return { type: TYPES.INCREMENT };
};

const decrementCount = () => {
  return { type: TYPES.DECREMENT };
};

const reset = (reset) => {
  return { type: TYPES.RESET, payload: reset };
};

const store = createStore(reducer);

function App(props) {
  console.log(props);
  const { count, incrementCount, decrementCount, reset } = props;
  return (
    <div className='App'>
      <h1> Count: {count} </h1>
      <button onClick={incrementCount}> INCREMENT </button>
      <button onClick={decrementCount}> DECREMENT </button>
      <button onClick={() => reset(10)}> RESET </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCount() {
      dispatch(incrementCount());
    },
    decrementCount() {
      dispatch(decrementCount());
    },
    reset(value) {
      dispatch(reset(value));
    },
  };
};

// const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

// Shorthand for mapDispath to props.
const AppContainer = connect(mapStateToProps, {
  incrementCount,
  decrementCount,
  reset,
})(App);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
