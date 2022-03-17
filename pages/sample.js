import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { cartActions } from "../Components/cart";
import { getSession } from "next-auth/react";

export default function sample() {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  console.log();
  return (
    <div>
      {cart}
      <Button
        style={{ padding: "10px", margin: "10px" }}
        onClick={() => {
          dispatch(cartActions.add());
        }}
      >
        INCREMENT COUNTER 1
      </Button>
      <Button
        style={{ padding: "10px", margin: "10px" }}
        onClick={() => {
          dispatch({ type: "INC2" });
        }}
      >
        INCREMENT COUNTER 2
      </Button>
    </div>
  );
}
export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
