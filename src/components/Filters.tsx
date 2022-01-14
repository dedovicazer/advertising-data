import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { FILTER_NAMES } from './constants';
import { IFilters } from './interfaces';
import './styles.css';

const Filters = ({
  datasources,
  selectedDatasources,
  campaigns,
  selectedCampaigns,
  onChangeFilterValues,
}: IFilters): ReactElement => {
  return (
    <Grid container direction="column">
      <Grid item className="filterItem">
        <Typography variant="h5">Filter dimension values</Typography>
      </Grid>

      <Grid item className="filterItem">
        <Typography variant="body1" className="label">
          Datasources
        </Typography>
        <FormControl className="formControl">
          <Select
            displayEmpty
            id="datasource-id"
            multiple
            value={selectedDatasources}
            onChange={(event) =>
              onChangeFilterValues(event, FILTER_NAMES.DATASOURCE_FILTER)
            }
            input={<Input id="select-multiple-datasource" />}
            renderValue={(selectedDatasources) => {
              if ((selectedDatasources as string[]).length === 0) {
                return <em>All</em>;
              }

              return (
                <div className="chips">
                  {(selectedDatasources as string[]).map((value) => (
                    <Chip key={value} label={value} className="chip" />
                  ))}
                </div>
              );
            }}
          >
            <MenuItem key="all" disabled value="">
              <em>All</em>
            </MenuItem>

            {datasources.map((datasource) => (
              <MenuItem key={datasource} value={datasource}>
                {datasource}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item className="filterItem">
        <Typography variant="body1" className="label">
          Campaigns
        </Typography>
        <FormControl className="formControl">
          <Select
            displayEmpty
            id="campaign-id"
            multiple
            value={selectedCampaigns}
            onChange={(event) =>
              onChangeFilterValues(event, FILTER_NAMES.CAMPAIGN_FILTER)
            }
            input={<Input id="select-multiple-campaign" />}
            renderValue={(selectedCampaigns) => {
              if ((selectedCampaigns as string[]).length === 0) {
                return <em>All</em>;
              }

              return (
                <div className="chips">
                  {(selectedCampaigns as string[]).map((value) => (
                    <Chip key={value} label={value} className="chip" />
                  ))}
                </div>
              );
            }}
          >
            <MenuItem key="all" disabled value="">
              <em>All</em>
            </MenuItem>
            {campaigns.map((campaign, index) => (
              <MenuItem key={`${campaign}-${index + 1}`} value={campaign}>
                {campaign}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
