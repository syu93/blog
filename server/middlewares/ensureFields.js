module.exports = (fields) => {
    fields = (fields instanceof Array) ? fields : [fields];

    return (req, res, next) => {
        let missings = [];
        fields.forEach((field) => {
            if (!req.body[field]) {
                missings.push(field)
            }
        });

        if (missings.length > 0) {
            return res.error({code: 400, message: {missingFields : missings.toString()}});
        }

        next();
    }
};