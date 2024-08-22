import { Link, NavLink } from "react-router-dom";

import "./index.css";

export function Header(): React.ReactElement {
    const mainMenuLinks = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
    ];

    return (
        <header className="site-header">
            <nav className="site-nav">
                <div className="logo">
                    <Link to="/">
                        <span>ToDo</span>
                    </Link>
                </div>
                <div>
                    <ul className="mainmenu">
                        {mainMenuLinks
                            ? mainMenuLinks.map((link, i) => {
                                  return (
                                      <li key={i}>
                                          <NavLink to={link.path}>{link.label}</NavLink>
                                      </li>
                                  );
                              })
                            : null}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
