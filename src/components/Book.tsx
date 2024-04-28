import React from "react";
import { Card } from "react-bootstrap";
import "./BookStyles.scss";

interface BookProps {
  title: string;
  writer: string;
  point: number;
}

const Book: React.FC<BookProps> = ({ title, writer, point }) => {
  return (
    <Card className={"book-card"} style={{ display: "flex", margin: "5px" }}>
      <Card.Body>
        <Card.Title className={"book-title"}>{title}</Card.Title>
        <Card.Text>Writer: {writer}</Card.Text>
        <Card.Text>Price: {point}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Book;
