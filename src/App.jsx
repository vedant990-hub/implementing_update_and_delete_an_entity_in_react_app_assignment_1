import { useState } from "react";
import UpdateItem from './components/UpdateItem';

function App(){
  const [dooId] = useState("1");
  return(
    <div className="app">
      <h1>Door Management System</h1>
      <UpdateItem doorId={dooId} />
    </div>
  );
}

export default App;