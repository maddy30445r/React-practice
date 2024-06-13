import React, { useState } from "react";

export default function App() {
  const [itemarray, setitemarray] = useState([]);

  function handlesubmit(item) {
    if (!item.name) return;

    setitemarray((items) => [...items, item]);
  }

  function handleremoveitem(id) {
    setitemarray((items) => items.filter((item) => item.id !== id));
  }

  function handlepacked(itemmid) {
    setitemarray((items) =>
      items.map((item) =>
        item.id === itemmid ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clear() {
    setitemarray([]);
  }

  return (
    <div>
      <Header />
      <Search onAdditem={handlesubmit} />
      <Packing
        items={itemarray}
        ondeleteitem={handleremoveitem}
        oncheck={handlepacked}
        onclear={clear}
      />
      <Footer items={itemarray} />
    </div>
  );
}

function Header() {
  return (
    <div className="text-[11vh] text-orange-600 font-originalsurfer bg-yellow-100 py-2 text-center">
      🧳FAR AWAY🌴
    </div>
  );
}
function Search({ onAdditem }) {
  const [quantity, setquantity] = useState(1);
  const [item, setitem] = useState("");

  function handlequantity(e) {
    setquantity(e.target.value);
  }
  function handleitem(e) {
    setitem(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newitem = {
      name: item,
      quantity: quantity,
      packed: false,
      id: new Date().valueOf(),
    };
    onAdditem(newitem);
    setquantity(1);
    setitem("");
  }

  return (
    <div className="bg-orange-600 py-3 relative h-16">
      <form className="absolute left-1/4  flex gap-4" onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={handlequantity}
          className="rounded-md text-zinc-400 focus:outline-0 focus:text-zinc-800">
          {Array.from({ length: 10 }, (v, i) => i).map((item) => (
            <option value={item + 1}>{item + 1}</option>
          ))}
        </select>
        <input
          value={item}
          onChange={handleitem}
          className="rounded-md border-0 focus:outline-0 px-3"
          type="text"
          placeholder="Your Item... "></input>
        <button className="bg-cyan-300 px-3 py-1 rounded-md"> Add</button>
      </form>
    </div>
  );
}

function Packing({ items, ondeleteitem, oncheck, onclear }) {
  const [sorted, setsort] = useState("default");

  function handlesort(e) {
    setsort(e.target.value);
  }
  let sorteditems = items.slice();
  if (sorted == "checked") {
    sorteditems.sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  if (sorted == "desc") {
    sorteditems.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="bg-yellow-900">
      <div className="h-370px pt-10 px-10  bg-yellow-900 flex flex-wrap space-x-16 items-start ">
        {sorteditems.map((item) => (
          // important point- ye div ki vajah se neeche wale ke=i vajah se bhot dikkat hui isko lagayo to jb bhi item delete kro to khaali search box apne aap unchecked ho jaa rha tha

          // {/* <div className="font-originalsurfer"> */}

          <Item
            item={item}
            oncheck={oncheck}
            ondeleteitem={ondeleteitem}
            key={item.id}
          />
          // </div>
        ))}
      </div>
      <button
        onClick={onclear}
        className="mb-2  mr-3 relative left-1/2 py-1 bg-yellow-100 rounded-full px-4 text-s font-bold text-orange-600">
        Clear List
      </button>

      <select
        value={sorted}
        onChange={handlesort}
        className="relative left-[55%] rounded-md text-zinc-700 focus:outline-0 focus:text-zinc-800">
        <option value="default">Sort By Input</option>
        <option value="checked">Sort By Packed</option>
        <option value="desc">Sort By Name</option>
      </select>
    </div>
  );
}

function Footer({ items }) {
  if (items.length == 0)
    return (
      <div className=" text-[5vh] font-originalsurfer bg-cyan-600 h-83px py-5 text-center">
        Let's Start Your Packing 💼
      </div>
    );

  let packedlength = items.filter((item) => item.packed).length;

  return (
    <div className=" text-[5vh] font-originalsurfer bg-cyan-600 h-83px py-5 px-5 text-center">
      {packedlength !== items.length ? (
        <span>
          You have total {items.length} items and you have packed {packedlength}{" "}
          items out of them ({Math.round((packedlength / items.length) * 100)}%)
        </span>
      ) : (
        <span>😍 Ready to Depart ✈️</span>
      )}
    </div>
  );
}

function Item({ item, oncheck, ondeleteitem }) {
  return (
    <span>
      <input
        value={item.packed}
        onChange={() => oncheck(item.id)}
        className="cursor-fancy mr-3 scale-150 accent-orange-600"
        type="checkbox"
      />
      <span
        className={`text-xl text-amber-50  ${
          item.packed ? "line-through" : ""
        }`}>
        {item.quantity} {item.name}
      </span>
      <span onClick={() => ondeleteitem(item.id)} className="cursor-fancy ml-2">
        ❌
      </span>
    </span>
  );
}
