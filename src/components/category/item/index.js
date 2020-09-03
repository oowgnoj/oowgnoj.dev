import React from 'react';
import styled from 'styled-components';

const CategoryItem = ({ item, current, setCurrent }) => {
    const { category, num } = item;
    const isHilighted = current === item.category;
    return (
        <LinkItem isHilighted={isHilighted} onClick={() => setCurrent(item.category)}>
            {category} {num && item.num}
        </LinkItem>
    );
};
export default CategoryItem;

const LinkItem = styled.span`
    margin-left: 5px;
    cursor: pointer;
    color: ${props => (props.isHilighted ? '#90afc5' : null)} !important;
    padding: 8px;
    border-radius: 5px;
    @media (max-width: 767px) {
        margin-top: 3px;
    }
`;
