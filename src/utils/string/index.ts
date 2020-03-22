export const isJson = (value: string) : boolean => {
  try {
    if (typeof JSON.parse(value) === 'object') return true;
    return false;
  } catch (error) {
    return false;
  }
};

// eslint-disable-next-line no-new-func
export const json2var = (code: string) : any => (new Function(`return ${code}`))();
