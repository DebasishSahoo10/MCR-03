import { useState } from "react";
import "./App.css";
import { snacks } from "./database/snacks";

function App() {
  const snacksDB = snacks;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [filters, setFilters] = useState({
    id: false,
    product_name: false,
    price: false,
    calories: false,
    ingredients: false,
    product_weight : false
  });
  let filteredSnacksDB = snacksDB
    .filter(
      (snack) =>
        snack.product_name.toLowerCase().includes(searchQuery) ||
        snack.ingredients.includes(searchQuery)
    )
    .sort((a, b) => {
      if (sortKey === "price") {
        return filters.price ? b.price - a.price : a.price - b.price;
      } else if (sortKey === "id") {
        return filters.id ? b.id - a.id : a.id - b.id;
      }  else if (sortKey==="weight") {
        return filters.product_weight ? b.product_weight.split("g")[0] - a.product_weight.split("g")[0] : a.product_weight.split("g")[0] - b.product_weight.split("g")[0];
      } else if (sortKey==="calories") {
        return filters.calories ? b.calories - a.calories : a.calories - b.calories;
      } else if (sortKey==="ingredients") {
        return filters.ingredients ? b.ingredients - a.ingredients: a.ingredients - b.ingredients;
      }
    });
  filteredSnacksDB = filters.product_name ? filteredSnacksDB.sort() : filteredSnacksDB.reverse()
  const keys = Object.keys(snacksDB[0]);
  const handleSorting = (key) => {
    if (key === "price") {
      setFilters((prev) => ({ ...prev, price: !prev.price }));
      setSortKey("price");
    } else if (key === "id") {
      setFilters((prev) => ({ ...prev, id: !prev.id }));
      setSortKey("id");
    } else if (key === "product_name") {
      setFilters((prev) => ({ ...prev, product_name: !prev.product_name }));
      setSortKey("name");
    } else if (key==="product_weight") {
      setFilters((prev) => ({ ...prev, product_weight: !prev.product_weight }));
      setSortKey("weight")
    } else if (key==="calories") {
      setFilters((prev) => ({ ...prev, calories: !prev.calories }));
      setSortKey("calories")
    } else if (key==="ingredients") {
      setFilters((prev) => ({ ...prev, ingredients: !prev.ingredients }));
      setSortKey("ingredients")
    }
  };

  return (
    <div>
      <h1>Cooking Pan 🍳</h1>
      <input
        type="text"
        style={{ marginBottom: "40px", height: "50px", width : "400px" }}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        placeholder="Search Produt or Ingridients"
      />
      <table border={"1px"}>
        <tr>
          {keys.map((key) => {
            return (
              <th key={key} onClick={() => handleSorting(key)}>
                {key.split("_").join(" ").toUpperCase()} {filters[key] ? "⬆️" : "⬇️"}
              </th>
            );
          })}
        </tr>
        {filteredSnacksDB.map((snack) => {
          return (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.toString()}</td>
            </tr>
          );
        })}
      </table>
      {filteredSnacksDB.length === 0 && <p>No Match Found</p>}
    </div>
  );
}

export default App;
