export const TIME_UNITS = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
};

export interface PagingProps {
  page: number;
  pageSize: number;
}
