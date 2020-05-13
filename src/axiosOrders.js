import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-80c92.firebaseio.com/"
});

export default instance;
