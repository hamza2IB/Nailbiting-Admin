export const GET = (request) => {
    return Response.json({
      coverage: global.__coverage__ || null,
    });
  };