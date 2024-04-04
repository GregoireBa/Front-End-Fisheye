import { Photographer } from "../models/photographer.js";

export class PhotographerFactory {
    static createPhotographer(data) {
        return new Photographer(data);
    }
}