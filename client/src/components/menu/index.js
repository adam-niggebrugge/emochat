import React from "react";

const Menu = () => {
  return (
    <section className="bg-dark text-white h-100">
      <div id="room_container">
        <div className="circle floating">
          <p className="w-100 mb-0">room 1</p>
        </div>
      </div>
      <div id="menu_container">
        <div className="nav_button">
          <i className="icon fa fa-bars fa-3x" aria-hidden="true" />
        </div>
        <div className="nav_button">
          <i className="fa fa-plus fa-3x" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
export default Menu;
