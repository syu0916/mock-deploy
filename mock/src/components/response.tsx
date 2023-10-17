import {successResponse, headlessRequest, errorBadRequest, successResponseZoo} from '../../mocks/loadResponse'


/**
 * @param args: the arguments for a given command in list format. 
 */
export function loadResponse(args: string[]) {
    console.log("args:" + args)
    if (args[1] === "yes"){
        return JSON.parse(successResponse())
    }
    else if (args[1] === "no") {
        console.log("no")
        return JSON.parse(errorBadRequest())
    }
    else if (args[1] === "no_header") {
        return JSON.parse(headlessRequest())
    } 
    else if (args[1] === "zoo_filepath"){
        return JSON.parse(successResponseZoo())
    } else {
        return null
    }
}