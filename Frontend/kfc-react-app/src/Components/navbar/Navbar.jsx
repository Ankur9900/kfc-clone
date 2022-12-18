import "./navbar.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Button, Image, Show } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Sidebar from "./sidebar";
import authlogout from "../../Redux/Auth/auth.action";

const GetData = async (values) => {
  let res = await axios.post(
    `https://eat-more3.onrender.com/users/singleuser`,
    values
  );
  return res;
};

const Navbar = () => {
  const [name, setname] = useState("signup");
  const [totalprice,setTotalPrice]=useState(0)
  // const { "price" } = useSelector((store) => store.cart);
  let ID = JSON.parse(localStorage.getItem("id"));
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(authlogout());
    setname("signup");
  };

  const idCollecter = () => {
    let datas = { _id: ID };
    GetData(datas)
      .then((res) => {
        let firstName = res.data.split(" ");
        setname(firstName[0]);
      })
      .catch((e) => {
        setname("signup");
        console.log(e);
      });
  };
  console.log(ID);

  useEffect(() => {
    let temp = +localStorage.getItem("totalcart")||0;
    setTotalPrice(temp)
    if (ID) {
      idCollecter();
    }
  }, [ID,totalprice]);

  const handleIt = (e) => {
    e.preventDefault();

  }

  return (
    <>
      <div className="nav_main" border="1px solid red">
        <div className="left_side" border="1px solid red">
          <Link to="/">
            <Image className="logo_img" src="/logoeatmore1.jpg" alt="" />
          </Link>
          <Show breakpoint="(min-width: 680px)">
            <b>
              <Link className="link" to="/menu">
                Menu
              </Link>
            </b>
            <b>
              <Link className="link" to="/deals">
                Deals
              </Link>
            </b>
          </Show>
        </div>
        <Show breakpoint="(min-width: 680px)" border="1px solid red">
          <div className="right_side"  border="1px solid red">
            <span>
              <img src="/login2.png" alt="abc" />
            </span>
            <b>
              <Link className="link" to={ID ? "/" : "/signup"}>
                {name}
              </Link>
            </b>
            {ID ? (
              <Button
                colorScheme="grey"
                onClick={handleClick}
                color="white"
                bgColor="black"
              >
                Signout
              </Button>
            ) : (
              ""
            )}

            <h6 className="cartCountItems" w="125%" border="1px solid red" >₹{totalprice}</h6>

            <Button bgColor="white" onClick={() => navigate("/cart")}>
              <img className="cart_img" src="/cart.svg" alt="" />
            </Button>
          </div>
        </Show>
        <Show breakpoint="(max-width: 680px)">
          <Sidebar
            price={totalprice}
            handleClick={handleClick}
            ID={ID}
            name={name}
          />
        </Show>
      </div>
    </>
  );
};

export default Navbar;