import { gql } from '@apollo/client';
export const getCharacters = gql`query getCharacterList{
  characters{
    info{
      count,
      pages,
      next,
      prev,
    },
    results{
      id,
      name,
      type, 
      image,
      gender,
      species
    }
  }}
  `