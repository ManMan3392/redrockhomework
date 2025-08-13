import React, { memo, useState } from 'react'

const ReactApp = memo(() => {
    const [count, setCount] = useState(100);

    return (
      <div className="react">
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>点我</button>
        <button onClick={() => setCount(count - 1)}>点我</button>
      </div>
    );
})

export default ReactApp;