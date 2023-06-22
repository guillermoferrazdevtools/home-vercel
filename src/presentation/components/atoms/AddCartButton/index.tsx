import React from 'react';
import { AddCartButtonStruct } from './AddCartButton.types';
import { AddButton } from './AddCartButton.styles';

export const AddCartButton = (props: AddCartButtonStruct) => {
  const { addNew } = props;

  return (
    <AddButton name="" onClick={addNew}>
      Añadir al carro
    </AddButton>
  );
};
