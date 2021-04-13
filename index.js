//Library Code

const createStore = (reducer) => {
    //Four Parts:
    //1. Create State
    //2. Get State
    //3. Listen for changes to the State
    //4. Update the State

    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

//App code

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

//action creators
const addTodoAction = (todo) => ({
    type: ADD_TODO,
    todo,
})
const removeTodoAction = (id) => ({
    type: REMOVE_TODO,
    id,
})
const toggleTodoAction = (id) => ({
    type: TOGGLE_TODO,
    id,
})
const addGoalAction = (goal) => ({
    type: ADD_GOAL,
    goal,
})
const removeGoalAction = (id) => ({
    type: REMOVE_GOAL,
    id,
})

//todos reducer
const todos = (state = [], action) => {
    switch (action.type){
        case ADD_TODO:
            return state.concat(action.todo);
            break;
        case REMOVE_TODO:
            return state.filter((item) => item.id !== action.id);
            break;
        case TOGGLE_TODO:
            return state.map((item) => item.id !== action.id ? item:Object.assign({},item,{complete:!item.complete}));
            break;
        default:
            return state;
            break;
    }
}

const goals = (state = [], action) => {
    switch (action.type){
        case ADD_GOAL:
            return state.concat(action.goal);
            break;
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
            break;
        default:
            return state;
            break;
    }
}

const app = (state = {}, action) => {
    return {
        todos : todos(state.todos,action),
        goals : goals(state.goals,action)
    }
}



/** Test Runs **/
const store = createStore(app);

store.subscribe(()=>{
    console.log("The new state is",store.getState());
})

store.dispatch(addTodoAction({
        id: 0,
        title: "Do something",
        complete: false
}));
store.dispatch(addTodoAction({
    id: 1,
    title: "Second",
    complete: false
}));

store.dispatch(toggleTodoAction({
    id: 0
}));