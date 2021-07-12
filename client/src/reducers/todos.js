export default (todos = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return todos;
    case "CREATE":
      return todos;
    default:
      return todos;
  }
};
