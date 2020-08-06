import React, { useState, useEffect } from 'react';
import { useStaticQuery, Link } from 'gatsby';
import { Query } from '../../graphql-types';
import CategoryItem from './categoryItem';
import styled from 'styled-components';

const Categories = props => {
    const data = useStaticQuery(graphql`
        query getCategories {
            allMarkdownRemark {
                totalCount
                group(field: frontmatter___category) {
                    category: field
                    fieldValue
                    nodes {
                        id
                    }
                }
            }
        }
    `);
    const categoryList = data.allMarkdownRemark.group.map(category => {
        return { category: category.fieldValue, num: category.nodes.length };
    });
    const [current, setCurrent] = useState('');
    useEffect(() => {
        setCurrent(props.current);
    });
    return (
        <CategoryList>
            <Link style={{ textDecoration: `none` }} to={'/'}>
                <LinkItem current={current}> All </LinkItem>
            </Link>
            {categoryList.map((category, key) => (
                <CategoryItem key={key} item={category} current={current} setCurrent={setCurrent} />
            ))}
        </CategoryList>
    );
};
export default Categories;

const CategoryList = styled.div`
    margin-bottom: 50px;
    @media (max-width: 767px) {
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
        flex-flow: row wrap;
        height: 90px;
    }
`;

const LinkItem = styled.span`
    color: ${props => (!props.current ? '#ffffff' : 'rgb(72,72,72)')};
    margin-left: 5px;
    background-color: ${props => (!props.current ? '#336B87' : null)};
    cursor: pointer;
    border-radius: 5px;
    padding: 8px;
    .LinkItem + .LinkItem {
        margin-top: 12px;
    }

    @media (max-width: 767px) {
        margin-top: 3px;
    }
`;
