import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LifeLine } from "react-loading-indicators";
import useFetch from "./custom-hook/useFetch";
import { MdAddShoppingCart } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlineFolderDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";

const ProductList = () => {
  let navigate = useNavigate();

  
  let { products, error, isLoading } = useFetch(
    "https://raw.githubusercontent.com/Salamonraja-p/my-data/main/db.json"
  );

  let dispatch = useDispatch();
  let cartState = useSelector((state) => state.cart);

  
  let addItemToCart = (product) => {
    let checkProduct = cartState.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (!checkProduct) {
      dispatch(addItem(product));
      Swal.fire({
        title: "Success",
        text: "Product Added Successfully",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Product Already Added",
        icon: "error",
      });
    }
  };

  
  let handleDelete = () => {
    Swal.fire({
      title: "Not Supported",
      text: "Delete not available (Frontend only)",
      icon: "info",
    });
  };

  if (isLoading) {
    return (
      <center>
        <LifeLine color="#32cd32" size="large" text="Loading..." />
      </center>
    );
  }

  return (
    <div>
      <article>
        <span>To Create New Product</span>
        <Button onClick={() => navigate("/newProduct")}>
          Click me!
        </Button>
      </article>

      {products.length !== 0 && (
        <section className="products">
          {Array.isArray(products) && products.map((product) => (
            <Card
              key={product.id}
              style={{ width: "18rem" }}
              className="product"
            >
              <center>
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ width: "9rem", height: "12rem" }}
                />
              </center>

              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>
              </Card.Body>

              <Card.Footer
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button onClick={() => addItemToCart(product)}>
                  <MdAddShoppingCart />
                </Button>

                
                <Button
                  onClick={() =>
                    Swal.fire("Update not supported (Frontend only)")
                  }
                >
                  <FaEdit />
                </Button>

                
                <Button variant="danger" onClick={handleDelete}>
                  <MdOutlineFolderDelete />
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </section>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ProductList;