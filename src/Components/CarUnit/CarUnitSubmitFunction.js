const SubmitFunction = (mutate, value) => {
  value['status'] = Number(value['status'])
  mutate(value);
};

export default SubmitFunction;
