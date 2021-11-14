import React from 'react';
import styled from 'styled-components';

const StorePage = styled.div`
    width: 100%;
    height: 80%;
    margin-top: 10px;
`;

const PageLists = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const PageList = styled.li`
    width: 10%;
    height: 40%;
`;

const PageButton = styled.button`
    all: unset;
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
    text-align: center;
    cursor: pointer;
`;

const PageNumber = ({setPage, scrollTop}) => {
    const pageNumber = [1, 2, 3];

    const handleRequestPage = evt => {
        setPage(parseInt(evt.target.id));
        scrollTop.current.scrollTo(0, scrollTop.current.pageYOffset);
    }

    return (
        <StorePage>
            <PageLists>
                {pageNumber.map((page, index) => (
                    <PageList key={index}>
                        <PageButton id={page} type="button" onClick={handleRequestPage}> {page} </PageButton>
                    </PageList>
                ))}
            </PageLists>
        </StorePage>
    );
};

export default PageNumber;