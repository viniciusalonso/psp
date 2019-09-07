class ResponseFormatterHelper {

    formatSuccessResponse(response, data) {
        return response.status(200).json({ data: data });
    }

    formatCreatedResponse(response, data) {
        return response.status(201).json({ data: data });
    }

    formatErrorsResponse(response, sequelizeValidationError) {
        let fields = [];
        let errors = {};

        sequelizeValidationError.errors.map(function(error) {

            if (!fields.includes(error.path))
            {
                fields.push(error.path);
                errors[error.path] = [];
            }

            errors[error.path].push(error.message);

            return errors;
        });

        response.status(400).json({ errors: errors });
    }
}

export default ResponseFormatterHelper;
