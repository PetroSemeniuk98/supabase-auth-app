import { useEffect, useState } from "react";
import { supabase } from "./supabeseClient";
import {
  Navbar,
  Row,
  Col,
  Container,
  Nav,
  Form,
  Button,
} from "react-bootstrap";
import ProductCard from "./ProductCard";

const App = () => {
  const [product, setProduct] = useState([]);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10);

      if (data != null) {
        setProduct(data);
      }

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.massage);
    }
  };

  const createProduct = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .insert({ name: name, description: desc })
        .single();

      if (error) {
        throw error;
      }
      window.location.reload();
    } catch (error) {
      alert(error.massage);
    }
  };

  const handleKey = async (event) => {
    try {
      if (event.key === "Enter") {
        const { error } = await supabase
          .from("products")
          .insert({ name: name, description: desc })
          .single();

        if (error) {
          throw error;
        }
        window.location.reload();
      }
    } catch (error) {
      alert(error.massage);
    }
  };
  console.log(product);

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>Store Product</Navbar.Brand>

          <Nav>
            <Nav.Item>Created code with Supabase</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Created Product with Supabase Database</h3>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Product Name..."
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(event) => handleKey(event)}
            />
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              placeholder="Product Description..."
              onChange={(e) => setDesc(e.target.value)}
              onKeyDown={(event) => handleKey(event)}
            />
            <br></br>
            <Button onClick={() => createProduct()}>Create Product</Button>
          </Col>
        </Row>

        <hr />
        <h3>Current Database Item</h3>
        <Row xs={1} lg={3} className="g-4">
          {product.map((product) => (
            <Col>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;
