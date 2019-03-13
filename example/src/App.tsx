import faker from 'faker';
import _ from 'lodash';
import React from 'react';
import { Column, Datum, Grid, useColumnOrderState } from 'gridiculous';

import './App.css';
import logo from './logo.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Formatter = (o: { value: any }) => React.ReactNode;

const dateFormatter: Formatter = ({ value }) => value.toDateString();
const aliasesFormatter: Formatter = ({ value: aliases }) =>
  aliases.map((a: string) => _.capitalize(a)).join(', ');

const COLUMNS: Column[] = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' },
  {
    defaultWidth: 300,
    key: 'address',
    minWidth: 200,
    name: 'Address For The Person Long Label',
  },
  { key: 'birthdate', name: 'Birthdate', renderer: dateFormatter },
  { key: 'shoeSize', name: 'Shoe Size', defaultWidth: 80 },
  { key: 'bloodType', name: 'Blood Type', defaultWidth: 80 },
  { key: 'citizenship', name: 'Citizenship' },
  { key: 'personalityType', name: 'Personality Type' },
  { key: 'outstandingWarrants', name: 'Outstanding Warrants' },
  { key: 'aliases', name: 'Aliases', renderer: aliasesFormatter },
];

const range = (n: number) => Array.from(Array(n).keys());

function generateFakeData(n: number) {
  return range(n).map(() => ({
    address: faker.address.streetAddress(true),
    aliases: range(_.random(0, 5)).map(() => faker.hacker.noun()),
    birthdate: faker.date.past(200),
    bloodType: faker.random.alphaNumeric(),
    citizenship: faker.address.country(),
    id: faker.random.uuid(),
    name: faker.name.findName(),
    outstandingWarrants: _.sample([true, false]),
    personalityType: faker.lorem.words(4),
    shoeSize: _.random(1, 20),
  }));
}

function orderAndOverrideWidthColumns(
  columns: Column[],
  {
    columnWidths = {},
    columnOrder,
  }: { columnWidths: { [key: string]: number }; columnOrder?: string[] },
) {
  const overriddenWidthColumns = columns.map((col) => {
    const { key } = col;
    const overridenWidth = columnWidths[key];
    if (_.isNumber(overridenWidth)) {
      return { ...col, width: overridenWidth };
    }
    return col;
  });

  if (columnOrder) {
    return _.sortBy(overriddenWidthColumns, ({ key }) =>
      columnOrder.indexOf(key),
    );
  }

  return overriddenWidthColumns;
}

export function App() {
  const [columnWidths, setColumnWidths] = React.useState<{
    [key: string]: number;
  }>({});

  const handleColumnWidthsChange = React.useCallback(
    (key: string, newWidth: number) => {
      setColumnWidths({ ...columnWidths, [key]: newWidth });
    },
    [columnWidths],
  );

  const [columnOrder, handleColumnOrderChange] = useColumnOrderState(COLUMNS);

  const columns = React.useMemo(
    () => orderAndOverrideWidthColumns(COLUMNS, { columnOrder, columnWidths }),
    [columnOrder, columnWidths],
  );

  const [data, setData] = React.useState<Datum[]>(generateFakeData(3));

  const addRowToTop = React.useCallback(() => {
    setData((data) => [...generateFakeData(1), ...data.slice(0, -1)]);
  }, []);

  const [isGeneratingData, setIsGeneratingData] = React.useState(false);
  React.useEffect(() => {
    let dataGenerationInterval: NodeJS.Timer | null = null;
    if (isGeneratingData) {
      if (dataGenerationInterval) {
        clearInterval(dataGenerationInterval);
      }

      dataGenerationInterval = setInterval(addRowToTop, 1000);
    }

    return () => {
      if (dataGenerationInterval) {
        clearInterval(dataGenerationInterval);
      }
    };
  }, [addRowToTop, isGeneratingData]);

  const toggleGeneratingData = React.useCallback(() => {
    setIsGeneratingData(!isGeneratingData);
  }, [isGeneratingData]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">
          Gridicul
          <img className="App-logo" src={logo} alt="o" />
          us
        </div>
        <div className="App-controls">
          <button onClick={toggleGeneratingData} type="button">
            Generate data:
            {isGeneratingData ? 'on' : 'off'}
          </button>
          <button onClick={addRowToTop} type="button">
            Add row to top
          </button>
        </div>
        <div className="Grid-container">
          <Grid
            columns={columns}
            data={data}
            defaultColumnMinWidth={150}
            onColumnsOrderChange={handleColumnOrderChange}
            onColumnWidthChange={handleColumnWidthsChange}
            rowKey="id"
            virtualizationEnabled={false}
          />
        </div>
      </header>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// for debugging
(window as any)._ = _;
(window as any).faker = faker;
/* eslint-enable */
