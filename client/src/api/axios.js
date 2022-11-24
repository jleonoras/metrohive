import axios from "axios";

const port = 5000;

export default axios.create({
  baseURL: `http://localhost:${port}`,
});
