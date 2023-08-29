import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

export default function Navbar() {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/" activeStyle>
						Home
					</NavLink>
          <NavLink to="/about" activeStyle>
						About
					</NavLink>
					<NavLink to="/shop" activeStyle>
						Shop
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

