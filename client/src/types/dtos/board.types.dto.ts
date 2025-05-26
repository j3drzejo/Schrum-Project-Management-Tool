export const BOARD_STATUSES = [
  'ready',
  'in-progress',
  'in-review',
  'in-testing',
  'ready-for-prod',
] as const;

export type BoardStatus = (typeof BOARD_STATUSES)[number];

export interface UpdateBoardDto {
  name?: string;
}

export interface CreateBoardColumnDto {
  name: BoardStatus;
  position: number;
}

export interface UpdateBoardColumnDto {
  name?: BoardStatus;
  position?: number;
}

export interface CreateBoardForSprintDto {
  name: string;
}
