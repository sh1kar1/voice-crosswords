function get_level(request){
if (request && request.rawRequest &&
        request.rawRequest.payload &&
        request.rawRequest.payload.meta &&
        request.rawRequest.payload.meta.current_app &&
        request.rawRequest.payload.meta.current_app.state) {
        return request.rawRequest.payload.meta.current_app.state.level;
    }
    return null;
}
