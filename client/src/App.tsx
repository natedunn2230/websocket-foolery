import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5001");

interface Person {
  name: string;
  age: number;
}

function App() {
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("fetch-data", (data) => {
      console.log("recieved fetch-data event");
      const url = data.url;

      axios.get(url).then((data) => {
        setPerson(data.data.person);
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <div className="App">
      <div className="person-list">
        {person && (
          <div className="person-box" key={"1"}>
            <span>
              <b>Name: </b>
              <span>{person?.name}</span>
            </span>
            <span>
              <b>Age: </b>
              <span>{person?.age}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
