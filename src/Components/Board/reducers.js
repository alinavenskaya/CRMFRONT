import {
  CHANGE_ORDER,
  CHANGE_COLUMNS,
  ADD_DEAL,
  DEAL_STATUS_CLOSE,
  DEAL_STATUS_OPEN,
  DEAL_STATUS_ACCEPT,
  CHANGE_DEAL_FIELD,
  DEALS_LOADED
} from "./constants.js";
import {
  CREATE_DEAL,
  REMOVE_DEAL,
  UPDATE_DEAL,
  TASKS_LOADED,
  TASK_CREATED,
  TASK_DELETED,
  TASK_UPDATED
} from "../../constants";

const removeDeal = (id, state) => {
  return Object.keys(state.columns).reduce((acc, column) => {
    acc[column] = state.columns[column].filter(item => item.id !== id);
    return acc;
  }, {});
};

const updateDeal = (newItem, state) => {
  return Object.keys(state.columns).reduce((acc, column) => {
    acc[column] = state.columns[column].map(oldItem => {
      return oldItem.id === newItem.id ? newItem : oldItem;
    });
    return acc;
  }, {});
};

const removeTask = (id, state) => {
  return state.tasks.filter(task => task.id !== id);
};

const updateTask = (newTask, state) => {
  return state.tasks.map(oldTask => {
    return oldTask.id === newTask.id ? newTask : oldTask;
  });
};

const initialStateBoard = {
  columns: {
    "Первый контакт": [],
    "Назначена встреча": [],
    "Отправлено КП": [],
    "Выслан договор": [],
    "Исполнение обязанностей": [],
    Успех: [],
    Неудача: []
  },
  ordered: Object.keys({
    "Первый контакт": [],
    "Назначена встреча": [],
    "Отправлено КП": [],
    "Выслан договор": [],
    "Исполнение обязанностей": [],
    Успех: [],
    Неудача: []
  }),
  name: "",
  contact: "",
  email: "",
  phone: "",
  price: "",
  company: "",
  newTask: "",
  type: "",
  dealModalStatus: false,
  dealModalType: "",
  dealModalFunction: () => {},
  isTaskLoaded: false,
  tasks: []
};

export const boardReducer = (state = initialStateBoard, action = {}) => {
  switch (action.type) {
    case CHANGE_ORDER:
      return { ...state, ordered: action.payload };
    case CHANGE_COLUMNS:
      return { ...state, columns: action.payload };
    case CHANGE_DEAL_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.text
      };
    case TASKS_LOADED:
      return { ...state, isTaskLoaded: true, tasks: action.payload };
    case TASK_CREATED:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case TASK_DELETED:
      return { ...state, tasks: removeTask(action.payload, state) };
    case TASK_UPDATED:
      return { ...state, tasks: updateTask(action.payload, state) };

    case DEALS_LOADED:
      return { ...state, columns: action.payload };
    case CREATE_DEAL:
      return {
        ...state,
        columns: {
          ...state.columns,
          "Первый контакт": [action.payload, ...state.columns["Первый контакт"]]
        },
        name: "",
        contact: "",
        email: "",
        phone: "",
        price: "",
        company: "",
        newTask: "",
        type: "",
        dealModalStatus: false,
        dealModalType: ""
      };
    case UPDATE_DEAL:
      return {
        ...state,
        columns: updateDeal(action.payload, state),
        name: "",
        contact: "",
        email: "",
        phone: "",
        price: "",
        company: "",
        newTask: "",
        type: "",
        dealModalStatus: false,
        dealModalType: ""
      };
    case REMOVE_DEAL:
      return {
        ...state,
        columns: removeDeal(action.payload, state),
        name: "",
        contact: "",
        email: "",
        phone: "",
        price: "",
        company: "",
        newTask: "",
        type: "",
        dealModalStatus: false,
        dealModalType: ""
      };
    case ADD_DEAL:
      //TODO: change that
      return {
        ...state,
        columns: {
          ...state.columns,
          "Первый контакт": [
            {
              id: "507f1f77bcf86cd799439011",
              company: "TESTING",
              price: "10000",
              contact: "Егорова Эшли Андреевна",
              phone: "8(800)747-08-46",
              manager: {
                name: "Василий",
                avatarUrl:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_TNh87d2_yMhP44u9QtVmzcuZO5eG6zBAI1Z7BZkTTLl1ajwX"
              }
            },
            ...state.columns["Первый контакт"]
          ]
        }
      };
    case DEAL_STATUS_CLOSE:
      return {
        ...state,
        dealModalStatus: action.payload,
        isTaskLoaded: false,
        tasks: []
      };
    case DEAL_STATUS_OPEN: {
      const { client, name, price, id: dealid } = action.payload.deal;
      return {
        ...state,
        dealModalStatus: action.payload.status,
        //so we can use modal for editing and for inserting
        clientid: client && client.id ? client.id : "",
        dealid: dealid ? dealid : "",
        name: name ? name : "",
        company: client && client.company ? client.company : "",
        contact: client && client.name ? client.name : "",
        price: price ? price : "",
        phone: client && client.phone ? client.phone : "",
        email: client && client.email ? client.email : "",
        dealModalFunction: action.payload.dealModalFunction,
        type: action.payload.type
      };
    }
    case DEAL_STATUS_ACCEPT:
      return {
        ...state,
        dealModalStatus: action.payload.status,
        dealModalFunction: action.payload.dealModalFunction
      };

    default:
      return state;
  }
};

const initialStateDeals = {};

export const dealsReducer = (state = initialStateDeals, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
