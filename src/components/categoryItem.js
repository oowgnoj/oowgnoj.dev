import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const CategoryItem = ({ item, current, setCurrent }) => {
    return (
        <LinkItem hilight={current === item.category ? true : false} onClick={() => setCurrent(item.category)}>
            {item.category} {item.num ? `(${item.num})` : ''}
        </LinkItem>
    );
};
export default CategoryItem;

const LinkItem = styled.span`
    margin-left: 5px;
    cursor: pointer;
    color: ${props => (props.hilight ? '#90afc5' : null)} !important;
    padding: 8px;
    border-radius: 5px;
    @media (max-width: 767px) {
        margin-top: 3px;
        height: ;
    }
`;
