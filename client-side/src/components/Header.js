import React from "react";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header>
            <div className="logo"></div>
            <nav id="navbar">
                <ul>
                    <li>
                      <NavLink to="/">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/shop">
                        Shop
                      </NavLink>
                    </li>
                    <li><a href="blog.html">Blog</a></li>
                    <li>
                      <NavLink to="/about">
                        About
                      </NavLink>
                    </li>
                </ul>
            </nav>
            <a href="#"><i class="fa-solid fa-bag-shopping fa-lg shopping-bag-icon"></i></a>
    </header>
  );
}