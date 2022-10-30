/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import "../../assets/css/menu.css";
function Exercise({
  Item,
  level,
  visible,
  setSelectedExercise,
  selectedExercise,
}) {
  function onClick() {
    setSelectedExercise(Item.id);
  }
  if (visible) {
    return (
      <div className="menuItem-wraper">
        <div
          className={
            Item.id == selectedExercise
              ? `menuItem level-${level} active-1`
              : `menuItem level-${level}`
          }
          onClick={onClick}
        >
          {`Bài tập ${Item.exerciseName ? Item.exerciseName : ""}`}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
function MenuItem({
  Item,
  level,
  visible,
  selectedExercise,
  setSelectedExercise,
}) {
  const [selected, setSelected] = useState(false);
  var title = "";
  if (Item.type == "chapter") {
    title = "Chương ";
  } else if (Item.type == "section") {
    title = "Phần ";
  }
  if (Item.type == "group") {
    title = "Trang ";
  }
  function onClick() {
    setSelected(!selected);
  }
  if (visible) {
    if (Object.keys(Item).includes("children")) {
      return (
        <div className="menuItem-wraper">
          <div className={`menuItem level-${level}`} onClick={onClick}>
            {title + `${Item.name}: ${Item.title}`}
          </div>
          {Item.children.map((Item1) => (
            <MenuItem
              Item={Item1}
              level={level + 1}
              visible={selected}
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
            ></MenuItem>
          ))}
        </div>
      );
    } else {
      return (
        <div className="menuItem-wraper">
          <div className={`menuItem level-${level}`} onClick={onClick}>
            {title +
              `${Item.name ? Item.name : ""}${Item.page ? Item.page : ""}: ${Item.title
              }`}
          </div>
          {Item.exercises
            ? Item.exercises.map((Exercise1) => (
              <Exercise
                Item={Exercise1}
                level={level + 1}
                visible={selected}
                selectedExercise={selectedExercise}
                setSelectedExercise={setSelectedExercise}
              ></Exercise>
            ))
            : ""}
        </div>
      );
    }
  } else {
    return null;
  }
}
function Sidebar({
  color,
  image,
  routes,
  dataMenu,
  setSelectedExercise,
  selectedExercise,
}) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div className="menuList">
        {dataMenu.map((Item) => (
          <MenuItem
            Item={Item}
            level={1}
            visible={true}
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
          ></MenuItem>
        ))}
        {/* <div className="menuItem-wraper">
          <div className="menuItem level-1 active">
            Chemistry: The Central Science
          </div>
          <div className="menuItem-wraper">
            <div className="menuItem level-2">
              Chemistry: The Central Science
            </div>
            <div className="menuItem-wraper">
              <div className="menuItem level-3 active-1">
                Chemistry: The Central Science
              </div>
              <div className="menuItem-wraper">
                <div className="menuItem level-4 active-1">
                  Chemistry: The Central Science
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menuItem-wraper">
          <div className="menuItem level-1">
            Chemistry: The Central Science
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
