import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

/*

return(<div className=" text-2xl bg-cyan-600 h-83px py-5 px-5 text-center">

{packedlength==items.length?
<span>You have total {items.length} items and you have packed {packedlength}{" "}
      items out of them ({Math.round((packedlength / items.length) * 100)}%)</span>

      <span>Ready to Depart✈️</span>
      }

</div>);

{Arrays.from({length:10},(v,i)=>i).map(item=><option value={item}>{item}</option>)}
*/

      