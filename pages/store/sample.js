import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { cartActions } from "../../Components/cart";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "primereact/rating";
import { Dropdown } from "primereact/dropdown";
import "../../styles/sample.module.css";

export default function sample(session) {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [items, setItems] = useState("");
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];

  useEffect(() => {
    if (session) {
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + "items/api/items/0/10/", {
          headers: {
            Authorization: `Bearer ${session.Token.accessToken}`,
          },
        })
        .then((res) => {
          setItems(res.data);
        });
    }
  }, [session]);

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };
  const renderListItem = (data) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <img
            style={{
              width: "100px",
            }}
            src={process.env.NEXT_PUBLIC_BACKEND_URL + data.getImage}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={data.name}
          />
          <div className="product-list-detail">
            <div className="product-name">{data.title}</div>
            <div className="product-description">Product Description</div>
            <Rating value={data.ratings} readOnly cancel={false}></Rating>
          </div>
          <div className="product-list-action">
            <span className="product-price">${data.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              onClick={() => {}}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (data) => {
    return (
      <div className="col-12 md:col-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-content">
            <img
              style={{
                width: "100px",
              }}
              src={process.env.NEXT_PUBLIC_BACKEND_URL + data.getImage}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="product-name">{data.title}</div>
            <div className="product-description">Product Description</div>
            <Rating value={data.ratings} readOnly cancel={false}></Rating>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">${data.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              onClick={() => {}}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="col-6" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={onSortChange}
          />
        </div>
        <div className="col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <div className="dataview-demo">
      {/* <Image
        src={URL + "/media/Free_Photo___Assorted_and_mixed_fruits.jpeg"}
        height={500}
        width={500}
      ></Image> */}
      <div className="card">
        <DataView
          value={items}
          layout={layout}
          header={header}
          itemTemplate={itemTemplate}
          paginator
          rows={9}
          sortOrder={sortOrder}
          sortField={sortField}
        />
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
