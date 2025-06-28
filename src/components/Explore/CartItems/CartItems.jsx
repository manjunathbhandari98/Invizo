import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import "./CartItems.css";

const CartItems = () => {
  const { cartItems, removeFromTheCart, updatedCartQuantity } =
    useContext(AppContext);

  return (
    <div className="p-3 h-100 overflow-y-auto">
      {cartItems.length === 0 ? (
        <p className="text-light"> Your Cart is empty</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.itemId}
              className="cart-item mb-3 p-3 bg-dark rounded"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 text-light">{cartItem.name}</h6>
                <p className="mb-0 text-light">
                  ₹{(cartItem.price * cartItem.quantity).toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-danger btn-sm"
                    disabled={cartItem.quantity === 1}
                    onClick={() =>
                      updatedCartQuantity(
                        cartItem.itemId,
                        cartItem.quantity - 1
                      )
                    }
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="text-light">{cartItem.quantity}</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      updatedCartQuantity(
                        cartItem.itemId,
                        cartItem.quantity + 1
                      )
                    }
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ width: "auto" }}
                  onClick={() => removeFromTheCart(cartItem.itemId)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
