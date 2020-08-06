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
    color: ${props => (props.hilight ? '#ffffff' : 'rgb(72,72,72)')};
    margin-left: 5px;
    background-color: ${props => (props.hilight ? '#336B87' : null)};
    cursor: pointer;
    padding: 8px;
    border-radius: 5px;
    @media (max-width: 767px) {
        margin-top: 3px;
        height: ;
    }
`;
