import React, { useState, useEffect } from 'react';
import { useStaticQuery, Link } from 'gatsby';
import CategoryItem from './categoryItem';
import styled from 'styled-components';

const Categories = ({ current, setCurrent }) => {
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
    let categoryList = data.allMarkdownRemark.group.map(category => {
        return { category: category.fieldValue, num: category.nodes.length };
    });
    categoryList.unshift({ category: 'ALL', num: '' });
    return (
        <CategoryList>
            {categoryList.map((category, key) => (
                <CategoryItem key={key} item={category} current={current} setCurrent={setCurrent} />
            ))}
        </CategoryList>
    );
};
export default Categories;

const CategoryList = styled.div`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #cbd5e0;
    @media (max-width: 767px) {
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
        flex-flow: row wrap;
        align-content: space-between;
        min-height: 110px;
    }
`;

const LinkItem = styled.span`
    margin-left: 5px;
    color: ${props => (!props.current ? '#90afc5' : null)} !important;
    background-color: ${props => (!props.current ? '#193B59' : null)};
    cursor: pointer;
    border-radius: 5px;
    padding: 8px;
    .LinkItem + .LinkItem {
        margin-top: 30px;
    }

    @media (max-width: 767px) {
        margin-top: 3px;
    }
`;
