import styled from "styled-components";

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ItemField = styled.div`
  width: 23%;
`;

export const NameField = styled(ItemField)``;
export const QuantityField = styled(ItemField)`
  display: flex;

  .arrow {
    cursor: pointer;
  }

  .value {
    margin: 0 10px;
  }
`;

export const PriceField = styled(ItemField)``;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
