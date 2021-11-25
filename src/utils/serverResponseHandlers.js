export const onSuccess = (string) => {
  return (response) => {
    if (string) {
      console.log(`[${string}] - request was successful`);
    }
    return {
      success: true,
      data: response.data,
    };
  };
};

export const onError = (string) => {
  return (err) => {
    if (string) {
      console.error(`[${string}] - request failed`);
    }
    if (err?.response?.data) {
      // question mark syntax -> optional chaining
      // if axios was the reason for the error (therefore err.response is a thing)
      return {
        success: false,
        data: err.response.data.errorMessage,
      };
    }
    return {
      success: false,
      data: "Something happened",
    };
  };
};
