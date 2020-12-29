import React, { useState } from "react";
import { Icon, Card, Container, Form, Label, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useReadCypher, useWriteCypher } from "use-neo4j";
import { Link } from "react-router-dom";
import { AnyRecord } from "dns";

function SearchResults({ query }: any) {
  const { loading, records } = useReadCypher(
    `MATCH (m:Movie) WHERE m.title CONTAINS ${query} RETURN m LIMIT 10`
  );

  if (query === "") return <div></div>;

  if (loading) {
    return <div>Loading...</div>;
  }

  const movies = records?.map((row) => {
    const movie = row.get("m"); // movie.identity.toNumber() movie.lables : string [], movie.properties = Record<string, any>

    const labels = movie.lables.map((label: any) => (
      <Label key={label}>{label}</Label>
    ));

    return (
      <Card key={movie.identity.toNumber()}>
        <Card.Content>
          <Card.Header>
            <Link to={`/movie/${movie.properties.id.toNumber()}`}>
              {movie.properies.title}
            </Link>
          </Card.Header>
          <Card.Meta>{labels}</Card.Meta>
          Release in {movie.properties.release_date.year.toNumber()}
          <Card.Description>
            {movie.properties.overview.substr(0, 100)}&hellip;
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          {movie.properties.vote_count.toNumber()}
        </Card.Content>
      </Card>
    );
  });

  return <div>{movies}</div>;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");

  return (
    <Container>
      <Segment>
        <Form>
          <Form.Field>
            <label htmlFor="query">Search by title</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Segment>

      <SearchResults query={query} />
    </Container>
  );
}
