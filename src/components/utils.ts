import { DATA_MAPPING } from './constants';

export const getChartData = (
  dates: string[],
  dataset: string[][],
  selectedDatasources: string[],
  selectedCampaigns: string[],
): { clicks: number[]; impressions: number[] } => {
  let clicks: number[] = [];
  let impressions: number[] = [];

  dates.forEach((date) => {
    const dataPerDay = dataset.filter(
      (item) =>
        item[DATA_MAPPING.DATE] === date &&
        (!selectedDatasources.length
          ? true
          : selectedDatasources.indexOf(item[DATA_MAPPING.DATASOURCE]) > -1) &&
        (!selectedCampaigns.length
          ? true
          : selectedCampaigns.indexOf(item[DATA_MAPPING.CAMPAIGN]) > -1),
    );

    clicks.push(
      dataPerDay.reduce(
        (sum, a) => sum + parseInt(a[DATA_MAPPING.CLICKS], 10),
        0,
      ),
    );
    impressions.push(
      dataPerDay.reduce(
        (sum, a) =>
          a[DATA_MAPPING.IMPRESSIONS]
            ? sum + parseInt(a[DATA_MAPPING.IMPRESSIONS], 10)
            : sum,
        0,
      ),
    );
  });

  return {
    clicks: clicks,
    impressions: impressions,
  };
};
