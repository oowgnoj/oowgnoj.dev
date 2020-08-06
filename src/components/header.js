import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
    <h1>
        <Link
            to="/"
            style={{
                color: 'rgb(72,72,72)',
                textDecoration: 'none',
                fontSize: '1.875rem',
                padding: '45px 20px',
            }}
        >
            {siteTitle}
        </Link>
    </h1>
);

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: '',
};

export default Header;
