export const setHttpPlugin = {
    async requestDidStart() {
      return {
        async willSendResponse({ response }: any) {
          const error = response.errors?.[0];
          if (error?.error.extensions?.http?.status) {
            response.http.status = error.extensions.http.status;
          }
        },
      };
    },
  };