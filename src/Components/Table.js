import React, { useState, useEffect } from "react";

const URL = "https://fakestoreapi.com/products";
const Table = () => {
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(false);

  //custome sort function
  const customSort = (prop, arr) => {
    prop = prop.split(".");
    let len = prop.length;

    arr.sort(function (a, b) {
      var i = 0;
      while (i < len) {
        a = a[prop[i]];
        b = b[prop[i]];
        i++;
      }
      if (a < b) {
        return direction ? -1 : 1;
      } else if (a > b) {
        return direction ? 1 : -1;
      } else {
        return 0;
      }
    });
    return arr;
  };

  //btn click handler
  const sortHandler = (e) => {
    // console.log("e.target.id", e.target.id);
    let property = e.target.id;

    // if (typeof rawProperty === "Object") {
    //   property = "rating.rate";
    // } else {
    //   property = rawProperty;
    // }
    // console.log("property", property);

    const dataForSorting = data.res; // [ ]
    let sortedData;

    //customsort
    sortedData = customSort(property, dataForSorting);
    // console.log(sortedData);

    setDirection(!direction);
    setData((prev) => ({
      ...prev,
      sortedData
    }));
  };

  useEffect(() => {
    const asyncFn = async () => {
      let data = await fetch(URL);
      let res = await data.json();

      // console.log(res);

      setData((prev) => ({ ...prev, res }));
    };
    asyncFn();
  }, []);
  useEffect(() => {}, [data]);

  console.log("data", data.res);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th id="price-heading">
              Price
              <button id="price" onClick={(e) => sortHandler(e)}>
                sort
              </button>
            </th>
            <th>Category</th>
            <th>
              rating
              <button id="rating.rate" onClick={(e) => sortHandler(e)}>
                sort
              </button>
            </th>
          </tr>
          {data.res !== undefined && data.res.length > 0
            ? data.res.map((d) => {
                return (
                  <tr key={d.id}>
                    <td>{d.title}</td>
                    <td id="price">{d.price}</td>
                    <td>{d.category}</td>
                    <td>{d.rating.rate}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
