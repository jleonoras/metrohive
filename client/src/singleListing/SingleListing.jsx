import React from "react";

const SingleListing = () => {
  return (
    <section className="App">
      <div className="App-header">
        <div>
          <h1>This is the Single Listing Page.</h1>
        </div>

        <div>
          <ul>
            <li>
              <figure>
                <img src="" alt="" loading="lazy"></img>
                <img src="" alt="" loading="lazy"></img>
                <img src="" alt="" loading="lazy"></img>
              </figure>
              <div>
                <h3>Price:</h3>
                <p></p>
              </div>
              <div>
                <h3>Description:</h3>
                <p></p>
              </div>
              <div>
                <h3>Location:</h3>
                <p></p>
              </div>
              <div>
                <h3>Owner:</h3>
                <p></p>
              </div>
              <div>
                <h3>Email:</h3>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SingleListing;
