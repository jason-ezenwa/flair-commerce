import React from "react";

export default function Header() {
  return (
    <header>
            <div class="logo"></div>
            <nav id="navbar">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="shop.html">Shop</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="about.html">About</a></li>
                </ul>
            </nav>
            <a href="#"><i class="fa-solid fa-bag-shopping fa-lg shopping-bag-icon"></i></a>
    </header>
  );
}