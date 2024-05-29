import Image from '../models/image.js'
import Video from '../models/video.js'

export default class MediasFactory {
    constructor(data) {
        if (data.image) {
            return new Image(data)
        } else if (data.video) {
            return new Video(data)
        } else {
            throw 'Data type not recognized.'
        }
    }
}