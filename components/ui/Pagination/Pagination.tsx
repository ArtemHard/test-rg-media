import clsx from "clsx";

import style from "./pagination.module.css";
import { ChevronUp } from "@/assets/icons/ChevroneUp";
import { usePagination } from "@/assets/hooks";

export type PaginationProps = {
  count: number;
  page: number;
  onChange: (page: number) => void;
  siblings?: number;
  perPage?: number;
  perPageOptions: number[];
  defaultValue?: number;
};

export const Pagination = ({
  count,
  siblings,
  page,
  onChange,
}: PaginationProps) => {
  const {
    handleNextPageClicked,
    handlePreviousPageClicked,
    handleMainPageClicked,
    paginationRange,
    isFirstPage,
    isLastPage,
  } = usePagination({
    count,
    siblings,
    page,
    onChange,
  });

  return (
    <div className={style.root}>
      <div className={style.pageWrapper}>
        <NextButton
          onClick={handlePreviousPageClicked}
          disabled={isFirstPage}
        />
        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />
        <PrevButton onClick={handleNextPageClicked} disabled={isLastPage} />
      </div>
    </div>
  );
};

type NavigationButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

type PageButtonProps = NavigationButtonProps & {
  page: number;
  selected: boolean;
};

const PageButton = ({ onClick, selected, disabled, page }: PageButtonProps) => {
  const classNames = clsx(style.pageButton, selected && style.selected);

  return (
    <button
      onClick={onClick}
      disabled={selected || disabled}
      className={classNames}
    >
      <span>{page}</span>
    </button>
  );
};
const NextButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={style.shevroneButton}
    >
      <ChevronUp className={style.nextChevrone} />
    </button>
  );
};

const PrevButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={style.shevroneButton}
    >
      <ChevronUp className={style.prevShevrone} />
    </button>
  );
};

type MainPaginationButtonsProps = {
  paginationRange: (number | string)[];
  currentPage: number;
  onClick: (pageNumber: number) => () => void;
};

const Dots = () => {
  return <span>...</span>;
};

const MainPaginationButtons = ({
  paginationRange,
  currentPage,
  onClick,
}: MainPaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage;

        if (typeof page !== "number") {
          return <Dots key={index} />;
        }

        return (
          <PageButton
            key={index}
            page={page}
            selected={isSelected}
            onClick={onClick(page)}
          />
        );
      })}
    </>
  );
};
