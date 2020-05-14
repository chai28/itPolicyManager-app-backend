/**
 * This controller is used for error handling
 */

/**
 * Handler for not allowed request's methods
 * @param request
 * @param response
 */
exports.MethodNotAllowed = (request, response) => {
    response
        .status(405)
        .json({error: "Method is not allowed"});
}
