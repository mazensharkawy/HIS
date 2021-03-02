export const unNestObject = (arr: Array<Object>) => {
  let newData: Array<Object> = arr?.map((i) =>
    Object.assign(
      {},
      ...(function _flatten(o) {
        return [].concat(
          ...Object.keys(o).map((k) =>
            typeof o[k] === 'object' && o[k] ? _flatten(o[k]) : { [k]: o[k] }
          )
        );
      })(i)
    )
  );
  return newData;
};
