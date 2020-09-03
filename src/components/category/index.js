import React from 'react';
import { useStaticQuery } from 'gatsby';
import Item from './item';
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
                <Item key={key} item={category} current={current} setCurrent={setCurrent} />
            ))}
        </CategoryList>
    );
};
export default Categories;

const CategoryList = styled.nav`
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
