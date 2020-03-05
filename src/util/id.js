const ID = require('../models/id')
const logger = require ('./logger')

/**
 *  Generates and returns id string
 * @param {number} length of id to make
 * @returns {string} id
 */
export const makeId = (length) => {
    const char = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let str = '';

    for (let i = 1; i <= length; i++) {
        str += char.charAt(Math.floor(Math.random() * char.length));
    }

    return str;
};

/**
 * ID Generator service
 * An async function that runs in parallel as a job
 * generates 500 id
 */
export const generateIds = async () => {
    // Generate 500 Id's
    for (let i = 1; i <= 500; i++) {
        const id = makeId(9);
        // Check if the id exist
        const idExist = await ID.exists({id});
        if (idExist) {
            i--; // Repeat the current iteration
            continue;
        }
        // Id does not exist save id
        await ID.create({id, used: false});
    }
};

/*
    Returns a generated id, if an id is not available
    it runs the generateIds job to generate an id's
 */
export const getId = async () => {
    let idDoc = await ID.findOneAndUpdate({used: false}, {used: true});
    if (idDoc === null) {
        // Run this parallel don't await this function
        generateIds().catch(err => logger.error(err));
    }
    // Keep on checking for a new idDoc
    // Till a new one is available
    while (idDoc == null) {
        idDoc = (await ID.findOne({used: false})) as IdModelType;
    }

    // id as been found
    return idDoc.id as string;
};
