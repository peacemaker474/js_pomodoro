import React, { useState } from "react";
import styled from "styled-components";

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
  color: ${(props) => (props.check === props.id ? "red" : "black")};
`;

const PageNumber = ({ handleRequestPage }) => {
  const pageNumber = [1, 2, 3];
  const [isClick, setIsClick] = useState(1);

  const onClick = (evt) => {
    handleRequestPage(evt);
    setIsClick(parseInt(evt.target.id));
  };

  return (
    <StorePage>
      <PageLists>
        {pageNumber.map((page, index) => (
          <PageList key={page + index}>
            <PageButton
              id={page}
              check={isClick}
              type="button"
              onClick={onClick}
            >
              {" "}
              {page}{" "}
            </PageButton>
          </PageList>
        ))}
      </PageLists>
    </StorePage>
  );
};

export default PageNumber;
