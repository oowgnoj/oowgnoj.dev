import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `white`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <span style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: '#2A3132',
            textDecoration: `none`,
            fontWeight: 'bold'
          }}
        >
          {siteTitle}
        </Link>
      </span>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
