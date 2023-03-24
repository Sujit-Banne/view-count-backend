// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

const viewCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    }
});

const ViewCount = mongoose.model('ViewCount', viewCountSchema);

app.get('/viewcount', async (req, res) => {
    try {
        const viewCount = await ViewCount.findOne();
        if (viewCount) {
            res.json({ count: viewCount.count });
        } else {
            res.json({ count: 0 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/viewcount', async (req, res) => {
    try {
        let viewCount = await ViewCount.findOne();
        if (viewCount) {
            viewCount.count++;
        } else {
            viewCount = new ViewCount();
            viewCount.count = 1;
        }
        await viewCount.save();
        res.json({ count: viewCount.count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

mongoose.connect('mongodb+srv://admin:admin@view-count.7f05nyf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(5050, () => {
        console.log('Server listening on port 5050');
    });
}).catch(error => {
    console.error(error);
});
