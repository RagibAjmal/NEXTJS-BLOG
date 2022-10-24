import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { cartActions } from "../../Components/cart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getSession } from "next-auth/react";
import { Rating } from "primereact/rating";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function sample(session) {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [cartItems, setCartItems] = useState("");
  useEffect(() => {
    if (session) {
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + "items/cart/cart_items/", {
          headers: {
            Authorization: `Bearer ${session.Token.accessToken}`,
          },
        })
        .then((res) => {
          setCartItems(res.data);
        });
    }
  }, [session]);

  const cartItemsAPI = () => {
    if (session) {
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + "items/cart/cart_items/", {
          headers: {
            Authorization: `Bearer ${session.Token.accessToken}`,
          },
        })
        .then((res) => {
          setCartItems(res.data);
        });
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={process.env.NEXT_PUBLIC_BACKEND_URL + rowData.getImage}
        style={{
          width: "100px",
        }}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.ratings} readOnly cancel={false} />;
  };

  const changeQuantity = (rowData, action) => {
    if (session) {
      axios
        .get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "items/cart/" +
            action +
            "/" +
            rowData.id +
            "/",
          {
            headers: {
              Authorization: `Bearer ${session.Token.accessToken}`,
            },
          }
        )
        .then((res) => {
          cartItemsAPI();
        });
    }
  };

  const quantityBodyTemplate = (rowData) => {
    return (
      <div>
        <span>
          <Button
            className="p-button-rounded p-button-sm"
            icon="pi pi-minus"
            onClick={() => changeQuantity(rowData, "item_decrement")}
          />
        </span>
        <span
          style={{
            padding: "15px",
            position: "relative",
            bottom: "10px",
          }}
          className={`product-badge status-${rowData.quantity}`}
        >
          {rowData.quantity}
        </span>
        <span>
          <Button
            className="p-button-rounded p-button-sm"
            icon="pi pi-plus"
            onClick={() => changeQuantity(rowData, "item_increment")}
          />
        </span>
      </div>
    );
  };

  const header = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className="table-header"
    >
      Cart
      <Button icon="pi pi-refresh" onClick={() => cartItemsAPI()} />
    </div>
  );
  const footer = `In total there are ${
    cartItems ? cartItems.length : 0
  } products.`;

  return (
    <div>
      <div className="datatable-templating-demo">
        <div className="card">
          <DataTable
            value={cartItems}
            header={header}
            footer={footer}
            responsiveLayout="scroll"
          >
            <Column field="title" header="Name"></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
            ></Column>
            <Column
              field="rating"
              header="Reviews"
              body={ratingBodyTemplate}
            ></Column>
            <Column header="Quantity" body={quantityBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
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
    props: { Token: session },
  };
}
