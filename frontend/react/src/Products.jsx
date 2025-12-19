import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    email: ""
  });

  // Fetch all products
  const fetchProducts = async () => {
    console.log('helloss');
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    console.log(data);
    
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  // Create new product
  const handleCreate = async () => {
    if (!newProduct.name || !newProduct.email) {
      alert("Please enter both name and email");
      return;
    }
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ name: "", email: "" });
    fetchProducts();
  };
  // Update product name
  const handleUpdate = async (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedName }),
    });
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Add New Product</h2>
      <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} />
      <br /><br />
      <input type="email" name="email" placeholder="Email" value={newProduct.email} onChange={handleInputChange} />
      <br /><br />
      <button onClick={handleCreate}>Add Product</button>
<table>
   <h2>Products List</h2>
  <tr>
    <td>name</td>
    <td>email</td>
    <td>action</td>
  </tr>
</table>
     
      {products.map((product) => (
        <div key={product.id} >
          <h3>{product.name}</h3>
          <p>{product.email}</p>
          <button onClick={() => handleUpdate(product.id)}>edit</button>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
