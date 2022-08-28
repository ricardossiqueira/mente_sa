import { useEffect } from "react";
import { api } from "../services/api";

export default function Home() {
  useEffect(() => {
    api.get("/professional").then((res) => console.log(res.data));
  }, []);

  return <div>hello world</div>;
}
