export function spliceColumnOrder(
  columnOrder: string[],
  sourceIndex: number,
  destinationIndex: number,
) {
  const newColumnOrder = [...columnOrder];
  const [removed] = newColumnOrder.splice(sourceIndex, 1);
  newColumnOrder.splice(destinationIndex, 0, removed);
  return newColumnOrder;
}
