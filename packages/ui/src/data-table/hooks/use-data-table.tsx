import React from "react";
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
import type { UseQueryStateOptions } from "nuqs";
import type {
  ColumnSort,
  PaginationState,
  SortingState,
  TableOptions,
  TableState,
  Updater,
  VisibilityState,
} from "@tanstack/react-table";
import { getSortingStateParser } from "../lib/parser";

const PAGE_KEY = "page";
const PER_PAGE_KEY = "perPage";
const SORT_KEY = "sort";
// const FILTERS_KEY = "filters";
// const ARRAY_SEPARATOR = ",";
// const DEBOUNCE_MS = 300;
// const THROTTLE_MS = 50;

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: Extract<keyof TData, string>;
}

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | "state"
      | "pageCount"
      | "getCoreRowModel"
      | "manualFiltering"
      | "manualPagination"
      | "manualSorting"
    >,
    Required<Pick<TableOptions<TData>, "pageCount">> {
  initialState?: Omit<Partial<TableState>, "sorting"> & {
    sorting?: Array<ExtendedColumnSort<TData>>;
  };
  queryKeys?: Partial<{
    page: string;
    perPage: string;
    sort: string;
  }>;
  history?: "push" | "replace";
  scroll?: boolean;
}

/**
 * Centralized DataTable hook for tables containing tanstack-table
 */
export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const {
    columns,
    pageCount = -1,
    initialState,
    history = "replace",
    scroll,
    queryKeys,
    ...tableProps
  } = props;

  const pageKey = queryKeys?.page ?? PAGE_KEY;
  const perPageKey = queryKeys?.perPage ?? PER_PAGE_KEY;
  const sortKey = queryKeys?.sort ?? SORT_KEY;

  const queryStateOptions = React.useMemo<
    Omit<UseQueryStateOptions<string>, "parse">
  >(
    () => ({
      history,
      scroll,
      // shallow,
      // clearOnDefault,
      // startTransition
    }),
    [history, scroll]
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {});
  const [page, setPage] = useQueryState(
    pageKey,
    parseAsInteger.withOptions(queryStateOptions).withDefault(1)
  );
  const [perPage, setPerPage] = useQueryState(
    perPageKey,
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageSize ?? 10)
  );

  const pagination: PaginationState = React.useMemo(() => {
    return {
      pageIndex: page - 1, // zero-based index
      pageSize: perPage,
    };
  }, [page, perPage]);

  // method to change the pagination state
  const onPaginationChange = React.useCallback(
    (updateOrValue: Updater<PaginationState>) => {
      if (typeof updateOrValue === "function") {
        const newPagination = updateOrValue(pagination);
        void setPage(newPagination.pageIndex + 1);
        void setPerPage(newPagination.pageSize);
      } else {
        void setPage(updateOrValue.pageIndex + 1);
        void setPerPage(updateOrValue.pageSize);
      }
    },
    [pagination, setPage, setPerPage]
  );

  // columns-ids set
  // used for id based sorting
  const columnIds = React.useMemo(() => {
    return new Set(
      columns.map((col) => col.id).filter(Boolean) as Array<string>
    );
  }, [columns]);

  const [sorting, setSorting] = useQueryState(
    sortKey,
    getSortingStateParser<TData>(columnIds)
      .withOptions(queryStateOptions)
      .withDefault(initialState?.sorting ?? [])
  );

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (typeof updaterOrValue === "function") {
        const newSorting = updaterOrValue(sorting);
        setSorting(newSorting as Array<ExtendedColumnSort<TData>>);
      } else {
        setSorting(updaterOrValue as Array<ExtendedColumnSort<TData>>);
      }
    },
    [sorting, setSorting]
  );

  const table = useReactTable({
    ...tableProps,
    columns,
    initialState,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    onPaginationChange,
    onSortingChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    meta: {
      queryKeys: {
        page: pageKey,
        perPage: perPageKey,
        sort: sortKey,
      },
    },
  });

  return { table };
}
