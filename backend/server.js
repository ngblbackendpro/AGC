const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const cors = require('cors');

const blogs = require('./routes/blogRoutes');
const teams = require('./routes/teamRoutes');
const careers = require('./routes/careerRoutes');
const faqs = require('./routes/faqRoutes');
const contacts = require('./routes/contactRoutes');
const home = require('./routes/homeRoutes');
const socials = require('./routes/socialRoutes');
const terms = require('./routes/termRoutes');
const privacy = require('./routes/privacyRoutes');
const inquiry = require('./routes/inquiryRoutes');

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    res.send('Home Page');
});


app.use('/api/blogs', blogs);
app.use('/api/teams', teams);
app.use('/api/careers', careers);
app.use('/api/faqs', faqs);
app.use('/api/contacts', contacts)
app.use('/api/home', home);
app.use('/api/social', socials);
app.use('/api/terms', terms);
app.use('/api/privacy', privacy);
app.use('/api/inquiry', inquiry);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});