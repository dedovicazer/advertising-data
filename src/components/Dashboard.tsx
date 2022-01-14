import React, { ReactElement, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { readRemoteFile } from 'react-papaparse';
import Chart from './Chart';
import Filters from './Filters';
import { getChartData } from './utils';
import { FILTER_NAMES, DATA_MAPPING } from './constants';
import { IConfig, ICsvResponse } from './interfaces';
import './styles.css';

const Dashboard = (): ReactElement => {
  const [data, setData] = useState<string[][] | null>(null);
  const [config, setConfig] = useState<IConfig>({
    datasources: [],
    campaigns: [],
    dates: [],
  });

  const [selectedDatasources, setSelectedDatasources] = useState<string[]>([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  const handleChangeFilterValues = (
    event: React.ChangeEvent<{ value: unknown }>,
    name: string,
  ) => {
    if (name === FILTER_NAMES.CAMPAIGN_FILTER) {
      setSelectedCampaigns(event.target.value as string[]);
    } else {
      setSelectedDatasources(event.target.value as string[]);
    }
  };

  const parseAfterGet = (dataset: string[][]) => {
    if (!dataset) return;

    setData(dataset);

    let datasources: string[] = [];
    let campaigns: string[] = [];
    let dates: string[] = [];

    dataset.forEach((item) => {
      if (
        !!item[DATA_MAPPING.DATASOURCE] &&
        datasources.indexOf(item[DATA_MAPPING.DATASOURCE]) === -1
      ) {
        datasources.push(item[DATA_MAPPING.DATASOURCE]);
      }

      if (
        !!item[DATA_MAPPING.CAMPAIGN] &&
        campaigns.indexOf(item[DATA_MAPPING.CAMPAIGN]) === -1
      ) {
        campaigns.push(item[DATA_MAPPING.CAMPAIGN]);
      }

      if (
        !!item[DATA_MAPPING.DATE] &&
        dates.indexOf(item[DATA_MAPPING.DATE]) === -1
      ) {
        dates.push(item[DATA_MAPPING.DATE]);
      }
    });

    setConfig({ datasources: datasources, campaigns: campaigns, dates: dates });
  };

  useEffect(() => {
    readRemoteFile(
      'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv',
      // @ts-ignore
      {
        complete: (result: ICsvResponse) => {
          parseAfterGet(result.data.slice(1));
        },
      },
    );
  }, []);

  return (
    <Grid container className="container">
      <Grid item className="filtersItem">
        <Filters
          datasources={config.datasources}
          campaigns={config.campaigns}
          selectedDatasources={selectedDatasources}
          selectedCampaigns={selectedCampaigns}
          onChangeFilterValues={handleChangeFilterValues}
        />
      </Grid>
      {data && (
        <Grid item className="chartItem">
          <Chart
            chartData={getChartData(
              config.dates,
              data,
              selectedDatasources,
              selectedCampaigns,
            )}
            dates={config.dates}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
