import React from 'react';

export interface ICsvResponse {
  data: string[][];
  errors: any;
  meta: any;
}

export interface IConfig {
  datasources: string[];
  campaigns: string[];
  dates: string[];
}

export interface IFilters {
  datasources: string[];
  selectedDatasources: string[];
  campaigns: string[];
  selectedCampaigns: string[];
  onChangeFilterValues: (
    event: React.ChangeEvent<{ value: unknown }>,
    name: string,
  ) => void;
}

export interface IChart {
  dates: string[];
  chartData: { clicks: number[]; impressions: number[] };
}
