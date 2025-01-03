import React from "react";

const ProductPage = ({ products }) => {
  return (
    <>
      <>
        <div className="flex-grow-1 p-4">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((item, index) => (
                <div key={index} className="col">
                  <div className="card h-100 shadow-sm" style = {{cursor: "pointer"}}>
                    <img
                      src={item.imageURL}
                      className="card-img-top"
                      alt={item.name}
                      style={{ height: "260px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title fw-bold mb-1">{item.brand}</h6>
                      <p className="card-text text-muted mb-2">{item.name}</p>
                      <div className="d-flex align-items-baseline mb-2">
                        <small className="text-muted me-1">$</small>
                        <span className="fs-4 fw-bold">{item.price}</span>
                      </div>
                      <div className="mb-3">
                        <small className="text-muted">
                          FREE delivery
                          <span className="fw-bold ms-1">Sun, Dec 15</span>
                        </small>
                      </div>
                      <button className="btn btn-warning mt-auto w-100">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No products available</p>
              </div>
            )}
          </div>
        </div>
      </>
      <style>
        {`
           .page-container {
             min-height: 100vh;
             display: flex;
             flex-direction: column;
           }

           .card {
             transition: transform 0.2s ease-in-out;
             border: 1px solid #dee2e6;
           }
          
           .card:hover {
             transform: translateY(-5px);
           }
          
           .card-img-top {
             transition: transform 0.2s ease-in-out;
           }
          
           .btn-warning {
             background-color: #ffd814;
             border-color: #ffd814;
             color: #000;
           }
          
           .btn-warning:hover {
             background-color: #f5c000;
             border-color: #f5c000;
           }
         `}
      </style>
    </>
  );
};

export default ProductPage;
