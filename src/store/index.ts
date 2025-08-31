// store.ts
import { legacy_createStore as createStore, compose } from "redux";
import rootReducer from "../reducers";

function saveToLocalStorage(state: RootState) {
    try {
        localStorage.setItem("reduxState", JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
}

function loadFromLocalStorage() {
    try {
        const stateStr = localStorage.getItem("reduxState");
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, persistedState, composeEnhancers());

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof rootReducer>;
export default store;
