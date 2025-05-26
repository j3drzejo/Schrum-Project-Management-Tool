export const getColumnDisplayName = (columnName) => {
  const columnNameMap = {
    ready: 'Ready',
    'in-progress': 'In Progress',
    'in-review': 'In Review',
    'in-testing': 'In Testing',
    'ready-for-prod': 'In Prod',
  };

  return columnNameMap[columnName] || columnName;
};
