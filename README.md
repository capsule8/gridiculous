# gridiculous

[![CircleCI](https://circleci.com/gh/capsule8/gridiculous.svg?style=svg)](https://circleci.com/gh/capsule8/gridiculous)

## Install

```bash
yarn add https://github.com/capsule8/gridiculous
```

## Usage

Hello World:
```tsx
import * as React from 'react';

import { Grid } from 'gridiculous';

class Example extends React.Component {
  render() {
    return <Grid />;
  }
}
```

Add Some Data:
```tsx
<Grid
  data={[{foo:"bar"}]}
  rowKey="name"
  columns={[{name:"Foo", key: "foo"}]} />
```

Add interactions:
```tsx
<Grid
  onRowClick={(event, rowData) => {
    console.log(rowData)
  }}
  
  // ...
```

## Dev

Lib:

```bash
yarn
yarn link
yarn start
```

Example:

```bash
cd example
yarn
yarn link gridiculous
yarn start
```
