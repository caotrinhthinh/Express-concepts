const urlVersioning = (version) => (req, res, next) => {
    if (req.path.startsWith(`/api/${version}/`)) {
        next();
    } else {
        res.status(404).json({
            status: 'error',
            message: `API version ${version} not found.`,
        });
    }
};

const headerVersioning = (version) => (req, res, next) => {
    if (req.get('Accept-Version') === version) {
        next();
    } else {
        return res.status(404).json({
            status: 'error',
            message: `API version ${version} not found.`,
        });
    }
};

const contentTypeVersioning = (version) => (req, res, next) => {
    const contentType = req.get('Content-Type');
    if (contentType && contentType.includes(`application/vnd.myapi.v${version}+json`)) {
        next();
    } else {
        return res.status(404).json({
            status: 'error',
            message: `API version ${version} not found.`,
        });
    }
};

export { urlVersioning, headerVersioning, contentTypeVersioning };
