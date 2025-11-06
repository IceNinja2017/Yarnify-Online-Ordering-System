import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },

    description: { 
        type: String, 
        required: true 
    },

    price: {
        type: Number,
        required: true,
        min: 0 
    },

    image: [{
        url: { type: String },
        public_id: { type: String }
    }],

    category: { 
        type: String, 
        required: true 
    },

    stock: { 
        type: Number, 
        required: true, 
        min: 0 
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);