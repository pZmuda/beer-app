import React, {useEffect, useState}from "react";
import axios from "axios";
import { Button, Container, Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem } from "reactstrap";

import ItemList from './components/ItemList';

function App() {
  const [post, setPosts] = useState([]);
  const [postPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=${postPerPage}`
      );
      setPosts([...post, res.data]);
    };

    fetchPosts();
  },[page]);

  const toggle = () => {
    if (favorites.length === 0) {
      alert("nie masz piwka");
    } else {
      setModal(!modal);
    }
  };

  const moreBear = () => {
    setPage(page + 1);
  };


    const checkBear = (item) =>
      post.map((items) =>
        items.filter((one) => {
          if (one.id === item) {
            if (!favorites.includes(one)) {
              setFavorites([...favorites, one]);
            } else {
              alert("masz to piwerko");
            }
          }
        })
      );

    const addBear = (item) => {
      checkBear(item);
    };

  const handleRemove = (item) => {
    const arr = [];
    setFavorites([]);
    favorites.filter((one) => (one.id !== item ? arr.push(one) : "nie pyklo"));
    setFavorites(arr);
  };

  const ulubionePiwa = favorites.map(fav => (
      <ListGroupItem key={fav.id}>
        {fav.name}{" "}
        <Button key={fav.id} onClick={() => handleRemove(fav.id)}>
          Usuń
        </Button>
      </ListGroupItem>
  ));

  return (
    <>
      <Button
        className="fixed-top"
        style={{ left: "50px", top: "50vh" }}
        onClick={toggle}
      >
        Ulubione
      </Button>
      <Container>
        <h1>Bear App</h1>
        <ItemList posts={post} onclick={addBear} />
        <Modal
          isOpen={modal}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={toggle}
        >
          <ModalHeader toggle={() => setModal(!modal)}>Ulubione Piwa</ModalHeader>
          <ModalBody>
            <ListGroup>
              {ulubionePiwa}
            </ListGroup>
          </ModalBody>
        </Modal>
      </Container>
      <Button
        style={{ position: "fixed", right: "50px", top: "50vh" }}
        onClick={moreBear}
      >
        Wincej
      </Button>
    </>
  );
}

export default App;
