import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { supabase } from "./supabeseClient";

const ProductCard = ({ product }) => {
  const [edit, setEdit] = useState(true);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");

  const updateProduct = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ name: name, description: desc })
        .eq("id", product.id);

      if (error) {
        throw error;
      }
      window.location.reload();
    } catch (error) {
      alert(error.massage);
    }
  };
  const deliteProduct = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) {
        throw error;
      }
      window.location.reload();
    } catch (error) {
      alert(error.massage);
    }
  };

  const handleKeyUpdate = async (event) => {
    try {
      if (event.key === "Enter") {
        const { error } = await supabase
          .from("products")
          .update({ name: name, description: desc })
          .eq("id", product.id);

        if (error) {
          throw error;
        }
        window.location.reload();
      }
    } catch (error) {
      alert(error.massage);
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {edit === true ? (
          <>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Button
              variant="danger"
              style={{ marginRight: "0.5rem" }}
              onClick={() => deliteProduct()}
            >
              Delite Product
            </Button>
            <Button variant="secondary" onClick={() => setEdit(false)}>
              Edit Product
            </Button>
          </>
        ) : (
          <>
            <Form>
              <h4>Editing Product</h4>
              <Button onClick={() => setEdit(true)}> Go Back</Button>
              <br></br>
              <br></br>
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                defaultValue={product.name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(event) => handleKeyUpdate(event)}
              />
              <Form.Label>Product Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description..."
                defaultValue={product.description}
                onChange={(e) => setDesc(e.target.value)}
                onKeyDown={(event) => handleKeyUpdate(event)}
              />
              <br></br>
              <Button onClick={() => updateProduct()}> Update Product</Button>
            </Form>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
