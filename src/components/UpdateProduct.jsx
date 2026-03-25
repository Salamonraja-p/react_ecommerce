import React, { useEffect, useState } from "react";
import { Button, Grid2, Paper, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  let [updateProduct, setUpdateProduct] = useState(null);

  let { id } = useParams();
  let navigate = useNavigate();

  
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Salamonraja-p/my-data/main/db.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let product = data.products.find((p) => p.id === id);
        setUpdateProduct(product);
      });
  }, [id]);

  let handleChange = (e) => {
    let { value, name } = e.target;

    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setUpdateProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setUpdateProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  
  let handleUpdate = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Not Supported",
      text: "Update not available (Frontend only project)",
      icon: "info",
    });

    navigate("/products");
  };

  if (updateProduct !== null) {
    return (
      <Paper elevation={20} style={paperStyle}>
        <Typography variant="h5" textAlign="center">
          Update Product
        </Typography>

        <Grid2
          component="form"
          style={{ display: "grid", gap: "20px" }}
          onSubmit={handleUpdate}
        >
          <TextField
            value={updateProduct.title}
            name="title"
            label="Title"
            fullWidth
            onChange={handleChange}
          />

          <TextField
            value={updateProduct.category}
            name="category"
            label="Category"
            fullWidth
            onChange={handleChange}
          />

          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <TextField
                value={updateProduct.rating.rate}
                name="rating.rate"
                type="number"
                label="Rate"
                onChange={handleChange}
              />
            </Grid2>

            <Grid2 size={6}>
              <TextField
                value={updateProduct.rating.count}
                name="rating.count"
                type="number"
                label="Count"
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>

          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </Grid2>
      </Paper>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UpdateProduct;