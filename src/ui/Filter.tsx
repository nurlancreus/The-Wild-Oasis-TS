import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type FilterProps = {
  filterField: string;
  options: Array<Record<string, string>>;
  searchParamsToReset?: Array<{
    name: string;
    value: number;
  }>;
};

function Filter({ filterField, options, searchParamsToReset }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterValue =
    searchParams.get(filterField) || options.at(0)?.value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);

    searchParamsToReset?.forEach((param) =>
      searchParams.set(param.name, String(param.value))
    );

    // if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  };

  return (
    <StyledFilter>
      {options.map((option) => {
        const { value, label } = option;
        const isCurrentFilterApplied = value === currentFilterValue;

        return (
          <FilterButton
            key={value}
            onClick={() => handleClick(value)}
            $active={isCurrentFilterApplied}
            disabled={isCurrentFilterApplied}
          >
            {label}
          </FilterButton>
        );
      })}
    </StyledFilter>
  );
}

export default Filter;
