import { createStore } from "redux";

/**
 * 리덕스에서 관리 할 상태 정의
 */
const initialState = {
  counter: 0,
  text: "",
  list: [],
};

/**
 * 액션 타입 정의
 */
const INCREASE = "INCRASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

/**
 * 액션 함수 정의
 * 두번째 case 부터 진행되는 화살표 함수가 작성하기 쉬운 코드임.
 */
function increase() {
  return {
    type: INCREASE,
  };
}
const decrease = () => ({ type: DECREASE });
const changeText = (text) => ({ type: CHANGE_TEXT, text });
const addToList = (item) => ({ type: ADD_TO_LIST, item });

/**
 * 리듀서 만들기
 * 위에서 작성한 액션 함수들을 통해 만들어진 객체들을 참조하여 새로운 상태를 만드는 함수를 만들기.
 * 리듀서에서 불변성을 꼭 지켜야 한다!!!!
 */
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        lsit: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

/**
 * 스토어 만들기
 */
const store = createStore(reducer);

console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회합니다.

/**
 * 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
 */
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe를 호출하기.

// 액션들을 디스패치 해보자.
store.dispatch(increase());
store.dispatch(decrease());
// unsubscribe(); // 실행하게 되면 뒤에 changeText, addToList가 동작하지 않는 것을 확인 할 수 있다.
store.dispatch(changeText("하이하이"));
store.dispatch(addToList({ id: 1, text: "zz" }));
