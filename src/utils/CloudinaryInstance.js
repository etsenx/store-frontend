import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({cloud: {cloudName: 'dykebosio'}});

export default cld;