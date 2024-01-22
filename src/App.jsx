import { useState } from "react";
import Books from "./components/Books";
import bookLogo from "./assets/books.png";

import { useGetBooksQuery } from "./app/booksApi";

function App() {
  const { isLoading } = useGetBooksQuery();

  return (
    (!isLoading && (
      <>
        <Books></Books>
      </>
    )) || (
      <div style={{ display: "grid", justifyItems: "center" }}>
        <h1 className="display-3">Loading...</h1>
        <img id="logo-image" src={bookLogo} />
      </div>
    )
  );
}

export default App;
