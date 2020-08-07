import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const CategoryItem = ({ key, item, current, setCurrent, location }) => {
    const linkto = '/category/' + item.category;
    // const handleCurrent = () => {
    //     setCurrent(item.category);
    // };

    return (
        <Link style={{ textDecoration: `none`, maxHeight: '30px' }} to={linkto} state={{ current: item.category }}>
            <LinkItem hilight={current === item.category ? true : false}>
                {item.category} ({item.num}){' '}
            </LinkItem>
        </Link>
    );
};
export default CategoryItem;

const LinkItem = styled.span`
    margin-left: 5px;
    cursor: pointer;
    color : ${props => (props.hilight ? '#9f7aea' : null)} !important;
    padding: 8px;
    border-radius: 5px;
    @media (max-width: 767px) {
        margin-top: 3px;
        height: ;
    }
`;
