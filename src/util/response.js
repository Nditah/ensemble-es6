const parseId = result => JSON.parse(JSON.stringify(result).replace(/_id/g, "id"));

export const success = (res, status, entity, msg) => res
    .status(status || 200)
    .json({
        success: true,
        message: msg || "Successful",
        count: entity ? entity.length : 0,
        payload: entity ? parseId(entity) : [],
    });

export const fail = (res, status, msg) => res
    .status(status || 500)
    .json({
        success: false,
        message: msg || "Failed",
        payload: [],
    });

const getCount = (entity) => {
    if (!entity.payload) return 0;
    if (Array.isArray(entity.payload)) return entity.payload.length;
    return 1;
};

// eslint-disable-next-line complexity
export const response = (res, status, entity, msg = "Operation Successful") => res
    .status(status || 200)
    .json({
        success: true,
        message: entity.msg || msg,
        metadata: {
            total: entity.total || 0,
            limit: entity.limit || 0,
            count: getCount(entity),
            skip: entity.skip || 0,
            page: (Math.floor((entity.skip + entity.limit) / entity.limit)) || 1,
            sort: entity.sort || "",
        },
        payload: entity.payload ? parseId(entity.payload) : [],
    });
