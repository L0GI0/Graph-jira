import React, { useState, useContext } from "react";
import { Neo4jContext, useReadCypher } from "use-neo4j";
import { int } from "neo4j-driver";
import {
  Icon,
  Card,
  Container,
  Form,
  Label,
  Segment,
  Dimmer,
  Message,
  Button,
  Header,
  Loader,
} from "semantic-ui-react";
import { Z_STREAM_ERROR } from "zlib";

function EditMovie({ movie }: any) {
  const [error, setError] = useState<Error>();
  const [confirmation, setConfirmation] = useState<string>();
  const [title, setTitle] = useState(movie.properties.title);
  const [overview, setOverview] = useState(movie.properties.title);
  const { driver } = useContext(Neo4jContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const session = driver?.session();

    session
      ?.run(
        `MATCH (m:Movie) WHERE m.id = ${int(movie.properties.id)} SET m += ${{
          title,
          overview,
        }}, m.updateAt= datetime() RETURN m.updatedAt as updatedAt`
      )
      .then((res) =>
        setConfirmation(
          `Node updated successfully at ${res.records[0]
            .get("updatedAt")
            .toString()}`
        )
      )
      .catch((e: Error) => setError(e));
  };

  return (
    <Form>
      {confirmation && <Message positive>{confirmation}</Message>}
      {error && <Message negative>{error.message}</Message>}

      <Form.Field>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="title">Overview</label>
        <textarea
          id="overview"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
      </Form.Field>
      <Button primary onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default function Movie({ match }: any) {
  const { loading, first } = useReadCypher(
    `MATCH (m:Movie) WHERE m.id = ${int(match.params.id)} RETURN m`
  );

  if (loading) {
    return (
      <Segment style={{ height: 500 }}>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Segment>
    );
  }

  const movie = first?.get("m");

  return (
    <Container>
      <Header>{movie.properties.title}</Header>
      <EditMovie></EditMovie>
    </Container>
  );
}
