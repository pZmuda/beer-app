import React from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  Row,
  Col,
  CardBody,
  ListGroupItem,
  ListGroup,
} from "reactstrap";

const ItemList = ({ posts, onclick }) => {

  const item = posts.map((item) =>
    item.map((i) => (
      <Col sm="3" className="mt-4" key={i.id}>
        <Card
          style={{
            height: "40rem",
          }}
        >
          <CardImg
            src={i.image_url}
            className="card-img-top mt-2 mx-auto"
            style={{
              width: "5rem",
              height: "20rem",
              maxHeight: "18rem",
            }}
            alt=""
          />
          <CardTitle className="mt-3 d-flex justify-content-center">
            {" "}
            {i.name}{" "}
          </CardTitle>{" "}
          <CardBody className="d-flex align-items-end justify-content-center">
            <ListGroup
              style={{
                widht: "4rem",
              }}
            >
              <ListGroupItem> Alcochol: {i.abv} </ListGroupItem>{" "}
              <ListGroupItem> ibu: {i.ibu} </ListGroupItem>{" "}
              <ListGroupItem> ph: {i.ph} </ListGroupItem>{" "}
              <Button onClick={() => onclick(i.id)}>
                {" "}
                dodaj do ulubionych{" "}
              </Button>{" "}
            </ListGroup>{" "}
          </CardBody>{" "}
        </Card>{" "}
      </Col>
    ))
  );

  return <Row> {item} </Row>;
};

export default ItemList;
