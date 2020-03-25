export const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

export const mockRequest = (req) => {
    return {
        body: {},
        params: {},
        query: {},
        ...req
    };
};
